import { describe, expect, it } from "vitest";
import { createFairDomDivIcon } from "@/components/listing-wizard/fairdomMapMarker";
import { createPricePillIcon } from "@/components/search/pricePillIcon";
import { createPropertyLocationIcon } from "@/components/property-detail/propertyMapMarker";

describe("Leaflet custom div icons", () => {
  it("FairDom map marker HTML contains mint accent", () => {
    const icon = createFairDomDivIcon();
    expect(icon.options.html).toContain("6BFE9C");
  });

  it("price pill embeds short label and variant styles", () => {
    const navy = createPricePillIcon("$2.45M", "navy", false);
    expect(navy.options.html).toContain("$2.45M");
    expect(navy.options.html).toContain("#041627");

    const mint = createPricePillIcon("$3.12M", "mint", true);
    expect(mint.options.html).toContain("scale(1.1)");
  });

  it("property location marker uses white pin", () => {
    const icon = createPropertyLocationIcon();
    expect(icon.options.html).toContain("#ffffff");
  });
});
