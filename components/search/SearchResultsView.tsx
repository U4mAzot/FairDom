"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import {
  BedDouble,
  ChevronDown,
  RefreshCw,
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
        Loading map…
      </div>
    ),
  },
);

function useFilteredListings(
  query: string,
  price: PriceFilter,
  beds: BedsFilter,
  sort: SortOption,
) {
  return useMemo(
    () => filterAndSortListings(MOCK_LISTINGS, query, price, beds, sort),
    [query, price, beds, sort],
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
  { value: "any", label: "Any price" },
  { value: "under500k", label: "Under $500k" },
  { value: "500k-1m", label: "$500k – $1M" },
  { value: "1m-1.5m", label: "$1M – $1.5M" },
  { value: "1.5m-2m", label: "$1.5M – $2M" },
  { value: "under2m", label: "Under $2M" },
  { value: "2to3m", label: "$2M – $3M" },
  { value: "over3m", label: "Over $3M" },
  { value: "2m-plus", label: "$2M+" },
];

const BEDS_OPTIONS: { value: BedsFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+ beds" },
  { value: "2", label: "2+ beds" },
  { value: "3", label: "3+ beds" },
  { value: "4", label: "4+ beds" },
  { value: "5", label: "5+ beds" },
];

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest First",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
};

export function SearchResultsView() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");
  const [bedsFilter, setBedsFilter] = useState<BedsFilter>("any");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [priceOpen, setPriceOpen] = useState(false);
  const [bedsOpen, setBedsOpen] = useState(false);
  const [areaToast, setAreaToast] = useState(false);

  const priceRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);

  const closePrice = useCallback(() => setPriceOpen(false), []);
  const closeBeds = useCallback(() => setBedsOpen(false), []);
  useClickOutside(priceRef, priceOpen, closePrice);
  useClickOutside(bedsRef, bedsOpen, closeBeds);

  useEffect(() => {
    const parsed = parseSearchFiltersFromParams(searchParams);
    setSearchQuery(parsed.q);
    setPriceFilter(parsed.price);
    setBedsFilter(parsed.beds);
  }, [searchParams]);

  const filtered = useFilteredListings(searchQuery, priceFilter, bedsFilter, sortBy);

  const resultsLabel = useMemo(() => {
    if (
      searchQuery.trim() === "" &&
      priceFilter === "any" &&
      bedsFilter === "any" &&
      sortBy === "newest"
    ) {
      return "342 results in London, UK";
    }
    return `${filtered.length} result${filtered.length === 1 ? "" : "s"} in London, UK`;
  }, [searchQuery, priceFilter, bedsFilter, sortBy, filtered.length]);

  const searchThisArea = () => {
    setAreaToast(true);
    window.setTimeout(() => setAreaToast(false), 2200);
  };

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
                  placeholder="Search neighborhoods, cities..."
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
                  className="flex items-center gap-2 rounded-xl bg-tertiary px-4 py-3 font-medium text-white transition active:scale-[0.98]"
                >
                  <SlidersHorizontal className="h-5 w-5" aria-hidden />
                  Filters
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-headline text-lg font-bold text-on-surface">{resultsLabel}</h2>
              <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                <span>Sort by:</span>
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
                No properties match your filters. Try adjusting search or filters.
              </p>
            )}
          </div>
        </section>

        <section className="relative hidden min-h-0 flex-1 border-l border-outline-variant/15 lg:block">
          <div className="absolute inset-0">
            <SearchMap
              listings={filtered}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[600] flex justify-center pt-4">
            <button
              type="button"
              onClick={searchThisArea}
              className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-6 py-2.5 font-bold text-primary shadow-lg backdrop-blur-md transition hover:bg-white"
            >
              <RefreshCw className="h-5 w-5" aria-hidden />
              Search this area
            </button>
          </div>
          {areaToast && (
            <div className="pointer-events-none absolute bottom-24 left-1/2 z-[700] -translate-x-1/2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg">
              Refining results for visible map…
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
