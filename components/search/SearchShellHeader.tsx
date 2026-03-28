import Link from "next/link";

export function SearchShellHeader() {
  return (
    <header className="fixed top-0 z-50 w-full shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-headline text-xl font-black uppercase tracking-tighter text-slate-900 sm:text-2xl"
          >
            FAIRDOM
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <span className="border-b-2 border-emerald-500 pb-1 font-headline text-sm font-bold text-slate-900">
              Wyszukiwarka
            </span>
            <Link
              href="/add-listing"
              className="font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              Dodaj ogłoszenie
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900 md:block"
          >
            Zaloguj
          </Link>
          <Link
            href="/register"
            className="rounded-md bg-gradient-to-br from-primary to-primary-container px-5 py-2 font-headline text-sm font-bold text-white transition hover:opacity-90"
          >
            Rejestracja
          </Link>
        </div>
      </nav>
    </header>
  );
}
