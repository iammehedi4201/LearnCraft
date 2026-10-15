"use client";

import { useEffect, useRef } from "react";
import { QuestionEvaluation } from "@/lib/quiz/quiz-types";
import { renderFormattedText } from "./QuizRunner";

interface QuizReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle: string;
  lessonCode: string;
  score: number;
  evaluations: QuestionEvaluation[];
  initialQuestionIndex?: number;
}

export function QuizReviewModal({
  isOpen,
  onClose,
  lessonTitle,
  lessonCode,
  score,
  evaluations,
  initialQuestionIndex,
}: QuizReviewModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && initialQuestionIndex !== undefined && initialQuestionIndex >= 0) {
      const el = document.getElementById(`review-question-${initialQuestionIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isOpen, initialQuestionIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#0B0F19] border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 text-[11px] font-mono font-bold border border-purple-500/30">
                {lessonCode || "ASSESSMENT"}
              </span>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded-full ${
                  score >= 70
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}
              >
                Score: {score}%
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Review: {lessonTitle}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer text-sm font-bold"
            aria-label="Close review modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Questions Review */}
        <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {evaluations.map((item, idx) => (
            <div
              key={item.questionId || idx}
              id={`review-question-${idx}`}
              className={`p-5 rounded-2xl border transition-all ${
                item.isCorrect
                  ? "bg-emerald-500/[0.03] border-emerald-500/20"
                  : "bg-rose-500/[0.03] border-rose-500/20"
              }`}
            >
              {/* Question Meta */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Question {idx + 1} · {item.questionType === "code_output" ? "Code Output Prediction" : "Multiple Choice"}
                </span>
                <span
                  className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md flex items-center gap-1 ${
                    item.isCorrect
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-rose-400 bg-rose-500/10"
                  }`}
                >
                  {item.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              {/* Prompt */}
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3">
                {renderFormattedText(item.prompt)}
              </h3>

              {/* Code Snippet if applicable */}
              {item.codeSnippet && (
                <div className="mb-4 rounded-xl overflow-hidden border border-white/10 bg-[#06080F]">
                  <div className="px-3 py-1.5 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{item.language || "typescript"}</span>
                    <span>Snippet</span>
                  </div>
                  <pre className="p-3.5 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed whitespace-pre">
                    <code>{item.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Options Breakdown */}
              <div className="space-y-2 mb-4">
                {item.options.map((opt, optIdx) => {
                  const isUserSelection = item.userAnswer === optIdx;
                  const isCorrectAnswer = item.correctAnswer === optIdx;

                  let optClass = "bg-white/[0.02] border-white/[0.06] text-slate-400";
                  if (isCorrectAnswer) {
                    optClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold";
                  } else if (isUserSelection && !item.isCorrect) {
                    optClass = "bg-rose-500/20 border-rose-500/50 text-rose-200 font-semibold line-through";
                  }

                  return (
                    <div
                      key={optIdx}
                      className={`p-3 rounded-xl border text-xs sm:text-sm font-mono flex items-center justify-between gap-3 ${optClass}`}
                    >
                      <span>{renderFormattedText(opt)}</span>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider shrink-0">
                        {isCorrectAnswer && "✓ Correct Answer"}
                        {isUserSelection && !isCorrectAnswer && "✗ Your Pick"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation & Hint */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5 text-xs text-slate-300 leading-relaxed">
                <strong className="block text-white font-semibold flex items-center gap-1.5">
                  <span>💡</span> Architectural Explanation:
                </strong>
                <p>{renderFormattedText(item.explanation)}</p>
                {item.hintUsed && (
                  <p className="text-[11px] text-amber-300 font-mono pt-1">
                    *(Hint was revealed during test)*
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] flex justify-end bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
