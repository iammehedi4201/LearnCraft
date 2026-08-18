"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON AUTH)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Authentication Logic">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your authentication knowledge into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: JWT Payload Builder ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Standard JWT Claims Builder</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "auth-ex-01",
              title: "1. Build JWT Payload Claims",
              instructions: `Implement 'buildClaims(user: { id: number, email: string, role: string }, durationSeconds: number = 900)':
Returns an object:
{
  sub: user.id,
  email: user.email,
  role: user.role,
  exp: 1700000000 + durationSeconds,
}`,
              starterCode: `function buildClaims(user: { id: number, email: string, role: string }, durationSeconds: number = 900) {
  // Your code here:
}

console.log("Payload:", buildClaims({ id: 42, email: "alice@learncraft.dev", role: "admin" }, 900));`,
              solutionCode: `function buildClaims(user: { id: number, email: string, role: string }, durationSeconds: number = 900) {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: 1700000000 + durationSeconds,
  };
}

console.log("Payload:", buildClaims({ id: 42, email: "alice@learncraft.dev", role: "admin" }, 900));`,
              hints: [
                "Map user.id to sub claim.",
                "Calculate exp as 1700000000 + durationSeconds.",
              ],
              tests: [
                {
                  name: "Constructs correct JWT claims",
                  code: `const r = buildClaims({ id: 10, email: "test@example.com", role: "user" }, 60); if (!r || r.sub !== 10 || r.email !== "test@example.com" || r.exp !== 1700000060) throw new Error("Claims construction failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Token Expiration Checker ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Token Expiration Verifier</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "auth-ex-02",
              title: "2. Build Token Expiration Verifier",
              instructions: `Implement 'verifyTokenExpiration(payload: { exp: number }, currentTimeSeconds: number)':
1. If payload.exp < currentTimeSeconds, return { valid: false, reason: "Token expired" }.
2. Otherwise, return { valid: true }.`,
              starterCode: `function verifyTokenExpiration(payload: { exp: number }, currentTimeSeconds: number) {
  // Your code here:
}

console.log("Valid:  ", verifyTokenExpiration({ exp: 1700001000 }, 1700000500));
console.log("Expired:", verifyTokenExpiration({ exp: 1700000100 }, 1700000500));`,
              solutionCode: `function verifyTokenExpiration(payload: { exp: number }, currentTimeSeconds: number) {
  if (payload.exp < currentTimeSeconds) {
    return { valid: false, reason: "Token expired" };
  }
  return { valid: true };
}

console.log("Valid:  ", verifyTokenExpiration({ exp: 1700001000 }, 1700000500));
console.log("Expired:", verifyTokenExpiration({ exp: 1700000100 }, 1700000500));`,
              hints: [
                "Compare payload.exp < currentTimeSeconds.",
              ],
              tests: [
                {
                  name: "Validates active token",
                  code: `const r = verifyTokenExpiration({ exp: 200 }, 100); if (!r || !r.valid) throw new Error("Should be valid");`,
                },
                {
                  name: "Rejects expired token",
                  code: `const r = verifyTokenExpiration({ exp: 50 }, 100); if (!r || r.valid) throw new Error("Should reject expired token");`,
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
