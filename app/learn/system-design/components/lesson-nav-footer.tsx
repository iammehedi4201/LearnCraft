"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getLessonBySlug,
  getNextLessonSlug,
  getPrevLessonSlug,
} from "../data/system-design-curriculum";
import {
  isLessonComplete,
  toggleLessonComplete,
} from "../data/progress-store";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "./icons";

interface LessonNavFooterProps {
  currentSlug: string;
}

export function LessonNavFooter({ currentSlug }: LessonNavFooterProps) {
  const [completed, setCompleted] = useState<boolean>(() =>
    isLessonComplete(currentSlug)
  );

  const prevSlug = getPrevLessonSlug(currentSlug);
  const nextSlug = getNextLessonSlug(currentSlug);
  const prevLesson = prevSlug ? getLessonBySlug(prevSlug) : null;
  const nextLesson = nextSlug ? getLessonBySlug(nextSlug) : null;

  useEffect(() => {
    setCompleted(isLessonComplete(currentSlug));
    const handleUpdate = () => {
      setCompleted(isLessonComplete(currentSlug));
    };

    window.addEventListener(
      "learncraft-system-design-progress-updated",
      handleUpdate
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleUpdate
    );

    return () => {
      window.removeEventListener(
        "learncraft-system-design-progress-updated",
        handleUpdate
      );
      window.removeEventListener(
        "learncraft-progress-updated",
        handleUpdate
      );
    };
  }, [currentSlug]);

  const handleToggle = () => {
    const newState = toggleLessonComplete(currentSlug);
    setCompleted(newState);
  };

  return (
    <footer className="mt-12 p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
      {/* Previous Lesson Link */}
      <div className="w-full sm:w-auto flex-1">
        {prevLesson ? (
          <Link
            href={prevLesson.path}
            className="group flex items-center gap-3 p-3 rounded-xl bg-[#090C14] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.02] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:-translate-x-0.5 transition-all" />
            <div className="min-w-0">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Previous Lesson
              </span>
              <span className="block text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                {prevLesson.code}: {prevLesson.name}
              </span>
            </div>
          </Link>
        ) : (
          <Link
            href="/learn/system-design"
            className="group flex items-center gap-3 p-3 rounded-xl bg-[#090C14] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.02] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:-translate-x-0.5 transition-all" />
            <div className="min-w-0">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Curriculum Hub
              </span>
              <span className="block text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                System Design Overview
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* Completion Toggle Button */}
      <div className="w-full sm:w-auto shrink-0 flex justify-center">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer border ${
            completed
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25 shadow-md shadow-emerald-500/10"
              : "bg-purple-600 hover:bg-purple-500 text-white border-purple-400/40 shadow-lg shadow-purple-600/30 active:scale-95"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{completed ? "Completed ✓" : "Mark as Completed"}</span>
        </button>
      </div>

      {/* Next Lesson Link */}
      <div className="w-full sm:w-auto flex-1 flex justify-end">
        {nextLesson ? (
          <Link
            href={nextLesson.path}
            className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-[#090C14] border border-white/[0.06] hover:border-purple-500/30 hover:bg-white/[0.02] transition-all w-full sm:w-auto text-right"
          >
            <div className="min-w-0">
              <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Next Lesson
              </span>
              <span className="block text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                {nextLesson.code}: {nextLesson.name}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
          </Link>
        ) : (
          <Link
            href="/learn/system-design/projects/pulsescale-engine"
            className="group flex items-center gap-3 p-3 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-all shadow-md shadow-purple-600/20"
          >
            <span>Proceed to Capstone</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </footer>
  );
}
