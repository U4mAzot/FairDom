import { describe, expect, it } from "vitest";
import { formatViewCountPl } from "./formatViewCountPl";

describe("formatViewCountPl", () => {
  it("1 → wyświetlenie", () => {
    expect(formatViewCountPl(1)).toMatch(/1.*wyświetlenie$/);
  });
  it("2–4 → wyświetlenia", () => {
    expect(formatViewCountPl(2)).toContain("wyświetlenia");
    expect(formatViewCountPl(24)).toContain("wyświetlenia");
  });
  it("5+ → wyświetleń", () => {
    expect(formatViewCountPl(5)).toContain("wyświetleń");
    expect(formatViewCountPl(12840)).toContain("wyświetleń");
  });
});
