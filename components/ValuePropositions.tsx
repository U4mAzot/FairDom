"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bolt, PiggyBank, ShieldCheck } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export function ValuePropositions() {
  return (
    <section className="bg-surface-low py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-14 flex flex-col items-end gap-8 md:mb-16 md:flex-row md:justify-between"
          {...fadeUp}
        >
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-widest text-on-tertiary-container">
              Przejrzystość przede wszystkim
            </span>
            <h2 className="mt-4 font-headline text-3xl font-extrabold text-primary md:text-4xl lg:text-5xl">
              Niższe koszty, wyższy zwrot.
            </h2>
          </div>
          <p className="mb-0 max-w-sm text-on-surface-variant">
            Tradycyjni pośrednicy często biorą do 6%. Uważamy, że kapitał powinien zostać u
            właściciela — to obietnica FairDom.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.article
            className="flex min-h-[280px] flex-col justify-between rounded-3xl bg-white p-8 shadow-sm shadow-on-surface/[0.03] transition-transform duration-300 hover:-translate-y-1 md:col-span-2 md:min-h-[320px] md:p-10"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.05 }}
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-fixed">
                <PiggyBank className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold text-primary md:text-2xl">
                Średnio ok. 85 000 zł oszczędności
              </h3>
              <p className="leading-relaxed text-on-surface-variant">
                Ograniczamy prowizję i automatyzujemy proces — całą różnicę oddajemy sprzedającemu,
                bez ukrytych dopłat.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="#savings"
                className="group inline-flex items-center font-headline font-bold text-on-tertiary-container"
              >
                Oblicz swoje oszczędności
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.article>

          <motion.article
            className="flex flex-col justify-between rounded-3xl bg-primary p-8 text-white shadow-sm transition-transform duration-300 hover:-translate-y-1 md:min-h-[280px] md:p-10"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.1 }}
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-container">
                <Bolt className="h-6 w-6 text-tertiary-fixed" strokeWidth={2} />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold md:text-2xl">Ogłoszenie w 24 h</h3>
              <p className="leading-relaxed text-primary-fixed-dim">
                Weryfikacja i publikacja trwają krócej niż u klasycznych biur — Twoja oferta szybciej
                trafia do kupujących.
              </p>
            </div>
          </motion.article>

          <motion.article
            className="flex flex-col justify-between rounded-3xl bg-tertiary-fixed-dim p-8 text-on-tertiary-fixed shadow-sm transition-transform duration-300 hover:-translate-y-1 md:min-h-[280px] md:p-10"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
          >
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary">
                <ShieldCheck className="h-6 w-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="mb-4 font-headline text-xl font-bold text-on-tertiary-fixed md:text-2xl">
                Zweryfikowani kupujący
              </h3>
              <p className="leading-relaxed text-on-tertiary-fixed-variant">
                Każde zapytanie przechodzi przez warstwę wiarygodności finansowej — mniej strat
                czasu.
              </p>
            </div>
          </motion.article>

          <motion.article
            className="flex flex-col items-center gap-8 rounded-3xl bg-white p-8 shadow-sm shadow-on-surface/[0.03] transition-transform duration-300 hover:-translate-y-1 md:col-span-2 md:flex-row md:p-10"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.15 }}
          >
            <div className="flex-1">
              <h3 className="mb-4 font-headline text-xl font-bold text-primary md:text-2xl">
                Bez ukrytych opłat
              </h3>
              <p className="leading-relaxed text-on-surface-variant">
                Płacisz tyle, ile widzisz w umowie — bez dopłat administracyjnych, pakietów
                marketingowych ani niespodzianek przy finalizacji.
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface-low md:w-1/3">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCOrCE1eOqL2d7RiK4ruqD_COuzp86MaNXl8Ff11KnGXNqYw_OTk3jKbhmVXREjVCuzxs2t0wZF9PBxaqBHV-PAIPb_70RiL8GZYAjOyVSWAD00rNn4I0iqOsGCI8gM7IwAGA0LGOOzkcEyhtHJ58gxzT92LeVCDpReW1e4AB8MnHMM0K8ZwSPBC1811aQWL9qP7HIjEMqy0yFBxIipw0MZQNIPKDG7tuCNNU3uJK6X7ByP5ylfcH5iKMhDxtLPoqBja-vJx8Lboc"
                alt=""
                fill
                className="object-cover grayscale opacity-60"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
