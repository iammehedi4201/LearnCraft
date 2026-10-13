"use client";

import Link from "next/link";
import { TechIcon } from "@/components/roadmap/TechIcon";

export interface NextLessonRecommendation {
  trackKey: string;
  trackTitle: string;
  lessonId: string;
  lessonTitle: string;
  phaseName: string;
  phaseNumber: number;
  minutes: number;
  href: string;
  progressPercent: number;
}

interface ContinueLearningCardProps {
  recommendation?: NextLessonRecommendation | null;
}

export function ContinueLearningCard({ recommendation }: ContinueLearningCardProps) {
  if (!recommendation) {
    return (
      <div className="rounded-2xl bg-[#0E121B] border border-white/[0.08] p-6 text-center space-y-3">
        <span className="text-3xl block">🚀</span>
        <h3 className="text-base font-bold text-white">Start Your Learning Journey</h3>
        <p className="text-xs text-neutral-400 max-w-sm mx-auto">
          Choose a foundational track like Next.js, React, or TypeScript to begin building your engineering mastery.
        </p>
        <Link
          href="/learn/nextjs"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/20 active:scale-95"
        >
          <span>Begin Next.js Track</span>
          <span>→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl bg-[#0E121B] border border-purple-500/30 p-5 sm:p-6 shadow-xl shadow-black/20 overflow-hidden group">
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500/60" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          {/* Tech icon box */}
          <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-2.5 shrink-0 shadow-sm group-hover:border-purple-500/40 transition-colors">
            <TechIcon slug={recommendation.trackKey} className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                CONTINUE LEARNING
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                {recommendation.trackTitle} · Phase {recommendation.phaseNumber} ({recommendation.phaseName})
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {recommendation.lessonTitle}
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-0.5">
              <span>⏱️ ~{recommendation.minutes} mins</span>
              <span>·</span>
              <span>Track Progress: {recommendation.progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="shrink-0 self-start md:self-center">
          <Link
            href={recommendation.href}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer active:scale-95"
          >
            <span>Resume Lesson</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
