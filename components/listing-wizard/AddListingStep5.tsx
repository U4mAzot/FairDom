"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";
import { WizardProgress } from "@/components/listing-wizard/WizardProgress";

export function AddListingStep5() {
  return (
    <div className="min-h-screen bg-slate-50 text-on-surface">
      <WizardHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6">
        <WizardProgress step={5} title="Publikacja" />
        <div className="space-y-4 rounded-xl bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-6 w-6 text-emerald-600" aria-hidden />
          </div>
          <h1 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            Podsumowanie i opłata
          </h1>
          <p className="text-on-surface-variant">
            Tutaj pojawi się podsumowanie ogłoszenia, opłata za publikację i przycisk publikacji — na
            razie to ostatni krok kreatora (demo).
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex rounded-md border border-primary px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary/5"
          >
            Przejdź do panelu
          </Link>
        </div>
        <div className="mt-8 flex justify-start">
          <Link
            href="/add-listing/step-4"
            className="inline-flex items-center gap-2 rounded-md px-4 py-3 font-bold text-primary transition hover:bg-white"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Wstecz
          </Link>
        </div>
      </main>
      <WizardFooter />
    </div>
  );
}
