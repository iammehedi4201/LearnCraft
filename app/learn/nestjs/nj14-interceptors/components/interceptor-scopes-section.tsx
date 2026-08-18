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
// MODULE 8 — THE 3 INTERCEPTOR BINDING SCOPES
// ═══════════════════════════════════════════════════════════

export function InterceptorScopesSection() {
  return (
    <SectionContainer number={8} title="The 3 Interceptor Binding Scopes">
      {/* ── 8.1 Scope Breakdown ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Where Can You Bind an Interceptor?"
          description="Method, Controller, and Global (APP_INTERCEPTOR) binding scopes."
          color="primary"
        />

        <ComparisonTable
          headers={["Scope Level", "Syntax", "Dependency Injection?"]}
          rows={[
            ["Method Scope", "@UseInterceptors(LoggingInterceptor) on method", "Yes"],
            ["Controller Scope", "@UseInterceptors(TransformInterceptor) on class", "Yes"],
            ["Global (main.ts)", "app.useGlobalInterceptors(new Interceptor())", "❌ No (cannot inject services)"],
            ["Global (APP_INTERCEPTOR)", "{ provide: APP_INTERCEPTOR, useClass: Interceptor } in AppModule", "✅ Yes (full DI support)"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// app.module.ts
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './logging.interceptor';
import { TransformInterceptor } from './transform.interceptor';

@Module({
  providers: [
    // 1. Global Benchmark Stopwatch Interceptor:
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // 2. Global Response Envelope Interceptor:
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <QuickCheck
          question="What token from '@nestjs/core' is used to register a global Interceptor with Dependency Injection in AppModule?"
          answer="APP_INTERCEPTOR (e.g. { provide: APP_INTERCEPTOR, useClass: TransformInterceptor })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
