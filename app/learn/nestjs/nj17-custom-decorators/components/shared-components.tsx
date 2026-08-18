"use client";

import React, { useState } from "react";
import { EnhancedCodeBlock } from "@/components/enhanced-code-display";

// ── Section Container ──
export function SectionContainer({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-6 sm:p-10 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm mb-8 transition-all">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-ds-stroke-soft">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-ds-feature-lighter text-ds-feature-dark font-black text-xs border border-ds-feature-light">
          {number < 10 ? `0${number}` : number}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-ds-text-strong font-display tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ── Topic Header ──
export function TopicHeader({
  number,
  title,
  description,
  color = "primary",
}: {
  number: number;
  title: string;
  description: string;
  color?: "primary" | "sky" | "emerald" | "amber" | "purple" | "rose";
}) {
  const colorMap = {
    primary: "bg-ds-feature-lighter text-ds-feature-dark border-ds-feature-light",
    sky: "bg-ds-info-lighter text-ds-info-dark border-ds-info-light",
    emerald: "bg-ds-success-lighter text-ds-success-dark border-ds-success-light",
    amber: "bg-ds-warning-lighter text-ds-warning-dark border-ds-warning-light",
    purple: "bg-ds-away-lighter text-ds-away-dark border-ds-away-light",
    rose: "bg-ds-error-lighter text-ds-error-dark border-ds-error-light",
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${colorMap[color]}`}>
          Topic {number}
        </span>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-ds-text-strong tracking-tight">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-ds-text-sub mt-1">
        {description}
      </p>
    </div>
  );
}

// ── Section Heading ──
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base sm:text-lg font-bold text-ds-text-strong tracking-tight mb-3">
      {children}
    </h3>
  );
}

// ── Why Box ──
export function WhyBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm mb-6">
      {children}
    </div>
  );
}

// ── Analogy Box ──
export function AnalogyBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl bg-ds-warning-lighter/40 border border-ds-warning-light shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">💡</span>
        <h4 className="font-bold text-xs uppercase tracking-wider text-ds-warning-dark">
          Real-Life Analogy: {title}
        </h4>
      </div>
      <div className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ── Info Callout ──
export function InfoCallout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "bg-ds-info-lighter/50 border-ds-info-light text-ds-info-dark",
    tip: "bg-ds-success-lighter/50 border-ds-success-light text-ds-success-dark",
    warning: "bg-ds-warning-lighter/50 border-ds-warning-light text-ds-warning-dark",
  };

  const icons = {
    info: "ℹ️",
    tip: "💡",
    warning: "⚠️",
  };

  return (
    <div className={`p-4 rounded-xl border ${styles[type]} mb-4 text-xs sm:text-sm leading-relaxed`}>
      {title && (
        <p className="font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <span>{icons[type]}</span> {title}
        </p>
      )}
      <div className="text-ds-text-strong">{children}</div>
    </div>
  );
}

// ── Step List ──
export function StepList({
  steps,
}: {
  steps: { step: string; title: string; desc: string }[];
}) {
  return (
    <div className="space-y-3 mb-6">
      {steps.map((s, idx) => (
        <div
          key={idx}
          className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft flex items-start gap-3.5"
        >
          <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-ds-feature-base text-ds-static-white flex items-center justify-center font-bold text-xs mt-0.5">
            {s.step}
          </span>
          <div>
            <h5 className="font-bold text-xs sm:text-sm text-ds-text-strong mb-0.5">
              {s.title}
            </h5>
            <p className="text-xs text-ds-text-sub leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Mistake Box ──
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
    <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">⚠️</span>
        <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
          Mistake: {title}
        </h4>
      </div>
      <p className="text-xs text-ds-text-sub mb-4 leading-relaxed">
        {description}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-wider text-ds-error-dark bg-ds-error-lighter px-2.5 py-1 rounded-md border border-ds-error-light mb-2 w-fit">
            ❌ Wrong
          </span>
          <EnhancedCodeBlock code={wrong} language="typescript" />
        </div>
        <div>
          <span className="block text-[10px] font-black uppercase tracking-wider text-ds-success-dark bg-ds-success-lighter px-2.5 py-1 rounded-md border border-ds-error-light mb-2 w-fit">
            ✅ Correct
          </span>
          <EnhancedCodeBlock code={right} language="typescript" />
        </div>
      </div>
    </div>
  );
}

// ── Predict Output Box ──
export function PredictOutputBox({
  code,
  answer,
}: {
  code: string;
  answer: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm mb-6">
      <h4 className="font-bold text-xs uppercase tracking-wider text-ds-feature-dark mb-2 flex items-center gap-2">
        <span>🧩</span> Predict Custom Decorator Value
      </h4>
      <p className="text-xs text-ds-text-sub mb-3">
        Analyze the custom decorator definition and handler call below. What will the parameter receive?
      </p>
      <EnhancedCodeBlock code={code} language="typescript" />
      <button
        onClick={() => setShow(!show)}
        className="mt-3 px-4 py-2 rounded-xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-bold text-xs transition-colors shadow-sm"
      >
        {show ? "Hide Answer" : "Reveal Injected Value"}
      </button>
      {show && (
        <div className="mt-3 p-4 rounded-xl bg-ds-bg-white border border-ds-stroke-soft text-xs text-ds-text-strong font-mono whitespace-pre-wrap animate-in fade-in duration-300">
          {answer}
        </div>
      )}
    </div>
  );
}

// ── Comparison Table ──
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ds-stroke-soft mb-6">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-ds-bg-weak border-b border-ds-stroke-soft">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-bold text-ds-text-strong uppercase tracking-wider text-[10px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ds-stroke-soft bg-ds-bg-white">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-ds-bg-weak/50 transition-colors">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 text-ds-text-sub ${
                    j === 0 ? "font-bold text-ds-text-strong font-mono" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Divider ──
export function Divider() {
  return <div className="h-px bg-ds-stroke-soft my-8" />;
}

// ── Easy Rule Card ──
export function EasyRuleCard({ rule }: { rule: string }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-ds-feature-lighter/60 to-ds-info-lighter/60 border border-ds-feature-light mb-6 flex items-center gap-3">
      <span className="text-xl shrink-0">🧠</span>
      <p className="text-xs sm:text-sm font-bold text-ds-feature-dark leading-relaxed">
        {rule}
      </p>
    </div>
  );
}
