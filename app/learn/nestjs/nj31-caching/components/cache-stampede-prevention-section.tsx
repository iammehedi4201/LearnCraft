"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — CACHE STAMPEDE (THUNDERING HERD) PREVENTION
// ═══════════════════════════════════════════════════════════

export function CacheStampedePreventionSection() {
  return (
    <SectionContainer number={7} title="Cache Stampede (Thundering Herd) Prevention">
      {/* ── 7.1 Stampede Prevention ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Protecting Databases when Hot Keys Expire"
          description="How to prevent 5,000 simultaneous database queries when a popular cache key expires."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🐃</span> The Thundering Herd Problem
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If your homepage cache key <code>homepage_catalog</code> expires, and 10,000 active users reload the page at that exact millisecond, all 10,000 requests experience a cache miss and execute the heavy query against PostgreSQL simultaneously, crashing the database.
          </p>
          <EnhancedCodeBlock
            code={`// Solution: Mutex-Protected Cache-Aside Helper
async function getOrSetWithLock<T>(
  cache: Cache,
  key: string,
  fetchFn: () => Promise<T>,
  ttlMs: number,
): Promise<T> {
  const cached = await cache.get<T>(key);
  if (cached) return cached;

  const lockKey = \`lock:\${key}\`;
  // ⭐ Attempt to acquire exclusive 5-second lock:
  const acquired = await cache.set(lockKey, 'locked', 5000);

  if (acquired) {
    try {
      const freshData = await fetchFn();
      // Add small random jitter (±10%) to prevent simultaneous future expiration:
      const jitterTtl = ttlMs + Math.floor(Math.random() * 5000);
      await cache.set(key, freshData, jitterTtl);
      return freshData;
    } finally {
      await cache.del(lockKey);
    }
  } else {
    // Another worker is already regenerating the cache! Wait 100ms and retry:
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getOrSetWithLock(cache, key, fetchFn, ttlMs);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always add random TTL Jitter (e.g. 60s ± 5s) to keys generated in batches so they don't all expire at the exact same second." />

        <QuickCheck
          question="What is TTL Jitter and how does it prevent cache stampedes?"
          answer="TTL Jitter adds a randomized offset (e.g. 60s + random(1-10s)) to cache expiration times, preventing thousands of keys set at the same time from expiring in unison."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
