// Stripe webhook — the missing backend piece that activates memberships.
//
// Deployed automatically by Cloudflare Pages at /api/stripe-webhook.
// Point a Stripe webhook endpoint at it (see supabase/README.md) with events:
//   checkout.session.completed, customer.subscription.updated,
//   customer.subscription.deleted
//
// Required environment variables (Cloudflare Pages → Settings → Environment
// variables, Production + Preview):
//   STRIPE_WEBHOOK_SECRET      whsec_... from the Stripe webhook endpoint
//   SUPABASE_URL               falls back to VITE_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY  service role key (Supabase → Settings → API)
// Optional — enrolls paying members into the MailerLite welcome drip:
//   MAILERLITE_API_KEY         MailerLite → Integrations → API
//   MAILERLITE_GROUP_ID        the "EYV Members" group id

export async function onRequestPost({ request, env }) {
  const secret = env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Webhook not configured', { status: 500 });
  }

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');
  if (!signature || !(await verifyStripeSignature(payload, signature, secret))) {
    return new Response('Invalid signature', { status: 400 });
  }

  const event = JSON.parse(payload);
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object, env);
        break;
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionChange(event.data.object, env);
        break;
      // Other event types are acknowledged without action.
    }
  } catch (err) {
    // Non-2xx makes Stripe retry with backoff — desired for transient failures.
    console.error(`[stripe-webhook] ${event.type} failed:`, err);
    return new Response('Handler error', { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
}

// --- Event handlers ---------------------------------------------------------

async function handleCheckoutCompleted(session, env) {
  // "paid" is the normal case; "no_payment_required" covers free trials and
  // 100%-off promo codes (used for end-to-end testing and comped members).
  if (
    session.payment_status &&
    !['paid', 'no_payment_required'].includes(session.payment_status)
  ) {
    return;
  }

  const email = session.customer_details?.email || session.customer_email;
  if (!email) throw new Error('checkout.session has no customer email');
  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id;
  const fullName = session.customer_details?.name || '';
  const [firstName, ...rest] = fullName.split(/\s+/).filter(Boolean);
  const lastName = rest.join(' ');

  let profile = await findProfileByEmail(env, email);
  if (!profile) {
    // Paid before ever signing in: create the auth user so the on_auth_user_created
    // trigger inserts their profile row, then activate it. When they later
    // request a magic link, Supabase signs them into this same user.
    await createAuthUser(env, email);
    profile = await findProfileByEmail(env, email);
    if (!profile) throw new Error(`profile still missing after user creation for ${email}`);
  }

  await updateProfile(env, `user_id=eq.${profile.user_id}`, {
    membership_status: 'active',
    ...(customerId ? { stripe_customer_id: customerId } : {}),
    ...(firstName && !profile.first_name ? { first_name: firstName } : {}),
    ...(lastName && !profile.last_name ? { last_name: lastName } : {}),
  });

  // Best-effort: enroll in the MailerLite welcome drip. Never fail the webhook
  // over email marketing — membership activation is the critical path.
  try {
    await addToMailerLite(env, email, fullName);
  } catch (err) {
    console.error('[stripe-webhook] MailerLite enrollment failed:', err);
  }
}

async function handleSubscriptionChange(subscription, env) {
  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer?.id;
  if (!customerId) return;

  const statusMap = {
    active: 'active',
    trialing: 'active',
    past_due: 'past_due',
    unpaid: 'past_due',
    canceled: 'canceled',
    incomplete_expired: 'canceled',
  };
  const membershipStatus = statusMap[subscription.status];
  if (!membershipStatus) return; // e.g. "incomplete" — wait for a definitive status

  await updateProfile(env, `stripe_customer_id=eq.${encodeURIComponent(customerId)}`, {
    membership_status: membershipStatus,
  });
}

// --- Supabase (service role, bypasses RLS) ----------------------------------

function supabaseHeaders(env) {
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  return {
    apikey: key,
    authorization: `Bearer ${key}`,
    'content-type': 'application/json',
  };
}

function supabaseUrl(env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL / VITE_SUPABASE_URL is not set');
  return url.replace(/\/$/, '');
}

async function findProfileByEmail(env, email) {
  const res = await fetch(
    `${supabaseUrl(env)}/rest/v1/profiles?select=user_id,first_name,last_name&email=ilike.${encodeURIComponent(email)}&limit=1`,
    { headers: supabaseHeaders(env) }
  );
  if (!res.ok) throw new Error(`profile lookup failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function createAuthUser(env, email) {
  const res = await fetch(`${supabaseUrl(env)}/auth/v1/admin/users`, {
    method: 'POST',
    headers: supabaseHeaders(env),
    body: JSON.stringify({ email, email_confirm: true }),
  });
  // 422 = user already exists (raced with a magic-link signup) — that's fine.
  if (!res.ok && res.status !== 422) {
    throw new Error(`auth user creation failed: ${res.status} ${await res.text()}`);
  }
}

async function updateProfile(env, filter, fields) {
  const res = await fetch(`${supabaseUrl(env)}/rest/v1/profiles?${filter}`, {
    method: 'PATCH',
    headers: { ...supabaseHeaders(env), prefer: 'return=minimal' },
    body: JSON.stringify(fields),
  });
  if (!res.ok) throw new Error(`profile update failed: ${res.status} ${await res.text()}`);
}

// --- MailerLite --------------------------------------------------------------

async function addToMailerLite(env, email, name) {
  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_GROUP_ID) return;
  const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST', // upserts by email
    headers: {
      authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email,
      ...(name ? { fields: { name } } : {}),
      groups: [env.MAILERLITE_GROUP_ID],
    }),
  });
  if (!res.ok) throw new Error(`MailerLite upsert failed: ${res.status} ${await res.text()}`);
}

// --- Stripe signature verification (Web Crypto, no SDK needed) ---------------

async function verifyStripeSignature(payload, header, secret, toleranceSeconds = 300) {
  const parts = Object.fromEntries(
    header.split(',').map((kv) => {
      const i = kv.indexOf('=');
      return [kv.slice(0, i), kv.slice(i + 1)];
    })
  );
  const timestamp = Number(parts.t);
  const expected = parts.v1;
  if (!timestamp || !expected) return false;
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${payload}`));
  const computed = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');

  if (computed.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) {
    diff |= computed.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}
