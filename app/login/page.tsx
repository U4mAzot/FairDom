import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import { AuthFooter } from "@/components/auth/AuthFooter";
import { LoginBrandingPanel } from "@/components/auth/LoginBrandingPanel";
import { LoginForm } from "@/components/auth/LoginForm";

/** Unikamy zbyt agresywnego cache HTML (stary UI po deployu). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login | FairDom",
  description: "Sign in to your FairDom account.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <AuthHeader activeHref="/login" />
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-28">
        <div
          className="pointer-events-none absolute -right-[5%] -top-[10%] h-[40rem] w-[40rem] rounded-full bg-secondary-fixed/30 blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-[5%] bottom-[-10%] h-[35rem] w-[35rem] rounded-full bg-tertiary-fixed/10 blur-[100px]"
          aria-hidden
        />

        <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl md:grid md:grid-cols-2">
          <LoginBrandingPanel />
          <Suspense
            fallback={
              <div className="flex min-h-[320px] items-center justify-center p-8 text-sm text-on-surface-variant md:min-h-[520px]">
                Ładowanie…
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
