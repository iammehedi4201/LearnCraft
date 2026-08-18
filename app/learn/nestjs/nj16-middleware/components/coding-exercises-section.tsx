"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON MIDDLEWARE)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Custom Middleware">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your middleware skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Correlation ID Middleware ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Correlation ID Middleware</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "middleware-ex-01",
              title: "1. Build Correlation ID Middleware",
              instructions: `Implement 'tagRequest(req: any, res: any, next: () => void)':
1. Read 'x-correlation-id' from req.headers.
2. If missing, generate a string "req-" + Math.floor(Math.random() * 10000).
3. Set req.correlationId = id.
4. Set res.headers['x-correlation-id'] = id.
5. Call next().`,
              starterCode: `function tagRequest(req: any, res: any, next: () => void) {
  // Your code here:
}

const reqMock = { headers: {} };
const resMock = { headers: {} };
tagRequest(reqMock, resMock, () => console.log("Next called with ID:", reqMock.correlationId));`,
              solutionCode: `function tagRequest(req: any, res: any, next: () => void) {
  const id = req.headers && req.headers["x-correlation-id"]
    ? req.headers["x-correlation-id"]
    : "req-" + Math.floor(Math.random() * 10000);

  req.correlationId = id;
  if (!res.headers) res.headers = {};
  res.headers["x-correlation-id"] = id;

  next();
}

const reqMock = { headers: {} };
const resMock = { headers: {} };
tagRequest(reqMock, resMock, () => console.log("Next called with ID:", reqMock.correlationId));`,
              hints: [
                "Check req.headers['x-correlation-id'] first.",
                "Assign to req.correlationId and res.headers['x-correlation-id'].",
                "Do not forget to call next().",
              ],
              tests: [
                {
                  name: "Tags request and response with generated ID",
                  code: `const q = { headers: {} }; const s = { headers: {} }; let called = false; tagRequest(q, s, () => { called = true; }); if (!called || !q.correlationId || q.correlationId !== s.headers["x-correlation-id"]) throw new Error("Tagging failed");`,
                },
                {
                  name: "Preserves existing incoming correlation ID",
                  code: `const q = { headers: { "x-correlation-id": "custom-123" } }; const s = { headers: {} }; tagRequest(q, s, () => {}); if (q.correlationId !== "custom-123") throw new Error("Should preserve custom ID");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Route Matcher ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Route Exclusion Matcher</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "middleware-ex-02",
              title: "2. Build Route Exclusion Filter",
              instructions: `Implement 'isExcluded(excludedPaths: string[], currentPath: string)':
1. Returns true if currentPath matches any path in excludedPaths (or starts with wildcard e.g. "auth/*").
2. Returns false otherwise.`,
              starterCode: `function isExcluded(excludedPaths: string[], currentPath: string): boolean {
  // Your code here:
}

console.log("Excluded:    ", isExcluded(["health", "auth/*"], "auth/login"));
console.log("Not Excluded:", isExcluded(["health", "auth/*"], "users/profile"));`,
              solutionCode: `function isExcluded(excludedPaths: string[], currentPath: string): boolean {
  return excludedPaths.some((p) => {
    if (p.endsWith("/*")) {
      const prefix = p.replace("/*", "");
      return currentPath.startsWith(prefix);
    }
    return p === currentPath;
  });
}

console.log("Excluded:    ", isExcluded(["health", "auth/*"], "auth/login"));
console.log("Not Excluded:", isExcluded(["health", "auth/*"], "users/profile"));`,
              hints: [
                "Check for wildcard suffix: p.endsWith('/*')",
                "Use .some() to match any path in excludedPaths.",
              ],
              tests: [
                {
                  name: "Matches exact and wildcard paths",
                  code: `if (!isExcluded(["health", "auth/*"], "health") || !isExcluded(["health", "auth/*"], "auth/register")) throw new Error("Should match excluded");`,
                },
                {
                  name: "Rejects non-matching path",
                  code: `if (isExcluded(["health", "auth/*"], "products")) throw new Error("Should not exclude products");`,
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
