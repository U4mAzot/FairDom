import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";

export const metadata: Metadata = {
  title: "Kontakt | FairDom",
  description: "Kontakt z zespołem FairDom.",
};

export default function KontaktPage() {
  return (
    <LegalPageShell title="Kontakt i wsparcie">
      <p className="text-on-surface">
        Masz pytanie dotyczące konta, ogłoszeń lub ochrony danych? Skorzystaj z poniższych informacji.
      </p>
      <h2>Wsparcie użytkowników</h2>
      <p>
        Na pytania techniczne i dotyczące korzystania z Serwisu odpowiadamy na adres e-mail wskazany
        przez operatora Serwisu (np. <strong>support@fairdom.pl</strong>) — zastąp ten adres
        faktycznym adresem Twojej organizacji po wdrożeniu produkcyjnym.
      </p>
      <h2>Administrator danych</h2>
      <p>
        W sprawach RODO użyj dedykowanego kanału wskazanego przez Administratora (np.{" "}
        <strong>iodo@fairdom.pl</strong>) lub formularza z adnotacją „RODO”.
      </p>
      <h2>Dane podmiotu</h2>
      <p>
        Pełna nazwa prawna, adres siedziby i numery identyfikacyjne (NIP, REGON) należy uzupełnić po
        rejestracji działalności — treść na tej stronie ma charakter szablonowy do czasu podania
        ostatecznych danych firmy.
      </p>
    </LegalPageShell>
  );
}
