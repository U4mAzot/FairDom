import { describe, expect, it } from "vitest";
import {
  buildSearchPathFromHero,
  parseSearchFiltersFromParams,
} from "@/lib/searchUrl";

describe("searchUrl", () => {
  it("buildSearchPathFromHero omits default any filters", () => {
    expect(
      buildSearchPathFromHero({
        city: "",
        priceLabel: "Dowolny",
        bedsLabel: "Dowolnie",
      }),
    ).toBe("/search");

    expect(
      buildSearchPathFromHero({
        city: "  Austin, TX  ",
        priceLabel: "Dowolny",
        bedsLabel: "Dowolnie",
      }),
    ).toBe("/search?q=Austin%2C+TX");
  });

  it("buildSearchPathFromHero encodes price and beds from hero labels", () => {
    expect(
      buildSearchPathFromHero({
        city: "New York, NY",
        priceLabel: "$1M – $1.5M",
        bedsLabel: "3+ syp. / 2+ łaz.",
      }),
    ).toBe("/search?q=New+York%2C+NY&price=1m-1.5m&beds=3");
  });

  it("parseSearchFiltersFromParams reads q, price, beds", () => {
    const sp = new URLSearchParams("q=Glass&price=2to3m&beds=4");
    expect(parseSearchFiltersFromParams(sp)).toEqual({
      q: "Glass",
      price: "2to3m",
      beds: "4",
    });
  });

  it("parseSearchFiltersFromParams rejects unknown values", () => {
    const sp = new URLSearchParams("price=invalid&beds=99");
    expect(parseSearchFiltersFromParams(sp)).toEqual({
      q: "",
      price: "any",
      beds: "any",
    });
  });
});
