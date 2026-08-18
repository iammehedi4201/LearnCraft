"use client";

import { useState } from "react";

interface QuickCheckProps {
  question: string;
  code?: string;
  answer: string;
}

export function QuickCheck({ question, code, answer }: QuickCheckProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6 p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h5 className="font-bold text-sm text-ds-feature-dark">
          Quick Check
        </h5>
      </div>
      <p className="text-sm text-ds-text-strong mb-3 leading-relaxed font-medium">
        {question}
      </p>
      {code && (
        <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl overflow-x-auto text-xs font-mono border border-ds-stroke-soft mb-3 whitespace-pre-wrap leading-relaxed shadow-inner">
          {code}
        </pre>
      )}
      <button
        onClick={() => setShow(!show)}
        className="text-xs font-bold text-ds-feature-base hover:text-ds-feature-dark flex items-center gap-1 transition-colors"
      >
        {show ? "Hide Answer ▲" : "Show Answer ▼"}
      </button>
      {show && (
        <div className="mt-3 p-3.5 bg-ds-bg-white rounded-xl border border-ds-stroke-soft text-sm text-ds-text-strong animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-xs font-medium leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}
