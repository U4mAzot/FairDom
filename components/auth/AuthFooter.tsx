import Link from "next/link";

const platform = [
  { href: "/search", label: "Szukaj" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
];

const legal = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-cookies", label: "Polityka cookies" },
];

export function AuthFooter() {
  return (
    <footer className="w-full bg-gray-100 px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 font-headline text-xl font-bold uppercase tracking-tight text-gray-900">
            FAIRDOM
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            Elevating the real estate experience through architectural passion and digital
            innovation.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
            Platforma
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {platform.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-emerald-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Prawne</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-emerald-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
            Newsletter
          </h4>
          <div className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-white p-1">
            <label htmlFor="auth-footer-email" className="sr-only">
              Adres e-mail
            </label>
            <input
              id="auth-footer-email"
              type="email"
              placeholder="Adres e-mail"
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              className="shrink-0 rounded bg-primary px-3 py-2 text-xs font-bold uppercase tracking-tight text-white transition hover:opacity-90"
            >
              Zapisz się
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-gray-200 pt-8 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} FairDom Real Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
