"use client";

import * as THREE from "three";
import { serif, sans, mono, hand } from "@/lib/fonts";
import type { BookRef } from "@/data/books";

/* Canvas-generated textures: crisp at any DPR, zero network requests, and
   fully original artwork (no publisher covers, no official insignia). */

const F = {
  serif: serif.style.fontFamily,
  sans: sans.style.fontFamily,
  mono: mono.style.fontFamily,
  hand: hand.style.fontFamily,
};

export const PALETTE = {
  navy: "#101C2C",
  charcoal: "#151515",
  ivory: "#F5F0E6",
  parchment: "#E5D7BC",
  blue: "#244C76",
  gold: "#B79A62",
  red: "#8E3935",
  grey: "#B7B5AF",
  ink: "#1D1A16",
};

/** Deterministic PRNG so textures look identical on every load. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function make(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return { c, ctx };
}

function toTexture(c: HTMLCanvasElement, opts: { repeat?: [number, number]; mirrorX?: boolean } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (opts.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...opts.repeat);
  }
  if (opts.mirrorX) {
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.x = -1;
    t.offset.x = 1;
  }
  t.needsUpdate = true;
  return t;
}

function grain(ctx: CanvasRenderingContext2D, w: number, h: number, amount = 0.05, seed = 1) {
  const r = rng(seed);
  const n = Math.floor((w * h) / 30);
  for (let i = 0; i < n; i++) {
    const v = r();
    ctx.fillStyle = v > 0.5 ? `rgba(255,255,255,${amount * r()})` : `rgba(0,0,0,${amount * r()})`;
    ctx.fillRect(r() * w, r() * h, 1.2, 1.2);
  }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

/* ───────────────────────────── Desk & room ───────────────────────────── */

export function woodTexture() {
  const { c, ctx } = make(1024, 512);
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#3a2618");
  g.addColorStop(1, "#2a1a10");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1024, 512);
  const r = rng(7);
  for (let i = 0; i < 140; i++) {
    const y = r() * 512;
    ctx.strokeStyle = `rgba(${r() > 0.5 ? "90,60,36" : "20,12,6"},${0.15 + r() * 0.25})`;
    ctx.lineWidth = 0.6 + r() * 2.2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 32) ctx.lineTo(x, y + Math.sin(x * 0.006 + i) * (4 + r() * 6));
    ctx.stroke();
  }
  grain(ctx, 1024, 512, 0.06, 3);
  return toTexture(c, { repeat: [2, 1] });
}

export function windowGlowTexture() {
  const { c, ctx } = make(512, 512);
  const g = ctx.createRadialGradient(256, 220, 10, 256, 256, 260);
  g.addColorStop(0, "rgba(255,226,170,0.85)");
  g.addColorStop(0.35, "rgba(214,170,110,0.35)");
  g.addColorStop(1, "rgba(16,28,44,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  // window mullions
  ctx.fillStyle = "rgba(16,28,44,0.55)";
  ctx.fillRect(250, 60, 12, 360);
  ctx.fillRect(100, 236, 312, 10);
  return toTexture(c);
}

/* ───────────────────────────── Paper surfaces ───────────────────────────── */

function paperBase(ctx: CanvasRenderingContext2D, w: number, h: number, tone = PALETTE.ivory, seed = 2) {
  ctx.fillStyle = tone;
  ctx.fillRect(0, 0, w, h);
  const v = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.75);
  v.addColorStop(0, "rgba(0,0,0,0)");
  v.addColorStop(1, "rgba(80,60,30,0.12)");
  ctx.fillStyle = v;
  ctx.fillRect(0, 0, w, h);
  grain(ctx, w, h, 0.05, seed);
}

