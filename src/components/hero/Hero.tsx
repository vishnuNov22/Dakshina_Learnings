"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useDeviceTier, useIsCompact } from "@/components/three/hooks";
import { buttonClass } from "@/components/ui/Button";
import { ArtImage } from "@/components/ui/ArtImage";
import { media } from "@/data/media";
import type { HeroDrive } from "./HeroScene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const compact = useIsCompact();
  const tier = useDeviceTier();
  const drive = useRef<HeroDrive>({ light: 0, beam: 0, dust: 0, cam: 0, open: 0, pages: 0, scroll: 0, pointerX: 0, pointerY: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const d = drive.current;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-reveal-line] > span", el);
      const fades = gsap.utils.toArray<HTMLElement>("[data-reveal-fade]", el);

      if (reduce) {
        Object.assign(d, { light: 1, beam: 1, dust: 0.6, cam: 1, open: 1, pages: 2 });
        gsap.set(lines, { y: 0, animation: "none" });
        gsap.set(fades, { opacity: 1, animation: "none" });
        return;
      }

      // CSS failsafe is cancelled once GSAP owns the elements
      gsap.set(lines, { yPercent: 110, y: 0, animation: "none" });
      gsap.set(fades, { opacity: 0, y: 16, animation: "none" });

      const s = small ? 0.6 : 1; // shorter sequence on phones
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: 0.2 });
      tl.to(d, { beam: 1, duration: 1.4 * s, ease: "power1.inOut" }, 0)
        .to(d, { dust: 1, duration: 1.6 * s }, 0.5 * s)
        .to(d, { light: 1, duration: 1.6 * s, ease: "sine.inOut" }, 0.6 * s)
        .to(d, { cam: 1, duration: 2.6 * s, ease: "power3.inOut" }, 0.3 * s)
        .to(d, { open: 1, duration: 1.5 * s, ease: "power2.inOut" }, 1.9 * s)
        .to(d, { pages: 2, duration: 1.6 * s, ease: "power1.inOut" }, 2.9 * s)
        .to(fades[0] ?? {}, { opacity: 1, y: 0, duration: 0.8 }, 2.2 * s)
        .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.14, ease: "expo.out" }, 2.4 * s)
        .to(fades.slice(1), { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 3.0 * s);

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (st) => {
          d.scroll = st.progress;
        },
      });

      if (!small) gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      d.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      d.pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      ctx.revert();
    };
  }, []);

  const fallback = (
    <ArtImage media={media.studyDesk} sizes="100vw" priority className="absolute inset-0 h-full w-full" showIllustrativeLabel={false} />
  );

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[#0a121d] md:h-[100svh] md:min-h-[640px]"
    >
      {/* 3D stage: its own block on phones, full-bleed behind the copy from tablet up */}
      <div className="relative h-[54svh] min-h-[320px] md:absolute md:inset-0 md:h-auto">
        <SceneCanvas
          label="A study desk at dawn: a ray of morning light falls on a hardcover book that opens to handwritten notes and a study map."
          fallback={fallback}
          camera={{ position: [-1.2, 5.2, 9], fov: 34, near: 0.1, far: 60 }}
          shadows={tier !== "low" && !compact}
          maxDpr={compact ? 1.5 : 1.75}
        >
          <HeroScene drive={drive} compact={compact} tier={tier} />
        </SceneCanvas>
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy to-transparent md:hidden" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,18,29,0.92) 0%, rgba(10,18,29,0.7) 32%, rgba(10,18,29,0.05) 62%, transparent 100%), linear-gradient(0deg, rgba(16,28,44,1) 0%, rgba(16,28,44,0) 22%)",
          }}
        />
      </div>

      <div className="relative z-10 bg-navy md:absolute md:inset-0 md:flex md:items-center md:bg-transparent">
        <div data-hero-copy className="container-x pb-14 pt-2 md:pb-0 md:pt-[var(--header-h)]">
          <div className="max-w-[min(40rem,100%)] md:max-w-[min(36rem,52vw)] lg:max-w-[min(40rem,48vw)]">
            <p data-reveal-fade className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-gold">
              <span aria-hidden className="h-px w-8 bg-current opacity-60" />
              Dakshina Learnings <span aria-hidden>·</span> Civil Services Academy
            </p>
            <h1 id="hero-title" className="font-serif text-[clamp(2.6rem,9.5vw,6.4rem)] leading-[0.95] tracking-[-0.02em]">
              <span data-reveal-line><span>Every Officer</span></span>
              <span data-reveal-line><span>Begins With</span></span>
              <span data-reveal-line>
                <span>
                  <em className="text-gold-soft">A Question.</em>
                </span>
              </span>
            </h1>
            <p data-reveal-fade className="mt-7 max-w-[34rem] text-step-1 text-ivory/75">
              Build the knowledge, analytical thinking, and discipline required for the journey towards India&rsquo;s Civil Services.
            </p>
            <div data-reveal-fade className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <a href="#journey" className={buttonClass("gold")}>
                Explore the Journey <ArrowDown size={17} aria-hidden />
              </a>
              <Link href="/programmes" className={buttonClass("ghost")}>
                Explore Our Programmes <ArrowRight size={17} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden data-reveal-fade className="pointer-events-none absolute bottom-6 right-[var(--gutter)] z-10 hidden items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ivory/50 md:flex">
        Scroll to begin
        <span className="relative block h-10 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[dl-scroll_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
    </section>
  );
}
