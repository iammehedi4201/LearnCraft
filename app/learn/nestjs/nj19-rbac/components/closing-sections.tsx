"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-20 SECURITY)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS RBAC & Authorization"
          description="Key takeaways on role enums, RolesGuard, and attribute-based permissions."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Typed Role Enums</h5>
            <p className="text-xs text-ds-text-sub">Always use TypeScript enums instead of raw strings to avoid typo vulnerabilities.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Reflector &amp; RolesGuard</h5>
            <p className="text-xs text-ds-text-sub">Read required roles via reflector.getAllAndOverride() and compare against user.role.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Guard Sequencing</h5>
            <p className="text-xs text-ds-text-sub">Always apply @UseGuards(JwtAuthGuard, RolesGuard) so request.user is defined.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. CASL for ABAC</h5>
            <p className="text-xs text-ds-text-sub">Use CASL when permissions depend on record ownership or resource attributes.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🛡️ 👑</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-19 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered role-based and attribute-based authorization in NestJS! Next, learn how to harden your server against DDoS, brute-force attacks, and web vulnerabilities in NJ-20!
        </p>

        <Link
          href="/learn/nestjs/nj20-security"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-20: Security Hardening (Phase 04 Finale) →
        </Link>
      </div>

      <QuickCheck
        question="What is the final lesson in Phase 04?"
        answer="NJ-20: Security Hardening (Rate-limiting with Throttler, Helmet security headers, CORS origin whitelisting, and payload sanitization)."
      />
    </SectionContainer>
  );
}
