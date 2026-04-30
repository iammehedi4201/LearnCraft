"use client";

import { useState } from "react";
import { EnhancedCodeBlock } from "@/components/enhanced-code-display";

interface QuickCheckProps {
  question: string;
  code?: string;
  answer: string;
}

export function QuickCheck({ question, code, answer }: QuickCheckProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-6 p-5 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-indigo-200/50 dark:border-indigo-500/20">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h5 className="font-bold text-sm text-indigo-700 dark:text-indigo-400">
          Quick Check
        </h5>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
        {question}
      </p>
      {code && (
        <EnhancedCodeBlock code={code} language="typescript" />
      )}
      <button
        onClick={() => setShow(!show)}
        className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
      >
        {show ? "Hide Answer ▲" : "Show Answer ▼"}
      </button>
      {show && (
        <div className="mt-3 p-3 bg-white dark:bg-slate-800/60 rounded-xl border border-indigo-100 dark:border-indigo-900/30 text-sm text-slate-700 dark:text-slate-300">
          {answer}
        </div>
      )}
    </div>
  );
}
