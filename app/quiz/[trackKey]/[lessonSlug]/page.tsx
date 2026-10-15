"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InteractiveGrid } from "@/components/interactive-grid";
import { QuizModal } from "@/components/quiz/QuizModal";
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
  const router = useRouter();

  const [quiz, setQuiz] = useState<ModuleQuiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedQuiz = getQuizBySlug(trackKey, lessonSlug);
    setQuiz(loadedQuiz);
    setIsLoading(false);
  }, [trackKey, lessonSlug]);

  const handleClose = () => {
    router.push(`/learn/${trackKey}/${lessonSlug}`);
  };

  return (
    <InteractiveGrid className="h-screen w-full overflow-hidden bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <main className="relative z-10 w-full h-full flex items-center justify-center p-4">
        {isLoading ? (
          <div className="w-full max-w-3xl p-8 rounded-3xl bg-[#090C16] border border-white/10 animate-pulse space-y-4 shadow-2xl">
            <div className="h-6 w-32 bg-white/10 rounded-lg" />
            <div className="h-8 w-3/4 bg-white/10 rounded-lg" />
            <div className="h-4 w-1/2 bg-white/10 rounded-lg" />
            <div className="h-64 w-full bg-white/5 rounded-2xl" />
          </div>
        ) : quiz ? (
          <QuizModal
            isOpen={true}
            onClose={handleClose}
            quiz={quiz}
            trackHref={`/learn/${trackKey}/${lessonSlug}`}
          />
        ) : (
          <div className="w-full max-w-xl m-auto p-8 rounded-3xl bg-[#0E121B] border border-white/10 text-center space-y-4 shadow-2xl">
            <span className="text-4xl block">🔍</span>
            <h2 className="text-xl font-bold text-white">Quiz Not Found</h2>
            <p className="text-xs text-slate-400">
              Could not locate an assessment for {lessonSlug} in track {trackKey}.
            </p>
            <Link
              href={`/learn/${trackKey}`}
              className="inline-block px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
            >
              Back to Track
            </Link>
          </div>
        )}
      </main>
    </InteractiveGrid>
  );
}
