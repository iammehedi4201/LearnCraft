"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (LIFECYCLE SEEDING LOGIC)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Lifecycle & Seeding Logic">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your state initialization and seeding algorithms to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Pending Seed Detector ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Missing Seed Detector</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "lifecycle-ex-01",
              title: "1. Detect Missing Seed Records",
              instructions: `Implement 'getMissingSeedKeys(existingKeys: string[], requiredKeys: string[])':
Returns an array of key strings that are in 'requiredKeys' but do NOT exist in 'existingKeys'.`,
              starterCode: `function getMissingSeedKeys(existingKeys: string[], requiredKeys: string[]): string[] {
  // Your code here:
}

console.log("Missing:", getMissingSeedKeys(["ADMIN", "USER"], ["ADMIN", "USER", "MODERATOR", "AUDITOR"]));`,
              solutionCode: `function getMissingSeedKeys(existingKeys: string[], requiredKeys: string[]): string[] {
  const existingSet = new Set(existingKeys);
  return requiredKeys.filter((key) => !existingSet.has(key));
}

console.log("Missing:", getMissingSeedKeys(["ADMIN", "USER"], ["ADMIN", "USER", "MODERATOR", "AUDITOR"]));`,
              hints: [
                "Filter 'requiredKeys' using a Set of 'existingKeys'.",
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Idempotent Upsert Seeder ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Idempotent Seeder Simulator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "lifecycle-ex-02",
              title: "2. Build Idempotent Seed Upsert",
              instructions: `Implement 'seedUpsert(database: any[], uniqueKey: string, payload: any)':
1. Finds if an item with database[uniqueKey] === payload[uniqueKey] exists.
2. If it exists, merges payload properties into the existing object.
3. If it does not exist, pushes payload to database array.
4. Returns the updated array.`,
              starterCode: `function seedUpsert(database: any[], uniqueKey: string, payload: any): any[] {
  // Your code here:
}

const db = [{ id: 1, email: "admin@learncraft.dev", role: "USER" }];
console.log("After update:", seedUpsert(db, "email", { email: "admin@learncraft.dev", role: "ADMIN" }));
console.log("After insert:", seedUpsert(db, "email", { id: 2, email: "bob@learncraft.dev", role: "USER" }));`,
              solutionCode: `function seedUpsert(database: any[], uniqueKey: string, payload: any): any[] {
  const index = database.findIndex((item) => item[uniqueKey] === payload[uniqueKey]);
  if (index >= 0) {
    database[index] = { ...database[index], ...payload };
  } else {
    database.push(payload);
  }
  return database;
}

const db = [{ id: 1, email: "admin@learncraft.dev", role: "USER" }];
console.log("After update:", seedUpsert(db, "email", { email: "admin@learncraft.dev", role: "ADMIN" }));
console.log("After insert:", seedUpsert(db, "email", { id: 2, email: "bob@learncraft.dev", role: "USER" }));`,
              hints: [
                "Use database.findIndex() matching on uniqueKey.",
                "If found, update; otherwise push.",
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
