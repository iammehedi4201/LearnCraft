"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-14 INTERCEPTORS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Guards"
          description="Everything you need to remember about authorization and route security."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. CanActivate Interface</h5>
            <p className="text-xs text-ds-text-sub">Returns true to allow or false to automatically throw 403 Forbidden.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. ExecutionContext &amp; Reflector</h5>
            <p className="text-xs text-ds-text-sub">Read custom @Roles() decorators using reflector.getAllAndOverride().</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Global Guard + @Public()</h5>
            <p className="text-xs text-ds-text-sub">Industry-standard secure-by-default pattern for production applications.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. APP_GUARD Token</h5>
            <p className="text-xs text-ds-text-sub">Binds guards globally in AppModule while retaining full Dependency Injection.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🛂 🔒</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-13 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You now have production-grade mastery of NestJS Guards, token authentication, and Role-Based Access Control. Next, discover how Interceptors manipulate response streams using RxJS!
        </p>

        <Link
          href="/learn/nestjs/nj14-interceptors"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-14: Interceptors &amp; RxJS →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 03?"
        answer="NJ-14: Interceptors (Response transformation, logging execution time, caching with RxJS operators)."
      />
    </SectionContainer>
  );
}
