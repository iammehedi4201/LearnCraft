"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-19 RBAC)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Authentication"
          description="Key takeaways on JWT tokens, password hashing, and Passport strategies."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Password Hashing with bcrypt</h5>
            <p className="text-xs text-ds-text-sub">Never save plain text passwords; always hash with bcrypt.hash(pass, 10).</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. LocalStrategy vs JwtStrategy</h5>
            <p className="text-xs text-ds-text-sub">Local verifies email/password on login; Jwt verifies bearer tokens on API routes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Dual Token Security</h5>
            <p className="text-xs text-ds-text-sub">Pair 15-minute Access Tokens with 7-day Refresh Tokens for revokeable sessions.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. JwtAuthGuard Protection</h5>
            <p className="text-xs text-ds-text-sub">Protects endpoints and attaches the validated user payload directly to req.user.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔐 🛡️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-18 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You now know how to build a rock-solid, production-grade JWT authentication pipeline in NestJS. Next, learn how to enforce granular role-based permissions and access control with RBAC!
        </p>

        <Link
          href="/learn/nestjs/nj19-rbac"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-19: RBAC &amp; Role-Based Authorization →
        </Link>
      </div>

      <QuickCheck
        question="What is the next lesson in Phase 04?"
        answer="NJ-19: RBAC & Role-Based Authorization (Hierarchical roles, permission matrices, CASL policy gates, and granular access control)."
      />
    </SectionContainer>
  );
}
