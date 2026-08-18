"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & LOGGING BENCHMARKS
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Logging Reference">
      {/* ── 12.1 Loggers Benchmark ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Node.js Logging Engines Performance Comparison"
          description="Real-world benchmarks measuring operations per second and CPU overhead."
          color="primary"
        />

        <ComparisonTable
          headers={["Logger Engine", "Throughput (ops/sec)", "Memory Footprint", "JSON Native", "Asynchronous"]}
          rows={[
            ["Pino", "⚡ ~105,000 ops/sec", "🟢 Minimal (20MB)", "✅ Yes", "✅ Yes (Worker threads)"],
            ["Bunyan", "⏱️ ~12,000 ops/sec", "🟡 Moderate (45MB)", "✅ Yes", "⚠️ Limited"],
            ["Winston", "⏱️ ~18,000 ops/sec", "🟡 Moderate (50MB)", "⚠️ Via formatters", "⚠️ Callback based"],
            ["console.log", "🐢 ~8,000 ops/sec", "🔴 High (V8 string alloc)", "❌ No", "❌ Synchronous blocking"],
          ]}
        />

        <QuickCheck
          question="How much faster is Pino compared to Winston for structured logging in Node.js?"
          answer="Pino is approximately 5 to 6 times faster than Winston (~105,000 ops/sec vs ~18,000 ops/sec)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
