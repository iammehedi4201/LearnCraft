"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QuizAttemptRecord } from "@/lib/quiz/quiz-types";
import { getLocalQuizAttempts, QUIZ_SYNC_EVENT, syncQuizAttemptsWithCloud } from "@/lib/quiz/quiz-storage";
import { QuizReviewModal } from "@/components/quiz/QuizReviewModal";

export function QuizHistoryWidget() {
  const [attempts, setAttempts] = useState<QuizAttemptRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState<QuizAttemptRecord | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  const loadAttempts = () => {
    const local = getLocalQuizAttempts();
    setAttempts(local);
    setIsLoading(false);
  };

  useEffect(() => {
    loadAttempts();

    // Trigger cloud sync if authenticated
    syncQuizAttemptsWithCloud().then((synced) => {
      if (Array.isArray(synced)) {
        setAttempts(synced);
      }
    });

    const handleSync = () => loadAttempts();
    window.addEventListener(QUIZ_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(QUIZ_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Compute highest score per quizId to highlight best attempt
  const bestScoresMap = new Map<string, number>();
  for (const a of attempts) {
    const prev = bestScoresMap.get(a.quizId) ?? 0;
    if (a.score > prev) {
      bestScoresMap.set(a.quizId, a.score);
    }
  }

  const displayedAttempts = attempts.slice(0, visibleCount);

  if (isLoading) {
    return (
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0E121B] border border-white/10 space-y-4 animate-pulse">
        <div className="h-5 w-48 bg-white/10 rounded-lg" />
        <div className="h-4 w-72 bg-white/5 rounded-lg" />
        <div className="space-y-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-full bg-white/[0.03] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0E121B] border border-white/10 shadow-xl space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Module Assessments & Quiz History
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Review your code output predictions, conceptual mastery, and verified XP awards.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-xl font-bold">
              {attempts.length} Total {attempts.length === 1 ? "Attempt" : "Attempts"}
            </span>
          </div>
        </div>

        {/* Empty State */}
        {attempts.length === 0 ? (
          <div className="py-10 px-4 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 space-y-3">
            <span className="text-3xl block">📝</span>
            <h4 className="text-sm font-bold text-white">No Quizzes Taken Yet</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Test your knowledge after completing a curriculum lesson to earn XP and verify your mastery.
            </p>
            <div className="pt-1">
              <Link
                href="/quiz/nextjs/nx01-app-router"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <span>Take NX-01 Assessment</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {displayedAttempts.map((attempt) => {
              const isBest = attempt.score === bestScoresMap.get(attempt.quizId) && attempt.score > 0;
              const formattedDate = new Date(attempt.completedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <div
                  key={attempt.id}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  {/* Left Info */}
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        attempt.score >= 70
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                          : "bg-rose-500/15 border border-rose-500/30 text-rose-300"
                      }`}
                    >
                      {attempt.score}%
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                          {attempt.trackKey}
                        </span>
                        {attempt.lessonCode && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20 font-bold">
                            {attempt.lessonCode}
                          </span>
                        )}
                        {isBest && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            ⭐ Best
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                        {attempt.lessonTitle}
                      </h4>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span>
                          {attempt.correctAnswers}/{attempt.totalQuestions} correct
                        </span>
                        <span>·</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions & XP Chip */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.04]">
                    <div className="text-right">
                      {attempt.xpEarned > 0 ? (
                        <span className="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/25 text-xs font-mono font-bold">
                          +{attempt.xpEarned} XP
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-xl bg-white/[0.04] text-slate-400 text-xs font-mono font-bold">
                          0 XP
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {attempt.evaluations && attempt.evaluations.length > 0 && (
                        <button
                          onClick={() => setSelectedAttempt(attempt)}
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          Review
                        </button>
                      )}

                      <Link
                        href={`/quiz/${attempt.trackKey}/${attempt.lessonSlug}`}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-xs font-bold transition-all cursor-pointer"
                      >
                        Retake
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination / Show More */}
            {attempts.length > visibleCount && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + 5)}
                  className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Show More Attempts ({attempts.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Review Modal if clicked */}
      {selectedAttempt && (
        <QuizReviewModal
          isOpen={Boolean(selectedAttempt)}
          onClose={() => setSelectedAttempt(null)}
          lessonTitle={selectedAttempt.lessonTitle}
          lessonCode={selectedAttempt.lessonCode}
          score={selectedAttempt.score}
          evaluations={selectedAttempt.evaluations || []}
        />
      )}
    </>
  );
}
