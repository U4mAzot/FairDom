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
  const price = HERO_PRICE_TO_PARAM[params.priceLabel] ?? "any";
  const beds = HERO_BEDS_TO_PARAM[params.bedsLabel] ?? "any";

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
