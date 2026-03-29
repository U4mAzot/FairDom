"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import {
  BedDouble,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Wallet,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { parseSearchFiltersFromParams } from "@/lib/searchUrl";
import {
  BEDS_FILTER_LABELS,
  MOCK_LISTINGS,
  PRICE_FILTER_LABELS,
  type BedsFilter,
  type PriceFilter,
  type SearchListing,
  type SortOption,
} from "@/components/search/mockListings";
import { filterAndSortListings } from "@/components/search/filterListings";
import { PropertySearchCard } from "@/components/search/PropertySearchCard";
import { SearchShellHeader } from "@/components/search/SearchShellHeader";

const SearchMap = dynamic(
  () => import("@/components/search/SearchMap").then((m) => m.SearchMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[320px] items-center justify-center bg-slate-900 text-sm text-slate-400">
        Ładowanie mapy…
      </div>
    ),
  },
);

function useFilteredListings(
  listings: SearchListing[],
  query: string,
  price: PriceFilter,
  beds: BedsFilter,
  sort: SortOption,
) {
  return useMemo(
    () => filterAndSortListings(listings, query, price, beds, sort),
    [listings, query, price, beds, sort],
  );
}

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  close: () => void,
) {
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, close, ref]);
}

const PRICE_OPTIONS: { value: PriceFilter; label: string }[] = [
  { value: "any", label: "Dowolna cena" },
  { value: "under5m", label: "do 5 mln zł" },
  { value: "5m-10m", label: "5 – 10 mln zł" },
  { value: "10m-15m", label: "10 – 15 mln zł" },
  { value: "15m-25m", label: "15 – 25 mln zł" },
  { value: "25m-40m", label: "25 – 40 mln zł" },
  { value: "over40m", label: "powyżej 40 mln zł" },
];

const BEDS_OPTIONS: { value: BedsFilter; label: string }[] = [
  { value: "any", label: "Dowolnie" },
  { value: "1", label: "1+ sypialni" },
  { value: "2", label: "2+ sypialni" },
  { value: "3", label: "3+ sypialni" },
  { value: "4", label: "4+ sypialni" },
  { value: "5", label: "5+ sypialni" },
];

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Od najnowszych",
  "price-asc": "Cena: od najniższej",
  "price-desc": "Cena: od najwyższej",
};

