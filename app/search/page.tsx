import type { Metadata } from "next";
import { SearchResultsView } from "@/components/search/SearchResultsView";

export const metadata: Metadata = {
  title: "Search Properties | FairDom",
  description: "Browse FairDom listings in London with map and filters.",
};

export default function SearchPage() {
  return <SearchResultsView />;
}
