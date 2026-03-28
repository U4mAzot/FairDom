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
  sqft: number;
};

export const LONDON_CENTER: [number, number] = [51.5055, -0.12];

export const MOCK_LISTINGS: SearchListing[] = [
  {
    id: "glass-house",
    title: "The Glass House, Richmond Park",
    price: 2_450_000,
    priceDisplay: "$2,450,000",
    priceShort: "$2.45M",
    lat: 51.4615,
    lng: -0.292,
    markerVariant: "navy",
    badge: "new",
    priceChangePct: 4.2,
    address: "Surrey TW10, United Kingdom",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARb3s4yavqzA218EAlpdktE6_wkLzkNLpLIFFkyE5KBsT1MOPa8xar235uSWszea2oL0m7JAgZ2mY2EQvykgNroKgY71wCTlVw8Bp0NQC2Y2KIEiigu1ihgCBlAzSjghbN8vunaT037bvOeI8YGlqi-jxr-N9Q3tHn2PeoFBmVwFxRkcF3h5QnMt3acUelmqQoReVXZcceEi0Qj6ecELjW_VScTsiiVbY5_D153npEHisN7vARWZv6rUIIAyiFuf7OLd30m-vgLHk",
    beds: 4,
    baths: 3,
    sqft: 3200,
  },
  {
    id: "mews",
    title: "Contemporary Mews House",
    price: 1_890_000,
    priceDisplay: "$1,890,000",
    priceShort: "$1.89M",
    lat: 51.5028,
    lng: -0.1947,
    markerVariant: "white",
    address: "Kensington, London W8",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8OVKGH11DJqLr4FGuQnBS0HRzYKOKVZ8LgdR8Z3hY2JqALRdV15rlO4KZhXvdTUB7bAWVMI86qjtmlsjrx5rVvov-T9uO5xyOSXFgexzryXUpofJ3MZSrOF9yRTuwqeLKP3rz3X05ReHpVPe66z2xaqCDwWy-R_2R6U7yIHRlKiDvw4wDjZfz5QfVpHJnVMNi3IaDJbUk88DUjEaWhIlhtyVN0eBzZ4qBbl8u-3ebcFxWdI1l-LN_WKg7tdWdr_JRQIGXmDnQBbw",
    beds: 3,
    baths: 2,
    sqft: 1950,
  },
  {
    id: "chelsea",
    title: "Historic Chelsea Townhouse",
    price: 3_120_000,
    priceDisplay: "$3,120,000",
    priceShort: "$3.12M",
    lat: 51.4875,
    lng: -0.168,
    markerVariant: "mint",
    badge: "reduced",
    oldPriceDisplay: "$3,450,000",
    address: "Chelsea, London SW3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrgCcHY8FJ-8eoU6AlAGnQYCVwMhqnLg3LMqTtxHqqDNrqD6fPYAa9ZryLlk-SfV1oYXk60VLlB5bN2xZ8yv9TfNf0Llk2Pfdld-7s_NoU3W0iU3gaHm4_ttHyHVhDApKMZHpKtlsAGRUTDhc8qfA7AvengxHiKahW2AilnB7g99dFYvu2obXzprUhvcSc9GGa4uNu3uwZC3ZwkTb77OHHgj2OmyaQXScMJYedT5rTJ_7iwchPFdXpKzaGV-xK3QJO3es9VE8mXSs",
    beds: 5,
    baths: 4,
    sqft: 4100,
  },
];

export type PriceFilter =
  | "any"
  | "under500k"
  | "500k-1m"
  | "1m-1.5m"
  | "1.5m-2m"
  | "under2m"
  | "2to3m"
  | "over3m"
  | "2m-plus";
export type BedsFilter = "any" | "1" | "2" | "3" | "4" | "5";
export type SortOption = "newest" | "price-asc" | "price-desc";

export const PRICE_FILTER_LABELS: Record<PriceFilter, string> = {
  any: "Price Range",
  under500k: "Under $500k",
  "500k-1m": "$500k – $1M",
  "1m-1.5m": "$1M – $1.5M",
  "1.5m-2m": "$1.5M – $2M",
  under2m: "Under $2M",
  "2to3m": "$2M – $3M",
  over3m: "Over $3M",
  "2m-plus": "$2M+",
};

export const BEDS_FILTER_LABELS: Record<BedsFilter, string> = {
  any: "Beds & Baths",
  "1": "1+ beds",
  "2": "2+ beds",
  "3": "3+ beds",
  "4": "4+ beds",
  "5": "5+ beds",
};
