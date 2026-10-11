import { ProgrammeDetail } from "@/components/programmes/ProgrammeDetail";
import { PrelimsExplorer } from "@/components/storytelling/PrelimsExplorer";
import { getProgramme } from "@/data/programmes";
import { photos } from "@/data/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Prelims Hacker Program",
  description: "Strategy-first UPSC Prelims preparation: previous-year question analysis, topic trends, elimination strategies and revision priorities.",
  path: "/prelims-hacker",
});

export default function PrelimsHackerPage() {
  const p = getProgramme("prelims-hacker")!;
  return (
    <ProgrammeDetail photo={photos.answerWriting} p={{ ...p, title: "Prelims Hacker Program", kicker: "Prepare With Strategy. Practise With Purpose." }}>
      <section className="min-w-0 py-10">
        <h2 className="text-step-3 text-ink">Try the elimination lab</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Strike out options you can rule out, choose an answer, then reveal the reasoning. This is the habit the programme builds — on real previous-year papers.
        </p>
        <div className="mt-8">
          <PrelimsExplorer />
        </div>
      </section>
    </ProgrammeDetail>
  );
}
