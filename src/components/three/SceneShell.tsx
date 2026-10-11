"use client";
import type React from "react";

import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

function useWebGL() {
  const [ok, setOk] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setOk(Boolean(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}

function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(Boolean(e?.isIntersecting)), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return near;
}

/**
 * WebGL stage: transparent canvas, adaptive pixel ratio, paused when off-screen,
 * and a non-WebGL fallback so content never depends on 3D.
 */
export function SceneShell({
  children,
  fallback,
  className,
  label,
  fov = 30,
  position = [0, 0, 9] as [number, number, number],
  maxDpr = 1.8,
}: {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  label: string;
  fov?: number;
  position?: [number, number, number];
  maxDpr?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const webgl = useWebGL();
  const near = useNearViewport(ref);
  const [dpr, setDpr] = useState(1.5);
  const [lost, setLost] = useState(false);
  return (
    <div ref={ref} role="img" aria-label={label} className={clsx("relative", className)}>
      {webgl === false || lost ? (
        fallback
      ) : webgl ? (
        <Canvas
          frameloop={near ? "always" : "never"}
          dpr={[1, Math.min(dpr, maxDpr)]}
          camera={{ fov, position, near: 0.1, far: 60 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setLost(true);
            });
          }}
          style={{ position: "absolute", inset: 0 }}
        >
          <PerformanceMonitor onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.2))} onDecline={() => setDpr((d) => Math.max(1, d - 0.25))} />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
