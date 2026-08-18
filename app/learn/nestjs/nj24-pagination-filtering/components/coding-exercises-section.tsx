"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON PAGINATION & FILTER)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Pagination & Filters">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your pagination algorithms into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: In-Memory Paginator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Offset Pagination Envelope Calculator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "pagination-ex-01",
              title: "1. Build Paginated Response Envelope",
              instructions: `Implement 'paginateArray(items: any[], page: number, limit: number)':
1. Calculate skip = (page - 1) * limit.
2. Slice items from skip to skip + limit.
3. Calculate totalPages = Math.ceil(items.length / limit).
4. Return { data, meta: { total: items.length, page, limit, totalPages, hasNextPage: page < totalPages } }.`,
              starterCode: `function paginateArray(items: any[], page: number, limit: number) {
  // Your code here:
}

const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: \`Item \${i + 1}\` }));
console.log(paginateArray(mockData, 2, 10));`,
              solutionCode: `function paginateArray(items: any[], page: number, limit: number) {
  const skip = (page - 1) * limit;
  const data = items.slice(skip, skip + limit);
  const total = items.length;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
    },
  };
}

const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: \`Item \${i + 1}\` }));
console.log(paginateArray(mockData, 2, 10));`,
              hints: [
                "Compute skip = (page - 1) * limit.",
                "Use items.slice(skip, skip + limit).",
              ],
              tests: [
                {
                  name: "Slices correct page items",
                  code: `const r = paginateArray([1, 2, 3, 4, 5], 2, 2); if (r.data.length !== 2 || r.data[0] !== 3 || r.meta.total !== 5 || !r.meta.hasNextPage) throw new Error("Pagination failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Dynamic Filter ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Dynamic In-Memory Filter Evaluator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "pagination-ex-02",
              title: "2. Build Dynamic Filter Evaluator",
              instructions: `Implement 'filterProducts(products: any[], filters: { search?: string, minPrice?: number, category?: string })':
Filters products by matching:
- search: product.title includes search (case-insensitive)
- minPrice: product.price >= minPrice
- category: product.category === category`,
              starterCode: `function filterProducts(products: any[], filters: { search?: string, minPrice?: number, category?: string }) {
  // Your code here:
}

const catalog = [
  { id: 1, title: "NestJS Book", price: 40, category: "books" },
  { id: 2, title: "TypeScript Mug", price: 15, category: "swag" },
  { id: 3, title: "Prisma Course", price: 90, category: "books" },
];
console.log(filterProducts(catalog, { category: "books", minPrice: 50 }));`,
              solutionCode: `function filterProducts(products: any[], filters: { search?: string, minPrice?: number, category?: string }) {
  return products.filter((p) => {
    if (filters.search && !p.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.minPrice !== undefined && p.price < filters.minPrice) {
      return false;
    }
    if (filters.category && p.category !== filters.category) {
      return false;
    }
    return true;
  });
}

const catalog = [
  { id: 1, title: "NestJS Book", price: 40, category: "books" },
  { id: 2, title: "TypeScript Mug", price: 15, category: "swag" },
  { id: 3, title: "Prisma Course", price: 90, category: "books" },
];
console.log(filterProducts(catalog, { category: "books", minPrice: 50 }));`,
              hints: [
                "Return false from filter if any active filter criteria is not satisfied.",
              ],
              tests: [
                {
                  name: "Applies multi-condition filtering accurately",
                  code: `const r = filterProducts([{ title: "a", price: 10, category: "x" }, { title: "b", price: 20, category: "x" }], { category: "x", minPrice: 15 }); if (r.length !== 1 || r[0].title !== "b") throw new Error("Filter failed");`,
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
