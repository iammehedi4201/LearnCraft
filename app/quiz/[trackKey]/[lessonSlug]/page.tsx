"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { QuizRunner } from "@/components/quiz/QuizRunner";
import { getQuizBySlug } from "@/lib/quiz/quiz-registry";
import { ModuleQuiz } from "@/lib/quiz/quiz-types";

interface PageProps {
  params: Promise<{
    trackKey: string;
    lessonSlug: string;
  }>;
}

export default function ModuleQuizPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { trackKey, lessonSlug } = resolvedParams;

  const [quiz, setQuiz] = useState<ModuleQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedQuiz = getQuizBySlug(trackKey, lessonSlug);
    setQuiz(loadedQuiz);
    setIsLoading(false);
  }, [trackKey, lessonSlug]);

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {isLoading ? (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/10 animate-pulse space-y-4">
            <div className="h-6 w-32 bg-white/10 rounded-lg" />
            <div className="h-8 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-4 w-1/2 bg-white/10 rounded-lg" />
            <div className="h-64 w-full bg-white/5 rounded-2xl" />
          </div>
        ) : quiz ? (
          <QuizRunner quiz={quiz} trackHref={`/learn/${trackKey}`} />
        ) : (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/10 text-center space-y-4">
            <span className="text-4xl block">🔍</span>
            <h2 className="text-xl font-bold text-white">Quiz Not Found</h2>
            <p className="text-xs text-slate-400">
              Could not locate an assessment for {lessonSlug} in track {trackKey}.
            </p>
            <Link
              href={`/learn/${trackKey}`}
              className="inline-block px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
            >
              Back to Track
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
