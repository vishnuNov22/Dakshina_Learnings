"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { useFontsReady } from "@/components/three/useFonts";
import { aspirantCardTexture, officerCardTexture, woodTexture } from "@/components/three/textures";

export type CardDrive = { p: number };

const CW = 0.86;
const CH = 1.36;
const ease = (t: number) => THREE.MathUtils.smootherstep(t, 0, 1);
const seg = (t: number, a: number, b: number) => THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);

function useLogo() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = "/images/logo-256.png";
  }, []);
  return img;
}

function Card({ drive }: { drive: MutableRefObject<CardDrive> }) {
  const logo = useLogo();
  const group = useRef<THREE.Group>(null);
  const front = useMemo(() => aspirantCardTexture(logo), [logo]);
  const back = useMemo(() => officerCardTexture(), []);
  const frontMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const backMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const edgeMat = useRef<THREE.MeshPhysicalMaterial>(null);
  const { size } = useThree();
  const gold = useMemo(() => new THREE.Color("#B79A62"), []);
  const paper = useMemo(() => new THREE.Color("#d9cfbd"), []);

  useEffect(() => () => front.dispose(), [front]);
  useEffect(() => () => back.dispose(), [back]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const p = drive.current.p;
    const lift = ease(seg(p, 0.05, 0.3));
    const spin = ease(seg(p, 0.25, 0.75));
    const settle = ease(seg(p, 0.75, 0.95));
    const portrait = size.width < size.height;
    // lying on the desk → lifted & facing camera → flipped to reveal the future side
    g.position.set(0, -0.62 + lift * 0.62 + Math.sin(state.clock.elapsedTime * 0.9) * 0.015 * lift, -0.2 + lift * 0.2);
    g.rotation.x = -Math.PI / 2 + lift * (Math.PI / 2 - 0.08) + settle * 0.08;
    g.rotation.y = spin * Math.PI + Math.sin(spin * Math.PI) * 0.25;
    g.rotation.z = (1 - lift) * 0.25 + Math.sin(spin * Math.PI) * -0.12;
    const s = portrait ? 0.92 : 1;
    g.scale.setScalar(s * (1 + lift * 0.05));
    // material transition: paper → lacquered card with gold edge
    const m = ease(seg(p, 0.45, 0.8));
    if (frontMat.current) frontMat.current.clearcoat = m * 0.6;
    if (backMat.current) {
      backMat.current.clearcoat = 0.2 + m * 0.8;
      backMat.current.metalness = 0.05 + m * 0.15;
    }
    if (edgeMat.current) {
      edgeMat.current.color.copy(paper).lerp(gold, m);
      edgeMat.current.metalness = m * 0.9;
    }
  });

  return (
    <group ref={group}>
      <RoundedBox args={[CW, CH, 0.016]} radius={0.04} smoothness={4} castShadow>
        <meshPhysicalMaterial ref={edgeMat} color="#d9cfbd" roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0, 0.0085]}>
        <planeGeometry args={[CW - 0.012, CH - 0.012]} />
        <meshPhysicalMaterial ref={frontMat} map={front} roughness={0.55} clearcoat={0} />
      </mesh>
      <mesh position={[0, 0, -0.0085]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CW - 0.012, CH - 0.012]} />
        <meshPhysicalMaterial ref={backMat} map={back} roughness={0.32} clearcoat={0.2} />
      </mesh>
    </group>
  );
}

function Stage({ drive }: { drive: MutableRefObject<CardDrive> }) {
  const wood = useMemo(() => woodTexture(), []);
  const desk = useRef<THREE.Mesh>(null);
  const deskMat = useRef<THREE.MeshStandardMaterial>(null);
  const warm = useRef<THREE.SpotLight>(null);
  const cool = useRef<THREE.DirectionalLight>(null);
  const bg = useRef<THREE.Color>(new THREE.Color("#0b1420"));
  const { scene, camera, size } = useThree();
  const from = useMemo(() => new THREE.Color("#0b1420"), []);
  const to = useMemo(() => new THREE.Color("#1a2d45"), []);

  useEffect(() => () => wood.dispose(), [wood]);

  useFrame(() => {
    const p = drive.current.p;
    const env = ease(seg(p, 0.3, 0.85));
    bg.current.copy(from).lerp(to, env);
    scene.background = bg.current;
    if (deskMat.current) deskMat.current.opacity = 1 - env;
    if (desk.current) desk.current.visible = env < 0.99;
    if (warm.current) warm.current.intensity = 22 * (1 - env * 0.6);
    if (cool.current) cool.current.intensity = 0.4 + env * 2.2;
    const cam = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(1, size.height);
    // keep the whole card (≈1.5 units tall incl. margin) in view on any screen
    const dist = 2.7;
    const fovH = THREE.MathUtils.radToDeg(2 * Math.atan(0.95 / dist));
    const fovW = THREE.MathUtils.radToDeg(2 * Math.atan(0.7 / (dist * aspect)));
    const fov = THREE.MathUtils.clamp(Math.max(fovH, fovW), 30, 80);
    if (Math.abs(cam.fov - fov) > 0.05) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    const approach = ease(seg(p, 0, 0.3));
    cam.position.set(0, 1.4 - approach * 1.25, dist + 0.9 - approach * 0.9);
    cam.lookAt(0, -0.35 + approach * 0.35, 0);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight ref={warm} position={[1.2, 3, 2]} angle={0.55} penumbra={0.9} color="#ffd9a6" intensity={22} castShadow />
      <directionalLight ref={cool} position={[-2, 2, 3]} color="#bcd0f0" intensity={0.4} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2.2} color="#fff1d6" position={[0, 2, 3]} scale={[3, 1, 1]} />
        <Lightformer form="ring" intensity={1.2} color="#B79A62" position={[-2, 0, 2]} scale={1.5} />
      </Environment>
      <mesh ref={desk} position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 5]} />
        <meshStandardMaterial ref={deskMat} map={wood} transparent roughness={0.6} />
      </mesh>
    </>
  );
}

export default function IdCardScene({ drive }: { drive: MutableRefObject<CardDrive> }) {
  const ready = useFontsReady();
  if (!ready) return null;
  return (
    <>
      <Stage drive={drive} />
      <Card drive={drive} />
    </>
  );
}
