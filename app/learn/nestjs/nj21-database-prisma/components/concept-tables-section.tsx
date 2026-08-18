"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & ORM FEATURE MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & ORM Feature Matrix">
      {/* ── 12.1 ORM Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Node.js ORM Ecosystem Comparison"
          description="A complete feature matrix comparing Prisma, TypeORM, and Drizzle ORM."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Prisma ORM", "TypeORM", "Drizzle ORM"]}
          rows={[
            ["Schema Language", "Custom DSL (schema.prisma)", "TypeScript Classes & Decorators", "TypeScript Schema Objects"],
            ["Type Generation", "Automated into node_modules", "Manual type definitions", "Inferred directly from TS objects"],
            ["Query API", "Model methods (findUnique, findMany)", "ActiveRecord / DataMapper QueryBuilder", "SQL-like fluent builder"],
            ["GUI Tool", "Prisma Studio (npx prisma studio)", "None (third-party tools like DBeaver)", "Drizzle Studio"],
            ["NestJS Integration", "Custom PrismaService with lifecycle hooks", "@nestjs/typeorm official module", "Custom Provider injection"],
          ]}
        />

        <QuickCheck
          question="What visual database browser tool comes built into Prisma for inspecting data locally?"
          answer="Prisma Studio (launched with 'npx prisma studio')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
