"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { photos } from "@/data/media";

function CardFront() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-white shadow-[0_40px_80px_-30px_rgba(29,11,54,0.55)] ring-1 ring-line [backface-visibility:hidden]">
      <div className="flex items-center gap-3 bg-brand px-5 py-4 text-white">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white">
          <Image src="/images/logo-256.png" alt="" fill sizes="40px" className="object-contain" />
        </span>
        <span className="leading-none">
          <span className="block text-sm font-bold tracking-[0.12em]">DAKSHINA</span>
          <span className="mt-1 block text-[0.55rem] font-semibold tracking-[0.3em] text-white/75">LEARNINGS</span>
        </span>
      </div>
      <div className="relative mx-auto mt-6 aspect-[4/5] w-[52%] overflow-hidden rounded-2xl bg-lilac">
        <Image src={photos.portrait.src} alt="" fill sizes="200px" className="object-cover" style={{ objectPosition: photos.portrait.focus }} />
      </div>
      <div className="mt-5 text-center">
        <p className="font-serif text-[clamp(1.4rem,1rem+1.4vw,2rem)] text-ink">The Aspirant</p>
        <p className="mt-1 text-[0.62rem] font-bold tracking-[0.22em] text-brand">CIVIL SERVICES ASPIRANT</p>
      </div>
      <div className="absolute inset-x-6 bottom-5 flex items-center justify-between border-t border-line pt-3 text-[0.55rem] font-semibold tracking-[0.16em] text-ink-soft">
        <span>ID · DL-ASP-0001</span>
        <span>ILLUSTRATIVE</span>
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[22px] bg-[linear-gradient(150deg,#2e1155_0%,#5a2296_55%,#8448c0_100%)] text-white shadow-[0_40px_80px_-30px_rgba(29,11,54,0.7)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <div aria-hidden className="absolute inset-3 rounded-[16px] border border-white/30" />
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.22)_0%,transparent_35%)]" />
      <p className="relative mt-8 text-center text-[0.6rem] font-bold tracking-[0.3em] text-white/80">PUBLIC SERVICE · A SYMBOLIC FUTURE</p>
      <div className="relative mx-auto mt-6 aspect-[4/5] w-[46%] overflow-hidden rounded-2xl ring-2 ring-white/60">
        <Image src={photos.portrait.src} alt="" fill sizes="180px" className="object-cover grayscale-[20%]" style={{ objectPosition: photos.portrait.focus }} />
      </div>
      <p className="relative mx-auto mt-6 max-w-[85%] text-center font-serif text-[clamp(1.25rem,0.9rem+1.3vw,1.85rem)] leading-tight">The officer you are preparing to become</p>
      <p className="relative mt-3 text-center font-serif text-sm italic text-white/80">Service · Integrity · Judgement</p>
      <p className="absolute inset-x-0 bottom-5 text-center text-[0.52rem] font-semibold tracking-[0.18em] text-white/60">ILLUSTRATIVE · NOT AN OFFICIAL DOCUMENT</p>
    </div>
  );
}

export function IdentityTransform() {
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = wrap.current;
    if (!el || !card.current || !stage.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.8 } });
      tl.fromTo(card.current, { rotateX: 58, rotateZ: -10, y: "28vh", scale: 0.82 }, { rotateX: 0, rotateZ: 0, y: 0, scale: 1, ease: "power2.out", duration: 0.3 })
        .to(card.current, { rotateY: 180, ease: "power2.inOut", duration: 0.4 }, 0.32)
        .to(card.current, { scale: 1.04, duration: 0.2 }, 0.72)
        .fromTo("[data-officer-bg]", { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 0.5, ease: "none" }, 0.25)
        .fromTo("[data-copy-a]", { opacity: 1 }, { opacity: 0, duration: 0.12 }, 0.45)
        .fromTo("[data-copy-b]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.18 }, 0.62);
    }, stage);
    return () => ctx.revert();
  }, [reduce]);

  const copyA = (
    <div>
      <p className="eyebrow mb-5 text-brand">From aspirant to officer</p>
      <h2 className="text-step-4 text-ink">
        Who you are <span className="accent">today…</span>
      </h2>
      <p className="mt-4 max-w-md text-step-1 text-ink-soft lg:mt-6">Every officer once sat where you sit: with a book, a question and a long road ahead.</p>
    </div>
  );
  const copyB = (
    <div>
      <p className="eyebrow mb-5 text-white/80">From aspirant to officer</p>
      <h2 className="text-step-4 text-white">
        …the officer you are <span className="italic text-[#d9c4f3]">preparing to become.</span>
      </h2>
      <p className="mt-4 max-w-md text-step-1 text-white/85 lg:mt-6">Every great journey begins long before the destination.</p>
      <Link href="/admissions" className={buttonClass("white", "mt-5 lg:mt-8")}>
        Begin Your Preparation <ArrowRight size={17} aria-hidden />
      </Link>
      <p className="mt-5 hidden max-w-sm text-[0.7rem] leading-relaxed text-white/60 sm:block">A symbolic, fictional illustration — not an official document. No institute can guarantee selection.</p>
    </div>
  );

  if (reduce) {
    return (
      <section aria-labelledby="officer-title" className="relative overflow-hidden bg-brand-dark py-[var(--section-y)] text-white">
        <Image src={photos.indiaGateDusk.src} alt="" fill sizes="100vw" className="object-cover opacity-40" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div id="officer-title">{copyB}</div>
          <div className="relative mx-auto aspect-[54/86] w-[min(70vw,300px)]">
            <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateY(180deg)]">
              <CardFront />
              <CardBack />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="officer-title" className="relative bg-white">
      <div ref={wrap} className="relative h-[320svh]">
        <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
          <div data-officer-bg className="absolute inset-0 opacity-0">
            <Image src={photos.indiaGateDusk.src} alt="" fill sizes="100vw" className="object-cover" style={{ objectPosition: photos.indiaGateDusk.focus }} />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(100deg,rgba(46,17,85,0.92)_0%,rgba(90,34,150,0.7)_45%,rgba(108,54,174,0.35)_100%)]" />
          </div>
          <div className="container-x relative grid h-full grid-rows-[auto_1fr] items-center gap-4 pb-8 pt-[calc(var(--header-h)+1rem)] lg:grid-cols-2 lg:grid-rows-1 lg:gap-12 lg:py-0">
            {/* both copies share one grid cell, so the cell is as tall as the longer one */}
            <div className="grid items-center [grid-template-areas:'copy'] [&>*]:[grid-area:copy]">
              <div data-copy-a>{copyA}</div>
              <div data-copy-b id="officer-title" className="opacity-0">{copyB}</div>
            </div>
            <div className="flex h-full min-h-0 items-center justify-center [perspective:1800px]">
              <div ref={card} className="relative aspect-[54/86] h-[min(40svh,520px)] max-w-[78vw] sm:h-[min(50svh,520px)] [transform-style:preserve-3d] lg:h-[min(72svh,580px)]">
                <CardFront />
                <CardBack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
