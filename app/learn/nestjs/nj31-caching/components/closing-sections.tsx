"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-32 DEPLOYMENT)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Caching &amp; Redis Architecture"
          description="Key takeaways on memory acceleration, CacheInterceptor, and distributed locking."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. CacheInterceptor</h5>
            <p className="text-xs text-ds-text-sub">Auto-intercepts GET routes and serves sub-millisecond responses directly from Redis.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Cache-Aside Pattern</h5>
            <p className="text-xs text-ds-text-sub">Check cache first &rarr; on miss, read database and write to Redis with explicit TTL.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Invalidation on Mutation</h5>
            <p className="text-xs text-ds-text-sub">Always call cache.del(key) when updating or deleting database entities.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Distributed Locks</h5>
            <p className="text-xs text-ds-text-sub">Use Redis atomic SET NX PX to prevent race conditions during ticket and seat booking.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔴 ⚡</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-31 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered in-memory caching, distributed Redis stores, and cache stampede prevention! Next, prepare for the <strong>GRAND FINALE</strong> of the entire NestJS curriculum: <strong>NJ-32: Production Deployment, Multi-Stage Docker &amp; Health Checks</strong>!
        </p>

        <Link
          href="/learn/nestjs/nj32-deployment"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-32: Production Deployment &amp; Docker (Grand Finale!) →
        </Link>
      </div>

      <QuickCheck
        question="What is the final lesson in Phase 06 and the entire NestJS Master Roadmap?"
        answer="NJ-32: Production Deployment, Docker & DevOps (Multi-stage Dockerfiles, Terminus Health Checks, Graceful Shutdown, PM2/Cluster Mode, and CI/CD GitHub Actions)."
      />
    </SectionContainer>
  );
}
