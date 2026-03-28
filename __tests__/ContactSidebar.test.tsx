import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";

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
    await user.click(screen.getByRole("button", { name: /Show phone number/i }));
    expect(screen.getByRole("button", { name: /\+1 \(555\) 010-0199/i })).toBeInTheDocument();
  });

  it("submits inquiry form with mock confirmation", async () => {
    const user = userEvent.setup();
    render(<ContactSidebar />);
    await user.click(screen.getByRole("button", { name: /Send Inquiry/i }));
    expect(await screen.findByText(/Thanks — your inquiry has been sent/i)).toBeInTheDocument();
  });
});
