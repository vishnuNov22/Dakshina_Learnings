"use client";
import { useEffect, useState } from "react";
import { fontsReady } from "./textures";

/** Becomes true when brand fonts are available for canvas textures. */
export function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const t = setTimeout(() => alive && setReady(true), 2500); // never block the scene on fonts
    fontsReady().then(() => alive && setReady(true));
    return () => {
      alive = false;
      clearTimeout(t);
    };
  }, []);
  return ready;
}

/** Dispose textures/materials created imperatively when a component unmounts. */
export function disposeAll(items: Array<{ dispose: () => void } | null | undefined>) {
  for (const i of items) i?.dispose();
}
