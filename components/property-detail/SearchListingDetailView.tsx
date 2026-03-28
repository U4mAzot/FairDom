"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, Bed, ChevronRight, MapPin, Ruler, Square, TrendingUp } from "lucide-react";
import { ListingViewCountTracker } from "@/components/listing/ListingViewCountTracker";
import type { SearchListing } from "@/components/search/mockListings";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";
import { PropertyDetailFooter } from "@/components/property-detail/PropertyDetailFooter";
import { PropertyDetailHeader } from "@/components/property-detail/PropertyDetailHeader";
import { PROPERTY } from "@/components/property-detail/mockProperty";

const PropertyLocationMap = dynamic(
  () => import("@/components/property-detail/PropertyLocationMap").then((m) => m.PropertyLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-800 text-sm text-slate-400">
        Ładowanie mapy…
      </div>
    ),
  },
);

const DEFAULT_PARAGRAPHS: [string, string] = [
  "Luksusowa nieruchomość w ofercie FairDom na terenie Polski — wykończenie premium, lokalizacja starannie dobrana pod inwestycję mieszkaniową lub reprezentacyjny adres.",
  "Umów prywatną prezentację lub poproś o materiały: nasi doradcy odpowiedzą po zalogowaniu.",
];

const DEFAULT_SELLER = {
  name: "Katarzyna Nowak",
  title: "Partner · FairDom Polska",
  avatar: PROPERTY.seller.avatar,
  phone: "+48 22 555 01 42",
};

type Props = { listing: SearchListing; initialViewCount: number };

export function SearchListingDetailView({ listing, initialViewCount }: Props) {
  const paragraphs = DEFAULT_PARAGRAPHS;
  const growth =
    listing.priceChangePct != null
      ? `+${listing.priceChangePct}% szac.`
      : "+3,1% szac.";

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <PropertyDetailHeader />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-24">
        <header className="mb-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-on-surface-variant">
                <Link href="/search" className="transition hover:text-primary">
                  Wyszukiwarka
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="text-on-surface-variant">Polska</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="font-bold text-primary">{listing.title}</span>
              </nav>
              <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                {listing.title}
              </h1>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <MapPin className="h-5 w-5 shrink-0" aria-hidden />
                <span className="font-medium">{listing.address}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="mb-1 font-headline text-4xl font-bold text-emerald-600 md:text-5xl">
                {listing.priceDisplay}
              </div>
              {listing.oldPriceDisplay && (
                <p className="mb-1 text-sm text-on-surface-variant line-through">
                  {listing.oldPriceDisplay}
                </p>
              )}
              <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3 py-1 font-headline text-sm font-bold text-on-tertiary-fixed">
                <TrendingUp className="h-4 w-4" aria-hidden />
                <span>{growth}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-12 grid grid-cols-1 gap-4 overflow-hidden rounded-xl md:grid-cols-4 md:grid-rows-2 md:h-[480px]">
          <div className="relative min-h-[240px] md:col-span-2 md:row-span-2 md:min-h-0">
            <Image
              src={listing.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative hidden min-h-[120px] md:block">
              <Image
                src={listing.image}
                alt=""
                fill
                className="object-cover"
                sizes="25vw"
              />
            </div>
          ))}
        </section>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="flex-1 space-y-12">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 gap-4 rounded-xl bg-surface-low p-8 md:grid-cols-4"
            >
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Ruler className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Powierzchnia
                </span>
                <span className="font-headline text-xl font-bold text-primary">
                  {listing.areaSqm.toLocaleString("pl-PL")} m²
                </span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Bed className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Sypialnie
                </span>
                <span className="font-headline text-xl font-bold text-primary">{listing.beds}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Bath className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Łazienki
                </span>
                <span className="font-headline text-xl font-bold text-primary">{listing.baths}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Square className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Segment
                </span>
                <span className="font-headline text-xl font-bold text-primary">Premium</span>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <h2 className="mb-6 font-headline text-2xl font-extrabold text-primary">O tej rezydencji</h2>
              <div className="max-w-none space-y-4 leading-relaxed text-on-surface-variant">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="font-headline text-2xl font-extrabold text-primary">Lokalizacja</h2>
                <span className="rounded-md bg-slate-200 px-3 py-1 text-xs font-bold text-primary">
                  Oferta FairDom
                </span>
              </div>
              <PropertyLocationMap center={[listing.lat, listing.lng]} zoom={14} />
            </motion.section>
          </div>

          <ContactSidebar
            key={listing.id}
            seller={DEFAULT_SELLER}
            messageDefault={`Interesuje mnie ${listing.title}. Proszę o kontakt z dodatkowymi informacjami.`}
            investment={{ yield: "5,2% w skali roku (szac.)", tax: "wg ustalenia" }}
          />
        </div>

        <ListingViewCountTracker
          slug={listing.id}
          initialCount={initialViewCount}
          className="mt-10 border-t border-outline-variant/20 pt-4 text-center text-on-surface-variant"
        />
      </main>
      <PropertyDetailFooter />
    </div>
  );
}
