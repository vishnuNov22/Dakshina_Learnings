import clsx from "clsx";

/** Native <details> accordion — accessible and works without JavaScript. */
export function Accordion({ items, tone = "light" }: { items: { q: string; a: string }[]; tone?: "light" | "dark" }) {
  return (
    <div className={clsx("divide-y border-y", tone === "light" ? "divide-line border-line" : "divide-white/15 border-white/15")}>
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className="tap flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className={clsx("font-serif text-step-2", tone === "light" ? "text-ink" : "text-white")}>{it.q}</span>
            <span
              aria-hidden
              className={clsx(
                "mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg transition-[transform,background-color,color] duration-500 group-open:rotate-45",
                tone === "light" ? "bg-mist text-brand group-open:bg-brand group-open:text-white" : "bg-white/10 text-white",
              )}
            >
              +
            </span>
          </summary>
          <p className={clsx("max-w-3xl pb-7 pr-14", tone === "light" ? "text-ink-soft" : "text-white/75")}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
