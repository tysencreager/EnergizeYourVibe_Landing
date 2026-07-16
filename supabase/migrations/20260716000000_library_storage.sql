-- Member resource library stored in Supabase Storage.
-- A PRIVATE bucket keeps the paywall intact: files have no public URL, and
-- only logged-in members can mint a short-lived signed URL to view/download.
-- The portal (ProtectedRoute) already limits these pages to active members.

insert into storage.buckets (id, name, public)
values ('library', 'library', false)
on conflict (id) do nothing;

-- Any authenticated member may read (and therefore sign URLs for) library files.
-- Uploads/edits are done by Jenn via the Supabase dashboard (service role),
-- so there is intentionally no insert/update/delete policy for members.
create policy "members can read library files"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'library');
