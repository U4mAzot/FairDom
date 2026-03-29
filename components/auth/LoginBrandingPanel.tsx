import Image from "next/image";
import { LineChart, ShieldCheck } from "lucide-react";

export function LoginBrandingPanel() {
  return (
    <div className="relative hidden min-h-[520px] flex-col justify-between overflow-hidden bg-primary p-10 text-white md:flex lg:p-12">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 0px, 50vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-primary/70"
          aria-hidden
        />
      </div>

      <div className="relative z-10">
        <h1 className="font-headline text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
          Otwórz drzwi do{" "}
          <span className="text-emerald-400">wymarzonego domu.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
          Korzystaj z transparentnego ekosystemu nieruchomości, stworzonego z myślą o
          przejrzystości, szybkości i pełnym zaufaniu.
        </p>
      </div>

      <div className="relative z-10 mt-10 space-y-6">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container">
            <ShieldCheck className="h-5 w-5 text-emerald-400" strokeWidth={2} aria-hidden />
          </div>
          <div>
            <h3 className="font-bold text-white">Zweryfikowane ogłoszenia</h3>
            <p className="mt-1 text-sm text-white/75">
              Każda nieruchomość jest sprawdzana przez nasz zespół weryfikacji.
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container">
            <LineChart className="h-5 w-5 text-emerald-400" strokeWidth={2} aria-hidden />
          </div>
          <div>
            <h3 className="font-bold text-white">Analityka rynku</h3>
            <p className="mt-1 text-sm text-white/75">
              Dane i analizy pomagają podejmować trafne decyzje inwestycyjne.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
