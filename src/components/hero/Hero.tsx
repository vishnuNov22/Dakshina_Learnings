"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { SceneShell } from "@/components/three/SceneShell";
import { Book } from "@/components/books/Book";
import { books } from "@/data/books";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { HeroDrive } from "./HeroBooks";

const HeroBooks = dynamic(() => import("./HeroBooks"), { ssr: false });

const pillars = ["Activity-based learning", "Daily News Desk", "Prelims Hacker Program"];

/** Shown when WebGL isn't available: the same real covers as CSS-3D books. */
function StaticBooks() {
  return (
    <div className="flex h-full items-center justify-center gap-4 px-8">
      {books.slice(0, 3).map((b, i) => (
        <div key={b.id} className="w-[28%]" style={{ transform: `translateY(${i === 1 ? -24 : 0}px)`, ["--ry" as string]: `${(i - 1) * -22}deg` }}>
          <Book book={b} priority sizes="20vw" />
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const compact = useMediaQuery("(max-width: 1023px)");
  const drive = useRef<HeroDrive>({ intro: 0, scroll: 0, px: 0, py: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = drive.current;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line] > span", el);
      const fades = gsap.utils.toArray<HTMLElement>("[data-reveal-fade]", el);
      if (reduce) {
        d.intro = 1;
        gsap.set(lines, { yPercent: 0, animation: "none" });
        gsap.set(fades, { opacity: 1, animation: "none" });
        return;
      }
      gsap.set(lines, { yPercent: 110, animation: "none" });
      gsap.set(fades, { opacity: 0, y: 18, animation: "none" });
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: (window as Window & { __dlIntro?: boolean }).__dlIntro ? 1.35 : 0.2 })
        .to(d, { intro: 1, duration: 3.2, ease: "power2.out" }, 0)
        .to(fades[0] ?? {}, { opacity: 1, y: 0, duration: 1 }, 0.35)
        .to(lines, { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.5)
        .to(fades.slice(1), { opacity: 1, y: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" }, 1.15);

      ScrollTrigger.create({ trigger: el, start: "top top", end: "bottom top", scrub: true, onUpdate: (s) => (d.scroll = s.progress) });
      gsap.to("[data-hero-copy]", { yPercent: -10, opacity: 0, ease: "none", scrollTrigger: { trigger: el, start: "40% top", end: "bottom top", scrub: true } });
      gsap.to("[data-aurora]", { yPercent: 20, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    }, el);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      d.px = (e.clientX / window.innerWidth - 0.5) * 2;
      d.py = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white lg:min-h-[100svh]">
      {/* soft purple aurora on pure white */}
      <div data-aurora aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[10%] -top-[20%] h-[80vmax] w-[80vmax] animate-[dl-drift_22s_ease-in-out_infinite] rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.22),transparent_70%)]" />
        <div className="absolute -left-[20%] bottom-[-30%] h-[60vmax] w-[60vmax] animate-[dl-drift_28s_ease-in-out_infinite_reverse] rounded-full bg-[radial-gradient(closest-side,rgba(108,54,174,0.12),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(108,54,174,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(108,54,174,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      </div>

      <div className="container-x grid min-h-[inherit] items-center gap-2 pt-[var(--header-h)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-6">
        <div className="relative order-1 h-[46svh] min-h-[300px] lg:order-2 lg:h-[min(86svh,860px)]">
          <SceneShell
            className="absolute inset-0"
            label="Six standard UPSC books float in a bright studio and turn as you scroll."
            fallback={<StaticBooks />}
            maxDpr={compact ? 1.5 : 1.8}
          >
            <HeroBooks drive={drive} compact={compact} />
          </SceneShell>
        </div>

        <div data-hero-copy className="relative order-2 pb-16 lg:order-1 lg:pb-0">
          <p data-reveal-fade className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-brand">
            <span aria-hidden className="h-px w-10 bg-current" />
            Civil Services Academy · Thiruvananthapuram
          </p>
          <h1 id="hero-title" className="font-serif text-[clamp(2.8rem,1.4rem+5.4vw,6.6rem)] font-medium leading-[0.98] tracking-[-0.03em] text-ink">
            <span data-reveal-line><span>Every Officer</span></span>
            <span data-reveal-line><span>Begins With</span></span>
            <span data-reveal-line>
              <span>
                <em className="font-normal text-brand">A Question.</em>
              </span>
            </span>
          </h1>
          <p data-reveal-fade className="mt-8 max-w-[34rem] text-step-1 text-ink-soft">
            Build the knowledge, analytical thinking, and discipline required for the journey towards India&rsquo;s Civil Services.
          </p>
          <div data-reveal-fade className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a href="#journey" className={buttonClass("brand")}>
              Explore the Journey <ArrowDown size={17} aria-hidden />
            </a>
            <Link href="/programmes" className={buttonClass("outline")}>
              Explore Our Programmes <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
          <ul data-reveal-fade className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
            {pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-3 text-sm font-semibold text-ink">
                <span className="font-serif text-lg italic text-brand">0{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
