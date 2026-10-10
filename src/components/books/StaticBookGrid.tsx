import { books } from "@/data/books";
import { SubjectVisual } from "./SubjectVisual";

/** Non-animated presentation of the library — used for reduced motion and when WebGL is unavailable. */
export function StaticBookGrid() {
  return (
    <ul className="container-x grid gap-6 pb-[var(--section-y)] sm:grid-cols-2 lg:grid-cols-3">
      {books.map((b, i) => (
        <li key={b.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl bg-ivory/[0.04] ring-1 ring-ivory/10">
          <div className="flex items-stretch gap-5 p-6">
            <div
              className="relative aspect-[5/7] w-24 shrink-0 rounded-r-md rounded-l-sm p-3 shadow-[6px_8px_20px_-6px_rgba(0,0,0,0.6)]"
              style={{ background: b.colour, color: b.ink }}
            >
              <span aria-hidden className="absolute inset-y-0 left-0 w-2 bg-black/25" />
              <p className="font-mono text-[0.5rem] uppercase tracking-widest opacity-80">{b.subject}</p>
              <p className="mt-2 font-serif text-[0.85rem] leading-tight">{b.title}</p>
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.7rem] text-gold">{String(i + 1).padStart(2, "0")} · {b.subject}</p>
              <h3 className="mt-2 text-step-2">{b.title}</h3>
              <p className="mt-1 text-sm text-ivory/60">{b.author}</p>
            </div>
          </div>
          <div className="mt-auto border-t border-ivory/10 p-6">
            <SubjectVisual kind={b.visual} className="mb-4 h-24 w-full text-gold/70" />
            <ul className="space-y-1.5 text-sm text-ivory/75">
              {b.concepts.map((c) => (
                <li key={c} className="flex gap-2">
                  <span aria-hidden className="text-gold">—</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
