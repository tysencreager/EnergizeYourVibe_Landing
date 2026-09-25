# Event registrations: landing pages + confirmation emails

Events (guest expert workshops, calls, in-person gatherings) get a
registration page at `energizeyourvibe.com/events/<slug>`. Registrants land
in a per-event MailerLite group, and a MailerLite automation on that group
sends the confirmation email with the Zoom link or the directions.

- Event content: `src/data/events.js` (one entry per event; drives the
  landing page, thank-you page, and the "Coming up" list on `/events`)
- API: `functions/api/event-register.js` → `POST /api/event-register`
- Needs only `MAILERLITE_API_KEY` in Cloudflare (already set for the Stripe
  webhook). No per-event env vars.

What the form collects: first name, last name, email, phone (optional
unless the event sets `phoneRequired`). They're saved to MailerLite's default
`name`, `last_name`, and `phone` fields, with
`lead_source = website_event_registration`. Upserts only *add* groups, so an
existing member keeps her `EYV Members` group and data.

Events with `pricing` (free for members, paid for everyone else) also ask
"Are you an Energize Your Vibe member?". The answer lands in the custom text
field `event_ticket` (`Member (free)` / `Non-member ($20)`), and non-members
are sent to pay on the thank-you page via the event's Stripe Payment Link
(with their email prefilled) or Venmo. Payment is not verified by the site:
check Stripe / Venmo against the group's non-member rows before the event.

Registration closes automatically when the event ends (start time +
duration). After that the page shows "Registration has closed" and the API
rejects new sign-ups.

**Jenn gets an email for every registration.** After MailerLite accepts a
sign-up, the API forwards it to the same Formspree form that handles the
book-a-call and waitlist forms (Formspree emails each submission to the
form owner). The email has the event, name, email, phone, and for priced
events whether the spot is a member or a non-member who still owes payment.
It's best effort: if Formspree is down or over quota the registration still
goes through, only the heads-up is lost. Formspree's free plan caps a form
at 50 submissions a month across everything that posts to it, so for a
big event either upgrade the form or create a dedicated Formspree form and
set `EVENT_NOTIFY_FORMSPREE_ENDPOINT` in Cloudflare (`off` disables the
notification).

