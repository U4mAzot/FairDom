"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SocialIconButtons } from "@/components/auth/SocialIconButtons";
import { upsertProfileFromUser } from "@/lib/profileSync";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { digitsOnlyNip, isValidPolishNip } from "@/lib/validation/nip";

export type AccountKind = "private" | "business";

function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Podaj adres e-mail.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Nieprawidłowy adres e-mail.";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return "Hasło jest wymagane.";
  if (value.length < 8) return "Hasło musi mieć co najmniej 8 znaków.";
  return undefined;
}

function normalizePostalCode(value: string): string {
  const d = value.replace(/\D/g, "");
  if (d.length !== 5) return value.trim();
  return `${d.slice(0, 2)}-${d.slice(2, 5)}`;
}

function validatePostalPl(value: string): string | undefined {
  const d = value.replace(/\D/g, "");
  if (d.length !== 5) return "Podaj kod pocztowy (np. 00-950).";
  return undefined;
}

function validateRegonOptional(value: string): string | undefined {
  const d = value.replace(/\D/g, "");
  if (!d) return undefined;
  if (d.length !== 9 && d.length !== 14) return "REGON to 9 lub 14 cyfr.";
  return undefined;
}

function requiredTrim(value: string, label: string): string | undefined {
  if (!value.trim()) return `Pole „${label}” jest wymagane.`;
  return undefined;
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginHref = useMemo(() => {
    const q = searchParams.toString();
    return q ? `/login?${q}` : "/login";
  }, [searchParams]);
  const [accountKind, setAccountKind] = useState<AccountKind>("private");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptDataUsage, setAcceptDataUsage] = useState(false);

  const [companyLegalName, setCompanyLegalName] = useState("");
  const [nip, setNip] = useState("");
  const [regon, setRegon] = useState("");
  const [registeredStreet, setRegisteredStreet] = useState("");
  const [registeredBuildingNo, setRegisteredBuildingNo] = useState("");
  const [registeredApartment, setRegisteredApartment] = useState("");
  const [registeredPostalCode, setRegisteredPostalCode] = useState("");
  const [registeredCity, setRegisteredCity] = useState("");
  const [registeredVoivodeship, setRegisteredVoivodeship] = useState("");
  const [registeredCountry, setRegisteredCountry] = useState("Polska");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
    terms?: string;
    dataUsage?: string;
    companyLegalName?: string;
    nip?: string;
    regon?: string;
    registeredStreet?: string;
    registeredBuildingNo?: string;
    registeredPostalCode?: string;
    registeredCity?: string;
  }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setInfo(null);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    let confirmErr: string | undefined;
    if (password !== confirm) confirmErr = "Hasła muszą być takie same.";
    const termsErr = acceptTerms ? undefined : "Musisz zaakceptować regulamin.";
    const dataUsageErr = acceptDataUsage
      ? undefined
      : "Wymagana jest zgoda na przetwarzanie danych w celu poprawy działania serwisu.";

    let companyLegalNameErr: string | undefined;
    let nipErr: string | undefined;
    let regonErr: string | undefined;
    let streetErr: string | undefined;
    let buildingErr: string | undefined;
    let postalErr: string | undefined;
    let cityErr: string | undefined;

    if (accountKind === "business") {
      companyLegalNameErr = requiredTrim(companyLegalName, "Pełna nazwa firmy");
      const nipDigits = digitsOnlyNip(nip);
      if (!nipDigits) nipErr = "Podaj NIP.";
      else if (!isValidPolishNip(nipDigits)) nipErr = "Nieprawidłowy numer NIP.";
      regonErr = validateRegonOptional(regon);
      streetErr = requiredTrim(registeredStreet, "Ulica");
      buildingErr = requiredTrim(registeredBuildingNo, "Numer budynku");
      postalErr = validatePostalPl(registeredPostalCode);
      cityErr = requiredTrim(registeredCity, "Miejscowość");
    }

    setErrors({
      email: emailErr,
      password: passErr,
      confirm: confirmErr,
      terms: termsErr,
      dataUsage: dataUsageErr,
      companyLegalName: companyLegalNameErr,
      nip: nipErr,
      regon: regonErr,
      registeredStreet: streetErr,
      registeredBuildingNo: buildingErr,
      registeredPostalCode: postalErr,
      registeredCity: cityErr,
    });

    if (
      emailErr ||
      passErr ||
      confirmErr ||
      termsErr ||
      dataUsageErr ||
      companyLegalNameErr ||
      nipErr ||
      regonErr ||
      streetErr ||
      buildingErr ||
      postalErr ||
      cityErr
    ) {
      return;
    }

    if (!isSupabaseConfigured()) {
      setAuthError(
        "Brak konfiguracji Supabase. Ustaw NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY w .env.local.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const acceptedAt = new Date().toISOString();
      const nipDigits = accountKind === "business" ? digitsOnlyNip(nip) : "";
      const regonDigits = regon.replace(/\D/g, "");

      const userData: Record<string, unknown> = {
        account_type: accountKind === "business" ? "business" : "private",
        terms_accepted_at: acceptedAt,
        service_improvement_consent: true,
        service_improvement_consent_at: acceptedAt,
      };

      if (accountKind === "business") {
        userData.company_legal_name = companyLegalName.trim();
        userData.nip = nipDigits;
        userData.regon = regonDigits || null;
        userData.registered_street = registeredStreet.trim();
        userData.registered_building_no = registeredBuildingNo.trim();
        userData.registered_apartment = registeredApartment.trim() || null;
        userData.registered_postal_code = normalizePostalCode(registeredPostalCode);
        userData.registered_city = registeredCity.trim();
        userData.registered_voivodeship = registeredVoivodeship.trim() || null;
        userData.registered_country = registeredCountry.trim() || "Polska";
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (data.user && data.session) {
        const { error: profileErr } = await upsertProfileFromUser(data.user);
        if (profileErr) {
          setAuthError(
            profileErr.message ||
              "Konto utworzono, ale zapis profilu w bazie nie powiódł się. Uruchom migrację SQL dla tabeli profiles w Supabase.",
          );
          return;
        }
      }

      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      );
      const returnUrl = params.get("returnUrl");
      const safe =
        returnUrl && returnUrl.startsWith("/") && !returnUrl.startsWith("//") ? returnUrl : "/";

      if (data.session) {
        router.push(safe);
        router.refresh();
        return;
      }

      setInfo(
        "Na podany adres wysłaliśmy link aktywacyjny. Po potwierdzeniu e-maila możesz się zalogować.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center p-8 md:p-12">
      <div className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-primary">Załóż konto</h2>
        <p className="mt-2 text-on-surface-variant">
          Konto firmowe wymaga NIP-u i adresu siedziby zgodnego z CEIDG/KRS — dane trafiają do tabeli{" "}
          <code className="rounded bg-surface-low px-1 text-xs">profiles</code> w Supabase.
        </p>
      </div>

      <div className="mb-8 flex rounded-full bg-surface-low p-1">
        <button
          type="button"
          onClick={() => setAccountKind("private")}
          className={`flex-1 rounded-full py-2.5 px-4 text-sm font-semibold transition-all duration-300 ${
            accountKind === "private"
              ? "bg-white text-primary shadow-sm"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Osoba prywatna
        </button>
        <button
          type="button"
          onClick={() => setAccountKind("business")}
          className={`flex-1 rounded-full py-2.5 px-4 text-sm font-semibold transition-all duration-300 ${
            accountKind === "business"
              ? "bg-white text-primary shadow-sm"
              : "text-on-surface-variant hover:text-primary"
          }`}
        >
          Firma
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {authError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {authError}
          </p>
        )}
        {info && (
          <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800" role="status">
            {info}
          </p>
        )}

        {accountKind === "business" && (
          <div className="space-y-4 rounded-xl border border-outline-variant/40 bg-surface-low/60 p-4 md:p-5">
            <p className="font-headline text-sm font-bold text-primary">Dane firmy i siedziba</p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="company-legal-name"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Pełna nazwa firmy
                </label>
                <input
                  id="company-legal-name"
                  name="companyLegalName"
                  type="text"
                  autoComplete="organization"
                  value={companyLegalName}
                  onChange={(ev) => {
                    setCompanyLegalName(ev.target.value);
                    if (errors.companyLegalName) setErrors((s) => ({ ...s, companyLegalName: undefined }));
                  }}
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.companyLegalName}
                />
                {errors.companyLegalName && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.companyLegalName}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="company-nip"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  NIP
                </label>
                <input
                  id="company-nip"
                  name="nip"
                  inputMode="numeric"
                  autoComplete="off"
                  value={nip}
                  onChange={(ev) => {
                    setNip(ev.target.value);
                    if (errors.nip) setErrors((s) => ({ ...s, nip: undefined }));
                  }}
                  placeholder="10 cyfr"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.nip}
                />
                {errors.nip && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.nip}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="company-regon"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  REGON (opcjonalnie)
                </label>
                <input
                  id="company-regon"
                  name="regon"
                  inputMode="numeric"
                  value={regon}
                  onChange={(ev) => {
                    setRegon(ev.target.value);
                    if (errors.regon) setErrors((s) => ({ ...s, regon: undefined }));
                  }}
                  placeholder="9 lub 14 cyfr"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.regon}
                />
                {errors.regon && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.regon}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="reg-street"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Ulica
                </label>
                <input
                  id="reg-street"
                  name="registeredStreet"
                  type="text"
                  autoComplete="street-address"
                  value={registeredStreet}
                  onChange={(ev) => {
                    setRegisteredStreet(ev.target.value);
                    if (errors.registeredStreet) setErrors((s) => ({ ...s, registeredStreet: undefined }));
                  }}
                  placeholder="np. Marszałkowska"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.registeredStreet}
                />
                {errors.registeredStreet && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.registeredStreet}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-building"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Nr budynku
                </label>
                <input
                  id="reg-building"
                  name="registeredBuildingNo"
                  type="text"
                  value={registeredBuildingNo}
                  onChange={(ev) => {
                    setRegisteredBuildingNo(ev.target.value);
                    if (errors.registeredBuildingNo)
                      setErrors((s) => ({ ...s, registeredBuildingNo: undefined }));
                  }}
                  placeholder="np. 12A"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.registeredBuildingNo}
                />
                {errors.registeredBuildingNo && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.registeredBuildingNo}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-apt"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Nr lokalu
                </label>
                <input
                  id="reg-apt"
                  name="registeredApartment"
                  type="text"
                  value={registeredApartment}
                  onChange={(ev) => setRegisteredApartment(ev.target.value)}
                  placeholder="opcjonalnie"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-postal"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Kod pocztowy
                </label>
                <input
                  id="reg-postal"
                  name="registeredPostalCode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={registeredPostalCode}
                  onChange={(ev) => {
                    setRegisteredPostalCode(ev.target.value);
                    if (errors.registeredPostalCode)
                      setErrors((s) => ({ ...s, registeredPostalCode: undefined }));
                  }}
                  placeholder="00-950"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.registeredPostalCode}
                />
                {errors.registeredPostalCode && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.registeredPostalCode}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-city"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Miejscowość
                </label>
                <input
                  id="reg-city"
                  name="registeredCity"
                  type="text"
                  autoComplete="address-level2"
                  value={registeredCity}
                  onChange={(ev) => {
                    setRegisteredCity(ev.target.value);
                    if (errors.registeredCity) setErrors((s) => ({ ...s, registeredCity: undefined }));
                  }}
                  placeholder="np. Warszawa"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                  aria-invalid={!!errors.registeredCity}
                />
                {errors.registeredCity && (
                  <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
                    {errors.registeredCity}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="reg-voiv"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Województwo (opcjonalnie)
                </label>
                <input
                  id="reg-voiv"
                  name="registeredVoivodeship"
                  type="text"
                  value={registeredVoivodeship}
                  onChange={(ev) => setRegisteredVoivodeship(ev.target.value)}
                  placeholder="np. mazowieckie"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
              </div>
              <div>
                <label
                  htmlFor="reg-country"
                  className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  Kraj
                </label>
                <input
                  id="reg-country"
                  name="registeredCountry"
                  type="text"
                  autoComplete="country-name"
                  value={registeredCountry}
                  onChange={(ev) => setRegisteredCountry(ev.target.value)}
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="register-email"
            className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            E-mail
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              if (errors.email) setErrors((s) => ({ ...s, email: undefined }));
            }}
            placeholder="twoj@email.pl"
            className="w-full rounded-lg border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "register-email-error" : undefined}
          />
          {errors.email && (
            <p id="register-email-error" className="mt-1.5 text-sm font-medium text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            Hasło
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
              if (errors.password) setErrors((s) => ({ ...s, password: undefined }));
            }}
            placeholder="••••••••"
            className="w-full rounded-lg border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="register-confirm"
            className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            Powtórz hasło
          </label>
          <input
            id="register-confirm"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(ev) => {
              setConfirm(ev.target.value);
              if (errors.confirm) setErrors((s) => ({ ...s, confirm: undefined }));
            }}
            placeholder="••••••••"
            className="w-full rounded-lg border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
            aria-invalid={!!errors.confirm}
          />
          {errors.confirm && (
            <p className="mt-1.5 text-sm font-medium text-red-600" role="alert">
              {errors.confirm}
            </p>
          )}
        </div>

        <div className="space-y-4 rounded-lg border border-outline-variant/40 bg-surface-low/80 p-4">
          <label className="flex cursor-pointer gap-3 text-sm leading-snug text-on-surface">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(ev) => {
                setAcceptTerms(ev.target.checked);
                if (errors.terms) setErrors((s) => ({ ...s, terms: undefined }));
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-outline text-on-tertiary-container focus:ring-tertiary-fixed"
              aria-invalid={!!errors.terms}
              aria-describedby={errors.terms ? "register-terms-error" : undefined}
            />
            <span>
              Oświadczam, że zapoznałem(-am) się z{" "}
              <Link
                href="/regulamin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-2"
              >
                regulaminem serwisu
              </Link>{" "}
              i akceptuję jego postanowienia.{" "}
              <span className="text-red-600" aria-hidden>
                *
              </span>
            </span>
          </label>
          {errors.terms && (
            <p id="register-terms-error" className="text-sm font-medium text-red-600" role="alert">
              {errors.terms}
            </p>
          )}

          <label className="flex cursor-pointer gap-3 text-sm leading-snug text-on-surface">
            <input
              type="checkbox"
              checked={acceptDataUsage}
              onChange={(ev) => {
                setAcceptDataUsage(ev.target.checked);
                if (errors.dataUsage) setErrors((s) => ({ ...s, dataUsage: undefined }));
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-outline text-on-tertiary-container focus:ring-tertiary-fixed"
              aria-invalid={!!errors.dataUsage}
              aria-describedby={errors.dataUsage ? "register-data-error" : undefined}
            />
            <span>
              Wyrażam zgodę na przetwarzanie i wykorzystywanie moich danych (w tym danych o sposobie
              korzystania z serwisu) w celach analizy, rozwoju oraz poprawy działania FairDom, zgodnie
              z{" "}
              <Link
                href="/polityka-prywatnosci"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline underline-offset-2"
              >
                polityką prywatności
              </Link>
              .{" "}
              <span className="text-red-600" aria-hidden>
                *
              </span>
            </span>
          </label>
          {errors.dataUsage && (
            <p id="register-data-error" className="text-sm font-medium text-red-600" role="alert">
              {errors.dataUsage}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
        >
          {submitting ? "Rejestracja…" : "Zarejestruj się"}
        </button>
      </form>

      <div className="mt-8 border-t border-gray-200 pt-8 text-center">
        <p className="text-sm text-on-surface-variant">
          Masz już konto?{" "}
          <Link href={loginHref} className="ml-1 font-bold text-primary hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>

      <SocialIconButtons />
    </div>
  );
}
