"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & CONFIG VALIDATION MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Validation Approaches">
      {/* ── 12.1 Validation Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Comparing Validation Methods in @nestjs/config"
          description="A complete feature matrix comparing Joi, class-validator, and namespaced custom loaders."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Joi Schema", "class-validator DTO", "registerAs() Factory"]}
          rows={[
            ["Syntax Style", "Joi fluent chaining (Joi.string().required())", "TypeScript class decorators (@IsString())", "Plain JavaScript factory functions"],
            ["Extra Dependencies", "joi package", "class-validator & class-transformer (already installed)", "Zero extra dependencies"],
            ["Default Values", "✅ Supported (.default(3000))", "✅ Supported (PORT = 3000)", "✅ Supported (process.env.PORT || 3000)"],
            ["Namespacing", "❌ Flat key-value validation", "❌ Flat object validation", "✅ Deep namespacing (db.host, jwt.secret)"],
            ["Startup Fail-Fast", "✅ Immediate crash with clean error", "✅ Immediate crash with validation list", "⚠️ Manual error throwing required"],
          ]}
        />

        <QuickCheck
          question="Which validation approach requires zero external npm packages if you are already using NestJS validation pipes?"
          answer="The class-validator & class-transformer DTO approach."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
