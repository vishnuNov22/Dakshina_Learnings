import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { StoryAnalysis } from "@/components/storytelling/NewsDesk";
import { EnquiryCta } from "@/components/home/Sections";
import { stories } from "@/data/news-sample";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Current Affairs · Daily News Desk",
  description: "Dakshina Learnings' Daily News Desk connects the news to the UPSC syllabus, including The Hindu analysis in Malayalam.",
  path: "/current-affairs",
});

export default function CurrentAffairsPage() {
  return (
    <>
      <PageHeader
        tone="paper"
        eyebrow="Daily News Desk"
        title={<>The news, <em className="text-red">read for the exam.</em></>}
        lede="Every story is broken into what happened, why it matters, its background, the subjects it touches and how it can enter an answer. The academy reports daily analysis, including The Hindu analysis in Malayalam."
        crumbs={[{ label: "Current Affairs", href: "/current-affairs" }]}
      />
      <section className="paper pb-[var(--section-y)]">
        <div className="container-x space-y-16">
          {stories.map((s) => (
            <div key={s.slug}>
              <StoryAnalysis story={s} headingLevel="h2" />
              <Link href={`/current-affairs/${s.slug}`} className="text-sm font-semibold text-ink underline underline-offset-4">
                Open this analysis
              </Link>
            </div>
          ))}
          <p className="max-w-2xl border-t border-ink/15 pt-6 text-sm text-ink/60">
            For the latest daily analysis and class timings, follow the academy on Instagram or contact the team.
          </p>
        </div>
      </section>
      <EnquiryCta />
    </>
  );
}
