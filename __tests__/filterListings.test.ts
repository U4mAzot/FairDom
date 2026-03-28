import { describe, expect, it } from "vitest";
import { filterAndSortListings } from "@/components/search/filterListings";
import { MOCK_LISTINGS } from "@/components/search/mockListings";

describe("filterAndSortListings", () => {
  it("returns all mock listings when filters are default", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "any", "any", "newest");
    expect(out).toHaveLength(MOCK_LISTINGS.length);
  });

  it("filters by text query on title", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "Glass", "any", "any", "newest");
    expect(out).toHaveLength(1);
    expect(out[0]!.id).toBe("glass-house");
  });

  it("filters by price under $2M", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "under2m", "any", "newest");
    expect(out.every((l) => l.price < 2_000_000)).toBe(true);
    expect(out.some((l) => l.id === "mews")).toBe(true);
  });

  it("filters 2M–3M band", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "2to3m", "any", "newest");
    expect(out.every((l) => l.price >= 2_000_000 && l.price <= 3_000_000)).toBe(true);
  });

  it("filters over $3M", () => {
    const out = filterAndSortListings(MOCK_LISTINGS, "", "over3m", "any", "newest");
    expect(out).toHaveLength(1);
    expect(out[0]!.id).toBe("chelsea");
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
