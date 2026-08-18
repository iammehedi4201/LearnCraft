"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (MIDDLEWARE)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: How is Middleware configured in NestJS, and why does it not go in providers: []?",
      a: "Middleware is configured by having a module implement the NestModule interface and defining the configure(consumer: MiddlewareConsumer) method. It is not placed in providers: [] because it requires route matching and execution rules configured through the MiddlewareConsumer.",
    },
    {
      q: "Q2: When should you use Middleware instead of an Interceptor or Guard?",
      a: "Use Middleware for low-level protocol operations (attaching request correlation IDs, parsing cookies, setting CORS/Helmet headers, or integrating standard Express packages) where routing context is not needed.\n\nUse Guards when you need to read custom metadata (like @Roles()) for authorization, and use Interceptors when you need to transform the returned response.",
    },
    {
      q: "Q3: Can Middleware access NestJS metadata reflection (Reflector)?",
      a: "No. Middleware executes before the NestJS router resolves which controller class or method will handle the request. To access metadata attached with SetMetadata, you must use Guards or Interceptors.",
    },
    {
      q: "Q4: How do you exclude specific route paths from a middleware in NestJS?",
      a: "Use the .exclude() method on the MiddlewareConsumer before calling .forRoutes():\nconsumer.apply(AuthMiddleware).exclude('auth/login', 'health').forRoutes(UsersController).",
    },
    {
      q: "Q5: What is the execution order between Global Middleware and Module Middleware?",
      a: "Global middleware registered with app.use() in main.ts executes first. Module middleware configured with MiddlewareConsumer executes second in the exact order specified in apply().",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Middleware">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on middleware architecture and lifecycle order."
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
