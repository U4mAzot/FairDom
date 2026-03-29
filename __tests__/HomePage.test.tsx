import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/listingViews", () => ({
  getListingViewCounts: vi.fn().mockResolvedValue({}),
}));

import Home from "@/app/page";

describe("Home page (landing)", () => {
  it("renders brand, hero headline and primary CTA copy", async () => {
    const ui = await Home();
    render(ui);
    const brands = screen.getAllByText(/FAIRDOM/i);
    expect(brands.length).toBeGreaterThan(0);
    expect(screen.getByText(/uczciwie/i)).toBeInTheDocument();
    expect(screen.getByText(/Wybrane rezydencje/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Chcesz sprzedać drożej i zapłacić mniej/i }),
    ).toBeInTheDocument();
  });

  it("exposes search section anchor", async () => {
    const ui = await Home();
    render(ui);
    expect(document.getElementById("search")).toBeInTheDocument();
  });
});
