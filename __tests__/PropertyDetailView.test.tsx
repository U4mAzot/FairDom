import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PropertyDetailView } from "@/components/property-detail/PropertyDetailView";

describe("PropertyDetailView", () => {
  it("renders title, green price and architectural section", () => {
    render(<PropertyDetailView />);
    expect(
      screen.getByRole("heading", { level: 1, name: /The Obsidian Penthouse/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/\$2,450,000/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Architectural Vision/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Location Intelligence/i })).toBeInTheDocument();
  });

  it("includes map stub from dynamic mock", () => {
    render(<PropertyDetailView />);
    expect(screen.getByTestId("dynamic-map-stub")).toBeInTheDocument();
  });
});
