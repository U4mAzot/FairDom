import type { Metadata } from "next";
import { AgentDashboardClient } from "@/components/dashboard/AgentDashboardClient";

export const metadata: Metadata = {
  title: "Panel | FairDom",
  description: "Zarządzaj ogłoszeniami, zapytaniami i wynikami na FairDom.",
};

export default function DashboardPage() {
  return <AgentDashboardClient />;
}
