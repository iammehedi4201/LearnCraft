"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (CONFIG & ENV)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how @nestjs/config works and why it is preferred over dotenv.",
      a: "@nestjs/config wraps dotenv into the NestJS Dependency Injection architecture. It provides an injectable ConfigService, support for async configuration factories (registerAs), cascading environment files (.env.development, .env.test), and schema validation using Joi or class-validator.",
    },
    {
      q: "Q2: What is the purpose of 'registerAs' in NestJS configuration?",
      a: "'registerAs' creates namespaced configuration factories (e.g. databaseConfig, jwtConfig). It groups related variables into cohesive objects and allows type-safe injection via @Inject(config.KEY) and ConfigType<typeof config>.",
    },
    {
      q: "Q3: Why is startup environment validation critical in containerized environments like Kubernetes?",
      a: "In Kubernetes, if a container boots with a missing secret without validation, it passes readiness probes and starts taking user traffic, crashing when users hit affected routes. With validationSchema, the container fails fast during startup and Kubernetes prevents routing traffic to it.",
    },
    {
      q: "Q4: How do you mock ConfigService in Jest unit tests?",
      a: "By providing a custom mock provider in Test.createTestingModule:\n{ provide: ConfigService, useValue: { get: jest.fn((key) => mockValues[key]) } }.",
    },
    {
      q: "Q5: How do you configure multi-environment file loading in NestJS?",
      a: "By setting envFilePath: [`.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`, '.env']. NestJS reads files in order from left to right, using the first matching key found.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Configuration">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on environment management, validation, and containerized deployments."
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
