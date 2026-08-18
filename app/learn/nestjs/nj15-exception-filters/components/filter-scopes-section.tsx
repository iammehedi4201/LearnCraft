"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — THE 3 EXCEPTION FILTER BINDING SCOPES
// ═══════════════════════════════════════════════════════════

export function FilterScopesSection() {
  return (
    <SectionContainer number={6} title="The 3 Exception Filter Scopes">
      {/* ── 6.1 Scopes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Where Can You Bind Exception Filters?"
          description="Method, Controller, and Global (APP_FILTER) scopes."
          color="primary"
        />

        <ComparisonTable
          headers={["Scope Level", "Syntax", "Dependency Injection?"]}
          rows={[
            ["Method Scope", "@UseFilters(CustomFilter) on route handler", "Yes"],
            ["Controller Scope", "@UseFilters(HttpExceptionFilter) on class", "Yes"],
            ["Global (main.ts)", "app.useGlobalFilters(new AllExceptionsFilter())", "❌ No (cannot inject services)"],
            ["Global (APP_FILTER)", "{ provide: APP_FILTER, useClass: AllExceptionsFilter } in AppModule", "✅ Yes (full DI support)"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// Global registration in app.module.ts:
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <QuickCheck
          question="What token from '@nestjs/core' is used to register a global Exception Filter with Dependency Injection in AppModule?"
          answer="APP_FILTER (e.g. { provide: APP_FILTER, useClass: AllExceptionsFilter })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
