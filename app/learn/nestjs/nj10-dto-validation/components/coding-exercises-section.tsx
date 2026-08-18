"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your NestJS validation and DTO skills to the test! Write your code in the interactive playgrounds below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Validate Registration Payload ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Registration Validator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dto-ex-01",
              title: "1. Validate User Registration",
              instructions: `Implement 'validateUser(payload: any)':
1. 'username': Must be string with length >= 3.
2. 'email': Must contain '@'.
3. 'age': Must be a number >= 18.
Return '{ valid: true }' if all pass, or '{ valid: false, error: string }' if any rule fails.`,
              starterCode: `function validateUser(payload: any) {
  // Your code here:
}

console.log("Valid:  ", validateUser({ username: "alex", email: "alex@dev.to", age: 20 }));
console.log("Invalid:", validateUser({ username: "al", email: "bad", age: 16 }));`,
              solutionCode: `function validateUser(payload: any) {
  if (typeof payload.username !== "string" || payload.username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }
  if (typeof payload.email !== "string" || !payload.email.includes("@")) {
    return { valid: false, error: "Email must be valid" };
  }
  if (typeof payload.age !== "number" || payload.age < 18) {
    return { valid: false, error: "Age must be at least 18" };
  }
  return { valid: true };
}

console.log("Valid:  ", validateUser({ username: "alex", email: "alex@dev.to", age: 20 }));
console.log("Invalid:", validateUser({ username: "al", email: "bad", age: 16 }));`,
              hints: [
                "Check typeof username === 'string' && username.length >= 3.",
                "Check email.includes('@').",
                "Check typeof age === 'number' && age >= 18.",
              ],
              tests: [
                {
                  name: "Passes valid user",
                  code: `const r = validateUser({ username: "validUser", email: "test@example.com", age: 25 }); if (!r || !r.valid) throw new Error("Should return valid: true");`,
                },
                {
                  name: "Rejects underage user",
                  code: `const r = validateUser({ username: "validUser", email: "test@example.com", age: 15 }); if (!r || r.valid) throw new Error("Should return valid: false for underage user");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Whitelist Stripper ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Whitelist Sanitizer</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dto-ex-02",
              title: "2. Build a Whitelist Filter",
              instructions: `Implement 'sanitizePayload(allowedKeys: string[], payload: Record<string, any>)':
Returns a new object containing ONLY the keys present in 'allowedKeys'.`,
              starterCode: `function sanitizePayload(allowedKeys: string[], payload: Record<string, any>) {
  // Your code here:
}

const raw = { title: "NestJS Guide", price: 29.99, isHacked: true, role: "admin" };
console.log("Sanitized:", sanitizePayload(["title", "price"], raw));`,
              solutionCode: `function sanitizePayload(allowedKeys: string[], payload: Record<string, any>) {
  const result: Record<string, any> = {};
  for (const key of allowedKeys) {
    if (key in payload) {
      result[key] = payload[key];
    }
  }
  return result;
}

const raw = { title: "NestJS Guide", price: 29.99, isHacked: true, role: "admin" };
console.log("Sanitized:", sanitizePayload(["title", "price"], raw));`,
              hints: [
                "Iterate through allowedKeys and copy values present in payload.",
              ],
              tests: [
                {
                  name: "Strips disallowed properties",
                  code: `const res = sanitizePayload(["a", "b"], { a: 1, b: 2, c: 3, hacker: true }); if (res.c !== undefined || res.hacker !== undefined || res.a !== 1 || res.b !== 2) throw new Error("Sanitization failed");`,
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
