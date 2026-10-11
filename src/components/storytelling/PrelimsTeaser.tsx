import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { PrelimsExplorer } from "./PrelimsExplorer";

const pillars = [
  { t: "Previous-year questions", d: "Read the paper the way the examiner writes it." },
  { t: "Year-wise trends", d: "See which themes recur and how their framing shifts." },
  { t: "Topic analysis", d: "Map questions to sub-topics to set revision priorities." },
  { t: "Elimination strategies", d: "Use certainty and extreme words to narrow options." },
  { t: "Revision priorities", d: "Spend time where the marks actually come from." },
  { t: "Practice workflows", d: "Timed tests, error logs and revision loops." },
];

export function PrelimsTeaser() {
  return (
    <section aria-labelledby="prelims-title" className="section-y relative overflow-hidden bg-brand-dark text-white">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,rgba(132,72,192,0.55),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(108,54,174,0.5),transparent)]" />
      <div className="container-x relative grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow mb-6 flex items-center gap-3 text-white/80">
            <span aria-hidden className="h-px w-10 bg-current" />
            Prelims Hacker Program
          </p>
          <h2 id="prelims-title" className="text-step-4">
            Prepare With Strategy. <span className="italic text-[#d9c4f3]">Practise With Purpose.</span>
          </h2>
          <p className="mt-7 text-step-1 text-white/80">
            Prelims rewards accuracy under pressure. The Prelims Hacker Program is built around how questions are actually set, and how to answer them with confidence.
          </p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.04} className="min-w-0 bg-brand-dark/60 p-6 backdrop-blur">
                <p className="font-serif text-xl italic text-[#d9c4f3]">0{i + 1}</p>
                <p className="mt-2 font-semibold">{p.t}</p>
                <p className="mt-1 text-sm text-white/70">{p.d}</p>
              </Reveal>
            ))}
          </ol>
          <Link href="/prelims-hacker" className={buttonClass("white", "mt-12")}>
            Explore the programme <ArrowRight size={17} aria-hidden />
          </Link>
        </div>
        <Reveal className="min-w-0 lg:pt-10">
          <PrelimsExplorer />
        </Reveal>
      </div>
    </section>
  );
}
