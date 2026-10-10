import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { programmes, programmeHref } from "@/data/programmes";
import { stories } from "@/data/news-sample";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/about", "/programmes", "/prelims-hacker", "/current-affairs", "/learning-method", "/library", "/faculty", "/results", "/resources", "/admissions", "/contact", "/privacy-policy", "/terms"];
  return [
    ...statics.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...programmes.filter((p) => p.slug !== "prelims-hacker").map((p) => ({ url: `${site.url}${programmeHref(p.slug)}`, lastModified: now, priority: 0.8 })),
    ...stories.filter((s) => !s.isSample).map((s) => ({ url: `${site.url}/current-affairs/${s.slug}`, lastModified: s.publishedAt ? new Date(s.publishedAt) : now, priority: 0.6 })),
  ];
}
