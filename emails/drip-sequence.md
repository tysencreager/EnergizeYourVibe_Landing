# EYV Welcome Drip — sequence plan & copy

Automation for new **Energize Your Vibe** signups in MailerLite.

**Trigger:** subscriber joins the group `EYV Members` (create this group in the
EYV MailerLite account). Trigger on *group join* — not *form completed* — so it
fires no matter how the subscriber arrives: API, manual import, Zapier, or a form.

**Flow:** Email 1 (immediately) → wait 2 days → Email 2 → wait 3 days → Email 3
→ wait 4 days → Email 4.

Sender for all emails: **Jenn from Energize Your Vibe** — jenn@energizeyourvibe.com.

---

## Email 1 — sent immediately

- **Subject:** You're in, sister 💗 Welcome to Energize Your Vibe
- **Preview text:** You're in, sister. Here's what happens next.
- **Design:** ready to paste — see `01-welcome.html`.

---

## Email 2 — Day 2: The six pillars

- **Subject:** The 6 pillars that hold everything together
- **Preview text:** ALIGN · FEEL · THINK · FUEL · CONNECT · FLOW
- **Design:** ready to paste — see `02-pillars.html`.

> Hey sister,
>
> Everything we do inside Energize Your Vibe hangs on six pillars. They're not
> a curriculum you complete — they're the six areas of your life we keep coming
> back to, together:
>
> - **ALIGN** — Spiritual Wellness
> - **FEEL** — Emotional Wellness
> - **THINK** — Mindset & Mental Clarity
> - **FUEL** — Physical Health & Energy
> - **CONNECT** — Relationships & Community
> - **FLOW** — Money, Lifestyle & Receiving
>
> Most of us are strong in two or three and quietly running on empty in the
> rest. That's normal — and it's exactly what the sisterhood is for.
>
> **This week:** pick the pillar that feels heaviest right now and start there.
> The portal has resources for each one.
>
> [Explore the pillars →](https://www.energizeyourvibe.com/pillars)
>
> — Jenn

---

## Email 3 — Day 5: Jenn's story

- **Subject:** The moment I chose to keep going
- **Preview text:** The story behind Energize Your Vibe.
- **Design:** ready to paste — see `03-jenns-story.html`.

> Hey sister,
>
> I want to tell you why this community exists.
>
> I was widowed at 22, with a young child, standing in the middle of a life I
> didn't plan. In the middle of that grief I made a choice: keep going. That
> choice led me through years of healing work, faith, mindset and nervous-system
> work — not as theory, but as survival that slowly became transformation.
>
> I've lost best friends to cancer. I've been impacted by suicide and walked
> with people I love through addiction and mental health struggles. I'm not
> here because life has been easy. I'm here because I know what it takes to
> come back to yourself — and I know no woman should have to do it alone.
>
> Energize Your Vibe is the space I wish I'd had: women who show up willing —
> willing to grow, to own their lives, to lift each other. No gossip, no staying
> stuck. Support, accountability, and real joy.
>
> Whatever you're carrying right now — you're seen here. You matter here.
>
> [Meet the community →](https://www.energizeyourvibe.com/about)
>
> You are welcome here. I love you!
>
> — Jenn

---

## Email 4 — Day 9: Show up & what's coming

- **Subject:** Don't just join the sisterhood — live it
- **Preview text:** Events, the launch party, and one small ask.
- **Design:** ready to paste — see `04-show-up.html`.

> Hey sister,
>
> Connection doesn't happen by scrolling — it happens by showing up. Here's how
> to go from "member" to "sister" this month:
>
> **1. Come to a gathering.** Live calls and events are where the magic is.
> Check what's coming up: [energizeyourvibe.com/events](https://www.energizeyourvibe.com/events)
>
> **2. Stay tuned for the launch party.** An in-person celebration of the
> sisterhood coming together — members get first invites. Details land in your
> inbox soon.
>
> **3. Hit reply and tell me one thing** you want to be different 90 days from
> now. I read every reply — and saying it out loud is the first step.
>
> 📱 **Quick tip:** save energizeyourvibe.com to your phone's home screen
> (Share → *Add to Home Screen* on iPhone, ⋮ → *Add to Home Screen* on Android)
> and the sisterhood opens like an app — one tap away.
>
> We lead with love. We live with intention. We have fun.
>
> — Jenn

---

## How signups reach MailerLite (important)

The website currently does **not** push signups to MailerLite automatically.
Two options, in order of preference:

1. **Automated (recommended, needs the Stripe webhook function):** the same
   Cloudflare Pages Function that will mark memberships `active` in Supabase
   after Stripe checkout should also call the MailerLite API
   (`POST /api/subscribers` with `groups: [<EYV Members group id>]`). One
   webhook, both jobs. Until that function exists, nothing is automated
   end-to-end.
2. **Manual bridge (works today):** export new members from Stripe/Supabase and
   import them into the `EYV Members` group — the group-join trigger fires on
   import (MailerLite asks on import whether to trigger automations — say yes).
