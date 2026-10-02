import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getAuthenticatedUserId(req: NextRequest): Promise<string | null> {
  // 1. Check database sessionToken directly from cookies (NextAuth Prisma adapter strategy)
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

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await prisma.progress.findMany({
      where: { userId },
    });

    return NextResponse.json({ success: true, data: progress });
  } catch (error: any) {
    console.error("Fetch Progress Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      module,
      completed,
      score,
      force,
      activeModule,
      completedModules,
      totalModules,
    } = await req.json();

    if (!module) {
      return NextResponse.json({ error: "Module ID is required" }, { status: 400 });
    }

    const existing = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module,
        },
      },
    });

    // Merge completed modules list
    let mergedCompletedModules: string[] = existing?.completedModules || [];
    if (Array.isArray(completedModules)) {
      mergedCompletedModules = Array.from(
        new Set([...mergedCompletedModules, ...completedModules])
      );
    }

    // Auto-detect if all modules in the lesson have been completed
    const allModulesCompleted = Boolean(
      totalModules &&
      totalModules > 0 &&
      mergedCompletedModules.length >= totalModules
    );

    let shouldBeCompleted = completed ?? false;
    if (allModulesCompleted) {
      shouldBeCompleted = true;
    } else if (existing?.completed && completed === false && !force) {
      shouldBeCompleted = true;
    } else if (completed === true) {
      shouldBeCompleted = true;
    } else if (force && completed === false) {
      shouldBeCompleted = false;
    }

    // Calculate progress percentage
    let calculatedScore = score;
    if (calculatedScore === undefined || calculatedScore === null) {
      if (shouldBeCompleted) {
        calculatedScore = 100;
      } else if (totalModules && totalModules > 0) {
        calculatedScore = Math.round(
          (mergedCompletedModules.length / totalModules) * 100
        );
      } else {
        calculatedScore = existing?.score ?? null;
      }
    }

    const progress = await (prisma.progress as any).upsert({
      where: {
        userId_module: {
          userId,
          module,
        },
      },
      update: {
        completed: shouldBeCompleted,
        score: calculatedScore,
        activeModule: activeModule !== undefined ? activeModule : (existing?.activeModule ?? null),
        completedModules: mergedCompletedModules,
      },
      create: {
        userId,
        module,
        completed: shouldBeCompleted,
        score: calculatedScore,
        activeModule: activeModule ?? null,
        completedModules: mergedCompletedModules,
      },
    });

    return NextResponse.json({ success: true, progress });
  } catch (error: any) {
    console.error("Progress Sync Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
