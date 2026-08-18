"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES & PIPELINE SIMULATION
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Pipeline Simulation">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Test your mastery of the NestJS execution order! Complete the pipeline simulator below and click <strong>Check</strong> to verify your solution.
        </p>
      </div>

      {/* ── Exercise 1: Build Request Pipeline Runner ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Request Lifecycle Dispatcher</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "lifecycle-ex-01",
              title: "1. Implement Request Pipeline Runner",
              instructions: `Write 'runPipeline(options)':
1. If options.hasToken is false, the Guard should reject: return { status: 401, error: "Unauthorized" }.
2. If options.payload is invalid (e.g. options.payload.id <= 0), Pipe should reject: return { status: 400, error: "Bad Request" }.
3. Otherwise, return { status: 200, data: options.payload, durationMs: 5 }.`,
              starterCode: `interface RequestOptions {
  hasToken: boolean;
  payload: { id: number; name: string };
}

function runPipeline(opts: RequestOptions) {
  // Your code here:
}

console.log("Valid request:   ", runPipeline({ hasToken: true, payload: { id: 1, name: "Alice" } }));
console.log("No token request:", runPipeline({ hasToken: false, payload: { id: 1, name: "Alice" } }));`,
              solutionCode: `interface RequestOptions {
  hasToken: boolean;
  payload: { id: number; name: string };
}

function runPipeline(opts: RequestOptions) {
  // 1. Guard check
  if (!opts.hasToken) {
    return { status: 401, error: "Unauthorized" };
  }
  // 2. Pipe check
  if (!opts.payload || opts.payload.id <= 0) {
    return { status: 400, error: "Bad Request" };
  }
  // 3. Controller response & Interceptor duration
  return {
    status: 200,
    data: opts.payload,
    durationMs: 5,
  };
}

console.log("Valid request:   ", runPipeline({ hasToken: true, payload: { id: 1, name: "Alice" } }));
console.log("No token request:", runPipeline({ hasToken: false, payload: { id: 1, name: "Alice" } }));`,
              hints: [
                "Check !opts.hasToken first (Guard level).",
                "Check opts.payload.id <= 0 second (Pipe level).",
                "Return status 200 with data and durationMs when valid.",
              ],
              tests: [
                {
                  name: "Blocks unauthenticated request",
                  code: `const r = runPipeline({ hasToken: false, payload: { id: 10, name: "Test" } }); if (!r || r.status !== 401) throw new Error("Should return 401 Unauthorized");`,
                },
                {
                  name: "Validates payload with Pipe",
                  code: `const r = runPipeline({ hasToken: true, payload: { id: -5, name: "Test" } }); if (!r || r.status !== 400) throw new Error("Should return 400 Bad Request");`,
                },
                {
                  name: "Succeeds for valid request",
                  code: `const r = runPipeline({ hasToken: true, payload: { id: 42, name: "Test" } }); if (!r || r.status !== 200 || r.data.id !== 42) throw new Error("Should return 200 with payload");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
