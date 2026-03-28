import type { Metadata } from "next";
import { PropertyDetailView } from "@/components/property-detail/PropertyDetailView";

export const metadata: Metadata = {
  title: "The Obsidian Penthouse | FairDom",
  description:
    "Luxury penthouse with panoramic glazing, basalt stone, and curated architectural detail — FairDom listing.",
};

export default function ObsidianPenthousePage() {
  return <PropertyDetailView />;
}
