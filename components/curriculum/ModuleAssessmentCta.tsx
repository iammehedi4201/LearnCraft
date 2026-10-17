"use client";

import Link from "next/link";

export interface ModuleAssessmentCtaProps {
  moduleCode: string;
  quizHref: string;
  title?: string;
  description?: string;
  xpReward?: number;
  features?: string[];
  className?: string;
  id?: string;
}

export function ModuleAssessmentCta({
  moduleCode,
  quizHref,
  title = "Ready for Full Assessment & Code Prediction?",
  description,
  xpReward = 30,
  features = ["Code Output Prediction", "Mental Model Check", "Instant Feedback"],
  className = "",
  id,
}: ModuleAssessmentCtaProps): JSX.Element {
  return (
    <div
      id={id}
      className={`group relative rounded-2xl bg-[#0E121B] border border-purple-500/30 p-5 sm:p-6 shadow-xl shadow-purple-950/10 hover:border-purple-500/50 transition-colors ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left Side: Icon + Badges + Content */}
        <div className="flex items-start sm:items-center gap-4">
          {/* Clean Solid Icon Container */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
            🎯
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Badge Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider">
                <span>✦</span>
                <span>MODULE ASSESSMENT</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300">
                <span>⚡</span>
                <span>+{xpReward} XP REWARD</span>
              </span>
            </div>

            {/* Title - Clean solid white text */}
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {description ? (
                description
              ) : (
                <>
                  Earn <span className="font-bold text-amber-300">+{xpReward} XP</span> by taking the complete{" "}
                  <span className="font-mono font-bold text-purple-300 px-1.5 py-0.5 rounded bg-purple-500/15 border border-purple-500/30">
                    {moduleCode}
                  </span>{" "}
                  Module Assessment Quiz.
                </>
              )}
            </p>

            {features && features.length > 0 && (
              <div className="hidden sm:flex items-center gap-3 pt-1 text-[11px] font-mono text-slate-400">
                {features.map((feat, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="text-purple-400">✓</span>
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Direct Link Button to Dedicated Quiz Page */}
        <div className="shrink-0 flex sm:self-center">
          <Link
            href={quizHref}
            className="group/btn relative inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold font-mono text-xs sm:text-sm tracking-wide transition-colors w-full sm:w-auto text-center cursor-pointer shadow-md shadow-purple-950/20"
          >
            <span>Launch Assessment Quiz</span>
            <span className="px-2 py-0.5 rounded-md bg-white/15 text-white text-[11px] font-bold">
              +{xpReward} XP
            </span>
            <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
