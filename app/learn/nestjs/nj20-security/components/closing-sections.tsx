"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — PHASE 04 GRAND FINALE & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Phase 04 Grand Finale & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Application Security Hardening"
          description="Key takeaways on Helmet headers, CORS policies, and rate-limiting."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Helmet Headers</h5>
            <p className="text-xs text-ds-text-sub">Sets CSP, HSTS, X-Frame-Options, and hides Express powered-by headers.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Strict CORS Whitelists</h5>
            <p className="text-xs text-ds-text-sub">Only allow trusted frontend domains with credentials: true.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Throttler Rate Limiting</h5>
            <p className="text-xs text-ds-text-sub">Limit login attempts to 5 per minute to prevent brute-force attacks.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Mass Assignment Defense</h5>
            <p className="text-xs text-ds-text-sub">ValidationPipe with whitelist: true strips unauthorized payload properties.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Phase 04 Capstone Celebration ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🏆 🔒</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Phase 04 (Authentication &amp; Security) Complete!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          Outstanding work! You have completed all 4 lessons of Phase 04:
          <strong> Custom Decorators (NJ-17)</strong>, <strong>JWT &amp; Passport Auth (NJ-18)</strong>, <strong>RBAC &amp; CASL (NJ-19)</strong>, and <strong>Security Hardening (NJ-20)</strong>!
        </p>

        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Return to NestJS Roadmap Hub 🏠
        </Link>
      </div>

      <QuickCheck
        question="What is the next phase in the NestJS curriculum?"
        answer="Phase 05: Database Layer with Prisma ORM & PostgreSQL (NJ-21 to NJ-25) — models, migrations, relations, transactions, and repository patterns!"
      />
    </SectionContainer>
  );
}
