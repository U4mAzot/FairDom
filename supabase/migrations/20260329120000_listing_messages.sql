-- Konwersacje o konkretnej ofercie (kupujący <-> sprzedający) + wiadomości.
-- Jedna konwersacja na parę (listing_slug, buyer_id).

create table if not exists public.listing_conversations (
  id uuid primary key default gen_random_uuid(),
  listing_slug text not null,
  listing_title text not null,
  seller_id uuid not null references auth.users (id) on delete cascade,
  buyer_id uuid not null references auth.users (id) on delete cascade,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint listing_conversations_distinct_participants check (seller_id <> buyer_id),
  constraint listing_conversations_unique_buyer_per_listing unique (listing_slug, buyer_id)
);

create index if not exists listing_conversations_seller_last_idx
  on public.listing_conversations (seller_id, last_message_at desc);

create index if not exists listing_conversations_buyer_last_idx
  on public.listing_conversations (buyer_id, last_message_at desc);

create table if not exists public.listing_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.listing_conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint listing_messages_body_not_empty check (length(trim(body)) > 0)
);

create index if not exists listing_messages_conversation_created_idx
  on public.listing_messages (conversation_id, created_at asc);

create or replace function public.listing_conversations_touch_last_message()
returns trigger as $$
begin
  update public.listing_conversations
  set last_message_at = new.created_at,
      updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists listing_messages_touch_conversation on public.listing_messages;
create trigger listing_messages_touch_conversation
  after insert on public.listing_messages
  for each row execute function public.listing_conversations_touch_last_message();

alter table public.listing_conversations enable row level security;
alter table public.listing_messages enable row level security;

-- Konwersacje: uczestnicy widzą i tworzą (kupujący zakłada wiersz)
create policy "listing_conversations_select_participant"
  on public.listing_conversations for select
  to authenticated
  using (auth.uid() = seller_id or auth.uid() = buyer_id);

create policy "listing_conversations_insert_buyer"
  on public.listing_conversations for insert
  to authenticated
  with check (auth.uid() = buyer_id);

create policy "listing_conversations_update_participant"
  on public.listing_conversations for update
  to authenticated
  using (auth.uid() = seller_id or auth.uid() = buyer_id)
  with check (auth.uid() = seller_id or auth.uid() = buyer_id);

-- Wiadomości: tylko uczestnik konwersacji, nadawca = zalogowany
create policy "listing_messages_select_participant"
  on public.listing_messages for select
  to authenticated
  using (
    exists (
      select 1 from public.listing_conversations c
      where c.id = listing_messages.conversation_id
        and (c.seller_id = auth.uid() or c.buyer_id = auth.uid())
    )
  );

create policy "listing_messages_insert_sender"
  on public.listing_messages for insert
  to authenticated
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.listing_conversations c
      where c.id = listing_messages.conversation_id
        and (c.seller_id = auth.uid() or c.buyer_id = auth.uid())
    )
  );

grant select, insert, update on public.listing_conversations to authenticated;
grant select, insert on public.listing_messages to authenticated;

grant all on public.listing_conversations to service_role;
grant all on public.listing_messages to service_role;

comment on table public.listing_conversations is 'Wątek czatu o ofercie: sprzedający i kupujący.';
comment on table public.listing_messages is 'Wiadomości w wątku listing_conversations.';