export function SearchResultsView({ viewCounts = {} }: { viewCounts?: Record<string, number> }) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");
  const [bedsFilter, setBedsFilter] = useState<BedsFilter>("any");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [priceOpen, setPriceOpen] = useState(false);
  const [bedsOpen, setBedsOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const priceRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);

  const closePrice = useCallback(() => setPriceOpen(false), []);
  const closeBeds = useCallback(() => setBedsOpen(false), []);
  useClickOutside(priceRef, priceOpen, closePrice);
  useClickOutside(bedsRef, bedsOpen, closeBeds);

  useEffect(() => {
    if (!filtersModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [filtersModalOpen]);

  useEffect(() => {
    const parsed = parseSearchFiltersFromParams(searchParams);
    setSearchQuery(parsed.q);
    setPriceFilter(parsed.price);
    setBedsFilter(parsed.beds);
  }, [searchParams]);

  const listingsWithViews = useMemo(
    () => MOCK_LISTINGS.map((l) => ({ ...l, viewCount: viewCounts[l.id] ?? 0 })),
    [viewCounts],
  );

  const filtered = useFilteredListings(listingsWithViews, searchQuery, priceFilter, bedsFilter, sortBy);

  const resultsLabel = useMemo(() => {
    if (
      searchQuery.trim() === "" &&
      priceFilter === "any" &&
      bedsFilter === "any" &&
      sortBy === "newest"
    ) {
      return "50 luksusowych ofert w Polsce";
    }
    return `${filtered.length} ${filtered.length === 1 ? "wynik" : "wyników"} w Polsce`;
  }, [searchQuery, priceFilter, bedsFilter, sortBy, filtered.length]);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-surface-low">
      <SearchShellHeader />
      <div className="mt-[72px] flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <section className="flex min-h-0 w-full flex-col overflow-hidden lg:w-1/2 xl:w-[52%]">
          <div className="z-10 shrink-0 bg-surface-low p-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative min-w-[240px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj miasta, dzielnicy, adresu…"
                  className="w-full rounded-xl border-0 bg-white py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div ref={priceRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setPriceOpen((o) => !o);
                      setBedsOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-on-surface-variant transition hover:bg-surface-lowest"
                  >
                    <Wallet className="h-5 w-5" aria-hidden />
                    {PRICE_FILTER_LABELS[priceFilter]}
                    <ChevronDown className={`h-4 w-4 transition ${priceOpen ? "rotate-180" : ""}`} />
                  </button>
                  {priceOpen && (
                    <ul className="absolute left-0 top-full z-20 mt-1 min-w-[200px] rounded-xl border border-black/5 bg-white py-1 shadow-xl">
                      {PRICE_OPTIONS.map((opt) => (
                        <li key={opt.value}>
                          <button
                            type="button"
                            className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-surface-low"
                            onClick={() => {
                              setPriceFilter(opt.value);
                              setPriceOpen(false);
                            }}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div ref={bedsRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setBedsOpen((o) => !o);
                      setPriceOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-on-surface-variant transition hover:bg-surface-lowest"
                  >
                    <BedDouble className="h-5 w-5" aria-hidden />
                    {BEDS_FILTER_LABELS[bedsFilter]}
                    <ChevronDown className={`h-4 w-4 transition ${bedsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {bedsOpen && (
                    <ul className="absolute left-0 top-full z-20 mt-1 min-w-[180px] rounded-xl border border-black/5 bg-white py-1 shadow-xl">
                      {BEDS_OPTIONS.map((opt) => (
                        <li key={opt.value}>
                          <button
                            type="button"
                            className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-surface-low"
                            onClick={() => {
                              setBedsFilter(opt.value);
                              setBedsOpen(false);
                            }}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFiltersModalOpen(true);
                    setPriceOpen(false);
                    setBedsOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-tertiary px-4 py-3 font-medium text-white transition hover:opacity-95 active:scale-[0.98]"
                  aria-expanded={filtersModalOpen}
                  aria-haspopup="dialog"
                >
                  <SlidersHorizontal className="h-5 w-5" aria-hidden />
                  Filtry
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-headline text-lg font-bold text-on-surface">{resultsLabel}</h2>
              <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                <span>Sortuj:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer border-0 bg-transparent p-0 font-bold text-primary focus:outline-none focus:ring-0"
                >
                  {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                    <option key={k} value={k}>
                      {SORT_LABELS[k]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto p-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((listing) => (
                <PropertySearchCard
                  key={listing.id}
                  listing={listing}
                  isHighlighted={hoveredId === listing.id}
                  onEnter={() => setHoveredId(listing.id)}
                  onLeave={() => setHoveredId(null)}
                />
              ))}
            </AnimatePresence>
            {filtered.length === 0 && (
              <p className="py-12 text-center text-on-surface-variant">
                Brak ofert spełniających kryteria. Zmień wyszukiwanie lub filtry.
              </p>
            )}
          </div>

          {filtersModalOpen && (
            <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center" role="presentation">
              <button
                type="button"
                className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
                aria-label="Zamknij filtry"
                onClick={() => setFiltersModalOpen(false)}
              />
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="search-filters-title"
                className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
              >
                <div className="border-b border-outline-variant/20 px-6 py-4">
                  <h2 id="search-filters-title" className="font-headline text-xl font-bold text-primary">
                    Filtry
                  </h2>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    Cena, sypialnie i sortowanie — to samo co powyżej, w jednym miejscu.
                  </p>
                </div>
                <div className="space-y-6 overflow-y-auto px-6 py-5">
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Przedział ceny
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPriceFilter(opt.value)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                            priceFilter === opt.value
                              ? "bg-primary text-white"
                              : "bg-surface-low text-on-surface hover:bg-surface-lowest"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Sypialnie
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {BEDS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setBedsFilter(opt.value)}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                            bedsFilter === opt.value
                              ? "bg-primary text-white"
                              : "bg-surface-low text-on-surface hover:bg-surface-lowest"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="filters-sort" className="mb-3 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Sortowanie
                    </label>
                    <select
                      id="filters-sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full rounded-xl border border-outline-variant/30 bg-surface-low px-4 py-3 font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                    >
                      {(Object.keys(SORT_LABELS) as SortOption[]).map((k) => (
                        <option key={k} value={k}>
                          {SORT_LABELS[k]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 border-t border-outline-variant/20 px-6 py-4">
                  <button
                    type="button"
                    className="flex-1 rounded-xl border-2 border-outline-variant py-3 font-headline font-bold text-on-surface transition hover:bg-surface-low"
                    onClick={() => {
                      setPriceFilter("any");
                      setBedsFilter("any");
                      setSortBy("newest");
                    }}
                  >
                    Wyczyść
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-primary py-3 font-headline font-bold text-white shadow-sm transition hover:opacity-90"
                    onClick={() => setFiltersModalOpen(false)}
                  >
                    Zastosuj
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="relative hidden min-h-0 flex-1 border-l border-outline-variant/15 lg:block">
          <div className="absolute inset-0">
            <SearchMap
              listings={filtered}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
