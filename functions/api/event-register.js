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
// Events with `pricing` (a member price and a non-member price) also ask
// whether the registrant is a member. The answer is stored in the MailerLite
// `event_ticket` custom field so Jenn can tell paid spots from member spots
// in the registrant list; the payment itself happens on the thank-you page
// (Stripe Payment Link / Venmo), not here.
//
// Events with a `capacity` stop taking registrations once their group holds
// that many active subscribers (someone already in the group can still
// re-register). GET /api/event-register?event=<slug> reports the spots left
// so the page can show "full" before anyone fills in the form.
//
// Like the other lead forms, POST /api/subscribers upserts by email and only
// ADDS groups, so an existing subscriber or member keeps her other groups.
//
// Jenn also gets a heads-up email for every registration, sent through the
// same Formspree form as the book-a-call and waitlist forms (Formspree
// emails each submission to the form owner). It's best effort: it runs
// after MailerLite accepts the registration and never blocks or fails the
// sign-up. Optional env var EVENT_NOTIFY_FORMSPREE_ENDPOINT points it at a
// dedicated form (or "off" to disable).

import {
  getEvent,
  hasNonMemberPrice,
  isFreeTier,
  isRegistrationOpen,
  MEMBERSHIP_OPTIONS,
  ticketLabel,
  ticketTier,
} from '../../src/data/events.js';

const MAILERLITE_API = 'https://connect.mailerlite.com/api';
// Same Formspree form as functions/api/book-call.js and the membership
// waitlist (WAITLIST_FORM_ENDPOINT in src/data/links.js).
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mykoegpy';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const GENERIC_ERROR = 'Something went wrong on our end. Please try again in a moment.';

// Spots left for a capped event: { ok, spotsLeft } (spotsLeft is null for
// events without a capacity). Never creates the group.
export async function onRequestGet({ request, env }) {
  const event = getEvent(new URL(request.url).searchParams.get('event') ?? '');
  if (!event) return json({ ok: false, error: 'We couldn’t find that event.' }, 404);
  if (!event.capacity || !isRegistrationOpen(event)) return json({ ok: true, spotsLeft: null }, 200);
  if (!env.MAILERLITE_API_KEY) return json({ ok: false, error: GENERIC_ERROR }, 503);

  try {
    const groupId = await findGroup(env, event.mailerliteGroup);
    const taken = groupId ? await countRegistrations(env, groupId, event.capacity) : 0;
    return json({ ok: true, spotsLeft: Math.max(0, event.capacity - taken) }, 200);
  } catch (err) {
    console.error('[event-register] spots lookup failed:', err);
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }
}

export async function onRequestPost({ request, env, waitUntil }) {
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

    if (event.capacity && (await isFull(env, event, groupId, email))) {
      return json({ ok: false, full: true, error: `Sorry, this ${event.kindLabel} is full.` }, 409);
    }

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

  // Heads-up to Jenn. Let the response go out first when the runtime
  // allows it; either way a notification failure never affects the visitor.
  const notification = notifyOwner(env, request.headers.get('origin'), {
    event,
    firstName,
    lastName,
    email,
    phone,
    membership,
    ticket,
  });
  if (typeof waitUntil === 'function') waitUntil(notification);
  else await notification;

  return json({ ok: true }, 200);
}

// Emails the registration to the Formspree form owner (Jenn). The registrant
// list of record is still the MailerLite group; this is just so she hears
// about each sign-up as it happens.
async function notifyOwner(env, origin, { event, firstName, lastName, email, phone, membership, ticket }) {
  const endpoint = env.EVENT_NOTIFY_FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT;
  if (endpoint === 'off') return;

  const name = `${firstName} ${lastName}`;
  const tier = ticketTier(event, membership);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        ...(origin ? { origin } : {}),
      },
      body: JSON.stringify({
        _subject: `New registration: ${event.title} - ${name}`,
        _replyto: email,
        form: `Event registration: ${event.title}`,
        event: `${event.title} (${event.dateLabel}, ${event.timeLabel})`,
        name,
        email,
        phone: phone || 'Not given',
        ...(ticket ? { spot: ticket } : {}),
        ...(tier && !isFreeTier(tier)
          ? { payment: `${tier.price} due by card (Stripe) or Venmo - check before the event` }
          : {}),
        registrant_list: `MailerLite group: ${event.mailerliteGroup}`,
        event_page: `https://www.energizeyourvibe.com/events/${event.slug}`,
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error(`[event-register] Formspree notification failed: ${res.status} ${detail}`);
    }
  } catch (err) {
    console.error('[event-register] Formspree notification errored:', err);
  }
}

// Full when the group already holds `capacity` registrants, unless this
// email is one of them (re-registering doesn't take a new spot). A failed
// count lets the registration through rather than turning people away
// because MailerLite hiccuped.
async function isFull(env, event, groupId, email) {
  try {
    if ((await countRegistrations(env, groupId, event.capacity)) < event.capacity) return false;
    const res = await mailerlite(env, `/subscribers/${encodeURIComponent(email)}`);
    if (res.status === 404) return true;
    if (!res.ok) throw new Error(`subscriber lookup ${res.status}`);
    const { data } = await res.json();
    return !(data?.groups ?? []).some((group) => String(group.id) === String(groupId));
  } catch (err) {
    console.error('[event-register] capacity check failed, allowing registration:', err);
    return false;
  }
}

// Active subscribers in the group, counted up to `max` (one page is enough
// to know whether the event is full).
async function countRegistrations(env, groupId, max) {
  const res = await mailerlite(env, `/groups/${groupId}/subscribers?limit=${max}`);
  if (!res.ok) throw new Error(`group subscribers ${res.status}: ${await res.text()}`);
  const { data = [] } = await res.json();
  return data.length;
}

// filter[name] is a partial match, so pick the exact name from the results.
// Resolves to the group id, or null when there's no such group; throws when
// the lookup itself fails.
async function findGroup(env, name) {
  const search = await mailerlite(
    env,
    `/groups?limit=100&filter[name]=${encodeURIComponent(name)}`
  );
  if (!search.ok) {
    throw new Error(`MailerLite group lookup failed: ${search.status} ${await search.text()}`);
  }
  const { data = [] } = await search.json();
  const existing = data.find((group) => group.name.trim().toLowerCase() === name.toLowerCase());
  return existing ? existing.id : null;
}

async function findOrCreateGroup(env, name) {
  const existing = await findGroup(env, name);
  if (existing) return existing;

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
