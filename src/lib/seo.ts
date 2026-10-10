import type { Metadata } from "next";
import { site } from "./site";
import { contact } from "./contact";

export function pageMetadata(opts: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${site.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: `${opts.title} · ${site.name}`,
      description: opts.description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      ...(opts.image ? { images: [{ url: opts.image }] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${opts.title} · ${site.name}`, description: opts.description },
  };
}

/** Organisation structured data — only verified fields are emitted. */
export function organisationJsonLd() {
  const sameAs = [site.instagram.url, site.threads.url, contact.youtube, contact.facebook].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/images/logo-256.png`,
    description: site.description,
    areaServed: { "@type": "City", name: site.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
      ...(contact.addressLine ? { streetAddress: contact.addressLine } : {}),
    },
    ...(contact.phone ? { telephone: `+${contact.phone}` } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    sameAs,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
