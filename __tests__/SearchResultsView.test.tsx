import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SearchResultsView } from "@/components/search/SearchResultsView";

describe("SearchResultsView", () => {
  it("shows default Poland results count", () => {
    render(<SearchResultsView viewCounts={{}} />);
    expect(screen.getByText(/50 luksusowych ofert w Polsce/i)).toBeInTheDocument();
  });

  it(
    "exposes search input and filters",
    () => {
      render(<SearchResultsView viewCounts={{}} />);
      expect(screen.getByPlaceholderText(/Szukaj miasta/i)).toBeInTheDocument();
      const filtry = screen.getAllByRole("button", { name: /^Filtry$/i });
      expect(filtry.length).toBeGreaterThan(0);
    },
    15_000,
  );
});
