import { describe, expect, it } from "vitest";
import { filterAndSortListings } from "@/components/search/filterListings";
import { MOCK_LISTINGS } from "@/components/search/mockListings";

describe("filterAndSortListings", () => {
  it("returns all mock listings when filters are default", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "any", "any", "newest");
    expect(out).toHaveLength(MOCK_LISTINGS.length);
  });

  it("filters by text query on title", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "Warszawa", "any", "any", "newest");
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((l) => l.title.toLowerCase().includes("warszawa") || l.address.toLowerCase().includes("warszawa"))).toBe(
      true,
    );
  });

  it("filters by price under 5M PLN", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "under5m", "any", "newest");
    expect(out.every((l) => l.price < 5_000_000)).toBe(true);
  });

  it("filters 15M–25M PLN band", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "15m-25m", "any", "newest");
    expect(out.every((l) => l.price >= 15_000_000 && l.price < 25_000_000)).toBe(true);
  });

  it("filters over 40M PLN", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "over40m", "any", "newest");
    expect(out.every((l) => l.price > 40_000_000)).toBe(true);
  });

  it("filters minimum 5 beds", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "any", "5", "newest");
    expect(out.every((l) => l.beds >= 5)).toBe(true);
  });

  it("sorts by price ascending", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "any", "any", "price-asc");
    const prices = out.map((l) => l.price);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  it("sorts by price descending", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "any", "any", "price-desc");
    const prices = out.map((l) => l.price);
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
