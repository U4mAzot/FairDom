"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeroSearch } from "@/components/HeroSearch";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-surface pt-24 pb-16 lg:pt-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <motion.div
          className="z-10 lg:col-span-7"
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="mb-6 font-headline text-4xl font-extrabold leading-[1.05] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            Nieruchomości <br />
            <span className="text-on-tertiary-container">uczciwie</span> wycenione.
          </h1>
          <p className="mb-10 max-w-xl text-lg text-on-surface-variant md:text-xl">
            Przeglądaj oferty bez logowania — jak na dużych portalach. Załóż konto, aby pisać do
            sprzedających i samodzielnie wystawiać ogłoszenia (opłata za publikację + opcjonalna
            promocja).
          </p>
          <HeroSearch />
        </motion.div>

        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/10 lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
              alt="Nowoczesny dom o zmierzchu z ciepłym światłem w oknach"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 rounded-2xl bg-primary p-6 text-white shadow-2xl md:-bottom-6 md:left-0 md:block md:translate-x-0 lg:-left-8">
            <p className="text-2xl font-black leading-none">1.5%</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim">
              Opłata za ogłoszenie
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
