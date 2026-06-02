-- Kick'n Kicks — Row Level Security
-- Run after 001_kickn_kicks_schema.sql

alter table profiles enable row level security;
alter table listings enable row level security;
alter table cobblers enable row level security;
alter table restoration_requests enable row level security;
alter table orders enable row level security;
alter table offers enable row level security;
alter table messages enable row level security;
alter table sustainability_log enable row level security;

-- Profiles: public read, owners update own row
create policy "Profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Listings: public read active listings; sellers manage own
create policy "Active listings are public"
  on listings for select using (is_active = true);

create policy "Sellers can insert own listings"
  on listings for insert with check (auth.uid() = seller_id);

create policy "Sellers can update own listings"
  on listings for update using (auth.uid() = seller_id);

-- Cobblers: public read (map / restore flow)
create policy "Cobblers are public"
  on cobblers for select using (true);

-- Restoration requests: owners only
create policy "Users can view own restoration requests"
  on restoration_requests for select using (auth.uid() = user_id);

create policy "Users can create restoration requests"
  on restoration_requests for insert with check (auth.uid() = user_id);

create policy "Users can update own restoration requests"
  on restoration_requests for update using (auth.uid() = user_id);

-- Orders: buyer or seller
create policy "Parties can view their orders"
  on orders for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Buyers can create orders"
  on orders for insert with check (auth.uid() = buyer_id);

-- Offers: buyer creates; buyer/seller on listing can view
create policy "Buyers can create offers"
  on offers for insert with check (auth.uid() = buyer_id);

create policy "Offer parties can view offers"
  on offers for select using (
    auth.uid() = buyer_id
    or auth.uid() = (select seller_id from listings where id = listing_id)
  );

create policy "Sellers can update offers on their listings"
  on offers for update using (
    auth.uid() = (select seller_id from listings where id = listing_id)
  );

-- Messages: sender or receiver
create policy "Users can view own messages"
  on messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on messages for insert with check (auth.uid() = sender_id);

create policy "Receivers can mark messages read"
  on messages for update using (auth.uid() = receiver_id);

-- Sustainability: users see own log; insert own entries
create policy "Users can view own sustainability log"
  on sustainability_log for select using (auth.uid() = user_id);

create policy "Users can log sustainability actions"
  on sustainability_log for insert with check (auth.uid() = user_id);
