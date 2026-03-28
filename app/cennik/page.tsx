import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Cennik | FairDom",
  description: "Informacje o opłatach w serwisie FairDom.",
};

export default function CennikPage() {
  return (
    <LegalPageShell title="Cennik">
      <p className="text-on-surface">
        Publikacja podstawowych ogłoszeń może być bezpłatna lub płatna — zależnie od aktualnego
        modelu biznesowego FairDom. Poniżej znajdziesz orientacyjny opis; szczegóły przy składaniu
        zamówienia w Serwisie mają pierwszeństwo.
      </p>
      <h2>Podstawowa publikacja</h2>
      <p>
        Standardowe ogłoszenie z podstawową widocznością — zgodnie z ustawieniami dostępnymi w
        kreatorze dodawania ogłoszenia.
      </p>
      <h2>Wyróżnienia i promocja</h2>
      <p>
        Opcje promowania oferty (np. wyróżnienie na liście) mogą wiązać się z opłatą jednorazową lub
        abonamentem — ceny i okresy są prezentowane przed zatwierdzeniem płatności.
      </p>
      <h2>Płatności</h2>
      <p>
        Obsługę płatności zapewnia wybrany dostawca; szczegóły, faktury i reklamacje rozliczeniowe
        regulują warunki danego dostawcy oraz niniejszy Serwis w zakresie udostępnionym w regulaminie.
      </p>
      <p>
        Masz pytanie o konkretną ofertę cenową?{" "}
        <Link href="/kontakt">Napisz do nas</Link>.
      </p>
      <p className="text-xs text-outline">Informacje mogą ulec zmianie — sprawdzaj tę stronę regularnie.</p>
    </LegalPageShell>
  );
}
