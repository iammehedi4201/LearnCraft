"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — LOG LEVELS & PRODUCTION FILTERING
// ═══════════════════════════════════════════════════════════

export function CustomLogLevelsSection() {
  return (
    <SectionContainer number={7} title="Log Levels &amp; Production Filtering">
      {/* ── 7.1 Log Levels ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 6 Standard Pino Severity Levels"
          description="Filter log noise in production while preserving verbose tracing in local development."
          color="amber"
        />

        <ComparisonTable
          headers={["Level", "Numeric Code", "Environment", "Appropriate Usage"]}
          rows={[
            ["fatal", "60", "All", "Application crash or unrecoverable infrastructure failure (DB down)"],
            ["error", "50", "All", "Unhandled exceptions, failed payments, 500 responses"],
            ["warn", "40", "All", "Deprecated API access, high memory threshold alerts, 4xx bursts"],
            ["info", "30", "Production default", "Normal application lifecycle events, successful order creation"],
            ["debug", "20", "Staging / Dev", "SQL queries, payload previews, cache hit/miss details"],
            ["trace", "10", "Local Dev", "Extremely verbose function enter/exit checkpoints"],
          ]}
        />

        <QuickCheck
          question="What log level is recommended for production environments by default?"
          answer="'info' (level 30), which captures normal operations, warnings, and errors while ignoring verbose debug noise."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
