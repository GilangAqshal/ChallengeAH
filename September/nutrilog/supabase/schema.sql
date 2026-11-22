-- NutriLog - skema Supabase. Jalankan SELURUH file ini di Supabase > SQL Editor > New query > Run.

-- 1) Profil pengguna (1 baris per akun Auth) ---------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  email text not null,
  birth_date date,
  phone text,
  weight_kg numeric,
  height_cm numeric,
  activity_level text,
  goal text,
  gender text check (gender in ('male','female')),
  daily_kcal_target int default 2800,
  avatar_url text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2) Katalog makanan (nilai per 100 g) --------------------------------------
create table public.foods (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  kcal numeric not null,
  protein numeric not null default 0,
  fat numeric not null default 0,
  carbs numeric not null default 0
);

-- 3) Catatan makan & minum ----------------------------------------------------
create table public.meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  food_id uuid not null references public.foods(id),
  grams numeric not null default 100,
  eaten_on date not null default current_date,
  created_at timestamptz not null default now()
);
create index on public.meal_logs (user_id, eaten_on);

create table public.water_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  ml int not null,
  logged_on date not null default current_date,
  created_at timestamptz not null default now()
);
create index on public.water_logs (user_id, logged_on);

-- 4) Otomatis buat profil saat user mendaftar ---------------------------------
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, email, birth_date, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email,'@',1)),
    new.email,
    nullif(new.raw_user_meta_data->>'birth_date','')::date,
    new.raw_user_meta_data->>'phone'
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 5) Login pakai username: cari email dari username ---------------------------
-- Catatan: fungsi ini bisa dipanggil tanpa login, sehingga orang bisa menebak
-- username -> email. Untuk produksi, pertimbangkan login via email saja atau
-- pindahkan ke Edge Function dengan rate limit.
create or replace function public.get_email_by_username(p_username text)
returns text language sql security definer set search_path = public as $$
  select email from public.profiles where lower(username) = lower(p_username) limit 1;
$$;
grant execute on function public.get_email_by_username(text) to anon, authenticated;

-- 6) Row Level Security: tiap user hanya melihat datanya sendiri --------------
alter table public.profiles   enable row level security;
alter table public.foods      enable row level security;
alter table public.meal_logs  enable row level security;
alter table public.water_logs enable row level security;

create policy "profil sendiri - baca"  on public.profiles for select using (auth.uid() = id);
create policy "profil sendiri - ubah"  on public.profiles for update using (auth.uid() = id);
create policy "foods - semua boleh baca" on public.foods for select using (true);
create policy "meal sendiri" on public.meal_logs  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "water sendiri" on public.water_logs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 7) Data makanan awal (dari daftar Suggestions di desain; makro = perkiraan per 100 g,
--    silakan koreksi sesuai sumber gizi yang kamu pakai, mis. TKPI Kemenkes) -----
insert into public.foods (name, kcal, protein, fat, carbs) values
  ('Dada Ayam Rebus',    150, 31.0,  2.0,  0.0),
  ('Dada Ayam Panggang', 165, 31.0,  3.6,  0.0),
  ('Tahu Goreng',        120,  8.0,  9.0,  2.0),
  ('Tempe Goreng',       200, 14.0, 14.0,  9.0),
  ('Nasi Putih',         130,  2.7,  0.3, 28.0),
  ('Ayam Goreng (Paha)', 173, 22.0,  9.0,  0.0),
  ('Telur Rebus',         77,  6.0,  5.0,  0.6),
  ('Telur Goreng',        90,  6.0,  7.0,  0.4),
  ('Boiled Egg and Avocado Salad With Toast', 280, 15.0, 18.0, 25.0),
  ('Onigiri Chicken Mayonnaise Yummy Choice Indomaret', 70, 3.0, 2.0, 13.0);
