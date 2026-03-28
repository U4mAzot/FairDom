-- Jednorazowo: Supabase Dashboard → SQL Editor → wklej → Run.
-- Jeśli migracje nie są podpięte pod ten projekt, ten skrypt tworzy tabelę + funkcję lokalnie w bazie.

drop policy if exists "listing_view_counts_select_public" on public.listing_view_counts;

create table if not exists public.listing_view_counts (
  slug text primary key,
  view_count bigint not null default 0 check (view_count >= 0),
  updated_at timestamptz not null default now()
);

comment on table public.listing_view_counts is 'Wyświetlenia stron szczegółów; inkrementacja przez RPC (anon).';

alter table public.listing_view_counts enable row level security;

create policy "listing_view_counts_select_public"
  on public.listing_view_counts for select
  to anon, authenticated
  using (true);

grant select on table public.listing_view_counts to anon, authenticated;

create or replace function public.increment_listing_view_count(p_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v bigint;
begin
  if p_slug is null or length(trim(p_slug)) = 0 then
    return 0;
  end if;

  insert into public.listing_view_counts (slug, view_count)
  values (trim(p_slug), 1)
  on conflict (slug) do update
    set view_count = listing_view_counts.view_count + 1,
        updated_at = now()
  returning view_count into v;

  return coalesce(v, 0);
end;
$$;

grant execute on function public.increment_listing_view_count(text) to anon, authenticated;

notify pgrst, 'reload schema';
