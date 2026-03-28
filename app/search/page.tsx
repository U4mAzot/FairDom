import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResultsView } from "@/components/search/SearchResultsView";

export const metadata: Metadata = {
  title: "Search Properties | FairDom",
  description: "Browse FairDom listings in London with map and filters.",
};

function SearchFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-low text-on-surface-variant">
      Loading search…
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsView />
    </Suspense>
  );
}
