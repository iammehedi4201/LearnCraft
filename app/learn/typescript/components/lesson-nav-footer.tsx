"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "./icons";
import {
  getNextLesson,
  getPrevLesson,
} from "../data/typescript-curriculum";
import {
  isLessonComplete,
  toggleLessonComplete,
} from "../data/progress-store";

interface LessonNavFooterProps {
  currentSlug: string;
  onLessonComplete?: () => void;
}

export function LessonNavFooter({
  currentSlug,
  onLessonComplete,
}: LessonNavFooterProps) {
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [completed, setCompleted] = useState<boolean>(false);

  const prevLesson = getPrevLesson(currentSlug);
  const nextLesson = getNextLesson(currentSlug);

  useEffect(() => {
    if (!isAuthenticated) {
      setCompleted(false);
      return;
    }

    setCompleted(isLessonComplete(currentSlug));

    const handleProgressUpdated = () => {
      setCompleted(isLessonComplete(currentSlug));
    };

    window.addEventListener(
      "learncraft-ts-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      window.removeEventListener(
        "learncraft-ts-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
    };
  }, [currentSlug, isAuthenticated]);

  const handleToggleComplete = async () => {
    if (!isAuthenticated) return;
    const nextState = await toggleLessonComplete(currentSlug);
    setCompleted(nextState);
    if (nextState && onLessonComplete) {
      onLessonComplete();
    }
  };

  return (
    <div className="mt-16 pt-8 border-t border-white/[0.08] space-y-6">
      {/* Primary Navigation Controls */}
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
              href="/learn/typescript"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 p-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>TypeScript Hub</span>
            </Link>
          )}
        </div>

        {/* Completion Toggle */}
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
            <span className="text-xs text-slate-500 font-mono">
              Sign in to save progress
            </span>
          )}
        </div>

        {/* Next Lesson */}
        <div className="flex justify-end">
          {nextLesson ? (
            <Link
              href={nextLesson.path}
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
          ) : (
            <Link
              href="/learn/typescript/projects/type-safe-data-store"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all"
            >
              <span>Launch Capstone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
