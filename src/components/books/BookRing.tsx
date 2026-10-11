"use client";

import { useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { BookMesh } from "@/components/three/BookMesh";
import { books } from "@/data/books";

export type RingDrive = { progress: number };

const N = books.length;
const R = 2.6;
const tmp = new THREE.Vector3();

function RingBook({ index, ring }: { index: number; ring: MutableRefObject<number> }) {
  const ref = useRef<THREE.Group>(null);
  const b = books[index]!;
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const a = (index / N) * Math.PI * 2 + ring.current;
    // angle 0 = directly facing the camera
    const front = Math.cos(a); // 1 at front, -1 at back
    const k = THREE.MathUtils.smoothstep(front, 0.6, 1);
    tmp.set(Math.sin(a) * R, k * 0.15, Math.cos(a) * R - R + k * 0.9);
    g.position.lerp(tmp, 0.2);
    // books face outward, the front one turns square to the reader
    g.rotation.y = THREE.MathUtils.lerp(a, 0, k) + (1 - k) * 0.12;
    g.rotation.x = -0.04 * k;
    g.scale.setScalar(0.82 + k * 0.34);
  });
  return (
    <group ref={ref}>
      <BookMesh cover={b.cover} spine={b.spine} />
    </group>
  );
}

export default function BookRing({ drive }: { drive: MutableRefObject<RingDrive> }) {
  const ring = useRef(0);
  const { camera, size } = useThree();
  useFrame(() => {
    const target = -drive.current.progress * ((N - 1) / N) * Math.PI * 2;
    ring.current = THREE.MathUtils.lerp(ring.current, target, 0.09);
    const aspect = size.width / Math.max(1, size.height);
    camera.position.set(0, 0.55, aspect < 1 ? 8.4 : 6.6);
    camera.lookAt(0, 0.05, -0.4);
  });
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 6]} intensity={1.5} />
      <directionalLight position={[-5, 2, -3]} intensity={0.7} color="#b48ae6" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} color="#ffffff" position={[0, 3, 6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={2} color="#8448c0" position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[4, 6, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#ffffff" position={[6, 1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 6, 1]} />
      </Environment>
      {books.map((b, i) => (
        <RingBook key={b.id} index={i} ring={ring} />
      ))}
      <ContactShadows position={[0, -1.2, -1.2]} opacity={0.18} scale={18} blur={3.2} far={2.4} resolution={512} color="#2e1155" />
    </>
  );
}
