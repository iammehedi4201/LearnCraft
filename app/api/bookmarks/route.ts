import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
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

const PostBookmarkSchema = z.object({
  bookmark: BookmarkSchema,
});

async function getStoredBookmarks(userId: string): Promise<CodeBookmark[]> {
  try {
    const record = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__user_bookmarks__",
        },
      },
    });

    if (!record || !record.completedModules || record.completedModules.length === 0) {
      return [];
    }

    const parsed = JSON.parse(record.completedModules[0]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function persistBookmarks(userId: string, bookmarks: CodeBookmark[]): Promise<void> {
  const serialized = JSON.stringify(bookmarks);
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
      score: bookmarks.length,
      activeModule: "bookmarks",
      completedModules: [serialized],
    },
    update: {
      score: bookmarks.length,
      completedModules: [serialized],
      updatedAt: new Date(),
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const trackKey = searchParams.get("trackKey");
    const lessonSlug = searchParams.get("lessonSlug");

    let bookmarks = await getStoredBookmarks(userId);

    if (trackKey) {
      bookmarks = bookmarks.filter((b) => b.trackKey === trackKey);
    }
    if (lessonSlug) {
      bookmarks = bookmarks.filter((b) => b.lessonSlug === lessonSlug);
    }

    return NextResponse.json({ success: true, bookmarks });
  } catch (err: any) {
    console.error("GET /api/bookmarks error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
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

    const raw = await req.json();
    const parsed = PostBookmarkSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid bookmark payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const bookmark = parsed.data.bookmark;
    const existing = await getStoredBookmarks(userId);

    const idx = existing.findIndex((b) => b.id === bookmark.id);
    if (idx >= 0) {
      existing[idx] = bookmark;
    } else {
      existing.unshift(bookmark);
    }

    await persistBookmarks(userId, existing);

    return NextResponse.json({ success: true, bookmark });
  } catch (err: any) {
    console.error("POST /api/bookmarks error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const existing = await getStoredBookmarks(userId);
    const filtered = existing.filter((b) => b.id !== id);
    await persistBookmarks(userId, filtered);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error("DELETE /api/bookmarks error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
      { status: 500 }
    );
  }
}
