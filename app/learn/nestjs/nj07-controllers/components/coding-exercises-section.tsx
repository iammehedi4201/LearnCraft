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
          Test your NestJS controller skills live! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Products Controller ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Products Route Handler</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "ctrl-ex-01",
              title: "1. Build a Products Controller",
              instructions: `Implement the 'ProductsController' class:
1. 'findAll()': Returns array '["Laptop", "Phone", "Tablet"]'.
2. 'findOne(id: string)': Returns object '{ id, item: "Item " + id }'.`,
              starterCode: `class ProductsController {
  // 1. findAll()

  // 2. findOne(id: string)
}

const controller = new ProductsController();
console.log("All items:", controller.findAll());
console.log("Item #10:", controller.findOne("10"));`,
              solutionCode: `class ProductsController {
  findAll() {
    return ["Laptop", "Phone", "Tablet"];
  }

  findOne(id: string) {
    return { id, item: "Item " + id };
  }
}

const controller = new ProductsController();
console.log("All items:", controller.findAll());
console.log("Item #10:", controller.findOne("10"));`,
              hints: [
                "findAll() returns ['Laptop', 'Phone', 'Tablet'].",
                "findOne(id) returns { id, item: 'Item ' + id }.",
              ],
              tests: [
                {
                  name: "findAll returns 3 items",
                  code: `const c = new ProductsController(); const res = c.findAll(); if (!Array.isArray(res) || res.length !== 3) throw new Error("findAll should return 3 items");`,
                },
                {
                  name: "findOne returns item with ID",
                  code: `const c = new ProductsController(); const res = c.findOne("42"); if (!res || res.id !== "42" || res.item !== "Item 42") throw new Error("findOne output mismatch");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Query Filter Handler ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Query Filter Handler</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "ctrl-ex-02",
              title: "2. Search with Query Parameters",
              instructions: `Implement 'searchUsers(role: string, limit: number)':
1. If role is provided, return only users matching that role.
2. Limit the returned array to 'limit' items (default limit: 10).`,
              starterCode: `const mockUsers = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
  { id: 4, name: "Diana", role: "admin" }
];

function searchUsers(role?: string, limit: number = 10) {
  // Your code here:
}

console.log("All Users:", searchUsers());
console.log("Admins:   ", searchUsers("admin", 1));`,
              solutionCode: `const mockUsers = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
  { id: 4, name: "Diana", role: "admin" }
];

function searchUsers(role?: string, limit: number = 10) {
  let list = mockUsers;
  if (role) {
    list = list.filter(u => u.role === role);
  }
  return list.slice(0, limit);
}

console.log("All Users:", searchUsers());
console.log("Admins:   ", searchUsers("admin", 1));`,
              hints: [
                "Filter by role if role is truthy.",
                "Use .slice(0, limit) to enforce the limit.",
              ],
              tests: [
                {
                  name: "Filters by role",
                  code: `const res = searchUsers("admin"); if (res.length !== 2 || res.some((u: any) => u.role !== "admin")) throw new Error("Should only return admin users");`,
                },
                {
                  name: "Enforces limit",
                  code: `const res = searchUsers("admin", 1); if (res.length !== 1) throw new Error("Should return exactly 1 item when limit is 1");`,
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
