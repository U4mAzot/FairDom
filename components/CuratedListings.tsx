"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, Bed, Square } from "lucide-react";
import { ListingViewCountLine } from "@/components/listing/ListingViewCountLine";
import type { CuratedListingItem } from "@/lib/curatedListingsData";

export type CuratedListingCard = CuratedListingItem & { viewCount: number };

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

type Props = { items: CuratedListingCard[] };

export function CuratedListings({ items }: Props) {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-headline text-3xl font-extrabold text-primary md:text-4xl">
            Wybrane rezydencje
          </h2>
          <Link
            href="/search"
            className="inline-flex w-fit items-center rounded-xl bg-secondary-fixed px-6 py-2.5 font-headline font-bold text-on-surface transition hover:bg-secondary-fixed/80"
          >
            Zobacz wszystkie
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div key={item.slug} {...cardMotion} transition={{ ...cardMotion.transition, delay: i * 0.06 }}>
              <Link
                href={`/properties/${item.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm shadow-on-surface/[0.04] transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${item.badgeClass}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <div className="p-8">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-headline text-xl font-bold text-primary">{item.title}</h3>
                    <span className="font-headline text-2xl font-black text-on-tertiary-container">
                      {item.price}
                    </span>
                  </div>
                  <p className="mb-6 text-sm text-on-surface-variant">{item.address}</p>
                  <div className="flex flex-wrap items-center gap-6 pt-6">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Bed className="h-5 w-5 text-outline" aria-hidden />
                      {item.beds}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Bath className="h-5 w-5 text-outline" aria-hidden />
                      {item.baths}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Square className="h-5 w-5 text-outline" aria-hidden />
                      {item.areaLabel}
                    </span>
                  </div>
                  <ListingViewCountLine
                    count={item.viewCount}
                    className="mt-4 text-center text-on-surface-variant"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
