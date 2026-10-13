import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
import { prisma } from "@/lib/prisma";

const SyncHistorySchema = z.object({
  attempts: z.array(
    z.object({
      id: z.string(),
      quizId: z.string(),
      trackKey: z.string(),
      lessonSlug: z.string(),
      lessonCode: z.string().optional().default(""),
      lessonTitle: z.string(),
      score: z.number(),
      totalQuestions: z.number(),
      correctAnswers: z.number(),
      xpEarned: z.number().default(0),
      xpSpentOnHints: z.number().default(0),
      hintsUsed: z.array(z.string()).optional().default([]),
      evaluations: z.array(z.any()).optional().default([]),
      completedAt: z.string(),
    })
  ),
});

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ attempts: [], totalCount: 0 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const offset = Math.max(0, parseInt(searchParams.get("offset") || "0", 10));
    const trackKey = searchParams.get("trackKey") || undefined;

    const where: any = { userId };
    if (trackKey) where.trackKey = trackKey;

    const [rawAttempts, totalCount] = await Promise.all([
      (prisma as any).quizAttempt.findMany({
        where,
        orderBy: { completedAt: "desc" },
        take: limit,
        skip: offset,
      }),
      (prisma as any).quizAttempt.count({ where }),
    ]);

    // Compute best score per quizId
    const bestScoreMap = new Map<string, number>();
    for (const a of rawAttempts) {
      const currentBest = bestScoreMap.get(a.quizId) ?? 0;
      if (a.score > currentBest) {
        bestScoreMap.set(a.quizId, a.score);
      }
    }

    const formattedAttempts = rawAttempts.map((a: any) => ({
      id: a.id,
      userId: a.userId,
      quizId: a.quizId,
      trackKey: a.trackKey,
      lessonSlug: a.lessonSlug,
      lessonCode: a.lessonSlug.split("-")[0]?.toUpperCase() || "",
      lessonTitle: a.lessonTitle,
      score: a.score,
      totalQuestions: a.totalQuestions,
      correctAnswers: a.correctAnswers,
      xpEarned: a.xpEarned,
      xpSpentOnHints: a.xpSpentOnHints,
      hintsUsed: a.hintsUsed || [],
      evaluations: a.answers || [],
      completedAt: a.completedAt.toISOString(),
      isBestScore: a.score === bestScoreMap.get(a.quizId),
    }));

    return NextResponse.json({
      attempts: formattedAttempts,
      totalCount,
    });
  } catch (error: any) {
    console.error("[QuizHistory API] GET error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const json = await req.json();
    const parseResult = SyncHistorySchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const { attempts } = parseResult.data;

    // Batch insert any local attempts not yet in DB
    for (const a of attempts) {
      try {
        await (prisma as any).quizAttempt.upsert({
          where: { id: a.id },
          create: {
            id: a.id,
            userId,
            quizId: a.quizId,
            trackKey: a.trackKey,
            lessonSlug: a.lessonSlug,
            lessonTitle: a.lessonTitle,
            score: a.score,
            totalQuestions: a.totalQuestions,
            correctAnswers: a.correctAnswers,
            xpEarned: a.xpEarned,
            xpSpentOnHints: a.xpSpentOnHints,
            hintsUsed: a.hintsUsed,
            answers: a.evaluations,
            completedAt: new Date(a.completedAt),
          },
          update: {},
        });
      } catch (err) {
        console.warn("[QuizHistory API] Could not upsert attempt:", a.id, err);
      }
    }

    // Return the latest history from DB
    const latestFromDb = await (prisma as any).quizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 50,
    });

    const formatted = latestFromDb.map((a: any) => ({
      id: a.id,
      userId: a.userId,
      quizId: a.quizId,
      trackKey: a.trackKey,
      lessonSlug: a.lessonSlug,
      lessonCode: a.lessonSlug.split("-")[0]?.toUpperCase() || "",
      lessonTitle: a.lessonTitle,
      score: a.score,
      totalQuestions: a.totalQuestions,
      correctAnswers: a.correctAnswers,
      xpEarned: a.xpEarned,
      xpSpentOnHints: a.xpSpentOnHints,
      hintsUsed: a.hintsUsed || [],
      evaluations: a.answers || [],
      completedAt: a.completedAt.toISOString(),
    }));

    return NextResponse.json({ success: true, attempts: formatted });
  } catch (error: any) {
    console.error("[QuizHistory API] POST error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
