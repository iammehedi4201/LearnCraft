"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuestionsByTrack } from "@/lib/interview-questions";
import { TOPICS_META } from "@/lib/topic-registry";
import {
  recordQuestionGrade,
  getAllQuestionProgress,
} from "@/lib/interview-progress";
import { InterviewQuestion, QuestionProgress, InterviewGrade } from "@/types/interview";
import { Flashcard } from "@/components/interview/Flashcard";

interface PracticePageProps {
  params: Promise<{ track: string }>;
}

export default function TrackPracticePage({ params }: PracticePageProps) {
  const resolvedParams = use(params);
  const trackKey = resolvedParams.track;

  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressMap, setProgressMap] = useState<Record<string, QuestionProgress>>({});
  const [sessionXP, setSessionXP] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionRatings, setSessionRatings] = useState<Record<string, InterviewGrade>>({});

  useEffect(() => {
    const qs = getQuestionsByTrack(trackKey);
    if (!qs || qs.length === 0) return;

    const prog = getAllQuestionProgress();
    setProgressMap(prog);

    // Prioritize due questions, followed by unreviewed, then others
    const today = new Date().toISOString().split("T")[0];
    const sorted = [...qs].sort((a, b) => {
      const progA = prog[a.id];
      const progB = prog[b.id];

      // If unreviewed, prioritize
      if (!progA && progB) return -1;
      if (progA && !progB) return 1;
      if (!progA && !progB) return 0;

      // Check due date
      const isDueA = progA.nextReviewDate <= today;
      const isDueB = progB.nextReviewDate <= today;
      if (isDueA && !isDueB) return -1;
      if (!isDueA && isDueB) return 1;

      return 0;
    });

    setQuestions(sorted);
  }, [trackKey]);

  if (!questions || (questions.length === 0 && TOPICS_META[trackKey])) {
    return (
      <div className="min-h-screen bg-[#08090C] text-neutral-100 flex items-center justify-center p-4">
        <div className="p-8 rounded-2xl bg-neutral-900 border border-white/[0.08] text-center max-w-md space-y-4">
          <span className="text-4xl">⏳</span>
          <h2 className="text-xl font-bold text-white">Questions Coming Soon</h2>
          <p className="text-xs text-neutral-400">
            Interview questions for {TOPICS_META[trackKey]?.title || trackKey} are being curated.
            Explore other active tracks in the meantime.
          </p>
          <Link
            href="/interview"
            className="inline-block px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
          >
            ← Back to Interview Hub
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0 && !TOPICS_META[trackKey]) {
    notFound();
  }

  const meta = TOPICS_META[trackKey] || {
    title: trackKey.toUpperCase(),
    icon: "🎯",
    description: "Interview Practice",
  };

  const currentQ = questions[currentIndex];
  const currentProgress = currentQ ? progressMap[currentQ.id] || null : null;
  const progressPercent =
    questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  const handleGrade = (grade: InterviewGrade) => {
    if (!currentQ) return;
    const updated = recordQuestionGrade(currentQ.id, grade);
    setProgressMap((prev) => ({ ...prev, [currentQ.id]: updated }));
    setSessionRatings((prev) => ({ ...prev, [currentQ.id]: grade }));

    // XP calculation: +5 XP baseline, +3 bonus for good/easy
    const xpBonus = grade === "easy" || grade === "good" ? 8 : 5;
    setSessionXP((prev) => prev + xpBonus);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsCompleted(false);
    setSessionRatings({});
    setSessionXP(0);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-neutral-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/interview"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Interview Hub</span>
          </Link>

          {/* Track Name & Actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/interview/${trackKey}/browse`}
              className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              📖 Browse All ({questions.length})
            </Link>

            {sessionXP > 0 && (
              <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono">
                +{sessionXP} XP Earned
              </span>
            )}
          </div>
        </div>

        {/* Progress & Track Header */}
        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-white/[0.06] backdrop-blur-md space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{meta.icon}</span>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>{meta.title} Interview Practice</span>
                </h1>
                <span className="text-[11px] text-neutral-400">
                  SM-2 Active Recall Flashcard Mode
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-neutral-200">
                {currentIndex + 1} / {questions.length}
              </span>
              <span className="block text-[10px] text-neutral-400">Questions</span>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Content Area: Flashcard or Completion Screen */}
        {!isCompleted && currentQ ? (
          <Flashcard
            question={currentQ}
            progress={currentProgress}
            onGrade={handleGrade}
            onNext={handleNext}
            isLastQuestion={currentIndex === questions.length - 1}
          />
        ) : (
          /* Session Completion Screen */
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border border-white/[0.08] shadow-2xl backdrop-blur-xl text-center space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-xl shadow-purple-500/20">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Practice Session Complete!
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto">
                You reviewed {questions.length} questions in {meta.title}. Your answers have been
                recorded in your SuperMemo SM-2 memory retention engine.
              </p>
            </div>

            {/* Quick Session Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[11px] text-neutral-400 block mb-0.5">Reviewed</span>
                <span className="text-xl font-bold text-white font-mono">
                  {questions.length} Questions
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[11px] text-neutral-400 block mb-0.5">Confident</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">
                  {Object.values(sessionRatings).filter((g) => g === "easy" || g === "good").length}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[11px] text-neutral-400 block mb-0.5">XP Earned</span>
                <span className="text-xl font-bold text-purple-400 font-mono">
                  +{sessionXP} XP
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[11px] text-neutral-400 block mb-0.5">Next Review</span>
                <span className="text-xl font-bold text-indigo-400 font-mono">Scheduled</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={restartSession}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95"
              >
                🔄 Review Again
              </button>

              <Link
                href={`/interview/${trackKey}/browse`}
                className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-neutral-200 font-semibold text-xs sm:text-sm transition-all text-center"
              >
                📖 Browse All Questions
              </Link>

              <Link
                href="/interview"
                className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.08] text-neutral-200 font-semibold text-xs sm:text-sm transition-all text-center"
              >
                ← Back to Hub
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
