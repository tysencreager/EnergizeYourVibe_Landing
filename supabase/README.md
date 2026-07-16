# Supabase

Database schema and config for the Energize Your Vibe member portal.

## Applying migrations

Migrations in `migrations/` are timestamped SQL files. There are two ways to apply them:

### Option A — paste into the SQL Editor (fastest, one-off)

1. Open the Supabase dashboard for the project
2. Go to **SQL Editor** → **New query**
3. Paste the contents of the migration file
4. Click **Run**

### Option B — Supabase CLI (recommended once we have more than one migration)

```sh
# install once
brew install supabase/tap/supabase

# from repo root, link to the hosted project (run once)
supabase link --project-ref uupcfafzlggpionezhwi

# push any unapplied migrations
supabase db push
```

## Current schema

- `public.profiles` — one row per `auth.users` row. Stores membership state and Stripe customer id.
  - `membership_status` is one of `none | active | canceled | past_due`
  - The Stripe webhook (Cloudflare Pages Function) updates this column using the service role key.
  - Row-Level Security only lets a user read or update their own row.
- Trigger `on_auth_user_created` auto-inserts a profile row when a new auth user signs up.
- `public.assessment_results` — saved 7 Pillar Assessment results (one row per completion).
- `public.sister_snapshots` — Jenn's get-to-know-you survey, one row per member (upserted).

## Member resource library (Supabase Storage)

Pillar worksheets/guides live in a **private** Storage bucket called `library`,
one folder per pillar key. The bucket is private so files have no public URL —
the portal mints a short-lived signed URL for logged-in members only, which
keeps the content behind the membership paywall.

**One-time setup:** run `migrations/20260716000000_library_storage.sql` (creates
the bucket + the member-read policy).

**Uploading files** (Jenn / admin, via the Supabase dashboard → Storage → `library`):

The portal reads each pillar's folder live, so uploads appear automatically —
no code changes, no filename registry.

1. Upload into the pillar's folder — one of: `Align`, `Feel`, `Think`, `Fuel`,
   `Connect`, `Flow`, `Shine` (Capitalized; paths are case-sensitive).
2. That's it. The card title is derived from the filename: the extension and
   any redundant pillar prefix/suffix are stripped ("Align - 5 Minute Morning
   Vibes.png" shows as "5 Minute Morning Vibes"). Name files the way you want
   the title to read. "Welcome" files sort first; everything else alphabetical.
3. PNG/JPG files get a preview thumbnail; PDFs get a document card. Deleting a
   file from the folder removes it from the portal too.

## Stripe webhook setup

The webhook lives at `functions/api/stripe-webhook.js` and deploys with the site
(URL: `https://<domain>/api/stripe-webhook`). It activates memberships after
checkout, keeps them in sync on subscription changes, and optionally enrolls
new members in the MailerLite welcome drip.

1. **Stripe dashboard** → Developers → Webhooks → Add endpoint
   - URL: `https://www.energizeyourvibe.com/api/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`,
     `customer.subscription.deleted`
   - Copy the signing secret (`whsec_...`)
2. **Cloudflare Pages** → Settings → Environment variables (Production):
   - `STRIPE_WEBHOOK_SECRET` — the signing secret from step 1
   - `SUPABASE_SERVICE_ROLE_KEY` — Supabase → Settings → API → service_role
   - `MAILERLITE_API_KEY` / `MAILERLITE_GROUP_ID` — optional, for the welcome drip
   - (`VITE_SUPABASE_URL` should already be set for the frontend)
3. Redeploy, then send a test event from the Stripe webhook page and confirm it
   returns 200 and the profile row flips to `active`.

If a customer pays before ever signing in, the webhook creates their Supabase
auth user (email pre-confirmed) so the profile exists and is activated; their
first magic link then signs them into that same account.

## Auth configuration (set in dashboard, not in migration)

Authentication → URL Configuration → **Redirect URLs**:

- `http://localhost:5173/auth/callback`
- `https://elevateyourvibe-landing.pages.dev/auth/callback`
- `https://www.energizeyourvibe.com/auth/callback` (production domain — adjust if different)

Authentication → Email Templates → **Magic Link**: customize copy/branding as desired (not in source control yet).
