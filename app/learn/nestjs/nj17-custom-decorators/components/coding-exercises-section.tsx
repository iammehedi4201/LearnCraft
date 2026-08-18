"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON DECORATORS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Custom Decorator Logic">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Test your custom decorator logic! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: User Extractor ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: CurrentUser Extractor Logic</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "decorators-ex-01",
              title: "1. Build User Extractor Callback",
              instructions: `Implement 'extractUser(data: string | undefined, req: { user?: any })':
1. If req.user is missing, return null.
2. If data is provided (e.g. "email"), return req.user[data].
3. If data is omitted, return req.user.`,
              starterCode: `function extractUser(data: string | undefined, req: { user?: any }) {
  // Your code here:
}

const mockReq = { user: { id: 10, email: "alice@learncraft.dev", role: "admin" } };
console.log("Full user:   ", extractUser(undefined, mockReq));
console.log("Specific key:", extractUser("email", mockReq));`,
              solutionCode: `function extractUser(data: string | undefined, req: { user?: any }) {
  if (!req || !req.user) {
    return null;
  }
  if (data) {
    return req.user[data];
  }
  return req.user;
}

const mockReq = { user: { id: 10, email: "alice@learncraft.dev", role: "admin" } };
console.log("Full user:   ", extractUser(undefined, mockReq));
console.log("Specific key:", extractUser("email", mockReq));`,
              hints: [
                "Check !req || !req.user first.",
                "Return req.user[data] if data is provided.",
              ],
              tests: [
                {
                  name: "Extracts full user object when data is omitted",
                  code: `const r = extractUser(undefined, { user: { id: 1 } }); if (!r || r.id !== 1) throw new Error("Full user extraction failed");`,
                },
                {
                  name: "Extracts specific property when key is provided",
                  code: `const r = extractUser("email", { user: { email: "test@example.com" } }); if (r !== "test@example.com") throw new Error("Property extraction failed");`,
                },
                {
                  name: "Returns null when user is missing",
                  code: `const r = extractUser("id", {}); if (r !== null) throw new Error("Should return null if user missing");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Header Extractor ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: IP Address Resolver</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "decorators-ex-02",
              title: "2. Build IP Address Resolver",
              instructions: `Implement 'resolveClientIp(req: { headers: Record<string, string>, ip?: string })':
1. Check 'x-forwarded-for' header. If present, split by comma and return the first trimmed IP.
2. Otherwise, check req.ip.
3. Fall back to "127.0.0.1" if no IP is found.`,
              starterCode: `function resolveClientIp(req: { headers: Record<string, string>, ip?: string }): string {
  // Your code here:
}

console.log("Proxy IP: ", resolveClientIp({ headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" } }));
console.log("Direct IP:", resolveClientIp({ headers: {}, ip: "192.168.1.50" }));`,
              solutionCode: `function resolveClientIp(req: { headers: Record<string, string>, ip?: string }): string {
  if (req.headers && req.headers["x-forwarded-for"]) {
    const raw = req.headers["x-forwarded-for"];
    return raw.split(",")[0].trim();
  }
  if (req.ip) {
    return req.ip;
  }
  return "127.0.0.1";
}

console.log("Proxy IP: ", resolveClientIp({ headers: { "x-forwarded-for": "203.0.113.195, 70.41.3.18" } }));
console.log("Direct IP:", resolveClientIp({ headers: {}, ip: "192.168.1.50" }));`,
              hints: [
                "Split x-forwarded-for by comma: raw.split(',')[0].trim()",
              ],
              tests: [
                {
                  name: "Extracts client IP behind reverse proxy",
                  code: `const r = resolveClientIp({ headers: { "x-forwarded-for": "10.0.0.1, 10.0.0.2" } }); if (r !== "10.0.0.1") throw new Error("Reverse proxy resolution failed");`,
                },
                {
                  name: "Falls back to 127.0.0.1 when empty",
                  code: `const r = resolveClientIp({ headers: {} }); if (r !== "127.0.0.1") throw new Error("Fallback failed");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
