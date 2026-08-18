"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON CONFIG)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Config &amp; Env Validation">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your configuration and environment validation skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Env Validator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Environment Schema Validator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "config-ex-01",
              title: "1. Build Env Parser & Validator",
              instructions: `Implement 'validateEnv(raw: Record<string, any>, rules: Record<string, { type: 'string' | 'number', required?: boolean, default?: any }>)':
1. For each key in rules:
   - If missing in raw: use default value (if present), or throw new Error("Missing required " + key) if required.
   - If type is 'number', parse with parseInt(). If NaN, throw new Error("Invalid number " + key).
2. Return the validated object.`,
              starterCode: `function validateEnv(raw: Record<string, any>, rules: Record<string, { type: 'string' | 'number', required?: boolean, default?: any }>) {
  // Your code here:
}

const mockEnv = { PORT: "3000", DB_HOST: "localhost" };
const rules = {
  PORT: { type: 'number' as const, default: 8080 },
  DB_HOST: { type: 'string' as const, required: true },
  JWT_SECRET: { type: 'string' as const, required: true }
};
try {
  console.log("Result:", validateEnv(mockEnv, rules));
} catch (e: any) {
  console.log("Caught:", e.message);
}`,
              solutionCode: `function validateEnv(raw: Record<string, any>, rules: Record<string, { type: 'string' | 'number', required?: boolean, default?: any }>) {
  const result: Record<string, any> = {};
  for (const [key, rule] of Object.entries(rules)) {
    let val = raw[key];
    if (val === undefined || val === '') {
      if (rule.default !== undefined) {
        val = rule.default;
      } else if (rule.required) {
        throw new Error("Missing required " + key);
      }
    }
    if (val !== undefined && rule.type === 'number') {
      const num = parseInt(val, 10);
      if (isNaN(num)) throw new Error("Invalid number " + key);
      val = num;
    }
    if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}

const mockEnv = { PORT: "3000", DB_HOST: "localhost" };
const rules = {
  PORT: { type: 'number' as const, default: 8080 },
  DB_HOST: { type: 'string' as const, required: true },
  JWT_SECRET: { type: 'string' as const, required: true }
};
try {
  console.log("Result:", validateEnv(mockEnv, rules));
} catch (e: any) {
  console.log("Caught:", e.message);
}`,
              hints: [
                "Iterate rules and check if raw[key] is missing.",
                "Throw Error if required and missing.",
              ],
              tests: [
                {
                  name: "Parses numbers and applies defaults",
                  code: `const r = validateEnv({ PORT: "4000" }, { PORT: { type: "number" }, HOST: { type: "string", default: "local" } }); if (r.PORT !== 4000 || r.HOST !== "local") throw new Error("Validation failed");`,
                },
                {
                  name: "Throws error on missing required field",
                  code: `let threw = false; try { validateEnv({}, { SECRET: { type: "string", required: true } }); } catch { threw = true; } if (!threw) throw new Error("Should throw error");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Cascading Env Merger ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Cascading Multi-Env Merger</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "config-ex-02",
              title: "2. Build Cascading Multi-Env Merger",
              instructions: `Implement 'mergeEnvHierarchy(localFile: Record<string, any>, envFile: Record<string, any>, baseFile: Record<string, any>)':
Merges environment configs where:
localFile overrides envFile, and envFile overrides baseFile.`,
              starterCode: `function mergeEnvHierarchy(localFile: Record<string, any>, envFile: Record<string, any>, baseFile: Record<string, any>) {
  // Your code here:
}

const base = { PORT: 3000, DB: "prod-db", LOG: "info" };
const dev = { DB: "dev-db" };
const local = { PORT: 5000 };
console.log("Merged:", mergeEnvHierarchy(local, dev, base));`,
              solutionCode: `function mergeEnvHierarchy(localFile: Record<string, any>, envFile: Record<string, any>, baseFile: Record<string, any>) {
  return {
    ...baseFile,
    ...envFile,
    ...localFile,
  };
}

const base = { PORT: 3000, DB: "prod-db", LOG: "info" };
const dev = { DB: "dev-db" };
const local = { PORT: 5000 };
console.log("Merged:", mergeEnvHierarchy(local, dev, base));`,
              hints: [
                "Object spread order matters: { ...baseFile, ...envFile, ...localFile }.",
              ],
              tests: [
                {
                  name: "Merges cascading priority accurately",
                  code: `const r = mergeEnvHierarchy({ a: 1 }, { a: 2, b: 2 }, { a: 3, b: 3, c: 3 }); if (r.a !== 1 || r.b !== 2 || r.c !== 3) throw new Error("Hierarchy merge failed");`,
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
