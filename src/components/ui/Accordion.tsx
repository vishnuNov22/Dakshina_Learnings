import clsx from "clsx";

/** Native <details> accordion — accessible and works without JavaScript. */
export function Accordion({ items, tone = "light" }: { items: { q: string; a: string }[]; tone?: "light" | "dark" }) {
  return (
    <div className={clsx("divide-y border-y", tone === "light" ? "divide-ink/15 border-ink/15" : "divide-ivory/15 border-ivory/15")}>
      {items.map((it) => (
        <details key={it.q} className="group py-1">
          <summary className="tap flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-step-2">{it.q}</span>
            <span
              aria-hidden
              className={clsx(
                "mt-2 grid h-8 w-8 shrink-0 place-items-center rounded-full ring-1 transition-transform duration-300 group-open:rotate-45",
                tone === "light" ? "ring-ink/25" : "ring-ivory/30",
              )}
            >
              +
            </span>
          </summary>
          <p className={clsx("max-w-3xl pb-6 pr-12", tone === "light" ? "text-ink/75" : "text-ivory/70")}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}
