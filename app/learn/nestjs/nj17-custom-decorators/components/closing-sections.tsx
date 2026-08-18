"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-18 AUTH JWT)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Custom Decorators"
          description="Everything you need to remember about building custom decorators."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. createParamDecorator()</h5>
            <p className="text-xs text-ds-text-sub">Extracts values from the HTTP request directly into route handler parameters.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Dynamic Data Argument</h5>
            <p className="text-xs text-ds-text-sub">Support @CurrentUser(&apos;email&apos;) alongside @CurrentUser() by checking the data param.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. applyDecorators()</h5>
            <p className="text-xs text-ds-text-sub">Combines multiple guards, metadata, and Swagger tags into a single @Auth() tag.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Reflector.createDecorator</h5>
            <p className="text-xs text-ds-text-sub">Modern type-safe metadata definition in NestJS 10+ without string keys.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🏷️ 🔑</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-17 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You now know how to build clean, type-safe custom decorators and composite wrappers. Next, master full production authentication with Passport, JWT tokens, and refresh strategies!
        </p>

        <Link
          href="/learn/nestjs/nj18-auth-jwt"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-18: Authentication (JWT &amp; Passport) →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 04?"
        answer="NJ-18: Authentication (JWT & Passport) - implementing login, password hashing with bcrypt, signing JWTs, and validating tokens with Passport strategies."
      />
    </SectionContainer>
  );
}
