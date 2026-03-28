import { describe, expect, it } from "vitest";
import { GALLERY_IMAGES, LIGHTBOX_IMAGES, PROPERTY } from "@/components/property-detail/mockProperty";

describe("property-detail mock data", () => {
  it("defines Obsidian Penthouse core fields", () => {
    expect(PROPERTY.title).toBe("The Obsidian Penthouse");
    expect(PROPERTY.priceDisplay).toBe("$2,450,000");
    expect(PROPERTY.address).toContain("Architect Boulevard");
  });

  it("exposes four gallery tiles", () => {
    expect(GALLERY_IMAGES).toHaveLength(4);
  });

  it("builds 24 lightbox slots", () => {
    expect(LIGHTBOX_IMAGES).toHaveLength(24);
    const ids = new Set(LIGHTBOX_IMAGES.map((x) => x.id));
    expect(ids.size).toBe(24);
  });
});
