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
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "./icons";

interface LessonNavFooterProps {
  currentSlug: string;
}

export function LessonNavFooter({ currentSlug }: LessonNavFooterProps) {
  const [completed, setCompleted] = useState<boolean>(false);
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

  const handleToggle = async () => {
    const isNowDone = await toggleLessonComplete(currentSlug);
    setCompleted(isNowDone);
  };

  return (
    <footer className="mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Prev Lesson Button */}
      {prevLesson ? (
        <Link
          href={prevLesson.path}
          className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-[#0E121B] hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left">
            <span className="block text-[10px] text-slate-500 font-mono uppercase">
              Previous ({prevLesson.code})
            </span>
            <span className="truncate max-w-[200px] block">{prevLesson.name}</span>
          </div>
        </Link>
      ) : (
        <Link
          href="/learn/postgresql"
          className="w-full sm:w-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-[#0E121B] hover:bg-white/[0.04] text-slate-300 hover:text-white text-xs font-semibold transition-all group shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left">
            <span className="block text-[10px] text-slate-500 font-mono uppercase">
              Curriculum Hub
            </span>
            <span className="truncate max-w-[200px] block">PostgreSQL Overview</span>
          </div>
        </Link>
      )}

      {/* Mark Completed Toggle */}
      <button
        onClick={handleToggle}
        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
          completed
            ? "bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25"
            : "bg-[#0E121B] hover:bg-white/[0.04] text-slate-300 hover:text-white border border-white/[0.08]"
        }`}
      >
        {completed ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Completed</span>
          </>
        ) : (
          <>
            <Circle className="w-4 h-4 text-slate-500" />
            <span>Mark as Completed</span>
          </>
        )}
      </button>

      {/* Next Lesson or Capstone Project */}
      {nextLesson ? (
        <Link
          href={nextLesson.path}
          className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-4 py-2.5 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-semibold transition-all group shadow-sm"
        >
          <div className="text-right">
            <span className="block text-[10px] text-purple-400 font-mono uppercase">
              Next ({nextLesson.code})
            </span>
            <span className="truncate max-w-[200px] block">{nextLesson.name}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <Link
          href={POSTGRESQL_CAPSTONE.path}
          className="w-full sm:w-auto inline-flex items-center justify-end gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md group"
        >
          <span>Start Capstone Project</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </footer>
  );
}
