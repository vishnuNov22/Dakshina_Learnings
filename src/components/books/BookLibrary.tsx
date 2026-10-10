"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { books } from "@/data/books";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useReducedMotionPref, useWebGLSupport } from "@/components/three/hooks";
import { SubjectVisual } from "./SubjectVisual";
import { StaticBookGrid } from "./StaticBookGrid";
import type { LibraryDrive } from "./BookScene";

const BookScene = dynamic(() => import("./BookScene"), { ssr: false });

const N = books.length;

export function BookLibrary() {
  const reduce = useReducedMotionPref();
  const webgl = useWebGLSupport();
  const wrap = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const drive = useRef<LibraryDrive>({ index: 0, local: 0 });
  const [active, setActive] = useState(0);
  const animated = !reduce && webgl !== false;

  useEffect(() => {
    if (!animated) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = wrap.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const f = Math.min(self.progress * N, N - 0.0001);
        const index = Math.floor(f);
        const local = f - index;
        drive.current.index = index;
        drive.current.local = local;
        panel.current?.style.setProperty("--l", local.toFixed(4));
        panel.current?.style.setProperty("--draw", Math.min(1, Math.max(0, (local - 0.3) / 0.4)).toFixed(4));
        setActive((a) => (a === index ? a : index));
      },
    });
    return () => st.kill();
  }, [animated]);

  const jumpTo = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + ((i + 0.6) / N) * span, behavior: reduce ? "auto" : "smooth" });
  };

  const book = books[active] ?? books[0]!;

  return (
    <section aria-labelledby="library-title" className="relative bg-[#0b1420] text-ivory">
      <div className="container-x pb-12 pt-[var(--section-y)]">
        <SectionHeading
          id="library-title"
          eyebrow="The UPSC learning universe"
          title={
            <>
              Seven books. <em className="text-gold-soft">One way of thinking.</em>
            </>
          }
          lede="Scroll through resources aspirants commonly rely on. Each one opens to the ideas that matter — and to how they connect."
        />
        <p className="mt-6 max-w-2xl text-sm text-ivory/45">
          Illustrative references. Covers shown are original designs, not publisher artwork; titles belong to their publishers. Always use the latest editions, and ask the academy for its own reading list.
        </p>
      </div>

      {!animated ? (
        <StaticBookGrid />
      ) : (
        <div ref={wrap} className="relative" style={{ height: `${N * 115}svh` }}>
          <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden md:grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <div className="relative h-[46%] min-h-0 shrink-0 md:h-full">
              <SceneCanvas
                label={`3D library: ${book.title} by ${book.author} opens to reveal key concepts.`}
                fallback={null}
                camera={{ position: [0, 0.35, 3.4], fov: 36, near: 0.1, far: 30 }}
                shadows
                maxDpr={1.6}
              >
                <BookScene drive={drive} />
              </SceneCanvas>
              <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1420] to-transparent md:hidden" />
            </div>

            <div
              ref={panel}
              className="relative flex min-h-0 flex-1 flex-col justify-center px-[var(--gutter)] pb-6 pt-2 md:py-[calc(var(--header-h)+1rem)] md:pl-4 md:pr-[var(--gutter)]"
              aria-live="polite"
            >
              <div key={book.id} className="max-w-xl animate-[dl-in_0.6s_var(--ease-cinema)_both]">
                <p className="font-mono text-[0.72rem] tracking-[0.16em] text-gold">
                  {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {book.subject.toUpperCase()}
                </p>
                <h3 className="mt-3 text-[clamp(1.6rem,1.1rem+2.4vw,3.2rem)] leading-[1.02]">{book.title}</h3>
                <p className="mt-2 text-sm text-ivory/60">
                  {book.author} <span className="text-ivory/30">·</span> {book.publisherNote}
                </p>
                <p className="mt-4 font-hand text-[clamp(1.3rem,1rem+1vw,1.8rem)] leading-snug text-gold-soft">&ldquo;{book.annotation}&rdquo;</p>
                <ul className="mt-4 space-y-1.5 text-[0.95rem] text-ivory/80 md:mt-6 md:space-y-2.5">
                  {book.concepts.map((c, i) => (
                    <li
                      key={c}
                      className="flex gap-3 border-b border-ivory/10 pb-1.5 md:pb-2.5"
                      style={{ opacity: `clamp(0.25, calc((var(--l, 1) - ${0.32 + i * 0.09}) * 8), 1)` }}
                    >
                      <span aria-hidden className="font-mono text-xs text-gold/80">{String(i + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">{c}</span>
                    </li>
                  ))}
                </ul>
                <SubjectVisual kind={book.visual} className="mt-6 hidden h-28 w-full max-w-sm text-gold/70 md:block" />
              </div>

              <nav aria-label="Jump to a book" className="mt-5 flex flex-wrap gap-1.5 md:mt-8">
                {books.map((b, i) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => jumpTo(i)}
                    aria-label={`${b.subject}: ${b.title}`}
                    aria-current={i === active ? "step" : undefined}
                    className={clsx(
                      "tap h-2.5 rounded-full transition-all duration-500 md:h-3",
                      i === active ? "w-10 bg-gold" : "w-2.5 bg-ivory/25 hover:bg-ivory/50 md:w-3",
                    )}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <details className="container-x pb-[var(--section-y)] pt-6 text-ivory/70">
        <summary className="tap cursor-pointer font-mono text-xs uppercase tracking-[0.16em] text-gold">See every resource at a glance</summary>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <li key={b.id} className="rounded-xl p-5 ring-1 ring-ivory/10">
              <p className="font-mono text-[0.68rem] text-gold">{b.subject}</p>
              <p className="mt-1 font-serif text-step-1 text-ivory">{b.title}</p>
              <p className="text-sm">{b.author}</p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
