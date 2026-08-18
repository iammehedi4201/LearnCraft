"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CONCEPT TABLES & PROVIDER CHEAT SHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & Provider Cheat Sheet">
      {/* ── Controller vs Service ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Controllers vs Services: Who Does What?"
          description="A clear breakdown of duties between the front door and the engine room."
          color="primary"
        />

        <ComparisonTable
          headers={["Task / Responsibility", "Controller (@Controller)", "Service (@Injectable)"]}
          rows={[
            ["Match HTTP URL and Method", "✅ Yes (@Get, @Post, etc.)", "❌ No"],
            ["Extract Headers, Params, Body", "✅ Yes (@Param, @Body, @Query)", "❌ No"],
            ["Database Queries (SQL/NoSQL)", "❌ No", "✅ Yes"],
            ["Complex Business Calculations", "❌ No", "✅ Yes"],
            ["Set HTTP Status Codes", "✅ Yes (@HttpCode)", "❌ No"],
            ["Reusable across multiple routes", "❌ No", "✅ Yes"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Provider Scopes Summary ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Provider Scopes Master Summary"
          description="Quick reference table for the 3 NestJS provider lifecycles."
          color="sky"
        />

        <ComparisonTable
          headers={["Scope", "Lifespan", "Instance Count", "Performance Impact"]}
          rows={[
            ["Scope.DEFAULT", "Application startup until server stops", "1 shared instance (Singleton)", "⚡ Maximum performance (Recommended)"],
            ["Scope.REQUEST", "Start of HTTP request until response ends", "1 new instance per incoming request", "⚠️ Small GC overhead on high traffic"],
            ["Scope.TRANSIENT", "Dedicated per consumer class", "1 unique instance per injection", "⚡ Moderate memory usage"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
