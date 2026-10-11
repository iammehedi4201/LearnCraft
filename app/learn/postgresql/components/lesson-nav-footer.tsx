"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getNextLesson,
  getPrevLesson,
  POSTGRESQL_CAPSTONE,
} from "../data/postgresql-curriculum";
import {
  isLessonComplete,
  toggleLessonComplete,
} from "../data/progress-store";

interface LessonNavFooterProps {
  currentSlug: string;
}

export function LessonNavFooter({ currentSlug }: LessonNavFooterProps) {
  const [_completed, setCompleted] = useState<boolean>(false);
  const nextLesson = getNextLesson(currentSlug);
  const prevLesson = getPrevLesson(currentSlug);

  useEffect(() => {
    setCompleted(isLessonComplete(currentSlug));
    const handleUpdate = () => {
      setCompleted(isLessonComplete(currentSlug));
    };
    window.addEventListener("learncraft-postgresql-progress-updated", handleUpdate);
    return () => {
      window.removeEventListener("learncraft-postgresql-progress-updated", handleUpdate);
    };
  }, [currentSlug]);

  const handleNextClick = async () => {
    const isNowDone = await toggleLessonComplete(currentSlug);
    setCompleted(isNowDone);
  };

  return (
    <div className="p-5 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-xl flex items-center justify-between gap-4 mt-12">
      {/* Left Side: Previous Lesson */}
      <div>
        {prevLesson ? (
          <Link
            href={prevLesson.path}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border border-white/[0.08] text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>Previous: {prevLesson.code}</span>
          </Link>
        ) : (
          <span className="text-xs font-mono text-slate-500 px-3 py-2">Start of Course</span>
        )}
      </div>

      {/* Right Side: Next Lesson */}
      <div>
        {nextLesson ? (
          <Link
            href={nextLesson.path}
            onClick={handleNextClick}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600/20 hover:bg-purple-600/35 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-2 font-mono cursor-pointer"
          >
            <span>Next: {nextLesson.code}</span>
            <span>→</span>
          </Link>
        ) : (
          <Link
            href={POSTGRESQL_CAPSTONE.path}
            onClick={handleNextClick}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5 font-mono cursor-pointer"
          >
            <span>Launch Capstone 🎓</span>
          </Link>
        )}
      </div>
    </div>
  );
}
