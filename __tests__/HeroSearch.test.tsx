import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { HeroSearch } from "@/components/HeroSearch";

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
});
