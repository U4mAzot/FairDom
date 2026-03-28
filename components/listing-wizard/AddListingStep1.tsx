"use client";

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";
import { WizardProgress } from "@/components/listing-wizard/WizardProgress";

export function AddListingStep1() {
  return (
    <div className="min-h-screen bg-slate-50 text-on-surface">
      <WizardHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6">
        <WizardProgress step={1} title="Typ oferty" />
        <div className="space-y-4 rounded-xl bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Home className="h-6 w-6 text-primary" aria-hidden />
          </div>
          <h1 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            Zacznij od typu nieruchomości
          </h1>
          <p className="text-on-surface-variant">
            Dodawanie ogłoszeń jest dostępne tylko dla zalogowanych użytkowników. W kolejnych krokach
            uzupełnisz szczegóły, lokalizację na mapie, media i publikację.
          </p>
          <p className="text-sm text-on-surface-variant">
            Krok 1 — wybór kategorii (demo: jedna ścieżka). Kliknij Dalej, aby przejść do podstawowych
            informacji.
          </p>
        </div>
        <div className="mt-8 flex justify-end">
          <Link
            href="/add-listing/step-2"
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-primary to-primary-container px-8 py-3 font-bold text-white shadow-sm transition hover:opacity-90"
          >
            Dalej
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
}
