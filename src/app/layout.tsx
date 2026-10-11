import type { Metadata, Viewport } from "next";
import "./globals.css";
import { serif, sans, mono, hand } from "@/lib/fonts";
import { site } from "@/lib/site";
import { contact, formatPhoneDisplay, telLink } from "@/lib/contact";
import { organisationJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { IntroCurtain } from "@/components/layout/IntroCurtain";
import { ContactFab } from "@/components/contact/ContactFab";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — UPSC Civil Services Academy, Thiruvananthapuram`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "UPSC coaching Thiruvananthapuram",
    "IAS academy Trivandrum",
    "civil services coaching Kerala",
    "Prelims Hacker Program",
    "UPSC current affairs Malayalam",
    "Dakshina Learnings",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — From Aspirant to Officer`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#6C36AE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Adds `js` (and `reduce-motion`) to <html> before first paint so animated text
// is only hidden when the animation can actually run.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduce-motion')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tel = telLink(contact.phone);
  return (
    <html
      lang="en-IN"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={organisationJsonLd()} />
      </head>
      <body>
        <IntroCurtain />
        <SmoothScroll />
        <SiteHeader phoneHref={tel} phoneLabel={contact.phone ? formatPhoneDisplay(contact.phone) : null} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <ContactFab whatsapp={contact.whatsapp} phone={contact.phone} />
      </body>
    </html>
  );
}
