"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getInterviewTracks, InterviewTrackInfo, ALL_INTERVIEW_QUESTIONS } from "@/lib/interview-questions";
import {
  saveMockInterviewResult,
  recordQuestionGrade,
} from "@/lib/interview-progress";
import {
  InterviewQuestion,
  InterviewGrade,
  MockInterviewResult,
} from "@/types/interview";
import { Flashcard } from "@/components/interview/Flashcard";
import { Scorecard } from "@/components/interview/Scorecard";
import { TechIcon } from "@/components/roadmap/TechIcon";

type MockPhase = "config" | "active" | "summary";

export default function MockInterviewPage() {
  const [phase, setPhase] = useState<MockPhase>("config");
  const [tracks, setTracks] = useState<InterviewTrackInfo[]>([]);

  // Config State
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<number>(60); // 0 = untimed

  // Active Session State
  const [sessionQuestions, setSessionQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [gradesMap, setGradesMap] = useState<Record<string, InterviewGrade>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [startTime, setStartTime] = useState<number>(0);

  // Result State
  const [mockResult, setMockResult] = useState<MockInterviewResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const allTracks = getInterviewTracks();
    setTracks(allTracks);
    // Default select top 4 tracks
    setSelectedTracks(allTracks.slice(0, 4).map((t) => t.trackKey));
  }, []);

  // Timer logic for active question
  useEffect(() => {
    if (phase !== "active" || timeLimitSeconds === 0) return;

    setTimeRemaining(timeLimitSeconds);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, phase, timeLimitSeconds]);

  const toggleTrack = (trackKey: string) => {
    setSelectedTracks((prev) =>
      prev.includes(trackKey) ? prev.filter((k) => k !== trackKey) : [...prev, trackKey]
    );
  };

  const selectAllTracks = () => {
    setSelectedTracks(tracks.map((t) => t.trackKey));
  };

  const clearAllTracks = () => {
    setSelectedTracks([]);
  };

  const startMockInterview = () => {
    if (selectedTracks.length === 0) return;

    // Filter questions by selected tracks
    const pool = ALL_INTERVIEW_QUESTIONS.filter((q) => selectedTracks.includes(q.trackKey));
    if (pool.length === 0) return;

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(questionCount, pool.length));

    setSessionQuestions(chosen);
    setCurrentIndex(0);
    setGradesMap({});
    setStartTime(Date.now());
    setPhase("active");
  };

  const handleGrade = (grade: InterviewGrade) => {
    const currentQ = sessionQuestions[currentIndex];
    if (!currentQ) return;

    // Record to persistent SM-2 memory retention engine
    recordQuestionGrade(currentQ.id, grade);
    setGradesMap((prev) => ({ ...prev, [currentQ.id]: grade }));
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishMockInterview();
    }
  };

  const finishMockInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const elapsed = Math.round((Date.now() - startTime) / 1000);

    // Calculate score percentage
    const weights: Record<InterviewGrade, number> = {
      easy: 100,
      good: 85,
      hard: 50,
      again: 0,
    };

    let totalScore = 0;

    sessionQuestions.forEach((q) => {
      const g = gradesMap[q.id];
      if (g) totalScore += weights[g];
    });

    const scorePercent =
      sessionQuestions.length > 0
        ? Math.round(totalScore / sessionQuestions.length)
        : 0;

    // XP calculation: 25 base bonus + 5 per question
    const xpEarned = 25 + sessionQuestions.length * 5;

    const result: MockInterviewResult = {
      id: `mock_${Date.now()}`,
      timestamp: new Date().toISOString(),
      trackKeys: selectedTracks,
      totalQuestions: sessionQuestions.length,
      scorePercent,
      timeSpentSeconds: elapsed,
      xpEarned,
      grades: gradesMap,
      answersSummary: sessionQuestions.map((q) => ({
        questionId: q.id,
        grade: gradesMap[q.id] || "again",
        category: q.category,
        trackKey: q.trackKey,
        questionText: q.question,
      })),
    };

    saveMockInterviewResult(result);
    setMockResult(result);
    setPhase("summary");
  };

  const resetConfig = () => {
    setPhase("config");
    setMockResult(null);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-neutral-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/interview" className="hover:text-white transition-colors">
              Interview Prep
            </Link>
            <span>/</span>
            <span className="text-purple-400 font-semibold">Mock Interview Simulator</span>
          </div>

          <Link
            href="/interview"
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            ← Exit Mock
          </Link>
        </div>

        {/* ─── PHASE 1: CONFIGURATION ─── */}
        {phase === "config" && (
          <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/80 border border-white/[0.08] backdrop-blur-xl space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
                <span>⏱️ Timed Simulation Mode</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Mock Interview Setup
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Simulate a realistic multi-topic technical interview. Test your recall under time
                pressure and receive a comprehensive performance report.
              </p>
            </div>

            {/* Select Tracks */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                  1. Choose Topics ({selectedTracks.length} Selected)
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={selectAllTracks}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Select All
                  </button>
                  <span className="text-neutral-600">·</span>
                  <button
                    onClick={clearAllTracks}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {tracks.map((track) => {
                  const isSelected = selectedTracks.includes(track.trackKey);
                  return (
                    <button
                      key={track.trackKey}
                      onClick={() => toggleTrack(track.trackKey)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? "bg-purple-600/20 border-purple-500 text-white shadow-sm shadow-purple-600/20"
                          : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center p-1 flex-shrink-0">
                        <TechIcon slug={track.trackKey} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold truncate">{track.title}</span>
                        <span className="block text-[10px] text-neutral-400">
                          {track.questionCount} Qs
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider block">
                2. Number of Questions
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { count: 5, label: "5 Questions", time: "~5 mins" },
                  { count: 10, label: "10 Questions", time: "~10 mins (Standard)" },
                  { count: 15, label: "15 Questions", time: "~15 mins (Deep Dive)" },
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setQuestionCount(item.count)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      questionCount === item.count
                        ? "bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold text-xs sm:text-sm">{item.label}</span>
                    <span className="block text-[10px] text-neutral-400 mt-0.5">{item.time}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider block">
                3. Time Limit per Question
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { sec: 0, label: "Untimed", sub: "Learn at your pace" },
                  { sec: 45, label: "45 Seconds", sub: "Rapid Fire" },
                  { sec: 60, label: "60 Seconds", sub: "Standard Interview" },
                  { sec: 90, label: "90 Seconds", sub: "Detailed Explanation" },
                ].map((item) => (
                  <button
                    key={item.sec}
                    onClick={() => setTimeLimitSeconds(item.sec)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      timeLimitSeconds === item.sec
                        ? "bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-white/[0.02] border-white/[0.06] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="block font-bold text-xs">{item.label}</span>
                    <span className="block text-[10px] text-neutral-400 mt-0.5">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-2">
              <button
                disabled={selectedTracks.length === 0}
                onClick={startMockInterview}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-purple-600/20 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>🚀 Begin Mock Interview ({questionCount} Questions)</span>
              </button>
            </div>
          </div>
        )}

        {/* ─── PHASE 2: ACTIVE MOCK INTERVIEW ─── */}
        {phase === "active" && sessionQuestions.length > 0 && (
          <div className="space-y-6">
            {/* Live Progress & Timer Header */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/[0.08] backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-purple-300">
                  Question {currentIndex + 1} of {sessionQuestions.length}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-400 capitalize">
                  {sessionQuestions[currentIndex]?.trackKey}
                </span>
              </div>

              {/* Countdown Timer */}
              {timeLimitSeconds > 0 && (
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-bold ${
                    timeRemaining <= 10
                      ? "bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse"
                      : timeRemaining <= 25
                      ? "bg-amber-500/15 border-amber-500/30 text-amber-300"
                      : "bg-white/[0.04] border-white/[0.08] text-neutral-300"
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{timeRemaining}s</span>
                </div>
              )}
            </div>

            {/* Current Flashcard */}
            {sessionQuestions[currentIndex] && (
              <Flashcard
                question={sessionQuestions[currentIndex]}
                progress={null}
                onGrade={handleGrade}
                onNext={handleNext}
                isLastQuestion={currentIndex === sessionQuestions.length - 1}
              />
            )}
          </div>
        )}

        {/* ─── PHASE 3: SUMMARY SCORECARD ─── */}
        {phase === "summary" && mockResult && (
          <Scorecard result={mockResult} onRestart={resetConfig} />
        )}
      </div>
    </div>
  );
}
