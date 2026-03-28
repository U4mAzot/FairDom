import type { BedsFilter, PriceFilter } from "@/components/search/mockListings";

const HERO_PRICE_TO_PARAM: Record<string, PriceFilter> = {
  Dowolny: "any",
  "do 5 mln zł": "under5m",
  "5 – 10 mln zł": "5m-10m",
  "10 – 15 mln zł": "10m-15m",
  "15 – 25 mln zł": "15m-25m",
  "25 – 40 mln zł": "25m-40m",
  "powyżej 40 mln zł": "over40m",
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
  "under5m",
  "5m-10m",
  "10m-15m",
  "15m-25m",
  "25m-40m",
  "over40m",
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
