import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Polityka prywatności | FairDom",
  description: "Zasady przetwarzania danych osobowych w serwisie FairDom.",
};

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPageShell title="Polityka prywatności">
      <p className="text-on-surface">
        Szanujemy Twoją prywatność. Niniejszy dokument wyjaśnia, jakie dane zbieramy, w jakim celu je
        przetwarzamy oraz jakie przysługują Ci prawa na podstawie RODO (rozporządzenie UE 2016/679).
      </p>

      <h2>1. Administrator danych</h2>
      <p>
        Administratorem danych osobowych Użytkowników Serwisu FairDom jest podmiot prowadzący
        Serwis — dane identyfikacyjne i kontaktowe Administratora udostępniamy w{" "}
        <Link href="/kontakt">zakładce Kontakt</Link>.
      </p>

      <h2>2. Jakie dane przetwarzamy</h2>
      <ul>
        <li>
          Dane konta: adres e-mail, hasło w formie zahashowanej, typ konta (np. osoba prywatna /
          firma), dane wprowadzone w profilu.
        </li>
        <li>
          Dane w ogłoszeniach i wiadomościach: treści oraz metadane niezbędne do działania Serwisu.
        </li>
        <li>
          Dane techniczne i logi: m.in. adres IP, typ przeglądarki, znaczniki czasu — w zakresie
          niezbędnym do zapewnienia bezpieczeństwa i działania usługi.
        </li>
      </ul>

      <h2>3. Cele i podstawy prawne</h2>
      <ul>
        <li>
          <strong>Świadczenie usługi</strong> (art. 6 ust. 1 lit. b RODO) — rejestracja, logowanie,
          publikacja ogłoszeń, obsługa zgłoszeń.
        </li>
        <li>
          <strong>Obowiązki prawne</strong> (art. 6 ust. 1 lit. c RODO) — np. rozliczenia i
          archiwizacja w wymaganym zakresie.
        </li>
        <li>
          <strong>Uzasadniony interes</strong> (art. 6 ust. 1 lit. f RODO) — bezpieczeństwo IT,
          analiza zagregowana, dochodzenie roszczeń.
        </li>
        <li>
          <strong>Zgoda</strong> (art. 6 ust. 1 lit. a RODO) — np. newsletter, marketing, cookies
          niezbędne wyłącznie przy zgodzie — zgodnie z odrębnymi ustawieniami i{" "}
          <Link href="/polityka-cookies">polityką cookies</Link>.
        </li>
      </ul>

      <h2>4. Zgoda na dane w celu poprawy działania Serwisu</h2>
      <p>
        Jeśli wyrazisz odrębną zgodę podczas rejestracji lub w ustawieniach konta, możemy
        przetwarzać wybrane dane użytkowania (np. sposób korzystania z funkcji, zdarzenia techniczne
        w formie zagregowanej) w celu analizy, rozwoju produktu i poprawy działania Serwisu. Zgodę
        możesz w każdej chwili cofnąć bez wpływu na zgodność z prawem przetwarzania przed cofnięciem.
      </p>

      <h2>5. Odbiorcy i przekazywanie poza EOG</h2>
      <p>
        Dane mogą być powierzane podmiotom przetwarzającym je w naszym imieniu (np. hosting, dostawca
        infrastruktury uwierzytelniania), z zobowiązaniem do zapewnienia poufności i bezpieczeństwa.
        Jeśli korzystamy z usług z USA lub innych krajów spoza EOG, stosujemy odpowiednie zabezpieczenia
        przewidziane przez RODO (np. standardowe klauzule umowne).
      </p>

      <h2>6. Okres przechowywania</h2>
      <p>
        Przechowujemy dane przez czas posiadania Konta i przez okres wymagany przepisami lub
        uzasadniony dochodzeniem roszczeń. Po usunięciu Konta dane są usuwane lub anonimizowane, z
        wyjątkiem danych, które musimy zachować dłużej z mocy prawa.
      </p>

      <h2>7. Twoje prawa</h2>
      <p>Masz m.in. prawo do:</p>
      <ul>
        <li>dostępu do danych i kopii danych,</li>
        <li>sprostowania, usunięcia lub ograniczenia przetwarzania,</li>
        <li>przenoszenia danych (w zakresie przewidzianym prawem),</li>
        <li>sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie,</li>
        <li>cofnięcia zgody w dowolnym momencie (jeśli przetwarzanie opiera się na zgodzie),</li>
        <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (UODO).</li>
      </ul>

      <h2>8. Kontakt w sprawach ochrony danych</h2>
      <p>
        W sprawach związanych z ochroną danych osobowych skontaktuj się z nami przez{" "}
        <Link href="/kontakt">formularz kontaktowy</Link> lub wskażony adres e-mail Administratora.
      </p>
      <p className="text-xs text-outline">Ostatnia aktualizacja: marzec 2026.</p>
    </LegalPageShell>
  );
}
