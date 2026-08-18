"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON MIGRATIONS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Migration & Seed Logic">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your migration and seeding logic to the test! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Pending Migration Checker ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Pending Migration Detector</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "migrations-ex-01",
              title: "1. Detect Pending Migrations",
              instructions: `Implement 'getPendingMigrations(applied: string[], available: string[])':
Returns an array of migration names that exist in 'available' but have NOT yet been applied in 'applied'.`,
              starterCode: `function getPendingMigrations(applied: string[], available: string[]): string[] {
  // Your code here:
}

console.log("Pending:", getPendingMigrations(["01_init", "02_users"], ["01_init", "02_users", "03_posts", "04_tags"]));`,
              solutionCode: `function getPendingMigrations(applied: string[], available: string[]): string[] {
  const appliedSet = new Set(applied);
  return available.filter((m) => !appliedSet.has(m));
}

console.log("Pending:", getPendingMigrations(["01_init", "02_users"], ["01_init", "02_users", "03_posts", "04_tags"]));`,
              hints: [
                "Filter 'available' to find items where !applied.includes(m).",
              ],
              tests: [
                {
                  name: "Detects unapplied migrations correctly",
                  code: `const r = getPendingMigrations(["m1"], ["m1", "m2", "m3"]); if (r.length !== 2 || r[0] !== "m2" || r[1] !== "m3") throw new Error("Detection failed");`,
                },
                {
                  name: "Returns empty array when database is fully up to date",
                  code: `const r = getPendingMigrations(["m1", "m2"], ["m1", "m2"]); if (r.length !== 0) throw new Error("Should have 0 pending");`,
                },
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
              id: "migrations-ex-02",
              title: "2. Build Idempotent Seed Upsert",
              instructions: `Implement 'seedUpsert(database: any[], uniqueKey: string, payload: any)':
1. Finds if an item with database[uniqueKey] === payload[uniqueKey] exists.
2. If it exists, merges payload properties into the existing object.
3. If it does not exist, pushes payload to database array.
4. Returns the updated array.`,
              starterCode: `function seedUpsert(database: any[], uniqueKey: string, payload: any): any[] {
  // Your code here:
}

const db = [{ id: 1, email: "admin@test.com", role: "USER" }];
console.log("After update:", seedUpsert(db, "email", { email: "admin@test.com", role: "ADMIN" }));
console.log("After insert:", seedUpsert(db, "email", { id: 2, email: "bob@test.com", role: "USER" }));`,
              solutionCode: `function seedUpsert(database: any[], uniqueKey: string, payload: any): any[] {
  const index = database.findIndex((item) => item[uniqueKey] === payload[uniqueKey]);
  if (index >= 0) {
    database[index] = { ...database[index], ...payload };
  } else {
    database.push(payload);
  }
  return database;
}

const db = [{ id: 1, email: "admin@test.com", role: "USER" }];
console.log("After update:", seedUpsert(db, "email", { email: "admin@test.com", role: "ADMIN" }));
console.log("After insert:", seedUpsert(db, "email", { id: 2, email: "bob@test.com", role: "USER" }));`,
              hints: [
                "Use database.findIndex() matching on uniqueKey.",
                "If found, update; otherwise push.",
              ],
              tests: [
                {
                  name: "Updates existing record without duplicating",
                  code: `const d = [{ email: "a", name: "Old" }]; seedUpsert(d, "email", { email: "a", name: "New" }); if (d.length !== 1 || d[0].name !== "New") throw new Error("Update failed");`,
                },
                {
                  name: "Inserts new record if missing",
                  code: `const d = [{ email: "a" }]; seedUpsert(d, "email", { email: "b" }); if (d.length !== 2) throw new Error("Insert failed");`,
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
