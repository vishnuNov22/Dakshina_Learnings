"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { BookMesh } from "@/components/three/BookMesh";
import { books } from "@/data/books";

export type HeroDrive = { intro: number; scroll: number; px: number; py: number };

/** Composition: the hero book in front, five more orbiting at different depths. */
const LAYOUT: Array<{ p: [number, number, number]; r: [number, number, number]; s: number }> = [
  { p: [0.1, 0.05, 0.8], r: [0.05, -0.38, 0.04], s: 1.25 },
  { p: [-1.75, 0.95, -0.9], r: [0.15, 0.55, -0.12], s: 0.95 },
  { p: [1.85, 1.05, -0.6], r: [-0.1, -0.7, 0.16], s: 0.95 },
  { p: [1.65, -1.25, 0.1], r: [0.25, -0.25, -0.2], s: 0.85 },
  { p: [-1.6, -1.2, 0.2], r: [-0.18, 0.42, 0.22], s: 0.85 },
  { p: [0.05, 1.95, -1.9], r: [0.3, 0.2, -0.08], s: 0.8 },
];

const v = new THREE.Vector3();

function FlyingBook({ index, drive, compact }: { index: number; drive: MutableRefObject<HeroDrive>; compact: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const L = LAYOUT[index]!;
  const b = books[index % books.length]!;
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const { intro, scroll } = drive.current;
    // staggered entrance: each book rises in and settles with a spin
    const t = THREE.MathUtils.clamp(intro * 1.6 - index * 0.12, 0, 1);
    const e = 1 - Math.pow(1 - t, 3);
    // scroll: the constellation opens outwards and books turn towards the reader
    const spread = 1 + scroll * 0.55;
    v.set(L.p[0] * spread, L.p[1] * spread - (1 - e) * 4.5 - scroll * 0.6, L.p[2] + scroll * (index === 0 ? 1.6 : 0.4));
    g.position.lerp(v, 0.12);
    g.rotation.set(
      L.r[0] + (1 - e) * 1.2 - scroll * 0.25,
      L.r[1] + (1 - e) * (index % 2 ? 2.2 : -2.2) + scroll * (index === 0 ? 0.38 : 0.9) + Math.sin(state.clock.elapsedTime * 0.25 + index) * 0.04,
      L.r[2],
    );
    const s = L.s * (compact ? 0.82 : 1) * (0.6 + 0.4 * e);
    g.scale.setScalar(s);
  });
  return (
    <group ref={ref} position={[L.p[0], -5, L.p[2]]}>
      <Float speed={1.2 + index * 0.15} rotationIntensity={0.18} floatIntensity={0.45} floatingRange={[-0.08, 0.08]}>
        <BookMesh cover={b.cover} spine={b.spine} />
      </Float>
    </group>
  );
}

function Rig({ drive, compact }: { drive: MutableRefObject<HeroDrive>; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  useFrame(() => {
    const { px, py, scroll } = drive.current;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, px * 0.22, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -py * 0.12, 0.05);
    }
    // fit the constellation to the canvas aspect (narrow → step back)
    const aspect = size.width / Math.max(1, size.height);
    const z = (aspect < 0.9 ? 11.5 : aspect < 1.3 ? 10 : 9) - scroll * 1.2;
    camera.position.lerp(v.set(0, compact ? 0.2 : 0, z), 0.08);
    camera.lookAt(0, -0.15, 0);
  });
  return <group ref={group}>{LAYOUT.map((_, i) => <FlyingBook key={i} index={i} drive={drive} compact={compact} />)}</group>;
}

export default function HeroBooks({ drive, compact }: { drive: MutableRefObject<HeroDrive>; compact: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-6, 2, -2]} intensity={0.8} color="#b48ae6" />
      {/* procedural studio — no network; white softboxes + a purple rim for reflections on the glossy covers */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 4, 6]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[6, 0, 3]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 6, 1]} />
        <Lightformer form="rect" intensity={2.2} color="#8448c0" position={[-6, 1, 1]} rotation={[0, Math.PI / 2, 0]} scale={[5, 6, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#d9c4f3" position={[0, -4, 3]} scale={3} />
      </Environment>
      <Rig drive={drive} compact={compact} />
      <ContactShadows position={[0, -2.6, 0]} opacity={0.32} scale={14} blur={2.8} far={5} resolution={compact ? 256 : 512} color="#2e1155" />
    </>
  );
}
