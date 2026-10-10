"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { Suspense, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { useNearViewport, useWebGLSupport } from "./hooks";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  camera?: CanvasProps["camera"];
  shadows?: boolean;
  maxDpr?: number;
  label: string;
};

/**
 * Shared WebGL wrapper:
 *  - renders `fallback` when WebGL is unavailable
 *  - pauses rendering when the canvas is off-screen
 *  - adapts device-pixel-ratio to measured performance
 *  - never causes horizontal overflow (absolute, clipped container)
 */
export function SceneCanvas({ children, fallback, className, camera, shadows = false, maxDpr = 1.75, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const support = useWebGLSupport();
  const near = useNearViewport(ref);
  const [dpr, setDpr] = useState(Math.min(maxDpr, 1.5));
  const [failed, setFailed] = useState(false);

  return (
    <div ref={ref} className={clsx("absolute inset-0 overflow-hidden", className)} role="img" aria-label={label}>
      {support === false || failed ? (
        fallback
      ) : support ? (
        <Canvas
          frameloop={near ? "always" : "never"}
          dpr={dpr}
          shadows={shadows}
          camera={camera}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setFailed(true);
            });
          }}
          style={{ position: "absolute", inset: 0 }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr((d) => Math.min(maxDpr, d + 0.25))}
            onDecline={() => setDpr((d) => Math.max(1, d - 0.25))}
            flipflops={3}
            onFallback={() => setDpr(1)}
          />
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
