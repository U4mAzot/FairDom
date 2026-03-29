import Link from "next/link";
import { Globe, MessageCircle, Share2 } from "lucide-react";

export function PropertyDetailFooter() {
  return (
    <footer className="mt-12 w-full bg-slate-100 px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 font-headline text-xl font-bold uppercase tracking-tighter text-slate-900">
            FairDom
          </div>
          <p className="text-sm leading-relaxed text-slate-500">
            Definiujemy nową generację rynku nieruchomości dzięki transparentności i starannie
            dobranym ofertom.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-primary">Nieruchomości</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Kolekcja penthouse
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Nowoczesne rezydencje
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Miejskie lofty
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-primary">Firma</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                O nas
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Polityka prywatności
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Regulamin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-primary">Wsparcie</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Skontaktuj się ze wsparciem
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Kariera
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FairDom Real Estate. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex gap-6 text-slate-400">
          <Globe className="h-5 w-5 cursor-pointer transition hover:text-primary" aria-hidden />
          <MessageCircle className="h-5 w-5 cursor-pointer transition hover:text-primary" aria-hidden />
          <Share2 className="h-5 w-5 cursor-pointer transition hover:text-primary" aria-hidden />
        </div>
      </div>
    </footer>
  );
}
