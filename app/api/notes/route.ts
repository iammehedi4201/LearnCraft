import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
import type { UserNote } from "@/types/notes-bookmarks";

const NoteSchema = z.object({
  id: z.string(),
  trackKey: z.string(),
  lessonSlug: z.string(),
  sectionId: z.string().optional(),
  title: z.string().optional(),
  content: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

const PostNoteSchema = z.object({
  note: NoteSchema,
});

async function getStoredNotes(userId: string): Promise<UserNote[]> {
  try {
    const record = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__user_notes__",
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

async function persistNotes(userId: string, notes: UserNote[]): Promise<void> {
  const serialized = JSON.stringify(notes);
  await (prisma.progress as any).upsert({
    where: {
      userId_module: {
        userId,
        module: "__user_notes__",
      },
    },
    create: {
      userId,
      module: "__user_notes__",
      completed: true,
      score: notes.length,
      activeModule: "notes",
      completedModules: [serialized],
    },
    update: {
      score: notes.length,
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

    let notes = await getStoredNotes(userId);

    if (trackKey) {
      notes = notes.filter((n) => n.trackKey === trackKey);
    }
    if (lessonSlug) {
      notes = notes.filter((n) => n.lessonSlug === lessonSlug);
    }

    return NextResponse.json({ success: true, notes });
  } catch (err: any) {
    console.error("GET /api/notes error:", err);
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
    const parsed = PostNoteSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid note payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const note = parsed.data.note;
    const existingNotes = await getStoredNotes(userId);

    const idx = existingNotes.findIndex((n) => n.id === note.id);
    if (idx >= 0) {
      existingNotes[idx] = note;
    } else {
      existingNotes.unshift(note);
    }

    await persistNotes(userId, existingNotes);

    return NextResponse.json({ success: true, note });
  } catch (err: any) {
    console.error("POST /api/notes error:", err);
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

    const existingNotes = await getStoredNotes(userId);
    const filtered = existingNotes.filter((n) => n.id !== id);
    await persistNotes(userId, filtered);

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: any) {
    console.error("DELETE /api/notes error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
      { status: 500 }
    );
  }
}
