import { Playfair_Display, Plus_Jakarta_Sans, IBM_Plex_Mono, Caveat } from "next/font/google";

/** Display serif — high-contrast, editorial, premium. */
export const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--ff-serif",
  display: "swap",
});

/** UI & body — modern geometric sans. */
export const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--ff-sans",
  display: "swap",
});

export const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });

/** Handwritten annotations in the notebook */
export const hand = Caveat({ subsets: ["latin"], weight: ["400", "600"], variable: "--ff-hand", display: "swap" });
