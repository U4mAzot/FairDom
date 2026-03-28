"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Mail, Share2 } from "lucide-react";

const platform = [
  { href: "/search", label: "Szukaj" },
  { href: "#listings", label: "Oferty" },
  { href: "/add-listing", label: "Dodaj ogłoszenie" },
  { href: "#pricing", label: "Cennik" },
];

const company = [
  { href: "#about", label: "About Us" },
  { href: "#careers", label: "Careers" },
  { href: "#support", label: "Contact Support" },
];

const legal = [
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#terms", label: "Terms of Service" },
];

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="bg-surface-low px-6 py-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 xl:gap-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-4 font-headline text-xl font-bold text-on-surface">FairDom</div>
          <p className="mb-6 text-sm leading-relaxed text-on-surface-variant">
            Redefining real estate through transparency, modern technology, and editorial design.
          </p>
          <div className="flex gap-4 text-on-surface-variant">
            <Globe className="h-5 w-5 cursor-pointer transition hover:text-on-tertiary-container" aria-hidden />
            <Share2 className="h-5 w-5 cursor-pointer transition hover:text-on-tertiary-container" aria-hidden />
            <Mail className="h-5 w-5 cursor-pointer transition hover:text-on-tertiary-container" aria-hidden />
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-headline font-bold text-on-surface">Platform</h4>
          <ul className="space-y-3">
            {platform.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-on-surface-variant transition hover:text-on-tertiary-container"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-headline font-bold text-on-surface">Company</h4>
          <ul className="space-y-3">
            {company.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-on-surface-variant transition hover:text-on-tertiary-container"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-headline font-bold text-on-surface">Legal</h4>
          <ul className="space-y-3">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-on-surface-variant transition hover:text-on-tertiary-container"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="mb-6 font-headline font-bold text-on-surface">Newsletter</h4>
          <p className="mb-4 text-sm text-on-surface-variant">
            Get property insights and weekly market updates.
          </p>
          <form
            className="flex overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-on-surface placeholder:text-outline-variant focus:outline-none focus:ring-2 focus:ring-tertiary-fixed-dim/50"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-primary px-4 text-white transition hover:bg-primary-container"
              aria-label="Dołącz do newslettera"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-8 md:flex-row">
        <p className="text-sm text-on-surface-variant">
          © {new Date().getFullYear()} FairDom Real Estate. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="#" className="font-semibold text-on-tertiary-container">
            English (US)
          </Link>
          <span className="text-on-surface-variant">|</span>
          <span className="text-on-surface-variant">USD</span>
        </div>
      </div>
    </motion.footer>
  );
}
