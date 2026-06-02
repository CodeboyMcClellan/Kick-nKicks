-- Storage bucket for restoration request photos
-- Run in Supabase SQL Editor after 001 + 002

insert into storage.buckets (id, name, public)
values ('restoration-photos', 'restoration-photos', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload restoration photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'restoration-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Restoration photos are publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'restoration-photos');

create policy "Users can delete own restoration photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'restoration-photos' and auth.uid()::text = (storage.foldername(name))[1]);
