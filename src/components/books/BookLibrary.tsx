"use client";
import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { books } from "@/data/books";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Book } from "./Book";
import { SceneShell } from "@/components/three/SceneShell";
import type { RingDrive } from "./BookRing";
import dynamic from "next/dynamic";

const BookRing = dynamic(() => import("./BookRing"), { ssr: false });

const N = books.length;

function Detail({ index }: { index: number }) {
  const b = books[index] ?? books[0]!;
  return (
    <div key={b.id} className="animate-[dl-in_0.7s_var(--ease-cinema)_both]">
      <p className="eyebrow text-brand">
        {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} · {b.subject}
      </p>
      <h3 className="mt-3 text-[clamp(1.5rem,1.1rem+2.2vw,3.4rem)] leading-[1.04] text-ink lg:mt-4">{b.title}</h3>
      <p className="mt-2 text-ink-soft">
        {b.author} <span className="text-brand">·</span> {b.publisher}
      </p>
      <p className="mt-6 hidden border-l-2 border-brand pl-5 font-serif text-step-2 italic text-brand-deep sm:block">&ldquo;{b.note}&rdquo;</p>
      <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:mt-7 sm:gap-x-6 sm:gap-y-3">
        {b.concepts.map((c, i) => (
          <li key={c} className="flex gap-2.5 text-[0.85rem] leading-snug text-ink sm:gap-3 sm:text-[0.95rem]">
            <span className="mt-[0.15em] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mist text-[0.7rem] font-bold text-brand">{i + 1}</span>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** WebGL ring of real books. Scrolling turns the ring; the front book swings forward. */
function RingShelf() {
  const wrap = useRef<HTMLDivElement>(null);
  const drive = useRef<RingDrive>({ progress: 0 });
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = wrap.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (s) => {
        drive.current.progress = s.progress;
        const n = Math.round(s.progress * (N - 1));
        setActive((a) => (a === n ? a : n));
      },
    });
    return () => st.kill();
  }, []);

  const jumpTo = (i: number) => {
    const el = wrap.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (N - 1)) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <div ref={wrap} className="relative" style={{ height: `${N * 75 + 40}svh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-[var(--header-h)] lg:flex-row lg:items-center lg:pt-0">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.16),transparent)] lg:left-[68%]" />
        <div className="relative order-1 h-[50%] min-h-0 shrink-0 lg:order-2 lg:h-full lg:flex-1">
          <SceneShell className="absolute inset-0" label={`3D carousel of UPSC books; now showing ${books[active]?.title ?? ""}`} fallback={null} fov={32} position={[0, 0.55, 6.6]}>
            <BookRing drive={drive} />
          </SceneShell>
        </div>
        <div className="relative order-2 min-h-0 flex-1 overflow-hidden px-[var(--gutter)] lg:order-1 lg:w-[44%] lg:flex-none lg:pl-[max(var(--gutter),calc((100vw-var(--container))/2+var(--gutter)))] lg:pr-6">
          <Detail index={active} />
          <nav aria-label="Choose a book" className="mt-6 hidden flex-wrap gap-2 sm:flex lg:mt-10">
            {books.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => jumpTo(i)}
                aria-current={i === active ? "true" : undefined}
                className={clsx("tap rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-300", i === active ? "bg-brand text-white" : "bg-mist text-brand-deep hover:bg-lilac")}
              >
                {b.subject}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

/** Phones & tablets: a swipeable shelf with snap points; the centred book faces forward. */
function SwipeShelf() {
  const scroller = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);
  return (
    <div>
      <ul ref={scroller} className="flex snap-x snap-mandatory gap-2 overflow-x-auto px-[18vw] pb-12 pt-6 [scrollbar-width:none] sm:px-[30vw]" aria-label="Books — swipe to browse">
        {books.map((b, i) => (
          <li key={b.id} data-index={i} className="w-[64vw] shrink-0 snap-center px-[5vw] sm:w-[40vw]">
            <div style={{ "--ry": i === active ? "-8deg" : i < active ? "38deg" : "-38deg" } as React.CSSProperties} className={clsx("transition-[opacity,transform] duration-700", i === active ? "scale-100 opacity-100" : "scale-[0.84] opacity-60")}>
              <Book book={b} priority={i === 0} sizes="60vw" />
            </div>
          </li>
        ))}
      </ul>
      <div className="container-x">
        <div className="mb-6 flex justify-center gap-1.5" aria-hidden>
          {books.map((b, i) => (
            <span key={b.id} className={clsx("h-1.5 rounded-full transition-all duration-500", i === active ? "w-8 bg-brand" : "w-1.5 bg-lilac")} />
          ))}
        </div>
        <Detail index={active} />
      </div>
    </div>
  );
}

export function BookLibrary() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <section aria-labelledby="library-title" className="relative overflow-x-clip bg-white">
      <div className="container-x pt-[var(--section-y)]">
        <SectionHeading
          id="library-title"
          eyebrow="The aspirant's bookshelf"
          title={
            <>
              The books every aspirant knows. <span className="accent">Read the way toppers read them.</span>
            </>
          }
          lede="From Laxmikanth to Spectrum, these are the standard references of UPSC preparation. At Dakshina we teach you how to read them: for concepts, connections and answers."
        />
      </div>
      {!reduce ? <RingShelf /> : <div className="pt-6"><SwipeShelf /></div>}
      <p className="container-x pb-[var(--section-y)] pt-10 text-xs text-ink-soft">
        Covers via Open Library, © their respective publishers, shown to identify commonly used titles. Always use the latest editions and ask the academy for its recommended list.
      </p>
    </section>
  );
}
