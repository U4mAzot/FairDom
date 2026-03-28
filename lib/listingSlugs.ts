import { MOCK_LISTINGS } from "@/components/search/mockListings";

const slugSet = new Set(MOCK_LISTINGS.map((l) => l.id));

export function isTrackedListingSlug(s: string): boolean {
  return slugSet.has(s);
}
