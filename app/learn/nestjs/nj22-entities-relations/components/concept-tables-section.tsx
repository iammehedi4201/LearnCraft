"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & RELATIONS MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Relations Master Matrix">
      {/* ── 12.1 Relations Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Prisma Relations Comparison"
          description="A complete cheat sheet of all relationship structures in Prisma."
          color="primary"
        />

        <ComparisonTable
          headers={["Relation Type", "Model A Syntax", "Model B Syntax", "Foreign Key Location"]}
          rows={[
            ["1-to-1", "profile Profile?", "userId Int @unique + user User @relation(...)", "Child model (Profile) with @unique"],
            ["1-to-Many", "posts Post[]", "authorId Int + author User @relation(...)", "Child model (Post)"],
            ["Implicit Many-to-Many", "tags Tag[]", "posts Post[]", "Managed _PostToTag SQL join table"],
            ["Explicit Many-to-Many", "teams UsersOnTeams[]", "members UsersOnTeams[]", "Dedicated UsersOnTeams join model with @@id"],
          ]}
        />

        <QuickCheck
          question="Which side of a 1-to-Many relationship holds the scalar foreign key column?"
          answer="The 'Many' (child) side (e.g. Post holds authorId)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
