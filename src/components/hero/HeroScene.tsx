"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Book3D, type BookDrive } from "@/components/three/Book3D";
import { Dust, LightBeam, type AtmosDrive } from "@/components/three/Atmosphere";
import { useFontsReady } from "@/components/three/useFonts";
import {
  PALETTE,
  bookCoverTexture,
  bookSpineTexture,
  mapTexture,
  newspaperTexture,
  notesTexture,
  ruledPageTexture,
  windowGlowTexture,
  woodTexture,
} from "@/components/three/textures";
import { books } from "@/data/books";

export type HeroDrive = {
  light: number; // 0..1 key/ambient light
  beam: number;
  dust: number;
  cam: number; // 0..1 intro dolly
  open: number;
  pages: number;
  scroll: number; // 0..1 hero scrolled away
  pointerX: number;
  pointerY: number;
};

const BEAM_FROM: [number, number, number] = [-5.2, 5.4, -3.2];
const BEAM_TO: [number, number, number] = [0.4, 0, 0.3];
const DUST_BOX: [number, number, number] = [9, 4.5, 6];
const DUST_CENTER: [number, number, number] = [-0.5, 2, -0.2];

function mirrorX(t: THREE.Texture) {
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.x = -1;
  t.offset.x = 1;
  t.needsUpdate = true;
  return t;
}

const tmpV = new THREE.Vector3();
const tmpT = new THREE.Vector3();

function CameraRig({ drive, compact }: { drive: MutableRefObject<HeroDrive>; compact: boolean }) {
  const { camera, size } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((_, dt) => {
    const d = drive.current;
    const aspect = size.width / Math.max(1, size.height);
    const portrait = aspect < 1;
    const e = THREE.MathUtils.smootherstep(d.cam, 0, 1);
    // Start wide and high in the dark room → settle close over the open book.
    const far = portrait ? new THREE.Vector3(0.4, 7.5, 9.5) : new THREE.Vector3(-1.2, 5.2, 9);
    const near = portrait ? new THREE.Vector3(0.55, 4.6, 4.4) : new THREE.Vector3(-0.2, 3.1, 4.4);
    tmpV.copy(far).lerp(near, e);
    // scroll: rise and pull back slightly as the visitor leaves the hero
    tmpV.y += d.scroll * 1.4;
    tmpV.z += d.scroll * 1.2;
    // gentle pointer parallax (desktop only)
    if (!compact) {
      tmpV.x += d.pointerX * 0.35;
      tmpV.y += d.pointerY * 0.2;
    }
    // On wide screens the subject sits right of centre to leave room for the headline.
    const offsetX = portrait ? 0 : THREE.MathUtils.clamp((aspect - 1) * 1.3, 0, 1.3);
    tmpT.set(0.05 - offsetX, 0.05 - d.scroll * 0.3, 0.35);
    const k = 1 - Math.exp(-dt * 6);
    camera.position.lerp(tmpV, k);
    target.current.lerp(tmpT, k);
    camera.lookAt(target.current);
    // keep the full desk in frame on narrow viewports
    const cam = camera as THREE.PerspectiveCamera;
    const fov = portrait ? 46 : 34;
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

function Lamp({ drive }: { drive: MutableRefObject<HeroDrive> }) {
  const light = useRef<THREE.PointLight>(null);
  const bulb = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    const l = drive.current.light;
    if (light.current) light.current.intensity = 6 * l;
    if (bulb.current) bulb.current.emissiveIntensity = 0.4 + 3 * l;
  });
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2b2b2b", metalness: 0.85, roughness: 0.32 }), []);
  useEffect(() => () => metal.dispose(), [metal]);
  return (
    <group position={[2.35, 0, -1.05]} rotation={[0, -0.6, 0]}>
      <mesh material={metal} position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.36, 0.08, 40]} />
      </mesh>
      <mesh material={metal} position={[0.05, 0.85, 0]} rotation={[0, 0, -0.12]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.7, 12]} />
      </mesh>
      <mesh material={metal} position={[-0.32, 1.72, 0]} rotation={[0, 0, 1.05]} castShadow>
        <cylinderGeometry args={[0.022, 0.022, 0.95, 12]} />
      </mesh>
      <group position={[-0.78, 1.95, 0]} rotation={[0, 0, 0.75]}>
        <mesh castShadow>
          <coneGeometry args={[0.34, 0.5, 40, 1, true]} />
          <meshStandardMaterial color={PALETTE.blue} metalness={0.5} roughness={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.12, 0]}>
          <sphereGeometry args={[0.09, 20, 20]} />
          <meshStandardMaterial ref={bulb} color="#fff3d6" emissive="#ffcf8a" emissiveIntensity={0.4} />
        </mesh>
        <pointLight ref={light} position={[0, -0.3, 0]} color="#ffc27a" intensity={0} distance={6} decay={2} />
      </group>
    </group>
  );
}

