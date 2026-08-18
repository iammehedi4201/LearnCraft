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
          Put your NestJS Dependency Injection knowledge to work! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Custom Token Injection ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Token-Based Service Configuration</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "di-ex-01",
              title: "1. Custom Token Service",
              instructions: `Implement 'ApiService':
1. Constructor accepts 'endpoint: string' (token: 'ENDPOINT_TOKEN').
2. Method 'buildUrl(path: string)' returns 'endpoint + "/" + path'.`,
              starterCode: `class ApiService {
  constructor(private readonly endpoint: string) {}

  buildUrl(path: string): string {
    // Return endpoint + "/" + path
  }
}

const api = new ApiService("https://api.learncraft.dev");
console.log("Full URL:", api.buildUrl("users"));`,
              solutionCode: `class ApiService {
  constructor(private readonly endpoint: string) {}

  buildUrl(path: string): string {
    return this.endpoint + "/" + path;
  }
}

const api = new ApiService("https://api.learncraft.dev");
console.log("Full URL:", api.buildUrl("users"));`,
              hints: [
                "buildUrl returns this.endpoint + '/' + path.",
              ],
              tests: [
                {
                  name: "buildUrl formats correct endpoint",
                  code: `const a = new ApiService("https://example.com"); if (a.buildUrl("test") !== "https://example.com/test") throw new Error("buildUrl mismatch");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Factory Provider ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Dynamic Database Factory</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "di-ex-02",
              title: "2. Database Factory Provider",
              instructions: `Implement 'createDatabaseConnection(isProduction: boolean)':
1. Returns object with 'type' and 'connect()' method.
2. If isProduction is true: type is "Postgres" and connect() returns "Connected to PostgreSQL".
3. If isProduction is false: type is "SQLite" and connect() returns "Connected to SQLite In-Memory".`,
              starterCode: `function createDatabaseConnection(isProduction: boolean) {
  // Your code here:
}

const devDb = createDatabaseConnection(false);
const prodDb = createDatabaseConnection(true);

console.log("Dev DB: ", devDb.connect());
console.log("Prod DB:", prodDb.connect());`,
              solutionCode: `function createDatabaseConnection(isProduction: boolean) {
  if (isProduction) {
    return {
      type: "Postgres",
      connect: () => "Connected to PostgreSQL"
    };
  }
  return {
    type: "SQLite",
    connect: () => "Connected to SQLite In-Memory"
  };
}

const devDb = createDatabaseConnection(false);
const prodDb = createDatabaseConnection(true);

console.log("Dev DB: ", devDb.connect());
console.log("Prod DB:", prodDb.connect());`,
              hints: [
                "Return { type: 'Postgres', connect: () => 'Connected to PostgreSQL' } if isProduction.",
                "Return { type: 'SQLite', connect: () => 'Connected to SQLite In-Memory' } if not.",
              ],
              tests: [
                {
                  name: "Creates Postgres for production",
                  code: `const p = createDatabaseConnection(true); if (!p || p.type !== "Postgres" || p.connect() !== "Connected to PostgreSQL") throw new Error("Production DB mismatch");`,
                },
                {
                  name: "Creates SQLite for development",
                  code: `const d = createDatabaseConnection(false); if (!d || d.type !== "SQLite" || d.connect() !== "Connected to SQLite In-Memory") throw new Error("Dev DB mismatch");`,
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
