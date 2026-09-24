// Event registration - adds a registrant to the event's MailerLite group
// (landing pages at /events/<slug>, e.g. /events/fall-reset).
//
// Deployed automatically by Cloudflare Pages at /api/event-register.
//
// Required environment variable (already set for the Stripe webhook):
//   MAILERLITE_API_KEY  MailerLite → Integrations → API
//
// Events are defined in src/data/events.js (shared with the landing page).
// Each event names its MailerLite group; this function finds that group by
// exact name and creates it if it doesn't exist yet, so a new event needs no
// new env vars. The confirmation email (with the Zoom link or directions) is
// a MailerLite automation triggered when a subscriber joins the group - see
// emails/event-registrations.md.
//
// Events with `pricing` (free for members, paid for everyone else) also ask
// whether the registrant is a member. The answer is stored in the MailerLite
// `event_ticket` custom field so Jenn can tell paid spots from member spots
// in the registrant list; the non-member payment itself happens on the
// thank-you page (Stripe Payment Link / Venmo), not here.
//
// Like the other lead forms, POST /api/subscribers upserts by email and only
// ADDS groups, so an existing subscriber or member keeps her other groups.

import {
  getEvent,
  hasNonMemberPrice,
  isRegistrationOpen,
  MEMBERSHIP_OPTIONS,
  ticketLabel,
} from '../../src/data/events.js';

const MAILERLITE_API = 'https://connect.mailerlite.com/api';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENERIC_ERROR = 'Something went wrong on our end. Please try again in a moment.';

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

  const event = getEvent(String(body.event ?? ''));
  if (!event) {
    return json({ ok: false, error: 'We couldn’t find that event.' }, 404);
  }
  if (!isRegistrationOpen(event)) {
    return json({ ok: false, error: 'Registration for this event has closed.' }, 410);
  }

  const firstName = sanitizeName(body.firstName);
  const lastName = sanitizeName(body.lastName);
  const email = String(body.email ?? '').trim().toLowerCase();
  const rawPhone = String(body.phone ?? '').trim();
  const phone = sanitizePhone(rawPhone);
  const membership = String(body.membership ?? '').trim();

  if (!firstName) {
    return json({ ok: false, error: 'Please tell us your first name.' }, 400);
  }
  if (!lastName) {
    return json({ ok: false, error: 'Please tell us your last name.' }, 400);
  }
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }
  if (event.phoneRequired && !phone) {
    return json(
      { ok: false, error: 'Please enter a phone number so we can text you updates.' },
      400
    );
  }
  if (rawPhone && !phone) {
    return json(
      {
        ok: false,
        error: event.phoneRequired
          ? 'Please enter a valid phone number.'
          : 'Please enter a valid phone number, or leave it blank.',
      },
      400
    );
  }
  if (hasNonMemberPrice(event) && !MEMBERSHIP_OPTIONS.includes(membership)) {
    return json(
      { ok: false, error: 'Please let us know whether you’re an Energize Your Vibe member.' },
      400
    );
  }
  const ticket = ticketLabel(event, membership);

  if (!env.MAILERLITE_API_KEY) {
    console.error('[event-register] MAILERLITE_API_KEY not configured');
    return json(
      { ok: false, error: 'Registration is temporarily unavailable. Please try again soon.' },
      503
    );
  }

  try {
    const groupId = await findOrCreateGroup(env, event.mailerliteGroup);
    if (!groupId) return json({ ok: false, error: GENERIC_ERROR }, 502);

    const res = await mailerlite(env, '/subscribers', {
      method: 'POST', // upserts by email; adds groups without removing existing ones
      body: JSON.stringify({
        email,
        fields: {
          name: firstName,
          last_name: lastName,
          // Only send a phone when given, so a blank never erases one on file.
          ...(phone ? { phone } : {}),
          lead_source: 'website_event_registration',
          // Member vs paid spot, for priced events only (custom text field
          // `event_ticket` in MailerLite - see emails/event-registrations.md).
          ...(ticket ? { event_ticket: ticket } : {}),
        },
        groups: [groupId],
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error(`[event-register] MailerLite upsert failed: ${res.status} ${detail}`);
      return json({ ok: false, error: GENERIC_ERROR }, 502);
    }
  } catch (err) {
    console.error('[event-register] MailerLite request errored:', err);
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }

  return json({ ok: true }, 200);
}

// filter[name] is a partial match, so pick the exact name from the results.
async function findOrCreateGroup(env, name) {
  const search = await mailerlite(
    env,
    `/groups?limit=100&filter[name]=${encodeURIComponent(name)}`
  );
  if (!search.ok) {
    const detail = await search.text();
    console.error(`[event-register] MailerLite group lookup failed: ${search.status} ${detail}`);
    return null;
  }
  const { data = [] } = await search.json();
  const existing = data.find((group) => group.name.trim().toLowerCase() === name.toLowerCase());
  if (existing) return existing.id;

  console.warn(`[event-register] MailerLite group "${name}" not found, creating it`);
  const created = await mailerlite(env, '/groups', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  if (!created.ok) {
    const detail = await created.text();
    console.error(`[event-register] MailerLite group create failed: ${created.status} ${detail}`);
    return null;
  }
  return (await created.json()).data?.id ?? null;
}

function mailerlite(env, path, init = {}) {
  return fetch(`${MAILERLITE_API}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${env.MAILERLITE_API_KEY}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
}

function sanitizeName(value) {
  return String(value ?? '')
    .replace(/[\r\n\t<>]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
}

function sanitizePhone(value) {
  const phone = String(value ?? '')
    .replace(/[^\d+()\-.\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 30);
  return (phone.match(/\d/g) || []).length >= 7 ? phone : '';
}

function json(payload, status) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}
