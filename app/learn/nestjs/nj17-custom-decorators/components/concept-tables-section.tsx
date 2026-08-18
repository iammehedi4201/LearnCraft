"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & DECORATOR PATTERNS REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Decorator Patterns Reference">
      {/* ── 12.1 Decorator Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Decorator Types & Creation APIs"
          description="A side-by-side reference of all decorator creation utilities in NestJS."
          color="primary"
        />

        <ComparisonTable
          headers={["Creation Function", "Target Decorator Type", "Primary Use Case"]}
          rows={[
            ["createParamDecorator()", "Parameter Decorator", "Extracting request fields (@CurrentUser, @IpAddress, @Cookie)"],
            ["applyDecorators()", "Method / Class Composite", "Bundling multiple decorators into one tag (@Auth('admin'))"],
            ["SetMetadata()", "Metadata Decorator", "Attaching metadata with string keys (@Roles('admin'))"],
            ["Reflector.createDecorator()", "Typed Metadata Decorator", "Type-safe metadata decoration in NestJS 10+ without string keys"],
          ]}
        />

        <QuickCheck
          question="Which function should you use when you want to extract a specific header from the incoming request directly into a method parameter?"
          answer="createParamDecorator()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
