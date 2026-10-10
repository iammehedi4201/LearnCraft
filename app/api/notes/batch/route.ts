import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUserId } from "@/lib/auth-helper";
import { mergeNotesStates } from "@/lib/notes-bookmarks";
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

const BatchNotesSchema = z.object({
  notes: z.array(NoteSchema),
});

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const raw = await req.json();
    const parsed = BatchNotesSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid batch notes payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const incomingNotes = parsed.data.notes;

    const record = await (prisma.progress as any).findUnique({
      where: {
        userId_module: {
          userId,
          module: "__user_notes__",
        },
      },
    });

    let currentNotes: UserNote[] = [];
    if (record?.completedModules?.[0]) {
      try {
        currentNotes = JSON.parse(record.completedModules[0]);
      } catch {}
    }

    const merged = mergeNotesStates(currentNotes, incomingNotes);
    const serialized = JSON.stringify(merged);

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
        score: merged.length,
        activeModule: "notes",
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
    console.error("POST /api/notes/batch error:", err);
    return NextResponse.json(
      { error: process.env.NODE_ENV === "production" ? "Internal Error" : err?.message },
      { status: 500 }
    );
  }
}
