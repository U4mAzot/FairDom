import type { BedsFilter, PriceFilter } from "@/components/search/mockListings";

const HERO_PRICE_TO_PARAM: Record<string, PriceFilter> = {
  Dowolny: "any",
  "do $500k": "under500k",
  "$500k – $1M": "500k-1m",
  "$1M – $1.5M": "1m-1.5m",
  "$1.5M – $2M": "1.5m-2m",
  "$2M+": "2m-plus",
};

const HERO_BEDS_TO_PARAM: Record<string, BedsFilter> = {
  Dowolnie: "any",
  "1+ syp. / 1+ łaz.": "1",
  "2+ syp. / 1+ łaz.": "2",
  "3+ syp. / 2+ łaz.": "3",
  "4+ syp. / 3+ łaz.": "4",
};

/** Ujednolicenie myślników / spacji — inaczej mapowanie z UI może paść na innym znaku niż w kluczu. */
function normalizeHeroLabel(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[-\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "–");
}

function lookupHeroPrice(label: string): PriceFilter {
  const direct = HERO_PRICE_TO_PARAM[label];
  if (direct) return direct;
  const n = normalizeHeroLabel(label);
  for (const [k, v] of Object.entries(HERO_PRICE_TO_PARAM)) {
    if (normalizeHeroLabel(k) === n) return v;
  }
  return "any";
}

function lookupHeroBeds(label: string): BedsFilter {
  const direct = HERO_BEDS_TO_PARAM[label];
  if (direct) return direct;
  const n = normalizeHeroLabel(label);
  for (const [k, v] of Object.entries(HERO_BEDS_TO_PARAM)) {
    if (normalizeHeroLabel(k) === n) return v;
  }
  return "any";
}

const PRICE_PARAM_VALUES = new Set<string>([
  "any",
  "under500k",
  "500k-1m",
  "1m-1.5m",
  "1.5m-2m",
  "under2m",
  "2to3m",
  "over3m",
  "2m-plus",
]);

const BEDS_PARAM_VALUES = new Set<string>(["any", "1", "2", "3", "4", "5"]);

export function buildSearchPathFromHero(params: {
  city: string;
  priceLabel: string;
  bedsLabel: string;
}): string {
  const q = params.city.trim();
  const price = lookupHeroPrice(params.priceLabel);
  const beds = lookupHeroBeds(params.bedsLabel);

  const sp = new URLSearchParams();
  if (q) sp.set("q", q);
  if (price !== "any") sp.set("price", price);
  if (beds !== "any") sp.set("beds", beds);

  const qs = sp.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function parseSearchFiltersFromParams(
  searchParams: URLSearchParams,
): { q: string; price: PriceFilter; beds: BedsFilter } {
  const q = searchParams.get("q")?.trim() ?? "";

  const rawPrice = searchParams.get("price");
  const price: PriceFilter =
    rawPrice && PRICE_PARAM_VALUES.has(rawPrice) ? (rawPrice as PriceFilter) : "any";

  const rawBeds = searchParams.get("beds");
  const beds: BedsFilter =
    rawBeds && BEDS_PARAM_VALUES.has(rawBeds) ? (rawBeds as BedsFilter) : "any";

  return { q, price, beds };
}
