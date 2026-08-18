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
// MODULE 7 — THE NESTJS CLI GENERATOR CHEATSHEET
// ═══════════════════════════════════════════════════════════

export function CliGeneratorsSection() {
  return (
    <SectionContainer number={7} title="The NestJS CLI Generator Cheatsheet">
      {/* ── 7.1 Generator Commands ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Never Create Files Manually! Use 'nest g'"
          description="The NestJS CLI can generate files, classes, and full CRUD resources in 1 second."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🪄</span> Why Are CLI Generators So Useful?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            When you run <code>nest g controller users</code>, the CLI does TWO things:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-ds-text-strong">
            <li>It creates <code>src/users/users.controller.ts</code> with decorators already written.</li>
            <li><strong>It automatically registers the controller</strong> in your <code>app.module.ts</code>! You never have to manually import and link files.</li>
          </ol>
        </WhyBox>

        <ComparisonTable
          headers={["What to Create", "Long Command", "Short Alias", "What It Generates"]}
          rows={[
            ["Module", "nest generate module users", "nest g mo users", "Creates users.module.ts and registers it"],
            ["Controller", "nest generate controller users", "nest g co users", "Creates users.controller.ts and links to module"],
            ["Service", "nest generate service users", "nest g s users", "Creates users.service.ts and adds as provider"],
            ["Full CRUD Resource", "nest generate resource products", "nest g res products", "Generates complete CRUD with DTOs, entity, controller, service & tests!"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 7.2 Handy CLI Flags ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Useful CLI Flags"
          description="Power-up your generator commands with helpful flags."
          color="sky"
        />

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">--dry-run (Preview without saving)</h5>
            <p className="text-xs text-ds-text-sub mb-2">Simulates the command to show what files would be created without actually creating them:</p>
            <EnhancedCodeBlock code={`nest g co users --dry-run`} language="bash" />
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">--no-spec (Skip test files)</h5>
            <p className="text-xs text-ds-text-sub mb-2">Generates the files without creating the <code>.spec.ts</code> test file:</p>
            <EnhancedCodeBlock code={`nest g s users --no-spec`} language="bash" />
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">--flat (No extra folder)</h5>
            <p className="text-xs text-ds-text-sub mb-2">Creates the file directly in the current directory instead of creating a subfolder:</p>
            <EnhancedCodeBlock code={`nest g s auth --flat`} language="bash" />
          </div>
        </div>

        <QuickCheck
          question="What short command generates a new service called 'auth' without writing the word 'generate'?"
          answer="nest g s auth"
        />
      </div>
    </SectionContainer>
  );
}
