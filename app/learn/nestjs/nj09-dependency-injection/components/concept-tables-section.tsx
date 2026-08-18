"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CONCEPT TABLES & DI MASTER CHEAT SHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & DI Master Cheat Sheet">
      {/* ── All Provider Syntax Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Master Custom Provider Syntax Reference"
          description="Every custom provider option available in NestJS at a glance."
          color="primary"
        />

        <ComparisonTable
          headers={["Provider Option", "Purpose", "Code Example"]}
          rows={[
            ["useClass", "Resolves to a specific class", "{ provide: Logger, useClass: ProdLogger }"],
            ["useValue", "Resolves to a static value or mock object", "{ provide: 'PORT', useValue: 3000 }"],
            ["useFactory", "Resolves via dynamic factory function", "{ provide: 'DB', useFactory: (c) => db(c), inject: [Config] }"],
            ["useExisting", "Creates an alias for an existing provider", "{ provide: 'ALIAS_SVC', useExisting: RealService }"],
            ["@Inject('TOKEN')", "Injects non-class or custom token", "constructor(@Inject('TOKEN') private t: any)"],
            ["@Optional()", "Makes dependency optional (undefined if missing)", "constructor(@Optional() private c?: Cache)"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Injection Styles Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Injection Patterns Comparison"
          description="When to use each dependency injection technique."
          color="sky"
        />

        <ComparisonTable
          headers={["Pattern", "How it Works", "Best Use Case"]}
          rows={[
            ["Constructor Injection", "Injected via constructor arguments", "99% of classes (Standard pattern)"],
            ["Property Injection", "Injected via @Inject() on class fields", "Base classes with inheritance"],
            ["Factory Injection", "Injected into useFactory arguments via inject: []", "Dynamic or async initializations"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
