-- Storage bucket for listing photos
-- Run in Supabase SQL Editor after prior migrations

insert into storage.buckets (id, name, public)
values ('listing-photos', 'listing-photos', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload listing photos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'listing-photos' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Listing photos are publicly readable"
  on storage.objects for select
  to public
  using (bucket_id = 'listing-photos');

create policy "Users can delete own listing photos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing-photos' and auth.uid()::text = (storage.foldername(name))[1]);
