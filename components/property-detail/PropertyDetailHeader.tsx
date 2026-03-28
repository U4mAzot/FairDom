import Link from "next/link";

export function PropertyDetailHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-headline text-xl font-black uppercase tracking-tighter text-slate-900 sm:text-2xl"
        >
          FAIRDOM
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/search"
            className="font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Search
          </Link>
          <Link
            href="/add-listing/step-3"
            className="border-b-2 border-emerald-500 pb-1 font-headline text-sm font-bold text-slate-900"
          >
            Add Listing
          </Link>
          <Link
            href="/login"
            className="font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Login
          </Link>
          <Link
            href="/#register"
            className="font-headline text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
