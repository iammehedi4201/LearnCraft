"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "./icons";
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

      {/* Primary Navigation Controls (3-Column Layout from Image 2) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        {/* Previous Lesson */}
        <div className="flex justify-start">
          {prevLesson ? (
            <Link
              href={prevLesson.path}
              className="group flex items-center gap-3 p-3 rounded-xl bg-[#0E121B] border border-white/[0.06] hover:border-purple-500/40 transition-all text-left w-full sm:w-auto"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-purple-500/10 flex items-center justify-center text-slate-400 group-hover:text-purple-300 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  Previous ({prevLesson.code})
                </span>
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate block max-w-[180px]">
                  {prevLesson.name}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/learn/nextjs"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 p-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Next.js Roadmap</span>
            </Link>
          )}
        </div>

        {/* Completion Toggle in Center */}
        <div className="flex justify-center">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                completed
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Lesson Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-white/60" />
                  <span>Mark as Complete</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("learncraft:open-auth-modal")
                  );
                }
              }}
              className="text-xs text-slate-500 hover:text-purple-400 font-mono transition-colors cursor-pointer"
            >
              Sign in to save progress
            </button>
          )}
        </div>

        {/* Next Lesson / Capstone */}
        <div className="flex justify-end">
          {nextLesson ? (
            <Link
              href={nextLesson.path}
              onClick={handleNextClick}
              className="group flex items-center justify-end gap-3 p-3 rounded-xl bg-[#0E121B] border border-white/[0.06] hover:border-purple-500/40 transition-all text-right w-full sm:w-auto"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-purple-400 block uppercase">
                  Next ({nextLesson.code})
                </span>
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate block max-w-[180px]">
                  {nextLesson.name}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 group-hover:bg-purple-600 flex items-center justify-center text-purple-300 group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : currentStage?.capstone ? (
            <Link
              href={currentStage.capstone.path}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all"
            >
              <span>Launch Capstone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="text-xs text-emerald-400 font-bold p-3">
              🎉 All Lessons Completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
