"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-28 TESTING)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of High-Performance Logging with Pino"
          description="Key takeaways on JSON structured logs, correlation tracing, and redaction security."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Structured JSON Format</h5>
            <p className="text-xs text-ds-text-sub">Outputs machine-parsable JSON lines that can be queried instantly in Datadog and Elasticsearch.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Correlation Tracing</h5>
            <p className="text-xs text-ds-text-sub">Binds unique X-Request-Id UUIDs to every log statement emitted during an HTTP lifecycle.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Automated Redaction</h5>
            <p className="text-xs text-ds-text-sub">Censors passwords, tokens, and credit cards before they leave the server.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Zero Main-Thread Blocking</h5>
            <p className="text-xs text-ds-text-sub">Pino processes logs asynchronously in worker threads without freezing the Node.js event loop.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 📝 ⚡</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-28 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered structured JSON logging, distributed correlation IDs, and log redaction! Next, learn how to accelerate database reads by 100x using Redis in-memory caching in NJ-29!
        </p>

        <Link
          href="/learn/nestjs/nj31-caching"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-29: Caching &amp; Redis Integration →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after Logging?"
        answer="NJ-29: Caching & Redis Integration (@nestjs/cache-manager, cache-manager-redis-yet, CacheInterceptor, and Redis cache invalidation)."
      />
    </SectionContainer>
  );
}
