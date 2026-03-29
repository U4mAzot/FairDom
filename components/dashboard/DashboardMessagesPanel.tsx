"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  fetchConversationsAsBuyer,
  fetchConversationsAsSeller,
  fetchMessagesForConversation,
  sendListingMessage,
  type ListingConversationRow,
  type ListingMessageRow,
} from "@/lib/listingMessages";
import { useClientSession } from "@/hooks/useClientSession";

type Tab = "sell" | "buy";

function shortUser(id: string) {
  return `${id.slice(0, 8)}…`;
}

export function DashboardMessagesPanel() {
  const { session, ready } = useClientSession();
  const userId = session?.userId;
  const [tab, setTab] = useState<Tab>("sell");
  const [selling, setSelling] = useState<ListingConversationRow[]>([]);
  const [buying, setBuying] = useState<ListingConversationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ListingMessageRow[]>([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [draft, setDraft] = useState("");
  const [sendErr, setSendErr] = useState<string | null>(null);

  const list = tab === "sell" ? selling : buying;

  const selected = useMemo(
    () => list.find((c) => c.id === selectedId) ?? null,
    [list, selectedId],
  );

  const reloadLists = useCallback(async () => {
    if (!userId || !isSupabaseConfigured()) return;
    setLoading(true);
    setLoadErr(null);
    const supabase = createClient();
    const [asSeller, asBuyer] = await Promise.all([
      fetchConversationsAsSeller(supabase, userId),
      fetchConversationsAsBuyer(supabase, userId),
    ]);
    setLoading(false);
    if (asSeller.error) setLoadErr(asSeller.error.message);
    else if (asBuyer.error) setLoadErr(asBuyer.error.message);
    setSelling(asSeller.data);
    setBuying(asBuyer.data);
  }, [userId]);

  useEffect(() => {
    void reloadLists();
  }, [reloadLists]);

  const loadThread = useCallback(
    async (conversationId: string) => {
      if (!isSupabaseConfigured()) return;
      setMsgLoading(true);
      setSendErr(null);
      const supabase = createClient();
      const { data, error } = await fetchMessagesForConversation(supabase, conversationId);
      setMsgLoading(false);
      if (error) {
        setSendErr(error.message);
        return;
      }
      setMessages(data);
    },
    [],
  );

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    void loadThread(selectedId);
  }, [selectedId, loadThread]);

  useEffect(() => {
    if (!selectedId || !list.some((c) => c.id === selectedId)) {
      setSelectedId(list[0]?.id ?? null);
    }
  }, [list, selectedId, tab]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !selectedId || !draft.trim()) return;
    setSendErr(null);
    const supabase = createClient();
    const { error } = await sendListingMessage(supabase, {
      conversationId: selectedId,
      senderId: userId,
      body: draft,
    });
    if (error) {
      setSendErr(error.message);
      return;
    }
    setDraft("");
    await loadThread(selectedId);
    await reloadLists();
  };

  if (!ready) {
    return <p className="text-sm text-on-surface-variant">Ładowanie…</p>;
  }

  if (!session) {
    return (
      <div className="rounded-xl border border-outline-variant/20 bg-white p-8 shadow-sm">
        <h2 className="font-headline text-xl font-bold text-primary">Wiadomości</h2>
        <p className="mt-2 text-on-surface-variant">
          Zaloguj się, aby zobaczyć konwersacje o ofertach.
        </p>
        <Link
          href="/login?returnUrl=/dashboard"
          className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white"
        >
          Przejdź do logowania
        </Link>
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <p className="text-sm text-on-surface-variant">
        Czat wymaga skonfigurowanego Supabase (NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY).
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-outline-variant/15 bg-white shadow-sm">
      <div className="border-b border-outline-variant/15 px-6 py-4">
        <h2 className="font-headline text-xl font-bold text-primary">Wiadomości</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Sprzedajesz — odpowiadasz zainteresowanym. Kupujesz — pisałeś do ogłoszeniodawców.
        </p>
        <div
          className="mt-4 flex gap-1 rounded-full bg-surface-low p-1"
          role="tablist"
          aria-label="Rodzaj wiadomości"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "sell"}
            onClick={() => {
              setTab("sell");
              setSelectedId(null);
            }}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              tab === "sell" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant"
            }`}
          >
            Sprzedaję
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "buy"}
            onClick={() => {
              setTab("buy");
              setSelectedId(null);
            }}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              tab === "buy" ? "bg-primary text-white shadow-sm" : "text-on-surface-variant"
            }`}
          >
            Kupuję
          </button>
        </div>
      </div>

      {loadErr && (
        <p className="border-b border-error-container/40 bg-error-container/20 px-6 py-3 text-sm text-error">
          {loadErr}
        </p>
      )}

      <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-5">
        <div className="border-outline-variant/15 md:col-span-2 md:border-r">
          {loading ? (
            <p className="p-4 text-sm text-on-surface-variant">Wczytywanie listy…</p>
          ) : list.length === 0 ? (
            <p className="p-4 text-sm text-on-surface-variant">
              {tab === "sell"
                ? "Nikt jeszcze nie napisał w sprawie Twoich ofert — lub ustaw NEXT_PUBLIC_DEMO_SELLER_USER_ID dla demonstracyjnego sprzedawcy."
                : "Nie masz jeszcze konwersacji jako kupujący — napisz do sprzedającego ze strony oferty."}
            </p>
          ) : (
            <ul className="max-h-[480px] divide-y divide-outline-variant/10 overflow-y-auto">
              {list.map((c) => {
                const other = tab === "sell" ? c.buyer_id : c.seller_id;
                const active = c.id === selectedId;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`w-full px-4 py-3 text-left text-sm transition hover:bg-surface-low ${
                        active ? "bg-surface-low" : ""
                      }`}
                    >
                      <span className="line-clamp-2 font-semibold text-primary">{c.listing_title}</span>
                      <span className="mt-1 block text-xs text-on-surface-variant">
                        {tab === "sell" ? "Kupujący" : "Sprzedający"}: {shortUser(other)}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-outline-variant">
                        {new Date(c.last_message_at).toLocaleString("pl-PL")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex flex-col md:col-span-3">
          {!selected ? (
            <div className="flex flex-1 items-center justify-center p-6 text-sm text-on-surface-variant">
              Wybierz konwersację z listy.
            </div>
          ) : (
            <>
              <div className="border-b border-outline-variant/10 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  Oferta
                </p>
                <p className="font-headline font-bold text-primary">{selected.listing_title}</p>
                <Link
                  href={`/properties/${encodeURIComponent(selected.listing_slug)}`}
                  className="mt-1 inline-block text-sm font-semibold text-primary underline"
                >
                  Otwórz ogłoszenie
                </Link>
              </div>
              <div className="max-h-[280px] flex-1 space-y-3 overflow-y-auto px-4 py-3">
                {msgLoading ? (
                  <p className="text-sm text-on-surface-variant">Ładowanie wiadomości…</p>
                ) : (
                  messages.map((m) => {
                    const mine = m.sender_id === userId;
                    return (
                      <div
                        key={m.id}
                        className={`flex ${mine ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                            mine
                              ? "bg-primary text-white"
                              : "bg-surface-low text-on-surface"
                          }`}
                        >
                          {m.body}
                          <div
                            className={`mt-1 text-[10px] ${
                              mine ? "text-white/80" : "text-on-surface-variant"
                            }`}
                          >
                            {new Date(m.created_at).toLocaleString("pl-PL")}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <form onSubmit={handleSend} className="border-t border-outline-variant/10 p-4">
                {sendErr && (
                  <p className="mb-2 text-sm text-error" role="alert">
                    {sendErr}
                  </p>
                )}
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  placeholder="Napisz odpowiedź…"
                  className="mb-2 w-full rounded-lg border-0 bg-surface-low px-3 py-2 text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  Wyślij
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
