import { describe, expect, it } from "vitest";
import { addListingProgressPercent } from "@/components/listing-wizard/wizardSteps";

describe("addListingProgressPercent", () => {
  it("maps steps 1–5 to expected percentages", () => {
    expect(addListingProgressPercent(1)).toBe(20);
    expect(addListingProgressPercent(2)).toBe(40);
    expect(addListingProgressPercent(3)).toBe(60);
    expect(addListingProgressPercent(4)).toBe(80);
    expect(addListingProgressPercent(5)).toBe(100);
  });

  it("clamps out-of-range steps", () => {
    expect(addListingProgressPercent(0)).toBe(20);
    expect(addListingProgressPercent(99)).toBe(100);
  });
});
