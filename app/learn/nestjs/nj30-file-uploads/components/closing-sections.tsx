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
          Stage 6 Production Engineering Complete!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered production observability, Redis caching, Swagger documentation, and file handling! Now let&apos;s enter Stage 7 to test and containerize your application for deployment!
        </p>

        <Link
          href="/learn/nestjs/nj28-testing"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-31: Automated Testing with Jest →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after File Uploads?"
        answer="NJ-31: Automated Testing (unit testing services with Jest mocks, Prisma testing, and Supertest E2E)."
      />
    </SectionContainer>
  );
}
