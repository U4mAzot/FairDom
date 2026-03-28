"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";
import { WizardProgress } from "@/components/listing-wizard/WizardProgress";

export function AddListingStep4() {
  return (
    <div className="min-h-screen bg-slate-50 text-on-surface">
      <WizardHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6">
        <WizardProgress step={4} title="Zdjęcia i media" />
        <div className="space-y-4 rounded-xl bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ImageIcon className="h-6 w-6 text-primary" aria-hidden />
          </div>
          <h1 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            Dodaj zdjęcia
          </h1>
          <p className="text-on-surface-variant">
            Galeria zdjęć i ewentualnie film — w przygotowaniu. Przejdź dalej, aby zobaczyć podsumowanie
            publikacji.
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/add-listing/step-3"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 font-bold text-primary transition hover:bg-white sm:justify-start"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Wstecz
          </Link>
          <Link
            href="/add-listing/step-5"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-br from-primary to-primary-container px-8 py-3 font-bold text-white shadow-sm transition hover:opacity-90"
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
