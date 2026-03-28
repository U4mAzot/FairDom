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
  if (price === "under5m") out = out.filter((l) => l.price < 5_000_000);
  if (price === "5m-10m")
    out = out.filter((l) => l.price >= 5_000_000 && l.price < 10_000_000);
  if (price === "10m-15m")
    out = out.filter((l) => l.price >= 10_000_000 && l.price < 15_000_000);
  if (price === "15m-25m")
    out = out.filter((l) => l.price >= 15_000_000 && l.price < 25_000_000);
  if (price === "25m-40m")
    out = out.filter((l) => l.price >= 25_000_000 && l.price <= 40_000_000);
  if (price === "over40m") out = out.filter((l) => l.price > 40_000_000);
  if (beds !== "any") {
    const min = Number.parseInt(beds, 10);
    if (!Number.isNaN(min)) out = out.filter((l) => l.beds >= min);
  }
  if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
  return out;
}
