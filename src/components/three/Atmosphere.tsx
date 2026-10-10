"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { beamFragment, beamVertex, dustFragment, dustVertex } from "./shaders";

export type AtmosDrive = { beam: number; dust: number };

/** Volumetric morning light shaft from `from` to `to`. */
export function LightBeam({
  from,
  to,
  radiusTop = 0.25,
  radiusBottom = 1.6,
  color = "#ffd9a0",
  drive,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radiusTop?: number;
  radiusBottom?: number;
  color?: string;
  drive: MutableRefObject<AtmosDrive>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.clone().normalize());
    return { position: a.clone().add(b).multiplyScalar(0.5), quaternion: q, length: len };
  }, [from, to]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: beamVertex,
        fragmentShader: beamFragment,
        uniforms: { uIntensity: { value: 0 }, uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [color],
  );
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    const u = material.uniforms;
    if (u.uIntensity) u.uIntensity.value = drive.current.beam;
    if (u.uTime) u.uTime.value = state.clock.elapsedTime;
    if (mesh.current) {
      const s = 0.25 + 0.75 * Math.min(1, drive.current.beam * 1.4);
      mesh.current.scale.set(s, 1, s);
    }
  });

  return (
    <mesh ref={mesh} position={position} quaternion={quaternion} material={material} renderOrder={10}>
      <cylinderGeometry args={[radiusTop, radiusBottom, length, 48, 1, true]} />
    </mesh>
  );
}

/** Dust motes in a box volume; they brighten inside the beam. */
export function Dust({
  count,
  box = [8, 4, 5],
  center = [0, 1.6, 0],
  beamFrom,
  beamTo,
  drive,
  size = 3.2,
}: {
  count: number;
  box?: [number, number, number];
  center?: [number, number, number];
  beamFrom: [number, number, number];
  beamTo: [number, number, number];
  drive: MutableRefObject<AtmosDrive>;
  size?: number;
}) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    let s = 1234;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = center[0] + (rand() - 0.5) * box[0];
      pos[i * 3 + 1] = center[1] + (rand() - 0.5) * box[1];
      pos[i * 3 + 2] = center[2] + (rand() - 0.5) * box[2];
      seed[i] = rand();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [count, box, center]);

  const material = useMemo(() => {
    const o = new THREE.Vector3(...beamFrom);
    const d = new THREE.Vector3(...beamTo).sub(o).normalize();
    return new THREE.ShaderMaterial({
      vertexShader: dustVertex,
      fragmentShader: dustFragment,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: size },
        uOpacity: { value: 0 },
        uColor: { value: new THREE.Color("#ffe6bd") },
        uBeamOrigin: { value: o },
        uBeamDir: { value: d },
        uBeamRadius: { value: 2.2 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [beamFrom, beamTo, size]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    const u = material.uniforms;
    if (u.uTime) u.uTime.value = state.clock.elapsedTime;
    if (u.uOpacity) u.uOpacity.value = drive.current.dust;
  });

  return <points geometry={geometry} material={material} renderOrder={11} />;
}
