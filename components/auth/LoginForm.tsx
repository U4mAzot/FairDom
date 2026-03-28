"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { SocialIconButtons } from "@/components/auth/SocialIconButtons";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address.";
  return undefined;
}

function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  return undefined;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerHref = useMemo(() => {
    const q = searchParams.toString();
    return q ? `/register?${q}` : "/register";
  }, [searchParams]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });
    if (emailErr || passErr) return;

    if (!isSupabaseConfigured()) {
      setAuthError(
        "Brak konfiguracji Supabase. Ustaw NEXT_PUBLIC_SUPABASE_URL i NEXT_PUBLIC_SUPABASE_ANON_KEY w .env.local.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
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
      router.push(safe);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center p-8 md:p-12">
      <div className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-primary">Welcome Back</h2>
        <p className="mt-2 text-on-surface-variant">
          Zaloguj się, aby pisać do sprzedających i zarządzać ogłoszeniami. Przeglądanie ofert jest
          dostępne bez konta.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {authError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {authError}
          </p>
        )}

        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
          >
            Email Address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(ev) => {
              setEmail(ev.target.value);
              if (errors.email) setErrors((s) => ({ ...s, email: undefined }));
            }}
            onBlur={() =>
              setErrors((s) => {
                const e = validateEmail(email);
                return { ...s, ...(e ? { email: e } : { email: undefined }) };
              })
            }
            placeholder="name@company.com"
            className="w-full rounded-lg border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "login-email-error" : undefined}
          />
          {errors.email && (
            <p id="login-email-error" className="mt-1.5 text-sm font-medium text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <label
              htmlFor="login-password"
              className="font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
            >
              Password
            </label>
            <Link
              href="#forgot"
              className="text-xs font-semibold text-primary transition hover:text-on-tertiary-container"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => {
              setPassword(ev.target.value);
              if (errors.password) setErrors((s) => ({ ...s, password: undefined }));
            }}
            onBlur={() =>
              setErrors((s) => {
                const p = validatePassword(password);
                return { ...s, ...(p ? { password: p } : { password: undefined }) };
              })
            }
            placeholder="••••••••"
            className="w-full rounded-lg border-0 bg-surface-low px-4 py-3 text-on-surface placeholder:text-outline/50 focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "login-password-error" : undefined}
          />
          {errors.password && (
            <p
              id="login-password-error"
              className="mt-1.5 text-sm font-medium text-red-600"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="keep-logged-in"
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-tertiary-fixed"
          />
          <label htmlFor="keep-logged-in" className="text-sm text-on-surface-variant">
            Keep me logged in for 30 days
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
        >
          {submitting ? "Logowanie…" : "Zaloguj się"}
        </button>
      </form>

      <div className="mt-8 border-t border-gray-200 pt-8 text-center">
        <p className="text-sm text-on-surface-variant">
          Nie masz konta?{" "}
          <Link href={registerHref} className="ml-1 font-bold text-primary hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>

      <SocialIconButtons />
    </div>
  );
}
