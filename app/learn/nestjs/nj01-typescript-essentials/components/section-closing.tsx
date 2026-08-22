"use client";

import Link from "next/link";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 19 — SUMMARY, BEST PRACTICES & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function SectionClosing() {
  return (
    <SectionContainer number={19} title="Summary & Next Steps">
      {/* ── Key Takeaways Grid ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What You Have Mastered"
          description="A complete recap of the core TypeScript concepts that power NestJS backends."
          color="emerald"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              1. Primitives &amp; Types
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              <code className="text-ds-feature-base">string</code>, <code className="text-ds-feature-base">number</code>, <code className="text-ds-feature-base">boolean</code>, and literal union types prevent invalid data from entering your backend.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              2. Tuples &amp; Enums
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Fixed-length tuples and String Enums guarantee strict role-based access control (RBAC) and clean database columns.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              3. Interfaces &amp; DTOs
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Object blueprints define contracts for controllers, services, repositories, and incoming HTTP request payloads.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              4. Utility Types
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              <code className="text-ds-feature-base">Omit</code>, <code className="text-ds-feature-base">Partial</code>, and <code className="text-ds-feature-base">Pick</code> eliminate schema duplication across Create, Update, and Response models.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              5. Generics (&lt;T&gt;)
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              Reusable type parameters allow building universal API response wrappers and generic database repositories.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              6. Type Guards &amp; Narrowing
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              <code className="text-ds-feature-base">typeof</code>, <code className="text-ds-feature-base">instanceof</code>, <code className="text-ds-feature-base">in</code>, and Discriminated Unions verify types safely at runtime without crashing.
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Celebration & Next Module ── */}
      <div className="mb-8">
        <div className="bg-ds-bg-weak p-8 lg:p-12 rounded-3xl border border-ds-stroke-soft shadow-sm relative overflow-hidden text-center">
          <span className="text-5xl block mb-4">🎓</span>
          <h3 className="text-2xl lg:text-3xl font-black text-ds-text-strong mb-3 tracking-tight">
            Milestone 1 Completed: TypeScript Essentials
          </h3>
          <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-8">
            You now possess the foundational TypeScript expertise required to master NestJS. In the next module, you will learn how Classes, Constructors, Inheritance, and Encapsulation power NestJS Controllers and Dependency Injection.
          </p>

          <Link
            href="/learn/nestjs/nj02-oop-foundations"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-ds-feature-base hover:bg-ds-feature-dark text-ds-static-white font-black text-sm transition-all shadow-lg shadow-ds-feature-base/20 hover:scale-[1.02]"
          >
            <span>Continue to NJ-02: OOP Foundations</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}

// Re-export for legacy compatibility
export const SectionCommonMistakesAndSummary = SectionClosing;
