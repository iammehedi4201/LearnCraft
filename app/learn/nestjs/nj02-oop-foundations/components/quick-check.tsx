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
    <div className="mt-6 p-5 bg-[#e7e9f5] dark:bg-[#212a5d] rounded-2xl border border-[#b4b8d7]/50 dark:border-[#344b8f]/40">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🧠</span>
        <h5 className="font-bold text-sm text-[#472f82] dark:text-[#e7e9f5]">
          Quick Check
        </h5>
      </div>
      <p className="text-sm text-[#212a5d] dark:text-[#e7e9f5] mb-2 leading-relaxed font-medium">
        {question}
      </p>
      {code && (
        <pre className="bg-[#212a5d] text-[#e7e9f5] p-3 rounded-xl overflow-x-auto text-sm border border-[#344b8f]/30 mb-3 whitespace-pre-wrap">
          {code}
        </pre>
      )}
      <button
        onClick={() => setShow(!show)}
        className="text-xs font-bold text-[#344b8f] dark:text-[#7f6fbe] hover:text-[#7b52ac] flex items-center gap-1 transition-colors"
      >
        {show ? "Hide Answer ▲" : "Show Answer ▼"}
      </button>
      {show && (
        <div className="mt-3 p-3 bg-white dark:bg-[#212a5d] rounded-xl border border-[#b4b8d7]/50 dark:border-[#344b8f]/40 text-sm text-[#212a5d] dark:text-[#e7e9f5]">
          {answer}
        </div>
      )}
    </div>
  );
}
