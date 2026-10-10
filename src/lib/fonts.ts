import { Instrument_Serif, Manrope, IBM_Plex_Mono, Caveat } from "next/font/google";

export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--ff-serif",
  display: "swap",
});

export const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--ff-sans",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-mono",
  display: "swap",
});

/** Handwritten annotations in notebooks and 3D textures */
export const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--ff-hand",
  display: "swap",
});
