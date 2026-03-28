"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="register"
      className="relative overflow-hidden bg-primary py-20 text-white md:py-24"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-1/3 skew-x-12 translate-x-1/2 bg-tertiary-fixed opacity-[0.07]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="mb-6 font-headline text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Ready to sell for more and pay less?
          </h2>
          <p className="mb-10 max-w-xl text-lg text-primary-fixed-dim md:text-xl">
            Join over 12,000 homeowners who saved an average of 4.5% on their closing costs last
            year.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-xl bg-tertiary-fixed-dim px-10 py-5 font-headline text-lg font-bold text-on-tertiary-fixed transition hover:bg-tertiary-fixed"
            >
              Start Your Listing
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-primary-container px-10 py-5 font-headline text-lg font-bold text-white transition hover:bg-primary-container/80"
            >
              <Calendar className="h-5 w-5" aria-hidden />
              Book a Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