/** Left page: handwritten study notes with highlights and arrows. */
export function notesTexture(variant = 0) {
  const W = 768, H = 1024;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, PALETTE.ivory, 11 + variant);
  ctx.strokeStyle = "rgba(36,76,118,0.16)";
  ctx.lineWidth = 1.5;
  for (let y = 120; y < H - 40; y += 44) {
    ctx.beginPath();
    ctx.moveTo(56, y);
    ctx.lineTo(W - 40, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(142,57,53,0.35)";
  ctx.beginPath();
  ctx.moveTo(96, 40);
  ctx.lineTo(96, H - 30);
  ctx.stroke();

  const sets: ReadonlyArray<ReadonlyArray<readonly [string, number]>> = [
    [
      ["Q. Why does India need", 0],
      ["   cooperative federalism?", 0],
      ["→ Art. 1: 'Union of States'", 1],
      ["→ 7th Schedule: 3 lists", 1],
      ["→ GST Council = shared sovereignty", 1],
      ["Dimensions:", 2],
      ["   fiscal · political · admin", 0],
      ["Link → current affairs!", 3],
    ],
    [
      ["Monsoon — why June?", 0],
      ["→ ITCZ shifts north", 1],
      ["→ Tibetan plateau heating", 1],
      ["→ Jet stream reversal", 1],
      ["Impact: agri · water · GDP", 2],
      ["Ask: where, why there,", 0],
      ["      what follows?", 0],
      ["Revise with map ✓", 3],
    ],
  ];
  const lines = sets[variant % sets.length] ?? sets[0] ?? [];
  let y = 108;
  lines.forEach(([text, kind], i) => {
    y += 44;
    if (kind === 2) {
      ctx.fillStyle = "rgba(240,205,90,0.45)";
      ctx.fillRect(110, y - 30, 420, 38);
    }
    ctx.fillStyle = kind === 3 ? PALETTE.red : kind === 1 ? "#1f3f63" : PALETTE.ink;
    ctx.font = `${kind === 0 && i === 0 ? 600 : 400} ${kind === 0 && i === 0 ? 46 : 40}px ${F.hand}`;
    ctx.fillText(text, 112, y);
  });
  // circled keyword + arrow
  ctx.strokeStyle = PALETTE.red;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(560, 820, 110, 46, -0.06, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `600 38px ${F.hand}`;
  ctx.fillStyle = PALETTE.red;
  ctx.fillText(variant % 2 ? "Geography" : "GS Paper II", 470, 832);
  ctx.beginPath();
  ctx.moveTo(430, 760);
  ctx.quadraticCurveTo(470, 700, 540, 700);
  ctx.stroke();
  return toTexture(c);
}

/** Survey-style study map (stylised contours — deliberately not a political boundary map). */
export function mapTexture(seed = 5, mirrorX = false) {
  const W = 768, H = 1024;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, "#EADFC6", seed);
  // grid
  ctx.strokeStyle = "rgba(36,76,118,0.18)";
  ctx.lineWidth = 1;
  ctx.font = `14px ${F.mono}`;
  ctx.fillStyle = "rgba(36,76,118,0.6)";
  for (let x = 64; x < W; x += 96) {
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x, H - 40);
    ctx.stroke();
  }
  for (let y = 64; y < H; y += 96) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(W - 40, y);
    ctx.stroke();
  }
  // contours: distorted concentric loops around a few peaks
  const r = rng(seed);
  const peaks = Array.from({ length: 4 }, () => ({ x: 120 + r() * (W - 240), y: 160 + r() * (H - 320), k: 4 + Math.floor(r() * 5) }));
  for (const p of peaks) {
    for (let i = 1; i <= p.k; i++) {
      const rad = i * 26 + r() * 6;
      ctx.strokeStyle = i % 4 === 0 ? "rgba(120,72,40,0.55)" : "rgba(120,72,40,0.28)";
      ctx.lineWidth = i % 4 === 0 ? 2 : 1.2;
      ctx.beginPath();
      for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.08) {
        const wobble = 1 + 0.18 * Math.sin(a * 3 + p.x) + 0.1 * Math.sin(a * 5 + p.y);
        const x = p.x + Math.cos(a) * rad * wobble;
        const y = p.y + Math.sin(a) * rad * wobble * 1.15;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
  // river
  ctx.strokeStyle = "rgba(36,76,118,0.75)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(40, 300);
  ctx.bezierCurveTo(260, 380, 200, 640, 460, 700);
  ctx.bezierCurveTo(600, 730, 640, 880, W - 40, 960);
  ctx.stroke();
  // compass
  ctx.save();
  ctx.translate(W - 110, 120);
  ctx.strokeStyle = PALETTE.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = PALETTE.red;
  ctx.beginPath();
  ctx.moveTo(0, -56);
  ctx.lineTo(10, 0);
  ctx.lineTo(-10, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = PALETTE.ink;
  ctx.font = `600 22px ${F.serif}`;
  ctx.fillText("N", -7, -64);
  ctx.restore();
  // title block
  ctx.fillStyle = PALETTE.ink;
  ctx.font = `500 16px ${F.mono}`;
  ctx.fillText("STUDY SHEET · PHYSICAL GEOGRAPHY", 64, H - 70);
  ctx.font = `italic 30px ${F.serif}`;
  ctx.fillText("Relief, drainage & settlement", 64, H - 104);
  // handwritten annotation
  ctx.fillStyle = PALETTE.red;
  ctx.font = `600 34px ${F.hand}`;
  ctx.fillText("why do towns sit here?", 330, 640);
  return toTexture(c, { mirrorX });
}

export function ruledPageTexture(seed = 1, mirrorX = false) {
  const W = 512, H = 700;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, PALETTE.ivory, seed);
  ctx.strokeStyle = "rgba(36,76,118,0.18)";
  for (let y = 80; y < H - 20; y += 32) {
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(W - 24, y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(29,26,22,0.78)";
  ctx.font = `36px ${F.hand}`;
  const r = rng(seed);
  for (let i = 0; i < 9; i++) {
    const len = 120 + r() * 280;
    ctx.fillRect(40, 70 + i * 64, len, 2);
  }
  return toTexture(c, { mirrorX });
}

export function pageEdgeTexture() {
  const { c, ctx } = make(64, 256);
  ctx.fillStyle = "#EDE5D3";
  ctx.fillRect(0, 0, 64, 256);
  for (let y = 0; y < 256; y += 2) {
    ctx.fillStyle = `rgba(120,100,70,${0.08 + (y % 6 === 0 ? 0.12 : 0)})`;
    ctx.fillRect(0, y, 64, 1);
  }
  return toTexture(c, { repeat: [1, 6] });
}

/** Fictional broadsheet for the desk — no real masthead is reproduced. */
export function newspaperTexture() {
  const W = 1024, H = 1400;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, "#ECE6D8", 21);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = `64px ${F.serif}`;
  ctx.textAlign = "center";
  ctx.fillText("The Morning Brief", W / 2, 96);
  ctx.textAlign = "left";
  ctx.fillRect(48, 120, W - 96, 3);
  ctx.font = `16px ${F.mono}`;
  ctx.fillText("STUDY EDITION · ANALYSIS · POLICY · WORLD", 48, 148);
  ctx.fillRect(48, 160, W - 96, 1);
  ctx.font = `50px ${F.serif}`;
  wrapText(ctx, "Cities, climate and the next decade of governance", W - 120).forEach((l, i) => ctx.fillText(l, 48, 230 + i * 58));
  ctx.fillStyle = "#c9c1b0";
  ctx.fillRect(48, 360, 600, 340);
  ctx.fillStyle = "rgba(29,26,22,0.55)";
  const r = rng(4);
  const col = (x: number, y0: number, y1: number, w: number) => {
    for (let y = y0; y < y1; y += 20) ctx.fillRect(x, y, w * (0.75 + r() * 0.25), 6);
  };
  col(680, 360, 1340, 290);
  col(48, 730, 1340, 280);
  col(360, 730, 1340, 280);
  ctx.fillStyle = "rgba(240,205,90,0.5)";
  ctx.fillRect(44, 800, 270, 46);
  ctx.strokeStyle = PALETTE.red;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(500, 900, 150, 50, 0.05, 0, Math.PI * 2);
  ctx.stroke();
  return toTexture(c);
}

/* ───────────────────────────── Books ───────────────────────────── */

export function bookCoverTexture(book: Pick<BookRef, "title" | "author" | "subject" | "colour" | "ink">, seed = 1) {
  const W = 720, H = 1000;
  const { c, ctx } = make(W, H);
  ctx.fillStyle = book.colour;
  ctx.fillRect(0, 0, W, H);
  // cloth texture
  const r = rng(seed);
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(${r() > 0.5 ? "255,255,255" : "0,0,0"},${r() * 0.05})`;
    ctx.fillRect(r() * W, r() * H, r() * 6 + 1, 1);
  }
  const shade = ctx.createLinearGradient(0, 0, W, 0);
  shade.addColorStop(0, "rgba(0,0,0,0.35)");
  shade.addColorStop(0.07, "rgba(0,0,0,0.05)");
  shade.addColorStop(0.09, "rgba(255,255,255,0.06)");
  shade.addColorStop(1, "rgba(0,0,0,0.1)");
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, W, H);
  // frame
  ctx.strokeStyle = book.ink;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 60, W - 120, H - 120);
  ctx.strokeRect(80, 70, W - 140, H - 140);
  ctx.globalAlpha = 1;
  // subject
  ctx.fillStyle = book.ink;
  ctx.font = `500 22px ${F.mono}`;
  ctx.fillText(book.subject.toUpperCase(), 116, 140);
  ctx.fillRect(116, 160, 80, 2);
  // title
  ctx.font = `86px ${F.serif}`;
  const lines = wrapText(ctx, book.title, W - 230);
  const size = lines.length > 3 ? 64 : 86;
  ctx.font = `${size}px ${F.serif}`;
  wrapText(ctx, book.title, W - 230).forEach((l, i) => ctx.fillText(l, 116, 290 + i * size * 1.05));
  // author
  ctx.font = `600 26px ${F.sans}`;
  ctx.globalAlpha = 0.85;
  ctx.fillText(book.author, 116, H - 150);
  ctx.globalAlpha = 0.5;
  ctx.font = `400 15px ${F.mono}`;
  ctx.fillText("ILLUSTRATIVE COVER", 116, H - 110);
  ctx.globalAlpha = 1;
  return toTexture(c);
}

export function bookSpineTexture(book: Pick<BookRef, "title" | "author" | "colour" | "ink">) {
  const W = 160, H = 1000;
  const { c, ctx } = make(W, H);
  ctx.fillStyle = book.colour;
  ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, "rgba(0,0,0,0.35)");
  g.addColorStop(0.5, "rgba(255,255,255,0.08)");
  g.addColorStop(1, "rgba(0,0,0,0.35)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = book.ink;
  ctx.globalAlpha = 0.7;
  ctx.fillRect(18, 60, W - 36, 2);
  ctx.fillRect(18, H - 62, W - 36, 2);
  ctx.globalAlpha = 1;
  ctx.save();
  ctx.translate(W / 2 + 14, H - 110);
  ctx.rotate(-Math.PI / 2);
  ctx.font = `46px ${F.serif}`;
  let t = book.title;
  while (ctx.measureText(t).width > H - 260 && t.length > 4) t = `${t.slice(0, -2)}…`;
  ctx.fillText(t, 0, 0);
  ctx.restore();
  return toTexture(c);
}

/* ───────────────────────────── Identity cards ───────────────────────────── */

function portrait(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, bg: string, fg: string) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 18);
  ctx.clip();
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);
  const g = ctx.createLinearGradient(x, y, x, y + h);
  g.addColorStop(0, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(0,0,0,0.2)");
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.arc(x + w / 2, y + h * 0.4, w * 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + w / 2, y + h * 1.02, w * 0.42, h * 0.38, 0, Math.PI, 0);
  ctx.fill();
  ctx.restore();
}

export function aspirantCardTexture(logo?: HTMLImageElement | null) {
  const W = 640, H = 1000;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, PALETTE.ivory, 31);
  ctx.fillStyle = PALETTE.blue;
  ctx.fillRect(0, 0, W, 190);
  if (logo?.complete && logo.naturalWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(96, 95, 56, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.clip();
    ctx.drawImage(logo, 40, 39, 112, 112);
    ctx.restore();
  }
  ctx.fillStyle = PALETTE.ivory;
  ctx.font = `48px ${F.serif}`;
  ctx.fillText("Dakshina", 176, 92);
  ctx.font = `500 17px ${F.mono}`;
  ctx.fillText("LEARNINGS · CIVIL SERVICES", 178, 128);
  portrait(ctx, 170, 250, 300, 340, PALETTE.parchment, "rgba(36,76,118,0.55)");
  ctx.fillStyle = PALETTE.ink;
  ctx.textAlign = "center";
  ctx.font = `64px ${F.serif}`;
  ctx.fillText("THE ASPIRANT", W / 2, 680);
  ctx.font = `600 22px ${F.sans}`;
  ctx.fillStyle = PALETTE.blue;
  ctx.fillText("CIVIL SERVICES ASPIRANT", W / 2, 726);
  ctx.strokeStyle = "rgba(29,26,22,0.2)";
  ctx.beginPath();
  ctx.moveTo(80, 770);
  ctx.lineTo(W - 80, 770);
  ctx.stroke();
  ctx.font = `500 18px ${F.mono}`;
  ctx.fillStyle = "rgba(29,26,22,0.7)";
  ctx.fillText("ID  DL-ASP-0000-001", W / 2, 816);
  ctx.font = `500 13px ${F.mono}`;
  ctx.fillText("FICTIONAL · ILLUSTRATIVE ONLY", W / 2, 934);
  ctx.textAlign = "left";
  // barcode-like rules
  const r = rng(9);
  let x = 160;
  while (x < W - 160) {
    const w = 2 + Math.floor(r() * 5);
    ctx.fillStyle = PALETTE.ink;
    ctx.fillRect(x, 846, w, 48);
    x += w + 3 + Math.floor(r() * 4);
  }
  return toTexture(c);
}

/** Symbolic "future" card — deliberately contains no emblem, seal or official wording. */
export function officerCardTexture() {
  const W = 640, H = 1000;
  const { c, ctx } = make(W, H);
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0d1a2b");
  g.addColorStop(1, "#1b2f4a");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // guilloche-like gold pattern
  ctx.strokeStyle = "rgba(183,154,98,0.22)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2 + 0.02; a += 0.02) {
      const rad = 180 + 30 * Math.sin(a * 6 + i * 0.25) + i * 4;
      const x = W / 2 + Math.cos(a) * rad;
      const y = 380 + Math.sin(a) * rad * 0.9;
      if (a === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.strokeStyle = PALETTE.gold;
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.globalAlpha = 0.5;
  ctx.strokeRect(38, 38, W - 76, H - 76);
  ctx.globalAlpha = 1;
  ctx.fillStyle = PALETTE.gold;
  ctx.font = `500 17px ${F.mono}`;
  ctx.textAlign = "center";
  ctx.fillText("PUBLIC SERVICE · A SYMBOLIC FUTURE", W / 2, 96);
  portrait(ctx, 200, 200, 240, 280, "#24384f", "rgba(229,215,188,0.7)");
  ctx.fillStyle = PALETTE.ivory;
  ctx.font = `56px ${F.serif}`;
  ["THE OFFICER", "YOU ARE PREPARING", "TO BECOME"].forEach((l, i) => ctx.fillText(l, W / 2, 590 + i * 64));
  ctx.fillStyle = PALETTE.gold;
  ctx.fillRect(W / 2 - 40, 790, 80, 2);
  ctx.font = `italic 30px ${F.serif}`;
  ctx.fillStyle = "rgba(245,240,230,0.8)";
  ctx.fillText("Service · Integrity · Judgement", W / 2, 846);
  ctx.font = `500 13px ${F.mono}`;
  ctx.fillStyle = "rgba(245,240,230,0.55)";
  ctx.fillText("ILLUSTRATIVE · NOT AN OFFICIAL DOCUMENT", W / 2, 934);
  ctx.textAlign = "left";
  return toTexture(c);
}

export function cardEdgeTexture(colour: string) {
  const { c, ctx } = make(8, 8);
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, 8, 8);
  return toTexture(c);
}

/** Resolve once the brand fonts are ready so canvas text uses them. */
export async function fontsReady(): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`64px ${F.serif}`),
      document.fonts.load(`600 24px ${F.sans}`),
      document.fonts.load(`16px ${F.mono}`),
      document.fonts.load(`40px ${F.hand}`),
    ]);
  } catch {
    /* fall back to system fonts */
  }
}

/* ───────────────────────────── Library pages ───────────────────────────── */

/** Handwritten concept summary for a book (rendered on the back of the last page → mirrored). */
export function conceptPageTexture(book: Pick<BookRef, "subject" | "concepts" | "annotation" | "colour">, mirrorX = true) {
  const W = 720, H = 1000;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, PALETTE.ivory, book.subject.length * 7);
  ctx.fillStyle = book.colour;
  ctx.fillRect(60, 70, 8, 70);
  ctx.fillStyle = PALETTE.ink;
  ctx.font = `500 18px ${F.mono}`;
  ctx.fillText(`${book.subject.toUpperCase()} · KEY IDEAS`, 88, 96);
  ctx.font = `italic 44px ${F.serif}`;
  wrapText(ctx, book.annotation, W - 160).forEach((l, i) => ctx.fillText(l, 88, 150 + i * 50));
  ctx.strokeStyle = "rgba(36,76,118,0.16)";
  for (let y = 330; y < H - 60; y += 56) {
    ctx.beginPath();
    ctx.moveTo(60, y);
    ctx.lineTo(W - 50, y);
    ctx.stroke();
  }
  book.concepts.forEach((cpt, i) => {
    const y = 380 + i * 112;
    ctx.fillStyle = PALETTE.red;
    ctx.font = `600 44px ${F.hand}`;
    ctx.fillText(`${i + 1}.`, 70, y);
    ctx.fillStyle = "#1f3f63";
    ctx.font = `400 40px ${F.hand}`;
    wrapText(ctx, cpt, W - 200).forEach((l, j) => ctx.fillText(l, 120, y + j * 46));
  });
  return toTexture(c, { mirrorX });
}

/** Right-hand page diagram matching the subject. */
export function subjectPageTexture(book: Pick<BookRef, "visual" | "subject" | "colour">) {
  if (book.visual === "geography") return mapTexture(book.subject.length);
  if (book.visual === "news") return newspaperTexture();
  const W = 720, H = 1000;
  const { c, ctx } = make(W, H);
  paperBase(ctx, W, H, "#EFE7D5", book.subject.length * 3);
  ctx.strokeStyle = PALETTE.ink;
  ctx.fillStyle = PALETTE.ink;
  ctx.lineWidth = 2.5;
  ctx.font = `500 18px ${F.mono}`;
  ctx.fillText(book.subject.toUpperCase(), 70, 90);
  const node = (x: number, y: number, label: string, fill = PALETTE.ivory) => {
    ctx.beginPath();
    ctx.arc(x, y, 62, 0, Math.PI * 2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = PALETTE.ink;
    ctx.font = `30px ${F.serif}`;
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 10);
    ctx.textAlign = "left";
  };
  const arrow = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - 16 * Math.cos(a - 0.4), y2 - 16 * Math.sin(a - 0.4));
    ctx.lineTo(x2 - 16 * Math.cos(a + 0.4), y2 - 16 * Math.sin(a + 0.4));
    ctx.closePath();
    ctx.fill();
  };
  if (book.visual === "polity") {
    node(360, 270, "Constitution", "#e3d3b0");
    node(170, 560, "Legislature");
    node(360, 660, "Executive");
    node(550, 560, "Judiciary");
    ctx.fillStyle = PALETTE.ink;
    arrow(320, 330, 205, 500);
    arrow(360, 335, 360, 595);
    arrow(400, 330, 515, 500);
    ctx.setLineDash([8, 8]);
    arrow(232, 570, 298, 640);
    arrow(488, 570, 422, 640);
    ctx.setLineDash([]);
    ctx.fillStyle = PALETTE.red;
    ctx.font = `600 36px ${F.hand}`;
    ctx.fillText("checks & balances", 210, 820);
  } else if (book.visual === "history") {
    ctx.beginPath();
    ctx.moveTo(110, 160);
    ctx.lineTo(110, 900);
    ctx.stroke();
    const items = book.subject.includes("Ancient")
      ? ["Harappan", "Vedic age", "Mahajanapadas", "Mauryas", "Guptas"]
      : ["1857", "1885 INC", "1905 Swadeshi", "1920 NCM", "1947"];
    items.forEach((t, i) => {
      const y = 210 + i * 160;
      ctx.beginPath();
      ctx.arc(110, y, 14, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 ? PALETTE.red : book.colour;
      ctx.fill();
      ctx.fillStyle = PALETTE.ink;
      ctx.font = `40px ${F.serif}`;
      ctx.fillText(t, 150, y + 12);
      ctx.fillStyle = "rgba(29,26,22,0.4)";
      ctx.fillRect(150, y + 34, 300, 4);
    });
    ctx.fillStyle = PALETTE.red;
    ctx.font = `600 36px ${F.hand}`;
    ctx.fillText("cause → effect →", 330, 940);
  } else if (book.visual === "economy") {
    node(360, 240, "Growth", "#e8d9b5");
    node(160, 470, "Inflation");
    node(560, 470, "Jobs");
    node(240, 730, "Fiscal");
    node(480, 730, "Monetary");
    ctx.fillStyle = PALETTE.ink;
    arrow(318, 290, 205, 410);
    arrow(402, 290, 515, 410);
    arrow(240, 668, 190, 532);
    arrow(480, 668, 530, 532);
    arrow(302, 730, 418, 730);
    ctx.fillStyle = PALETTE.red;
    ctx.font = `600 36px ${F.hand}`;
    ctx.fillText("every policy = a trade-off", 140, 900);
  } else {
    // environment: energy-flow cycle
    const labels = ["Producers", "Consumers", "Decomposers", "Nutrients"];
    labels.forEach((l, i) => {
      const a = -Math.PI / 2 + (i * Math.PI) / 2;
      node(360 + Math.cos(a) * 220, 500 + Math.sin(a) * 220, l, i === 0 ? "#cfe0c4" : PALETTE.ivory);
    });
    ctx.fillStyle = PALETTE.ink;
    for (let i = 0; i < 4; i++) {
      const a1 = -Math.PI / 2 + (i * Math.PI) / 2 + 0.42;
      const a2 = a1 + Math.PI / 2 - 0.84;
      arrow(360 + Math.cos(a1) * 220, 500 + Math.sin(a1) * 220, 360 + Math.cos(a2) * 220, 500 + Math.sin(a2) * 220);
    }
    ctx.fillStyle = PALETTE.red;
    ctx.font = `600 36px ${F.hand}`;
    ctx.fillText("process > list", 250, 900);
  }
  return toTexture(c);
}
