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
// MODULE 8 — THE 3 GUARD BINDING SCOPES
// ═══════════════════════════════════════════════════════════

export function GuardScopesSection() {
  return (
    <SectionContainer number={8} title="The 3 Guard Scopes (Method, Controller, Global)">
      {/* ── 8.1 Scope Breakdown ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Where to Bind Guards"
          description="Understand the three levels of guard scoping and how to inject dependencies into global guards."
          color="primary"
        />

        <ComparisonTable
          headers={["Scope Level", "Syntax", "Dependency Injection?"]}
          rows={[
            ["Method Scope", "@UseGuards(RolesGuard) on method", "Yes (instantiated by NestJS DI)"],
            ["Controller Scope", "@UseGuards(JwtAuthGuard) on class", "Yes (instantiated by NestJS DI)"],
            ["Global (main.ts)", "app.useGlobalGuards(new Guard())", "❌ No (cannot inject services or Reflector)"],
            ["Global (APP_GUARD)", "{ provide: APP_GUARD, useClass: Guard } in AppModule", "✅ Yes (full DI & Reflector support)"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// Recommended Global Guard Registration (in app.module.ts):
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  providers: [
    // 1. Global Authentication Guard (runs first on every route):
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // 2. Global RBAC Roles Guard (runs second on every route):
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <QuickCheck
          question="Why should you prefer { provide: APP_GUARD, useClass: MyGuard } over app.useGlobalGuards(new MyGuard())?"
          answer="Because registering with APP_GUARD in AppModule allows NestJS to inject providers (like Reflector, ConfigService, or PrismaService) directly into your guard's constructor."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
