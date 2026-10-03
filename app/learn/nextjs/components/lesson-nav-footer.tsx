"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, LayoutGrid, Clock } from "./icons";
import {
  getNextNextjsLesson,
  getPrevNextjsLesson,
  getNextjsStageByLessonSlug,
} from "../data/nextjs-curriculum";
import {
  isLessonComplete,
  markLessonComplete,
  toggleLessonComplete,
  getCompletionByStage,
} from "../data/progress-store";

interface NextjsLessonNavFooterProps {
  currentSlug: string;
  onLessonComplete?: () => void;
}

export function NextjsLessonNavFooter({
  currentSlug,
  onLessonComplete,
}: NextjsLessonNavFooterProps) {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [completed, setCompleted] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const prevLesson = getPrevNextjsLesson(currentSlug);
  const nextLesson = getNextNextjsLesson(currentSlug);
  const currentStage = getNextjsStageByLessonSlug(currentSlug);

  useEffect(() => {
    if (!isAuthenticated) {
      setCompleted(false);
      return;
    }

    setCompleted(isLessonComplete(currentSlug));

    const handleProgressUpdated = () => {
      setCompleted(isLessonComplete(currentSlug));
    };

    window.addEventListener("learncraft-progress-updated", handleProgressUpdated);
    window.addEventListener("nextjs-progress-updated", handleProgressUpdated);
    return () => {
      window.removeEventListener("learncraft-progress-updated", handleProgressUpdated);
      window.removeEventListener("nextjs-progress-updated", handleProgressUpdated);
    };
  }, [currentSlug, isAuthenticated]);

  const handleToggleComplete = () => {
    if (!isAuthenticated) return;

    const isNowDone = toggleLessonComplete(currentSlug);
    setCompleted(isNowDone);

    if (isNowDone && currentStage) {
      const stageStats = getCompletionByStage(currentStage.id);
      if (stageStats.isCompleted) {
        setShowCelebration(true);
      }
    }

    if (onLessonComplete) {
      onLessonComplete();
    }
  };

  const handleNextClick = () => {
    if (isAuthenticated && !completed) {
      markLessonComplete(currentSlug);
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-white/[0.08] space-y-6">
      {/* Stage Celebration Banner */}
      {showCelebration && currentStage && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/60 to-slate-900 border border-purple-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
              🎉 Stage Complete!
            </span>
            <h4 className="text-lg font-bold text-white">
              You finished {currentStage.name}!
            </h4>
            <p className="text-xs text-slate-300">
              {currentStage.capstone ? "You are now ready to tackle the Stage Capstone project!" : "Keep up the momentum!"}
            </p>
          </div>
          {currentStage.capstone && (
            <Link
              href={currentStage.capstone.path}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
            >
              Start Capstone Project →
            </Link>
          )}
        </div>
      )}

      {/* Completion toggle bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-sm">
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleToggleComplete}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  completed
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                    : "bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Lesson Completed (+100 XP)</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>
              <span className="text-xs text-slate-400 hidden md:inline">
                {completed
                  ? "Great job! Keep going to the next lesson."
                  : "Check off when you've reviewed the code and concepts."}
              </span>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("learncraft:open-auth-modal"));
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all cursor-pointer"
              >
                <span>⚡ Sign In</span>
              </button>
              <span className="text-xs text-slate-400">
                Sign in to save your module progress to the database.
              </span>
            </div>
          )}
        </div>

        <Link
          href="/learn/nextjs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-purple-300 transition-colors"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>Full Roadmap</span>
        </Link>
      </div>

      {/* Prev / Next Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous Lesson */}
        {prevLesson ? (
          <Link
            href={prevLesson.path}
            className="group flex flex-col justify-between p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] hover:border-white/20 transition-all text-left shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 group-hover:text-white transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Previous Lesson</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-300 bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 rounded">
                  {prevLesson.code}
                </span>
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {prevLesson.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                {prevLesson.desc}
              </p>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-slate-500 text-xs flex items-center justify-center font-medium">
            You are at the start of the curriculum.
          </div>
        )}

        {/* Next Lesson */}
        {nextLesson ? (
          <Link
            href={nextLesson.path}
            onClick={handleNextClick}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/30 to-[#0E121B] hover:border-purple-400 hover:from-purple-950/50 hover:to-[#121624] text-white transition-all text-right shadow-lg shadow-purple-950/20 cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-purple-400 font-bold mb-2 group-hover:text-purple-300">
              <span>Next Lesson</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-black text-white group-hover:text-purple-200 transition-colors">
                  {nextLesson.name}
                </span>
                <span className="font-mono text-xs font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-md">
                  {nextLesson.code}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {nextLesson.estimatedMinutes} min
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/20">
                  {nextLesson.tag}
                </span>
              </div>
            </div>
          </Link>
        ) : currentStage?.capstone ? (
          <Link
            href={currentStage.capstone.path}
            className="group flex flex-col justify-between p-5 rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/40 to-[#0E121B] hover:border-purple-400 hover:from-purple-950/60 text-white transition-all text-right shadow-lg shadow-purple-950/30 cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2 text-xs text-purple-400 font-bold mb-2">
              <span>Stage Capstone Project</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
            <div>
              <div className="text-sm font-black text-white group-hover:text-purple-200 transition-colors">
                🛠️ {currentStage.capstone.title}
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-1 text-right">
                {currentStage.capstone.desc}
              </p>
            </div>
          </Link>
        ) : (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-center font-bold">
            🎉 You have reached the end of the curriculum!
          </div>
        )}
      </div>
    </div>
  );
}
