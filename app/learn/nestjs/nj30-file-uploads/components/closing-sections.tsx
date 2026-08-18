"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-31 REDIS CACHING)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Production File Uploads &amp; S3 Architecture"
          description="Key takeaways on Multer interceptors, pre-signed upload security, and Sharp image resizing."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Multer Interceptors</h5>
            <p className="text-xs text-ds-text-sub">Use FileInterceptor and FileFieldsInterceptor to parse multipart streams safely in memory.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. ParseFilePipeBuilder</h5>
            <p className="text-xs text-ds-text-sub">Enforce strict file size limits and MIME type regexes before saving data.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Direct Pre-Signed URLs</h5>
            <p className="text-xs text-ds-text-sub">Offload multi-gigabyte video uploads directly to S3 without using backend server RAM.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Unique UUID Keys</h5>
            <p className="text-xs text-ds-text-sub">Always name cloud storage objects with crypto.randomUUID() to prevent file overwrites.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 ☁️ 🚀</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-30 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered Multer file handling, AWS S3 integration, and Pre-Signed direct uploads! Next, learn how to accelerate database reads by 100x using Redis in-memory caching in NJ-31!
        </p>

        <Link
          href="/learn/nestjs/nj31-caching"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-31: Caching &amp; Redis Integration →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 06?"
        answer="NJ-31: Caching & Redis Integration (@nestjs/cache-manager, cache-manager-redis-yet, CacheInterceptor, CacheKey, CacheTTL, and Redis Cache Invalidation)."
      />
    </SectionContainer>
  );
}
