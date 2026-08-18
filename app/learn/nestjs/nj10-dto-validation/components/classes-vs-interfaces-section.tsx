"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — CLASSES VS INTERFACES FOR DTOs
// ═══════════════════════════════════════════════════════════

export function ClassesVsInterfacesSection() {
  return (
    <SectionContainer number={2} title="Classes vs Interfaces for DTOs">
      {/* ── 2.1 Why Classes? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Why NestJS Requires Classes (Not Interfaces) for DTOs"
          description="A vital architectural choice in NestJS that trips up many beginners."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> What happens during TypeScript compilation?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            TypeScript <code>interface</code> definitions are 100% removed by the TypeScript compiler when converting code to JavaScript.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            Because JavaScript has no runtime interfaces, NestJS&apos;s <code>ValidationPipe</code> cannot inspect or validate an interface at runtime. <strong>Classes</strong>, however, are part of the ECMAScript standard and exist permanently at runtime!
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Feature", "TypeScript Interface", "TypeScript Class (DTO)"]}
          rows={[
            ["Exists at Runtime in JS?", "❌ No (Erased completely)", "✅ Yes (Real ES6 Constructor)"],
            ["Supports Decorators (@IsEmail)?", "❌ No", "✅ Yes"],
            ["Can be validated by ValidationPipe?", "❌ No", "✅ Yes"],
            ["Recommended for NestJS DTOs?", "❌ No", "✅ Yes (Mandatory)"],
          ]}
        />

        <EasyRuleCard rule="Always create your DTOs as classes, never as interfaces." />
      </div>

      <Divider />

      {/* ── 2.2 Code Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Correct DTO Syntax"
          description="Look at the difference between an interface and a proper class DTO."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`// ❌ WRONG (Interfaces cannot be validated at runtime):
export interface CreateUserDto {
  name: string;
  email: string;
}

// ✅ RIGHT (Classes exist at runtime and support validation decorators):
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}`}
          language="typescript"
        />

        <QuickCheck
          question="Why are TypeScript classes required for DTOs in NestJS instead of interfaces?"
          answer="Because interfaces are removed at compile-time and don't exist at runtime, while classes exist in JavaScript and allow validation decorators (@IsEmail, @IsString) to be inspected by ValidationPipe."
        />
      </div>
    </SectionContainer>
  );
}
