// Vibe Reset lead capture — adds a lead to MailerLite for the free
// 10-Minute Vibe Reset funnel (/vibe-reset).
//
// Deployed automatically by Cloudflare Pages at /api/vibe-reset-signup.
//
// Required environment variables (Cloudflare Pages → Settings → Environment
// variables, Production + Preview):
//   MAILERLITE_API_KEY             MailerLite → Integrations → API
//                                  (already set for the Stripe webhook)
//   MAILERLITE_VIBE_RESET_GROUP_ID id of the "Vibe Reset Leads" group
//
// MailerLite's POST /api/subscribers upserts by email and only ADDS the
// listed groups — an existing subscriber (including a paid member in the
// "EYV Members" group) keeps all of her current groups and fields, so a
// member using this form is never downgraded or overwritten. Repeat
// submissions are idempotent: same subscriber, same group, no duplicates.
//
// The delivery email + nurture sequence are MailerLite automations triggered
// by joining the group — see emails/vibe-reset-sequence.md.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: real visitors never fill the hidden "website" field. Pretend
  // success so bots learn nothing.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return json({ ok: true }, 200);
  }

  const firstName = sanitizeName(body.firstName);
  const email = String(body.email ?? '').trim().toLowerCase();

  if (!firstName) {
    return json({ ok: false, error: 'Please tell us your first name.' }, 400);
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_VIBE_RESET_GROUP_ID) {
    console.error('[vibe-reset-signup] MailerLite env vars not configured');
    return json(
      { ok: false, error: 'Sign-up is temporarily unavailable. Please try again soon.' },
      503
    );
  }

  try {
    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST', // upserts by email; adds groups without removing existing ones
      headers: {
        authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: {
          name: firstName,
          lead_source: 'website_vibe_reset',
        },
        groups: [env.MAILERLITE_VIBE_RESET_GROUP_ID],
      }),
    });
    if (!res.ok) {
      // 422 with a validation error usually means an unsubscribed/blocked
      // address; anything else is on our side. Either way the visitor gets a
      // friendly, non-revealing message.
      const detail = await res.text();
      console.error(`[vibe-reset-signup] MailerLite upsert failed: ${res.status} ${detail}`);
      return json(
        { ok: false, error: 'Something went wrong on our end. Please try again in a moment.' },
        502
      );
    }
  } catch (err) {
    console.error('[vibe-reset-signup] MailerLite request errored:', err);
    return json(
      { ok: false, error: 'Something went wrong on our end. Please try again in a moment.' },
      502
    );
  }

  return json({ ok: true }, 200);
}

function sanitizeName(value) {
  return String(value ?? '')
    .replace(/[\r\n\t<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
