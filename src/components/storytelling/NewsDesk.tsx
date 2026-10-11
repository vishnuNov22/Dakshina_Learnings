import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories, type Story } from "@/data/news-sample";
import { photos } from "@/data/media";
import { Reveal } from "@/components/ui/Reveal";
import { PendingNote } from "@/components/ui/PendingNote";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";

const analysisRows = (s: Story) => [
  { k: "What happened?", v: s.whatHappened },
  { k: "Why it matters", v: s.whyItMatters },
  { k: "Background", v: s.background },
];

export function StoryAnalysis({ story, headingLevel = "h3" }: { story: Story; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_80px_-50px_rgba(29,11,54,0.45)] ring-1 ring-line">
      <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="min-w-0 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2">
            {story.isSample ? <PendingNote>Format sample · not a news report</PendingNote> : null}
            {story.subjects.map((s) => (
              <span key={s} className="rounded-full bg-mist px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-brand-deep">
                {s}
              </span>
            ))}
          </div>
          <H className="mt-6 text-step-3 text-ink">{story.headline}</H>
          <p className="mt-4 text-step-1 text-ink-soft">{story.summary}</p>
          <dl className="mt-10 grid gap-8 md:grid-cols-3">
            {analysisRows(story).map((r) => (
              <div key={r.k} className="min-w-0 border-t-2 border-brand pt-4">
                <dt className="eyebrow text-brand">{r.k}</dt>
                <dd className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{r.v}</dd>
              </div>
            ))}
          </dl>
          {story.sourceUrl ? (
            <p className="mt-6 text-sm text-ink-soft">
              Source:{" "}
              <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                {story.sourceName ?? story.sourceUrl}
              </a>
            </p>
          ) : null}
        </div>
        <aside className="min-w-0 bg-mist p-6 sm:p-10">
          <p className="eyebrow text-brand-deep">Analytical dimensions</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {story.dimensions.map((d) => (
              <li key={d} className="rounded-full bg-white px-3.5 py-1.5 text-sm text-ink ring-1 ring-line">{d}</li>
            ))}
          </ul>
          <p className="eyebrow mt-10 text-brand-deep">Answer-writing connections</p>
          <ol className="mt-4 space-y-4">
            {story.answerLinks.map((a, n) => (
              <li key={a} className="flex gap-3 text-[0.95rem] text-ink">
                <span className="font-serif text-xl italic leading-none text-brand">{n + 1}</span>
                <span>{a}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </article>
  );
}

export function NewsDesk() {
  const story = stories[0]!;
  return (
    <section aria-labelledby="news-title" className="section-y bg-white">
      <div className="container-x">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <SectionHeading
            id="news-title"
            eyebrow="Daily News Desk"
            title={
              <>
                The news, <span className="accent">read for the exam.</span>
              </>
            }
            lede="Daily analysis that links headlines to the syllabus, including The Hindu analysis in Malayalam."
          />
          <Photo photo={photos.newspaper} sizes="(min-width: 1024px) 40vw, 100vw" parallax={5} className="aspect-[16/10] w-full" />
        </div>
        <Reveal className="mt-14">
          <StoryAnalysis story={story} />
        </Reveal>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-soft">Ask the academy for the current timing and format of the News Desk.</p>
          <Link href="/current-affairs" className="inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline">
            Visit the News Desk <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
