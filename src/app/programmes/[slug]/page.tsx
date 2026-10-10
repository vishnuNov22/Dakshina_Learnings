import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ProgrammeDetail } from "@/components/programmes/ProgrammeDetail";
import { getProgramme, programmes } from "@/data/programmes";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return programmes.filter((p) => p.slug !== "prelims-hacker").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.summary, path: `/programmes/${p.slug}` });
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "prelims-hacker") redirect("/prelims-hacker");
  const p = getProgramme(slug);
  if (!p) notFound();
  return <ProgrammeDetail p={p} />;
}
