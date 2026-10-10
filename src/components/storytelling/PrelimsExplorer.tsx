"use client";

import { useState } from "react";
import clsx from "clsx";
import { Check, RotateCcw, X } from "lucide-react";
import { practiceQuestion as q } from "@/data/practice-question";

/** Interactive elimination lab: strike out options, then reveal the reasoning step by step. */
export function PrelimsExplorer() {
  const [struck, setStruck] = useState<Set<string>>(new Set());
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(0);

  const toggle = (k: string) =>
    setStruck((s) => {
      const n = new Set(s);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  const reset = () => {
    setStruck(new Set());
    setPicked(null);
    setRevealed(0);
  };
  const correct = q.options.find((o) => o.correct)?.key;

  return (
    <div className="paper min-w-0 rounded-sm p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-ink/30 pb-4">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-red">{q.label}</p>
        <button type="button" onClick={reset} className="tap inline-flex items-center gap-1.5 text-xs text-ink/60 hover:text-ink">
          <RotateCcw size={14} aria-hidden /> Reset
        </button>
      </div>
      <p className="mt-5 font-serif text-step-1 text-ink">{q.stem}</p>
      <ol className="mt-4 space-y-2 text-[0.95rem] text-ink/85">
        {q.statements.map((s, n) => (
          <li key={s} className="flex gap-3">
            <span className="font-mono text-sm">{n + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[0.95rem] font-semibold text-ink">{q.question}</p>

      <fieldset className="mt-4">
        <legend className="sr-only">Options — choose one, or strike out options you can eliminate</legend>
        <ul className="grid gap-2 sm:grid-cols-2">
          {q.options.map((o) => {
            const isStruck = struck.has(o.key);
            const isPicked = picked === o.key;
            const showResult = picked !== null;
            return (
              <li key={o.key} className="flex min-w-0 items-stretch gap-2">
                <button
                  type="button"
                  onClick={() => setPicked(o.key)}
                  aria-pressed={isPicked}
                  className={clsx(
                    "tap flex min-w-0 flex-1 items-center gap-3 rounded-md border px-3 py-2.5 text-left text-[0.95rem] transition-colors",
                    isStruck && "text-ink/35 line-through decoration-red decoration-2",
                    showResult && o.key === correct ? "border-[#2f6b45] bg-[#2f6b45]/10" : isPicked ? "border-red bg-red/5" : "border-ink/20 hover:border-ink/50",
                  )}
                >
                  <span className="font-mono text-sm">({o.key})</span>
                  <span className="min-w-0">{o.text}</span>
                  {showResult && o.key === correct ? <Check size={16} className="ml-auto shrink-0 text-[#2f6b45]" aria-label="Correct answer" /> : null}
                  {isPicked && o.key !== correct ? <X size={16} className="ml-auto shrink-0 text-red" aria-label="Incorrect" /> : null}
                </button>
                <button
                  type="button"
                  onClick={() => toggle(o.key)}
                  aria-pressed={isStruck}
                  aria-label={`${isStruck ? "Restore" : "Eliminate"} option ${o.key}`}
                  className="tap grid w-11 shrink-0 place-items-center rounded-md border border-ink/20 font-mono text-xs text-ink/60 hover:border-red hover:text-red"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-6 border-t border-dashed border-ink/30 pt-5">
        <p className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-ink/60">Elimination walkthrough</p>
        <ol className="mt-3 space-y-3">
          {q.steps.slice(0, revealed).map((s, n) => (
            <li key={s.title} className="animate-[dl-in_0.5s_ease_both] rounded-md bg-ink/[0.04] p-4">
              <p className="font-semibold text-ink">
                <span className="mr-2 font-hand text-xl text-red">{n + 1}</span>
                {s.title}
              </p>
              <p className="mt-1 text-[0.95rem] text-ink/75">{s.body}</p>
            </li>
          ))}
        </ol>
        {revealed < q.steps.length ? (
          <button type="button" onClick={() => setRevealed((r) => r + 1)} className="tap mt-3 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-blue">
            {revealed === 0 ? "Show the reasoning" : "Next step"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
