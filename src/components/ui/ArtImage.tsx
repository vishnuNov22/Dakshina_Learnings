import { getImageProps } from "next/image";
import clsx from "clsx";
import type { Media } from "@/data/media";

/**
 * Art-directed responsive image. Uses <picture> so phones receive a portrait crop
 * while laptops get the cinematic landscape version. The parent controls the size;
 * the aspect ratio is reserved to avoid layout shift.
 */
export function ArtImage({
  media,
  sizes,
  priority = false,
  fit = "cover",
  className,
  imgClassName,
  breakpoint = 768,
  showIllustrativeLabel = true,
}: {
  media: Media;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  className?: string;
  imgClassName?: string;
  breakpoint?: number;
  showIllustrativeLabel?: boolean;
}) {
  const common = { alt: media.alt, sizes, priority, quality: 82 } as const;
  const isSvg = media.src.endsWith(".svg");
  const {
    props: { srcSet: desktopSrcSet, ...desktopRest },
  } = getImageProps({ ...common, src: media.src, width: media.width, height: media.height, unoptimized: isSvg });

  const mobileSrcSet = media.mobile
    ? getImageProps({
        ...common,
        src: media.mobile.src,
        width: media.mobile.width,
        height: media.mobile.height,
        unoptimized: media.mobile.src.endsWith(".svg"),
      }).props.srcSet ?? media.mobile.src
    : undefined;

  return (
    <figure className={clsx("relative overflow-hidden", className)}>
      <picture>
        {mobileSrcSet ? <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={mobileSrcSet} /> : null}
        <source media={`(min-width: ${breakpoint}px)`} srcSet={desktopSrcSet ?? media.src} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is passed through desktopRest */}
        <img
          {...desktopRest}
          className={clsx("absolute inset-0 h-full w-full", fit === "cover" ? "object-cover" : "object-contain", imgClassName)}
          style={{ objectPosition: media.position ?? "50% 50%" }}
        />
      </picture>
      {media.illustrative && showIllustrativeLabel ? (
        <figcaption className="eyebrow absolute bottom-3 right-3 rounded-full bg-navy/70 px-3 py-1 text-[0.6rem] text-ivory/80 backdrop-blur">
          Illustration
        </figcaption>
      ) : null}
    </figure>
  );
}
