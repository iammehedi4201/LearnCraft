"use client";

import Link from "next/link";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 14 — CAPSTONE ARCHITECTURE & NEXT STEPS
// ═══════════════════════════════════════════════════════════

export function ClosingSections() {
  return (
    <SectionContainer number={14} title="Capstone Architecture & Next Steps">
      {/* ── Summary Cards ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Summary of NestJS Modules"
          description="Everything you need to remember about organizing NestJS apps."
          color="primary"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-feature-dark mb-1">1. Self-Contained Boxes</h5>
            <p className="text-xs text-ds-text-sub">Modules group related controllers and providers into neat, maintainable packages.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-info-dark mb-1">2. Private by Default</h5>
            <p className="text-xs text-ds-text-sub">Providers are private to their own module until explicitly exported.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">3. The 4 Properties</h5>
            <p className="text-xs text-ds-text-sub"><code>controllers</code>, <code>providers</code>, <code>imports</code>, and <code>exports</code>.</p>
          </div>

          <div className="p-4 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft">
            <h5 className="font-bold text-xs text-ds-warning-dark mb-1">4. Global & Dynamic</h5>
            <p className="text-xs text-ds-text-sub">Use <code>@Global()</code> for app-wide tools and <code>.forRoot()</code> for custom configs.</p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Next Step Card ── */}
      <div className="p-6 bg-ds-success-lighter border border-ds-success-base rounded-2xl">
        <h4 className="font-bold text-base mb-2 text-ds-success-dark flex items-center gap-2">
          <span>🚀</span> Next Up: NestJS Controllers (NJ-07)
        </h4>
        <p className="text-sm text-ds-text-strong leading-relaxed mb-4">
          Now that you know how modules hold your application together, let&apos;s master <strong>Controllers</strong> — the front door that handles HTTP requests (GET, POST, PUT, DELETE), route parameters, and query strings!
        </p>
        <Link
          href="/learn/nestjs/nj07-controllers"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-ds-static-white bg-ds-feature-base hover:bg-ds-feature-dark transition-all shadow-sm shadow-ds-feature-base/15"
        >
          Proceed to NJ-07: NestJS Controllers →
        </Link>
      </div>

      <QuickCheck
        question="What is the next topic after NestJS Modules?"
        answer="NestJS Controllers (NJ-07) — learning how to handle HTTP routes, request bodies, query params, and status codes."
      />
    </SectionContainer>
  );
}
