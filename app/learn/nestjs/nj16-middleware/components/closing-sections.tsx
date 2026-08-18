"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — PHASE 03 GRAND FINALE & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Phase 03 Grand Finale & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Middleware"
          description="Key takeaways on low-level request manipulation and configuration."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. First in the Pipeline</h5>
            <p className="text-xs text-ds-text-sub">Executes before any router context or Guards are evaluated.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. NestModule.configure()</h5>
            <p className="text-xs text-ds-text-sub">Configure route matching, HTTP method filters, and route exclusions.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Third-Party Ecosystem</h5>
            <p className="text-xs text-ds-text-sub">Seamless integration with Helmet security, cookie-parser, and CORS.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Correlation ID Tracing</h5>
            <p className="text-xs text-ds-text-sub">Tags requests with unique trace IDs for production observability.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Phase 03 Capstone Celebration ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🏆 🚀</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Phase 03 (Request Pipeline &amp; Lifecycle) Complete!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          Congratulations! You have completed all 6 modules of the Request Pipeline:
          <strong> Request Lifecycle (NJ-11)</strong>, <strong>Pipes &amp; Transformation (NJ-12)</strong>, <strong>Guards &amp; Authorization (NJ-13)</strong>, <strong>Interceptors (NJ-14)</strong>, <strong>Exception Filters (NJ-15)</strong>, and <strong>Middleware (NJ-16)</strong>!
        </p>

        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Return to NestJS Roadmap Hub 🏠
        </Link>
      </div>

      <QuickCheck
        question="What are the next lessons in Phase 04 (Authentication & Security)?"
        answer="Phase 04 covers NJ-17: Custom Decorators, NJ-18: Authentication (JWT & Passport), NJ-19: RBAC Authorization, and NJ-20: Security Hardening (Helmet, CORS, Throttler)."
      />
    </SectionContainer>
  );
}
