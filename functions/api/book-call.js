// Free 30-minute connect call requests - captures the lead from the homepage
// "Book a call with Jenn" form so Jenn can reach out to schedule.
//
// Deployed automatically by Cloudflare Pages at /api/book-call.
//
// Two delivery paths, so a request is never lost:
//
// 1. NOTIFICATION (always on, zero config): the request is forwarded to the
//    same Formspree form as the membership waitlist on /membership, which
//    emails each submission to the form owner. Works the moment this
//    deploys.
//
// 2. CRM (optional): if the env vars below are set, the lead is also
//    upserted into MailerLite so call requests build the mailing list.
//      MAILERLITE_API_KEY               MailerLite → Integrations → API
//                                       (already set for the Stripe webhook)
//      MAILERLITE_CALL_REQUEST_GROUP_ID id of a "Free Call Requests" group.
//    The requested date/time land in a custom text field `call_request`
//    (create it in MailerLite → Subscribers → Fields); phone goes into the
//    default `phone` field. If `call_request` doesn't exist yet, MailerLite
//    rejects the payload with a 422 - we retry once without it. Like the
//    Vibe Reset form, POST /api/subscribers upserts by email and only ADDS
//    groups, so an existing subscriber or member keeps everything she has.
//
// The visitor gets a success response when at least one path accepts the
// request.

// Same Formspree form as WAITLIST_FORM_ENDPOINT in src/data/links.js
// (functions are bundled separately from the Vite app, so the constant is
// duplicated here).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykoegpy';

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

  const lead = {
    name: sanitizeText(body.name, 80),
    phone: sanitizePhone(body.phone),
    email: String(body.email ?? '').trim().toLowerCase(),
    preferredDate: sanitizeDate(body.preferredDate),
    preferredTime: sanitizeText(body.preferredTime, 40),
  };

  if (!lead.name) {
    return json({ ok: false, error: 'Please tell us your name.' }, 400);
  }
  if (!lead.phone) {
    return json({ ok: false, error: 'Please enter a phone number Jenn can reach you at.' }, 400);
  }
  if (!lead.email || lead.email.length > 254 || !EMAIL_RE.test(lead.email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const [notified, crmSaved] = await Promise.all([
    sendToFormspree(lead, request.headers.get('origin')),
    upsertToMailerLite(lead, env),
  ]);

  if (!notified && !crmSaved) {
    return json(
      { ok: false, error: 'Something went wrong on our end. Please try again in a moment.' },
      502
    );
  }

  return json({ ok: true }, 200);
}

// Notification path - emails the request via the existing Formspree form.
async function sendToFormspree(lead, origin) {
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        ...(origin ? { origin } : {}),
      },
      body: JSON.stringify({
        _subject: `Free 30-min call request from ${lead.name}`,
        _replyto: lead.email,
        form: 'Homepage free 30-minute call request',
        name: lead.name,
        phone: lead.phone,
        email: lead.email,
        preferred_date: lead.preferredDate || 'No preference',
        preferred_time: lead.preferredTime || 'No preference',
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error(`[book-call] Formspree submit failed: ${res.status} ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[book-call] Formspree request errored:', err);
    return false;
  }
}

// CRM path - best-effort MailerLite upsert; skipped when not configured.
async function upsertToMailerLite(lead, env) {
  if (!env.MAILERLITE_API_KEY || !env.MAILERLITE_CALL_REQUEST_GROUP_ID) {
    return false;
  }

  const callRequest = [
    lead.preferredDate && `Preferred date: ${lead.preferredDate}`,
    lead.preferredTime && `Preferred time: ${lead.preferredTime}`,
  ]
    .filter(Boolean)
    .join(' · ');

  const basePayload = {
    email: lead.email,
    fields: {
      name: lead.name,
      phone: lead.phone,
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

    // A 422 usually means the `call_request` custom field hasn't been
    // created in MailerLite yet - retry with default fields only so the
    // lead still lands in the group.
    if (res.status === 422 && callRequest) {
      console.error('[book-call] 422 with call_request field, retrying without it');
      res = await upsertSubscriber(env, basePayload);
    }

    if (!res.ok) {
      const detail = await res.text();
      console.error(`[book-call] MailerLite upsert failed: ${res.status} ${detail}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[book-call] MailerLite request errored:', err);
    return false;
  }
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
