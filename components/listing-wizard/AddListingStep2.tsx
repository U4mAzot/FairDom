"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WizardFooter } from "@/components/listing-wizard/WizardFooter";
import { WizardHeader } from "@/components/listing-wizard/WizardHeader";
import { WizardProgress } from "@/components/listing-wizard/WizardProgress";

export function AddListingStep2() {
  return (
    <div className="min-h-screen bg-slate-50 text-on-surface">
      <WizardHeader />
      <main className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6">
        <WizardProgress step={2} title="Podstawowe informacje" />
        <div className="space-y-4 rounded-xl bg-white p-8 shadow-sm">
          <h1 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
            Tytuł i opis (wkrótce)
          </h1>
          <p className="text-on-surface-variant">
            Ten krok będzie zawierał tytuł ogłoszenia, krótki opis i cenę. Na razie możesz przejść
            dalej do szczegółów nieruchomości i mapy.
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link
            href="/add-listing/step-1"
            className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 font-bold text-primary transition hover:bg-white sm:justify-start"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
            Wstecz
          </Link>
          <Link
            href="/add-listing/step-3"
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
