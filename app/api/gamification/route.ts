import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { calculateLevelInfo } from "@/lib/gamification";
import type { UserGamificationState, DailyActivityRecord, XPLogEntry } from "@/types/gamification";

const DailyActivitySchema = z.object({
  date: z.string(),
  xpEarned: z.number().nonnegative(),
  lessonsCompleted: z.number().nonnegative().optional().default(0),
  exercisesPassed: z.number().nonnegative().optional().default(0),
  flashcardsReviewed: z.number().nonnegative().optional().default(0),
  notesCreated: z.number().nonnegative().optional().default(0),
});

const XPLogSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  eventType: z.string(),
  amount: z.number(),
  description: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
});

const GamificationSyncSchema = z.object({
  totalXP: z.number().nonnegative(),
  currentStreak: z.number().positive().optional().default(1),
  longestStreak: z.number().positive().optional().default(1),
  lastActiveDate: z.string().nullable().optional(),
  streakFreezeAvailable: z.boolean().optional().default(true),
  streakFreezeUsedDate: z.string().nullable().optional(),
  weeklyGoalTarget: z.number().positive().optional().default(5),
  weeklyGoalCompleted: z.number().nonnegative().optional().default(0),
  dailyHistory: z.record(z.string(), DailyActivitySchema).optional().default({}),
  recentXPLogs: z.array(XPLogSchema).optional().default([]),
});

async function getAuthenticatedUserId(req: NextRequest): Promise<string | null> {
  // 1. Check database sessionToken directly from cookies
  const token =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (token) {
    const dbSession = await prisma.session.findUnique({
      where: { sessionToken: token },
      select: { userId: true, expires: true },
    });
    if (dbSession && dbSession.expires > new Date()) {
      return dbSession.userId;
    }
  }

  // 2. NextAuth session fallback
  try {
    const session = (await (auth as any)()) || (await (auth as any)(req));
    if (session?.user?.id) return session.user.id;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (user?.id) return user.id;
    }
  } catch {}

  return null;
}

function mergeStates(
  local: z.infer<typeof GamificationSyncSchema>,
  remote: UserGamificationState | null
): UserGamificationState {
  if (!remote) {
    const { levelInfo, xpToNextLevel, levelProgressPercent } = calculateLevelInfo(local.totalXP);
    return {
      currentStreak: local.currentStreak,
      longestStreak: local.longestStreak,
      lastActiveDate: local.lastActiveDate ?? null,
      streakFreezeAvailable: local.streakFreezeAvailable,
      streakFreezeUsedDate: local.streakFreezeUsedDate ?? null,
      totalXP: local.totalXP,
      currentLevel: levelInfo,
      xpToNextLevel,
      levelProgressPercent,
      weeklyGoalTarget: local.weeklyGoalTarget,
      weeklyGoalCompleted: local.weeklyGoalCompleted,
      recentXPLogs: local.recentXPLogs as XPLogEntry[],
      dailyHistory: local.dailyHistory as Record<string, DailyActivityRecord>,
    };
  }

  const totalXP = Math.max(local.totalXP, remote.totalXP || 0);
  const currentStreak = Math.max(local.currentStreak, remote.currentStreak || 1);
  const longestStreak = Math.max(local.longestStreak, remote.longestStreak || 1, currentStreak);

  let lastActiveDate = local.lastActiveDate;
  if (!lastActiveDate || (remote.lastActiveDate && remote.lastActiveDate > lastActiveDate)) {
    lastActiveDate = remote.lastActiveDate;
  }

  const mergedHistory: Record<string, DailyActivityRecord> = {
    ...(remote.dailyHistory || {}),
  };
  const localDaily = (local.dailyHistory || {}) as Record<string, DailyActivityRecord>;
  for (const [date, localRec] of Object.entries(localDaily)) {
    if (!mergedHistory[date]) {
      mergedHistory[date] = localRec;
    } else {
      const remRec = mergedHistory[date];
      mergedHistory[date] = {
        date,
        xpEarned: Math.max(localRec.xpEarned || 0, remRec.xpEarned || 0),
        lessonsCompleted: Math.max(localRec.lessonsCompleted || 0, remRec.lessonsCompleted || 0),
        exercisesPassed: Math.max(localRec.exercisesPassed || 0, remRec.exercisesPassed || 0),
        flashcardsReviewed: Math.max(localRec.flashcardsReviewed || 0, remRec.flashcardsReviewed || 0),
        notesCreated: Math.max(localRec.notesCreated || 0, remRec.notesCreated || 0),
      };
    }
  }

  const logMap = new Map<string, XPLogEntry>();
  for (const log of [...(remote.recentXPLogs || []), ...(local.recentXPLogs || [])]) {
    if (log && log.id && !logMap.has(log.id)) {
      logMap.set(log.id, log as XPLogEntry);
    }
  }
  const mergedLogs = Array.from(logMap.values())
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 20);

  const { levelInfo, xpToNextLevel, levelProgressPercent } = calculateLevelInfo(totalXP);

  return {
    currentStreak,
    longestStreak,
    lastActiveDate: lastActiveDate ?? null,
    streakFreezeAvailable: local.streakFreezeAvailable ?? remote.streakFreezeAvailable ?? true,
    streakFreezeUsedDate: local.streakFreezeUsedDate || remote.streakFreezeUsedDate || null,
    totalXP,
    currentLevel: levelInfo,
    xpToNextLevel,
    levelProgressPercent,
    weeklyGoalTarget: local.weeklyGoalTarget || remote.weeklyGoalTarget || 5,
    weeklyGoalCompleted: Math.max(local.weeklyGoalCompleted, remote.weeklyGoalCompleted || 0),
    recentXPLogs: mergedLogs,
    dailyHistory: mergedHistory,
  };
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const record = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__gamification__",
        },
      },
    });

    if (!record || !record.completedModules || record.completedModules.length === 0) {
      return NextResponse.json({ success: true, state: null });
    }

    try {
      const state = JSON.parse(record.completedModules[0]);
      return NextResponse.json({ success: true, state });
    } catch {
      return NextResponse.json({ success: true, state: null });
    }
  } catch (error: any) {
    console.error("Fetch Gamification Error:", error);
    const message =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error?.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const parseResult = GamificationSyncSchema.safeParse(rawBody);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check existing cloud record
    const existing = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__gamification__",
        },
      },
    });

    let existingState: UserGamificationState | null = null;
    if (existing && existing.completedModules && existing.completedModules.length > 0) {
      try {
        existingState = JSON.parse(existing.completedModules[0]);
      } catch {}
    }

    const merged = mergeStates(parseResult.data, existingState);

    await (prisma.progress as any).upsert({
      where: {
        userId_module: {
          userId,
          module: "__gamification__",
        },
      },
      update: {
        score: merged.totalXP,
        activeModule: merged.lastActiveDate,
        completedModules: [JSON.stringify(merged)],
        completed: true,
      },
      create: {
        userId,
        module: "__gamification__",
        score: merged.totalXP,
        activeModule: merged.lastActiveDate,
        completedModules: [JSON.stringify(merged)],
        completed: true,
      },
    });

    return NextResponse.json({ success: true, state: merged });
  } catch (error: any) {
    console.error("Gamification Sync Error:", error);
    const message =
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : error?.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
