import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Polityka cookies | FairDom",
  description: "Informacje o plikach cookies w serwisie FairDom.",
};

export default function PolitykaCookiesPage() {
  return (
    <LegalPageShell title="Polityka plików cookies">
      <p className="text-on-surface">
        Serwis FairDom może wykorzystywać pliki cookies i podobne technologie, aby zapewnić
        prawidłowe działanie strony, bezpieczeństwo oraz — za Twoją zgodą — analizę i personalizację.
      </p>

      <h2>1. Czym są pliki cookies?</h2>
      <p>
        Cookies to małe pliki zapisywane na urządzeniu użytkownika przez przeglądarkę. Mogą być
        „sesyjne” (usuwane po zamknięciu przeglądarki) lub „trwałe” (z określonym terminem ważności).
      </p>

      <h2>2. Rodzaje cookies w Serwisie</h2>
      <ul>
        <li>
          <strong>Niezbędne / funkcjonalne</strong> — umożliwiają logowanie, zapamiętanie wyborów
          interfejsu i podstawowe działanie aplikacji. Bez nich Serwis może nie działać poprawnie.
        </li>
        <li>
          <strong>Analityczne</strong> — pomagają zrozumieć, jak korzystasz z Serwisu (zagregowane
          statystyki). Włączane na podstawie zgody, o ile wymagają jej przepisy.
        </li>
        <li>
          <strong>Marketingowe</strong> — mogą być używane do dopasowania komunikacji; stosowane
          wyłącznie po wyrażeniu zgody tam, gdzie jest to wymagane.
        </li>
      </ul>

      <h2>3. Zarządzanie zgodą</h2>
      <p>
        Przy pierwszej wizycie możesz zaakceptować lub ograniczyć kategorie cookies (jeśli wyświetlamy
        baner zgody). Ustawienia możesz zmienić w przeglądarce lub — gdy udostępniamy panel — w
        ustawieniach prywatności w Serwisie.
      </p>

      <h2>4. Jak wyłączyć cookies w przeglądarce?</h2>
      <p>
        Większość przeglądarek pozwala blokować lub usuwać cookies w menu ustawień prywatności.
        Pamiętaj, że całkowite wyłączenie cookies może utrudnić lub uniemożliwić korzystanie z
        funkcji wymagających sesji (np. logowania).
      </p>

      <h2>5. Powiązanie z polityką prywatności</h2>
      <p>
        Dane zbierane za pomocą cookies mogą stanowić dane osobowe — szczegóły znajdziesz w{" "}
        <Link href="/polityka-prywatnosci">Polityce prywatności</Link>.
      </p>
      <p className="text-xs text-outline">Ostatnia aktualizacja: marzec 2026.</p>
    </LegalPageShell>
  );
}
