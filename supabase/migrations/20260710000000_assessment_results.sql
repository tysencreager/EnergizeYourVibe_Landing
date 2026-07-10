-- Saved 7 Pillar Assessment results. One row per completed assessment so
-- members can revisit their latest result (and we keep history for a future
-- "progress over time" view).

create table public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- Per-pillar totals, e.g. {"align": 32, "feel": 27, ...}. Bands and
  -- percentages are derived in the app so scoring tweaks don't require
  -- data migrations.
  scores jsonb not null,
  created_at timestamptz not null default now()
);

create index assessment_results_user_created_idx
  on public.assessment_results (user_id, created_at desc);

alter table public.assessment_results enable row level security;

create policy "users read own results"
  on public.assessment_results for select
  using (auth.uid() = user_id);

create policy "users insert own results"
  on public.assessment_results for insert
  with check (auth.uid() = user_id);
