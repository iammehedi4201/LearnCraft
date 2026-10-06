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
} from "../data/mongodb-curriculum";
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
      "learncraft-mongodb-progress-updated",
      handleProgressUpdated
    );
    window.addEventListener(
      "learncraft-progress-updated",
      handleProgressUpdated
    );
    return () => {
      isMounted = false;
      window.removeEventListener(
        "learncraft-mongodb-progress-updated",
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
    <div className="mt-14 pt-8 border-t border-ds-stroke-soft space-y-6">
      {/* Primary Navigation Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        {/* Previous Lesson */}
        <div className="flex justify-start">
          {prevLesson ? (
            <Link
              href={prevLesson.path}
              className="group flex items-center gap-3 p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base transition-all text-left w-full sm:w-auto shadow-sm"
            >
              <div className="w-8 h-8 rounded-lg bg-ds-bg-weak group-hover:bg-ds-feature-lighter flex items-center justify-center text-ds-text-soft group-hover:text-ds-feature-dark transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-ds-text-soft block uppercase">
                  Previous ({prevLesson.code})
                </span>
                <span className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-dark truncate block max-w-[180px]">
                  {prevLesson.name}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/learn/mongodb"
              className="inline-flex items-center gap-2 text-xs text-ds-text-soft hover:text-ds-text-strong p-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>MongoDB Hub</span>
            </Link>
          )}
        </div>

        {/* Mark Done Toggle */}
        <div className="flex justify-center">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handleToggleComplete}
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm cursor-pointer ${
                completed
                  ? "bg-ds-success-lighter text-ds-success-dark border border-ds-success-base/30"
                  : "bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white shadow-ds-feature-base/20"
              }`}
            >
              {completed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-ds-success-base" />
                  <span>Completed (Click to Unmark)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-ds-static-white/80" />
                  <span>Mark Lesson Complete</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-center">
              <span className="text-xs text-ds-text-soft font-mono bg-ds-bg-weak border border-ds-stroke-soft px-4 py-2 rounded-xl">
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
              className="group flex items-center justify-end gap-3 p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft hover:border-ds-feature-base transition-all text-right w-full sm:w-auto shadow-sm"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-ds-text-soft block uppercase">
                  Next ({nextLesson.code})
                </span>
                <span className="text-xs font-bold text-ds-text-strong group-hover:text-ds-feature-dark truncate block max-w-[180px]">
                  {nextLesson.name}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-ds-bg-weak group-hover:bg-ds-feature-lighter flex items-center justify-center text-ds-text-soft group-hover:text-ds-feature-dark transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ) : (
            <Link
              href="/learn/mongodb/projects/ecommerce-database"
              className="group flex items-center justify-end gap-3 p-3 rounded-xl bg-ds-feature-lighter border border-ds-feature-base/30 hover:border-ds-feature-base transition-all text-right w-full sm:w-auto shadow-sm"
            >
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-ds-feature-dark block uppercase font-bold">
                  Final Capstone
                </span>
                <span className="text-xs font-bold text-ds-feature-dark truncate block max-w-[180px]">
                  ShopSphere DB
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-ds-feature-base text-ds-static-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
