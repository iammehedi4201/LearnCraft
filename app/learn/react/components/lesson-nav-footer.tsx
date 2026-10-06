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
} from "../data/react-curriculum";
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
    let isMounted = true;

    if (!isAuthenticated) {
      setCompleted(false);
      return;
    }

    setCompleted(isLessonComplete(currentSlug));

    const handleProgressUpdated = () => {
      if (isMounted) {
        setCompleted(isLessonComplete(currentSlug));
      }
    };

    window.addEventListener(
      "learncraft-react-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-react-progress-updated",
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
            <div />
          )}
        </div>

        {/* Mark Done Toggle */}
        <div className="flex justify-center">
          {isAuthenticated ? (
            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                completed
                  ? "bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 shadow-emerald-500/10"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08]"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Completed (Click to Unmark)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>Mark Lesson Complete</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <span className="text-xs text-slate-500 font-mono">
                Sign in to track progress
              </span>
            </div>
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
                <span className="text-[10px] font-mono text-slate-500 block uppercase">
                  Next ({nextLesson.code})
                </span>
                <span className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate block max-w-[180px]">
                  {nextLesson.name}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] group-hover:bg-purple-500/10 flex items-center justify-center text-slate-400 group-hover:text-purple-300 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
