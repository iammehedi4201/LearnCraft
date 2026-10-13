"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  getGamificationState,
  calculateLevelInfo,
  GAMIFICATION_SYNC_EVENT,
} from "@/lib/gamification";
import { getOverallInterviewStats } from "@/lib/interview-progress";
import { getLocalProgressList } from "@/lib/progress-sync";
import { UserGamificationState } from "@/types/gamification";
import { OverallInterviewStats } from "@/types/interview";
import { XPProgressionChart } from "@/components/dashboard/XPProgressionChart";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { TrackProgressDonut, TrackProgressData } from "@/components/dashboard/TrackProgressDonut";
import { ContinueLearningCard, NextLessonRecommendation } from "@/components/dashboard/ContinueLearningCard";
import { InterviewReadinessWidget } from "@/components/dashboard/InterviewReadinessWidget";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { QuizHistoryWidget } from "@/components/dashboard/QuizHistoryWidget";

import { TRACK_METAS } from "@/lib/dashboard-metadata";

export default function DashboardPage() {
  const [gameState, setGameState] = useState<UserGamificationState | null>(null);
  const [interviewStats, setInterviewStats] = useState<OverallInterviewStats | null>(null);
  const [trackProgressList, setTrackProgressList] = useState<TrackProgressData[]>([]);
  const [recommendation, setRecommendation] = useState<NextLessonRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = () => {
    // 1. Gamification state
    const gamification = getGamificationState();
    setGameState(gamification);

    // 2. Spaced repetition / interview stats
    const intStats = getOverallInterviewStats();
    setInterviewStats(intStats);

    // 3. Scan local progress across tracks
    const allProgress = getLocalProgressList();
    const completedModuleSet = new Set(
      allProgress.filter((p) => p.completed).map((p) => p.module.toLowerCase())
    );

    // Compute track percentages from all storage engines
    const tracksData: TrackProgressData[] = TRACK_METAS.map((track) => {
      const completedSet = new Set<string>();

      if (typeof window !== "undefined") {
        // A. Check curriculum-path unified store: learncraft_progress_${track.key}
        try {
          const raw1 = localStorage.getItem(`learncraft_progress_${track.key}`);
          if (raw1) {
            const p1 = JSON.parse(raw1);
            if (Array.isArray(p1.completedLessonIds)) {
              p1.completedLessonIds.forEach((id: string) => completedSet.add(id.toLowerCase()));
            }
          }
        } catch {}

        // B. Check track-specific progress store: learncraft_${track.key}_progress
        try {
          const raw2 = localStorage.getItem(`learncraft_${track.key}_progress`);
          if (raw2) {
            const p2 = JSON.parse(raw2);
            if (Array.isArray(p2.completedLessons)) {
              p2.completedLessons.forEach((id: string) => completedSet.add(id.toLowerCase()));
            }
          }
        } catch {}

        // C. Check legacy nestjs progress store
        if (track.key === "nestjs") {
          try {
            const rawNest = localStorage.getItem("learncraft_nestjs_global_progress");
            if (rawNest) {
              const pNest = JSON.parse(rawNest);
              if (Array.isArray(pNest.completedLessons)) {
                pNest.completedLessons.forEach((id: string) => completedSet.add(id.toLowerCase()));
              }
            }
          } catch {}
        }
      }

      // D. Check progress-sync modules
      for (const mod of completedModuleSet) {
        const matchesPrefix = track.prefixes.some(
          (pfx) => mod.startsWith(pfx) || mod.includes(pfx)
        );
        if (matchesPrefix) {
          completedSet.add(mod);
        }
      }

      const completedLessons = Math.min(completedSet.size, track.totalLessons);
      const percent = Math.round((completedLessons / track.totalLessons) * 100);

      return {
        trackKey: track.key,
        title: track.title,
        totalLessons: track.totalLessons,
        completedLessons,
        percent,
        color: track.color,
      };
    });
    setTrackProgressList(tracksData);

    // 4. Recommendation for Next Lesson
    // Pick active in-progress track or default to Next.js
    const activeTrackMeta =
      TRACK_METAS.find((tm) => {
        const tData = tracksData.find((td) => td.trackKey === tm.key);
        return tData && tData.completedLessons > 0 && tData.percent < 100;
      }) || TRACK_METAS[0];

    const activeTrackData = tracksData.find((t) => t.trackKey === activeTrackMeta.key) || tracksData[0];

    setRecommendation({
      trackKey: activeTrackMeta.key,
      trackTitle: activeTrackMeta.title,
      lessonId: `${activeTrackMeta.key}-01`,
      lessonTitle: activeTrackMeta.defaultLessonTitle,
      phaseName: activeTrackMeta.defaultPhaseName,
      phaseNumber: 1,
      minutes: 20,
      href: `/learn/${activeTrackMeta.key}`,
      progressPercent: activeTrackData.percent,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleSync = () => loadData();
    window.addEventListener(GAMIFICATION_SYNC_EVENT, handleSync);
    window.addEventListener("learncraft-progress-updated", handleSync);
    return () => {
      window.removeEventListener(GAMIFICATION_SYNC_EVENT, handleSync);
      window.removeEventListener("learncraft-progress-updated", handleSync);
    };
  }, []);

  if (isLoading || !gameState) {
    return <DashboardSkeleton />;
  }

  const { levelInfo, xpToNextLevel, levelProgressPercent } = calculateLevelInfo(gameState.totalXP);

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-neutral-100 flex flex-col selection:bg-purple-500/20 font-sans">
      <Nav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* Top Hero Banner & Level Milestone */}
        <div className="relative rounded-3xl bg-[#0E121B] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  STUDENT PORTFOLIO ANALYTICS
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Real-time local + cloud telemetry
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Welcome Back, Engineer 👋
              </h1>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
                Track your active streaks, algorithmic flashcard retention, lesson progression, and milestone achievements in one unified command center.
              </p>
            </div>

            {/* Level Card Widget */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4 shrink-0 max-w-sm w-full">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg"
                style={{ backgroundColor: `${levelInfo.color}20`, borderColor: `${levelInfo.color}40`, borderWidth: 1 }}
              >
                {levelInfo.badge}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Lvl {levelInfo.level} · {levelInfo.title}
                  </span>
                  <span className="text-purple-300 font-mono font-bold">
                    {gameState.totalXP} XP
                  </span>
                </div>

                {/* Level Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${levelProgressPercent}%`,
                      backgroundColor: levelInfo.color,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>{xpToNextLevel === 0 && levelInfo.level < 5 ? 1 : xpToNextLevel} XP to Next Tier</span>
                  <span>{Math.round(levelProgressPercent)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Learning Smart Recommendation Card */}
        <ContinueLearningCard recommendation={recommendation} />

        {/* Charts Row: Custom SVG XP Progression + Track Mastery Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 flex flex-col">
            <XPProgressionChart
              xpHistory={gameState.recentXPLogs || []}
              dailyActivity={gameState.dailyHistory || {}}
              totalXP={gameState.totalXP}
              className="h-full"
            />
          </div>

          <div className="lg:col-span-1 flex flex-col">
            <TrackProgressDonut
              tracks={trackProgressList}
              className="h-full"
            />
          </div>
        </div>

        {/* Full-width Activity & Streak Heatmap */}
        <ActivityHeatmap
          dailyActivity={gameState.dailyHistory || {}}
          currentStreak={gameState.currentStreak}
          longestStreak={gameState.longestStreak}
        />

        {/* Spaced Repetition & Interview Readiness */}
        {interviewStats && (
          <InterviewReadinessWidget stats={interviewStats} />
        )}

        {/* Module Assessments & Quiz History */}
        <QuizHistoryWidget />

        {/* Quick Nav Bar */}
        <div className="p-4 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-white font-semibold">Quick Jump:</span>
            <Link href="/learn" className="hover:text-purple-300 transition-colors">
              Curriculum Hub
            </Link>
            <span>·</span>
            <Link href="/notes" className="hover:text-purple-300 transition-colors">
              Study Notes
            </Link>
            <span>·</span>
            <Link href="/interview" className="hover:text-purple-300 transition-colors">
              Interview Questions
            </Link>
            <span>·</span>
            <Link href="/roadmaps" className="hover:text-purple-300 transition-colors">
              Career Roadmaps
            </Link>
          </div>

          <Link
            href="/interview/mock"
            className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white font-semibold transition-all flex items-center gap-1.5"
          >
            <span>🎲 Timed Mock Interview</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
