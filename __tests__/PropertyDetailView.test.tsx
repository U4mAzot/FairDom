import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyDetailView } from "@/components/property-detail/PropertyDetailView";
import { PROPERTY } from "@/components/property-detail/mockProperty";

describe("PropertyDetailView", () => {
  it("renders title, price and architectural section", () => {
    render(<PropertyDetailView initialViewCount={0} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Penthouse Obsydian/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(PROPERTY.priceDisplay)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Wizja architektoniczna/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Lokalizacja i dostępność/i })).toBeInTheDocument();
  });

  it("includes map stub from dynamic mock", () => {
    render(<PropertyDetailView initialViewCount={0} />);
    expect(screen.getByTestId("dynamic-map-stub")).toBeInTheDocument();
  });
});
