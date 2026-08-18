"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-13 GUARDS)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Pipes"
          description="Key takeaways to keep in mind when handling API parameters."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Transformation &amp; Validation</h5>
            <p className="text-xs text-ds-text-sub">Pipes cast string inputs to primitives or DTO classes, and reject bad data.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. 9 Built-in Pipes</h5>
            <p className="text-xs text-ds-text-sub">ParseIntPipe, ParseBoolPipe, ParseUUIDPipe, and ValidationPipe solve 95% of tasks.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Pipe Chaining</h5>
            <p className="text-xs text-ds-text-sub">Chain DefaultValuePipe before ParseIntPipe to support optional pagination.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Pipe Scopes</h5>
            <p className="text-xs text-ds-text-sub">Bind at parameter, method, controller, or global level depending on scope.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔍 🛡️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-12 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered data transformation, parameter sanitization, and pipe chaining in NestJS. Next, learn how to protect routes with authentication and role-based access control.
        </p>

        <Link
          href="/learn/nestjs/nj13-guards"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-13: Guards &amp; Authorization →
        </Link>
      </div>

      <QuickCheck
        question="What is the next lesson in Phase 03?"
        answer="NJ-13: Guards & Authorization (CanActivate, ExecutionContext, Reflector, and Role-Based Access Control)."
      />
    </SectionContainer>
  );
}
