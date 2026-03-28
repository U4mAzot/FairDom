import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeroSearch } from "@/components/HeroSearch";

const { mockPush } = vi.hoisted(() => ({
  mockPush: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("HeroSearch (landing)", () => {
  it("shows city suggestions when typing", async () => {
    const user = userEvent.setup();
    render(<HeroSearch />);
    const input = screen.getByPlaceholderText(/Gdzie szukasz/i);
    await user.type(input, "Aus");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText(/Austin, TX/i)).toBeInTheDocument();
  });

  it("renders search submit button", () => {
    render(<HeroSearch />);
    expect(screen.getByRole("button", { name: /Szukaj/i })).toBeInTheDocument();
  });

  it("navigates to /search with query params when Szukaj is clicked", async () => {
    const user = userEvent.setup();
    mockPush.mockClear();
    render(<HeroSearch />);
    await user.type(screen.getByPlaceholderText(/Gdzie szukasz/i), "Miami, FL");
    await user.click(screen.getByRole("button", { name: /Szukaj/i }));
    expect(mockPush).toHaveBeenCalledWith("/search?q=Miami%2C+FL&price=500k-1m");
  });
});
