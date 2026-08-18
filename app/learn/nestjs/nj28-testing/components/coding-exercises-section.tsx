"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON TESTING)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Test Runner &amp; Mocks">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your unit test mock and assertion logic to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Mock Fn Generator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Jest-like Mock Function Generator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "testing-ex-01",
              title: "1. Build Mock Function Generator",
              instructions: `Implement 'createMockFn(defaultReturn: any)':
Returns a function 'fn' that:
- Records calls in 'fn.calls' array (each element is the array of arguments passed to that call).
- Returns defaultReturn when called.
- Has 'fn.mockResolvedValue(val)' to update return value.`,
              starterCode: `function createMockFn(defaultReturn?: any) {
  // Your code here:
}

const mockFind = createMockFn({ id: 1, name: "Alice" });
console.log("Call 1:", mockFind({ where: { id: 1 } }));
console.log("Recorded calls:", mockFind.calls);`,
              solutionCode: `function createMockFn(defaultReturn?: any) {
  let ret = defaultReturn;
  const calls: any[][] = [];

  const mock: any = (...args: any[]) => {
    calls.push(args);
    return ret;
  };

  mock.calls = calls;
  mock.mockResolvedValue = (val: any) => {
    ret = val;
  };

  return mock;
}

const mockFind = createMockFn({ id: 1, name: "Alice" });
console.log("Call 1:", mockFind({ where: { id: 1 } }));
console.log("Recorded calls:", mockFind.calls);`,
              hints: [
                "Store calls array and return value in closure.",
                "Attach .calls and .mockResolvedValue to the returned function.",
              ],
              tests: [
                {
                  name: "Records function calls and arguments accurately",
                  code: `const m = createMockFn("hello"); const res = m(1, 2); if (res !== "hello" || m.calls.length !== 1 || m.calls[0][0] !== 1) throw new Error("Mock failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Deep Equal Assertion ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Deep Object Assertion Evaluator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "testing-ex-02",
              title: "2. Build Deep Object Equality Checker",
              instructions: `Implement 'deepEqual(a: any, b: any)':
Recursively checks if objects 'a' and 'b' have identical keys and values. Returns true or false.`,
              starterCode: `function deepEqual(a: any, b: any): boolean {
  // Your code here:
}

console.log("Equal:   ", deepEqual({ x: 1, y: { z: 2 } }, { x: 1, y: { z: 2 } }));
console.log("Not Equal:", deepEqual({ x: 1 }, { x: 2 }));`,
              solutionCode: `function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) {
    return false;
  }
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

console.log("Equal:   ", deepEqual({ x: 1, y: { z: 2 } }, { x: 1, y: { z: 2 } }));
console.log("Not Equal:", deepEqual({ x: 1 }, { x: 2 }));`,
              hints: [
                "Compare primitives with ===, then compare Object.keys().",
                "Recursively call deepEqual on nested objects.",
              ],
              tests: [
                {
                  name: "Matches deeply nested objects",
                  code: `if (!deepEqual({ a: { b: 1 } }, { a: { b: 1 } })) throw new Error("Should be equal");`,
                },
                {
                  name: "Detects mismatched properties",
                  code: `if (deepEqual({ a: 1 }, { a: 2 })) throw new Error("Should not be equal");`,
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
