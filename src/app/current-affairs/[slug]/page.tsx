import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StoryAnalysis } from "@/components/storytelling/NewsDesk";
import { getStory, stories } from "@/data/news-sample";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  return s ? pageMetadata({ title: s.headline, description: s.summary, path: `/current-affairs/${s.slug}` }) : {};
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  return (
    <>
      <PageHeader
        tone="paper"
        eyebrow="Daily News Desk"
        title={s.headline}
        crumbs={[
          { label: "Current Affairs", href: "/current-affairs" },
          { label: "Analysis", href: `/current-affairs/${s.slug}` },
        ]}
      />
      <section className="paper pb-[var(--section-y)]">
        <div className="container-x">
          <StoryAnalysis story={s} />
        </div>
      </section>
    </>
  );
}
