"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type KeyboardEvent } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Step = {
  key: string;
  label: string;
  title: string;
  note: string;
  points: string[];
  scribble: string;
  diagram: "decode" | "dimensions" | "facts" | "argument" | "structure" | "conclusion";
};

const QUESTION = "How can urbanisation create both opportunities and challenges for India?";

const steps: Step[] = [
  {
    key: "understand",
    label: "Understand",
    title: "Understand the question",
    note: "Circle the directive and the hidden demand.",
    points: ["Directive: “How can…” → explain mechanisms, not just list", "“Both” → a balanced answer is mandatory", "Scope: India, present and near future"],
    scribble: "both = balance!",
    diagram: "decode",
  },
  {
    key: "dimensions",
    label: "Dimensions",
    title: "Identify the key dimensions",
    note: "Think in lenses before you think in facts.",
    points: ["Economic — agglomeration, jobs, productivity", "Social — mobility, informality, inequality", "Environmental — heat, water, waste, floods", "Governance — capacity of urban local bodies"],
    scribble: "E · S · Env · G",
    diagram: "dimensions",
  },
  {
    key: "facts",
    label: "Connect facts",
    title: "Connect relevant facts",
    note: "Anchor each lens in something verifiable.",
    points: ["74th Amendment (1992): constitutional status for urban local bodies", "Twelfth Schedule: 18 functional items for municipalities", "Census definitions: statutory towns vs census towns", "Recent schemes & reports from official sources"],
    scribble: "cite, don't claim",
    diagram: "facts",
  },
  {
    key: "argument",
    label: "Argue",
    title: "Build an argument",
    note: "Every opportunity has a condition attached.",
    points: ["Cities drive growth — if infrastructure keeps pace", "Migration lifts incomes — if housing and services follow", "Density can be green — if planning prioritises transit", "Show cause → effect → condition"],
    scribble: "if… then…",
    diagram: "argument",
  },
  {
    key: "structure",
    label: "Organise",
    title: "Organise the answer",
    note: "A shape the examiner can read in seconds.",
    points: ["Intro: scale of urbanisation (one line, one fact)", "Body A: opportunities, grouped by lens", "Body B: challenges, mirrored to Body A", "A simple diagram if time allows"],
    scribble: "Intro → A | B → End",
    diagram: "structure",
  },
  {
    key: "conclusion",
    label: "Conclude",
    title: "Develop a balanced conclusion",
    note: "End forward-looking and implementable.",
    points: ["Restate the balance in one sentence", "Offer two or three concrete reforms", "Link to a constitutional or developmental goal", "Avoid slogans; prefer specifics"],
    scribble: "way forward ✓",
    diagram: "conclusion",
  },
];

function Diagram({ kind, reduce }: { kind: Step["diagram"]; reduce: boolean | null }) {
  const draw = reduce
    ? {}
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } };
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 260 150" className="h-auto w-full max-w-[260px] text-brand" aria-hidden>
      {kind === "decode" && (
        <>
          <motion.ellipse cx="62" cy="40" rx="50" ry="20" {...common} {...draw} />
          <motion.ellipse cx="190" cy="40" rx="42" ry="20" {...common} {...draw} />
          <motion.path d="M62 62 C70 100 120 110 130 130 M190 62 C180 100 140 110 130 130" {...common} {...draw} />
          <text x="62" y="45" textAnchor="middle" className="fill-ink font-hand text-[18px]">How can</text>
          <text x="190" y="45" textAnchor="middle" className="fill-ink font-hand text-[18px]">both</text>
        </>
      )}
      {kind === "dimensions" && (
        <>
          <motion.circle cx="130" cy="75" r="26" {...common} {...draw} />
          {[[40, 25], [220, 25], [40, 125], [220, 125]].map(([x, y]) => (
            <motion.path key={`${x}${y}`} d={`M130 75 L${x} ${y}`} {...common} {...draw} />
          ))}
          <text x="130" y="80" textAnchor="middle" className="fill-ink font-hand text-[16px]">Urban</text>
        </>
      )}
      {kind === "facts" && (
        <>
          {[20, 60, 100].map((y) => (
            <motion.rect key={y} x="20" y={y} width="220" height="28" rx="4" {...common} {...draw} />
          ))}
          <motion.path d="M245 34 C258 60 258 90 245 114" {...common} {...draw} />
        </>
      )}
      {kind === "argument" && (
        <>
          <motion.path d="M20 75 H90 M130 75 H200" {...common} {...draw} />
          <motion.path d="M80 65 L92 75 L80 85 M190 65 L202 75 L190 85" {...common} {...draw} />
          <text x="20" y="62" className="fill-ink font-hand text-[16px]">cause</text>
          <text x="98" y="80" className="fill-ink font-hand text-[16px]">effect</text>
          <text x="206" y="80" className="fill-ink font-hand text-[16px]">if…</text>
        </>
      )}
      {kind === "structure" && (
        <>
          <motion.rect x="20" y="15" width="220" height="24" rx="4" {...common} {...draw} />
          <motion.rect x="20" y="50" width="104" height="60" rx="4" {...common} {...draw} />
          <motion.rect x="136" y="50" width="104" height="60" rx="4" {...common} {...draw} />
          <motion.rect x="20" y="120" width="220" height="20" rx="4" {...common} {...draw} />
        </>
      )}
      {kind === "conclusion" && (
        <>
          <motion.path d="M20 120 C80 120 90 40 150 40 S230 30 240 20" {...common} {...draw} />
          <motion.path d="M226 16 L242 19 L236 34" {...common} {...draw} />
        </>
      )}
    </svg>
  );
}

