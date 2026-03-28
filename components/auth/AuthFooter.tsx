import Link from "next/link";

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
            Platform
          </h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="/#about" className="transition hover:text-emerald-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/#careers" className="transition hover:text-emerald-500">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/#support" className="transition hover:text-emerald-500">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>
              <Link href="/#privacy" className="transition hover:text-emerald-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/#terms" className="transition hover:text-emerald-500">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900">
            Join the Market
          </h4>
          <div className="flex items-center gap-2 rounded-lg border border-outline-variant/30 bg-white p-1">
            <label htmlFor="auth-footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="auth-footer-email"
              type="email"
              placeholder="Email address"
              className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2 text-xs text-on-surface focus:outline-none focus:ring-0"
            />
            <button
              type="button"
              className="shrink-0 rounded bg-primary px-3 py-2 text-xs font-bold uppercase tracking-tight text-white transition hover:opacity-90"
            >
              Join
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
