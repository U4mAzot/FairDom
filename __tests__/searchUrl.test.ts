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
        city: "  Kraków  ",
        priceLabel: "Dowolny",
        bedsLabel: "Dowolnie",
      }),
    ).toBe("/search?q=Krak%C3%B3w");
  });

  it("buildSearchPathFromHero encodes price and beds from hero labels", () => {
    expect(
      buildSearchPathFromHero({
        city: "Warszawa",
        priceLabel: "10 – 15 mln zł",
        bedsLabel: "3+ syp. / 2+ łaz.",
      }),
    ).toBe("/search?q=Warszawa&price=10m-15m&beds=3");
  });

  it("parseSearchFiltersFromParams reads q, price, beds", () => {
    const sp = new URLSearchParams("q=Gdańsk&price=5m-10m&beds=4");
    expect(parseSearchFiltersFromParams(sp)).toEqual({
      q: "Gdańsk",
      price: "5m-10m",
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

  it("buildSearchPathFromHero maps price when dash character differs", () => {
    expect(
      buildSearchPathFromHero({
        city: "X",
        priceLabel: "5 - 10 mln zł",
        bedsLabel: "Dowolnie",
      }),
    ).toBe("/search?q=X&price=5m-10m");
  });
});
