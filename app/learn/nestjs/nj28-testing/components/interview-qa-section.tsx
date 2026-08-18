"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (TESTING)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how Test.createTestingModule works in NestJS testing.",
      a: "Test.createTestingModule() creates an isolated, in-memory NestJS Dependency Injection container specifically for a test suite. It allows you to selectively inject real providers or substitute real services with mock objects using '{ provide: Token, useValue: mockObject }'.",
    },
    {
      q: "Q2: How do you mock PrismaService in Jest unit tests?",
      a: "Using 'jest-mock-extended' with 'mockDeep<PrismaClient>()'. This creates a fully type-safe proxy where methods like prismaMock.user.findUnique.mockResolvedValue(...) return mocked data without touching a live database.",
    },
    {
      q: "Q3: Why is Supertest used for NestJS E2E tests instead of calling controller methods directly?",
      a: "Supertest sends real HTTP requests over the network stack, testing the entire execution lifecycle (Middleware, Guards, Interceptors, Validation Pipes, Exception Filters, and serialization) rather than just the controller method in isolation.",
    },
    {
      q: "Q4: How do you prevent test database pollution during integration test runs?",
      a: "By running an automated database truncate script (TRUNCATE TABLE ... RESTART IDENTITY CASCADE) in the beforeEach hook, ensuring each test executes against a clean database state.",
    },
    {
      q: "Q5: What is Testcontainers and what advantage does it offer in CI/CD pipelines?",
      a: "Testcontainers is a library that spins up real, ephemeral Docker containers (e.g. PostgreSQL 16) programmatically during test execution. It eliminates differences between local mock setups and production database behavior.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Testing">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on test architecture, mocking strategies, and Supertest lifecycles."
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
