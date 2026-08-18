"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & REDIS CACHE MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Cache Store Matrix">
      {/* ── 12.1 Cache Store Comparison ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="In-Memory vs Redis vs Memcached"
          description="A complete architectural matrix comparing memory caching technologies."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "NestJS In-Memory Store", "Redis Store", "Memcached Store"]}
          rows={[
            ["Storage Location", "Node.js Process RAM", "Dedicated Redis Server RAM", "Dedicated Memcached RAM"],
            ["Multi-Container Sharing", "❌ No (Isolated to single pod)", "✅ Yes (Centralized shared state)", "✅ Yes (Centralized shared state)"],
            ["Data Structures", "Strings / Objects only", "Hashes, Lists, Sets, Sorted Sets, Bitmaps", "Strings only"],
            ["Persistence to Disk", "❌ None", "✅ Yes (RDB Snapshots & AOF logs)", "❌ None (Pure ephemeral RAM)"],
            ["Pub/Sub Capabilities", "❌ None", "✅ Yes (Built-in Pub/Sub & Streams)", "❌ None"],
            ["Distributed Locking", "❌ No", "✅ Yes (Redlock / SET NX)", "⚠️ Limited"],
          ]}
        />

        <QuickCheck
          question="Which cache store allows complex data structures like Sorted Sets and Hashes in addition to plain strings?"
          answer="Redis."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
