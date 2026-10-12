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

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 ⚙️ 🛡️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-19 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered low-level HTTP manipulation with NestJS Middleware! Next, move one layer deeper into route protection and authorization gates with Guards in NJ-20!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/learn/nestjs/nj13-guards"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
          >
            Proceed to NJ-20: Guards &amp; Route Gates →
          </Link>
          <Link
            href="/learn/nestjs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-text-strong bg-ds-bg-white hover:bg-ds-bg-weak border border-ds-stroke-soft transition-all shadow-sm"
          >
            NestJS Overview 🏠
          </Link>
        </div>
      </div>

      <QuickCheck
        question="What is the next topic after Middleware?"
        answer="NJ-20: Guards & Route Gates (CanActivate, ExecutionContext, and route authorization)."
      />
    </SectionContainer>
  );
}
