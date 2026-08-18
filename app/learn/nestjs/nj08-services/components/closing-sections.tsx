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
          title="Summary of NestJS Services"
          description="Everything you need to remember about building and managing providers."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. @Injectable()</h5>
            <p className="text-xs text-ds-text-sub">Marks classes as providers managed by NestJS's IoC container.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Singletons by Default</h5>
            <p className="text-xs text-ds-text-sub">One single instance is created and shared across the application for peak speed.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Constructor Injection</h5>
            <p className="text-xs text-ds-text-sub">Controllers ask for services via <code>constructor(private readonly svc: Service)</code>.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Custom Providers</h5>
            <p className="text-xs text-ds-text-sub">Use <code>useValue</code> and <code>useFactory</code> for dynamic configs and mocks.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Up: Dependency Injection Deep Dive (NJ-09)
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you know how to write services, let&apos;s master <strong>Dependency Injection</strong> — the magic engine under the hood of NestJS that connects everything automatically!
        </p>
        <Link
          href="/learn/nestjs/nj09-dependency-injection"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-09: Dependency Injection →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after Services?"
        answer="Dependency Injection (NJ-09) — exploring how NestJS resolves, wires, and manages dependencies under the hood."
      />
    </SectionContainer>
  );
}
