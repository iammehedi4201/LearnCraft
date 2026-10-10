import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Extracts authenticated user ID from NextAuth cookies or database session.
 */
export async function getAuthenticatedUserId(req: NextRequest): Promise<string | null> {
  // 1. Direct cookie sessionToken verification against database
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
  } catch {}

  return null;
}
