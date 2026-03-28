"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, Bed, Square } from "lucide-react";

const listings = [
  {
    title: "The Obsidian House",
    price: "$2,450,000",
    address: "4522 Westlake Dr, Austin, TX",
    beds: "4 Beds",
    baths: "3 Baths",
    sqft: "3,200 sqft",
    badge: "NEW LISTING",
    badgeClass: "bg-primary/90 text-white backdrop-blur-sm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBAc94QvH5KO_HOfXQwmhRkDAgcr97EdU1yYfEXOeVNNP616xlQZsppWLVYS1O_Y5L6yd5nP53ONLIqhI-k2jfn2MTVffp5TxS6rmivaEaPR_Px0Ww82qw2sxtG4nGX_YkEQeHGjMHYF4VtvB03wjnznHx-b9nzKc8LhOxhou8olEwppTmWqr72a5FCGe3s58f-u-4vtp01F1TPm1VR4jFBuhw77OnTWX8AARrE1HUz6rsCl1Bva9ge3m7-4NrgPN8VvcYk97wtBM4",
  },
  {
    title: "Pinecrest Retreat",
    price: "$1,890,000",
    address: "88 Echo Valley Rd, Boulder, CO",
    beds: "3 Beds",
    baths: "2 Baths",
    sqft: "2,450 sqft",
    badge: "UNDER CONTRACT",
    badgeClass: "bg-tertiary-fixed text-on-tertiary-fixed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvY2N3RwAcGllgUUXY_6DkWq0XKPvYCMZrMmO9Utvntq46lIz8UOkH8lombf4Q7JXuc9f47YJHrNkrkOkyDGRA1QxgdvFNdMFBorzUHzfv2Ob2E0hjEKFWmWfuFl_zPhdoio5Owqim7KHvO9MpxQ1nKHwMMroUjp2TXFkCC79_40j0_mMuQzNOlDjS9lmejkndoKgbvu65YWoB4nV-GV2oi0KWua_WuL3sT7CyAP3YdjIlRI-Lmtcrebj4lHxNDSVhRYj61Zrbyt0",
  },
  {
    title: "The Gable Loft",
    price: "$920,000",
    address: "1200 Broadway #4C, New York, NY",
    beds: "2 Beds",
    baths: "1 Bath",
    sqft: "1,100 sqft",
    badge: "FAIRDOM CERTIFIED",
    badgeClass: "bg-primary/90 text-white backdrop-blur-sm",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjTcG5Ctg1s2W5nnPRqgIg6ebeFPkxU4vcYVLYvwJB5Y0311QejGYRMvvoqy2jl0I7PvuulGKe4nFtr2DS6dbinodCO419CICrwLmB2-hv7WvjwnN-sNxyU7rlSsEm6Pn6ZqJlH7G1Hq3VOjm1wPSkd_NKXE8YLw1AgM0jG8Rnnxw5KRvaJnRBkCqdMWvvmy41FoB43YWn91BLUzv-daDC4WkoMzA8i5JZ3CSrj-9s0z-25nnK72F2UoXdQOP5sILEmUYe_GVqEeo",
  },
];

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export function CuratedListings() {
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
            Curated Listings
          </h2>
          <Link
            href="#listings"
            className="inline-flex w-fit items-center rounded-xl bg-secondary-fixed px-6 py-2.5 font-headline font-bold text-on-surface transition hover:bg-secondary-fixed/80"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((item, i) => (
            <motion.article
              key={item.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm shadow-on-surface/[0.04] transition-transform duration-300 hover:-translate-y-2"
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: i * 0.06 }}
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
                    {item.sqft}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
