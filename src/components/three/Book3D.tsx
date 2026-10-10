"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pageEdgeTexture } from "./textures";

export type BookDrive = {
  /** 0 closed → 1 cover fully open */
  open: number;
  /** 0 → pages.length : how many pages have turned (fractional = mid-turn) */
  pages: number;
};

type Props = {
  width?: number;
  height?: number;
  thickness?: number;
  colour: string;
  cover: THREE.Texture | null;
  spine: THREE.Texture | null;
  insideCover: THREE.Texture | null;
  rightPage: THREE.Texture | null;
  /** one entry per turning page: [front (right side), back (left side)] */
  pageTextures: Array<[THREE.Texture | null, THREE.Texture | null]>;
  drive: MutableRefObject<BookDrive>;
  castShadow?: boolean;
  segments?: number;
};

const COVER = 0.018;

/**
 * Procedural hardcover book. Local space: spine on the left edge (x = 0), cover facing +Z.
 * The front cover hinges at the spine; inner pages curl as they turn (CPU vertex bend —
 * a handful of pages, so it stays cheap and avoids custom shader maintenance).
 */
export function Book3D({
  width = 1,
  height = 1.38,
  thickness = 0.16,
  colour,
  cover,
  spine,
  insideCover,
  rightPage,
  pageTextures,
  drive,
  castShadow = false,
  segments = 18,
}: Props) {
  const frontPivot = useRef<THREE.Group>(null);
  const pageGeos = useMemo(
    () => pageTextures.map(() => new THREE.PlaneGeometry(width * 0.965, height * 0.955, segments, 1)),
    [pageTextures, width, height, segments],
  );
  const edge = useMemo(() => pageEdgeTexture(), []);

  const mats = useMemo(() => {
    const cloth = new THREE.MeshStandardMaterial({ color: colour, roughness: 0.72, metalness: 0.02 });
    const coverFront = new THREE.MeshStandardMaterial({ map: cover, roughness: 0.6, metalness: 0.02, color: cover ? "#ffffff" : colour });
    const inside = new THREE.MeshStandardMaterial({ map: insideCover, roughness: 0.9, color: insideCover ? "#ffffff" : "#efe7d6" });
    const spineMat = new THREE.MeshStandardMaterial({ map: spine, roughness: 0.65, color: spine ? "#ffffff" : colour });
    const edgeMat = new THREE.MeshStandardMaterial({ map: edge, roughness: 0.95 });
    const pageTop = new THREE.MeshStandardMaterial({ map: rightPage, roughness: 0.92, color: rightPage ? "#ffffff" : "#f2ead8" });
    const pageMats = pageTextures.map(([front, back]) => [
      new THREE.MeshStandardMaterial({ map: front, roughness: 0.92, side: THREE.FrontSide, color: front ? "#ffffff" : "#f2ead8" }),
      new THREE.MeshStandardMaterial({ map: back, roughness: 0.92, side: THREE.BackSide, color: back ? "#ffffff" : "#f2ead8" }),
    ] as const);
    return { cloth, coverFront, inside, spineMat, edgeMat, pageTop, pageMats };
  }, [colour, cover, insideCover, spine, edge, rightPage, pageTextures]);

  useEffect(
    () => () => {
      Object.values(mats).forEach((m) => {
        if (Array.isArray(m)) m.forEach((pair) => pair.forEach((x) => x.dispose()));
        else (m as THREE.Material).dispose();
      });
      pageGeos.forEach((g) => g.dispose());
      edge.dispose();
    },
    [mats, pageGeos, edge],
  );

  const blockT = thickness - COVER * 2;
  const pageZ = thickness / 2 - COVER - 0.002;

  // Box face order: +x, -x, +y, -y, +z, -z
  const backCoverMats = [mats.cloth, mats.cloth, mats.cloth, mats.cloth, mats.inside, mats.cloth];
  const frontCoverMats = [mats.cloth, mats.cloth, mats.cloth, mats.cloth, mats.coverFront, mats.inside];
  const blockMats = [mats.edgeMat, mats.edgeMat, mats.edgeMat, mats.edgeMat, mats.pageTop, mats.edgeMat];

  const pageMeshes = useRef<THREE.Group[]>([]);

  useFrame(() => {
    const { open, pages } = drive.current;
    if (frontPivot.current) {
      const e = THREE.MathUtils.smootherstep(open, 0, 1);
      frontPivot.current.rotation.y = -Math.PI * 0.985 * e;
      frontPivot.current.position.z = Math.sin(e * Math.PI) * 0.02;
    }
    // Page curl
    const w = width * 0.965;
    pageGeos.forEach((geo, i) => {
      const local = THREE.MathUtils.clamp(pages - i, 0, 1); // page i = i-th page to turn (top of stack first)
      const visible = open > 0.6;
      const grp = pageMeshes.current[i];
      if (grp) grp.visible = visible;
      if (!visible) return;
      const p = THREE.MathUtils.smootherstep(local, 0, 1);
      const base = -Math.PI * 0.975 * p - i * 0.004;
      const curl = Math.sin(Math.PI * p) * 0.9;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const cols = segments + 1;
      const n = pageGeos.length;
      // top page turns first; once past halfway it lands on top of the left-hand stack
      const stack = (p < 0.5 ? n - 1 - i : i) * 0.0015;
      const ds = w / segments;
      let x = 0, z = 0;
      for (let s = 0; s <= segments; s++) {
        const u = s / segments;
        if (s > 0) {
          const phi = base + curl * (u - 0.5 / segments);
          x += Math.cos(phi) * ds;
          z -= Math.sin(phi) * ds;
        }
        for (let row = 0; row < 2; row++) {
          const idx = row * cols + s;
          pos.setX(idx, x);
          pos.setZ(idx, z + stack);
        }
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();
    });
  });

  return (
    <group>
      {/* spine */}
      <mesh position={[-COVER / 2, 0, 0]} material={mats.spineMat} castShadow={castShadow}>
        <boxGeometry args={[COVER, height, thickness]} />
      </mesh>
      {/* back cover */}
      <mesh position={[width / 2, 0, -thickness / 2 + COVER / 2]} material={backCoverMats} castShadow={castShadow} receiveShadow>
        <boxGeometry args={[width, height, COVER]} />
      </mesh>
      {/* page block */}
      <mesh position={[width * 0.49, 0, 0]} material={blockMats} receiveShadow>
        <boxGeometry args={[width * 0.965, height * 0.955, blockT]} />
      </mesh>
      {/* turning pages, pivoting at the spine */}
      {pageGeos.map((geo, i) => (
        <group
          key={i}
          position={[0.004, 0, pageZ + 0.001]}
          ref={(g) => {
            if (g) pageMeshes.current[i] = g;
          }}
        >
          <mesh geometry={geo} material={mats.pageMats[i]?.[0]} castShadow={castShadow} />
          <mesh geometry={geo} material={mats.pageMats[i]?.[1]} />
        </group>
      ))}
      {/* front cover, hinged at the spine */}
      <group ref={frontPivot} position={[0, 0, thickness / 2 - COVER / 2]}>
        <mesh position={[width / 2, 0, 0]} material={frontCoverMats} castShadow={castShadow}>
          <boxGeometry args={[width, height, COVER]} />
        </mesh>
      </group>
    </group>
  );
}