**Zoom details never go in the repo** (it's public) or in
`src/data/events.js` (it ships to every visitor's browser). They live only in
the MailerLite email.

---

## The Fall Reset (Wed, Sep 30, 2026, 11:00 AM MT)

- Page: https://www.energizeyourvibe.com/events/fall-reset
- Short link for flyers/texts: https://www.energizeyourvibe.com/fall-reset
- MailerLite group: `Event: The Fall Reset (Sep 30, 2026)`
- Email: `06-fall-reset-registration.html` (Jenn's copy)

### One-time MailerLite setup (do this before sharing the link)

1. **Create the group**: Subscribers → Groups → create
   `Event: The Fall Reset (Sep 30, 2026)`. The name must match
   `mailerliteGroup` in `src/data/events.js` exactly; the API finds the group
   by name. (If it's missing, the first registration creates it, but
   that person won't get an email unless the automation already exists.)
   Don't rename the group afterward.
2. **Create the automation**: Automations → Create → trigger
   *When subscriber joins a group* → `Event: The Fall Reset (Sep 30, 2026)`.
3. **Add the email step** (no delay):
   - **Subject:** You’re in! The Fall Reset Workshop
   - **Preview text:** Your Zoom link for Wednesday, September 30 is inside.
   - **Sender:** Jenn from Energize Your Vibe, jenn@energizeyourvibe.com
   - **Content:** Custom HTML. Paste `06-fall-reset-registration.html` with
     every `{{ZOOM_...}}` token replaced by the values from the Zoom invite:

     | Token | Value from the Zoom invite |
     | --- | --- |
     | `{{ZOOM_JOIN_URL}}` | "Join Zoom Meeting" link |
     | `{{ZOOM_JOIN_URL_ENCODED}}` | same link, URL-encoded (for the Google Calendar button) |
     | `{{ZOOM_MEETING_ID}}` | Meeting ID |
     | `{{ZOOM_PASSCODE}}` | Passcode |
     | `{{ZOOM_ONE_TAP_1}}`, `{{ZOOM_ONE_TAP_2}}` | the two "One tap mobile" lines |
     | `{{ZOOM_SIP}}` | "Join by SIP" address |
     | `{{ZOOM_INVITE_URL}}` | "Join instructions" link |

4. **Turn the automation on**, then register yourself on the live page to
   test. The email should arrive within a minute or two.

Registrant list: open the group in MailerLite (export to CSV from there).

### Optional: reminder email

MailerLite automations can't wait until "the morning of" a date, so send a
regular **campaign** to the group instead, e.g. at 8:00 AM MT on Sep 30:
"Today's the day! We start at 11:00 AM Mountain Time," with the same Zoom
link.

---

## Sisterhood, S'mores & Soulful Stories (Fri, Oct 2, 2026, 11:30 AM to 2:30 PM MT, in person)

- Page: https://www.energizeyourvibe.com/events/sisterhood-smores
- Short link for flyers/texts: https://www.energizeyourvibe.com/smores
- Where: American Fork Canyon, Roadhouse Camp Area (directions on the page
  and in the email)
- Guest experts: Susan Hart (Owner, Voice to Page · Writing Coach) and Tysen
  Creager (Personal & Business Growth Strategist)
- Price: members free, non-members $20
  - Stripe Payment Link: https://buy.stripe.com/fZu28safa00aaPnaix4wM03
  - Venmo: Jenn's Venmo code link (registrants put their name +
    "Sisterhood s'mores" in the comments)
- MailerLite group: `Event: Sisterhood, S'mores & Soulful Stories (Oct 2, 2026)`
  (id `199526321535059559`, created via the API on Sep 24)
- MailerLite automation: same name, id `199526340778526169`,
  https://dashboard.mailerlite.com/automations/199526340778526169
  (trigger = joins the group above). **Live** as of Sep 25: sender
  Energize Your Vibe, jenn@energizeyourvibe.com; subject "You're in! Get
  ready for the Sisterhood, S'mores, & Soulful Stories Event!"; content is
  `07-sisterhood-smores-registration.html` pasted as Custom HTML.
- MailerLite field: `event_ticket` (text, created via the API on Sep 24)
- Email: `07-sisterhood-smores-registration.html`. No Zoom tokens: it's an
  in-person event, so everything in it is public. If the copy changes,
  re-paste the whole file into the automation's email step.

Once the site deploys, register yourself on the live page to test: the
email should arrive within a minute or two.

### Registrant list

Open the group in MailerLite (export to CSV from there). The `event_ticket`
column shows `Member (free)` or `Non-member ($20)`; match the non-members
against Stripe payments (the Payment Link prefills their email) and Venmo.

### Stripe note

The $20 Payment Link is a one-time payment in the same Stripe account as the
membership subscription. `functions/api/stripe-webhook.js` now ignores
non-subscription checkouts, so an event payment never activates a
membership or enrolls the buyer in the member welcome drip. Nothing to
configure in Stripe for this.

### Optional: text updates

Phone is required for this event ("for text updates"). Phones are on the
group's subscribers (`phone` field / CSV export) for day-of texts.

---

## Adding the next event

Ask Jenn to send, for each event:

1. Title, subtitle, and series (e.g. Guest Expert Series)
2. Date, start time + time zone, and length
3. Format (Zoom / in person + address) and who it's for
4. A short description and the "You'll learn" bullets
5. Guest expert name, title, headshot, and quote (if any)
6. Any freebie/bonus to mention
7. The confirmation email copy (subject + body)
8. The Zoom invite (or in-person details)

The flyer usually covers 1–6.

Then:

1. Add an entry to `EVENTS` in `src/data/events.js` (copy the Fall Reset
   entry for a Zoom workshop, or the Sisterhood entry for an in-person or
   paid event; the field guide at the top of the file lists what's
   optional). Put the headshot in `public/assets/`. Use a new, unique
   `mailerliteGroup` name, e.g. `Event: <Title> (<Mon D, YYYY>)`. Check that
   the `startsAt` UTC offset matches daylight/standard time (`-06:00` MDT,
   `-07:00` MST; DST ends Nov 1, 2026).
2. Optional short link: add a line to `public/_redirects` above the SPA
   fallback.
3. Copy the closest email template to a new numbered file
   (`06-fall-reset-registration.html` for Zoom, keeping the `{{tokens}}`;
   `07-sisterhood-smores-registration.html` for in person / paid) and swap
   in the new copy, event details, and Google Calendar `dates` (UTC).
4. In MailerLite: create the group, then an automation on it with the
   filled-in email (steps 1–4 of the Fall Reset checklist above).

Past events drop off the `/events` calendar, the homepage "Upcoming
events" section, and the site popup automatically (all three read
`upcomingEvents()`). Their pages stay up and show "Registration has closed".
Once no events are open, the popup falls back to the Founding Member
invitation.
