import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

/** Editorial page header used by inner pages. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  crumbs,
  tone = "dark",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: { label: string; href: string }[];
  tone?: "dark" | "paper";
  children?: ReactNode;
}) {
  return (
    <header className={clsx("grain relative overflow-hidden", tone === "dark" ? "bg-navy text-ivory" : "paper")}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -right-[10%] -top-[30%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(183,154,98,0.16),transparent)]" />
      </div>
      <div className="container-x relative z-[2] pb-16 pt-[calc(var(--header-h)+3.5rem)] sm:pb-20 lg:pb-28 lg:pt-[calc(var(--header-h)+6rem)]">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className={clsx("flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em]", tone === "dark" ? "text-ivory/50" : "text-ink/50")}>
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="hover:underline">{c.label}</Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className={clsx("eyebrow mb-6 flex items-center gap-3", tone === "dark" ? "text-gold" : "text-red")}>
          <span aria-hidden className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </p>
        <h1 className="max-w-5xl text-step-5">{title}</h1>
        {lede ? <p className={clsx("mt-8 max-w-2xl text-step-1", tone === "dark" ? "text-ivory/70" : "text-ink/70")}>{lede}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </header>
  );
}
