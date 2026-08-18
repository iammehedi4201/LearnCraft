"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE CELEBRATION & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Capstone Celebration & Next Steps">
      {/* ── Summary Cards ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS DTOs & Validation"
          description="Everything you need to remember about securing and validating user data."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. DTOs Must Be Classes</h5>
            <p className="text-xs text-ds-text-sub">Classes exist at runtime in JS so decorator rules can be inspected.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. app.useGlobalPipes()</h5>
            <p className="text-xs text-ds-text-sub">Enables automatic 400 Bad Request validation across your whole app.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. whitelist: true</h5>
            <p className="text-xs text-ds-text-sub">Silently strips unauthorized attacker fields (Mass-Assignment protection).</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. PartialType()</h5>
            <p className="text-xs text-ds-text-sub">Creates UpdateDTOs in one line from CreateDTOs without repeating code.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Capstone Celebration ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🎉 🚀</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Congratulations! You Have Mastered Core NestJS Architecture!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have successfully completed the foundational NestJS journey: <strong>Project Setup (NJ-05)</strong>, <strong>Modules (NJ-06)</strong>, <strong>Controllers (NJ-07)</strong>, <strong>Services (NJ-08)</strong>, <strong>Dependency Injection (NJ-09)</strong>, and <strong>DTO &amp; Validation (NJ-10)</strong>!
        </p>

        <Link
          href="/learn"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Return to Course Dashboard 🏠
        </Link>
      </div>

      <QuickCheck
        question="What are the 6 foundational building blocks of NestJS you have now mastered?"
        answer="1. Project Architecture (NJ-05)\n2. Modules (NJ-06)\n3. Controllers (NJ-07)\n4. Services & Providers (NJ-08)\n5. Dependency Injection (NJ-09)\n6. DTOs & Validation (NJ-10)"
      />
    </SectionContainer>
  );
}
