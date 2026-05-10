-- Profiles table holds per-user membership state.
-- Each row is keyed to an auth.users row. The Stripe webhook updates
-- membership_status; the app reads it via RLS-protected select.

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  stripe_customer_id text unique,
  membership_status text not null default 'none'
    check (membership_status in ('none','active','canceled','past_due')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_stripe_customer_id_idx
  on public.profiles (stripe_customer_id);

alter table public.profiles enable row level security;

-- Members can read their own profile (used by useAuth to fetch membership_status).
create policy "users read own profile"
  on public.profiles for select
  using (auth.uid() = user_id);

-- Members can update only their own first_name / last_name. Everything
-- else (membership_status, stripe_customer_id) is set by the webhook
-- using the service role key, which bypasses RLS.
create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep updated_at fresh.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- When a new auth user is created (via magic link signup), automatically
-- create a matching profile row with membership_status = 'none'.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do nothing;
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
