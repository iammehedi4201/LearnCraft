"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
} from "./icons";
import {
  getNextLesson,
  getPrevLesson,
  OOP_CAPSTONE,
} from "../data/oop-curriculum";
import { isLessonComplete } from "../data/progress-store";

interface LessonNavFooterProps {
  currentSlug: string;
  isLessonCompleted?: boolean;
  canComplete?: boolean;
  onLessonComplete?: () => void;
}

export function LessonNavFooter({
  currentSlug,
  isLessonCompleted,
  canComplete,
  onLessonComplete,
}: LessonNavFooterProps) {
  const [completed, setCompleted] = useState<boolean>(() => {
    if (isLessonCompleted !== undefined) return isLessonCompleted;
    return isLessonComplete(currentSlug);
  });

  const prevLesson = getPrevLesson(currentSlug);
  const nextLesson = getNextLesson(currentSlug);

  useEffect(() => {
    if (isLessonCompleted !== undefined) {
      setCompleted(isLessonCompleted);
    } else {
      setCompleted(isLessonComplete(currentSlug));
    }
  }, [currentSlug, isLessonCompleted]);

  useEffect(() => {
    let isMounted = true;

    const handleProgressUpdated = () => {
      if (isMounted) {
        if (isLessonCompleted !== undefined) {
          setCompleted(isLessonCompleted);
        } else {
          setCompleted(isLessonComplete(currentSlug));
        }
      }
    };

    window.addEventListener(
      "learncraft-oop-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-oop-progress-updated",
        handleProgressUpdated
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleProgressUpdated
      );
    };
  }, [currentSlug, isLessonCompleted]);

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
              href="/learn/oop"
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 p-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>OOP Hub</span>
            </Link>
          )}
        </div>

        {/* Completion Indicator */}
        <div className="flex justify-center">
          {completed ? (
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lesson Completed</span>
            </div>
          ) : canComplete && onLessonComplete ? (
            <button
              type="button"
              onClick={onLessonComplete}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/20 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-white/70" />
              <span>Finish & Complete Lesson ✓</span>
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs font-mono">
              <Circle className="w-3.5 h-3.5 text-slate-500" />
              <span>Complete all modules to finish</span>
            </div>
          )}
        </div>

        {/* Next Lesson */}
        <div className="flex justify-end">
          {nextLesson ? (
            <Link
              href={nextLesson.path}
              className="group flex items-center justify-end gap-3 p-3 rounded-xl bg-[#0E121B] border border-white/[0.06] hover:border-purple-500/40 transition-all text-right w-full sm:w-auto ml-auto"
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
              href={OOP_CAPSTONE.path}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 transition-all ml-auto"
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
