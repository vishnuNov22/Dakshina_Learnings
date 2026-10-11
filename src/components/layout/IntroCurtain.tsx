"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Branded opening curtain — once per session, skipped for reduced motion. Never blocks content for more than ~1.6s. */
export function IntroCurtain() {
  const [phase, setPhase] = useState<"hidden" | "show" | "leave">("hidden");
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("dl-intro") === "1";
      sessionStorage.setItem("dl-intro", "1");
    } catch {
      /* storage unavailable: just play it */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    (window as Window & { __dlIntro?: boolean }).__dlIntro = true; // lets the hero delay its entrance
    setPhase("show");
    const t1 = setTimeout(() => setPhase("leave"), 1150);
    const t2 = setTimeout(() => setPhase("hidden"), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  if (phase === "hidden") return null;
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] grid place-items-center bg-brand transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: phase === "leave" ? "translateY(-100%)" : "none" }}
    >
      <div className="flex flex-col items-center gap-5 animate-[dl-in_0.8s_var(--ease-cinema)_both]">
        <span className="relative h-24 w-24 overflow-hidden rounded-full bg-white shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
          <Image src="/images/logo-256.png" alt="" fill sizes="96px" className="object-contain" priority />
        </span>
        <span className="font-sans text-sm font-bold tracking-[0.5em] text-white">DAKSHINA</span>
        <span className="h-px w-28 overflow-hidden bg-white/25">
          <span className="block h-full w-full origin-left animate-[dl-bar_1s_ease-in-out_both] bg-white" />
        </span>
      </div>
    </div>
  );
}
