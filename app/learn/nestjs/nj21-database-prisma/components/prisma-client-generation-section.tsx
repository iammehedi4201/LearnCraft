"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — PRISMA GENERATE & TYPESCRIPT TYPES
// ═══════════════════════════════════════════════════════════

export function PrismaClientGenerationSection() {
  return (
    <SectionContainer number={7} title="Type Generation with prisma generate">
      {/* ── 7.1 Type Generation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated TypeScript Type Generation"
          description="How Prisma inspects your schema and creates TypeScript interfaces automatically."
          color="amber"
        />

        <EnhancedCodeBlock
          code={`// Importing auto-generated types from @prisma/client:
import { User, Prisma } from '@prisma/client';

// Type for creating a user (omits autoincrement ID and defaults):
type CreateUserInput = Prisma.UserCreateInput;

// Type for user database record:
function formatUser(user: User): string {
  return \`User: \${user.name || 'Anonymous'} (\${user.email})\`;
}`}
          language="typescript"
        />

        <PredictOutputBox
          code={`model Product {
  id          String   @id @default(uuid())
  title       String
  priceCents  Int
  inStock     Boolean  @default(true)
  description String?
}`}
          answer={`Predicted Generated TypeScript Interface (User):\n\nexport type Product = {\n  id: string;\n  title: string;\n  priceCents: number;\n  inStock: boolean;\n  description: string | null;\n}`}
        />

        <QuickCheck
          question="Whenever you modify a field in schema.prisma, what command must you run to update your TypeScript types?"
          answer="npx prisma generate."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
