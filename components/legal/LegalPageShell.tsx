import Link from "next/link";

export function LegalPageShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-surface pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="text-sm font-medium text-on-tertiary-container transition hover:underline"
        >
          ← Strona główna
        </Link>
        <h1 className="mt-6 font-headline text-3xl font-bold text-primary">{title}</h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-on-surface-variant [&_h2]:mt-10 [&_h2]:font-headline [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-on-surface [&_h2]:first:mt-0 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:font-medium [&_a]:text-on-tertiary-container [&_a]:underline [&_a]:underline-offset-2">
          {children}
        </div>
      </div>
    </main>
  );
}
