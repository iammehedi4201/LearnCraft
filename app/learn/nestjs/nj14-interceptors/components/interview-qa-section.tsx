"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (INTERCEPTORS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What is the key architectural difference between Middleware and Interceptors?",
      a: "Middleware runs only BEFORE the router selects a route handler, and it has no knowledge of which controller or method is being called.\n\nInterceptors have full access to ExecutionContext and wrap both BEFORE and AFTER the route handler, allowing response transformation, caching, and timing measurements.",
    },
    {
      q: "Q2: What is the role of CallHandler.handle() inside an Interceptor?",
      a: "CallHandler.handle() triggers the execution of the route handler (controller method) and returns an RxJS Observable of the result. If handle() is omitted, the controller method never runs.",
    },
    {
      q: "Q3: How do you implement response envelope transformation globally?",
      a: "Create an interceptor implementing NestInterceptor, use the RxJS map() operator on next.handle() to wrap the returned data in { success: true, data, timestamp }, and register it with APP_INTERCEPTOR in AppModule.",
    },
    {
      q: "Q4: How can an Interceptor short-circuit execution to serve cached data?",
      a: "By returning an RxJS of(cachedResponse) Observable directly instead of calling next.handle(). Because next.handle() is not invoked, NestJS sends the cached response immediately and skips controller execution.",
    },
    {
      q: "Q5: Explain the execution order of nested Interceptors (The Onion Architecture).",
      a: "Interceptors execute 'Outside-In' on the incoming request (Global -> Controller -> Method), and 'Inside-Out' on the returned response (Method -> Controller -> Global).",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Interceptors">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on RxJS streams and interceptor lifecycle."
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
