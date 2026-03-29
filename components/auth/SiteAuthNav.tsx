"use client";

import Link from "next/link";
import { useClientSession } from "@/hooks/useClientSession";

type Variant = "search" | "detail" | "home";

type SiteAuthNavProps = {
  variant?: Variant;
  /** np. zamknięcie menu mobilnego po kliknięciu linku */
  onNavigate?: () => void;
  /** Dodatkowe klasy na kontener (np. `flex-col` w menu mobilnym) */
  className?: string;
};

export function SiteAuthNav({ variant = "search", onNavigate, className }: SiteAuthNavProps) {
  const { session, ready, logout } = useClientSession();

  const navAfter = () => onNavigate?.();

  const loginClass =
    variant === "detail"
      ? "font-headline text-xs font-medium text-slate-500 transition hover:text-slate-900 sm:text-sm"
      : variant === "home"
        ? "font-headline text-sm font-medium text-on-surface-variant transition hover:text-on-surface"
        : "hidden font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900 md:block";

  const registerClass =
    variant === "detail"
      ? "font-headline text-xs font-medium text-slate-500 transition hover:text-slate-900 sm:text-sm"
      : variant === "home"
        ? "rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-2.5 font-headline text-sm font-bold text-white shadow-sm transition hover:opacity-90"
        : "rounded-md bg-gradient-to-br from-primary to-primary-container px-5 py-2 font-headline text-sm font-bold text-white transition hover:opacity-90";

  const loggedInWrap =
    variant === "detail"
      ? "flex max-w-[min(100vw-2rem,20rem)] flex-wrap items-center justify-end gap-x-2 gap-y-1 sm:max-w-none"
      : "flex flex-wrap items-center justify-end gap-2 md:gap-3";

  const emailClass =
    variant === "detail"
      ? "max-w-[10rem] truncate font-headline text-xs font-medium text-slate-700 sm:max-w-[14rem] sm:text-sm"
      : variant === "home"
        ? "max-w-[10rem] truncate font-headline text-sm font-medium text-on-surface md:max-w-[14rem]"
        : "max-w-[min(42vw,9rem)] truncate font-headline text-xs font-medium text-slate-700 sm:max-w-[14rem] sm:text-sm";

  const logoutClass =
    variant === "detail"
      ? "font-headline text-xs font-medium text-slate-500 underline-offset-2 hover:text-slate-900 hover:underline sm:text-sm"
      : variant === "home"
        ? "font-headline text-sm font-medium text-on-surface-variant hover:text-on-surface"
        : "font-headline text-sm font-medium text-slate-500 hover:text-slate-900";

  const messagesLinkClass =
    variant === "detail"
      ? "shrink-0 font-headline text-xs font-semibold text-slate-600 transition hover:text-slate-900 sm:text-sm"
      : variant === "home"
        ? "shrink-0 font-headline text-sm font-semibold text-on-surface-variant transition hover:text-primary"
        : "shrink-0 font-headline text-sm font-semibold text-slate-600 transition hover:text-slate-900";

  if (!ready) {
    return (
      <div className="flex items-center gap-3" aria-busy="true" aria-label="Ładowanie konta">
        <span className="h-4 w-16 animate-pulse rounded bg-slate-200/80" />
        <span className="h-8 w-24 animate-pulse rounded-md bg-slate-200/80" />
      </div>
    );
  }

  if (session) {
    return (
      <div className={`${loggedInWrap} ${className ?? ""}`.trim()}>
        <Link
          href="/dashboard?section=messages"
          className={messagesLinkClass}
          onClick={navAfter}
        >
          Wiadomości
        </Link>
        <span className={emailClass} title={session.email}>
          {session.email}
        </span>
        <button
          type="button"
          onClick={() => {
            void logout();
            navAfter();
          }}
          className={logoutClass}
        >
          Wyloguj
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className ?? ""}`.trim()}>
      <Link href="/login" className={loginClass} onClick={navAfter}>
        {variant === "home" ? "Logowanie" : "Zaloguj"}
      </Link>
      <Link href="/register" className={registerClass} onClick={navAfter}>
        {variant === "home" ? "Zarejestruj" : "Rejestracja"}
      </Link>
    </div>
  );
}
