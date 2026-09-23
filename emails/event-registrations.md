# Event registrations: landing pages + confirmation emails

Free events (guest expert workshops, calls, gatherings) get a registration
page at `energizeyourvibe.com/events/<slug>`. Registrants land in a
per-event MailerLite group, and a MailerLite automation on that group sends
the confirmation email with the Zoom link.

- Event content: `src/data/events.js` (one entry per event; drives the
  landing page, thank-you page, and the "Coming up" list on `/events`)
- API: `functions/api/event-register.js` → `POST /api/event-register`
- Needs only `MAILERLITE_API_KEY` in Cloudflare (already set for the Stripe
  webhook). No per-event env vars.

What the form collects: first name, last name, email, phone (optional).
They're saved to MailerLite's default `name`, `last_name`, and `phone` fields,
with `lead_source = website_event_registration`. Upserts only *add* groups,
so an existing member keeps her `EYV Members` group and data.

Registration closes automatically when the event ends (start time +
duration). After that the page shows "Registration has closed" and the API
rejects new sign-ups.

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
   entry). Put the headshot in `public/assets/`. Use a new, unique
   `mailerliteGroup` name, e.g. `Event: <Title> (<Mon D, YYYY>)`. Check that
   the `startsAt` UTC offset matches daylight/standard time (`-06:00` MDT,
   `-07:00` MST; DST ends Nov 1, 2026).
2. Optional short link: add a line to `public/_redirects` above the SPA
   fallback.
3. Copy `06-fall-reset-registration.html` to a new numbered file, swap in
   the new copy, event details, and Google Calendar `dates` (UTC), keeping
   the Zoom `{{tokens}}`.
4. In MailerLite: create the group, then an automation on it with the
   filled-in email (steps 1–4 above).

Past events drop off the `/events` list automatically. Their pages stay up
and show "Registration has closed".
