"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON TRANSACTIONS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Transactions &amp; Serialization">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your transactional and serialization logic into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Atomic Transfer Simulator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Atomic Balance Transfer Simulator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "transactions-ex-01",
              title: "1. Build Atomic Transfer Logic",
              instructions: `Implement 'atomicTransfer(balances: Record<string, number>, from: string, to: string, amount: number)':
1. If balances[from] < amount or from not in balances or to not in balances, throw new Error("Insufficient funds").
2. Create a shallow copy of balances, deduct amount from 'from', add amount to 'to'.
3. Return the updated balances object.`,
              starterCode: `function atomicTransfer(balances: Record<string, number>, from: string, to: string, amount: number) {
  // Your code here:
}

const bank = { alice: 500, bob: 200 };
console.log("Transferred:", atomicTransfer(bank, "alice", "bob", 100));`,
              solutionCode: `function atomicTransfer(balances: Record<string, number>, from: string, to: string, amount: number) {
  if (!(from in balances) || !(to in balances) || balances[from] < amount) {
    throw new Error("Insufficient funds");
  }
  const next = { ...balances };
  next[from] -= amount;
  next[to] += amount;
  return next;
}

const bank = { alice: 500, bob: 200 };
console.log("Transferred:", atomicTransfer(bank, "alice", "bob", 100));`,
              hints: [
                "Verify from and to exist and balances[from] >= amount.",
                "Clone the object with { ...balances } before modifying balances.",
              ],
              tests: [
                {
                  name: "Transfers funds between accounts accurately",
                  code: `const r = atomicTransfer({ a: 100, b: 50 }, "a", "b", 40); if (r.a !== 60 || r.b !== 90) throw new Error("Transfer failed");`,
                },
                {
                  name: "Throws error on insufficient balance",
                  code: `let threw = false; try { atomicTransfer({ a: 10, b: 50 }, "a", "b", 40); } catch { threw = true; } if (!threw) throw new Error("Should throw error");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Entity Serializer ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Entity Field Excluder</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "transactions-ex-02",
              title: "2. Build Entity Field Excluder",
              instructions: `Implement 'excludeFields(entity: Record<string, any>, excludedKeys: string[])':
Returns a new object containing all properties of entity EXCEPT those in excludedKeys.`,
              starterCode: `function excludeFields(entity: Record<string, any>, excludedKeys: string[]): Record<string, any> {
  // Your code here:
}

const rawUser = { id: 1, email: "a@b.com", passwordHash: "secret123", salt: "salt456" };
console.log("Public User:", excludeFields(rawUser, ["passwordHash", "salt"]));`,
              solutionCode: `function excludeFields(entity: Record<string, any>, excludedKeys: string[]): Record<string, any> {
  const result: Record<string, any> = {};
  const excludeSet = new Set(excludedKeys);
  for (const [key, val] of Object.entries(entity)) {
    if (!excludeSet.has(key)) {
      result[key] = val;
    }
  }
  return result;
}

const rawUser = { id: 1, email: "a@b.com", passwordHash: "secret123", salt: "salt456" };
console.log("Public User:", excludeFields(rawUser, ["passwordHash", "salt"]));`,
              hints: [
                "Iterate Object.entries(entity) and skip keys in excludedKeys.",
              ],
              tests: [
                {
                  name: "Excludes private keys from serialized output",
                  code: `const r = excludeFields({ a: 1, b: 2, c: 3 }, ["b"]); if (r.b !== undefined || r.a !== 1 || r.c !== 3) throw new Error("Exclusion failed");`,
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
