"use client";

import { Component, useEffect, useMemo, type ReactNode } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

/** Next.js image endpoint = same-origin, so WebGL can sample remote covers without CORS issues. */
export const proxied = (url: string, w = 640) => `/_next/image?url=${encodeURIComponent(url)}&w=${w}&q=85`;

let pageEdge: THREE.CanvasTexture | null = null;
function pageEdgeTexture() {
  if (pageEdge) return pageEdge;
  const c = document.createElement("canvas");
  c.width = 32;
  c.height = 256;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fbfaf7";
  ctx.fillRect(0, 0, 32, 256);
  for (let y = 0; y < 256; y += 2) {
    ctx.fillStyle = `rgba(110,90,140,${y % 6 === 0 ? 0.16 : 0.07})`;
    ctx.fillRect(0, y, 32, 1);
  }
  pageEdge = new THREE.CanvasTexture(c);
  pageEdge.wrapS = pageEdge.wrapT = THREE.RepeatWrapping;
  pageEdge.repeat.set(1, 4);
  pageEdge.colorSpace = THREE.SRGBColorSpace;
  return pageEdge;
}

/**
 * A closed hardcover: cover boards that overhang a page block, a rounded spine,
 * glossy laminated front carrying the real cover photograph.
 * Local space: cover faces +Z, spine on the left (-X). Height along Y.
 */
class CoverBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

type BookProps = { cover: string; spine: string; width?: number; height?: number; thickness?: number; castShadow?: boolean };

/** Plain cloth-bound book used if a cover image can't be loaded. */
function PlainBook({ width = 1, height = 1.5, thickness = 0.2 }: BookProps) {
  return (
    <mesh>
      <boxGeometry args={[width, height, thickness]} />
      <meshPhysicalMaterial color="#6c36ae" roughness={0.5} clearcoat={0.4} />
    </mesh>
  );
}

/** Real-cover book; falls back to a plain binding if the cover fails to load. */
export function BookMesh(props: BookProps) {
  return (
    <CoverBoundary fallback={<PlainBook {...props} />}>
      <CoveredBook {...props} />
    </CoverBoundary>
  );
}

function CoveredBook({
  cover,
  spine,
  width = 1,
  height = 1.5,
  thickness = 0.2,
  castShadow = true,
}: BookProps) {
  const tex = useTexture(proxied(cover));
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
  }, [tex]);

  const board = 0.022;
  const over = 0.025;
  const mats = useMemo(() => {
    const spineMat = new THREE.MeshPhysicalMaterial({ color: spine, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.35 });
    const coverMat = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.38, clearcoat: 0.8, clearcoatRoughness: 0.2 });
    const pages = new THREE.MeshStandardMaterial({ map: pageEdgeTexture(), roughness: 0.92 });
    const plain = new THREE.MeshStandardMaterial({ color: "#f6f3fa", roughness: 0.9 });
    return { spineMat, coverMat, pages, plain };
  }, [tex, spine]);
  useEffect(
    () => () => {
      mats.spineMat.dispose();
      mats.coverMat.dispose();
      mats.plain.dispose();
    },
    [mats],
  );

  const pageW = width - board - over;
  const pageH = height - over * 2;
  const pageT = thickness - board * 2;
  // box face order: +x, -x, +y, -y, +z, -z
  const front = [mats.spineMat, mats.spineMat, mats.spineMat, mats.spineMat, mats.coverMat, mats.plain];
  const back = [mats.spineMat, mats.spineMat, mats.spineMat, mats.spineMat, mats.plain, mats.spineMat];
  const block = [mats.pages, mats.plain, mats.pages, mats.pages, mats.plain, mats.plain];

  return (
    <group>
      <mesh position={[0, 0, thickness / 2 - board / 2]} material={front} castShadow={castShadow}>
        <boxGeometry args={[width, height, board]} />
      </mesh>
      <mesh position={[0, 0, -thickness / 2 + board / 2]} material={back} castShadow={castShadow}>
        <boxGeometry args={[width, height, board]} />
      </mesh>
      {/* rounded spine: half-cylinder bulging towards -X */}
      <mesh position={[-width / 2, 0, 0]} material={mats.spineMat} castShadow={castShadow}>
        <cylinderGeometry args={[thickness / 2, thickness / 2, height, 24, 1, false, Math.PI, Math.PI]} />
      </mesh>
      <mesh position={[-width / 2 + board + pageW / 2, 0, 0]} material={block}>
        <boxGeometry args={[pageW, pageH, pageT]} />
      </mesh>
    </group>
  );
}
