"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — NESTJS LIFECYCLE HOOKS MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="NestJS Lifecycle Hooks Master Reference">
      {/* ── 12.1 Lifecycle Reference ── */}
      <div className="mb-16">
        <TopicHeader
          number={12}
          title="Lifecycle Methods &amp; Bootstrap APIs"
          description="A complete architectural cheat sheet of all initialization, execution, and teardown APIs in NestJS."
          color="primary"
        />

        <ComparisonTable
          headers={["Lifecycle Hook / API", "Scope", "Primary Use Case", "Async Support"]}
          rows={[
            ["onModuleInit()", "Module / Provider", "Initialize provider state, verify seed data, load configs", "✅ Supported (returns Promise)"],
            ["onApplicationBootstrap()", "Application-wide", "Cross-module verification once all modules have initialized", "✅ Supported (returns Promise)"],
            ["app.listen(port)", "Application Server", "Binds HTTP listener and begins accepting inbound client connections", "✅ Supported (returns Promise)"],
            ["app.enableShutdownHooks()", "Application Setup", "Registers Node.js OS signal listeners for SIGINT and SIGTERM", "Synchronous configuration"],
            ["beforeApplicationShutdown(signal)", "Module / Provider", "Drain queues and finish in-flight requests before sockets close", "✅ Supported (returns Promise)"],
            ["onModuleDestroy()", "Module / Provider", "Clear intervals, flush logger buffers, release file handles", "✅ Supported (returns Promise)"],
            ["createApplicationContext()", "Headless Runner", "Instantiates DI container for standalone CLI seeders and jobs", "✅ Supported (returns Promise)"],
          ]}
        />

        <QuickCheck
          question="Can onModuleDestroy() perform asynchronous cleanup (like waiting for a database transaction to finish)?"
          answer="Yes! onModuleDestroy() can return a Promise, and NestJS will await its completion before continuing process termination."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
