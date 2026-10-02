"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * STREAK & XP PILL — Interactive Global Habit & Level Widget
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Displays live daily active streaks, level badge, and an interactive popover
 * showing weekly goal completion and next-level progression.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { openAuthModal } from "@/components/auth-modal";
import {
  getGamificationState,
  GAMIFICATION_SYNC_EVENT,
} from "@/lib/gamification";
import { UserGamificationState } from "@/types/gamification";

export function StreakXPPill(): JSX.Element {
  const { data: session } = useSession();
  const [state, setState] = useState<UserGamificationState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setState(getGamificationState());

    const handleSync = () => setState(getGamificationState());
    window.addEventListener(GAMIFICATION_SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(GAMIFICATION_SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, []);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!state) return <div className="h-8 w-20 animate-pulse bg-white/5 rounded-xl" />;

  const { currentLevel, currentStreak, totalXP, xpToNextLevel, levelProgressPercent, weeklyGoalCompleted, weeklyGoalTarget } = state;

  return (
    <div className="relative" ref={popoverRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/40 text-xs font-bold text-white transition-all cursor-pointer shadow-sm group"
        title="View Daily Streak & XP Mastery"
      >
        {/* Streak Flame */}
        <div className="flex items-center gap-1 text-amber-400 group-hover:scale-105 transition-transform">
          <span className="text-sm animate-bounce">🔥</span>
          <span className="font-mono font-black">{currentStreak}</span>
        </div>

        <div className="w-px h-3 bg-white/10 hidden sm:block" />

        {/* Level / XP */}
        <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
          <span>{currentLevel.badge}</span>
          <span className="font-semibold">{currentLevel.title}</span>
          <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.2 rounded-md">
            {totalXP} XP
          </span>
        </div>
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-80 rounded-2xl bg-[#0E121B]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLevel.badge}</span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Level {currentLevel.level} — {currentLevel.title}
                </h4>
                <p className="text-[11px] font-mono text-purple-400">
                  {totalXP} Total XP Earned
                </p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl flex items-center gap-1">
              🔥 {currentStreak}d
            </span>
          </div>

          {/* Level Progress Bar */}
          <div className="py-3.5 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Level Progress</span>
              <span className="font-mono text-xs font-bold text-slate-300">
                {levelProgressPercent}% ({xpToNextLevel} XP to next rank)
              </span>
            </div>
            <div className="h-2 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Weekly Habit Loop */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span>🎯</span> Weekly Goal
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {weeklyGoalCompleted} of {weeklyGoalTarget} days
              </span>
            </div>

            <div className="flex items-center justify-between gap-1.5 pt-1">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                const isCompleted = idx < weeklyGoalCompleted;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full h-1.5 rounded-full ${
                        isCompleted ? "bg-emerald-400" : "bg-white/[0.06]"
                      }`}
                    />
                    <span className="text-[9px] font-mono text-slate-500 font-bold">
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Streak Freeze Perk */}
          <div className="flex items-center justify-between pt-3 text-xs text-slate-400 border-t border-white/[0.06] mt-3">
            <span className="flex items-center gap-1.5 text-[11px]">
              <span>❄️</span>
              <span>Streak Freeze (1/week)</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
              {state.streakFreezeAvailable ? "Ready" : "Used"}
            </span>
          </div>

          {/* Guest Cloud Sync Prompt */}
          {!session?.user && (
            <button
              onClick={() => {
                setIsOpen(false);
                openAuthModal();
              }}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-purple-600/15 hover:bg-purple-600/25 border border-purple-500/20 text-purple-300 hover:text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>☁️ Sign in to backup streak & XP</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
