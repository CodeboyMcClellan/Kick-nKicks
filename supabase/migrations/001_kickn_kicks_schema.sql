-- Kick'n Kicks — initial schema
-- Run in Supabase Dashboard → SQL Editor → New query → paste → Run
--
-- Note: cobblers is created before restoration_requests (FK dependency).

-- ---------------------------------------------------------------------------
-- Users
-- ---------------------------------------------------------------------------
create table profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  is_verified boolean default false,
  seller_rating numeric(2,1),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Listings
-- ---------------------------------------------------------------------------
create table listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references profiles(id),
  brand text,
  model text,
  size numeric(4,1),
  condition text check (condition in ('DS','VNDS','GC','Fair','Poor')),
  price numeric(10,2),
  description text,
  colorway text,
  photos text[],
  is_active boolean default true,
  views int default 0,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Cobblers (must exist before restoration_requests.cobbler_id FK)
-- ---------------------------------------------------------------------------
create table cobblers (
  id uuid primary key default gen_random_uuid(),
  name text,
  address text,
  lat numeric(10,7),
  lng numeric(10,7),
  rating numeric(2,1),
  services text[],
  phone text,
  website text
);

-- ---------------------------------------------------------------------------
-- Restoration requests
-- ---------------------------------------------------------------------------
create table restoration_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  photos text[],
  service_type text check (service_type in ('clean','repaint','sole_swap','reglue','custom')),
  notes text,
  estimated_price_low numeric(8,2),
  estimated_price_high numeric(8,2),
  status text check (status in ('pending','quoted','accepted','in_progress','done')) default 'pending',
  cobbler_id uuid references cobblers(id),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------
create table orders (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  buyer_id uuid references profiles(id),
  seller_id uuid references profiles(id),
  amount numeric(10,2),
  stripe_payment_intent text,
  status text check (status in ('pending','paid','shipped','delivered','disputed','refunded')) default 'pending',
  tracking_number text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Offers
-- ---------------------------------------------------------------------------
create table offers (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references listings(id),
  buyer_id uuid references profiles(id),
  amount numeric(10,2),
  status text check (status in ('pending','accepted','declined','countered')) default 'pending',
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Messages
-- ---------------------------------------------------------------------------
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references profiles(id),
  receiver_id uuid references profiles(id),
  listing_id uuid references listings(id),
  body text,
  read boolean default false,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Sustainability tracker
-- ---------------------------------------------------------------------------
create table sustainability_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  action text check (action in ('restored','resold','donated')),
  shoe_weight_kg numeric default 0.5,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Auto-create profile row when a user signs up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Helpful indexes
-- ---------------------------------------------------------------------------
create index listings_seller_id_idx on listings (seller_id);
create index listings_is_active_created_at_idx on listings (is_active, created_at desc);
create index orders_buyer_id_idx on orders (buyer_id);
create index orders_seller_id_idx on orders (seller_id);
create index offers_listing_id_idx on offers (listing_id);
create index messages_sender_receiver_idx on messages (sender_id, receiver_id);
create index restoration_requests_user_id_idx on restoration_requests (user_id);
