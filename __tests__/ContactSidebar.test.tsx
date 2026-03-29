import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";

vi.mock("@/hooks/useClientSession", () => ({
  useClientSession: () => ({
    session: {
      email: "buyer@example.com",
      fullName: "Jan Kowalski",
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
    expect(screen.getByText(/Julian Kowalski/i)).toBeInTheDocument();
    expect(screen.getByText(/Podsumowanie inwestycji/i)).toBeInTheDocument();
    expect(screen.getByText(/5,8% w skali roku/i)).toBeInTheDocument();
  });

  it("reveals phone number after clicking show phone", async () => {
    const user = userEvent.setup();
    render(<ContactSidebar />);
    await user.click(screen.getByRole("button", { name: /Pokaż numer telefonu/i }));
    expect(screen.getByRole("button", { name: /\+48 22 555 01 99/i })).toBeInTheDocument();
  });

  it("submits inquiry form with mock confirmation", async () => {
    const user = userEvent.setup();
    render(<ContactSidebar />);
    expect(screen.getByLabelText(/Imię i nazwisko/i)).toHaveValue("Jan Kowalski");
    expect(screen.getByLabelText(/E-mail/i)).toHaveValue("buyer@example.com");
    expect(screen.getByLabelText(/E-mail/i)).toHaveAttribute("readonly");
    await user.click(screen.getByRole("button", { name: /Wyślij wiadomość/i }));
    expect(
      await screen.findByText(/Dziękujemy — wiadomość została wysłana \(demo\)\./i),
    ).toBeInTheDocument();
  });
});
