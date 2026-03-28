import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ValuePropositions } from "@/components/ValuePropositions";
import { CuratedListings } from "@/components/CuratedListings";
import { CTASection } from "@/components/CTASection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
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
        <CuratedListings />
        <CTASection />
      </main>
      <SiteFooter />
    </>
  );
}
