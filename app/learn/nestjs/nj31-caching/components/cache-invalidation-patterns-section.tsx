"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — CACHE INVALIDATION STRATEGIES
// ═══════════════════════════════════════════════════════════

export function CacheInvalidationPatternsSection() {
  return (
    <SectionContainer number={6} title="Cache Invalidation Strategies &amp; Patterns">
      {/* ── 6.1 Invalidation Patterns ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 3 Enterprise Invalidation Strategies"
          description="'There are only two hard things in Computer Science: cache invalidation and naming things.'"
          color="amber"
        />

        <ComparisonTable
          headers={["Strategy", "How It Works", "Pros", "Cons", "Ideal Scenario"]}
          rows={[
            ["Cache-Aside (Lazy)", "Read cache -> On miss, read DB & populate cache", "Only caches requested data; memory efficient", "Initial request has miss penalty (cold cache)", "Read-heavy dashboards, user profiles"],
            ["Write-Through", "Write to DB and update cache simultaneously in transaction", "Zero stale data; warm cache ready immediately", "Higher write latency; caches unused writes", "Real-time stock tickers, user status"],
            ["Eviction-on-Mutation", "Write to DB, then delete (del) cache key", "Simple, impossible to have stale sync bugs", "Next read experiences cache miss", "General CRUD APIs, e-commerce products"],
          ]}
        />

        <QuickCheck
          question="Why is Eviction-on-Mutation (deleting the key upon update) generally safer than Write-Through in concurrent systems?"
          answer="Because concurrent writes to the database could arrive out-of-order at the cache in Write-Through mode, leaving stale data; deleting the key guarantees the next read fetches fresh data from PostgreSQL."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
