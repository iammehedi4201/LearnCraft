"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — VISUAL 7-STEP REQUEST PIPELINE DIAGRAM
// ═══════════════════════════════════════════════════════════

export function LifecycleDiagramSection() {
  const steps = [
    {
      num: "1",
      badge: "Inbound",
      title: "Middleware",
      sub: "Global & Module Middleware",
      desc: "Raw req/res manipulation (CORS, body-parser, session cookies, raw loggers). Has access to next().",
      color: "border-ds-away-base bg-ds-away-lighter/20 text-ds-away-dark",
      dot: "bg-ds-away-base",
    },
    {
      num: "2",
      badge: "Security",
      title: "Guards",
      sub: "CanActivate Check",
      desc: "Checks authentication tokens & user roles. Returns true (continue) or throws 403 Forbidden / 401 Unauthorized.",
      color: "border-ds-error-base bg-ds-error-lighter/20 text-ds-error-dark",
      dot: "bg-ds-error-base",
    },
    {
      num: "3",
      badge: "Aspect Pre",
      title: "Interceptors (Pre)",
      sub: "Before Route Handler",
      desc: "Runs code before controller method execution. Starts execution timers, logs payload arrival, checks cache.",
      color: "border-ds-feature-base bg-ds-feature-lighter/20 text-ds-feature-dark",
      dot: "bg-ds-feature-base",
    },
    {
      num: "4",
      badge: "Data Validation",
      title: "Pipes",
      sub: "PipeTransform",
      desc: "Parses path parameters (ParseIntPipe) and validates request body with class-validator. Throws 400 Bad Request if invalid.",
      color: "border-ds-warning-base bg-ds-warning-lighter/20 text-ds-warning-dark",
      dot: "bg-ds-warning-base",
    },
    {
      num: "5",
      badge: "Business Logic",
      title: "Controller & Service",
      sub: "Route Handler Execution",
      desc: "Your controller method executes and calls injectable services/database queries to compute the final response.",
      color: "border-ds-success-base bg-ds-success-lighter/20 text-ds-success-dark",
      dot: "bg-ds-success-base",
    },
    {
      num: "6",
      badge: "Aspect Post",
      title: "Interceptors (Post)",
      sub: "After Route Handler",
      desc: "Transforms response data (RxJS map operator), calculates duration elapsed, caches result in Redis.",
      color: "border-ds-feature-base bg-ds-feature-lighter/20 text-ds-feature-dark",
      dot: "bg-ds-feature-base",
    },
    {
      num: "7",
      badge: "Safety Net",
      title: "Exception Filters",
      sub: "Catch-All Error Handler",
      desc: "If any step throws an error, exception filters catch it and format a structured JSON error response.",
      color: "border-ds-error-base bg-ds-error-lighter/20 text-ds-error-dark",
      dot: "bg-ds-error-base",
    },
  ];

  return (
    <SectionContainer number={2} title="Visual 7-Step Request Pipeline">
      {/* ── 2.1 The Visual Flowchart ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Step-by-Step Flowchart"
          description="Trace the exact path of an HTTP request from arrival to response delivery."
          color="sky"
        />

        <div className="relative border-l-2 border-ds-stroke-soft ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-6 my-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`p-5 rounded-2xl border ${step.color} shadow-sm relative transition-all hover:scale-[1.01]`}
            >
              {/* Connector Dot */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-6 w-5 h-5 rounded-full ${step.dot} border-4 border-ds-bg-white shadow-sm flex items-center justify-center`}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-xs px-2 py-0.5 rounded bg-ds-bg-white border border-ds-stroke-soft">
                    STEP {step.num}
                  </span>
                  <h4 className="font-bold text-base text-ds-text-strong font-display">
                    {step.title}
                  </h4>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ds-text-soft bg-ds-bg-white px-2 py-0.5 rounded-full border border-ds-stroke-soft">
                  {step.sub}
                </span>
              </div>

              <p className="text-xs text-ds-text-sub leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <QuickCheck
          question="Does a Guard execute BEFORE or AFTER Pipes?"
          answer="A Guard executes BEFORE Pipes. NestJS verifies whether the user is allowed to access the route before spending resources parsing and validating the request payload."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
