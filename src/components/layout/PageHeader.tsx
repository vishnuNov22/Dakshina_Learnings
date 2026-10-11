import type { ReactNode } from "react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoData } from "@/data/media";

/** Editorial inner-page header: pure white, purple accents, optional real photograph. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  photo,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { label: string; href: string }[];
  photo?: PhotoData;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.10),transparent)]" />
      <div className="container-x relative pb-14 pt-[calc(var(--header-h)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-h)+5rem)]">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-brand">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden className="text-brand">/</span>
                  {i === crumbs.length - 1 ? <span aria-current="page" className="text-brand">{c.label}</span> : <Link href={c.href} className="hover:text-brand">{c.label}</Link>}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className={photo ? "grid items-end gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]" : undefined}>
          <div className="min-w-0">
            <p className="eyebrow mb-6 flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-10 bg-current" />
              {eyebrow}
            </p>
            <h1 className="max-w-5xl text-step-5 text-ink">{title}</h1>
            {lede ? <p className="mt-8 max-w-2xl text-step-1 text-ink-soft">{lede}</p> : null}
            {children ? <div className="mt-10">{children}</div> : null}
          </div>
          {photo ? <Photo photo={photo} priority sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full lg:aspect-[5/6]" /> : null}
        </div>
      </div>
    </header>
  );
}
