"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (REQUEST LIFECYCLE)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain the complete NestJS request lifecycle in exact order.",
      a: "The exact 7-step sequence is:\n1. Global & Module Middleware\n2. Guards (CanActivate - Authentication & Authorization)\n3. Interceptors (Pre-handler phase - stopwatch, cache check)\n4. Pipes (Validation & Transformation on parameters)\n5. Route Handler (Controller method + Service execution)\n6. Interceptors (Post-handler phase - RxJS map/tap response shaping)\n7. Exception Filters (Universal catch block if any error occurred)",
    },
    {
      q: "Q2: What is the primary difference between Middleware and Guards?",
      a: "Middleware is low-level and unaware of which route handler will execute. It does NOT have access to ExecutionContext or Reflector metadata.\n\nGuards have full access to ExecutionContext and can read metadata decorators (like @Roles('admin')) to make fine-grained authorization decisions.",
    },
    {
      q: "Q3: When would you use an Interceptor instead of a Pipe?",
      a: "Use Pipes when you need to validate or transform incoming parameters before they enter the handler.\n\nUse Interceptors when you need to wrap the entire execution (e.g. measure execution time, transform the return response value with RxJS, or short-circuit execution with cache).",
    },
    {
      q: "Q4: How can an Interceptor short-circuit a request and bypass the controller completely?",
      a: "By returning an RxJS observable directly (e.g. return of(cachedResponse)) instead of calling next.handle(). When next.handle() is omitted, NestJS sends the observable payload immediately and skips the controller handler.",
    },
    {
      q: "Q5: If an error is thrown inside a Pipe, does the Controller method execute?",
      a: "No. If a Pipe throws an exception (such as BadRequestException), the pipeline halts immediately, skips the controller method, and jumps directly to the Exception Filters.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Request Lifecycle">
      {/* ── 11.1 Interview Prep ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Essential Interview Questions"
          description="Prepare for senior NestJS technical interviews with these frequently asked questions."
          color="amber"
        />

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm transition-all"
            >
              <div
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
                  {item.q}
                </h4>
                <button className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
                  {openIdx === idx ? "Hide" : "Answer"}
                </button>
              </div>

              {openIdx === idx && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                  <strong className="text-ds-text-strong block mb-1">Interview-Winning Answer:</strong>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
