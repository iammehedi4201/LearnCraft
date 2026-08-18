"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (CUSTOM DECORATORS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: How do you build a custom parameter decorator in NestJS?",
      a: "Use createParamDecorator((data: unknown, ctx: ExecutionContext) => { ... }) from '@nestjs/common'. Extract the request using ctx.switchToHttp().getRequest() and return the desired property (e.g. req.user or req.headers).",
    },
    {
      q: "Q2: How do you allow a custom decorator to extract either the entire object or a specific field (e.g. @User() vs @User('email'))?",
      a: "In the createParamDecorator callback, check if the first 'data' argument is provided. If 'data' is passed (e.g. 'email'), return user?.[data]. If 'data' is omitted, return the full user object.",
    },
    {
      q: "Q3: What is the purpose of applyDecorators()?",
      a: "applyDecorators() composes multiple method or class decorators into a single decorator (e.g. combining @UseGuards(AuthGuard, RolesGuard), @Roles('admin'), and Swagger decorators into one @Auth('admin') decorator).",
    },
    {
      q: "Q4: What is the difference between SetMetadata() and Reflector.createDecorator() in NestJS 10?",
      a: "SetMetadata('roles', roles) relies on magic string keys. Reflector.createDecorator<string[]>() creates a strongly typed decorator function without strings, providing full TypeScript type safety when setting and reading metadata.",
    },
    {
      q: "Q5: Can you apply transformation pipes (like ParseIntPipe) to custom parameter decorators?",
      a: "Yes! Custom param decorators support pipes just like built-in @Param() and @Query() decorators (e.g. @CurrentUser('id', ParseIntPipe) userId: number).",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Custom Decorators">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on parameter decorators and composition."
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
