"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BedDouble,
  Calendar,
  ChevronRight,
  Layers,
  MapPin,
  Ruler,
  TrendingUp,
} from "lucide-react";
import { ContactSidebar } from "@/components/property-detail/ContactSidebar";
import { PropertyDetailFooter } from "@/components/property-detail/PropertyDetailFooter";
import { PropertyDetailHeader } from "@/components/property-detail/PropertyDetailHeader";
import { PropertyGallery } from "@/components/property-detail/PropertyGallery";
import { PROPERTY } from "@/components/property-detail/mockProperty";

const PropertyLocationMap = dynamic(
  () => import("@/components/property-detail/PropertyLocationMap").then((m) => m.PropertyLocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] items-center justify-center rounded-xl bg-slate-800 text-sm text-slate-400">
        Loading map…
      </div>
    ),
  },
);

export function PropertyDetailView() {
  const [bc1, bc2, bcCurrent] = PROPERTY.breadcrumbs;

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <PropertyDetailHeader />
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-24">
        <header className="mb-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-on-surface-variant">
                <Link href="/search" className="transition hover:text-primary">
                  {bc1}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="cursor-pointer transition hover:text-primary">{bc2}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="font-bold text-primary">{bcCurrent}</span>
              </nav>
              <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
                {PROPERTY.title}
              </h1>
              <div className="flex items-center gap-2 text-on-surface-variant">
                <MapPin className="h-5 w-5 shrink-0" aria-hidden />
                <span className="font-medium">{PROPERTY.address}</span>
              </div>
            </div>
            <div className="text-left md:text-right">
              <div className="mb-1 font-headline text-4xl font-bold text-emerald-600 md:text-5xl">
                {PROPERTY.priceDisplay}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed px-3 py-1 font-headline text-sm font-bold text-on-tertiary-fixed">
                <TrendingUp className="h-4 w-4" aria-hidden />
                <span>{PROPERTY.growthLabel}</span>
              </div>
            </div>
          </div>
        </header>

        <PropertyGallery />

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
                  Area
                </span>
                <span className="font-headline text-xl font-bold text-primary">{PROPERTY.area}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <BedDouble className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Rooms
                </span>
                <span className="font-headline text-xl font-bold text-primary">{PROPERTY.rooms}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Layers className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Floor
                </span>
                <span className="font-headline text-xl font-bold text-primary">{PROPERTY.floor}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <Calendar className="mb-3 h-8 w-8 text-primary" aria-hidden />
                <span className="mb-1 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">
                  Year
                </span>
                <span className="font-headline text-xl font-bold text-primary">{PROPERTY.year}</span>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <h2 className="mb-6 font-headline text-2xl font-extrabold text-primary">
                Architectural Vision
              </h2>
              <div className="max-w-none space-y-4 leading-relaxed text-on-surface-variant">
                {PROPERTY.visionParagraphs.map((p, i) => (
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
                <h2 className="font-headline text-2xl font-extrabold text-primary">
                  Location Intelligence
                </h2>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-slate-200 px-3 py-1 text-xs font-bold text-primary">
                    {PROPERTY.walkScore}
                  </span>
                  <span className="rounded-md bg-slate-200 px-3 py-1 text-xs font-bold text-primary">
                    {PROPERTY.transit}
                  </span>
                </div>
              </div>
              <PropertyLocationMap center={PROPERTY.mapCenter} zoom={PROPERTY.mapZoom} />
            </motion.section>
          </div>

          <ContactSidebar />
        </div>
      </main>
      <PropertyDetailFooter />
    </div>
  );
}
