"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 7 — INTERFACES VS TYPE ALIASES
// ═══════════════════════════════════════════════════════════

export function SectionInterfaces() {
  return (
    <SectionContainer number={7} title="Interfaces vs Type Aliases">
      {/* ── 7.1 Choosing the Right Tool ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Blueprints vs Nicknames"
          description="TypeScript gives you two main ways to name custom shapes: 'interface' and 'type'. Understanding when to use which is essential for clean architecture."
          color="primary"
        />

        <AnalogyBox emoji="🏗️" title="Think about it like this">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Interface = Architectural Blueprint:</strong> Describes the exact shape of a physical building (how many rooms, doors, and electrical outlets it has). Other blueprints can extend it.
            </li>
            <li>
              <strong>Type Alias = Custom Nickname:</strong> Can give a convenient name to <em>anything</em> — a union (<code className="text-ds-info-dark">ID = string | number</code>), a tuple, or a raw primitive.
            </li>
          </ul>
        </AnalogyBox>

        <ComparisonTable
          headers={["Feature", "interface User { ... }", "type User = { ... }"]}
          rows={[
            ["Best For", "Defining Object & Class contracts", "Unions, primitives, tuples, utility types"],
            ["Extending / Inheritance", "extends (Clean & fast)", "& (Intersection operator)"],
            ["Declaration Merging", "✅ Yes (Auto-merges duplicate names)", "❌ No (Throws duplicate identifier error)"],
            ["Union Types (A | B)", "❌ Cannot create unions directly", "✅ Native support (type ID = string | number)"],
            ["NestJS Recommendation", "✅ Preferred for DTO contracts & Service shapes", "✅ Preferred for unions, responses, & utilities"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 7.2 Interface Inheritance & Declaration Merging ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Extending Interfaces & Merging"
          description="Interfaces can inherit properties from other interfaces using 'extends', allowing you to build modular, clean object hierarchies."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Interface Inheritance & Composition</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. Base Entity Interface
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Extending the Base Entity for a User
interface User extends BaseEntity {
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}

const activeAdmin: User = {
  id: 101,
  name: "Mehedi",
  email: "admin@learncraft.io",
  role: "ADMIN",
  createdAt: new Date(),
  updatedAt: new Date(),
};

console.log(\`✅ Loaded User #\${activeAdmin.id}: \${activeAdmin.name} (\${activeAdmin.role})\`);`}
            height="290px"
          />
        </div>

        <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft mb-8">
          <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧩</span> Declaration Merging (Interfaces only)
          </h5>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If you declare an interface with the same name multiple times, TypeScript automatically merges all fields into a single combined interface. This is how NestJS plugins extend Express request objects!
          </p>
          <EnhancedCodeBlock
            code={`// First declaration (e.g. from NestJS core)
interface RequestContext {
  userId: string;
}

// Second declaration (e.g. from an Auth Plugin)
interface RequestContext {
  token: string;
}

// Result: RequestContext now requires BOTH userId AND token!
const ctx: RequestContext = {
  userId: "usr_99",
  token: "jwt_ey...",
};`}
            language="typescript"
          />
        </div>

        <MistakeBox
          title="Trying to create a union using an interface"
          description="An interface can only define the shape of an object. If you need a union (e.g. string OR number), you must use a 'type' alias."
          wrong={`// ❌ WRONG: Syntax Error! Interfaces cannot be unions
interface ID = string | number;`}
          right={`// ✅ RIGHT: Use a type alias for union definitions
type ID = string | number;`}
        />
      </div>

      <Divider />

      {/* ── 7.3 Interfaces in NestJS Architecture ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Interfaces in NestJS DTOs & Service Contracts"
          description="NestJS uses interfaces to decouple controllers from service implementations and ensure strict contract adherence."
          color="emerald"
        />

        <EnhancedCodeBlock
          code={`import { Injectable } from '@nestjs/common';

// Service Contract Interface
export interface IAuthService {
  validateUser(email: string, pass: string): Promise<boolean>;
  generateToken(userId: number): string;
}

// Concrete Service implementing the interface
@Injectable()
export class AuthService implements IAuthService {
  async validateUser(email: string, pass: string): Promise<boolean> {
    return email === 'admin@nest.com' && pass === 'secret';
  }

  generateToken(userId: number): string {
    return \`jwt_token_for_\${userId}\`;
  }
}`}
          language="typescript"
        />

        <QuickCheck
          question="If you need a custom type that represents either a 'SuccessResponse' OR an 'ErrorResponse', should you use an interface or a type alias?"
          answer="You must use a 'type' alias (e.g. type ApiResponse = SuccessResponse | ErrorResponse). Interfaces only define object structures and cannot represent union types."
        />
      </div>
    </SectionContainer>
  );
}
