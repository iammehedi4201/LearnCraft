"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON LOGGING)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Structured Logs &amp; Redaction">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your structured logging skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Pino Log Builder ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Structured Log Record Builder</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "logging-ex-01",
              title: "1. Build Structured JSON Log Record",
              instructions: `Implement 'buildLogEntry(level: "info" | "warn" | "error", context: string, telemetry: Record<string, any>, message: string)':
Returns an object matching:
{
  level: 30 (if info) | 40 (if warn) | 50 (if error),
  time: Date.now(),
  context,
  msg: message,
  ...telemetry
}`,
              starterCode: `function buildLogEntry(level: "info" | "warn" | "error", context: string, telemetry: Record<string, any>, message: string) {
  // Your code here:
}

console.log(buildLogEntry("info", "OrdersService", { orderId: "ord_99", amount: 45 }, "Order processed"));`,
              solutionCode: `function buildLogEntry(level: "info" | "warn" | "error", context: string, telemetry: Record<string, any>, message: string) {
  const levelMap = { info: 30, warn: 40, error: 50 };
  return {
    level: levelMap[level],
    time: Date.now(),
    context,
    msg: message,
    ...telemetry,
  };
}

console.log(buildLogEntry("info", "OrdersService", { orderId: "ord_99", amount: 45 }, "Order processed"));`,
              hints: [
                "Map 'info' to 30, 'warn' to 40, 'error' to 50.",
                "Spread ...telemetry into the returned object.",
              ],
              tests: [
                {
                  name: "Constructs valid JSON log structure",
                  code: `const r = buildLogEntry("info", "Auth", { userId: 1 }, "Login"); if (r.level !== 30 || r.context !== "Auth" || r.userId !== 1 || r.msg !== "Login") throw new Error("Log build failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Log Redactor ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Recursive Log Redaction Engine</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "logging-ex-02",
              title: "2. Build Log Redaction Engine",
              instructions: `Implement 'redactLog(data: Record<string, any>, secretKeys: string[])':
Replaces any key matching secretKeys (case-insensitive) with '[REDACTED]'. Returns a new object.`,
              starterCode: `function redactLog(data: Record<string, any>, secretKeys: string[]): Record<string, any> {
  // Your code here:
}

const req = { user: "alice", password: "123", token: "xyz-bearer", role: "admin" };
console.log("Redacted:", redactLog(req, ["password", "token"]));`,
              solutionCode: `function redactLog(data: Record<string, any>, secretKeys: string[]): Record<string, any> {
  const secrets = new Set(secretKeys.map((s) => s.toLowerCase()));
  const result: Record<string, any> = {};

  for (const [key, val] of Object.entries(data)) {
    if (secrets.has(key.toLowerCase())) {
      result[key] = '[REDACTED]';
    } else {
      result[key] = val;
    }
  }
  return result;
}

const req = { user: "alice", password: "123", token: "xyz-bearer", role: "admin" };
console.log("Redacted:", redactLog(req, ["password", "token"]));`,
              hints: [
                "Convert keys to lowercase and replace matching keys with '[REDACTED]'.",
              ],
              tests: [
                {
                  name: "Redacts secret keys accurately",
                  code: `const r = redactLog({ email: "a@b.com", password: "secret", token: "tok" }, ["password", "token"]); if (r.password !== "[REDACTED]" || r.token !== "[REDACTED]" || r.email !== "a@b.com") throw new Error("Redaction failed");`,
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
