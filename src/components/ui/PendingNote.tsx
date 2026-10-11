import type { ReactNode } from "react";
import clsx from "clsx";

/** Visible placeholder used wherever the academy still needs to confirm a detail. */
export function PendingNote({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={clsx("inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em]", tone === "light" ? "bg-mist text-brand-deep" : "bg-white/10 text-white/80", className)}>
      <span aria-hidden className={clsx("h-1.5 w-1.5 rounded-full", tone === "light" ? "bg-brand" : "bg-white")} />
      {children}
    </p>
  );
}
