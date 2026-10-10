# Dakshina Learnings — Website

Cinematic, responsive front-end for **Dakshina Learnings Civil Service Academy**, Thiruvananthapuram.
Next.js (App Router) · TypeScript (strict) · Tailwind CSS v4 · Three.js / React Three Fiber / Drei · GSAP ScrollTrigger · Framer Motion · Lenis.

Front-end only: there is no database or server code. Enquiries go to the academy by **WhatsApp**, with **call** and **Instagram** as the other channels.

---

## 1. Quick start (Windows / macOS / Linux)

Requires **Node.js 20.9+** (Node 22 LTS recommended).

```bash
npm install
copy .env.example .env.local      # Windows  (macOS/Linux: cp .env.example .env.local)
npm run dev                       # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

Full check (types, lint, unit tests, production build):

```bash
npm run check
```

## 2. Contact integrations — fill these in first

Open `.env.local` and add the **verified** academy details:

| Variable | Example | Used for |
|---|---|---|
| `NEXT_PUBLIC_PHONE` | `919876543210` | Click-to-call buttons (header, footer, contact cards, floating dock) |
| `NEXT_PUBLIC_WHATSAPP` | `919876543210` | WhatsApp buttons and the enquiry form. Falls back to the phone number |
| `NEXT_PUBLIC_EMAIL` | `info@…` | Footer and contact page |
| `NEXT_PUBLIC_ADDRESS_LINE` | `…, Thiruvananthapuram` | Footer, contact, library, structured data |
| `NEXT_PUBLIC_MAPS_URL` | Google Maps link | "Open in Google Maps" |
| `NEXT_PUBLIC_YOUTUBE_URL` / `NEXT_PUBLIC_FACEBOOK_URL` | | Footer social icons |

**If a value is blank, its button is hidden.** The site never shows a made-up number.
Instagram (`@dakshinalearnings`) is already set in `src/lib/site.ts` and `src/lib/contact.ts`.

What each integration does:

- **WhatsApp**: a floating dock on every page, with a pre-filled message that changes on programme pages. Programme pages and contact cards have their own buttons. The **enquiry form** checks the details, then opens WhatsApp with a formatted message. The visitor taps *Send*, and the site says exactly that. It never claims the enquiry was "submitted".
- **Call**: `tel:` links in the header (desktop), mobile menu, footer, contact cards and dock.
- **Instagram**: profile link plus a direct-message link (`ig.me/m/dakshinalearnings`) in the dock, contact cards, footer and enquiry fallback.

Restart `npm run dev` after editing `.env.local`.

## 3. Editing content

All content lives in typed data files. No CMS is needed.

| File | What it controls |
|---|---|
| `src/data/programmes.ts` | Programmes and their detail pages. Set `duration`, `mode`, `batch`, `fees` once confirmed (`null` shows "Shared on enquiry"). Set `confirmed: true` after sign-off |
| `src/data/news-sample.ts` | Daily News Desk stories. Add real analyses to `stories` (newest first) |
| `src/data/faculty.ts` | Faculty profiles and **verified** testimonials (both empty by default, with honest empty states) |
| `src/data/books.ts` | The 3D book library: titles, concepts, colours |
| `src/data/faq.ts`, `journey.ts`, `resources.ts`, `practice-question.ts` | FAQs, the UPSC journey, official links, the Prelims practice question |
| `src/data/media.ts` | Images. Replace the illustrative SVGs with real academy photos here (`src`, `width`, `height`, optional portrait `mobile` crop, `illustrative: false`) |
| `src/lib/site.ts` | Name, tagline, navigation, social handles |

## 4. Project structure

```
src/
  app/                    routes (home, about, programmes/[slug], prelims-hacker, current-affairs/[slug],
                          learning-method, library, faculty, results, resources, admissions, contact,
                          privacy-policy, terms), sitemap.ts, robots.ts, opengraph-image.tsx, icon
  components/
    hero/                 cinematic 3D desk scene + GSAP intro timeline
    books/                scroll-driven 3D book library (sticky scene + chapter panel + static fallback)
    storytelling/         activity notebook, news desk, Prelims elimination lab, journey, ID-card transformation
    three/                shared WebGL: SceneCanvas (fallback, pause off-screen, adaptive DPR), Book3D,
                          light-shaft & dust GLSL shaders, canvas-generated textures
    contact/              ContactFab (floating WhatsApp · Call · Instagram dock), ContactActions cards
    forms/                EnquiryForm (zod validation → WhatsApp)
    layout/ ui/ home/ programmes/
  data/  lib/
public/images/            logo + original SVG illustrations
tests/                    vitest unit tests (contact links, validation)
```

## 5. Engineering notes

- **One scroll engine**: Lenis is driven by GSAP's ticker, so ScrollTrigger reads the same scroll value. It's disabled on touch devices and for `prefers-reduced-motion`.
- **3D performance**: scenes are dynamically imported (`ssr: false`) and stop rendering when off-screen. DPR adapts through `PerformanceMonitor`. Phones and low-memory devices get fewer particles and no shadow maps. All textures are drawn to canvas at runtime, so there are no texture downloads.
- **Fallbacks**: without WebGL the hero shows an illustration and the library becomes a static grid. With reduced motion, every scroll animation becomes a static layout. Hero text is server-rendered, and a CSS failsafe reveals it after 3 s if JavaScript never runs.
- **Responsive**: fluid `clamp()` type and spacing, separate phone compositions (3D stage above the text, never under it), `svh` units, `<picture>` art direction for portrait crops, `overflow-x: clip` (sticky-safe).
- **Honesty**: book covers are original typographic designs. The ID card is clearly fictional (no emblem or seal). The practice question is labelled as not a previous-year question. No invented results, fees, faculty or numbers.

## 6. Deploy

**Vercel** (simplest): import the repo, add the `NEXT_PUBLIC_*` variables under *Settings → Environment Variables*, then deploy.
Any Node host works too: `npm run build && npm start`.

## 7. Test checklist

Test at 320, 375, 430, 768, 1024, 1440 and 1920 px. Also test with reduced motion on, WebGL off (`chrome://flags` → disable WebGL), 200% zoom, keyboard-only navigation, and a slow network (DevTools → Network → Slow 4G).