export function ActivityLearning() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const id = useId();
  const step = steps[i] ?? steps[0]!;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") setI((v) => (v + 1) % steps.length);
    if (e.key === "ArrowLeft") setI((v) => (v - 1 + steps.length) % steps.length);
  };

  return (
    <section aria-labelledby="activity-title" className="section-y relative overflow-hidden bg-mist">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow mb-6 flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-10 bg-current" />
              Activity-based learning
            </p>
            <h2 id="activity-title" className="text-step-4">
              Don&rsquo;t Just Read the News. <span className="accent">Learn to Think About It.</span>
            </h2>
            <p className="mt-6 text-step-1 text-ink-soft">
              Classes at Dakshina are built around doing: decoding questions, mapping dimensions and building answers together. Try one — step through a UPSC-style question below.
            </p>
            <p className="mt-6 font-mono text-xs text-ink-soft">Tip: use ← → keys inside the notebook.</p>
          </div>

          {/* The notebook */}
          <div
            className="min-w-0 rounded-[28px] bg-white shadow-[0_40px_80px_-40px_rgba(29,11,54,0.45)] ring-1 ring-line"
            onKeyDown={onKey}
          >
            <div className="border-b border-line p-5 sm:p-7">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-brand">Practice question · GS Paper I style</p>
              <p className="mt-2 font-serif text-step-2 text-ink">{QUESTION}</p>
            </div>

            <div role="tablist" aria-label="Answer-building steps" className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 [scrollbar-width:none] sm:px-5">
              {steps.map((s, n) => (
                <button
                  key={s.key}
                  id={`${id}-tab-${n}`}
                  role="tab"
                  type="button"
                  aria-selected={n === i}
                  aria-controls={`${id}-panel`}
                  tabIndex={n === i ? 0 : -1}
                  onClick={() => setI(n)}
                  className={clsx(
                    "tap shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors",
                    n === i ? "bg-brand text-white" : "text-ink-soft hover:bg-mist hover:text-ink",
                  )}
                >
                  <span className="mr-1.5 font-mono text-[0.65rem] opacity-60">{n + 1}</span>
                  {s.label}
                </button>
              ))}
            </div>

            <div
              id={`${id}-panel`}
              role="tabpanel"
              aria-labelledby={`${id}-tab-${i}`}
              className="relative grid min-h-[22rem] gap-6 p-5 sm:p-7 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
              style={{
                backgroundImage: "repeating-linear-gradient(transparent 0 31px, rgba(36,76,118,0.12) 31px 32px)",
                backgroundPositionY: "8px",
              }}
            >
              <span aria-hidden className="absolute bottom-0 left-3 top-0 w-px bg-brand/30 sm:left-5" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.key}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="min-w-0 pl-3"
                >
                  <h3 className="font-serif text-step-2 text-ink">{step.title}</h3>
                  <p className="mt-1 font-hand text-[1.35rem] leading-tight text-brand-deep">{step.note}</p>
                  <ul className="mt-4 space-y-2 text-[0.98rem] text-ink">
                    {step.points.map((p, n) => (
                      <motion.li
                        key={p}
                        initial={reduce ? false : { opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + n * 0.1 }}
                        className="flex gap-2.5"
                      >
                        <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{p}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <div className="flex min-w-0 flex-col items-center justify-center gap-3 pl-3 md:items-start">
                <Diagram key={step.key} kind={step.diagram} reduce={reduce} />
                <p className="-rotate-2 font-hand text-[1.6rem] text-brand">{step.scribble}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setI((v) => Math.max(0, v - 1))}
                disabled={i === 0}
                className="tap inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-ink-soft hover:text-ink disabled:opacity-30"
              >
                <ArrowLeft size={16} aria-hidden /> Previous
              </button>
              <div className="h-1 w-24 overflow-hidden rounded-full bg-ink/10 sm:w-40" aria-hidden>
                <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${((i + 1) / steps.length) * 100}%` }} />
              </div>
              <button
                type="button"
                onClick={() => setI((v) => Math.min(steps.length - 1, v + 1))}
                disabled={i === steps.length - 1}
                className="tap inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:text-brand disabled:opacity-30"
              >
                Next step <ArrowRight size={16} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
