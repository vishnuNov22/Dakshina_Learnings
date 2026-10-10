import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PrelimsExplorer } from "./PrelimsExplorer";

const pillars = [
  { n: "01", t: "Previous-year questions", d: "Read the paper the way the examiner writes it." },
  { n: "02", t: "Year-wise trends", d: "See which themes recur, and how their framing shifts." },
  { n: "03", t: "Topic analysis", d: "Map questions to sub-topics to set revision priorities." },
  { n: "04", t: "Elimination strategies", d: "Use certainty and extreme words to narrow options." },
  { n: "05", t: "Revision priorities", d: "Spend time where marks actually come from." },
  { n: "06", t: "Practice workflows", d: "Timed tests, error logs and revision loops." },
];

export function PrelimsTeaser() {
  return (
    <section aria-labelledby="prelims-title" className="grain section-y relative overflow-hidden bg-charcoal text-ivory">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent_0_39px,rgba(245,240,230,0.03)_39px_40px)]" />
      <div className="container-x relative z-[2] grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow mb-5 flex items-center gap-3 text-gold">
            <span aria-hidden className="h-px w-8 bg-current opacity-60" />
            Prelims Hacker Program
          </p>
          <h2 id="prelims-title" className="text-step-4">
            Prepare With Strategy. <em className="text-gold-soft">Practise With Purpose.</em>
          </h2>
          <p className="mt-6 text-step-1 text-ivory/70">
            Prelims rewards accuracy under pressure. The Prelims Hacker Program is built around how questions are actually set — and how to answer them with confidence.
          </p>
          <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.05} className="min-w-0 border-t border-ivory/15 pt-4">
                <p className="font-mono text-xs text-gold">{p.n}</p>
                <p className="mt-1 font-serif text-step-2">{p.t}</p>
                <p className="mt-1 text-sm text-ivory/60">{p.d}</p>
              </Reveal>
            ))}
          </ol>
          <Link href="/prelims-hacker" className={buttonClass("gold", "mt-10")}>
            Explore the programme <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <Reveal className="min-w-0 lg:pt-16">
          <PrelimsExplorer />
        </Reveal>
      </div>
    </section>
  );
}
