"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — FINAL REVIEW & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={12} title="Final Review & Next Steps">
      {/* ── Key Takeaways ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary: What You Have Learned"
          description="You now know how NestJS projects are built and structured!"
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. The CLI</h5>
            <p className="text-xs text-ds-text-sub"><code>nest new</code> creates full TypeScript projects in 30 seconds.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Project Anatomy</h5>
            <p className="text-xs text-ds-text-sub"><code>main.ts</code> starts the app, <code>app.module.ts</code> connects everything, and <code>app.controller.ts</code> handles routes.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Dev Server</h5>
            <p className="text-xs text-ds-text-sub"><code>npm run start:dev</code> runs in watch mode with instant auto-reload.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Fast Generators</h5>
            <p className="text-xs text-ds-text-sub"><code>nest g co</code> and <code>nest g s</code> create and link files automatically.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Up: NestJS Modules (NJ-06)
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you know how a NestJS project starts, it is time to understand the building block of all NestJS applications: <strong>Modules</strong>!
        </p>
        <Link
          href="/learn/nestjs/nj06-modules"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-06: NestJS Modules →
        </Link>
      </div>

      <QuickCheck
        question="Which command allows you to generate a new module without writing everything by hand?"
        answer="nest g mo <name> (e.g. nest g mo users)"
      />
    </SectionContainer>
  );
}
