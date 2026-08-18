"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-30 S3 UPLOADS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS OpenAPI &amp; Swagger Documentation"
          description="Key takeaways on live documentation, CLI AST reflection, and SDK generation."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Live Interactive Swagger UI</h5>
            <p className="text-xs text-ds-text-sub">Host /api/docs interactive documentation allowing frontend and QA to test endpoints live.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. CLI AST Plugin</h5>
            <p className="text-xs text-ds-text-sub">Eliminates repetitive @ApiProperty() annotations by auto-inspecting DTOs during compile time.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. JWT Authorization Padlock</h5>
            <p className="text-xs text-ds-text-sub">Authenticate with @ApiBearerAuth() to inject Bearer tokens across all authenticated routes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Frontend SDK Generation</h5>
            <p className="text-xs text-ds-text-sub">Export openapi.json to auto-generate 100% typed React Query and Axios clients with Orval.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 📖 🚀</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-29 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered OpenAPI specifications, interactive Swagger UI, and automated SDK generation! Next, learn how to handle streaming multipart file uploads and direct-to-S3 pre-signed URLs in NJ-30!
        </p>

        <Link
          href="/learn/nestjs/nj30-file-uploads"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-30: File Uploads &amp; AWS S3 →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 06?"
        answer="NJ-30: File Uploads & AWS S3 Storage (@nestjs/platform-express Multer, FileInterceptor, MaxFileSizeValidator, FileTypeValidator, and AWS SDK S3 Pre-Signed Upload URLs)."
      />
    </SectionContainer>
  );
}
