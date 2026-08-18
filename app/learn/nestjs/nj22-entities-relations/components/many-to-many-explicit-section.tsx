"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — EXPLICIT MANY-TO-MANY WITH JOIN MODELS
// ═══════════════════════════════════════════════════════════

export function ManyToManyExplicitSection() {
  return (
    <SectionContainer number={5} title="Explicit Many-to-Many with Metadata Columns">
      {/* ── 5.1 Explicit M-to-N ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Storing Extra Data on Relationships"
          description="When relationships have attributes like 'assignedAt', 'roleOnTeam', or 'enrollmentDate'."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📊</span> The Explicit Join Model Pattern
          </h4>
          <EnhancedCodeBlock
            code={`model User {
  id    Int            @id @default(autoincrement())
  teams UsersOnTeams[]
}

model Team {
  id      Int            @id @default(autoincrement())
  name    String
  members UsersOnTeams[]
}

// Explicit Join Table with extra metadata fields:
model UsersOnTeams {
  userId     Int
  teamId     Int
  user       User     @relation(fields: [userId], references: [id])
  team       Team     @relation(fields: [teamId], references: [id])
  
  // Custom relationship metadata:
  role       String   @default("member") // e.g. "admin", "viewer"
  assignedAt DateTime @default(now())

  // Composite Primary Key:
  @@id([userId, teamId])
}`}
            language="prisma"
          />
        </WhyBox>

        <QuickCheck
          question="When should you choose an explicit many-to-many relationship instead of an implicit one in Prisma?"
          answer="When you need to store extra columns on the relationship itself (such as 'assignedAt', 'memberRole', or 'sortOrder')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
