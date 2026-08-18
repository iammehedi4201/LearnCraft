"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON DEVOPS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Health Aggregator &amp; Env Auditor">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your health checking and environment auditing logic to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Health Check Aggregator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Terminus-Style Health Aggregator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "deployment-ex-01",
              title: "1. Build Health Check Aggregator",
              instructions: `Implement 'runHealthChecks(indicators: Record<string, () => Promise<boolean>>)':
Returns an object matching:
{
  status: 'ok' (if all pass) | 'error' (if any fail),
  info: { [key]: { status: 'up' | 'down' } }
}`,
              starterCode: `async function runHealthChecks(indicators: Record<string, () => Promise<boolean>>) {
  // Your code here:
}

const mockChecks = {
  db: async () => true,
  redis: async () => true,
  storage: async () => false
};
runHealthChecks(mockChecks).then((res) => console.log("Health:", res));`,
              solutionCode: `async function runHealthChecks(indicators: Record<string, () => Promise<boolean>>) {
  let allOk = true;
  const info: Record<string, { status: 'up' | 'down' }> = {};

  for (const [key, checkFn] of Object.entries(indicators)) {
    try {
      const isUp = await checkFn();
      if (!isUp) allOk = false;
      info[key] = { status: isUp ? 'up' : 'down' };
    } catch {
      allOk = false;
      info[key] = { status: 'down' };
    }
  }

  return {
    status: allOk ? 'ok' : 'error',
    info,
  };
}

const mockChecks = {
  db: async () => true,
  redis: async () => true,
  storage: async () => false
};
runHealthChecks(mockChecks).then((res) => console.log("Health:", res));`,
              hints: [
                "Iterate through entries, execute checkFn in try/catch, and track allOk flag.",
              ],
              tests: [
                {
                  name: "Aggregates health statuses and catches errors accurately",
                  code: `const testRun = async () => { const r = await runHealthChecks({ a: async () => true, b: async () => false }); if (r.status !== "error" || r.info.a.status !== "up" || r.info.b.status !== "down") throw new Error("Health check failed"); }; testRun();`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Production Env Auditor ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Production Environment Auditor</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "deployment-ex-02",
              title: "2. Build Production Environment Auditor",
              instructions: `Implement 'auditProductionEnv(env: Record<string, string | undefined>)':
Checks that:
1. NODE_ENV === 'production'.
2. PORT is a valid positive integer.
3. JWT_SECRET is at least 32 characters long.
4. DATABASE_URL is defined and starts with 'postgresql://'.
Returns array of missing/invalid error strings. (Empty array if valid).`,
              starterCode: `function auditProductionEnv(env: Record<string, string | undefined>): string[] {
  // Your code here:
}

const prodEnv = {
  NODE_ENV: "production",
  PORT: "3000",
  JWT_SECRET: "super-secret-key-that-is-at-least-32-chars-long!",
  DATABASE_URL: "postgresql://user:pass@db:5432/prod"
};
console.log("Audit Errors:", auditProductionEnv(prodEnv));`,
              solutionCode: `function auditProductionEnv(env: Record<string, string | undefined>): string[] {
  const errors: string[] = [];
  if (env.NODE_ENV !== 'production') {
    errors.push("NODE_ENV must be 'production'");
  }
  const port = parseInt(env.PORT || '', 10);
  if (isNaN(port) || port <= 0) {
    errors.push("PORT must be a positive integer");
  }
  if (!env.JWT_SECRET || env.JWT_SECRET.length < 32) {
    errors.push("JWT_SECRET must be at least 32 characters");
  }
  if (!env.DATABASE_URL || !env.DATABASE_URL.startsWith('postgresql://')) {
    errors.push("DATABASE_URL must start with postgresql://");
  }
  return errors;
}

const prodEnv = {
  NODE_ENV: "production",
  PORT: "3000",
  JWT_SECRET: "super-secret-key-that-is-at-least-32-chars-long!",
  DATABASE_URL: "postgresql://user:pass@db:5432/prod"
};
console.log("Audit Errors:", auditProductionEnv(prodEnv));`,
              hints: [
                "Push error messages to an array for any failing checks.",
              ],
              tests: [
                {
                  name: "Audits production requirements strictly",
                  code: `const errs = auditProductionEnv({ NODE_ENV: "dev", PORT: "abc" }); if (errs.length < 3) throw new Error("Auditor missed invalid settings");`,
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
