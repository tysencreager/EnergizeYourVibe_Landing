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

## Auth configuration (set in dashboard, not in migration)

Authentication → URL Configuration → **Redirect URLs**:

- `http://localhost:5173/auth/callback`
- `https://elevateyourvibe-landing.pages.dev/auth/callback`
- `https://www.energizeyourvibe.com/auth/callback` (production domain — adjust if different)

Authentication → Email Templates → **Magic Link**: customize copy/branding as desired (not in source control yet).
