"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (NESTJS PIPES)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What are NestJS Pipes and what are their two primary responsibilities?",
      a: "Pipes are injectable classes implementing PipeTransform with two responsibilities:\n1. Transformation: Converting input data into the desired type (e.g. string to number, raw date to Date object).\n2. Validation: Evaluating input data against rules and throwing a BadRequestException (HTTP 400) if validation fails.",
    },
    {
      q: "Q2: How do you handle optional numeric query parameters without throwing 400 when omitted?",
      a: "Chain DefaultValuePipe before ParseIntPipe:\n@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number\n\nIf 'limit' is undefined in the URL, DefaultValuePipe replaces it with 10 before ParseIntPipe parses it.",
    },
    {
      q: "Q3: What is the difference between app.useGlobalPipes() in main.ts and { provide: APP_PIPE, useClass: MyPipe } in AppModule?",
      a: "app.useGlobalPipes() registers the pipe outside the NestJS IoC dependency injection container, meaning the pipe cannot inject other services.\n\nUsing { provide: APP_PIPE, useClass: MyPipe } inside AppModule binds the pipe globally while keeping full access to Dependency Injection.",
    },
    {
      q: "Q4: What information is contained in the ArgumentMetadata parameter of transform()?",
      a: "ArgumentMetadata contains:\n1. type: 'body' | 'query' | 'param' | 'custom'\n2. metatype: The target type constructor or DTO class (e.g. CreateUserDto, Number)\n3. data: The string passed to the decorator (e.g. @Param('id') -> data is 'id')",
    },
    {
      q: "Q5: When multiple pipes are passed to a single parameter, in what order do they execute?",
      a: "They execute sequentially from left to right. The returned value from the first pipe is passed as the input value to the second pipe.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Pipes">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on parameter transformation and pipes."
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
