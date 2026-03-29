import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";

const DEMO_SELLER_UUID = "550e8400-e29b-41d4-a716-446655440000";

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: vi.fn().mockResolvedValue(undefined),
      signInWithPassword: vi.fn().mockResolvedValue({ error: null }),
      signUp: vi.fn().mockResolvedValue({ data: { session: null, user: null }, error: null }),
    },
    from(table: string) {
      if (table === "listing_conversations") {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                maybeSingle: async () => ({ data: null, error: null }),
              }),
            }),
          }),
          insert: () => ({
            select: () => ({
              single: async () => ({ data: { id: "test-conv-id" }, error: null }),
            }),
          }),
        };
      }
      if (table === "listing_messages") {
        return {
          insert: async () => ({ error: null }),
        };
      }
      return {};
    },
  }),
}));

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
    render(<ContactSidebar sellerUserId={DEMO_SELLER_UUID} />);
    expect(screen.getByLabelText(/Imię i nazwisko/i)).toHaveValue("Jan Kowalski");
    expect(screen.getByLabelText(/E-mail/i)).toHaveValue("buyer@example.com");
    expect(screen.getByLabelText(/E-mail/i)).toHaveAttribute("readonly");
    await user.click(screen.getByRole("button", { name: /Wyślij wiadomość/i }));
    expect(
      await screen.findByText(/Wiadomość wysłana\. Odpowiedzi znajdziesz w/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Panelu → Wiadomości/i })).toHaveAttribute(
      "href",
      "/dashboard?section=messages",
    );
  });
});
