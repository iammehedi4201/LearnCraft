import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
import { mergeBookmarksStates } from "@/lib/notes-bookmarks";
import type { CodeBookmark } from "@/types/notes-bookmarks";

const BookmarkSchema = z.object({
  id: z.string(),
  trackKey: z.string(),
  lessonSlug: z.string(),
  sectionId: z.string().optional(),
  title: z.string(),
  code: z.string(),
  language: z.string().optional().default("typescript"),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  createdAt: z.number(),
});

const BatchBookmarksSchema = z.object({
  bookmarks: z.array(BookmarkSchema),
});

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const raw = await req.json();
    const parsed = BatchBookmarksSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid batch bookmarks payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const incomingBookmarks = parsed.data.bookmarks;

    const record = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__user_bookmarks__",
        },
      },
    });

    let currentBookmarks: CodeBookmark[] = [];
    if (record?.completedModules?.[0]) {
      try {
        currentBookmarks = JSON.parse(record.completedModules[0]);
      } catch {}
    }

    const merged = mergeBookmarksStates(currentBookmarks, incomingBookmarks);
    const serialized = JSON.stringify(merged);

    await (prisma.progress as any).upsert({
      where: {
        userId_module: {
          userId,
          module: "__user_bookmarks__",
        },
      },
      create: {
        userId,
        module: "__user_bookmarks__",
        completed: true,
        score: merged.length,
        activeModule: "bookmarks",
        completedModules: [serialized],
      },
      update: {
        score: merged.length,
        completedModules: [serialized],
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, count: merged.length });
  } catch (err: any) {
    console.error("POST /api/bookmarks/batch error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
      { status: 500 }
    );
  }
}
