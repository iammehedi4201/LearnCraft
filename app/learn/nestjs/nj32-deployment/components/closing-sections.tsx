"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — MASTER CURRICULUM GRADUATION & CERTIFICATION
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Master Curriculum Graduation &amp; Production Mastery">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of Production DevOps in NestJS"
          description="Key takeaways on multi-stage Docker builds, Kubernetes probes, and zero-downtime rolling deploys."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Multi-Stage Alpine Docker</h5>
            <p className="text-xs text-ds-text-sub">90MB ultra-light production image stripping compilers and running as non-root &apos;USER node&apos;.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Terminus Health Checks</h5>
            <p className="text-xs text-ds-text-sub">Exposes /health/live and /health/ready probes for automated Kubernetes and AWS self-healing.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Graceful Shutdown</h5>
            <p className="text-xs text-ds-text-sub">Enable shutdown hooks to drain active customer transactions on SIGTERM before stopping.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Automated CI/CD Gates</h5>
            <p className="text-xs text-ds-text-sub">Enforce linters, TypeScript checks, and test suites on every pull request with GitHub Actions.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Master Graduation Capstone Celebration ── */}
      <div className="p-10 bg-gradient-to-br from-ds-feature-lighter via-ds-success-lighter to-ds-info-lighter border-2 border-ds-feature-base rounded-3xl shadow-md text-center">
        <span className="text-6xl block mb-4 animate-bounce">🎓 🏆 🚀 👑</span>
        <h3 className="text-3xl font-black text-ds-text-strong mb-3 font-display">
          NestJS Master Architect Certification Achieved!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-3xl mx-auto leading-relaxed mb-6">
          Congratulations! You have completed all <strong>32 comprehensive modules</strong> across all <strong>6 phases</strong> of the LearnCraft NestJS Master Curriculum:
          TypeScript Foundations, Core Architecture, Request Pipeline, Authentication &amp; RBAC, Database &amp; Prisma, and Production DevOps!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 max-w-4xl mx-auto mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 01</span>
            <span className="text-ds-text-sub">TypeScript &amp; OOP</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 02</span>
            <span className="text-ds-text-sub">Core Architecture</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 03</span>
            <span className="text-ds-text-sub">Request Pipeline</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 04</span>
            <span className="text-ds-text-sub">Auth &amp; Security</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 05</span>
            <span className="text-ds-text-sub">Prisma &amp; SQL</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 06</span>
            <span className="text-ds-text-sub">DevOps &amp; Docker</span>
          </div>
        </div>

        <Link
          href="/learn/nestjs"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-lg shadow-ds-feature-base/30"
        >
          Return to NestJS Master Curriculum Hub 🏠
        </Link>
      </div>

      <QuickCheck
        question="You have completed all 32 modules! What is the single most important golden rule of production NestJS engineering?"
        answer="Stateless containers, fail-fast schema validation, type-safe dependency injection, and comprehensive test suites running in automated CI/CD pipelines!"
      />
    </SectionContainer>
  );
}
