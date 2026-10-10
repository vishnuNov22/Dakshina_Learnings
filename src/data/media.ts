/**
 * Image manifest. Replace the illustrative SVGs with real, licensed academy
 * photography (AVIF/WebP/JPG) by changing `src` and the dimensions — every
 * component reads from here. Keep `illustrative: true` until a real photo is used.
 */
export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  illustrative: boolean;
  /** Optional portrait crop for phones */
  mobile?: { src: string; width: number; height: number };
  position?: string;
};

export const media = {
  readingRoom: {
    src: "/images/reading-room.svg",
    width: 1600,
    height: 900,
    alt: "Illustration of a quiet reading room with long study tables, desk lamps and tall bookshelves",
    illustrative: true,
    mobile: { src: "/images/reading-room-portrait.svg", width: 900, height: 1200 },
    position: "50% 60%",
  },
  studyDesk: {
    src: "/images/study-desk.svg",
    width: 1600,
    height: 1000,
    alt: "Illustration of an early-morning study desk with books, an open notebook and a desk lamp",
    illustrative: true,
    mobile: { src: "/images/study-desk-portrait.svg", width: 900, height: 1200 },
    position: "60% 50%",
  },
  newsDesk: {
    src: "/images/news-desk.svg",
    width: 1400,
    height: 1000,
    alt: "Illustration of a folded newspaper with highlighted columns and handwritten notes",
    illustrative: true,
  },
} satisfies Record<string, Media>;
