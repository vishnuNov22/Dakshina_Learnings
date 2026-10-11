import { PageHeader } from "@/components/layout/PageHeader";
import { photos } from "@/data/media";
import { EnquiryCta } from "@/components/home/Sections";
import { JourneyTimeline } from "@/components/storytelling/JourneyTimeline";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Dakshina Learnings",
  description: "Dakshina Learnings is a civil services academy in Thiruvananthapuram preparing aspirants for the UPSC CSE through activity-based learning, current affairs and mentoring.",
  path: "/about",
});

const principles = [
  { t: "Think before you memorise", d: "Concepts and connections come first. Facts stick better when they have somewhere to live." },
  { t: "Learn by doing", d: "Activity-based sessions turn passive reading into active preparation: decode, discuss, write, review." },
  { t: "Read the news with purpose", d: "Current affairs are analysed for what they mean for the syllabus — not collected for their own sake." },
  { t: "Prepare with strategy", d: "Programmes such as Prelims Hacker focus effort where the examination actually awards marks." },
  { t: "Honesty about outcomes", d: "No institute can guarantee selection. We promise structure, guidance and practice — the rest is your work." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        photoClassName="aspect-[1024/500] w-full"
        photo={photos.team}
        eyebrow="About the academy"
        title={<>Where aspirants learn to <span className="accent">think like officers.</span></>}
        lede="Dakshina Learnings is a civil services academy in Thiruvananthapuram, Kerala, dedicated to UPSC Civil Services Examination preparation."
        crumbs={[{ label: "About", href: "/about" }]}
      />
      <section className="bg-white section-y">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          <div className="min-w-0">
            <p className="eyebrow text-brand">Our approach</p>
            <p className="mt-6 font-serif text-step-3 text-ink">
              Building tomorrow&rsquo;s civil servants — one question, one discussion, one answer at a time.
            </p>
          </div>
          <ol className="min-w-0 divide-y divide-line border-y border-line">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.05} className="grid gap-2 py-6 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-step-2 text-ink">{p.t}</h2>
                  <p className="mt-1 text-ink-soft">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <JourneyTimeline />
      <EnquiryCta />
    </>
  );
}
