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
// MODULE 2 — DEFINING ROLES WITH TYPESCRIPT ENUMS
// ═══════════════════════════════════════════════════════════

export function RolesEnumSection() {
  return (
    <SectionContainer number={2} title="Defining Roles with TypeScript Enums">
      {/* ── 2.1 Role Enum ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Type-Safe Role Enumeration"
          description="Never use raw string literals like 'admin' for role checks. Always define a typed Enum."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> The Role Enum
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Create an enum file in <code>src/common/enums/role.enum.ts</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/common/enums/role.enum.ts
export enum Role {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

// In your Prisma / User schema:
export interface UserEntity {
  id: number;
  email: string;
  role: Role; // Strongly typed enum
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why are TypeScript enums better than raw strings for role-based authorization?"
          answer="Enums provide auto-completion in IDEs, catch typos at compile time (e.g. 'admim' vs 'admin'), and allow easy renaming across the entire codebase."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
