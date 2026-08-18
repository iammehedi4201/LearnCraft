"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (EXCEPTION FILTERS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What is the primary purpose of an Exception Filter in NestJS?",
      a: "An Exception Filter provides centralized, declarative error handling. It catches unhandled exceptions thrown across the application and transforms them into predictable, standardized JSON error responses.",
    },
    {
      q: "Q2: How do you configure an Exception Filter to catch ALL unhandled errors, not just HttpExceptions?",
      a: "Use the @Catch() decorator without passing any arguments. This instructs NestJS to route all errors (including raw Node.js Error instances and database crashes) to that filter.",
    },
    {
      q: "Q3: What is the difference between ArgumentsHost and ExecutionContext in NestJS?",
      a: "ArgumentsHost provides utilities to extract raw protocol arguments (e.g. host.switchToHttp().getRequest()).\n\nExecutionContext extends ArgumentsHost and adds reflection methods (context.getClass() and context.getHandler()) to inspect target controller and handler metadata.",
    },
    {
      q: "Q4: How do you ensure global Exception Filters have access to Dependency Injection (e.g. LoggerService or ConfigService)?",
      a: "Register the filter in AppModule providers using the APP_FILTER token:\n{ provide: APP_FILTER, useClass: AllExceptionsFilter }.",
    },
    {
      q: "Q5: How do you build an Exception Filter that works seamlessly across Express and Fastify?",
      a: "Inject HttpAdapterHost from '@nestjs/core' and use this.httpAdapterHost.httpAdapter.reply() instead of calling Express-specific response.status().json().",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Exception Filters">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on error handling architecture and exception filters."
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
