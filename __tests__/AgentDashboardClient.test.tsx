import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AgentDashboardClient } from "@/components/dashboard/AgentDashboardClient";

describe("AgentDashboardClient", () => {
  it("renders agent name and KPI labels", () => {
    render(<AgentDashboardClient />);
    expect(screen.getByText(/Alexander Thorne/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Views/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Listings/i)).toBeInTheDocument();
  });

  it("switches sidebar section when menu clicked", async () => {
    const user = userEvent.setup();
    render(<AgentDashboardClient />);
    const perf = screen.getByRole("button", { name: /^Performance$/i });
    await user.click(perf);
    expect(perf.className).toMatch(/bg-primary/);
  });

  it("toggles Active vs Archived listings", async () => {
    const user = userEvent.setup();
    render(<AgentDashboardClient />);
    expect(screen.getByText(/Modernist Glass Pavilion/i)).toBeInTheDocument();
    const archived = screen.getByRole("tab", { name: /Archived/i });
    await user.click(archived);
    expect(screen.getByText(/Urban Loft Studio/i)).toBeInTheDocument();
    expect(screen.queryByText(/Modernist Glass Pavilion/i)).not.toBeInTheDocument();
  });
});
