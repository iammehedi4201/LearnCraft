"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — WHY PRISMA OVER TYPEORM & RAW SQL
// ═══════════════════════════════════════════════════════════

export function WhyPrismaSection() {
  return (
    <SectionContainer number={2} title="Why Prisma over TypeORM & Raw SQL">
      {/* ── 2.1 ORM Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Prisma vs TypeORM in Modern NestJS"
          description="Understand why modern startups and enterprises prefer Prisma for new NestJS codebases."
          color="sky"
        />

        <ComparisonTable
          headers={["Feature", "Prisma ORM", "TypeORM", "Raw SQL (pg / mysql2)"]}
          rows={[
            ["Schema Definition", "Clean single file (schema.prisma)", "Decorators scattered across entity classes", "Raw CREATE TABLE .sql migration scripts"],
            ["Type Safety", "100% automated type generation", "Manual typing; prone to out-of-sync types", "0% (all query results are 'any')"],
            ["Relationship Queries", "Intuitive include / select syntax", "Complex QueryBuilder or find joins", "Manual JOIN queries with aliasing"],
            ["Migration Safety", "Deterministic schema diffing & rollback", "Synchronize mode dangerous in prod", "Manual rollback script writing"],
            ["Developer Experience", "⭐⭐⭐⭐⭐ Auto-complete on every field", "⭐⭐⭐ Verbose QueryBuilder", "⭐⭐ Error-prone string templates"],
          ]}
        />

        <QuickCheck
          question="What is the single source of truth for your database schema when using Prisma in NestJS?"
          answer="The prisma/schema.prisma file."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
