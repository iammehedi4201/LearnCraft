"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — WHY PINO VS CONSOLE.LOG & WINSTON
// ═══════════════════════════════════════════════════════════

export function WhyPinoVsConsoleSection() {
  return (
    <SectionContainer number={2} title="Why Pino over console.log &amp; Winston">
      {/* ── 2.1 Logging Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Logger Benchmark Matrix"
          description="Understand why top engineering teams choose Pino as their default Node.js logging engine."
          color="sky"
        />

        <ComparisonTable
          headers={["Feature", "nestjs-pino", "Default NestJS Logger", "Winston", "console.log"]}
          rows={[
            ["Format", "JSON by default", "Plain Text strings", "Configurable JSON/Text", "Unstructured Text"],
            ["Throughput", "⚡ ~100,000 ops/sec", "⏱️ ~25,000 ops/sec", "⏱️ ~20,000 ops/sec", "🐢 Synchronous blocking"],
            ["Event Loop Blocking", "0% (Non-blocking worker threads)", "Low", "Moderate", "High during stdout buffer pressure"],
            ["Auto Request Logging", "✅ Built-in HTTP middleware", "❌ Manual interceptor needed", "❌ Manual middleware needed", "❌ None"],
            ["Log Redaction", "✅ Automated key redaction", "❌ Manual redaction", "⚠️ Plugin required", "❌ Zero protection"],
          ]}
        />

        <QuickCheck
          question="Why should server logs be written in JSON format in production?"
          answer="Because log management systems (Datadog, AWS CloudWatch, Grafana Loki, Splunk) can automatically parse and index individual JSON keys without slow regular expression parsing."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
