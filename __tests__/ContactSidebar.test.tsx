import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";

vi.mock("@/hooks/useClientSession", () => ({
  useClientSession: () => ({
    session: {
      email: "buyer@example.com",
      accountType: "private" as const,
      userId: "test-user-id",
    },
    ready: true,
    login: vi.fn(),
    logout: vi.fn(),
    sync: vi.fn(),
  }),
}));

describe("ContactSidebar", () => {
  it("renders agent and investment summary", () => {
    render(<ContactSidebar />);
    expect(screen.getByText(/Julian Thorne/i)).toBeInTheDocument();
    expect(screen.getByText(/Investment Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/5\.8% p\.a\./i)).toBeInTheDocument();
  });

  it("reveals phone number after clicking show phone", async () => {
    const user = userEvent.setup();
    render(<ContactSidebar />);
    await user.click(screen.getByRole("button", { name: /Pokaż numer telefonu/i }));
    expect(screen.getByRole("button", { name: /\+1 \(555\) 010-0199/i })).toBeInTheDocument();
  });

  it("submits inquiry form with mock confirmation", async () => {
    const user = userEvent.setup();
    render(<ContactSidebar />);
    await user.click(screen.getByRole("button", { name: /Wyślij wiadomość/i }));
    expect(
      await screen.findByText(/Dziękujemy — wiadomość została wysłana \(demo\)\./i),
    ).toBeInTheDocument();
  });
});
