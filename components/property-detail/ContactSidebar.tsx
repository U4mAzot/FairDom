"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LineChart, Lock, Phone, Send } from "lucide-react";
import { useClientSession } from "@/hooks/useClientSession";
import { PROPERTY } from "@/components/property-detail/mockProperty";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { upsertConversationAndSendFirstMessage } from "@/lib/listingMessages";

export type ContactSidebarProps = {
  seller?: {
    name: string;
    title: string;
    avatar: string;
    phone: string;
  };
  messageDefault?: string;
  investment?: { yield: string; tax: string };
  /** Identyfikator oferty w URL (np. pl-001). */
  listingSlug?: string;
  listingTitle?: string;
  /** UUID sprzedawcy w Supabase — bez tego czat nie zapisze wątku. */
  sellerUserId?: string | null;
};

export function ContactSidebar({
  seller = PROPERTY.seller,
  messageDefault = PROPERTY.messageDefault,
  investment = PROPERTY.investment,
  listingSlug = PROPERTY.slug,
  listingTitle = PROPERTY.title,
  sellerUserId = PROPERTY.sellerUserId,
}: ContactSidebarProps = {}) {
  const pathname = usePathname();
  const { session, ready } = useClientSession();
  const loggedIn = !!session;

  const [phoneVisible, setPhoneVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>(messageDefault);
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const loginHref = `/login?returnUrl=${encodeURIComponent(pathname || "/")}`;

  useEffect(() => {
    if (session?.email) setEmail((e) => e || session.email);
  }, [session?.email]);

  useEffect(() => {
    if (session?.fullName) setName((n) => n || session.fullName);
  }, [session?.fullName]);

  useEffect(() => {
    setMessage(messageDefault);
  }, [messageDefault]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError(null);
    if (!session?.userId) return;
    if (!sellerUserId) {
      setSendError(
        "Ta oferta nie ma przypisanego konta sprzedawcy w systemie — czat jest niedostępny. Skontaktuj się telefonicznie.",
      );
      return;
    }
    if (session.userId === sellerUserId) {
      setSendError("To jest Twoja oferta — użyj panelu Wiadomości, aby odpowiadać kupującym.");
      return;
    }
    if (!message.trim()) {
      setSendError("Wpisz treść wiadomości.");
      return;
    }
    if (!isSupabaseConfigured()) {
      setSendError("Brak konfiguracji Supabase — wiadomość nie została zapisana.");
      return;
    }
    setSubmitting(true);
    const supabase = createClient();
    const { error } = await upsertConversationAndSendFirstMessage(supabase, {
      listingSlug,
      listingTitle,
      sellerId: sellerUserId,
      buyerId: session.userId,
      body: message.trim(),
    });
    setSubmitting(false);
    if (error) {
      setSendError(error.message);
      return;
    }
    setStatus("sent");
    window.setTimeout(() => setStatus("idle"), 8000);
  };

  return (
    <aside className="w-full lg:w-[400px]">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-xl border border-outline-variant/10 bg-white p-8 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src={seller.avatar}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="font-headline text-xl font-bold text-primary">{seller.name}</h3>
              <p className="text-sm text-on-surface-variant">{seller.title}</p>
            </div>
          </div>
          <div className="space-y-4">
            {!loggedIn && ready && (
              <p className="rounded-lg bg-surface-low px-4 py-3 text-sm text-on-surface-variant">
                Ogłoszenia są publiczne jak na Otodom. Aby zadzwonić lub napisać do sprzedającego,
                zaloguj się.
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                if (!loggedIn) return;
                setPhoneVisible((v) => !v);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2ECC71] py-4 font-bold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={!ready}
            >
              {loggedIn ? (
                <>
                  <Phone className="h-5 w-5" aria-hidden />
                  {phoneVisible ? seller.phone : "Pokaż numer telefonu"}
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" aria-hidden />
                  Zaloguj się, aby zobaczyć numer
                </>
              )}
            </button>
            {!loggedIn && ready && (
              <Link
                href={loginHref}
                className="flex w-full items-center justify-center rounded-lg border-2 border-primary py-3 text-sm font-bold text-primary transition hover:bg-surface-low"
              >
                Przejdź do logowania
              </Link>
            )}

            {loggedIn ? (
              <form className="space-y-4 border-t border-surface-low pt-4" onSubmit={handleSubmit}>
                {sendError && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700" role="alert">
                    {sendError}
                  </p>
                )}
                <div>
                  <label
                    htmlFor="pd-name"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    Imię i nazwisko
                  </label>
                  <input
                    id="pd-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jan Kowalski"
                    className="w-full rounded-md border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pd-email"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    E-mail
                  </label>
                  <input
                    id="pd-email"
                    type="email"
                    value={email}
                    readOnly
                    placeholder="jan@example.com"
                    className="w-full cursor-not-allowed rounded-md border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pd-msg"
                    className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  >
                    Wiadomość
                  </label>
                  <textarea
                    id="pd-msg"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-md border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  />
                </div>
                {status === "sent" && (
                  <p className="text-sm font-semibold text-on-tertiary-container" role="status">
                    Wiadomość wysłana. Odpowiedzi znajdziesz w{" "}
                    <Link href="/dashboard?section=messages" className="font-bold underline">
                      Panelu → Wiadomości
                    </Link>{" "}
                    (zakładka Kupuję).
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-70"
                >
                  <Send className="h-5 w-5" aria-hidden />
                  {submitting ? "Wysyłanie…" : "Wyślij wiadomość"}
                </button>
              </form>
            ) : (
              ready && (
                <div className="relative space-y-3 border-t border-surface-low pt-4">
                  <div className="pointer-events-none select-none space-y-4 opacity-40 blur-[1px]">
                    <div className="h-10 rounded-md bg-surface-low" />
                    <div className="h-10 rounded-md bg-surface-low" />
                    <div className="h-24 rounded-md bg-surface-low" />
                  </div>
                  <div className="absolute inset-0 top-4 flex flex-col items-center justify-center gap-3 bg-white/80 px-4 text-center">
                    <Lock className="h-8 w-8 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-primary">Napisz do sprzedającego po zalogowaniu</p>
                    <Link
                      href={loginHref}
                      className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
                    >
                      Zaloguj się
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-primary p-6 text-white shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <LineChart className="h-5 w-5 text-tertiary-fixed" aria-hidden />
            <span className="font-headline font-bold">Podsumowanie inwestycji</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-tighter opacity-70">Potencjalny zwrot</div>
              <div className="text-lg font-bold">{investment.yield}</div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-tighter opacity-70">Podatek (szac.)</div>
              <div className="text-lg font-bold">{investment.tax}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
