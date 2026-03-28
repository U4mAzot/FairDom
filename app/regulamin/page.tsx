import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Regulamin | FairDom",
  description: "Regulamin korzystania z serwisu FairDom.",
};

export default function RegulaminPage() {
  return (
    <LegalPageShell title="Regulamin serwisu FairDom">
      <p className="text-on-surface">
        Niniejszy regulamin określa zasady korzystania z serwisu internetowego FairDom
        („Serwis”), w tym zakładania konta, publikowania ogłoszeń oraz korzystania z funkcji
        udostępnianych przez operatora Serwisu.
      </p>

      <h2>1. Postanowienia ogólne</h2>
      <p>
        Korzystanie z Serwisu oznacza akceptację niniejszego regulaminu. Jeśli nie akceptujesz
        regulaminu, nie powinieneś korzystać z Serwisu. Operator może wprowadzać zmiany regulaminu;
        o istotnych zmianach poinformujemy w sposób odpowiedni do charakteru Serwisu (np. komunikat
        na stronie lub wiadomość e-mail).
      </p>

      <h2>2. Definicje</h2>
      <ul>
        <li>
          <strong>Użytkownik</strong> — osoba fizyczna lub prawna korzystająca z Serwisu.
        </li>
        <li>
          <strong>Konto</strong> — profil Użytkownika utworzony w systemie po rejestracji.
        </li>
        <li>
          <strong>Ogłoszenie</strong> — treść dotycząca nieruchomości opublikowana w Serwisie.
        </li>
      </ul>

      <h2>3. Rejestracja i konto</h2>
      <p>
        Aby korzystać z wybranych funkcji, może być wymagane założenie Konta. Podczas rejestracji
        podajesz prawdziwe dane w zakresie wymaganym przez formularz. Jesteś odpowiedzialny za
        zachowanie poufności danych logowania oraz za działania dokonane przy użyciu Twojego Konta.
      </p>

      <h2>4. Publikacja ogłoszeń</h2>
      <p>
        Ogłoszenia muszą dotyczyć rzeczywistych ofert, być zgodne z prawem oraz nie naruszać praw
        osób trzecich. Zabrania się publikowania treści wprowadzających w błąd, obraźliwych,
        naruszających dobra osobiste lub zawierających nielegalne treści. Operator może odmówić
        publikacji lub usunąć ogłoszenie naruszające regulamin lub przepisy prawa.
      </p>

      <h2>5. Opłaty</h2>
      <p>
        Podstawowe informacje o ewentualnych opłatach za funkcje premium lub promocję ogłoszeń
        zamieszczamy w Serwisie (np. w sekcji cennik). Szczegóły rozliczeń mogą być określone przy
        składaniu zamówienia na daną usługę.
      </p>

      <h2>6. Odpowiedzialność</h2>
      <p>
        Serwis ułatwia prezentację ofert; transakcje zawierasz bezpośrednio z innymi użytkownikami
        lub podmiotami trzecimi. Operator nie jest stroną umów dotyczących nieruchomości i nie
        odpowiada za prawdziwość ogłoszeń w całości — zalecamy weryfikację informacji u źródła.
        Odpowiedzialność Operatora jest ograniczona w zakresie dopuszczalnym przez prawo.
      </p>

      <h2>7. Zakończenie korzystania</h2>
      <p>
        Możesz przestać korzystać z Serwisu w dowolnym momencie. Operator może zablokować lub usunąć
        Konto w przypadku rażącego naruszenia regulaminu lub przepisów prawa.
      </p>

      <h2>8. Postanowienia końcowe</h2>
      <p>
        W sprawach nieuregulowanych stosuje się przepisy prawa polskiego. Spory będą rozstrzygane
        przez sądy właściwe dla siedziby Operatora, o ile obowiązujące przepisy nie stanowią inaczej.
      </p>
      <p className="text-xs text-outline">
        Ostatnia aktualizacja: marzec 2026. W razie pytań skorzystaj z{" "}
        <Link href="/kontakt">strony kontaktowej</Link>.
      </p>
    </LegalPageShell>
  );
}
