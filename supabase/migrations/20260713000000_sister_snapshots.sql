-- Sister Snapshot: Jenn's get-to-know-you survey for new members.
-- One row per member (upserted), answers stored as jsonb keyed by question id
-- so questions can evolve without schema churn. Members can edit and resave.
-- Jenn reads responses via the Supabase dashboard (service role bypasses RLS).

create table public.sister_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sister_snapshots enable row level security;

create policy "users read own snapshot"
  on public.sister_snapshots for select
  using (auth.uid() = user_id);

create policy "users insert own snapshot"
  on public.sister_snapshots for insert
  with check (auth.uid() = user_id);

create policy "users update own snapshot"
  on public.sister_snapshots for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Reuses set_updated_at() from the profiles migration.
create trigger sister_snapshots_set_updated_at
  before update on public.sister_snapshots
  for each row execute function public.set_updated_at();
