"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { useReducedMotionPref } from "@/components/three/hooks";
import { buttonClass } from "@/components/ui/Button";
import type { CardDrive } from "./IdCardScene";

const IdCardScene = dynamic(() => import("./IdCardScene"), { ssr: false });

/** Static two-card presentation for reduced motion / no WebGL. */
function CardsFallback() {
  return (
    <div className="flex h-full items-center justify-center gap-4 px-6 sm:gap-8">
      <div className="aspect-[86/136] w-[min(38vw,200px)] rounded-xl bg-ivory p-3 text-center text-ink shadow-2xl">
        <div className="-mx-3 -mt-3 mb-3 rounded-t-xl bg-blue py-2 font-serif text-sm text-ivory">Dakshina</div>
        <div className="mx-auto aspect-[3/4] w-1/2 rounded-md bg-parchment" />
        <p className="mt-3 font-serif text-[clamp(0.8rem,2.6vw,1.2rem)]">THE ASPIRANT</p>
        <p className="font-mono text-[0.5rem] text-blue">CIVIL SERVICES ASPIRANT</p>
      </div>
      <ArrowRight className="shrink-0 text-gold" aria-hidden />
      <div className="aspect-[86/136] w-[min(38vw,200px)] rounded-xl bg-[linear-gradient(135deg,#0d1a2b,#1b2f4a)] p-3 text-center text-ivory shadow-2xl ring-2 ring-gold/70">
        <p className="font-mono text-[0.45rem] text-gold">PUBLIC SERVICE · SYMBOLIC</p>
        <div className="mx-auto mt-3 aspect-[3/4] w-1/2 rounded-md bg-[#24384f]" />
        <p className="mt-3 font-serif text-[clamp(0.6rem,2vw,0.95rem)] leading-tight">THE OFFICER YOU ARE PREPARING TO BECOME</p>
      </div>
    </div>
  );
}

export function IdentityTransform() {
  const reduce = useReducedMotionPref();
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const drive = useRef<CardDrive>({ p: 0 });

  useEffect(() => {
    if (reduce) {
      drive.current.p = 1;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    const el = wrap.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        drive.current.p = self.progress;
        stage.current?.style.setProperty("--p", self.progress.toFixed(4));
      },
    });
    return () => st.kill();
  }, [reduce]);

  return (
    <section aria-labelledby="officer-title" className="relative bg-[#0b1420] text-ivory">
      <div ref={wrap} className="relative" style={{ height: reduce ? "auto" : "320svh" }}>
        <div ref={stage} className={reduce ? "relative" : "sticky top-0 h-[100svh] overflow-hidden"}>
          {/* backdrop: study room fades into a formal campus-inspired colonnade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: "clamp(0, calc((var(--p, 1) - 0.35) * 2.5), 1)",
              background:
                "repeating-linear-gradient(90deg, rgba(229,215,188,0.05) 0 2px, transparent 2px 9%), radial-gradient(ellipse at 50% 30%, rgba(183,154,98,0.22), transparent 60%)",
            }}
          />
          <div className={reduce ? "relative h-[60svh]" : "absolute inset-x-0 top-0 h-[56%] md:inset-y-0 md:left-[38%] md:right-0 md:h-auto"}>
            {reduce ? (
              <CardsFallback />
            ) : (
              <SceneCanvas
                label="An aspirant identity card lifts from a study desk, turns over and becomes a symbolic card that reads: The officer you are preparing to become."
                fallback={<CardsFallback />}
                camera={{ position: [0, 1.4, 3.6], fov: 40 }}
                shadows
                maxDpr={1.75}
              >
                <IdCardScene drive={drive} />
              </SceneCanvas>
            )}
          </div>

          <div
            className={
              reduce
                ? "container-x pb-[var(--section-y)] pt-10"
                : "absolute inset-x-0 bottom-0 z-10 md:inset-y-0 md:right-auto md:flex md:w-[44%] md:items-center"
            }
          >
            <div className="px-[var(--gutter)] pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pb-0 md:pl-[max(var(--gutter),calc((100vw-var(--container))/2+var(--gutter)))]">
              <p className="eyebrow mb-4 text-gold" style={{ opacity: reduce ? 1 : "clamp(0, calc(1 - (var(--p, 0) - 0.55) * 6), 1)" }}>
                From aspirant to officer
              </p>
              <h2 id="officer-title" className="text-[clamp(1.9rem,1.2rem+3vw,4.2rem)] leading-[1.02]">
                <span className="block" style={{ opacity: reduce ? 1 : "clamp(0.15, calc(1 - (var(--p, 0) - 0.5) * 5), 1)" }}>
                  Who you are today…
                </span>
                <span className="block text-gold-soft" style={{ opacity: reduce ? 1 : "clamp(0, calc((var(--p, 0) - 0.62) * 5), 1)" }}>
                  <em>the officer you are preparing to become.</em>
                </span>
              </h2>
              <div style={{ opacity: reduce ? 1 : "clamp(0, calc((var(--p, 0) - 0.78) * 6), 1)" }}>
                <p className="mt-4 max-w-md text-ivory/70 md:mt-6">Every great journey begins long before the destination.</p>
                <Link href="/admissions" className={buttonClass("gold", "mt-5 md:mt-8")}>
                  Begin Your Preparation <ArrowRight size={17} aria-hidden />
                </Link>
                <p className="mt-4 hidden max-w-sm text-[0.7rem] sm:block leading-relaxed text-ivory/40">
                  A symbolic, fictional illustration — not an official document. No institute can guarantee selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
