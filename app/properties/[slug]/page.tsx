import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailView } from "@/components/property-detail/PropertyDetailView";
import { SearchListingDetailView } from "@/components/property-detail/SearchListingDetailView";
import { PROPERTY } from "@/components/property-detail/mockProperty";
import { getListingViewCounts } from "@/lib/listingViews";
import { MOCK_LISTINGS } from "@/components/search/mockListings";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === PROPERTY.slug) {
    return {
      title: `${PROPERTY.title} | FairDom`,
      description:
        "Luksusowy penthouse w Warszawie — przeszklenia panoramiczne, kamień bazaltowy, architektura premium. FairDom.",
    };
  }
  const listing = MOCK_LISTINGS.find((l) => l.id === slug);
  if (!listing) {
    return { title: "Nieruchomość | FairDom" };
  }
  return {
    title: `${listing.title} | FairDom`,
    description: `${listing.address} — ${listing.priceDisplay}. FairDom.`,
  };
}

export default async function PropertyBySlugPage({ params }: Props) {
  const { slug } = await params;

  const counts = await getListingViewCounts([slug]);
  const initialViewCount = counts[slug] ?? 0;

  if (slug === PROPERTY.slug) {
    return <PropertyDetailView initialViewCount={initialViewCount} />;
  }

  const listing = MOCK_LISTINGS.find((l) => l.id === slug);
  if (!listing) {
    notFound();
  }

  return <SearchListingDetailView listing={listing} initialViewCount={initialViewCount} />;
}
