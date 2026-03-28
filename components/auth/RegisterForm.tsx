"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SocialIconButtons } from "@/components/auth/SocialIconButtons";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

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
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
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
    setErrors({ email: emailErr, password: passErr, confirm: confirmErr });
    if (emailErr || passErr || confirmErr) return;

    if (!isSupabaseConfigured()) {
      setAuthError(
        "Brak konfiguracji Supabase. Ustaw NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY w .env.local.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            account_type: accountKind === "business" ? "business" : "private",
          },
        },
      });

      if (error) {
        setAuthError(error.message);
        return;
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
          Typ konta (osoba prywatna / firma) zapisujemy w profilu Supabase. Przy logowaniu nie
          wybierasz typu — jest wczytywany z konta.
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
