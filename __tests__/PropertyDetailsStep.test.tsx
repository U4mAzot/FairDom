import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PropertyDetailsStep } from "@/components/listing-wizard/PropertyDetailsStep";

describe("PropertyDetailsStep (wizard step 3)", () => {
  it("shows step progress and main heading", () => {
    render(<PropertyDetailsStep />);
    expect(screen.getByText(/Step 3 of 5: Property Details/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Enter property details/i })).toBeInTheDocument();
  });

  it("changes room segment on click", async () => {
    const user = userEvent.setup();
    render(<PropertyDetailsStep />);
    const fourPlus = screen.getByRole("button", { name: /^4\+$/ });
    await user.click(fourPlus);
    expect(fourPlus.className).toMatch(/bg-primary/);
  });

  it("toggles map location edit mode", async () => {
    const user = userEvent.setup();
    render(<PropertyDetailsStep />);
    const btn = screen.getByRole("button", { name: /Edit Location/i });
    await user.click(btn);
    expect(screen.getByRole("button", { name: /Click map/i })).toBeInTheDocument();
  });

  it("shows listing fee block", () => {
    render(<PropertyDetailsStep />);
    expect(screen.getByText(/Listing Fee/i)).toBeInTheDocument();
    expect(screen.getByText(/€0\.00/i)).toBeInTheDocument();
  });
});
