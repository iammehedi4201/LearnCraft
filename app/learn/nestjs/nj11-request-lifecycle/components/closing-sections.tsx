"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-12 PIPES)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Key Lifecycle Takeaways"
          description="The essential rules to remember for development and interviews."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Middleware Runs First</h5>
            <p className="text-xs text-ds-text-sub">Good for CORS, raw body parsing, and logging without routing context.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-error-dark mb-1">2. Guards Block Access</h5>
            <p className="text-xs text-ds-text-sub">Authenticate tokens and check roles before pipes or controllers run.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">3. Pipes Validate Data</h5>
            <p className="text-xs text-ds-text-sub">Parse parameters and validate DTOs, throwing 400 Bad Request if invalid.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">4. Filters Catch Errors</h5>
            <p className="text-xs text-ds-text-sub">Format all exceptions uniformly across the whole application.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🚦 ⚡</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-11 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You now possess an expert understanding of how NestJS processes incoming requests from the moment they hit the server until the response is sent back to the client.
        </p>

        <Link
          href="/learn/nestjs/nj12-pipes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-12: Pipes &amp; Transformation →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 03?"
        answer="NJ-12: Pipes & Transformation (Deep dive into ParseIntPipe, ValidationPipe, and custom transformation pipes)."
      />
    </SectionContainer>
  );
}
