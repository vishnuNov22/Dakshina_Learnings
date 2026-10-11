"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Instagram } from "lucide-react";
import { photos } from "@/data/media";
import { instagram } from "@/lib/contact";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** Photo that tilts in 3D towards the pointer, with a moving glare — used for the academy's own images. */
function TiltPhoto({ src, alt, width, height, sizes, priority = false, className }: { src: string; alt: string; width: number; height: number; sizes: string; priority?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 120, damping: 18 });
  const glare = useTransform([mx, my], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.35), transparent 45%)`);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1400 }}
      initial={reduce ? false : { opacity: 0, y: 60, rotateX: 12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[28px] bg-lilac shadow-[0_50px_100px_-40px_rgba(46,17,85,0.55)] ring-1 ring-line [transform-style:preserve-3d]"
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
      >
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} quality={90} className="block h-auto w-full" />
        {!reduce ? <motion.div aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} /> : null}
      </motion.div>
    </motion.div>
  );
}

/** The real Dakshina team — placed right after the hero. */
export function TeamSection() {
  return (
    <section aria-labelledby="team-title" className="relative overflow-hidden bg-white pb-[var(--section-y)] pt-[calc(var(--section-y)*0.8)]">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[50rem] w-[80rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.12),transparent)]" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-6 flex items-center justify-center gap-3 text-brand">
            <span aria-hidden className="h-px w-10 bg-current" />
            The Dakshina team
            <span aria-hidden className="h-px w-10 bg-current" />
          </p>
          <h2 id="team-title" className="text-step-4 text-ink">
            Create your future <span className="accent">with purpose.</span>
          </h2>
          <p className="mt-6 text-step-1 text-ink-soft">The mentors and faculty who walk the UPSC journey with every aspirant at Dakshina Learnings, Thiruvananthapuram.</p>
        </Reveal>
        <TiltPhoto {...photos.team} sizes="(min-width: 1200px) 1100px, 100vw" className="mx-auto mt-14 max-w-[1100px]" />
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/faculty" className={buttonClass("brand")}>
            Meet the mentors <ArrowRight size={17} aria-hidden />
          </Link>
          <Link href="/admissions" className={buttonClass("outline")}>
            Talk to the team
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Topper visit — real social proof, worded exactly as the academy's own poster. */
export function TopperSection() {
  return (
    <section aria-labelledby="topper-title" className="relative overflow-hidden bg-mist py-[var(--section-y)]">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
        <div className="relative min-w-0">
          <TiltPhoto {...photos.topper} sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="absolute -bottom-6 left-6 rounded-2xl bg-brand px-5 py-4 text-white shadow-[0_24px_50px_-20px_rgba(90,34,150,0.9)] sm:left-auto sm:right-8">
            <p className="text-[0.62rem] font-bold tracking-[0.22em] text-white/80">CIVIL SERVICES TOPPER</p>
            <p className="mt-1 font-serif text-2xl italic">Sonnet Jose</p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="eyebrow mb-6 flex items-center gap-3 text-brand">
            <span aria-hidden className="h-px w-10 bg-current" />
            At the academy
          </p>
          <h2 id="topper-title" className="text-step-4 text-ink">
            A topper, among <span className="accent">future toppers.</span>
          </h2>
          <p className="mt-7 text-step-1 text-ink-soft">
            Civil Services topper Sonnet Jose with the aspirants of Dakshina Learnings. Moments like these show students what their preparation is building towards, and what it takes to get there.
          </p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <a href={instagram.profile} target="_blank" rel="noopener noreferrer" className={buttonClass("brand")}>
              <Instagram size={17} aria-hidden /> More on Instagram
            </a>
            <Link href="/admissions" className={buttonClass("outline")}>
              Join the next batch <ArrowRight size={17} aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
