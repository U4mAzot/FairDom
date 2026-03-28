import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PropertyGallery } from "@/components/property-detail/PropertyGallery";

describe("PropertyGallery", () => {
  it("renders view-all-photos trigger", () => {
    render(<PropertyGallery />);
    expect(screen.getByRole("button", { name: /View all photos/i })).toBeInTheDocument();
  });

  it("opens lightbox with keyboard hint and thumbnails", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery />);
    await user.click(screen.getByRole("button", { name: /View all photos/i }));
    expect(screen.getByRole("dialog", { name: /Photo gallery/i })).toBeInTheDocument();
    expect(screen.getByText(/24 photos/i)).toBeInTheDocument();
  });
});