function Pen() {
  return (
    <group position={[-0.05, 0.035, 1.25]} rotation={[0, 0.9, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.95, 20]} />
        <meshStandardMaterial color="#141414" metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <coneGeometry args={[0.03, 0.1, 20]} />
        <meshStandardMaterial color={PALETTE.gold} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.18, 20]} />
        <meshStandardMaterial color={PALETTE.gold} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function SceneContents({ drive, compact, tier }: { drive: MutableRefObject<HeroDrive>; compact: boolean; tier: "low" | "mid" | "high" }) {
  const key = useRef<THREE.DirectionalLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const glow = useRef<THREE.MeshBasicMaterial>(null);
  const bookDrive = useRef<BookDrive>({ open: 0, pages: 0 });
  const atmos = useRef<AtmosDrive>({ beam: 0, dust: 0 });

  const tex = useMemo(() => {
    const polity = books[0]!;
    return {
      wood: woodTexture(),
      glow: windowGlowTexture(),
      paper: newspaperTexture(),
      cover: bookCoverTexture({ ...polity, title: "Notes for the Journey", author: "Dakshina Learnings", subject: "Study Journal", colour: "#244C76", ink: "#F5F0E6" }, 3),
      spine: bookSpineTexture({ title: "Study Journal", author: "", colour: "#244C76", ink: "#F5F0E6" }),
      inside: notesTexture(1),
      map: mapTexture(5),
      p0f: ruledPageTexture(2),
      p0b: ruledPageTexture(3, true),
      p1f: ruledPageTexture(4),
      p1b: mirrorX(notesTexture(0)), // back of the last page renders mirrored
      notebookL: ruledPageTexture(8),
      notebookR: ruledPageTexture(9),
      // books lie flat, so the spine runs horizontally on the +x face: rotate the vertical spine art
      stack: books.slice(0, 5).map((b) => {
        const t = bookSpineTexture(b);
        t.center.set(0.5, 0.5);
        t.rotation = -Math.PI / 2;
        return t;
      }),
    };
  }, []);

  useEffect(
    () => () => {
      Object.values(tex).forEach((t) => (Array.isArray(t) ? t.forEach((x) => x.dispose()) : t.dispose()));
    },
    [tex],
  );

  const pageTextures = useMemo<Array<[THREE.Texture, THREE.Texture]>>(
    () => [
      [tex.p0f, tex.p0b],
      [tex.p1f, tex.p1b],
    ],
    [tex],
  );

  useFrame(() => {
    const d = drive.current;
    bookDrive.current.open = d.open;
    bookDrive.current.pages = d.pages;
    atmos.current.beam = d.beam * (1 - d.scroll * 0.5);
    atmos.current.dust = d.dust;
    if (key.current) key.current.intensity = 2.6 * d.light;
    if (ambient.current) ambient.current.intensity = 0.06 + 0.3 * d.light;
    if (glow.current) glow.current.opacity = 0.15 + 0.85 * d.beam;
  });

  const shadows = tier !== "low" && !compact;
  const stack = [
    { h: 0.17, w: 1.25, d: 1.7, c: books[0]!.colour, r: 0.06 },
    { h: 0.2, w: 1.2, d: 1.62, c: books[1]!.colour, r: -0.08 },
    { h: 0.15, w: 1.15, d: 1.55, c: books[2]!.colour, r: 0.12 },
    { h: 0.18, w: 1.05, d: 1.45, c: books[3]!.colour, r: -0.04 },
    { h: 0.13, w: 1.0, d: 1.38, c: books[4]!.colour, r: 0.1 },
  ];

  let y = 0;
  return (
    <>
      <color attach="background" args={["#0a121d"]} />
      <fog attach="fog" args={["#0a121d", 9, 22]} />
      <ambientLight ref={ambient} intensity={0.06} color="#9fb4d6" />
      <directionalLight
        ref={key}
        position={[-5, 6, -3]}
        intensity={0}
        color="#ffe2b0"
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
      />
      <hemisphereLight args={["#3b5a82", "#1a120a", 0.25]} />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={2} color="#ffdcae" position={[-5, 4, -2]} scale={[4, 3, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#5a7cb0" position={[5, 3, 3]} scale={[4, 2, 1]} />
      </Environment>

      {/* back wall with window light */}
      <mesh position={[0, 3, -3.6]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#121c2a" roughness={1} />
      </mesh>
      <mesh position={[-4.2, 3.4, -3.55]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial ref={glow} map={tex.glow} transparent opacity={0.15} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* desk */}
      <mesh position={[0, -0.12, 0]} receiveShadow>
        <boxGeometry args={[9, 0.24, 4.6]} />
        <meshStandardMaterial map={tex.wood} roughness={0.55} metalness={0.05} />
      </mesh>

      {/* hero book — lying on the desk, cover up */}
      <group position={[0.05, 0.085, 0.45]} rotation={[-Math.PI / 2, 0, 0.12]}>
        <Book3D
          width={1.15}
          height={1.55}
          thickness={0.17}
          colour="#244C76"
          cover={tex.cover}
          spine={tex.spine}
          insideCover={tex.inside}
          rightPage={tex.map}
          pageTextures={pageTextures}
          drive={bookDrive}
          castShadow={shadows}
          segments={compact ? 10 : 18}
        />
      </group>

      {/* stack of preparation books */}
      <group position={[-2.3, 0, -0.75]} rotation={[0, -0.6, 0]}>
        {stack.map((b, i) => {
          y += b.h;
          return (
            <mesh key={i} position={[0, y - b.h / 2, 0]} rotation={[0, b.r, 0]} castShadow={shadows} receiveShadow>
              <boxGeometry args={[b.w, b.h, b.d]} />
              {[0, 1, 2, 3, 4, 5].map((f) => (
                <meshStandardMaterial
                  key={f}
                  attach={`material-${f}`}
                  color={f === 0 ? "#ffffff" : f === 1 || f === 4 || f === 5 ? "#ece3cf" : b.c}
                  map={f === 0 ? tex.stack[i] ?? null : null}
                  roughness={0.7}
                />
              ))}
            </mesh>
          );
        })}
      </group>

      {/* open notebook */}
      <group position={[-1.25, 0.012, 1.0]} rotation={[-Math.PI / 2, 0, 0.32]}>
        <mesh position={[-0.42, 0, 0]} receiveShadow>
          <planeGeometry args={[0.82, 1.1]} />
          <meshStandardMaterial map={tex.notebookL} roughness={0.95} />
        </mesh>
        <mesh position={[0.42, 0, 0]} receiveShadow>
          <planeGeometry args={[0.82, 1.1]} />
          <meshStandardMaterial map={tex.notebookR} roughness={0.95} />
        </mesh>
      </group>

      <Pen />

      {/* newspaper */}
      <mesh position={[1.95, 0.006, 0.75]} rotation={[-Math.PI / 2, 0, -0.42]} receiveShadow>
        <planeGeometry args={[1.5, 2.05]} />
        <meshStandardMaterial map={tex.paper} roughness={0.95} />
      </mesh>

      <Lamp drive={drive} />

      <LightBeam from={BEAM_FROM} to={BEAM_TO} drive={atmos} radiusTop={0.35} radiusBottom={1.7} />
      <Dust count={compact ? 140 : tier === "high" ? 520 : 300} box={DUST_BOX} center={DUST_CENTER} beamFrom={BEAM_FROM} beamTo={BEAM_TO} drive={atmos} />

      <CameraRig drive={drive} compact={compact} />
    </>
  );
}

export default function HeroScene({ drive, compact, tier }: { drive: MutableRefObject<HeroDrive>; compact: boolean; tier: "low" | "mid" | "high" }) {
  const ready = useFontsReady();
  if (!ready) return null;
  return <SceneContents drive={drive} compact={compact} tier={tier} />;
}
