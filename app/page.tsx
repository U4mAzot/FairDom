import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ValuePropositions } from "@/components/ValuePropositions";
import { CuratedListings } from "@/components/CuratedListings";
import { CTASection } from "@/components/CTASection";
import { SiteFooter } from "@/components/SiteFooter";
import type { CuratedListingItem } from "@/lib/curatedListingsData";
import { getListingViewCounts } from "@/lib/listingViews";
import { MOCK_LISTINGS } from "@/components/search/mockListings";

function toCuratedItem(l: (typeof MOCK_LISTINGS)[number]): CuratedListingItem {
  const badge =
    l.badge === "new"
      ? "NOWA OFERTA"
      : l.badge === "reduced"
        ? "OBNIŻONA CENA"
        : "FAIRDOM PREMIUM";
  const badgeClass =
    l.badge === "new"
      ? "bg-primary/90 text-white backdrop-blur-sm"
      : l.badge === "reduced"
        ? "bg-tertiary-fixed text-on-tertiary-fixed"
        : "bg-primary/90 text-white backdrop-blur-sm";

  return {
    title: l.title,
    price: l.priceDisplay,
    address: l.address,
    beds: `${l.beds} syp.`,
    baths: `${l.baths} łaz.`,
    areaLabel: `${l.areaSqm.toLocaleString("pl-PL")} m²`,
    badge,
    badgeClass,
    image: l.image,
    slug: l.id,
  };
}

export default async function Home() {
  const curatedSource = MOCK_LISTINGS.slice(1, 4);
  const slugs = curatedSource.map((l) => l.id);
  const counts = await getListingViewCounts(slugs);
  const curatedItems = curatedSource.map((l) => ({
    ...toCuratedItem(l),
    viewCount: counts[l.id] ?? 0,
  }));

  return (
    <>
      <Header />
      <main>
        <span id="login" className="sr-only" aria-hidden />
        <span id="add" className="sr-only" aria-hidden />
        <HeroSection />
        <div id="savings" className="scroll-mt-24" aria-hidden />
        <ValuePropositions />
        <div id="listings" className="scroll-mt-24" aria-hidden />
        <CuratedListings items={curatedItems} />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
