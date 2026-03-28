import type { BedsFilter, PriceFilter, SearchListing, SortOption } from "@/components/search/mockListings";

export function filterAndSortListings(
  listings: SearchListing[],
  query: string,
  price: PriceFilter,
  beds: BedsFilter,
  sort: SortOption,
): SearchListing[] {
  let out = [...listings];
  const q = query.trim().toLowerCase();
  if (q) {
    out = out.filter(
      (l) =>
        l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q),
    );
  }
  if (price === "under500k") out = out.filter((l) => l.price < 500_000);
  if (price === "500k-1m")
    out = out.filter((l) => l.price >= 500_000 && l.price < 1_000_000);
  if (price === "1m-1.5m")
    out = out.filter((l) => l.price >= 1_000_000 && l.price < 1_500_000);
  if (price === "1.5m-2m")
    out = out.filter((l) => l.price >= 1_500_000 && l.price < 2_000_000);
  if (price === "under2m") out = out.filter((l) => l.price < 2_000_000);
  if (price === "2to3m")
    out = out.filter((l) => l.price >= 2_000_000 && l.price <= 3_000_000);
  if (price === "over3m") out = out.filter((l) => l.price > 3_000_000);
  if (price === "2m-plus") out = out.filter((l) => l.price >= 2_000_000);
  if (beds !== "any") {
    const min = Number.parseInt(beds, 10);
    if (!Number.isNaN(min)) out = out.filter((l) => l.beds >= min);
  }
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  return out;
}
