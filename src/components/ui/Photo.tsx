"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";
import type { Photo as PhotoData } from "@/data/media";

/**
 * Real photograph in a sized frame. The parent decides the size via `className`
 * (aspect ratio or height); the image fills and crops around its focal point.
 *  - reveal: curtain-style clip reveal when scrolled into view
 *  - parallax: gentle vertical drift while scrolling
 */
export function Photo({
  photo,
  sizes,
  className,
  priority = false,
  reveal = true,
  parallax = 0,
  rounded = "rounded-[28px]",
  overlay,
  alt,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  priority?: boolean;
  reveal?: boolean;
  parallax?: number;
  rounded?: string;
  overlay?: string;
  alt?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const animate = !reduce && reveal;

  return (
    <motion.div
      ref={ref}
      // callers may position the frame absolutely; otherwise it is the positioning context
      className={clsx(!/(^|\s)absolute(\s|$)/.test(className ?? "") && "relative", "isolate overflow-hidden bg-lilac", rounded, className)}
      initial={animate ? { clipPath: "inset(18% 8% 18% 8% round 28px)" } : false}
      whileInView={animate ? { clipPath: "inset(0% 0% 0% 0% round 0px)" } : undefined}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* overscan only when parallax moves the image, so group photos keep their edges */}
      <motion.div className={parallax ? "absolute inset-[-8%]" : "absolute inset-0"} style={parallax && !reduce ? { y } : undefined}>
        <motion.div
          className="absolute inset-0"
          initial={animate ? { scale: 1.18 } : false}
          whileInView={animate ? { scale: 1 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={photo.src}
            alt={alt ?? photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            quality={80}
            className="object-cover"
            style={{ objectPosition: photo.focus ?? "50% 50%" }}
          />
        </motion.div>
      </motion.div>
      {overlay ? <div aria-hidden className={clsx("absolute inset-0", overlay)} /> : null}
    </motion.div>
  );
}
