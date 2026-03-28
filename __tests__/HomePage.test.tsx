import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home page (landing)", () => {
  it("renders brand, hero headline and primary CTA copy", () => {
    render(<Home />);
    const brands = screen.getAllByText(/FAIRDOM/i);
    expect(brands.length).toBeGreaterThan(0);
    expect(screen.getByText(/Fairly/i)).toBeInTheDocument();
    expect(screen.getByText(/Curated Listings/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Ready to sell for more and pay less/i }),
    ).toBeInTheDocument();
  });

  it("exposes search section anchor", () => {
    render(<Home />);
    expect(document.getElementById("search")).toBeInTheDocument();
  });
});
