import type { Metadata } from "next";
import { Suspense } from "react";
import { AgentDashboardClient } from "@/components/dashboard/AgentDashboardClient";

export const metadata: Metadata = {
  title: "Panel | FairDom",
  description: "Zarządzaj ogłoszeniami, zapytaniami i wynikami na FairDom.",
};

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface text-on-surface-variant">
          Ładowanie panelu…
        </div>
      }
    >
      <AgentDashboardClient />
    </Suspense>
  );
}
