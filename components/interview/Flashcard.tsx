"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { InterviewQuestion, QuestionProgress, InterviewGrade, QuestionType, Difficulty } from "@/types/interview";
import { MarkdownRenderer } from "@/components/revision/MarkdownRenderer";

interface FlashcardProps {
  question: InterviewQuestion;
  progress: QuestionProgress | null;
  onGrade: (grade: InterviewGrade) => void;
  onNext?: () => void;
  isLastQuestion?: boolean;
}

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; text: string; border: string; label: string }> = {
  easy: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    label: "Easy",
  },
  beginner: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    label: "Beginner",
  },
  medium: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "Medium",
  },
  intermediate: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    label: "Intermediate",
  },
  hard: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
    label: "Hard",
  },
  advanced: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
    label: "Advanced",
  },
};

const TYPE_ICONS: Record<QuestionType, string> = {
  conceptual: "💡 Conceptual",
  coding: "💻 Coding / Output",
  "system-design": "📐 System Design",
  practical: "🛠️ Practical",
  architecture: "🏗️ Architecture",
  internals: "⚙️ Internals",
  scenario: "🧩 Scenario",
  security: "🔒 Security",
  "trade-offs": "⚖️ Trade-offs",
};

export function Flashcard({
  question,
  progress,
  onGrade,
  onNext,
  isLastQuestion = false,
}: FlashcardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState<Record<number, boolean>>({});
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<InterviewGrade | null>(null);

  // Reset state when question changes
  useEffect(() => {
    setIsRevealed(false);
    setCheckedPoints({});
    setShowFollowUps(false);
    setSelectedGrade(null);
  }, [question.id]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();
        setIsRevealed((prev) => !prev);
      } else if (isRevealed && !selectedGrade) {
        if (e.key === "1") {
          e.preventDefault();
          handleRate("again");
        } else if (e.key === "2") {
          e.preventDefault();
          handleRate("hard");
        } else if (e.key === "3") {
          e.preventDefault();
          handleRate("good");
        } else if (e.key === "4") {
          e.preventDefault();
          handleRate("easy");
        }
      } else if (isRevealed && selectedGrade && e.key === "Enter") {
        if (onNext) onNext();
      }
    },
    [isRevealed, selectedGrade, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleRate = (grade: InterviewGrade) => {
    setSelectedGrade(grade);
    onGrade(grade);
  };

  const togglePoint = (idx: number) => {
    setCheckedPoints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const diff = DIFFICULTY_STYLES[question.difficulty] || DIFFICULTY_STYLES.medium;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* Question Card Container */}
      <div className="relative rounded-2xl bg-neutral-900/90 border border-white/[0.08] shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-purple-500/30">
        {/* Subtle Top Gradient Accent */}
        <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

        {/* Card Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-neutral-300">
              {question.category}
            </span>

            {/* Type badge */}
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
              {TYPE_ICONS[question.type]}
            </span>

            {/* Difficulty */}
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${diff.bg} ${diff.text} ${diff.border}`}
            >
              {diff.label}
            </span>
          </div>

          {/* SM-2 Recall Status / Times Reviewed */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            {progress ? (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Reviewed {progress.timesReviewed}x</span>
                {progress.isMastered && (
                  <span className="ml-1 text-emerald-400 font-semibold">· Mastered 💎</span>
                )}
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
                ✨ New Question
              </span>
            )}
          </div>
        </div>

        {/* Card Body — The Question */}
        <div className="p-5 sm:p-8 space-y-5">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold text-sm">
              Q
            </span>
            <div className="flex-1 text-neutral-100 font-semibold text-lg sm:text-xl leading-relaxed">
              <MarkdownRenderer content={question.question} />
            </div>
          </div>

          {/* Code Snippet (if coding question) */}
          {question.codeSnippet && (
            <div className="mt-4 rounded-xl overflow-hidden border border-white/[0.08] bg-black/40">
              <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>Code to analyze:</span>
              </div>
              <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-neutral-200">
                <MarkdownRenderer content={`\`\`\`javascript\n${question.codeSnippet}\n\`\`\``} />
              </div>
            </div>
          )}

          {/* Related Curriculum Link (Hint) */}
          {question.relatedLessonSlug && (
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <span className="text-purple-400">💡 Reference:</span>
              <Link
                href={question.relatedLessonSlug}
                target="_blank"
                className="text-purple-300 hover:text-purple-200 hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>{question.relatedLessonName || question.relatedLessonSlug}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Reveal Toggle Banner */}
        {!isRevealed ? (
          <div className="p-5 sm:p-6 bg-gradient-to-b from-white/[0.01] to-white/[0.04] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 flex items-center gap-2">
              <kbd className="px-2 py-1 rounded bg-white/[0.08] border border-white/[0.1] text-neutral-300 font-mono text-[11px]">
                Space
              </kbd>
              <span>Think through your answer, then tap to reveal</span>
            </div>
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Reveal Model Answer</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        ) : (
          /* Revealed Answer Section */
          <div className="border-t border-purple-500/20 bg-neutral-950/60 transition-all duration-300 animate-fadeIn">
            {/* Answer Header */}
            <div className="p-5 sm:p-6 pb-2 flex items-center justify-between border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Model Answer</span>
              </div>
              <button
                onClick={() => setIsRevealed(false)}
                className="text-xs text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
              >
                Hide Answer
              </button>
            </div>

            {/* Answer Body */}
            <div className="p-5 sm:p-8 space-y-6">
              {/* Expected output callout if present */}
              {question.expectedOutput && (
                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-indigo-300 uppercase tracking-wider text-[11px]">
                    Expected Console Output:
                  </span>
                  <pre className="font-mono text-indigo-100 bg-black/40 p-2 rounded-lg">
                    {question.expectedOutput}
                  </pre>
                </div>
              )}

              {/* Main Answer Content */}
              <div className="text-neutral-200 text-sm sm:text-base leading-relaxed">
                <MarkdownRenderer content={question.answer} />
              </div>

              {/* Key Checkpoints (Interactive Checklist) */}
              {question.keyPoints && question.keyPoints.length > 0 && (
                <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>🎯 Did your answer cover these key points?</span>
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      {Object.values(checkedPoints).filter(Boolean).length} / {question.keyPoints.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {question.keyPoints.map((point, idx) => (
                      <label
                        key={idx}
                        onClick={() => togglePoint(idx)}
                        className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 cursor-pointer transition-all ${
                          checkedPoints[idx]
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                            : "bg-white/[0.02] border-white/[0.05] text-neutral-300 hover:bg-white/[0.05]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={!!checkedPoints[idx]}
                          onChange={() => {}}
                          className="mt-0.5 rounded border-white/20 text-purple-600 focus:ring-0"
                        />
                        <span className="leading-snug">{point}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Questions Accordion */}
              {question.followUps && question.followUps.length > 0 && (
                <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-white/[0.01]">
                  <button
                    onClick={() => setShowFollowUps((prev) => !prev)}
                    className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>🔄 Common Interviewer Follow-Ups ({question.followUps.length})</span>
                    </span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        showFollowUps ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showFollowUps && (
                    <div className="p-4 pt-1 border-t border-white/[0.04] space-y-2 text-xs text-neutral-300">
                      {question.followUps.map((fu, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                          <span className="text-purple-400 font-bold">•</span>
                          <span className="leading-relaxed">{fu}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SM-2 Recall Rating Bar */}
            <div className="p-5 sm:p-6 bg-black/60 border-t border-white/[0.08]">
              <div className="text-center mb-3">
                <span className="text-xs font-semibold text-neutral-300">
                  How well did you recall this answer?
                </span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">
                  Rating dynamically adjusts your SuperMemo SM-2 review schedule
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
                {/* 1: Again */}
                <button
                  onClick={() => handleRate("again")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedGrade === "again"
                      ? "bg-rose-500/20 border-rose-500 text-rose-300 scale-[1.02] shadow-lg shadow-rose-500/20"
                      : "bg-neutral-900 border-white/[0.08] hover:border-rose-500/40 text-neutral-300 hover:bg-rose-500/10"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span className="text-rose-400">🔴</span>
                    <span>Again</span>
                    <kbd className="text-[10px] opacity-60 ml-0.5 font-mono">[1]</kbd>
                  </div>
                  <span className="text-[10px] text-neutral-400">Reset (1 day)</span>
                </button>

                {/* 2: Hard */}
                <button
                  onClick={() => handleRate("hard")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedGrade === "hard"
                      ? "bg-amber-500/20 border-amber-500 text-amber-300 scale-[1.02] shadow-lg shadow-amber-500/20"
                      : "bg-neutral-900 border-white/[0.08] hover:border-amber-500/40 text-neutral-300 hover:bg-amber-500/10"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span className="text-amber-400">🟠</span>
                    <span>Hard</span>
                    <kbd className="text-[10px] opacity-60 ml-0.5 font-mono">[2]</kbd>
                  </div>
                  <span className="text-[10px] text-neutral-400">~2-3 days</span>
                </button>

                {/* 3: Good */}
                <button
                  onClick={() => handleRate("good")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedGrade === "good"
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 scale-[1.02] shadow-lg shadow-emerald-500/20"
                      : "bg-neutral-900 border-white/[0.08] hover:border-emerald-500/40 text-neutral-300 hover:bg-emerald-500/10"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span className="text-emerald-400">🟢</span>
                    <span>Good</span>
                    <kbd className="text-[10px] opacity-60 ml-0.5 font-mono">[3]</kbd>
                  </div>
                  <span className="text-[10px] text-neutral-400">~4-7 days</span>
                </button>

                {/* 4: Easy */}
                <button
                  onClick={() => handleRate("easy")}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    selectedGrade === "easy"
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 scale-[1.02] shadow-lg shadow-cyan-500/20"
                      : "bg-neutral-900 border-white/[0.08] hover:border-cyan-500/40 text-neutral-300 hover:bg-cyan-500/10"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs">
                    <span className="text-cyan-400">💎</span>
                    <span>Easy</span>
                    <kbd className="text-[10px] opacity-60 ml-0.5 font-mono">[4]</kbd>
                  </div>
                  <span className="text-[10px] text-neutral-400">~10-14 days</span>
                </button>
              </div>

              {/* Next Button when rated */}
              {selectedGrade && onNext && (
                <div className="mt-4 flex justify-center animate-fadeIn">
                  <button
                    onClick={onNext}
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95 transition-all"
                  >
                    <span>{isLastQuestion ? "Complete Practice Session 🎉" : "Next Question"}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Keyboard Helper Footer */}
      <div className="text-center text-[11px] text-neutral-400">
        <span className="opacity-70">Shortcuts: </span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-400 font-mono">
          Space
        </kbd>{" "}
        flip card ·{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-400 font-mono">
          1-4
        </kbd>{" "}
        rate recall ·{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-400 font-mono">
          Enter
        </kbd>{" "}
        continue
      </div>
    </div>
  );
}
