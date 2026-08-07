# Vibe Reset lead nurture — MailerLite setup & sequence plan

Automation for **free 10-Minute Vibe Reset** leads captured at
`energizeyourvibe.com/vibe-reset`. These are *leads*, not members — they live
in their own group so they never mix with the `EYV Members` welcome drip.

## One-time MailerLite setup (required before the funnel goes live)

1. **Create the group** — MailerLite → Subscribers → Groups → create
   `Vibe Reset Leads`. Copy its group id.
2. **Create the custom field** (optional but recommended) — Subscribers →
   Fields → add a text field named `lead_source`. The signup API sets it to
   `website_vibe_reset` so these leads stay distinguishable even outside the
   group.
3. **Cloudflare Pages** → Settings → Environment variables (Production +
   Preview):
   - `MAILERLITE_VIBE_RESET_GROUP_ID` — the group id from step 1
   - (`MAILERLITE_API_KEY` should already be set for the Stripe webhook)
4. **Create the automation** — trigger: *subscriber joins group*
   `Vibe Reset Leads`. Trigger on group join (same convention as the member
   drip) so it fires however the lead arrives.
5. **Email 1** — paste `05-vibe-reset-delivery.html` as a Custom HTML email
   (subject below). Once this automation is live, flip
   `VIBE_RESET_EMAIL_DELIVERY_LIVE` to `true` in `src/data/links.js` so the
   thank-you page shows "We've also sent a copy to your inbox."
6. **Exclude members (recommended)** — add an automation condition so
   subscribers already in `EYV Members` exit before Email 3 (the membership
   pitch). Members grabbing the freebie should get the reset itself (Emails
   1–2) but not be sold a membership they already have.

How the website adds leads: `functions/api/vibe-reset-signup.js` upserts the
subscriber by email with `fields.name`, `fields.lead_source =
website_vibe_reset`, and the `Vibe Reset Leads` group. Upserts only *add*
groups — an existing member keeps her `EYV Members` group and data untouched.

## Sequence

**Flow:** Email 1 (immediately) → wait 1 day → Email 2 → wait 2 days →
Email 3 → wait 2–4 days → Email 4.

Sender for all emails: **Jenn from Energize Your Vibe** —
jenn@energizeyourvibe.com.

### Email 1 — immediately: Deliver the reset

- **Subject:** Your 10-Minute Vibe Reset is here ✨
- **Preview text:** Ten intentional minutes, just for you.
- **Design:** `05-vibe-reset-delivery.html` (built, ready to paste)
- Delivers the PDF link
  (`https://www.energizeyourvibe.com/assets/10-minute-vibe-reset.pdf`).

### Email 2 — ~1 day later: How did your reset feel?

- **Subject:** How did your reset feel?
- **Purpose:** Encourage her to actually complete it and normalize coming
  back to the reset whenever she needs it.
- **Copy draft:**
  > Hi {$name},
  >
  > Did you get a chance to take your ten minutes yet? If not — no guilt.
  > That's actually the whole point of the Vibe Reset: it's there whenever
  > you're ready, not one more thing on your list.
  >
  > If you did, I'd love to hear what came up for you. Hit reply and tell me
  > one word for how you want to feel this week.
  >
  > And keep it close. The reset works best when it becomes your go-to pause —
  > before a hard conversation, after a long day, or any moment life feels a
  > little too loud.
  >
  > [OPEN MY VIBE RESET AGAIN]
  >
  > With love,
  > Jenn

### Email 3 — ~3 days later: Knowing where to focus

- **Subject:** Feeling better is one thing. Knowing where to focus is another.
- **Purpose:** Introduce the idea that our overall "vibe" is shaped by several
  areas of life (Align · Feel · Think · Fuel · Connect · Flow · Shine) and
  that EYV members get a personalized picture through the 7 Pillar Assessment.
- **Copy draft:**
  > Hi {$name},
  >
  > The Vibe Reset helps you check in with what you need *right now*. But have
  > you ever noticed the "off" feeling keeps coming back — and it's hard to
  > say why?
  >
  > That's because your overall vibe is shaped by seven different areas of
  > life: how aligned you feel, what you're feeling and thinking, how you fuel
  > your body, who you're connected to, how money and lifestyle flow, and how
  > freely you let yourself shine.
  >
  > Inside the Energize Your Vibe community, members start with the 7 Pillar
  > Assessment — a personalized map of where their energy is thriving and
  > where it's quietly asking for support — plus resources and real
  > sisterhood for each pillar.
  >
  > [SEE WHAT'S INSIDE →  https://www.energizeyourvibe.com/membership]
  >
  > With love,
  > Jenn

### Email 4 — ~5–7 days later: Invitation

- **Subject:** You don't have to figure it out alone
- **Purpose:** Warm invitation to explore the community, member library,
  Pillar Assessment, monthly calls, and deeper support. Mention the current
  offer (still no sign-up fee — just $88/mo; first 50 Founding Members lock
  in the rate for life).
- **CTA:** Explore the community → https://www.energizeyourvibe.com/membership

## Delivery notes

- Emails 2–4 are copy drafts — build them in MailerLite (reuse the layout of
  `05-vibe-reset-delivery.html` or the drag-and-drop editor).
- Sender email must be verified in MailerLite (Settings → Domains).
- Wait to enable the automation until the final
  `public/assets/10-minute-vibe-reset.pdf` is deployed to production — the
  email links straight to it.
