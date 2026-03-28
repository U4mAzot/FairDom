import { buildPolishLuxuryListings } from "@/components/search/buildPolishListings";
import { formatPricePln, formatPriceShortPln } from "@/lib/formatPln";

export type MarkerVariant = "navy" | "white" | "mint";

export type SearchListing = {
  id: string;
  title: string;
  price: number;
  priceDisplay: string;
  priceShort: string;
  lat: number;
  lng: number;
  markerVariant: MarkerVariant;
  badge?: "new" | "reduced";
  oldPriceDisplay?: string;
  priceChangePct?: number;
  address: string;
  image: string;
  beds: number;
  baths: number;
  /** Metraż użytkowy (m²). */
  areaSqm: number;
  /** Liczba wyświetleń z `listing_view_counts` (SSR + inkrement na stronie szczegółów). */
  viewCount: number;
};

/** Środek mapy — Polska. */
export const POLAND_MAP_CENTER: [number, number] = [52.1, 19.3];

function withHeroListing(listings: SearchListing[]): SearchListing[] {
  const hero: SearchListing = {
    id: "pl-001",
    title: "Penthouse Obsydian — Złota 44, Warszawa",
    price: 28_500_000,
    priceDisplay: formatPricePln(28_500_000),
    priceShort: formatPriceShortPln(28_500_000),
    lat: 52.2302,
    lng: 21.0116,
    markerVariant: "navy",
    badge: "new",
    priceChangePct: 4.2,
    address: "ul. Złota 44, Śródmieście, Warszawa",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARb3s4yavqzA218EAlpdktE6_wkLzkNLpLIFFkyE5KBsT1MOPa8xar235uSWszea2oL0m7JAgZ2mY2EQvykgNroKgY71wCTlVw8Bp0NQC2Y2KIEiigu1ihgCBlAzSjghbN8vunaT037bvOeI8YGlqi-jxr-N9Q3tHn2PeoFBmVwFxRkcF3h5QnMt3acUelmqQoReVXZcceEi0Qj6ecELjW_VScTsiiVbY5_D153npEHisN7vARWZv6rUIIAyiFuf7OLd30m-vgLHk",
    beds: 5,
    baths: 4,
    areaSqm: 342,
    viewCount: 0,
  };
  return [hero, ...listings];
}

export const MOCK_LISTINGS: SearchListing[] = withHeroListing(buildPolishLuxuryListings());

export type PriceFilter =
  | "any"
  | "under5m"
  | "5m-10m"
  | "10m-15m"
  | "15m-25m"
  | "25m-40m"
  | "over40m";
export type BedsFilter = "any" | "1" | "2" | "3" | "4" | "5";
export type SortOption = "newest" | "price-asc" | "price-desc";

export const PRICE_FILTER_LABELS: Record<PriceFilter, string> = {
  any: "Cena",
  under5m: "do 5 mln zł",
  "5m-10m": "5 – 10 mln zł",
  "10m-15m": "10 – 15 mln zł",
  "15m-25m": "15 – 25 mln zł",
  "25m-40m": "25 – 40 mln zł",
  over40m: "powyżej 40 mln zł",
};

export const BEDS_FILTER_LABELS: Record<BedsFilter, string> = {
  any: "Sypialnie i łazienki",
  "1": "1+ sypialni",
  "2": "2+ sypialni",
  "3": "3+ sypialni",
  "4": "4+ sypialni",
  "5": "5+ sypialni",
};
