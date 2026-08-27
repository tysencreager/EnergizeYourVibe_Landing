// Free 30-minute connect call requests — captures the lead from the homepage
// "Book a call with Jenn" form and adds it to MailerLite so Jenn can reach
// out to schedule.
//
// Deployed automatically by Cloudflare Pages at /api/book-call.
//
// Required environment variables (Cloudflare Pages → Settings → Environment
// variables, Production + Preview):
//   MAILERLITE_API_KEY            MailerLite → Integrations → API
//                                 (already set for the Stripe webhook)
//   MAILERLITE_CALL_REQUEST_GROUP_ID
//                                 id of a "Free Call Requests" group — create
//                                 it in MailerLite → Subscribers → Groups.
//                                 Add an automation on that group ("subscriber
//                                 joins group" → send email to Jenn) so she
//                                 gets notified of each request.
//
// The requested date/time land in the custom text field `call_request`
// (create it in MailerLite → Subscribers → Fields). Phone goes into the
// default `phone` field. If `call_request` doesn't exist yet, MailerLite
// rejects the payload with a 422 — we retry once without it so the lead is
// never lost.
//
// Like the Vibe Reset form, POST /api/subscribers upserts by email and only
// ADDS groups, so an existing subscriber or member keeps everything she has.

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

  const name = sanitizeText(body.name, 80);
  const phone = sanitizePhone(body.phone);
  const email = String(body.email ?? '').trim().toLowerCase();
  const preferredDate = sanitizeDate(body.preferredDate);
  const preferredTime = sanitizeText(body.preferredTime, 40);

  if (!name) {
    return json({ ok: false, error: 'Please tell us your name.' }, 400);
  }
  if (!phone) {
    return json({ ok: false, error: 'Please enter a phone number Jenn can reach you at.' }, 400);
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_CALL_REQUEST_GROUP_ID) {
    console.error('[book-call] MailerLite env vars not configured');
    return json(
      { ok: false, error: 'Booking is temporarily unavailable. Please try again soon.' },
      503
    );
  }

  const callRequest = [
    preferredDate && `Preferred date: ${preferredDate}`,
    preferredTime && `Preferred time: ${preferredTime}`,
  ]
    .filter(Boolean)
    .join(' · ');

  const basePayload = {
    email,
    fields: {
      name,
      phone,
      lead_source: 'website_book_call',
    },
    groups: [env.MAILERLITE_CALL_REQUEST_GROUP_ID],
  };

  try {
    let res = await upsertSubscriber(env, {
      ...basePayload,
      fields: callRequest
        ? { ...basePayload.fields, call_request: callRequest }
        : basePayload.fields,
    });

    // A 422 usually means the `call_request` custom field hasn't been created
    // in MailerLite yet — retry with default fields only so the lead still
    // lands in the group (the automation email to Jenn includes the phone).
    if (res.status === 422 && callRequest) {
      console.error('[book-call] 422 with call_request field, retrying without it');
      res = await upsertSubscriber(env, basePayload);
    }

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[book-call] MailerLite upsert failed: ${res.status} ${detail}`);
      return json(
        { ok: false, error: 'Something went wrong on our end. Please try again in a moment.' },
        502
      );
    }
  } catch (err) {
    console.error('[book-call] MailerLite request errored:', err);
    return json(
      { ok: false, error: 'Something went wrong on our end. Please try again in a moment.' },
      502
    );
  }

  return json({ ok: true }, 200);
}

function upsertSubscriber(env, payload) {
  return fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST', // upserts by email; adds groups without removing existing ones
    headers: {
      authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

function sanitizeText(value, maxLength) {
  return String(value ?? '')
    .replace(/[\r\n\t<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function sanitizePhone(value) {
  const phone = String(value ?? '')
    .replace(/[^\d+()\-.\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 30);
  return (phone.match(/\d/g) || []).length >= 7 ? phone : '';
}

function sanitizeDate(value) {
  const date = String(value ?? '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '';
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
