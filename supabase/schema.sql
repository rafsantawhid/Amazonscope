-- AmazonScope Production Schema
-- Run this in Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  plan text default 'free' check (plan in ('free', 'pro', 'enterprise')),
  api_quota_used integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  asin text not null,
  country text default 'US',
  title text,
  brand text,
  price numeric,
  list_price numeric,
  currency text default 'USD',
  discount_percent numeric,
  availability text,
  rating numeric,
  ratings_total integer,
  best_sellers_rank jsonb,
  category text,
  subcategory text,
  image_url text,
  images jsonb,
  bullet_points jsonb,
  description text,
  specifications jsonb,
  variations jsonb,
  attributes jsonb,
  seller_id text,
  buy_box_seller text,
  product_url text,
  raw_data jsonb,
  last_fetched_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(asin, country)
);

create index if not exists idx_products_asin on public.products(asin);

create table if not exists public.sellers (
  id uuid primary key default uuid_generate_v4(),
  seller_id text not null unique,
  name text,
  rating numeric,
  ratings_total integer,
  total_products integer,
  store_url text,
  about text,
  raw_data jsonb,
  last_fetched_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_asin text not null,
  country text default 'US',
  review_id text,
  rating integer,
  title text,
  body text,
  author text,
  verified_purchase boolean default false,
  helpful_votes integer,
  review_date date,
  images jsonb,
  raw_data jsonb,
  created_at timestamptz default now(),
  unique(product_asin, review_id, country)
);

create table if not exists public.offers (
  id uuid primary key default uuid_generate_v4(),
  product_asin text not null,
  country text default 'US',
  seller_id text,
  seller_name text,
  price numeric,
  currency text,
  condition text,
  is_buy_box boolean default false,
  is_prime boolean default false,
  shipping_info text,
  raw_data jsonb,
  fetched_at timestamptz default now()
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  category_id text not null,
  country text default 'US',
  name text,
  path text,
  parent_id text,
  raw_data jsonb,
  unique(category_id, country)
);

create table if not exists public.deals (
  id uuid primary key default uuid_generate_v4(),
  deal_id text,
  title text,
  discount_percent numeric,
  deal_type text,
  start_time timestamptz,
  end_time timestamptz,
  products jsonb,
  country text default 'US',
  raw_data jsonb,
  fetched_at timestamptz default now()
);

create table if not exists public.influencers (
  id uuid primary key default uuid_generate_v4(),
  influencer_id text unique,
  name text,
  handle text,
  profile_url text,
  followers integer,
  raw_data jsonb,
  last_fetched_at timestamptz default now()
);

create table if not exists public.search_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  query text not null,
  query_type text,
  results_count integer,
  country text default 'US',
  created_at timestamptz default now()
);

create table if not exists public.saved_products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_asin text not null,
  country text default 'US',
  notes text,
  tags text[],
  created_at timestamptz default now(),
  unique(user_id, product_asin, country)
);

create table if not exists public.api_cache (
  id uuid primary key default uuid_generate_v4(),
  cache_key text not null unique,
  endpoint text not null,
  response jsonb not null,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists public.ai_chats (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  session_id text not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  product_context jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.saved_products enable row level security;
alter table public.search_history enable row level security;
alter table public.ai_chats enable row level security;
alter table public.products enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own saved products" on public.saved_products for all using (auth.uid() = user_id);
create policy "Public read products" on public.products for select using (true);
