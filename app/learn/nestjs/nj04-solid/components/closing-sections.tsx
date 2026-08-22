"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 15 — QUICK MEMORY GUIDE & FINAL REVIEW
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={15} title="Quick Memory Guide & Final Review">
      {/* ── Quick Memory Guide ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Quick Memory Guide"
          description="Remember these 5 simple rules whenever you write code:"
          color="primary"
        />

        <div className="space-y-3 mb-8">
          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-center gap-4">
            <span className="h-10 w-10 rounded-xl bg-ds-feature-base text-ds-static-white flex items-center justify-center font-black text-lg shrink-0">S</span>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-ds-feature-dark">Single Responsibility</h5>
              <p className="text-sm font-semibold text-ds-text-strong mt-0.5">&quot;One class, one main job.&quot;</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-center gap-4">
            <span className="h-10 w-10 rounded-xl bg-ds-info-base text-ds-static-white flex items-center justify-center font-black text-lg shrink-0">O</span>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-ds-info-dark">Open / Closed</h5>
              <p className="text-sm font-semibold text-ds-text-strong mt-0.5">&quot;Add new behavior without constantly changing old code.&quot;</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-center gap-4">
            <span className="h-10 w-10 rounded-xl bg-ds-success-base text-ds-static-white flex items-center justify-center font-black text-lg shrink-0">L</span>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-ds-success-dark">Liskov Substitution</h5>
              <p className="text-sm font-semibold text-ds-text-strong mt-0.5">&quot;Every implementation keeps the contract&apos;s promises.&quot;</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-center gap-4">
            <span className="h-10 w-10 rounded-xl bg-ds-warning-base text-ds-static-white flex items-center justify-center font-black text-lg shrink-0">I</span>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-ds-warning-dark">Interface Segregation</h5>
              <p className="text-sm font-semibold text-ds-text-strong mt-0.5">&quot;Prefer small contracts shaped around client needs.&quot;</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex items-center gap-4">
            <span className="h-10 w-10 rounded-xl bg-ds-error-base text-ds-static-white flex items-center justify-center font-black text-lg shrink-0">D</span>
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-ds-error-dark">Dependency Inversion</h5>
              <p className="text-sm font-semibold text-ds-text-strong mt-0.5">&quot;Business rules depend on contracts; wiring chooses the tools.&quot;</p>
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Final Learning Goal ── */}
      <div className="mb-16">
        <div className="bg-ds-bg-weak p-8 rounded-2xl border border-ds-stroke-soft shadow-sm">
          <h4 className="font-black text-lg text-ds-text-strong mb-3 flex items-center gap-2">
            <span>🎯</span> Final Learning Goal
          </h4>
          <p className="text-sm text-ds-text-strong leading-relaxed font-medium">
            After this lesson, you should be able to explain each SOLID principle in simple words, identify basic SOLID problems in TypeScript code, and understand how NestJS architecture helps developers apply these principles.
          </p>
        </div>
      </div>

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Ready to Start Building!
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you understand OOP, Decorators, and SOLID Principles, you are fully prepared to build real NestJS applications!
        </p>
        <Link
          href="/learn/nestjs/nj05-setup"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-05: NestJS Setup & Installation →
        </Link>
      </div>

      <QuickCheck
        question="How are the Dependency Inversion Principle and NestJS dependency injection related?"
        answer="DIP is the design principle: high-level code should depend on abstractions. NestJS's DI container can supply the registered implementation, but using DI alone does not guarantee DIP. For a TypeScript interface, use a runtime token such as a symbol with @Inject(token)."
      />
    </SectionContainer>
  );
}
