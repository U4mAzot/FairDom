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
        <div className="flex max-w-[min(100%,24rem)] flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:max-w-none sm:gap-x-6 md:gap-x-8">
          <Link
            href="/search"
            className="font-headline text-xs font-medium text-slate-500 transition hover:text-slate-900 sm:text-sm"
          >
            Search
          </Link>
          <Link
            href="/add-listing"
            className="border-b-2 border-emerald-500 pb-0.5 font-headline text-xs font-bold text-slate-900 sm:text-sm"
          >
            Add Listing
          </Link>
          <Link
            href="/login"
            className="font-headline text-xs font-medium text-slate-500 transition hover:text-slate-900 sm:text-sm"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="font-headline text-xs font-medium text-slate-500 transition hover:text-slate-900 sm:text-sm"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}
