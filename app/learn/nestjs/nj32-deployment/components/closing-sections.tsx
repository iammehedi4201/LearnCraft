"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — MASTER CURRICULUM GRADUATION & MASTERY
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Master Curriculum Graduation &amp; Production Mastery">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={14}
          title="Summary of Production Build &amp; Health Monitoring"
          description="Key takeaways on compiled artifacts, Terminus health indicators, and graceful termination."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Compiled Production Runtime</h5>
            <p className="text-xs text-ds-text-sub">Compile with &apos;nest build&apos; and execute &apos;node dist/main.js&apos; with native V8 optimization.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Terminus Health Indicators</h5>
            <p className="text-xs text-ds-text-sub">Exposes /health/live and /health/ready probes for automated infrastructure self-healing.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Graceful Teardown Hooks</h5>
            <p className="text-xs text-ds-text-sub">Enable app.enableShutdownHooks() to drain in-flight client requests on SIGTERM before exiting.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Strict Environment Validation</h5>
            <p className="text-xs text-ds-text-sub">Fail fast on startup if critical secrets like JWT_SECRET are missing or improperly configured.</p>
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
          Congratulations! You have completed all <strong>32 comprehensive modules</strong> across all <strong>8 core phases</strong> of the LearnCraft NestJS Master Curriculum:
          Fundamentals, Core Architecture, HTTP APIs, Request Lifecycle, Exception Handling, Auth &amp; Authorization, Automated Testing, and Production Mastery!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 max-w-5xl mx-auto mb-8 text-left">
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 01</span>
            <span className="text-ds-text-sub">Fundamentals</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 02</span>
            <span className="text-ds-text-sub">Architecture</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 03</span>
            <span className="text-ds-text-sub">HTTP APIs</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 04</span>
            <span className="text-ds-text-sub">Lifecycle</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 05</span>
            <span className="text-ds-text-sub">Exceptions</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 06</span>
            <span className="text-ds-text-sub">Auth &amp; RBAC</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 07</span>
            <span className="text-ds-text-sub">Testing</span>
          </div>
          <div className="p-2.5 rounded-xl bg-ds-bg-white/80 border border-ds-stroke-soft text-[11px]">
            <span className="font-bold text-ds-feature-dark block">Phase 08</span>
            <span className="text-ds-text-sub">Mastery</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/learn/nestjs/capstone-1-task-flow-api"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-lg shadow-ds-feature-base/30 cursor-pointer"
          >
            Launch Final Capstone Lab 🏆
          </Link>
          <Link
            href="/learn/nestjs"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-ds-text-sub bg-ds-bg-white hover:bg-ds-bg-weak border border-ds-stroke-soft transition-all"
          >
            Return to Curriculum Hub 🏠
          </Link>
        </div>
      </div>

      <QuickCheck
        question="You have completed all 32 modules! What is the primary architectural takeaway of NestJS?"
        answer="Modularity, Inversion of Control (DI), separation of concerns between DTOs, controllers, services, and repositories, and structured request pipeline filters and guards."
      />
    </SectionContainer>
  );
}
