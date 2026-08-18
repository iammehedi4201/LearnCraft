"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — SWAGGER CLI PLUGIN (AUTO-ANNOTATION)
// ═══════════════════════════════════════════════════════════

export function CliPluginAutoGenerationSection() {
  return (
    <SectionContainer number={6} title="Swagger CLI Plugin (Zero-Boilerplate Auto Annotation)">
      {/* ── 6.1 CLI Plugin ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated DTO &amp; Controller Introspection"
          description="Eliminate hundreds of repetitive @ApiProperty() decorators with the AST compiler plugin."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> nest-cli.json Configuration
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Add the Swagger plugin to <code>nest-cli.json</code>. The TypeScript compiler automatically inspects your DTO types and <code>class-validator</code> rules during build:
          </p>
          <EnhancedCodeBlock
            code={`// nest-cli.json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true,
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": true,
          "introspectComments": true,
          "dtoFileNameSuffix": [".dto.ts", ".entity.ts"]
        }
      }
    ]
  }
}`}
            language="json"
          />
        </WhyBox>

        <EasyRuleCard rule="With the CLI Plugin enabled, normal TypeScript comments (/** User email */) and class-validator decorators (@IsEmail()) are automatically converted into OpenAPI schema rules!" />

        <QuickCheck
          question="What does 'classValidatorShim: true' do in the Swagger CLI Plugin?"
          answer="It automatically extracts min/max lengths, regex patterns, and optional flags from class-validator decorators without requiring manual @ApiProperty options."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
