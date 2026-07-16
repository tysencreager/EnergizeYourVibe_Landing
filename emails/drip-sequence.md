# EYV Welcome Drip — sequence plan & copy (Jenn's July 2026 edits)

Automation for new **Energize Your Vibe** signups in MailerLite.
Copy source: `EYV_Email_Drip_Edits.docx` — Jenn rewrote all four emails and
reordered the sequence.

**Trigger:** subscriber joins the group `EYV Members` (group id
`192368708907173146`). Trigger on *group join* — not *form completed* — so it
fires no matter how the subscriber arrives: API (Stripe webhook), manual
import, or a form.

**Flow:** Email 1 (immediately) → wait 2 days → Email 2 → wait 3 days →
Email 3 → wait 4 days → Email 4.

Sender for all emails: **Jenn from Energize Your Vibe** —
jenn@energizeyourvibe.com.

> ⚠️ **Facebook link needed:** the welcome email links to the private
> Facebook community, currently a `FACEBOOK_GROUP_URL_PLACEHOLDER` in
> `01-welcome.html`. Replace it with the real group URL before sending
> (the site footer needs the same URL — it currently points at `#`).

---

## Email 1 — sent immediately: Welcome

- **Subject:** Welcome to the Energize Your Vibe community 💗
- **Preview text:** Welcome to the community — here are your next steps.
- **Design:** `01-welcome.html`
- Jenn's welcome letter ("Hey Sista!") with three NEXT STEPS:
  1. Create your member account → https://www.energizeyourvibe.com/login
  2. Join the community space → Instagram + private Facebook group
  3. Take the 7 Pillar Assessment → https://www.energizeyourvibe.com/portal/assessment

## Email 2 — Day 2: Check-in + Sister Snapshot

- **Subject:** Checking in — and a little favor 💗
- **Preview text:** Sending love — and a little favor that helps us know the real you.
- **Design:** `02-check-in-snapshot.html`
- Check-in note, the Sister Snapshot ask (15–20 minutes, private) →
  https://www.energizeyourvibe.com/portal/snapshot — plus the
  "from member to sister" steps (come to a gathering, launch party heads-up,
  hit reply) and the add-to-home-screen tip.

## Email 3 — Day 5: The Heart behind the 7 Pillars

- **Subject:** The heart behind the 7 Pillars
- **Preview text:** Seven areas of life, one step at a time.
- **Design:** `03-seven-pillars.html`
- All seven pillars (including SHINE), monthly pillar calls with Jenn +
  coaches/guest experts, recordings in the library for 30 days, call
  schedule → https://www.energizeyourvibe.com/events

## Email 4 — Day 9: Meet Jenn

- **Subject:** The moment I chose to keep going
- **Preview text:** Why this community exists — and why it means so much to me.
- **Design:** `04-meet-jenn.html`
- Jenn's full vulnerable story, in her words, ending with
  "Read my full story" → https://www.energizeyourvibe.com/about

---

## Delivery notes

- The MailerLite automation **"EYV Welcome Drip"** (id `192368734104454783`)
  already has 4 email steps with delays — update each step's subject and
  paste the matching HTML file into the editor.
- New members are added to the `EYV Members` group automatically by the
  Stripe webhook (`functions/api/stripe-webhook.js`) when
  `MAILERLITE_API_KEY` + `MAILERLITE_GROUP_ID` are set in Cloudflare.
- Sender email must be verified in MailerLite (Settings → Domains) before
  the automation can send.
