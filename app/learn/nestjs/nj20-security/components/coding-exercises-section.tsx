"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON SECURITY)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Security Logic">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your security knowledge into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Rate Limiter ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Sliding Window Rate Limiter</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "security-ex-01",
              title: "1. Build Rate Limiting Evaluator",
              instructions: `Implement 'isRateLimited(history: number[], currentTimeMs: number, windowMs: number, maxLimit: number)':
1. Filter history to keep only timestamps where: t >= currentTimeMs - windowMs.
2. If count of remaining timestamps >= maxLimit, return { allowed: false, remaining: 0 }.
3. Otherwise, return { allowed: true, remaining: maxLimit - count - 1 }.`,
              starterCode: `function isRateLimited(history: number[], currentTimeMs: number, windowMs: number, maxLimit: number) {
  // Your code here:
}

console.log("Allowed: ", isRateLimited([1000, 2000], 3000, 5000, 5));
console.log("Blocked: ", isRateLimited([1000, 2000, 2500], 3000, 5000, 3));`,
              solutionCode: `function isRateLimited(history: number[], currentTimeMs: number, windowMs: number, maxLimit: number) {
  const windowStart = currentTimeMs - windowMs;
  const recent = history.filter((t) => t >= windowStart);

  if (recent.length >= maxLimit) {
    return { allowed: false, remaining: 0 };
  }
  return { allowed: true, remaining: maxLimit - recent.length - 1 };
}

console.log("Allowed: ", isRateLimited([1000, 2000], 3000, 5000, 5));
console.log("Blocked: ", isRateLimited([1000, 2000, 2500], 3000, 5000, 3));`,
              hints: [
                "Filter history using t >= currentTimeMs - windowMs.",
                "Compare recent.length against maxLimit.",
              ],
              tests: [
                {
                  name: "Allows requests within limit",
                  code: `const r = isRateLimited([100], 200, 1000, 5); if (!r || !r.allowed) throw new Error("Should be allowed");`,
                },
                {
                  name: "Blocks requests exceeding limit",
                  code: `const r = isRateLimited([100, 200, 300], 400, 1000, 3); if (!r || r.allowed) throw new Error("Should be blocked");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Whitelist DTO Sanitizer ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: DTO Property Whitelist Sanitizer</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "security-ex-02",
              title: "2. Build DTO Whitelist Sanitizer",
              instructions: `Implement 'sanitizePayload(input: Record<string, any>, allowedKeys: string[])':
Returns a new object containing ONLY keys that exist in allowedKeys (stripping unexpected properties like 'isAdmin').`,
              starterCode: `function sanitizePayload(input: Record<string, any>, allowedKeys: string[]): Record<string, any> {
  // Your code here:
}

const rawBody = { email: "user@test.com", name: "Bob", isAdmin: true, role: "super_admin" };
console.log("Sanitized:", sanitizePayload(rawBody, ["email", "name"]));`,
              solutionCode: `function sanitizePayload(input: Record<string, any>, allowedKeys: string[]): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key of allowedKeys) {
    if (key in input) {
      result[key] = input[key];
    }
  }
  return result;
}

const rawBody = { email: "user@test.com", name: "Bob", isAdmin: true, role: "super_admin" };
console.log("Sanitized:", sanitizePayload(rawBody, ["email", "name"]));`,
              hints: [
                "Loop through allowedKeys and copy properties from input.",
              ],
              tests: [
                {
                  name: "Strips non-whitelisted properties",
                  code: `const r = sanitizePayload({ a: 1, b: 2, malicious: true }, ["a", "b"]); if (!r || r.malicious !== undefined || r.a !== 1 || r.b !== 2) throw new Error("Sanitization failed");`,
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
