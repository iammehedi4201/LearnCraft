"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON PRISMA)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Prisma Setup & Queries">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your Prisma schema and service skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Schema Generator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Prisma Model DDL Generator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "prisma-ex-01",
              title: "1. Build Prisma Model String",
              instructions: `Implement 'buildPrismaModel(name: string, fields: { name: string, type: string, isId?: boolean, isUnique?: boolean }[])':
Generates a formatted string:
model User {
  id Int @id
  email String @unique
}`,
              starterCode: `function buildPrismaModel(name: string, fields: { name: string, type: string, isId?: boolean, isUnique?: boolean }[]): string {
  // Your code here:
}

console.log(buildPrismaModel("User", [
  { name: "id", type: "Int", isId: true },
  { name: "email", type: "String", isUnique: true }
]));`,
              solutionCode: `function buildPrismaModel(name: string, fields: { name: string, type: string, isId?: boolean, isUnique?: boolean }[]): string {
  const lines = fields.map((f) => {
    let suffix = "";
    if (f.isId) suffix += " @id";
    if (f.isUnique) suffix += " @unique";
    return \`  \${f.name} \${f.type}\${suffix}\`;
  });
  return \`model \${name} {\\n\${lines.join("\\n")}\\n}\`;
}

console.log(buildPrismaModel("User", [
  { name: "id", type: "Int", isId: true },
  { name: "email", type: "String", isUnique: true }
]));`,
              hints: [
                "Map each field to '  name Type @attributes'.",
                "Join lines with \\n inside model Name { ... }.",
              ],
              tests: [
                {
                  name: "Constructs correct Prisma model syntax",
                  code: `const r = buildPrismaModel("Post", [{ name: "id", type: "Int", isId: true }]); if (!r.includes("model Post") || !r.includes("id Int @id")) throw new Error("Model construction failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Mock FindUnique ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Mock Prisma findUnique Evaluator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "prisma-ex-02",
              title: "2. Build Mock findUnique",
              instructions: `Implement 'mockFindUnique(collection: any[], where: Record<string, any>)':
Returns the first object matching all key-values in 'where', or null if not found.`,
              starterCode: `function mockFindUnique(collection: any[], where: Record<string, any>) {
  // Your code here:
}

const db = [
  { id: 1, email: "alice@test.com" },
  { id: 2, email: "bob@test.com" }
];
console.log("Found:    ", mockFindUnique(db, { email: "alice@test.com" }));
console.log("Not found:", mockFindUnique(db, { email: "charlie@test.com" }));`,
              solutionCode: `function mockFindUnique(collection: any[], where: Record<string, any>) {
  const match = collection.find((item) => {
    return Object.entries(where).every(([key, val]) => item[key] === val);
  });
  return match || null;
}

const db = [
  { id: 1, email: "alice@test.com" },
  { id: 2, email: "bob@test.com" }
];
console.log("Found:    ", mockFindUnique(db, { email: "alice@test.com" }));
console.log("Not found:", mockFindUnique(db, { email: "charlie@test.com" }));`,
              hints: [
                "Use collection.find() and compare Object.entries(where).",
                "Return null if no match is found.",
              ],
              tests: [
                {
                  name: "Finds unique object by property",
                  code: `const r = mockFindUnique([{ id: 10, email: "a" }], { id: 10 }); if (!r || r.email !== "a") throw new Error("findUnique failed");`,
                },
                {
                  name: "Returns null when no record matches",
                  code: `const r = mockFindUnique([{ id: 10 }], { id: 99 }); if (r !== null) throw new Error("Should return null");`,
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
