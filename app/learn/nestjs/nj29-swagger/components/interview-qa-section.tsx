"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (SWAGGER & OPENAPI)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how NestJS generates OpenAPI documentation under the hood.",
      a: "@nestjs/swagger uses TypeScript reflection and metadata decorators (@ApiProperty, @ApiOperation) or the AST compiler plugin to introspect classes and controllers. It compiles this metadata into a standard OpenAPI 3.0 JSON specification and mounts Swagger UI using swagger-ui-express.",
    },
    {
      q: "Q2: What is the Swagger CLI Plugin and why should you use it?",
      a: "The Swagger CLI Plugin is a compiler plugin added to nest-cli.json. It automatically scans DTO files during build, extracting property types, required/optional states, and class-validator rules without needing manual @ApiProperty() annotations on every single field.",
    },
    {
      q: "Q3: How do you document JWT Bearer authentication in NestJS Swagger?",
      a: "In main.ts, add '.addBearerAuth({ type: 'http', scheme: 'bearer' }, 'JWT-auth')' to DocumentBuilder. Then decorate protected controllers or methods with '@ApiBearerAuth('JWT-auth')'.",
    },
    {
      q: "Q4: How do you protect Swagger documentation from public access in production?",
      a: "Either conditionally disable Swagger setup when NODE_ENV === 'production', or wrap the /api/docs route with 'express-basic-auth' requiring username and password credentials.",
    },
    {
      q: "Q5: How does an OpenAPI specification benefit frontend teams?",
      a: "Frontend developers can use SDK generators like Orval or openapi-generator to automatically generate fully-typed TypeScript API client libraries, React Query hooks, and Zod schemas from backend OpenAPI JSON without writing manual fetch code.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Swagger">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on OpenAPI standards, AST plugins, and SDK generators."
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
