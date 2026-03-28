import Link from "next/link";

const links: { href: string; label: string; active?: boolean }[] = [
  { href: "/#search", label: "Search" },
  { href: "/#add", label: "Add Listing" },
  { href: "/login", label: "Login", active: true },
  { href: "/#register", label: "Register" },
];

export function AuthHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/50 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-headline text-xl font-black uppercase tracking-tighter text-gray-900 sm:text-2xl"
        >
          FAIRDOM
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.active
                  ? "border-b-2 border-emerald-500 pb-1 font-semibold text-gray-900"
                  : "font-medium text-gray-500 transition hover:text-gray-900"
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
