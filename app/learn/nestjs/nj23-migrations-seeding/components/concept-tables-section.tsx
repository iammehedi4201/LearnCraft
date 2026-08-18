"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — PRISMA CLI COMMANDS MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Prisma CLI Commands Master Reference">
      {/* ── 12.1 Commands Table ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Complete Prisma CLI Cheat Sheet"
          description="Every essential Prisma command for development, testing, and production."
          color="primary"
        />

        <ComparisonTable
          headers={["Command", "Environment", "Action Performed"]}
          rows={[
            ["prisma init", "Setup", "Initializes schema.prisma and .env configuration files"],
            ["prisma generate", "Any", "Rebuilds TypeScript types inside node_modules/@prisma/client"],
            ["prisma migrate dev", "Development", "Diffs schema, creates new SQL migration, applies locally, and generates types"],
            ["prisma migrate deploy", "Production / CI", "Applies pending migration SQL files non-interactively without prompt"],
            ["prisma migrate reset", "Development", "Drops database, reruns all migrations from scratch, and seeds data"],
            ["prisma migrate status", "Any", "Checks if the live database is in sync with migrations directory"],
            ["prisma db push", "Prototyping", "Directly syncs schema.prisma to database without generating migration files"],
            ["prisma db seed", "Development", "Executes the seed script defined in package.json"],
            ["prisma studio", "Development", "Opens the visual browser database editor on port 5555"],
          ]}
        />

        <QuickCheck
          question="Which command checks if your live database has any unapplied migrations without executing them?"
          answer="npx prisma migrate status."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
