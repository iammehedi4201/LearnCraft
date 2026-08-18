"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE SUMMARY & NEXT STEP (NJ-27 LOGGING)
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Milestone Summary &amp; Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Configuration Management"
          description="Key takeaways on environment schemas, fail-fast validation, and modular namespaces."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Global ConfigModule</h5>
            <p className="text-xs text-ds-text-sub">Register with isGlobal: true to make ConfigService available in every service without boilerplate.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Fail-Fast Validation</h5>
            <p className="text-xs text-ds-text-sub">Validate variables at startup with Joi or class-validator so missing secrets fail deployments immediately.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Namespaced registerAs</h5>
            <p className="text-xs text-ds-text-sub">Group variables into typed module factories (e.g. databaseConfig, jwtConfig) for direct injection.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Never Use process.env</h5>
            <p className="text-xs text-ds-text-sub">Always inject ConfigService to ensure type safety, defaults, and easy mockability in unit tests.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Milestone Card ── */}
      <div className="p-8 bg-gradient-to-br from-ds-feature-lighter to-ds-success-lighter border-2 border-ds-feature-base rounded-3xl shadow-sm text-center">
        <span className="text-5xl block mb-3">🎓 🔌 ⚙️</span>
        <h3 className="text-2xl font-black text-ds-text-strong mb-2 font-display">
          Module NJ-26 Completed!
        </h3>
        <p className="text-sm text-ds-text-sub max-w-2xl mx-auto leading-relaxed mb-6">
          You have mastered environment variable validation, namespaced configurations, and 12-factor architecture! Next, learn how to build high-performance structured JSON logging with NestJS-Pino in NJ-27!
        </p>

        <Link
          href="/learn/nestjs/nj27-logging"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-md shadow-ds-feature-base/20"
        >
          Proceed to NJ-27: Structured Logging with Pino →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic in Phase 06?"
        answer="NJ-27: Structured Logging with Pino (nestjs-pino, JSON log formats, correlation IDs, pino-pretty in dev, and Datadog/ELK integration)."
      />
    </SectionContainer>
  );
}
