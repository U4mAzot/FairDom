import type { Metadata } from "next";
import { AgentDashboardClient } from "@/components/dashboard/AgentDashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | FairDom",
  description: "Manage your listings, leads, and performance on FairDom.",
};

export default function DashboardPage() {
  return <AgentDashboardClient />;
}
