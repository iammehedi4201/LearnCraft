"use client";

import { useState } from "react";

export function QuickCheck({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft my-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <span className="text-base shrink-0 mt-0.5">❓</span>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-ds-text-soft mb-1">
              Quick Knowledge Check
            </h5>
            <p className="text-xs sm:text-sm font-semibold text-ds-text-strong leading-relaxed">
              {question}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold text-ds-feature-dark bg-ds-feature-lighter hover:bg-ds-feature-light transition-colors border border-ds-feature-light"
        >
          {open ? "Hide" : "Show Answer"}
        </button>
      </div>

      {open && (
        <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub leading-relaxed whitespace-pre-wrap animate-in fade-in duration-200">
          💡 <strong className="text-ds-text-strong">Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}
