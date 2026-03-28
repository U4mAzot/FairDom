import Link from "next/link";

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
          <h5 className="mb-4 font-bold text-slate-900">Platform</h5>
          <ul className="space-y-2 text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Careers
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-slate-900">Legal</h5>
          <ul className="space-y-2 text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-bold text-slate-900">Support</h5>
          <ul className="space-y-2 text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Contact Support
              </Link>
            </li>
            <li>
              <Link href="#" className="font-semibold text-emerald-500">
                Help Center
              </Link>
            </li>
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
