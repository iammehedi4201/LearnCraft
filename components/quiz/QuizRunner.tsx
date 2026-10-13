"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ModuleQuiz, QuizEvaluationResult } from "@/lib/quiz/quiz-types";
import { evaluateQuizSubmission } from "@/lib/quiz/quiz-evaluator";
import { saveLocalQuizAttempt, getBestScoreForQuiz } from "@/lib/quiz/quiz-storage";
import { recordActivity } from "@/lib/gamification";
import { QuizResultsCard } from "./QuizResultsCard";

interface QuizRunnerProps {
  quiz: ModuleQuiz;
  trackHref: string;
}

export function QuizRunner({ quiz, trackHref }: QuizRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [hintsUsed, setHintsUsed] = useState<Set<string>>(new Set());
  const [showHintConfirm, setShowHintConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<QuizEvaluationResult | null>(null);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isSelected = (optIdx: number) => selectedAnswers[currentQuestion.id] === optIdx;
  const isHintUnlocked = hintsUsed.has(currentQuestion.id);

  const selectOption = useCallback(
    (optIdx: number) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optIdx,
      }));
    },
    [currentQuestion.id]
  );

  // Keyboard shortcut support (1-4 for options)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (result) return;
      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion.options[idx] !== undefined) {
          selectOption(idx);
        }
      } else if (e.key === "ArrowRight" && currentIndex < totalQuestions - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, currentQuestion.options, selectOption, totalQuestions, result]);

  const unlockHint = () => {
    setHintsUsed((prev) => new Set([...prev, currentQuestion.id]));
    setShowHintConfirm(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const hintsArray = Array.from(hintsUsed);
    const prevBest = getBestScoreForQuiz(quiz.id);

    try {
      // 1. Submit to server API for authoritative verification and DB persistence
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: quiz.id,
          trackKey: quiz.trackKey,
          lessonSlug: quiz.lessonSlug,
          answers: selectedAnswers,
          hintsUsed: hintsArray,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.result) {
          const evalResult: QuizEvaluationResult = data.result;
          setResult(evalResult);

          // Save to local storage for instant client-side history & cache
          saveLocalQuizAttempt({
            id: data.attemptId || `att_${Date.now()}`,
            quizId: evalResult.quizId,
            trackKey: evalResult.trackKey,
            lessonSlug: evalResult.lessonSlug,
            lessonCode: evalResult.lessonCode,
            lessonTitle: evalResult.lessonTitle,
            score: evalResult.score,
            totalQuestions: evalResult.totalQuestions,
            correctAnswers: evalResult.correctAnswers,
            xpEarned: evalResult.netXpEarned,
            xpSpentOnHints: evalResult.xpSpentOnHints,
            hintsUsed: hintsArray,
            evaluations: evalResult.evaluations,
            completedAt: evalResult.completedAt,
          });

          // Sync with local gamification engine
          if (evalResult.netXpEarned > 0) {
            recordActivity(
              "exercise_pass",
              `Passed Quiz: ${evalResult.lessonCode} (${evalResult.score}%)`,
              { quizId: quiz.id, score: evalResult.score }
            );
          }
          setIsSubmitting(false);
          return;
        }
      }
      throw new Error("Server response invalid, falling back to local evaluation");
    } catch {
      // 2. Offline / local-first fallback
      const evalResult = evaluateQuizSubmission(
        quiz,
        {
          quizId: quiz.id,
          trackKey: quiz.trackKey,
          lessonSlug: quiz.lessonSlug,
          answers: selectedAnswers,
          hintsUsed: hintsArray,
        },
        { previousBestScore: prevBest }
      );

      setResult(evalResult);
      saveLocalQuizAttempt({
        id: `att_${Date.now()}`,
        quizId: evalResult.quizId,
        trackKey: evalResult.trackKey,
        lessonSlug: evalResult.lessonSlug,
        lessonCode: evalResult.lessonCode,
        lessonTitle: evalResult.lessonTitle,
        score: evalResult.score,
        totalQuestions: evalResult.totalQuestions,
        correctAnswers: evalResult.correctAnswers,
        xpEarned: evalResult.netXpEarned,
        xpSpentOnHints: evalResult.xpSpentOnHints,
        hintsUsed: hintsArray,
        evaluations: evalResult.evaluations,
        completedAt: evalResult.completedAt,
      });

      if (evalResult.netXpEarned > 0) {
        recordActivity(
          "exercise_pass",
          `Passed Quiz: ${evalResult.lessonCode} (${evalResult.score}%)`,
          { quizId: quiz.id, score: evalResult.score }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setHintsUsed(new Set());
    setCurrentIndex(0);
    setResult(null);
    setErrorMessage(null);
  };

  if (result) {
    return (
      <QuizResultsCard
        result={result}
        onRetry={handleRetry}
        trackHref={trackHref}
      />
    );
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#0E121B] border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href={trackHref}
              className="px-2.5 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-mono font-bold transition-colors cursor-pointer"
            >
              &larr; Exit
            </Link>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
              {quiz.lessonCode} Assessment
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Answered:</span>
            <span className="text-white font-bold">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {quiz.lessonTitle}
          </h1>
          <p className="text-xs text-slate-400 mt-1">{quiz.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/10 shadow-2xl space-y-6">
        {/* Question Type & Hint Button */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-purple-300">
            {currentQuestion.type === "code_output"
              ? "💻 Code Output Prediction"
              : "❓ Multiple Choice"}
          </span>

          {currentQuestion.hint && (
            <div>
              {isHintUnlocked ? (
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1">
                  💡 Hint Unlocked (-{currentQuestion.hintCostXP || 5} XP)
                </span>
              ) : (
                <button
                  onClick={() => setShowHintConfirm(true)}
                  className="text-xs font-mono font-bold text-slate-400 hover:text-amber-300 bg-white/[0.03] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 px-3 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>💡</span> Unlock Hint (-{currentQuestion.hintCostXP || 5} XP)
                </button>
              )}
            </div>
          )}
        </div>

        {/* Hint Confirmation Dialog */}
        {showHintConfirm && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2 animate-in fade-in duration-150">
            <p className="font-semibold">
              Unlock hint for {currentQuestion.hintCostXP || 5} XP?
            </p>
            <p className="text-amber-200/80 text-[11px]">
              This will deduct {currentQuestion.hintCostXP || 5} XP from your net reward for this quiz attempt.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={unlockHint}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 cursor-pointer"
              >
                Confirm (-{currentQuestion.hintCostXP || 5} XP)
              </button>
              <button
                onClick={() => setShowHintConfirm(false)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-slate-300 font-bold text-xs hover:bg-white/10 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Revealed Hint Box */}
        {isHintUnlocked && currentQuestion.hint && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1 animate-in fade-in duration-200">
            <span className="font-bold block flex items-center gap-1">
              <span>💡</span> Hint:
            </span>
            <p>{currentQuestion.hint}</p>
          </div>
        )}

        {/* Question Prompt */}
        <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {currentQuestion.prompt}
        </h2>

        {/* Code Snippet for Output Prediction */}
        {currentQuestion.type === "code_output" && currentQuestion.codeSnippet && (
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F]">
            <div className="px-4 py-2 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{currentQuestion.language || "typescript"}</span>
              <span className="text-purple-400 font-bold">Predict Terminal / Console Output</span>
            </div>
            <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-purple-200 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{currentQuestion.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Interactive Options List */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const selected = isSelected(idx);
            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-mono transition-all cursor-pointer flex items-center justify-between group ${
                  selected
                    ? "bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/10 ring-1 ring-purple-500/50"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      selected
                        ? "bg-purple-500 text-white"
                        : "bg-white/[0.06] text-slate-400 group-hover:text-white"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{option}</span>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    selected
                      ? "border-purple-400 bg-purple-500"
                      : "border-white/20 group-hover:border-white/40"
                  }`}
                >
                  {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Error message if any */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Question Navigation Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
          >
            &larr; Previous
          </button>

          {/* Quick jump question dots */}
          <div className="hidden sm:flex items-center gap-1.5">
            {quiz.questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-purple-500 scale-125 ring-2 ring-purple-400/40"
                      : isAnswered
                      ? "bg-emerald-400/80"
                      : "bg-white/10 hover:bg-white/30"
                  }`}
                  title={`Question ${idx + 1} (${isAnswered ? "Answered" : "Unanswered"})`}
                />
              );
            })}
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : (
                <>
                  <span>Submit Assessment</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Next</span>
              <span>&rarr;</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
