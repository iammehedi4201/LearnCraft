"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (LOGGING & OBSERVABILITY)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Why is nestjs-pino preferred over the built-in NestJS Logger in enterprise backends?",
      a: "Built-in NestJS Logger produces human-readable plain text strings designed for terminals. In production, nestjs-pino outputs structured JSON at 5x-10x the throughput, provides automated HTTP access logging, automatically binds correlation IDs, and supports zero-overhead redaction.",
    },
    {
      q: "Q2: How do Correlation IDs (X-Request-Id) work in a microservices architecture?",
      a: "An incoming request is assigned a unique UUID in the API gateway or genReqId hook. This ID is passed through every microservice HTTP call in headers (X-Request-Id) and attached to every log record. If a bug occurs, searching that single UUID displays the complete trace across all services.",
    },
    {
      q: "Q3: How does Pino achieve high-speed, non-blocking logging in Node.js?",
      a: "Pino avoids synchronous string operations on the main thread by pre-serializing structure schemas and using dedicated worker threads for log transports and disk writes.",
    },
    {
      q: "Q4: What is the purpose of Log Redaction?",
      a: "Log redaction ensures that confidential data (passwords, tokens, credit cards) is automatically censored into '[REDACTED]' before being written to disk or shipped to third-party log providers like Datadog, ensuring compliance with GDPR, HIPAA, and PCI-DSS.",
    },
    {
      q: "Q5: Why should pino-pretty NEVER be used in production Docker containers?",
      a: "pino-pretty consumes unnecessary CPU cycles converting JSON into colorized terminal strings, and breaks machine-readability for log collectors (such as FluentBit or Datadog Agent) that require raw JSON lines.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Logging">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on structured logging, distributed tracing, and production observability."
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
