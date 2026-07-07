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
