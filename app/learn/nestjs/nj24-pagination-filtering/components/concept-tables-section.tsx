"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & PRISMA FILTER OPERATORS
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Filter Operators Matrix">
      {/* ── 12.1 Filter Operators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Prisma Query Filter Operators Reference"
          description="Complete reference of condition filters available in Prisma's where object."
          color="primary"
        />

        <ComparisonTable
          headers={["Prisma Operator", "SQL Equivalent", "Example Use Case"]}
          rows={[
            ["contains + mode: 'insensitive'", "ILIKE '%query%'", "Full text search across title and bio"],
            ["in: [...]", "IN ('A', 'B', 'C')", "Filter products matching selected category IDs"],
            ["gte / lte", ">= / <=", "Date range filtering (e.g. created between Jan and Feb)"],
            ["startsWith", "LIKE 'query%'", "Autocomplete prefix queries (e.g. username lookup)"],
            ["not / notIn", "!= / NOT IN (...)", "Exclude deleted or archived statuses"],
            ["AND / OR", "AND / OR clauses", "Combine multiple search criteria dynamically"],
          ]}
        />

        <QuickCheck
          question="Which Prisma operator should you use to search for articles created within a specific date range?"
          answer="The 'gte' (greater than or equal) and 'lte' (less than or equal) comparison operators on the createdAt field."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
