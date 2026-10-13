import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";
import { getQuizBySlug } from "@/lib/quiz/quiz-registry";
import { evaluateQuizSubmission } from "@/lib/quiz/quiz-evaluator";

const QuizSubmissionSchema = z.object({
  quizId: z.string(),
  trackKey: z.string(),
  lessonSlug: z.string(),
  answers: z.record(z.string(), z.number()),
  hintsUsed: z.array(z.string()).optional().default([]),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = QuizSubmissionSchema.safeParse(json);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid quiz submission payload", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { quizId, trackKey, lessonSlug, answers, hintsUsed } = parseResult.data;
    const userId = await getAuthenticatedUserId(req);

    // 1. Authoritative Quiz Lookup
    const quiz = getQuizBySlug(trackKey, lessonSlug);
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found for this module" }, { status: 404 });
    }

    // 2. Query previous attempts to prevent duplicate XP exploitation
    let previousBestScore: number | null = null;
    if (userId) {
      try {
        const pastAttempts = await (prisma as any).quizAttempt.findMany({
          where: { userId, quizId },
          select: { score: true },
        });

        if (pastAttempts && pastAttempts.length > 0) {
          previousBestScore = Math.max(...pastAttempts.map((a: { score: number }) => a.score));
        }
      } catch (err) {
        console.warn("[QuizSubmit API] Could not read past attempts from DB:", err);
      }
    }

    // 3. Authoritative server evaluation
    const evaluation = evaluateQuizSubmission(
      quiz,
      { quizId, trackKey, lessonSlug, answers, hintsUsed },
      { previousBestScore }
    );

    // 4. Persist to Neon PostgreSQL if user is authenticated
    let attemptId = `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    if (userId) {
      try {
        const record = await (prisma as any).quizAttempt.create({
          data: {
            userId,
            quizId: evaluation.quizId,
            trackKey: evaluation.trackKey,
            lessonSlug: evaluation.lessonSlug,
            lessonTitle: evaluation.lessonTitle,
            score: evaluation.score,
            totalQuestions: evaluation.totalQuestions,
            correctAnswers: evaluation.correctAnswers,
            xpEarned: evaluation.netXpEarned,
            xpSpentOnHints: evaluation.xpSpentOnHints,
            hintsUsed,
            answers: evaluation.evaluations,
            completedAt: new Date(evaluation.completedAt),
          },
        });
        if (record?.id) attemptId = record.id;

        // If net XP was earned, record into user's cloud gamification progress
        if (evaluation.netXpEarned > 0) {
          const gamificationRow = await (prisma.progress as any).findUnique({
            where: {
              userId_module: {
                userId,
                module: "__gamification__",
              },
            },
          });

          if (gamificationRow) {
            const currentScore = Number(gamificationRow.score) || 0;
            await (prisma.progress as any).update({
              where: {
                userId_module: {
                  userId,
                  module: "__gamification__",
                },
              },
              data: {
                score: currentScore + evaluation.netXpEarned,
              },
            });
          }
        }
      } catch (dbErr) {
        console.error("[QuizSubmit API] Database persistence failed:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      attemptId,
      result: evaluation,
    });
  } catch (error: any) {
    console.error("[QuizSubmit API] Unhandled error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
