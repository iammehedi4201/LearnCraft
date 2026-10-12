"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 5 — ENUMS VS STRING UNIONS
// ═══════════════════════════════════════════════════════════

export function SectionEnums() {
  return (
    <SectionContainer number={5} title="Enums vs String Unions">
      {/* ── 5.1 What is an Enum? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is an Enum?"
          description="An Enum (Enumeration) is a named set of constant values. It acts like a strict dropdown menu in code, preventing typos and magic strings."
          color="primary"
        />

        <AnalogyBox emoji="📋" title="Think about it like this">
          Think of the gear selector in an automatic car: <strong className="text-ds-info-dark">P</strong> (Park), <strong className="text-ds-info-dark">R</strong> (Reverse), <strong className="text-ds-info-dark">N</strong> (Neutral), <strong className="text-ds-info-dark">D</strong> (Drive).
          <p className="mt-2">
            You cannot shift into &quot;Fly&quot; or &quot;Teleport&quot; because the physical shifter only has those 4 exact slots. An Enum locks your code down to only valid choices.
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                1. Numeric Enums (Default, Auto-Incrementing)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Values automatically start at 0 and increment by 1.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={9}
                code={`enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

console.log(HttpStatus.CREATED); // 201`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                2. String Enums (Recommended for NestJS)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Values are explicit strings that remain readable in logs and JSON databases.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={9}
                code={`export enum UserRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  MEMBER = "MEMBER",
}

console.log(UserRole.ADMIN); // "ADMIN"`}
                language="typescript"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 5.2 Enums vs String Unions ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Enums vs Union Types: Which Should You Use?"
          description="In TypeScript, you can represent sets of values using either an 'enum' or a 'type union' of string literals. Both have distinct advantages."
          color="sky"
        />

        <ComparisonTable
          headers={["Feature", "String Enum (enum Role { ... })", "String Union (type Role = ...)"]}
          rows={[
            ["Runtime Footprint", "Generates a real JavaScript object in output bundle", "Erased at compile time (Zero JS generated)"],
            ["Refactoring & Autocomplete", "Excellent (UserRole.ADMIN)", "Excellent ('ADMIN' | 'USER')"],
            ["Database / Prisma compatibility", "Direct mapping to SQL ENUM types", "Mapped as varchar / string"],
            ["NestJS Decorator usage", "Ideal for @Roles(UserRole.ADMIN)", "Can be used in type annotations"],
          ]}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Authorization with Enums</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`enum UserRole {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

interface User {
  id: number;
  name: string;
  role: UserRole;
}

function canPublishArticle(user: User): boolean {
  return user.role === UserRole.ADMIN || user.role === UserRole.EDITOR;
}

const adminUser: User = { id: 1, name: "Mehedi", role: UserRole.ADMIN };
const viewerUser: User = { id: 2, name: "Alice", role: UserRole.VIEWER };

console.log(\`Can \${adminUser.name} publish? \${canPublishArticle(adminUser) ? "✅ YES" : "❌ NO"}\`);
console.log(\`Can \${viewerUser.name} publish? \${canPublishArticle(viewerUser) ? "✅ YES" : "❌ NO"}\`);`}
            height="290px"
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Enums are Used in NestJS Guards & DTOs</SectionHeading>
          <EnhancedCodeBlock
            code={`import { SetMetadata, Controller, Get, UseGuards } from '@nestjs/common';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Custom decorator using the Role enum
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Controller('admin')
export class AdminDashboardController {

  @Get('metrics')
  @Roles(Role.ADMIN) // Enforcing enum-based RBAC
  getSystemMetrics() {
    return { cpuUsage: '12%', memory: '2.4GB', activeUsers: 4500 };
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="Why are String Enums (e.g. ADMIN = 'ADMIN') preferred over Numeric Enums in NestJS database entities?"
          answer="String Enums store readable strings (like 'ADMIN') in database columns and JSON logs, making debugging and SQL inspection effortless. Numeric enums store arbitrary numbers (0, 1, 2) which can easily break if the enum order changes."
        />
      </div>
    </SectionContainer>
  );
}
