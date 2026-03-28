"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClientSession } from "@/hooks/useClientSession";

export function RequireAccountForListing({ children }: { children: React.ReactNode }) {
  const { session, ready } = useClientSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return;
    if (session) return;
    const ret = encodeURIComponent(pathname || "/add-listing/step-1");
    router.replace(`/login?returnUrl=${ret}`);
  }, [ready, session, router, pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <p className="text-sm font-medium text-slate-600">Ładowanie…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
        <p className="text-sm font-medium text-slate-600">Przekierowanie do logowania…</p>
      </div>
    );
  }

  return <>{children}</>;
}
