import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties } from "react";
import type { BookRef } from "@/data/books";

/**
 * A physical-looking book built with CSS 3D around the real cover photograph:
 * front cover (with spine crease and gloss), page block, spine and back.
 * Rotation is driven by the `--ry` / `--rx` custom properties so the parent can animate it cheaply.
 */
export function Book({ book, className, priority = false, sizes = "(min-width: 1024px) 18vw, 45vw" }: { book: BookRef; className?: string; priority?: boolean; sizes?: string }) {
  const depth = "clamp(18px, 2.4vw, 34px)";
  return (
    <div className={clsx("relative aspect-[2/3] [perspective:1600px]", className)} style={{ "--depth": depth } as CSSProperties}>
      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-cinema)] [transform-style:preserve-3d]"
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, -24deg))" }}
      >
        {/* front cover */}
        <div className="absolute inset-0 overflow-hidden rounded-r-[6px] rounded-l-[2px] bg-lilac [backface-visibility:hidden] [transform:translateZ(calc(var(--depth)/2))]">
          <Image src={book.cover} alt={`${book.title} by ${book.author} — cover`} fill sizes={sizes} priority={priority} className="object-cover" />
          <span aria-hidden className="absolute inset-y-0 left-0 w-[7%] bg-[linear-gradient(90deg,rgba(0,0,0,0.38),rgba(255,255,255,0.18)_45%,rgba(0,0,0,0.12))]" />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0)_70%,rgba(0,0,0,0.12)_100%)]" />
        </div>
        {/* page block (right edge) */}
        <div
          aria-hidden
          className="absolute top-[1.2%] h-[97.6%] bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_2px,#efe9f6_3px)] [transform:rotateY(90deg)]"
          style={{ width: "var(--depth)", right: "calc(var(--depth) / -2)" }}
        />
        {/* spine (left edge) */}
        <div
          aria-hidden
          className="absolute top-0 h-full [transform:rotateY(-90deg)]"
          style={{ width: "var(--depth)", left: "calc(var(--depth) / -2)", background: `linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,255,255,0.12) 50%, rgba(0,0,0,0.35)), ${book.spine}` }}
        />
        {/* back cover */}
        <div aria-hidden className="absolute inset-0 rounded-l-[6px] [transform:translateZ(calc(var(--depth)/-2))_rotateY(180deg)]" style={{ background: book.spine }} />
      </div>
      {/* contact shadow */}
      <span aria-hidden className="absolute -bottom-6 left-[8%] right-[2%] h-8 rounded-[50%] bg-brand-dark/30 blur-xl" />
    </div>
  );
}
