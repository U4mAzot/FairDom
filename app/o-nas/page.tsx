import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "O nas | FairDom",
  description: "FairDom — przejrzyste nieruchomości i nowoczesna prezentacja ofert.",
};

export default function ONasPage() {
  return (
    <LegalPageShell title="O FairDom">
      <p className="text-on-surface">
        FairDom to platforma, która łączy przejrzystość informacji o nieruchomościach z dbałością o
        wygodę użytkownika i czytelny, współczesny interfejs. Chcemy ułatwić znalezienie właściwej
        oferty — bez zbędnego szumu i z jasnymi zasadami publikacji.
      </p>
      <h2>Nasze wartości</h2>
      <ul>
        <li>Transparentność w prezentacji ofert i zasad korzystania z serwisu.</li>
        <li>Technologia, która wspiera użytkownika, a nie go rozprasza.</li>
        <li>Szacunek do danych osobowych — opisany w politykach prywatności i cookies.</li>
      </ul>
      <p>
        Jesteśmy w fazie rozwoju produktu — Twoja opinia i sposób korzystania z Serwisu pomagają nam
        go ulepszać (w zakresie, na który wyrazisz zgodę).
      </p>
    </LegalPageShell>
  );
}
