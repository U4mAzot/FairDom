import Link from "next/link";

const links: { href: string; label: string }[] = [
  { href: "/search", label: "Szukaj" },
  { href: "/add-listing", label: "Dodaj ogłoszenie" },
  { href: "/login", label: "Logowanie" },
  { href: "/register", label: "Rejestracja" },
];

type AuthHeaderProps = {
  /** Highlights the active nav link (e.g. login vs register). */
  activeHref?: string;
};

export function AuthHeader({ activeHref }: AuthHeaderProps) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-headline text-xl font-black uppercase tracking-tighter text-gray-900 sm:text-2xl"
        >
          FAIRDOM
        </Link>
        <div className="flex max-w-[min(100%,22rem)] flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:max-w-none sm:gap-x-6 md:gap-x-8">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                activeHref === item.href
                  ? "border-b-2 border-emerald-500 pb-0.5 text-sm font-semibold text-gray-900 sm:text-base"
                  : "text-sm font-medium text-gray-500 transition hover:text-gray-900 sm:text-base"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
