import { describe, expect, it } from "vitest";
import { GALLERY_IMAGES, LIGHTBOX_IMAGES, PROPERTY } from "@/components/property-detail/mockProperty";

describe("property-detail mock data", () => {
  it("defines Penthouse Obsydian core fields", () => {
    expect(PROPERTY.title).toBe("Penthouse Obsydian — Złota 44");
    expect(PROPERTY.priceDisplay).toBe("28 500 000 zł");
    expect(PROPERTY.address).toContain("Złota 44");
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
