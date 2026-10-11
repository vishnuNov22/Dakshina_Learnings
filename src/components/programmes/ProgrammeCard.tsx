import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programmeHref, type Programme } from "@/data/programmes";

export function ProgrammeCard({ p, index }: { p: Programme; index: number }) {
  return (
    <Link
      href={programmeHref(p.slug)}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[28px] bg-white p-7 ring-1 ring-line transition-[transform,box-shadow] duration-700 ease-[var(--ease-cinema)] hover:-translate-y-1.5 hover:shadow-[0_40px_70px_-40px_rgba(90,34,150,0.55)] sm:p-9"
    >
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0 bg-brand transition-[height] duration-700 ease-[var(--ease-cinema)] group-hover:h-full" />
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-serif text-3xl italic text-brand transition-colors duration-500 group-hover:text-white">{String(index + 1).padStart(2, "0")}</span>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-brand transition-all duration-500 group-hover:rotate-45 group-hover:bg-lilac">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </div>
      <p className="eyebrow relative mt-10 text-brand transition-colors duration-500 group-hover:text-white/80">{p.kicker}</p>
      <h3 className="relative mt-3 text-step-3 text-ink transition-colors duration-500 group-hover:text-white">{p.shortTitle}</h3>
      <p className="relative mt-4 text-[0.95rem] text-ink-soft transition-colors duration-500 group-hover:text-white/85">{p.summary}</p>
      <span className="relative mt-auto pt-10 text-sm font-semibold text-brand transition-colors duration-500 group-hover:text-white">View programme →</span>
    </Link>
  );
}
