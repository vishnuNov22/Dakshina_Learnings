import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories, type Story } from "@/data/news-sample";
import { Reveal } from "@/components/ui/Reveal";
import { PendingNote } from "@/components/ui/PendingNote";

const analysisRows = (s: Story) => [
  { k: "What happened?", v: s.whatHappened },
  { k: "Why it matters", v: s.whyItMatters },
  { k: "Background", v: s.background },
];

export function StoryAnalysis({ story, headingLevel = "h3" }: { story: Story; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="grid gap-0 border-t-2 border-ink lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
      <div className="min-w-0 border-ink/20 py-8 lg:border-r lg:pr-10">
        <div className="flex flex-wrap items-center gap-3">
          {story.isSample ? <PendingNote>Format sample · not a news report</PendingNote> : null}
          {story.subjects.map((s) => (
            <span key={s} className="rounded-full bg-blue/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-blue">
              {s}
            </span>
          ))}
        </div>
        <H className="mt-5 text-step-3 text-ink">{story.headline}</H>
        <p className="mt-4 text-step-1 text-ink/70">{story.summary}</p>
        <dl className="mt-8 grid gap-6 md:grid-cols-3">
          {analysisRows(story).map((r) => (
            <div key={r.k} className="min-w-0 border-t border-ink/20 pt-4">
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-red">{r.k}</dt>
              <dd className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">{r.v}</dd>
            </div>
          ))}
        </dl>
        {story.sourceUrl ? (
          <p className="mt-6 text-sm text-ink/60">
            Source:{" "}
            <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
              {story.sourceName ?? story.sourceUrl}
            </a>
          </p>
        ) : null}
      </div>
      <aside className="min-w-0 py-8 lg:pl-10">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/60">Analytical dimensions</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {story.dimensions.map((d) => (
            <li key={d} className="rounded-md border border-ink/25 px-2.5 py-1 text-sm text-ink/80">{d}</li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink/60">Answer-writing connections</p>
        <ol className="mt-3 space-y-3">
          {story.answerLinks.map((a, n) => (
            <li key={a} className="flex gap-3 text-[0.95rem] text-ink/85">
              <span className="font-hand text-xl leading-none text-red">{n + 1}.</span>
              <span>{a}</span>
            </li>
          ))}
        </ol>
      </aside>
    </article>
  );
}

export function NewsDesk() {
  const story = stories[0]!;
  return (
    <section aria-labelledby="news-title" className="paper section-y">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col gap-2 border-b-4 border-double border-ink pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink/60">Dakshina Learnings · Daily News Desk</p>
              <h2 id="news-title" className="mt-2 text-step-4 text-ink">
                The news, <em className="text-red">read for the exam.</em>
              </h2>
            </div>
            <p className="max-w-xs text-sm text-ink/60 sm:text-right">
              Daily analysis linking headlines to the syllabus — including The Hindu analysis in Malayalam.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <StoryAnalysis story={story} />
        </Reveal>
        <div className="mt-4 flex flex-col gap-4 border-t border-ink/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink/60">Ask the academy for the current timing and format of the News Desk.</p>
          <Link href="/current-affairs" className="inline-flex items-center gap-2 font-semibold text-ink underline-offset-4 hover:underline">
            Visit the News Desk <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
