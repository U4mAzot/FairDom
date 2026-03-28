import Link from "next/link";

const platform = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kariera", label: "Kariera" },
];

const legal = [
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/regulamin", label: "Regulamin" },
];

const support = [{ href: "/kontakt", label: "Kontakt i pomoc" }];

export function WizardFooter() {
  return (
    <footer className="w-full bg-slate-100 px-6 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 text-sm md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-headline text-xl font-bold uppercase tracking-tighter text-slate-900">
            FairDom
          </div>
          <p className="text-slate-500">
            Revolutionizing real estate through transparency and architectural excellence.
          </p>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-slate-900">Platforma</h5>
          <ul className="space-y-2 text-slate-500">
            {platform.map((item) => (
              <li key={item.href + item.label}>
                <Link href={item.href} className="transition hover:text-emerald-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-slate-900">Prawne</h5>
          <ul className="space-y-2 text-slate-500">
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
          <h5 className="mb-4 font-bold text-slate-900">Wsparcie</h5>
          <ul className="space-y-2 text-slate-500">
            {support.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-emerald-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-200 pt-8 text-center">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FairDom Real Estate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
