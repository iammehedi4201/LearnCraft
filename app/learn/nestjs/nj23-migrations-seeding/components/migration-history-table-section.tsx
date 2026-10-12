"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — NESTJS LIFECYCLE TIMELINE & EXECUTION PHASES
// ═══════════════════════════════════════════════════════════

export function MigrationHistoryTableSection() {
  return (
    <SectionContainer number={3} title="NestJS Lifecycle Timeline & Hook Execution Order">
      {/* ── 3.1 Lifecycle Timeline ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The Complete Lifecycle Execution Sequence"
          description="How NestJS transitions through initialization, operational runtime, and graceful termination phases."
          color="emerald"
        />

        <ComparisonTable
          headers={["Lifecycle Phase", "Hook Method", "Trigger Point & Purpose"]}
          rows={[
            ["1. Module Init", "onModuleInit()", "Called once all dependencies of the host module are resolved. Ideal for seeding state."],
            ["2. App Bootstrap", "onApplicationBootstrap()", "Called once all modules have completed onModuleInit(). Safe for cross-module coordination."],
            ["3. Operational", "app.listen(port)", "HTTP server is bound and active; incoming requests are processed."],
            ["4. Shutdown Prep", "beforeApplicationShutdown(signal)", "Triggered by SIGINT/SIGTERM. Stop accepting new requests and drain connections."],
            ["5. Module Teardown", "onModuleDestroy()", "Called on each provider to close file handles, flush logs, and release memory."],
            ["6. Terminated", "app.close()", "Process completes and terminates cleanly without leaking resources."],
          ]}
        />

        <QuickCheck
          question="What is the difference between onModuleInit() and onApplicationBootstrap()?"
          answer="onModuleInit() is called as soon as a specific module's dependencies are resolved. onApplicationBootstrap() is called only after ALL modules in the entire application have finished their onModuleInit()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
