import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SearchResultsView } from "@/components/search/SearchResultsView";

describe("SearchResultsView", () => {
  it("shows default London results count", () => {
    render(<SearchResultsView />);
    expect(screen.getByText(/342 results in London, UK/i)).toBeInTheDocument();
  });

  it("renders map stub instead of real Leaflet in tests", () => {
    render(<SearchResultsView />);
    expect(screen.getAllByTestId("dynamic-map-stub").length).toBeGreaterThan(0);
  });

  it("filters listings when typing in search box", async () => {
    const user = userEvent.setup();
    render(<SearchResultsView />);
    const input = screen.getByPlaceholderText(/Search neighborhoods/i);
    await user.type(input, "Mews");
    expect(screen.getByText(/Contemporary Mews House/i)).toBeInTheDocument();
    expect(screen.queryByText(/Historic Chelsea Townhouse/i)).not.toBeInTheDocument();
  });

  it("updates results label when filters narrow set", async () => {
    const user = userEvent.setup();
    render(<SearchResultsView />);
    await user.type(screen.getByPlaceholderText(/Search neighborhoods/i), "zzznomatch");
    expect(screen.getByText(/0 results in London, UK/i)).toBeInTheDocument();
  });
});
