"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useClientSession } from "@/hooks/useClientSession";
import { DashboardMessagesPanel } from "@/components/dashboard/DashboardMessagesPanel";
import {
  BarChart3,
  Bath,
  Bed,
  Bell,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Pencil,
  Podcast,
  Rocket,
  Settings,
  Square,
  Trash2,
  TrendingUp,
} from "lucide-react";
import {
  ACTIVE_LISTINGS,
  AGENT_PROFILE,
  ARCHIVED_LISTINGS,
  KPI_STATS,
  LISTING_COUNTS,
  type AgentListing,
  type ListingTab,
  type SidebarKey,
} from "@/components/dashboard/mockData";

const sidebarItems: { key: SidebarKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Przegląd", icon: LayoutDashboard },
  { key: "performance", label: "Wyniki", icon: BarChart3 },
  { key: "messages", label: "Wiadomości", icon: MessageSquare },
  { key: "settings", label: "Ustawienia", icon: Settings },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ListingCard({ listing }: { listing: AgentListing }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm shadow-on-surface/[0.04] transition-all duration-300 hover:-translate-y-1 md:flex-row">
      <div className="relative h-48 w-full shrink-0 md:h-auto md:w-64">
        <Image
          src={listing.image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 256px"
        />
        {listing.featured && (
          <span className="absolute left-4 top-4 rounded px-2 py-1 text-[10px] font-black uppercase tracking-widest text-tertiary shadow-sm bg-tertiary-fixed">
            Wyróżnione
          </span>
        )}
      </div>
      <div className="flex flex-grow flex-col justify-between p-6">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="font-headline text-xl font-bold text-primary">{listing.title}</h3>
            <span className="font-headline text-2xl font-black text-primary">{listing.price}</span>
          </div>
          <p className="mt-1 text-sm text-on-surface-variant">{listing.address}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-secondary">
            <span className="flex items-center gap-1">
              <Bed className="h-4 w-4" aria-hidden />
              {listing.beds}{" "}
              {listing.beds === 1
                ? "sypialnia"
                : listing.beds >= 2 && listing.beds <= 4
                  ? "sypialnie"
                  : "sypialni"}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" aria-hidden />
              {listing.baths}{" "}
              {listing.baths === 1
                ? "łazienka"
                : listing.baths >= 2 && listing.baths <= 4
                  ? "łazienki"
                  : "łazienek"}
            </span>
            <span className="flex items-center gap-1">
              <Square className="h-4 w-4" aria-hidden />
              {listing.areaSqm} m²
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 border-t border-surface-low pt-6">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Edytuj
          </button>
          <button
            type="button"
            className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-bold transition ${
              listing.boostStyle === "mint"
                ? "border-tertiary-fixed bg-tertiary-fixed/10 text-on-tertiary-container hover:bg-tertiary-fixed/20"
                : "border-outline text-on-surface-variant hover:bg-surface-low"
            }`}
          >
            <Rocket className="h-4 w-4" aria-hidden />
            Promuj
          </button>
          <button
            type="button"
            className="ml-auto flex items-center gap-2 text-sm font-semibold text-on-surface-variant transition hover:text-error md:ml-0"
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            Usuń
          </button>
        </div>
      </div>
    </article>
  );
}

export function AgentDashboardClient() {
  const searchParams = useSearchParams();
  const { logout } = useClientSession();
  const [sidebarActive, setSidebarActive] = useState<SidebarKey>("overview");
  const [listingTab, setListingTab] = useState<ListingTab>("active");

  useEffect(() => {
    if (searchParams.get("section") === "messages") {
      setSidebarActive("messages");
    }
  }, [searchParams]);

  const listings: AgentListing[] =
    listingTab === "active" ? ACTIVE_LISTINGS : ARCHIVED_LISTINGS;

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed top-0 z-50 w-full border-b border-white/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-headline text-xl font-black uppercase tracking-tighter text-gray-900 sm:text-2xl"
          >
            FAIRDOM
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/search" className="font-medium text-gray-500 transition hover:text-gray-900">
              Szukaj
            </Link>
            <Link href="/add-listing" className="font-medium text-gray-500 transition hover:text-gray-900">
              Dodaj ogłoszenie
            </Link>
            <span className="border-b-2 border-emerald-400 pb-1 font-bold text-gray-900">
              Panel
            </span>
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative rounded-full p-2 text-on-surface-variant transition hover:bg-surface-low"
              aria-label="Powiadomienia"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary">
              <Image
                src={AGENT_PROFILE.navAvatar}
                alt=""
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-screen max-w-7xl px-6 pb-12 pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="space-y-6 lg:col-span-3">
            <div className="space-y-6 rounded-xl bg-white p-6 shadow-md shadow-on-surface/[0.06]">
              <div className="text-center">
                <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-2xl ring-4 ring-tertiary-fixed/30">
                  <Image
                    src={AGENT_PROFILE.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h2 className="font-headline text-xl font-extrabold text-primary">
                  {AGENT_PROFILE.name}
                </h2>
                <p className="text-sm text-on-surface-variant">{AGENT_PROFILE.title}</p>
              </div>
              <nav className="space-y-1" aria-label="Menu boczne panelu">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = sidebarActive === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setSidebarActive(item.key)}
                      className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left font-medium transition-all ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-on-surface-variant hover:bg-surface-low"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
              <div className="border-t border-outline-variant/20 pt-6">
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white py-3 font-semibold text-error transition hover:bg-error-container/30"
                >
                  <LogOut className="h-4 w-4" aria-hidden />
                  Wyloguj
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-primary to-primary-container p-6 text-white">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-tertiary-fixed" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary-fixed">
                  Wskazówka rozwoju
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-white/90">
                Oferty z wirtualnym spacerem 3D otrzymują{" "}
                <span className="font-bold text-tertiary-fixed">o 45% więcej zapytań</span> w
                pierwszym tygodniu.
              </p>
              <button
                type="button"
                className="w-full rounded-md bg-tertiary-fixed py-2.5 text-sm font-bold text-tertiary transition hover:bg-tertiary-fixed-dim"
              >
                Zaktualizuj ogłoszenia
              </button>
            </div>
          </aside>

          <div className="space-y-8 lg:col-span-9">
            {sidebarActive === "messages" ? (
              <DashboardMessagesPanel />
            ) : sidebarActive === "overview" ? (
              <>
                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {KPI_STATS.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="flex flex-col justify-between rounded-xl bg-surface-low p-6"
                    >
                      <span className="text-sm font-semibold text-on-surface-variant">{kpi.label}</span>
                      <div className="mt-4 flex items-end justify-between">
                        <span className="font-headline text-3xl font-black text-primary">{kpi.value}</span>
                        <span
                          className={`rounded px-2 py-1 text-xs font-bold ${
                            kpi.variant === "positive"
                              ? "bg-tertiary-fixed/20 text-on-tertiary-container"
                              : "bg-error-container/40 text-error"
                          }`}
                        >
                          {kpi.delta}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>

                <section className="space-y-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                      <h1 className="font-headline text-3xl font-black tracking-tight text-primary">
                        Twoje ogłoszenia
                      </h1>
                      <p className="text-on-surface-variant">
                        Zarządzaj ofertami i śledź zainteresowanie klientów.
                      </p>
                    </div>
                    <div
                      className="flex gap-1 rounded-full bg-surface-low p-1"
                      role="tablist"
                      aria-label="Filtr ogłoszeń"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={listingTab === "active"}
                        onClick={() => setListingTab("active")}
                        className={`rounded-full px-6 py-2 text-sm font-bold transition ${
                          listingTab === "active"
                            ? "bg-primary text-white shadow-sm"
                            : "font-medium text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        Aktywne ({LISTING_COUNTS.active})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={listingTab === "archived"}
                        onClick={() => setListingTab("archived")}
                        className={`rounded-full px-6 py-2 text-sm transition ${
                          listingTab === "archived"
                            ? "bg-primary text-white shadow-sm"
                            : "font-medium text-on-surface-variant hover:text-primary"
                        }`}
                      >
                        Archiwum ({LISTING_COUNTS.archived})
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <section className="rounded-xl bg-white p-8 shadow-md shadow-on-surface/[0.06]">
                <h1 className="font-headline text-2xl font-black text-primary">
                  {sidebarActive === "performance" ? "Wyniki" : "Ustawienia"}
                </h1>
                <p className="mt-2 text-on-surface-variant">
                  Ta sekcja będzie dostępna wkrótce.
                </p>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="w-full bg-gray-100 px-6 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="font-headline text-xl font-bold uppercase tracking-tighter text-gray-900">
              FAIRDOM
            </div>
            <p className="text-sm text-gray-500">
              Budujemy przyszłość nieruchomości dzięki transparentności i narzędziom klasy
              profesjonalnej.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-primary">Platforma</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/search" className="hover:text-emerald-500">
                  Szukaj nieruchomości
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Analizy rynku
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Kalkulator kredytu
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-primary">Firma</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Kariera
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Polityka prywatności
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-primary">Wsparcie</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Skontaktuj się ze wsparciem
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Centrum pomocy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500">
                  Dokumentacja API
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FairDom. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6 text-gray-400">
            <button type="button" className="transition hover:text-primary" aria-label="LinkedIn">
              <LinkedInIcon className="h-5 w-5" />
            </button>
            <button type="button" className="transition hover:text-primary" aria-label="X">
              <XIcon className="h-5 w-5" />
            </button>
            <button type="button" className="transition hover:text-primary" aria-label="Podcast">
              <Podcast className="h-5 w-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
