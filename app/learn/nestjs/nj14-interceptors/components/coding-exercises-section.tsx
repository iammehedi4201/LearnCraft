"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON INTERCEPTORS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Interceptors & Streams">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your response transformation skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Response Wrapper ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Standard Envelope Transformer</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "interceptors-ex-01",
              title: "1. Build Response Envelope Transformer",
              instructions: `Implement 'wrapResponse(data: any, statusCode: number = 200)':
Returns an object:
{
  success: true,
  statusCode: statusCode,
  data: data,
  count: Array.isArray(data) ? data.length : 1,
}`,
              starterCode: `function wrapResponse(data: any, statusCode: number = 200) {
  // Your code here:
}

console.log("Array payload: ", wrapResponse(["apple", "banana"], 200));
console.log("Object payload:", wrapResponse({ id: 1, name: "Alice" }, 201));`,
              solutionCode: `function wrapResponse(data: any, statusCode: number = 200) {
  return {
    success: true,
    statusCode: statusCode,
    data: data,
    count: Array.isArray(data) ? data.length : 1,
  };
}

console.log("Array payload: ", wrapResponse(["apple", "banana"], 200));
console.log("Object payload:", wrapResponse({ id: 1, name: "Alice" }, 201));`,
              hints: [
                "Check Array.isArray(data) to calculate item count.",
              ],
              tests: [
                {
                  name: "Wraps array with correct count",
                  code: `const r = wrapResponse([1, 2, 3], 200); if (!r || !r.success || r.count !== 3 || r.data.length !== 3) throw new Error("Array count failed");`,
                },
                {
                  name: "Wraps single object with count 1",
                  code: `const r = wrapResponse({ id: 1 }, 201); if (!r || !r.success || r.count !== 1 || r.statusCode !== 201) throw new Error("Object wrap failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Cache Short-Circuit Simulator ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Cache Short-Circuit Simulator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "interceptors-ex-02",
              title: "2. Build Cache Interceptor Simulator",
              instructions: `Implement 'handleWithCache(url: string, cacheMap: Map<string, any>, handlerFn: () => any)':
1. If cacheMap has 'url', return { fromCache: true, data: cacheMap.get(url) }.
2. Otherwise, call handlerFn(), store the result into cacheMap, and return { fromCache: false, data: result }.`,
              starterCode: `function handleWithCache(url: string, cacheMap: Map<string, any>, handlerFn: () => any) {
  // Your code here:
}

const memoryCache = new Map<string, any>();
const queryDb = () => [{ id: 1, title: "NestJS Guide" }];

console.log("First call: ", handleWithCache("/books", memoryCache, queryDb));
console.log("Second call:", handleWithCache("/books", memoryCache, queryDb));`,
              solutionCode: `function handleWithCache(url: string, cacheMap: Map<string, any>, handlerFn: () => any) {
  if (cacheMap.has(url)) {
    return { fromCache: true, data: cacheMap.get(url) };
  }
  const result = handlerFn();
  cacheMap.set(url, result);
  return { fromCache: false, data: result };
}

const memoryCache = new Map<string, any>();
const queryDb = () => [{ id: 1, title: "NestJS Guide" }];

console.log("First call: ", handleWithCache("/books", memoryCache, queryDb));
console.log("Second call:", handleWithCache("/books", memoryCache, queryDb));`,
              hints: [
                "Use cacheMap.has(url) to check cache hit.",
                "Call handlerFn() and cacheMap.set(url, result) on miss.",
              ],
              tests: [
                {
                  name: "Executes handler on cache miss",
                  code: `const map = new Map(); let count = 0; const fn = () => { count++; return "data"; }; const r1 = handleWithCache("/test", map, fn); if (r1.fromCache !== false || count !== 1) throw new Error("Should run handler on miss");`,
                },
                {
                  name: "Returns cached data on subsequent call",
                  code: `const map = new Map(); map.set("/hit", "cached"); let count = 0; const fn = () => { count++; return "fresh"; }; const r2 = handleWithCache("/hit", map, fn); if (r2.fromCache !== true || r2.data !== "cached" || count !== 0) throw new Error("Should short-circuit on hit");`,
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
