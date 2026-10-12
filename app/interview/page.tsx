"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getInterviewTracks, InterviewTrackInfo, getQuestionsByTrack } from "@/lib/interview-questions";
import {
  getTrackStats,
  getOverallInterviewStats,
  INTERVIEW_SYNC_EVENT,
} from "@/lib/interview-progress";
import { OverallInterviewStats } from "@/types/interview";
import { TopicCard } from "@/components/interview/TopicCard";

export default function InterviewHubPage() {
  const [tracks, setTracks] = useState<InterviewTrackInfo[]>([]);
  const [stats, setStats] = useState<OverallInterviewStats>({
    totalQuestions: 0,
    questionsReviewed: 0,
    masteredCount: 0,
    dueForReview: 0,
    overallPercentMastered: 0,
    totalTracks: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDueOnly, setFilterDueOnly] = useState(false);

  const loadData = () => {
    const allTracks = getInterviewTracks();
    setTracks(allTracks);
    setStats(getOverallInterviewStats());
  };

  useEffect(() => {
    loadData();

    const handleSync = () => loadData();
    window.addEventListener(INTERVIEW_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(INTERVIEW_SYNC_EVENT, handleSync);
  }, []);

  // Filter tracks
  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterDueOnly) {
      const qs = getQuestionsByTrack(track.trackKey);
      const s = getTrackStats(track.trackKey, qs);
      return s.dueForReview > 0;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#08090C] text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Breadcrumb & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-purple-400 font-semibold">Interview Prep</span>
          </div>

          <Link
            href="/interview/mock"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all cursor-pointer active:scale-95"
          >
            <span>🎲 Timed Mock Interview</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-950/40 via-neutral-900/80 to-indigo-950/30 border border-white/[0.08] p-6 sm:p-10 overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Backlights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              <span>SuperMemo SM-2 Spaced Repetition Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Master Technical Interviews{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                Topic by Topic
              </span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              Curated conceptual questions, coding analysis puzzles, and distributed system design
              challenges asked at top tech companies. Review with active recall and scientific spaced
              repetition to lock knowledge into long-term memory.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Total Questions</span>
              <span className="text-2xl font-bold text-white font-mono">
                {stats.totalQuestions}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Due for Review</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">
                {stats.dueForReview}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Mastered Questions</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                {stats.masteredCount}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-[11px] text-neutral-400 block mb-0.5">Overall Mastery</span>
              <span className="text-2xl font-bold text-purple-400 font-mono">
                {stats.overallPercentMastered}%
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. React, Event Loop, Indexes)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-white/[0.08] focus:border-purple-500/50 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Due Toggle & Topic Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterDueOnly((prev) => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                filterDueOnly
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                  : "bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white"
              }`}
            >
              {filterDueOnly ? "Showing Due Only" : "Show Due for Review"}
            </button>

            <span className="text-xs text-neutral-400">
              {filteredTracks.length} tracks available
            </span>
          </div>
        </div>

        {/* Topics Grid */}
        {filteredTracks.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <span className="text-4xl block">🔍</span>
            <h3 className="text-lg font-bold text-white">No topics match your filter</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              Try searching for different keywords or clear the "Due for Review" filter to explore
              all curriculum tracks.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterDueOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTracks.map((track) => {
              // Get track stats with mock questions count
              const mockQs = Array(track.questionCount)
                .fill(null)
                .map((_, i) => ({ id: `${track.trackKey}-q${i}` } as any));
              const trackStats = getTrackStats(track.trackKey, mockQs);

              return (
                <TopicCard
                  key={track.trackKey}
                  track={track}
                  stats={trackStats}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
