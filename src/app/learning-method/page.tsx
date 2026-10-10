import { PageHeader } from "@/components/layout/PageHeader";
import { ActivityLearning } from "@/components/storytelling/ActivityLearning";
import { EnquiryCta } from "@/components/home/Sections";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Learning Methodology",
  description: "Activity-based learning at Dakshina Learnings: question decoding, dimension mapping, current-affairs linkage and guided answer writing for UPSC.",
  path: "/learning-method",
});

const cycle = [
  { t: "Read", d: "Targeted reading from standard sources and the newspaper — with the syllabus as the filter." },
  { t: "Decode", d: "Break questions into directives, scope and dimensions before reaching for facts." },
  { t: "Discuss", d: "Test ideas in class discussion. Disagreement sharpens judgement." },
  { t: "Write", d: "Short, regular answer-writing to turn understanding into exam-ready expression." },
  { t: "Review", d: "Feedback, error logs and revision loops close the cycle." },
];

export default function LearningMethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="Learning methodology"
        title={<>Learning by <em className="text-gold-soft">doing.</em></>}
        lede="Activity-based learning puts the thinking the examination demands at the centre of every class."
        crumbs={[{ label: "Learning Methodology", href: "/learning-method" }]}
      />
      <section className="section-y bg-navy-2">
        <ol className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {cycle.map((c, i) => (
            <Reveal as="li" key={c.t} delay={i * 0.06} className="min-w-0 rounded-2xl bg-ivory/[0.04] p-6 ring-1 ring-ivory/10">
              <p className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-step-3">{c.t}</h2>
              <p className="mt-3 text-[0.95rem] text-ivory/65">{c.d}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <ActivityLearning />
      <EnquiryCta />
    </>
  );
}
