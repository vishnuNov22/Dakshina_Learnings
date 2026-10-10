"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/** null while unknown (SSR / first paint), then true/false. */
export function useWebGLSupport(): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
      setOk(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

export function useMediaQuery(query: string, serverDefault = false): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverDefault,
  );
}

export const useReducedMotionPref = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useIsCompact = () => useMediaQuery("(max-width: 767px)");
export const useIsCoarse = () => useMediaQuery("(pointer: coarse)");

/** Rough device tier so mobile/low-memory devices get fewer particles and no shadows. */
export function useDeviceTier(): "low" | "mid" | "high" {
  const [tier, setTier] = useState<"low" | "mid" | "high">("mid");
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mem = nav.deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (mem <= 2 || cores <= 4) setTier("low");
    else if (small || mem <= 4) setTier("mid");
    else setTier("high");
  }, []);
  return tier;
}

/** True while the element is near the viewport — used to pause off-screen render loops. */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "200px"): boolean {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}
