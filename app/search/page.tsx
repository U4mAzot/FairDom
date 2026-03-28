import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResultsView } from "@/components/search/SearchResultsView";
import { MOCK_LISTINGS } from "@/components/search/mockListings";
import { getListingViewCounts } from "@/lib/listingViews";

export const metadata: Metadata = {
  title: "Wyszukiwarka nieruchomości | FairDom",
  description: "Luksusowe domy i apartamenty w Polsce — mapa, filtry ceny i metrażu.",
};

function SearchFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-low text-on-surface-variant">
      Ładowanie wyszukiwarki…
    </div>
  );
}

export default async function SearchPage() {
  const viewCounts = await getListingViewCounts(MOCK_LISTINGS.map((l) => l.id));

  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsView viewCounts={viewCounts} />
    </Suspense>
  );
}
