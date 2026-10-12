"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — MILESTONE SUMMARY & NEXT STEP (NJ-14 SEEDING)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={14}
          title="Summary of Domain Modeling & Entities"
          description="Key takeaways on rich entities, aggregate roots, and encapsulation in NestJS."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Rich Entities Over Anemic Bags</h5>
            <p className="text-xs text-ds-text-sub">Encapsulate invariants, private properties, and state mutation methods directly inside domain classes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Decouple Network from Domain</h5>
            <p className="text-xs text-ds-text-sub">Use DTOs for HTTP input/output and map them to Domain Entities inside your NestJS services.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Aggregate Root Boundaries</h5>
            <p className="text-xs text-ds-text-sub">Modify child entities through their parent aggregate root to guarantee transactional invariants.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Secure Serialization</h5>
            <p className="text-xs text-ds-text-sub">Never leak internal hashes or tokens; use ClassSerializerInterceptor with @Exclude() or dedicated DTOs.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🏛️ 📦</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-13 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered domain entities, aggregates, and value objects in NestJS! Next, learn how to initialize and seed test data reliably using NestJS lifecycle hooks in NJ-14!
        </p>

        <Link
          href="/learn/nestjs/nj23-migrations-seeding"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-14: State Seeding &amp; Lifecycle Hooks →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in the NestJS Building HTTP APIs progression?"
        answer="NJ-14: State Seeding & Lifecycle Hooks (OnModuleInit, standalone seeding scripts, and application bootstrap data)."
      />
    </SectionContainer>
  );
}
