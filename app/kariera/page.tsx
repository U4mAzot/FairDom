import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Kariera | FairDom",
  description: "Dołącz do zespołu FairDom.",
};

export default function KarieraPage() {
  return (
    <LegalPageShell title="Kariera">
      <p className="text-on-surface">
        Budujemy FairDom z myślą o rynku nieruchomości w Polsce i o ludziach, którzy szukają
        prostszego sposobu na przeglądanie i publikowanie ofert.
      </p>
      <h2>Aktualne rekrutacje</h2>
      <p>
        Na ten moment nie prowadzimy otwartych procesów rekrutacyjnych opublikowanych w Serwisie.
        Jeśli chcesz zostawić zgłoszenie ogólne, napisz do nas przez{" "}
        <Link href="/kontakt">formularz kontaktowy</Link> — w temacie wpisz „Kariera”.
      </p>
      <p>
        W przyszłości będziemy publikować tu konkretne stanowiska oraz zasady aplikowania.
      </p>
    </LegalPageShell>
  );
}
