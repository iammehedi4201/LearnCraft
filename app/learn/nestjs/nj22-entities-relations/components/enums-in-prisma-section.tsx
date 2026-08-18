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
// MODULE 9 — NATIVE ENUMS IN PRISMA & POSTGRESQL
// ═══════════════════════════════════════════════════════════

export function EnumsInPrismaSection() {
  return (
    <SectionContainer number={9} title="Native Enums in Prisma & PostgreSQL">
      {/* ── 9.1 Enums ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Database-Level Enum Constraints"
          description="Define strict type-safe enums directly in your PostgreSQL database."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`// prisma/schema.prisma
enum Role {
  USER
  MODERATOR
  ADMIN
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}

model Order {
  id        String      @id @default(uuid())
  status    OrderStatus @default(PENDING)
  total     Int
  createdAt DateTime    @default(now())
}`}
          language="prisma"
        />

        <PredictOutputBox
          code={`// Importing auto-generated Role enum in a NestJS Service:
import { Role } from '@prisma/client';

const userRole: Role = Role.ADMIN;
// What happens if you try to pass userRole = 'SUPER_ADMIN'?`}
          answer={`Predicted Compiler Behavior:\n\nTypeScript will throw a compile-time error:\nType '"SUPER_ADMIN"' is not assignable to type 'Role'.\n\nPrisma ensures your TypeScript code and PostgreSQL enum types are 100% synchronized!`}
        />

        <QuickCheck
          question="What is the benefit of defining enums in schema.prisma compared to plain strings?"
          answer="PostgreSQL stores them compactly as internal integers while enforcing strict value constraints at both the database and TypeScript levels."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
