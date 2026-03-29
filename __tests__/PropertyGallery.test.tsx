import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PropertyGallery } from "@/components/property-detail/PropertyGallery";

describe("PropertyGallery", () => {
  it("renders view-all-photos trigger", () => {
    render(<PropertyGallery />);
    expect(screen.getByRole("button", { name: /Zobacz wszystkie zdjęcia/i })).toBeInTheDocument();
  });

  it("opens lightbox and shows navigation controls", async () => {
    const user = userEvent.setup();
    render(<PropertyGallery />);
    await user.click(screen.getByRole("button", { name: /Zobacz wszystkie zdjęcia/i }));
    expect(screen.getByRole("dialog", { name: /Galeria zdjęć/i })).toBeInTheDocument();
    expect(screen.getByText(/24 zdjęć/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Poprzednie zdjęcie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Następne zdjęcie/i })).toBeInTheDocument();
  });
});
