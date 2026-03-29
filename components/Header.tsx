"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { SiteAuthNav } from "@/components/auth/SiteAuthNav";

const mainNav = [
  { href: "/search", label: "Szukaj" },
  { href: "/add-listing", label: "Dodaj ogłoszenie" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-headline text-xl font-extrabold tracking-tight text-on-surface sm:text-2xl"
        >
          FAIRDOM
        </Link>

        <div className="hidden min-w-0 items-center gap-8 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-headline text-sm font-medium text-on-surface-variant transition hover:text-on-surface"
            >
              {item.label}
            </Link>
          ))}
          <SiteAuthNav variant="home" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-primary md:hidden"
          aria-label={open ? "Zamknij menu" : "Menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0 }}
          className="border-t border-surface-low bg-white px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-headline font-medium text-on-surface-variant"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-surface-low pt-4">
              <SiteAuthNav
                variant="home"
                onNavigate={() => setOpen(false)}
                className="flex-col items-stretch gap-3"
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
