import { describe, expect, it } from "vitest";
import {
  DEFAULT_COMPETITOR_AVG_EUR,
  feeBarWidthPercent,
} from "@/components/listing-wizard/listingFeeUtils";

describe("feeBarWidthPercent", () => {
  it("returns ~8.33% when FairDom fee is zero (promo bar)", () => {
    expect(feeBarWidthPercent(0, DEFAULT_COMPETITOR_AVG_EUR)).toBeCloseTo(100 / 12, 5);
  });

  it("returns 8.33 when competitor avg is invalid", () => {
    expect(feeBarWidthPercent(10, 0)).toBe(8.33);
  });

  it("caps ratio at 100%", () => {
    expect(feeBarWidthPercent(200, DEFAULT_COMPETITOR_AVG_EUR)).toBe(100);
  });
});
