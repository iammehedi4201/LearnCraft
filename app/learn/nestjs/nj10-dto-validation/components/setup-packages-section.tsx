"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — INSTALLING CLASS-VALIDATOR & TRANSFORMER
// ═══════════════════════════════════════════════════════════

export function SetupPackagesSection() {
  return (
    <SectionContainer number={3} title="Installing class-validator & class-transformer">
      {/* ── 3.1 Installation Command ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Two Essential Validation Packages"
          description="NestJS uses two powerful libraries under the hood to perform validation."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> Install with a single command:
          </h4>
          <div className="mb-3">
            <EnhancedCodeBlock code={`npm i --save class-validator class-transformer`} language="bash" />
          </div>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            Both packages work as a team: <code>class-transformer</code> converts raw incoming JSON into class instances, and <code>class-validator</code> checks all decorators!
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Package Name", "Primary Role", "Example Feature"]}
          rows={[
            ["class-validator", "Performs data validation via decorators", "@IsEmail(), @IsNotEmpty(), @Min(18)"],
            ["class-transformer", "Transforms plain JSON objects into typed class instances", "@Type(() => Number), @Transform()"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 3.2 QuickCheck ── */}
      <div className="mb-16">
        <QuickCheck
          question="What are the two npm packages required for NestJS ValidationPipe to work?"
          answer="class-validator and class-transformer"
        />
      </div>
    </SectionContainer>
  );
}
