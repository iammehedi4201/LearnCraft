"use client";

import { useState, ReactNode } from "react";

// ─── Section Heading ───
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="font-black text-base text-ds-text-strong mb-3 flex items-center gap-2 tracking-tight">
      {children}
    </h4>
  );
}

// ─── Why Box ───
export function WhyBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 p-5 rounded-2xl border border-ds-stroke-soft bg-ds-bg-weak text-ds-text-strong shadow-sm">
      {children}
    </div>
  );
}

// ─── Analogy Box ───
export function AnalogyBox({ emoji, title, children }: { emoji: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-6 p-5 rounded-2xl border border-ds-info-light bg-ds-info-lighter shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{emoji}</span>
        <h5 className="font-bold text-sm text-ds-info-dark">{title}</h5>
      </div>
      <div className="text-sm text-ds-text-strong leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ─── Step List ───
export function StepList({ steps }: { steps: { label: string; note?: string; code?: string }[] }) {
  return (
    <ol className="space-y-5 mb-8">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <span
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-ds-static-white mt-0.5 bg-ds-feature-base shadow-sm"
          >
            {i + 1}
          </span>
          <div className="flex-1">
            <p className="text-sm text-ds-text-strong leading-relaxed">
              <strong>{step.label}</strong>
              {step.note && <span className="font-normal text-ds-text-soft"> — {step.note}</span>}
            </p>
            {step.code && (
              <div className="mt-2 text-xs font-mono bg-ds-bg-weak text-ds-text-strong p-3 rounded-xl border border-ds-stroke-soft">
                {step.code}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Mistake Box (Wrong vs Right) ───
export function MistakeBox({
  title,
  description,
  wrong,
  right,
}: {
  title: string;
  description: string;
  wrong: string;
  right: string;
}) {
  return (
    <div className="mb-8 p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
      <h4 className="font-bold text-ds-warning-dark mb-2 flex items-center gap-2 text-sm">
        <span>⚠️</span> Common mistake: {title}
      </h4>
      <p className="text-sm text-ds-text-sub mb-4 leading-relaxed">
        {description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-ds-bg-white rounded-xl border border-ds-error-base bg-ds-error-lighter/5">
          <span className="text-xs font-black text-ds-error-base block mb-2">
            ❌ Wrong
          </span>
          <code className="text-xs font-mono text-ds-text-strong whitespace-pre-wrap block">
            {wrong}
          </code>
        </div>
        <div className="p-4 bg-ds-bg-white rounded-xl border border-ds-success-base bg-ds-success-lighter/5">
          <span className="text-xs font-black text-ds-success-base block mb-2">
            ✅ Right
          </span>
          <code className="text-xs font-mono text-ds-text-strong whitespace-pre-wrap block">
            {right}
          </code>
        </div>
      </div>
    </div>
  );
}

// ─── Summary Box ───
export function SummaryBox({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 p-4 rounded-xl border-l-4 border-l-ds-feature-base border border-ds-stroke-soft bg-ds-bg-weak">
      <p className="text-sm text-ds-text-strong leading-relaxed">
        {children}
      </p>
    </div>
  );
}

// ─── Divider ───
export function Divider() {
  return <hr className="border-ds-stroke-soft mb-16" />;
}

// ─── Topic Header (numbered topic intro card) ───
export function TopicHeader({
  number,
  title,
  description,
  color = "primary",
}: {
  number: number | string;
  title: string;
  description: string;
  color?: "sky" | "emerald" | "amber" | "purple" | "rose" | "primary" | "secondary";
}) {
  const colorMap: Record<string, { bg: string; border: string; numBg: string; numText: string; titleText: string }> = {
    sky: {
      bg: "bg-ds-info-lighter",
      border: "border-ds-info-light",
      numBg: "bg-ds-info-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-info-dark",
    },
    emerald: {
      bg: "bg-ds-success-lighter",
      border: "border-ds-success-light",
      numBg: "bg-ds-success-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-success-dark",
    },
    amber: {
      bg: "bg-ds-warning-lighter",
      border: "border-ds-warning-light",
      numBg: "bg-ds-warning-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-warning-dark",
    },
    purple: {
      bg: "bg-ds-feature-lighter",
      border: "border-ds-feature-light",
      numBg: "bg-ds-feature-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-feature-dark",
    },
    rose: {
      bg: "bg-ds-error-lighter",
      border: "border-ds-error-light",
      numBg: "bg-ds-error-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-error-dark",
    },
    primary: {
      bg: "bg-ds-bg-weak",
      border: "border-ds-stroke-soft",
      numBg: "bg-ds-feature-base",
      numText: "text-ds-static-white font-black",
      titleText: "text-ds-text-strong",
    },
    secondary: {
      bg: "bg-ds-bg-white",
      border: "border-ds-stroke-soft",
      numBg: "bg-ds-bg-surface",
      numText: "text-ds-static-white dark:text-ds-static-black font-black",
      titleText: "text-ds-text-strong",
    },
  };

  const c = colorMap[color] || colorMap.primary;

  return (
    <div className={`p-5 ${c.bg} rounded-2xl border ${c.border} mb-8 flex items-start gap-4 shadow-sm`}>
      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black flex-shrink-0 mt-0.5 ${c.numBg} ${c.numText}`}>
        {number}
      </span>
      <div>
        <h3 className={`font-black text-xl ${c.titleText} mb-2 tracking-tight`}>{title}</h3>
        <p className="text-sm text-ds-text-sub leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Section Container (main card wrapper) ───
export function SectionContainer({
  number,
  title,
  children,
}: {
  number: number | string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={`part${number}`} data-section-id={`part${number}`} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="bg-ds-bg-white p-8 lg:p-12 rounded-3xl border border-ds-stroke-soft shadow-sm mb-12">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-ds-stroke-soft">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ds-static-white font-black text-lg bg-ds-feature-base shadow-sm shadow-ds-feature-base/15"
          >
            {number}
          </div>
          <div>
            <h2 className="text-3xl font-black text-ds-text-strong tracking-tight font-display">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── Exercise Box ───
export function ExerciseBox({
  level,
  title,
  description,
  solution,
}: {
  level: "beginner" | "intermediate" | "real-world";
  title: string;
  description: string;
  solution?: string;
}) {
  const [showSolution, setShowSolution] = useState(false);

  const levelColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
    beginner: {
      bg: "bg-ds-success-lighter",
      text: "text-ds-success-dark",
      border: "border-ds-success-base",
      label: "🟢 Beginner"
    },
    intermediate: {
      bg: "bg-ds-warning-lighter",
      text: "text-ds-warning-dark",
      border: "border-ds-warning-base",
      label: "🟡 Intermediate"
    },
    "real-world": {
      bg: "bg-ds-feature-lighter",
      text: "text-ds-feature-dark",
      border: "border-ds-feature-base",
      label: "🚀 Real-World"
    },
  };

  const lc = levelColors[level] || levelColors.beginner;

  return (
    <div className="mb-6 p-5 rounded-2xl border border-ds-stroke-soft bg-ds-bg-weak shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${lc.bg} ${lc.text} ${lc.border}`}>
          {lc.label}
        </span>
      </div>
      <h5 className="font-black text-sm text-ds-text-strong mb-2">{title}</h5>
      <p className="text-sm text-ds-text-sub leading-relaxed mb-4 whitespace-pre-line">
        {description}
      </p>
      {solution && (
        <>
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="text-xs font-bold text-ds-feature-base hover:text-ds-feature-dark flex items-center gap-1 transition-colors"
          >
            {showSolution ? "Hide Solution ▲" : "Show Solution ▼"}
          </button>
          {showSolution && (
            <div className="mt-3 p-4 bg-ds-bg-white rounded-xl border border-ds-stroke-soft overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <pre className="text-xs font-mono text-ds-text-strong overflow-x-auto whitespace-pre-wrap">
                {solution}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Predict Output Box ───
export function PredictOutputBox({
  code,
  answer,
}: {
  code: string;
  answer: string;
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="mb-6 p-5 rounded-2xl border border-ds-stroke-soft bg-ds-bg-weak shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🔮</span>
        <h5 className="font-bold text-sm text-ds-feature-dark">Predict the Output</h5>
      </div>
      <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-4 rounded-xl overflow-x-auto text-xs font-mono border border-ds-stroke-soft mb-3 whitespace-pre-wrap leading-relaxed shadow-inner">
        {code}
      </pre>
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="text-xs font-bold text-ds-feature-base hover:text-ds-feature-dark flex items-center gap-1 transition-colors"
      >
        {showAnswer ? "Hide Answer ▲" : "Show Answer ▼"}
      </button>
      {showAnswer && (
        <div className="mt-3 p-3.5 bg-ds-bg-white rounded-xl border border-ds-stroke-soft text-sm text-ds-text-strong animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="font-black text-ds-feature-base text-xs block mb-1">Output:</span>
          <code className="font-mono text-xs font-semibold text-ds-text-strong whitespace-pre-wrap">{answer}</code>
        </div>
      )}
    </div>
  );
}

// ─── Comparison Table ───
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-ds-stroke-soft bg-ds-bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-ds-bg-weak border-b border-ds-stroke-soft">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left p-3.5 font-bold text-ds-text-strong"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-ds-stroke-soft last:border-0 hover:bg-ds-bg-weak/30 transition-colors">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-3.5 text-ds-text-sub font-normal">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Info Callout ───
export function InfoCallout({ emoji, title, children }: { emoji: string; title: string; children: ReactNode }) {
  return (
    <div className="mb-6 p-4 rounded-xl bg-ds-info-lighter border border-ds-info-base">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{emoji}</span>
        <span className="font-black text-xs text-ds-info-dark uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-sm text-ds-text-strong leading-relaxed">
        {children}
      </div>
    </div>
  );
}
