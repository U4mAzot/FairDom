-- Profil użytkownika + dane firmy (NIP, siedziba). Wypełniane przy rejestracji (upsert z klienta lub po pierwszym logowaniu).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  account_type text not null default 'private' check (account_type in ('private', 'business')),

  company_legal_name text,
  nip text,
  regon text,

  registered_street text,
  registered_building_no text,
  registered_apartment text,
  registered_postal_code text,
  registered_city text,
  registered_voivodeship text,
  registered_country text default 'Polska',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_business_requires_core check (
    account_type <> 'business'
    or (
      company_legal_name is not null
      and length(trim(company_legal_name)) > 0
      and nip is not null
      and length(trim(nip)) > 0
      and registered_street is not null
      and length(trim(registered_street)) > 0
      and registered_postal_code is not null
      and length(trim(registered_postal_code)) > 0
      and registered_city is not null
      and length(trim(registered_city)) > 0
    )
  )
);

create unique index if not exists profiles_nip_unique
  on public.profiles (nip)
  where account_type = 'business' and nip is not null and length(trim(nip)) = 10;

comment on table public.profiles is 'Dane profilu i firmy; insert/upsert z aplikacji po rejestracji lub pierwszym logowaniu.';

create or replace function public.set_profiles_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

grant select, insert, update on table public.profiles to authenticated;
grant all on table public.profiles to service_role;
