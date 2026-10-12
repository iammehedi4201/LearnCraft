"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — FINAL REVIEW & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Final Review & Next Steps">
      {/* ── Summary Cards ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Dependency Injection"
          description="Everything you need to remember about wiring dependencies and providers."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Loose Coupling</h5>
            <p className="text-xs text-ds-text-sub">Classes ask for dependencies instead of creating them with 'new'.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. IoC Container</h5>
            <p className="text-xs text-ds-text-sub">NestJS builds the dependency graph and resolves singletons automatically.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Custom Tokens</h5>
            <p className="text-xs text-ds-text-sub">Use strings/symbols with <code>@Inject(&apos;TOKEN&apos;)</code> when interfaces vanish at runtime.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. useValue &amp; useFactory</h5>
            <p className="text-xs text-ds-text-sub">Perfect for mock unit testing and dynamic async database initializations.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Up: Modules &amp; Architecture (NJ-09)
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you know how Dependency Injection wires services together, let&apos;s bundle your controllers and services into clean, encapsulated feature packages with <strong>NestJS Modules</strong>!
        </p>
        <Link
          href="/learn/nestjs/nj06-modules"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-09: Modules &amp; Architecture →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after Dependency Injection?"
        answer="Modules & Architecture (NJ-09) — learning how to encapsulate controllers and providers into reusable feature boundaries."
      />
    </SectionContainer>
  );
}
