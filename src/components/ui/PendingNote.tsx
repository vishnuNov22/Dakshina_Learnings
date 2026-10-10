import type { ReactNode } from "react";
import clsx from "clsx";

/** Visible placeholder used wherever the academy still needs to confirm a detail. */
export function PendingNote({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em]",
        tone === "light" ? "bg-ink/[0.06] text-ink/60" : "bg-ivory/10 text-ivory/60",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
      {children}
    </p>
  );
}
