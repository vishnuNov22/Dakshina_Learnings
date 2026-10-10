import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { programmeHref, type Programme } from "@/data/programmes";

const accent = { gold: "bg-gold", blue: "bg-blue", red: "bg-red" } as const;

export function ProgrammeCard({ p, index, tone = "dark" }: { p: Programme; index: number; tone?: "dark" | "light" }) {
  return (
    <Link
      href={programmeHref(p.slug)}
      className={clsx(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl p-6 ring-1 transition-[transform,box-shadow,background-color] duration-500 ease-[var(--ease-cinema)] hover:-translate-y-1 sm:p-8",
        tone === "dark" ? "bg-ivory/[0.035] ring-ivory/10 hover:bg-ivory/[0.07] hover:ring-gold/50" : "bg-white/70 ring-ink/10 hover:bg-white hover:shadow-xl",
      )}
    >
      <span aria-hidden className={clsx("absolute left-0 top-0 h-1 w-16", accent[p.accent])} />
      <div className="flex items-start justify-between gap-4">
        <p className={clsx("font-mono text-xs", tone === "dark" ? "text-gold" : "text-red")}>{String(index + 1).padStart(2, "0")}</p>
        <ArrowUpRight size={20} aria-hidden className="shrink-0 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
      </div>
      <p className={clsx("mt-8 font-mono text-[0.68rem] uppercase tracking-[0.16em]", tone === "dark" ? "text-ivory/50" : "text-ink/50")}>{p.kicker}</p>
      <h3 className="mt-2 text-step-3">{p.shortTitle}</h3>
      <p className={clsx("mt-4 text-[0.95rem]", tone === "dark" ? "text-ivory/70" : "text-ink/70")}>{p.summary}</p>
      <span className={clsx("mt-auto pt-8 text-sm font-semibold underline-offset-4 group-hover:underline", tone === "dark" ? "text-ivory" : "text-ink")}>View programme</span>
    </Link>
  );
}
