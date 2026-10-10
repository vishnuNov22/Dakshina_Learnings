"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { Book3D, type BookDrive } from "@/components/three/Book3D";
import { useFontsReady } from "@/components/three/useFonts";
import {
  bookCoverTexture,
  bookSpineTexture,
  conceptPageTexture,
  notesTexture,
  rng,
  ruledPageTexture,
  subjectPageTexture,
  woodTexture,
} from "@/components/three/textures";
import { books } from "@/data/books";

export type LibraryDrive = { index: number; local: number };

const W = 1;
const H = 1.38;
const T = 0.16;
const SHELF_Y = [-1.25, 0.35, 1.95];
const SLOT_X = books.map((_, i) => -2.1 + i * 0.7);

const ease = (t: number) => THREE.MathUtils.smootherstep(t, 0, 1);
const seg = (t: number, a: number, b: number) => THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);

function Shelves({ activeRef, spines }: { activeRef: MutableRefObject<LibraryDrive>; spines: THREE.Texture[] }) {
  const wood = useMemo(() => woodTexture(), []);
  const filler = useRef<THREE.InstancedMesh>(null);
  const featured = useRef<Array<THREE.Mesh | null>>([]);
  const COUNT = 64;

  useEffect(() => {
    const m = filler.current;
    if (!m) return;
    const r = rng(42);
    const colours = ["#244C76", "#8E3935", "#2F5D57", "#6B4A2E", "#B79A62", "#3a3a3a", "#1d2e46", "#5b2b2a"];
    const o = new THREE.Object3D();
    const col = new THREE.Color();
    let n = 0;
    SHELF_Y.forEach((sy, row) => {
      let x = -4.6;
      while (x < 4.6 && n < COUNT) {
        const w = 0.09 + r() * 0.1;
        const h = 0.9 + r() * 0.45;
        // leave the middle shelf's centre free for the featured books
        if (!(row === 1 && x > -2.5 && x < 2.5)) {
          o.position.set(x + w / 2, sy + h / 2, -2.65 + r() * 0.08);
          o.rotation.set(0, 0, r() > 0.92 ? 0.12 : 0);
          o.scale.set(w, h, 0.95);
          o.updateMatrix();
          m.setMatrixAt(n, o.matrix);
          m.setColorAt(n, col.set(colours[Math.floor(r() * colours.length)] ?? "#244C76"));
          n++;
        }
        x += w + 0.012;
      }
    });
    m.count = n;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);

  useEffect(() => () => wood.dispose(), [wood]);

  useFrame(() => {
    const { index, local } = activeRef.current;
    featured.current.forEach((mesh, i) => {
      if (!mesh) return;
      // the active book leaves its slot once it starts travelling
      mesh.visible = !(i === index && local > 0.01 && local < 0.995);
    });
  });

  return (
    <group>
      <mesh position={[0, 0.6, -3]} receiveShadow>
        <planeGeometry args={[14, 8]} />
        <meshStandardMaterial color="#0f1826" roughness={1} />
      </mesh>
      {SHELF_Y.map((y) => (
        <mesh key={y} position={[0, y - 0.04, -2.55]} receiveShadow>
          <boxGeometry args={[9.6, 0.08, 0.7]} />
          <meshStandardMaterial map={wood} roughness={0.6} />
        </mesh>
      ))}
      <instancedMesh ref={filler} args={[undefined, undefined, COUNT]}>
        <boxGeometry args={[1, 1, 0.55]} />
        <meshStandardMaterial roughness={0.75} />
      </instancedMesh>
      {books.map((b, i) => (
        <mesh
          key={b.id}
          ref={(m) => {
            featured.current[i] = m;
          }}
          position={[SLOT_X[i] ?? 0, SHELF_Y[1]! + H / 2, -2.6]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <boxGeometry args={[W, H, T]} />
          {[0, 1, 2, 3, 4, 5].map((f) => (
            <meshStandardMaterial key={f} attach={`material-${f}`} color={f === 1 ? "#ffffff" : f === 0 ? "#ece3cf" : b.colour} map={f === 1 ? spines[i] ?? null : null} roughness={0.65} />
          ))}
        </mesh>
      ))}
    </group>
  );
}

function ActiveBook({ drive, tex }: { drive: MutableRefObject<LibraryDrive>; tex: ReturnType<typeof useLibraryTextures> }) {
  const group = useRef<THREE.Group>(null);
  const bookDrive = useRef<BookDrive>({ open: 0, pages: 0 });
  const slot = useMemo(() => new THREE.Vector3(), []);
  const centre = useMemo(() => new THREE.Vector3(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const { index, local } = drive.current;
    const g = group.current;
    if (!g) return;
    const travelIn = ease(seg(local, 0.0, 0.18));
    const open = ease(seg(local, 0.18, 0.36)) * (1 - ease(seg(local, 0.8, 0.9)));
    const pages = 3 * seg(local, 0.38, 0.76) * (1 - seg(local, 0.8, 0.86));
    const travelOut = ease(seg(local, 0.88, 1));
    const t = travelIn * (1 - travelOut);

    slot.set(SLOT_X[index] ?? 0, SHELF_Y[1]! + H / 2, -2.6);
    centre.set(0, 0.02 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02, 0.2);
    g.position.lerpVectors(slot, centre, t);
    g.position.y += Math.sin(t * Math.PI) * 0.35; // arc while travelling
    g.rotation.set(-0.1 * t, (Math.PI / 2) * (1 - t), Math.sin(t * Math.PI) * -0.06);
    // The group origin is the spine. Shift so the visual centre (closed: W/2, open: the spine) sits on the path.
    offset.set((W / 2) * (1 - open), 0, 0).applyEuler(g.rotation);
    g.position.sub(offset);
    g.visible = local > 0.005 && local < 0.998;
    bookDrive.current.open = open;
    bookDrive.current.pages = pages;
  });

  return (
    <group ref={group}>
      <BookSwap drive={drive} tex={tex} bookDrive={bookDrive} />
    </group>
  );
}

/** Swaps the book's textures only when the chapter changes (the book is on the shelf at that moment). */
function BookSwap({
  drive,
  tex,
  bookDrive,
}: {
  drive: MutableRefObject<LibraryDrive>;
  tex: ReturnType<typeof useLibraryTextures>;
  bookDrive: MutableRefObject<BookDrive>;
}) {
  const [index, setIndex] = useState(drive.current.index);
  useFrame(() => {
    if (drive.current.index !== index) setIndex(drive.current.index);
  });
  const s = tex.sets[index] ?? tex.sets[0]!;
  return (
    <Book3D
      key={index}
      width={W}
      height={H}
      thickness={T}
      colour={s.colour}
      cover={s.cover}
      spine={s.spine}
      insideCover={tex.inside}
      rightPage={s.right}
      pageTextures={s.pages}
      drive={bookDrive}
      castShadow
      segments={14}
    />
  );
}

function useLibraryTextures() {
  const tex = useMemo(() => {
    const ruled = [ruledPageTexture(21), ruledPageTexture(22, true), ruledPageTexture(23), ruledPageTexture(24, true), ruledPageTexture(25)];
    const inside = notesTexture(0);
    const sets = books.map((b, i) => ({
      colour: b.colour,
      cover: bookCoverTexture(b, i + 1),
      spine: bookSpineTexture(b),
      right: subjectPageTexture(b),
      pages: [
        [ruled[0]!, ruled[1]!],
        [ruled[2]!, ruled[3]!],
        [ruled[4]!, conceptPageTexture(b, true)],
      ] as Array<[THREE.Texture, THREE.Texture]>,
    }));
    const spines = sets.map((s) => s.spine);
    return { ruled, inside, sets, spines };
  }, []);
  useEffect(
    () => () => {
      tex.ruled.forEach((t) => t.dispose());
      tex.inside.dispose();
      tex.sets.forEach((s) => {
        s.cover.dispose();
        s.spine.dispose();
        s.right.dispose();
        s.pages[2]?.[1].dispose();
      });
    },
    [tex],
  );
  return tex;
}

function Rig() {
  const { camera, size } = useThree();
  useFrame(() => {
    const aspect = size.width / Math.max(1, size.height);
    const cam = camera as THREE.PerspectiveCamera;
    // fit the open spread (≈ 2.1 units wide) with margin on any aspect ratio
    const needHalfW = 1.35;
    const dist = 3.4;
    const fovForWidth = THREE.MathUtils.radToDeg(2 * Math.atan(needHalfW / (dist * aspect)));
    const fov = THREE.MathUtils.clamp(Math.max(32, fovForWidth), 32, 75);
    if (Math.abs(cam.fov - fov) > 0.05) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    cam.position.set(0, 0.35, dist);
    cam.lookAt(0, 0.1, 0);
  });
  return null;
}

function Contents({ drive }: { drive: MutableRefObject<LibraryDrive> }) {
  const tex = useLibraryTextures();
  return (
    <>
      <color attach="background" args={["#0b1420"]} />
      <fog attach="fog" args={["#0b1420", 4, 11]} />
      <ambientLight intensity={0.35} color="#9fb4d6" />
      <spotLight position={[1.5, 4, 3]} angle={0.5} penumbra={0.8} intensity={40} color="#ffe2b8" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 2, 2]} intensity={0.6} color="#7f9dc9" />
      <Environment resolution={64} frames={1}>
        <Lightformer form="rect" intensity={1.6} color="#ffe0b5" position={[2, 3, 3]} scale={[3, 2, 1]} />
        <Lightformer form="rect" intensity={0.5} color="#6f8fbf" position={[-3, 1, 2]} scale={[2, 2, 1]} />
      </Environment>
      <Shelves activeRef={drive} spines={tex.spines} />
      <ActiveBook drive={drive} tex={tex} />
      <Rig />
    </>
  );
}

export default function BookScene({ drive }: { drive: MutableRefObject<LibraryDrive> }) {
  const ready = useFontsReady();
  if (!ready) return null;
  return <Contents drive={drive} />;
}
