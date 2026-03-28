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
  if (price === "under2m") out = out.filter((l) => l.price < 2_000_000);
  if (price === "2to3m")
    out = out.filter((l) => l.price >= 2_000_000 && l.price <= 3_000_000);
  if (price === "over3m") out = out.filter((l) => l.price > 3_000_000);
  if (beds === "3") out = out.filter((l) => l.beds >= 3);
  if (beds === "4") out = out.filter((l) => l.beds >= 4);
  if (beds === "5") out = out.filter((l) => l.beds >= 5);
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  return out;
}
