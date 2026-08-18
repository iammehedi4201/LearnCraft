"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON PIPES)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Custom Pipes">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Test your pipe implementation skills! Write your code in the interactive playgrounds below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: ParsePositiveIntPipe ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: ParsePositiveIntPipe</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "pipes-ex-01",
              title: "1. Build ParsePositiveIntPipe",
              instructions: `Implement 'transformPositiveInt(val: any)':
1. Convert 'val' to an integer using parseInt.
2. If it is NaN or <= 0, return { valid: false, error: "Must be a positive integer" }.
3. If valid, return { valid: true, value: parsedNumber }.`,
              starterCode: `function transformPositiveInt(val: any) {
  // Your code here:
}

console.log("Valid:", transformPositiveInt("42"));
console.log("Invalid (neg):", transformPositiveInt("-5"));
console.log("Invalid (nan):", transformPositiveInt("abc"));`,
              solutionCode: `function transformPositiveInt(val: any) {
  const num = parseInt(String(val), 10);
  if (isNaN(num) || num <= 0) {
    return { valid: false, error: "Must be a positive integer" };
  }
  return { valid: true, value: num };
}

console.log("Valid:", transformPositiveInt("42"));
console.log("Invalid (neg):", transformPositiveInt("-5"));
console.log("Invalid (nan):", transformPositiveInt("abc"));`,
              hints: [
                "Use parseInt(String(val), 10) to convert.",
                "Check isNaN(num) || num <= 0.",
              ],
              tests: [
                {
                  name: "Parses positive string number",
                  code: `const r = transformPositiveInt("100"); if (!r || !r.valid || r.value !== 100) throw new Error("Should return valid: true with value 100");`,
                },
                {
                  name: "Rejects negative number",
                  code: `const r = transformPositiveInt("-10"); if (!r || r.valid) throw new Error("Should reject negative numbers");`,
                },
                {
                  name: "Rejects non-numeric strings",
                  code: `const r = transformPositiveInt("xyz"); if (!r || r.valid) throw new Error("Should reject non-numeric strings");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Slug Transform Pipe ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: SanitizeSlugPipe</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "pipes-ex-02",
              title: "2. Build SanitizeSlugPipe",
              instructions: `Implement 'transformSlug(title: string)':
1. Lowercase the entire string.
2. Trim leading and trailing whitespace.
3. Replace all spaces and special characters with a single hyphen '-'.
Example: "  Hello World 2026!  " -> "hello-world-2026"`,
              starterCode: `function transformSlug(title: string): string {
  // Your code here:
}

console.log(transformSlug("  NestJS 10 Architecture Guide!  "));`,
              solutionCode: `function transformSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

console.log(transformSlug("  NestJS 10 Architecture Guide!  "));`,
              hints: [
                "Use .toLowerCase().trim()",
                "Use .replace(/[^a-z0-9]+/g, '-') to replace non-alphanumeric chars with hyphens.",
              ],
              tests: [
                {
                  name: "Converts title to clean slug",
                  code: `const r = transformSlug("  Learn NestJS Fast!  "); if (r !== "learn-nestjs-fast") throw new Error("Expected 'learn-nestjs-fast' but got: " + r);`,
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
