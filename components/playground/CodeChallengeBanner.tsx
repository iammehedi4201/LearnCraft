"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CODE CHALLENGE BANNER & CELEBRATION COMPONENT
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Provides instant feedback on test suite execution, context-aware hints,
 * and XP reward celebration animations.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { ValidationResult } from "./types";

interface CodeChallengeBannerProps {
  testResults?: ValidationResult;
  onShowNextHint?: () => void;
  hintsAvailable: boolean;
}

export function CodeChallengeBanner({
  testResults,
  onShowNextHint,
  hintsAvailable,
}: CodeChallengeBannerProps) {
  if (!testResults) return null;

  const { passed, totalPassed, totalTests, results } = testResults;

  if (passed) {
    return (
      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between gap-3 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-2.5">
          <span className="text-xl animate-bounce">🎉</span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white">
                All Tests Passed! ({totalPassed}/{totalTests})
              </h4>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full">
                +15 XP Earned
              </span>
            </div>
            <p className="text-[11px] text-emerald-400/90 mt-0.5">
              Excellent job! You correctly satisfied all exercise requirements.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Failing state
  const firstFailing = results.find((r) => !r.passed);

  return (
    <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-300 space-y-2 animate-in fade-in duration-150">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <h4 className="text-xs font-bold text-white">
            {totalPassed} of {totalTests} Tests Passing
          </h4>
        </div>

        {hintsAvailable && onShowNextHint && (
          <button
            onClick={onShowNextHint}
            className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>💡 Need a hint?</span>
          </button>
        )}
      </div>

      {firstFailing && (
        <div className="text-[11px] text-rose-200/90 font-mono bg-black/20 p-2 rounded-lg border border-rose-500/15">
          <span className="text-rose-400 font-bold">Failed: </span>
          <span>{firstFailing.name}</span>
          {firstFailing.error && (
            <span className="block text-[10px] text-slate-400 mt-0.5">
              {firstFailing.error}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
