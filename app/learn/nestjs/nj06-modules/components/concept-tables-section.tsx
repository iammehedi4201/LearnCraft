"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CONCEPT TABLES & MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & Master Reference">
      {/* ── Master Properties Table ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="@Module() Properties Reference"
          description="A complete one-page reference table for all 4 module properties."
          color="primary"
        />

        <ComparisonTable
          headers={["Property", "Accepted Values", "Purpose", "Common Mistake"]}
          rows={[
            ["controllers", "Array of Controller classes", "Registers HTTP route handlers", "Putting services here by accident"],
            ["providers", "Array of Service / Helper classes", "Instantiates services for internal use", "Forgetting to export when needed outside"],
            ["imports", "Array of Module classes", "Brings in exported tools from other modules", "Trying to import a Service instead of a Module"],
            ["exports", "Array of Service / Module classes", "Makes internal tools public to other modules", "Forgetting to list in providers first"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Types of Modules ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The 5 Types of NestJS Modules"
          description="Different types of modules for different architectural purposes."
          color="sky"
        />

        <ComparisonTable
          headers={["Module Type", "Key Characteristic", "Example"]}
          rows={[
            ["Root Module", "Starting point of application tree", "AppModule"],
            ["Feature Module", "Encapsulates one business domain", "UsersModule, OrdersModule"],
            ["Shared Module", "Exports reusable utility services", "CommonModule, EmailModule"],
            ["Global Module", "Decorated with @Global(), available everywhere", "DatabaseModule, ConfigModule"],
            ["Dynamic Module", "Configured via static method with options", "ConfigModule.forRoot({ isGlobal: true })"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
