"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bath, Bed, Heart, MapPin, Square, TrendingUp } from "lucide-react";
import type { SearchListing } from "@/components/search/mockListings";

type PropertySearchCardProps = {
  listing: SearchListing;
  isHighlighted: boolean;
  onEnter: () => void;
  onLeave: () => void;
};

export function PropertySearchCard({
  listing,
  isHighlighted,
  onEnter,
  onLeave,
}: PropertySearchCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:flex-row ${
        isHighlighted ? "ring-2 ring-tertiary-fixed ring-offset-2 ring-offset-surface-low" : ""
      }`}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden md:h-auto md:w-64">
        <Image
          src={listing.image}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 256px"
        />
        {listing.badge === "new" && (
          <span className="absolute left-4 top-4 rounded-full bg-tertiary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-tertiary-fixed">
            New Listing
          </span>
        )}
        {listing.badge === "reduced" && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Price Reduced
          </span>
        )}
        <button
          type="button"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-primary shadow-sm backdrop-blur-md transition hover:text-error"
          aria-label="Save listing"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-headline text-xl font-bold text-primary">{listing.priceDisplay}</h3>
              {listing.oldPriceDisplay && (
                <span className="text-xs text-on-surface-variant line-through">
                  {listing.oldPriceDisplay}
                </span>
              )}
            </div>
            {listing.priceChangePct != null && (
              <div className="flex items-center gap-1 rounded bg-tertiary-fixed/20 px-2 py-0.5 text-on-tertiary-container">
                <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                <span className="text-xs font-bold">+{listing.priceChangePct}%</span>
              </div>
            )}
          </div>
          <p className="mb-1 font-semibold text-on-surface">{listing.title}</p>
          <p className="flex items-center gap-1 text-sm text-on-surface-variant">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {listing.address}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-surface-low pt-4 text-on-surface-variant">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Bed className="h-5 w-5" aria-hidden />
            {listing.beds} Beds
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <Bath className="h-5 w-5" aria-hidden />
            {listing.baths} Baths
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <Square className="h-5 w-5" aria-hidden />
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </motion.article>
  );
}
