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

export function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="inline-flex items-center px-2 py-0.5 mx-1 rounded-md bg-[#0F1424] border border-purple-500/35 text-purple-200 font-mono text-[0.88em] font-semibold align-baseline shadow-sm"
        >
          {code}
        </code>
      );
    }
    return <span key={index}>{part}</span>;
  });
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
  const assessmentCode = quiz.lessonCode.replace("-", "");

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#080B14] overflow-hidden">
      {/* ──────────────── Left Column / Sidebar ──────────────── */}
      <aside className="w-full md:w-[320px] lg:w-[360px] xl:w-[400px] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.08] p-6 lg:p-8 flex flex-col justify-between bg-[#080B14] overflow-y-auto custom-scrollbar min-h-0">
        <div>
          {/* Top Row: Exit & Badge */}
          <div className="flex items-center gap-2.5">
            <Link
              href={trackHref}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-xs font-mono text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>←</span>
              <span>Exit</span>
            </Link>

            <span className="px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-medium">
              {assessmentCode} Assessment
            </span>
          </div>

          {/* Module Title & Description */}
          <div className="mt-6">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {quiz.lessonTitle}
            </h1>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              {quiz.description}
            </p>
          </div>

          {/* Progress Box */}
          <div className="mt-6 p-4 rounded-xl bg-[#0B0F19] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span className="text-purple-300 font-bold">
                {progressPercent}% complete
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div
              className="grid gap-2 mt-3"
              style={{
                gridTemplateColumns: `repeat(${totalQuestions}, minmax(0, 1fr))`,
              }}
            >
              {quiz.questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx <= currentIndex ? "bg-purple-500" : "bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Questions Navigation List */}
          <div className="mt-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase mb-3 block">
              QUESTIONS
            </span>

            <div className="space-y-2 overflow-y-auto max-h-[200px] lg:max-h-[260px] custom-scrollbar pr-1">
              {quiz.questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const label = q.title || (isCurrent ? `Question ${idx + 1}` : (isAnswered ? "Answered" : "Unanswered"));

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? "border-purple-500/50 bg-purple-500/10 shadow-sm shadow-purple-950/20"
                        : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                          isCurrent
                            ? "bg-purple-600 text-white"
                            : "bg-white/[0.06] text-slate-400"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className={`text-xs font-medium truncate ${
                          isCurrent ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-purple-300 tracking-wider uppercase ml-2 shrink-0">
                        CURRENT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Status Text */}
        <div className="pt-6 mt-auto shrink-0 border-t border-white/[0.06]">
          <span className="text-xs font-mono text-slate-400">
            Answered: <strong className="text-white font-bold">{answeredCount}/{totalQuestions}</strong>
          </span>
        </div>
      </aside>

      {/* ──────────────── Right Column / Main Question Workspace ──────────────── */}
      <main className="flex-1 h-full flex flex-col bg-[#0B0F19] min-h-0 overflow-hidden">
        {/* Top Header Bar across the entire right section */}
        <header className="px-6 py-4 lg:px-10 lg:py-4.5 border-b border-white/[0.06] flex items-center justify-between shrink-0 bg-[#080B14]/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.02] text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              <span>{currentQuestion.type === "code_output" ? "💻" : "❓"}</span>
              <span>
                {currentQuestion.type === "code_output"
                  ? "CODE OUTPUT"
                  : "MULTIPLE CHOICE"}
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentQuestion.hint && (
              <div>
                {isHintUnlocked ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-bold">
                    <span>💡</span> Hint Unlocked (-{currentQuestion.hintCostXP || 5} XP)
                  </span>
                ) : (
                  <button
                    onClick={() => setShowHintConfirm(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <span>💡</span>
                    <span>Unlock Hint (-{currentQuestion.hintCostXP || 5} XP)</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Middle Canvas: Spacious & Balanced Workspace with natural scrolling when needed */}
        <div className="flex-1 flex flex-col justify-center px-6 py-6 lg:px-12 xl:px-16 overflow-y-auto custom-scrollbar min-h-0">
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto flex flex-col justify-center my-auto py-4">
            {/* Hint Confirmation Dialog */}
            {showHintConfirm && (
              <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2 animate-in fade-in duration-150">
                <p className="font-semibold">
                  Unlock hint for {currentQuestion.hintCostXP || 5} XP?
                </p>
                <p className="text-amber-200/80 text-[11px]">
                  This will deduct {currentQuestion.hintCostXP || 5} XP from your net reward for this quiz attempt.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={unlockHint}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 cursor-pointer"
                  >
                    Confirm (-{currentQuestion.hintCostXP || 5} XP)
                  </button>
                  <button
                    onClick={() => setShowHintConfirm(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] text-slate-300 font-bold text-xs hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Revealed Hint Box */}
            {isHintUnlocked && currentQuestion.hint && (
              <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold flex items-center gap-1.5">
                  <span>💡</span> Hint:
                </span>
                <p>{currentQuestion.hint}</p>
              </div>
            )}

            {/* Question Card Banner: Distinct Question Presentation */}
            <div className="mb-6 lg:mb-8 rounded-2xl border border-white/[0.08] bg-[#080B14]/80 backdrop-blur-sm p-5 sm:p-6 lg:px-8 lg:py-6 relative overflow-hidden shadow-xl">
              {/* Left Accent Gradient Strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-500 via-purple-600 to-indigo-600" />

              {/* Question Meta Header */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Question {currentIndex + 1} of {totalQuestions}
                </span>

                {currentQuestion.title && (
                  <span className="text-xs font-mono text-slate-300 font-semibold px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                    {currentQuestion.title}
                  </span>
                )}

                <span className="text-[11px] font-mono text-slate-500 ml-auto hidden sm:inline-block">
                  {currentQuestion.type === "code_output" ? "Predict Output" : "Multiple Choice"}
                </span>
              </div>

              {/* Question Heading / Prompt */}
              <h2 className="text-lg sm:text-xl lg:text-[23px] font-semibold text-slate-100 leading-relaxed tracking-normal">
                {renderFormattedText(currentQuestion.prompt)}
              </h2>
            </div>

            {/* Dynamic Layout Based on Question Type: */}
            {currentQuestion.type === "code_output" && currentQuestion.codeSnippet ? (
              /* Code Output: Side-by-Side on desktop (`lg:grid-cols-12`) matching height, code max-height with scroll */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch w-full min-h-0 lg:max-h-[520px]">
                {/* Left: Code Snippet (7 cols) */}
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] flex flex-col shadow-2xl h-full min-h-0 max-h-[520px]">
                  <div className="px-5 py-3 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      <span className="ml-2 px-2 py-0.5 rounded bg-white/[0.06] text-[11px] text-slate-300 font-mono">
                        {currentQuestion.language || "typescript"}
                      </span>
                    </div>
                    <span className="text-purple-400 font-bold text-xs">Predict Terminal / Console Output</span>
                  </div>
                  <pre className="p-5 text-xs sm:text-sm font-mono text-purple-200 overflow-x-auto leading-relaxed whitespace-pre custom-scrollbar flex-1 min-h-0 overflow-y-auto">
                    <code>{currentQuestion.codeSnippet}</code>
                  </pre>
                </div>

                {/* Right: Options List (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between gap-3 min-h-0 h-full max-h-[520px]">
                  {currentQuestion.options.map((option, idx) => {
                    const selected = isSelected(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => selectOption(idx)}
                        className={`flex-1 min-h-[64px] p-3.5 lg:p-4 rounded-2xl border text-left flex items-center gap-3.5 lg:gap-4 transition-all cursor-pointer group ${
                          selected
                            ? "border-2 border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-950/20"
                            : "border border-white/[0.08] bg-[#090C14] hover:border-white/[0.2] hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 lg:w-8 lg:h-8 rounded-xl font-mono font-bold text-xs lg:text-sm flex items-center justify-center shrink-0 transition-colors ${
                            selected
                              ? "bg-purple-600 text-white"
                              : "bg-white/[0.06] text-slate-400 group-hover:text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-xs sm:text-sm lg:text-[14px] font-mono leading-relaxed transition-colors ${
                              selected
                                ? "text-slate-100 font-medium"
                                : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {renderFormattedText(option)}
                          </p>
                        </div>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                            selected
                              ? "border-purple-400 bg-purple-500/20"
                              : "border-white/20 group-hover:border-white/40"
                          }`}
                        >
                          {selected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Standard Multiple Choice: Generous 2x2 Grid with balanced height */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 w-full">
                {currentQuestion.options.map((option, idx) => {
                  const selected = isSelected(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => selectOption(idx)}
                      className={`p-5 sm:p-6 lg:p-7 rounded-2xl border text-left flex flex-col justify-between min-h-[120px] lg:min-h-[140px] transition-all cursor-pointer group ${
                        selected
                          ? "border-2 border-purple-500 bg-purple-500/10 shadow-xl shadow-purple-950/30"
                          : "border border-white/[0.08] bg-[#090C14] hover:border-white/[0.2] hover:bg-white/[0.02]"
                      }`}
                    >
                      {/* Top Row: Number & Radio */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-8 h-8 rounded-xl font-mono font-bold text-sm flex items-center justify-center transition-colors ${
                            selected
                              ? "bg-purple-600 text-white"
                              : "bg-white/[0.06] text-slate-400 group-hover:text-white"
                          }`}
                        >
                          {idx + 1}
                        </span>

                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            selected
                              ? "border-purple-400 bg-purple-500/20"
                              : "border-white/20 group-hover:border-white/40"
                          }`}
                        >
                          {selected && (
                            <div className="w-3 h-3 rounded-full bg-purple-400" />
                          )}
                        </div>
                      </div>

                      {/* Option Text */}
                      <p
                        className={`text-sm sm:text-base lg:text-[16px] font-mono mt-4 leading-relaxed transition-colors ${
                          selected
                            ? "text-slate-100 font-medium"
                            : "text-slate-300 group-hover:text-white"
                        }`}
                      >
                        {renderFormattedText(option)}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs shrink-0">
                {errorMessage}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Controls across full width with right clearance for floating settings */}
        <footer className="px-6 py-4 lg:px-10 lg:py-4.5 border-t border-white/[0.06] flex items-center justify-between shrink-0 bg-[#080B14]/80 backdrop-blur-sm z-10">
          {/* Left: Previous */}
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {/* Center: Elongated Active Pill & Dot Pagination */}
          <div className="flex items-center gap-1.5">
            {quiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-6 bg-purple-500"
                    : "w-2 bg-white/[0.15] hover:bg-white/[0.3]"
                }`}
                aria-label={`Go to question ${idx + 1}`}
              />
            ))}
          </div>

          {/* Right: Next or Submit (with clearance to prevent overlap with floating settings button) */}
          <div className="flex items-center mr-14 sm:mr-16">
            {isLastQuestion ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-lg shadow-purple-950/40 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Assessment</span>
                    <span>→</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-lg shadow-purple-950/40 cursor-pointer"
              >
                <span>Next</span>
                <span>→</span>
              </button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
}
