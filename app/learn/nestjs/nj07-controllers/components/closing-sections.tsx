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
          title="Summary of NestJS Controllers"
          description="Everything you need to remember about building route handlers."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. @Controller('prefix')</h5>
            <p className="text-xs text-ds-text-sub">Sets the common base URL path for all route methods in the class.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. HTTP Method Decorators</h5>
            <p className="text-xs text-ds-text-sub"><code>@Get()</code>, <code>@Post()</code>, <code>@Put()</code>, <code>@Patch()</code>, and <code>@Delete()</code> map methods to REST actions.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. Request Decorators</h5>
            <p className="text-xs text-ds-text-sub"><code>@Param()</code> for URL IDs, <code>@Body()</code> for JSON payloads, <code>@Query()</code> for search filters.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Keep Controllers Thin</h5>
            <p className="text-xs text-ds-text-sub">Controllers handle HTTP traffic and delegate all business logic to Services!</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Up: NestJS Services & Providers (NJ-08)
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you know how controllers receive HTTP requests, let&apos;s build <strong>Services</strong> — where business logic, database queries, and data processing live!
        </p>
        <Link
          href="/learn/nestjs/nj08-services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-08: NestJS Services →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after Controllers?"
        answer="NestJS Services (NJ-08) — learning where business logic, database calculations, and helper operations live."
      />
    </SectionContainer>
  );
}
