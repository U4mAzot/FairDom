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
            Defining the next generation of architectural real estate through transparency and curated
            design.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-primary">Properties</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Penthouse Collection
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Modern Estates
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Urban Lofts
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-primary">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                About Us
              </Link>
            </li>
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
          <h4 className="mb-4 font-bold text-primary">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Contact Support
              </Link>
            </li>
            <li>
              <Link href="#" className="transition hover:text-emerald-500">
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} FairDom Real Estate. All rights reserved.
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
