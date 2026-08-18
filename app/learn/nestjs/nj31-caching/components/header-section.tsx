"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (CACHING & REDIS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: High-Performance Caching with Redis">
      {/* ── 1.1 Why Cache ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="From 200ms Database Queries to 0.5ms Memory Lookups"
          description="How in-memory Redis caching protects PostgreSQL databases from heavy read traffic spikes."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> The Database Bottleneck
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In modern applications, <strong>90% of requests are reads</strong> (fetching product catalogs, viewing user profiles, reading trending feed posts).
          </p>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If 100,000 concurrent users hit PostgreSQL for the same homepage products, database CPU spikes to 100%, connections pool out, and response times slow from 50ms to 4,000ms.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            By caching the result in <strong>Redis (in-memory key-value store)</strong> for 60 seconds, only 1 request touches PostgreSQL. The other 99,999 requests return from RAM in <strong>sub-millisecond speed</strong>!
          </p>
        </WhyBox>

        <AnalogyBox title="The Sticky Note on the Desk vs The Underground Archive Vault">
          <p className="mb-2">
            Think of caching like finding answers in an office:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>PostgreSQL (The Underground Archive Vault):</strong> Stored on durable hard disk drives. To answer &quot;What is our best-selling product?&quot;, an assistant takes the elevator down 5 floors, searches 10,000 heavy paper filing cabinets, and computes the answer (takes 10 minutes).
            </li>
            <li>
              <strong>Redis (The Sticky Note on your Monitor):</strong> Once computed, you write &quot;Best Seller: Item #42&quot; on a bright sticky note on your screen. Whenever someone asks, you read it in 0.1 seconds without leaving your chair!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Cache heavy, frequently read, rarely changed queries. Set an explicit TTL (Time-To-Live) on every cache key so stale data auto-evicts." />

        <QuickCheck
          question="Why is reading from Redis significantly faster than reading from PostgreSQL or MySQL?"
          answer="Redis stores all data directly in RAM (random access memory) and uses simple key-value lookups (O(1) time complexity), whereas relational databases perform disk I/O and complex table joins."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
