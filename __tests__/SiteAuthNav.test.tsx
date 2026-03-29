import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SiteAuthNav } from "@/components/auth/SiteAuthNav";

vi.mock("@/hooks/useClientSession", () => ({
  useClientSession: () => ({
    session: {
      email: "user@example.com",
      fullName: "Test User",
      accountType: "private" as const,
      userId: "u1",
    },
    ready: true,
    logout: vi.fn(),
    sync: vi.fn(),
  }),
}));

describe("SiteAuthNav (logged in)", () => {
  it("links Wiadomości to dashboard messages section", () => {
    render(<SiteAuthNav variant="home" />);
    const link = screen.getByRole("link", { name: /^Wiadomości$/i });
    expect(link).toHaveAttribute("href", "/dashboard?section=messages");
  });
});
