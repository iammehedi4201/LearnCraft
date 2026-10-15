"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ModuleQuiz, QuizEvaluationResult } from "@/lib/quiz/quiz-types";
import { evaluateQuizSubmission } from "@/lib/quiz/quiz-evaluator";
import { saveLocalQuizAttempt, getBestScoreForQuiz } from "@/lib/quiz/quiz-storage";
import { recordActivity } from "@/lib/gamification";
import { renderFormattedText } from "./QuizRunner";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: ModuleQuiz;
  trackHref: string;
}

export function QuizModal({ isOpen, onClose, quiz, trackHref }: QuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [hintsUsed, setHintsUsed] = useState<Set<string>>(new Set());
  const [showHintConfirm, setShowHintConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<QuizEvaluationResult | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const isSelected = (optIdx: number) => selectedAnswers[currentQuestion?.id] === optIdx;
  const isHintUnlocked = hintsUsed.has(currentQuestion?.id);
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const badgeCode = quiz.lessonCode.replace("-", "");

  const selectOption = useCallback(
    (optIdx: number) => {
      if (!currentQuestion) return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: optIdx,
      }));
    },
    [currentQuestion]
  );

  // Keyboard shortcut listener: 1-4 for options, arrows for nav, Esc to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (result) {
        if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          handleRetry();
        }
        return;
      }

      if (["1", "2", "3", "4"].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion && currentQuestion.options[idx] !== undefined) {
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
  }, [isOpen, result, currentIndex, currentQuestion, selectOption, totalQuestions, onClose]);

  const unlockHint = () => {
    if (currentQuestion) {
      setHintsUsed((prev) => new Set([...prev, currentQuestion.id]));
      setShowHintConfirm(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const hintsArray = Array.from(hintsUsed);
    const prevBest = getBestScoreForQuiz(quiz.id);

    try {
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
        if (data && data.evaluation) {
          const evalResult: QuizEvaluationResult = data.evaluation;
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
          setIsSubmitting(false);
          return;
        }
      }
      throw new Error("Server submission failed, falling back to local evaluation");
    } catch {
      // Local fallback
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
    setExpandedQuestionId(null);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl bg-[#090C16] border border-white/[0.12] shadow-2xl shadow-purple-950/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ────────────────────────────────────────────────────────── */}
        {/* VIEW 1: ACTIVE QUIZ IN PROGRESS                            */}
        {/* ────────────────────────────────────────────────────────── */}
        {!result && currentQuestion && (
          <>
            {/* Modal Header */}
            <div className="relative px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  {badgeCode} • {quiz.trackTitle}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Question <strong className="text-white">{currentIndex + 1}</strong> of {totalQuestions}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Hint Button */}
                {currentQuestion.hint && (
                  <button
                    onClick={() => {
                      if (isHintUnlocked) return;
                      setShowHintConfirm(true);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                      isHintUnlocked
                        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                        : "bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-amber-300 hover:border-amber-500/30"
                    }`}
                  >
                    <span>💡</span>
                    <span>{isHintUnlocked ? "Hint Active" : "Hint (-5 XP)"}</span>
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                  aria-label="Close Quiz"
                >
                  ✕
                </button>
              </div>

              {/* Progress Line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/[0.06]">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar bg-[#080B14]">
              {/* Question Header & Prompt */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300">
                    {currentQuestion.title || `Concept #${currentIndex + 1}`}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    · {currentQuestion.type === "code_output" ? "Code Output Prediction" : "Multiple Choice"}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {renderFormattedText(currentQuestion.prompt)}
                </h2>
              </div>

              {/* Code Snippet if applicable */}
              {currentQuestion.type === "code_output" && currentQuestion.codeSnippet && (
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#06080F] shadow-xl">
                  <div className="px-4 py-2 bg-white/[0.04] border-b border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                      <span className="ml-2 font-medium text-slate-300">
                        {currentQuestion.language || "typescript"} snippet
                      </span>
                    </div>
                  </div>
                  <pre className="p-4 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed whitespace-pre custom-scrollbar">
                    <code>{currentQuestion.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Revealed Hint Box */}
              {isHintUnlocked && currentQuestion.hint && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2.5 animate-in fade-in duration-200">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <strong className="block text-amber-300 font-bold mb-0.5">Hint:</strong>
                    <span>{currentQuestion.hint}</span>
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="space-y-2.5 pt-1">
                {currentQuestion.options.map((option, optIdx) => {
                  const selected = isSelected(optIdx);
                  const keyLetter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => selectOption(optIdx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        selected
                          ? "bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-950/30"
                          : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20 text-slate-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border ${
                            selected
                              ? "bg-purple-600 border-purple-400 text-white"
                              : "bg-white/[0.06] border-white/[0.08] text-slate-400"
                          }`}
                        >
                          {keyLetter}
                        </span>
                        <span className="text-xs sm:text-sm font-mono leading-relaxed">
                          {renderFormattedText(option)}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline">
                        [{optIdx + 1}]
                      </span>
                    </button>
                  );
                })}
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                ← Prev
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {quiz.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex
                        ? "w-6 bg-purple-500"
                        : selectedAnswers[q.id] !== undefined
                        ? "w-2 bg-emerald-400/80"
                        : "w-2 bg-white/[0.15]"
                    }`}
                    title={`Question ${idx + 1}`}
                  />
                ))}
              </div>

              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Grading...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit</span>
                      <span>✓</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-purple-950/40 transition-all cursor-pointer"
                >
                  <span>Next</span>
                  <span>→</span>
                </button>
              )}
            </div>

            {/* Hint Confirmation Overlay */}
            {showHintConfirm && (
              <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
                <div className="w-full max-w-sm rounded-2xl bg-[#0F1424] border border-amber-500/30 p-5 text-center space-y-4 shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center mx-auto text-lg">
                    💡
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Unlock Architectural Hint?</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Revealing this hint costs <strong className="text-amber-300">5 XP</strong> from this quiz's reward.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowHintConfirm(false)}
                      className="flex-1 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono font-bold text-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={unlockHint}
                      className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-mono font-bold text-black cursor-pointer shadow-md"
                    >
                      Unlock (-5 XP)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ────────────────────────────────────────────────────────── */}
        {/* VIEW 2: RESULTS VIEW INSIDE MODAL                          */}
        {/* ────────────────────────────────────────────────────────── */}
        {result && (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono font-bold">
                  {badgeCode}
                </span>
                <span className="text-sm font-bold text-white tracking-tight truncate max-w-xs sm:max-w-md">
                  {result.lessonTitle}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xs font-bold"
                aria-label="Close Results"
              >
                ✕
              </button>
            </div>

            {/* Results Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#080B14]">
              {/* Hero Status & Score Dial */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.08]">
                {/* Score Dial */}
                <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#13192B"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={result.passed ? "#10B981" : "#A855F7"}
                      strokeWidth="8"
                      strokeDasharray="251.3"
                      strokeDashoffset={
                        251.3 - (251.3 * Math.min(100, Math.max(0, result.score))) / 100
                      }
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black font-mono text-white">
                      {result.score}%
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold tracking-wider uppercase ${
                        result.passed ? "text-emerald-400" : "text-purple-300"
                      }`}
                    >
                      {result.passed ? "PASSED" : "RETAKE"}
                    </span>
                  </div>
                </div>

                {/* Narrative & Milestone */}
                <div className="flex-1 text-center sm:text-left">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-2 border ${
                      result.passed
                        ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                        : "bg-purple-500/10 text-purple-300 border-purple-500/30"
                    }`}
                  >
                    {result.passed ? "✓ Benchmark Cleared" : "⚠️ Retake Recommended"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {result.passed ? "Mastery Achieved!" : "Needs More Practice"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {result.passed
                      ? `Great job! You achieved ${result.score}%, passing the 70% threshold. You've earned +${result.netXpEarned} XP.`
                      : `You scored ${result.score}%, below the 70% threshold. Review the explanations below and try again to unlock XP!`}
                  </p>
                </div>
              </div>

              {/* 4 Compact Stat Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase block">Questions</span>
                  <span className="text-xl font-bold font-mono text-white">{result.totalQuestions}</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 text-center">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase block">Correct</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">{result.correctAnswers}</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 text-center">
                  <span className="text-[10px] font-mono text-rose-400 uppercase block">Missed</span>
                  <span className="text-xl font-bold font-mono text-rose-400">
                    {result.totalQuestions - result.correctAnswers}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/[0.04] border border-purple-500/20 text-center">
                  <span className="text-[10px] font-mono text-purple-300 uppercase block">XP Awarded</span>
                  <span className="text-xl font-bold font-mono text-purple-300">+{result.netXpEarned}</span>
                </div>
              </div>

              {/* Interactive Question Breakdown with inline explanations */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>QUESTION BREAKDOWN & REASONING</span>
                  <span>Click to expand</span>
                </div>

                {result.evaluations.map((evalItem, idx) => {
                  const isExpanded = expandedQuestionId === evalItem.questionId;

                  return (
                    <div
                      key={evalItem.questionId}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all"
                    >
                      <button
                        onClick={() =>
                          setExpandedQuestionId(isExpanded ? null : evalItem.questionId)
                        }
                        className="w-full p-3.5 flex items-center justify-between gap-3 text-left hover:bg-white/[0.04] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`w-6 h-6 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 border ${
                              evalItem.isCorrect
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            }`}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                            {evalItem.prompt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                              evalItem.isCorrect
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            }`}
                          >
                            {evalItem.isCorrect ? "✓ Correct" : "✕ Incorrect"}
                          </span>
                          <span className="text-slate-400 text-xs">
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {/* Expanded Explanation */}
                      {isExpanded && (
                        <div className="p-4 border-t border-white/[0.06] bg-black/30 space-y-3 text-xs leading-relaxed animate-in fade-in duration-150">
                          {/* Code Snippet if present */}
                          {evalItem.codeSnippet && (
                            <pre className="p-3 rounded-lg bg-[#06080F] border border-white/10 text-xs font-mono text-purple-200 overflow-x-auto whitespace-pre custom-scrollbar">
                              <code>{evalItem.codeSnippet}</code>
                            </pre>
                          )}

                          {/* Options Breakdown */}
                          <div className="space-y-1.5 font-mono text-[11px]">
                            {evalItem.options.map((opt, optIdx) => {
                              const isUserPick = evalItem.userAnswer === optIdx;
                              const isCorrectPick = evalItem.correctAnswer === optIdx;

                              let optClass = "text-slate-400 bg-white/[0.02] border-white/[0.04]";
                              if (isCorrectPick) {
                                optClass = "text-emerald-300 bg-emerald-500/10 border-emerald-500/30 font-semibold";
                              } else if (isUserPick && !evalItem.isCorrect) {
                                optClass = "text-rose-300 bg-rose-500/10 border-rose-500/30";
                              }

                              return (
                                <div
                                  key={optIdx}
                                  className={`p-2 rounded-lg border flex items-center justify-between gap-2 ${optClass}`}
                                >
                                  <span>{opt}</span>
                                  <span className="text-[10px] uppercase font-bold shrink-0">
                                    {isCorrectPick && "✓ Correct"}
                                    {isUserPick && !isCorrectPick && "✗ Your Pick"}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation Box */}
                          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-slate-300">
                            <strong className="block text-purple-300 font-bold mb-1 flex items-center gap-1.5">
                              <span>💡</span> Architectural Insight:
                            </strong>
                            <p>{renderFormattedText(evalItem.explanation)}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Results Modal Footer */}
            <div className="px-6 py-4 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between gap-3">
              <button
                onClick={handleRetry}
                className="py-2.5 px-4 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <span>🔄</span>
                <span>Retry Quiz</span>
              </button>

              {result.passed && trackHref ? (
                <Link
                  href={trackHref}
                  onClick={onClose}
                  className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950/40 cursor-pointer inline-flex items-center"
                >
                  Done & Continue Learning →
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-md shadow-purple-950/40 cursor-pointer"
                >
                  {result.passed ? "Done & Continue Learning →" : "Close & Study Lesson"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
