"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (NESTJS SECURITY)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What are the core steps to secure a production NestJS API?",
      a: "1. Add Helmet (app.use(helmet())) to set security response headers.\n2. Configure explicit CORS origin whitelisting.\n3. Apply global ValidationPipe with whitelist: true to stop Mass Assignment.\n4. Use @nestjs/throttler with ThrottlerGuard to prevent brute-force attacks.\n5. Hash passwords with bcrypt and use short-lived JWT access tokens.\n6. Use parameterized queries via Prisma to eliminate SQL injection.",
    },
    {
      q: "Q2: How does @nestjs/throttler prevent brute-force login attacks?",
      a: "Throttler tracks the client's IP address and timestamps incoming requests. If requests exceed the configured threshold (e.g. 5 requests per 60 seconds on /auth/login), ThrottlerGuard immediately throws a ThrottlerException (HTTP 429 Too Many Requests).",
    },
    {
      q: "Q3: What is Mass Assignment vulnerability and how is it prevented in NestJS?",
      a: "Mass Assignment occurs when clients send unauthorized fields (e.g. { 'isAdmin': true }) in a request body that the backend writes directly into the database. In NestJS, configuring ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) automatically strips or rejects any properties not defined in the DTO.",
    },
    {
      q: "Q4: What is the purpose of Helmet in a NestJS backend?",
      a: "Helmet is a collection of middleware functions that set secure HTTP headers such as Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (Clickjacking defense), and removes 'X-Powered-By: Express'.",
    },
    {
      q: "Q5: How do you protect authentication tokens against XSS attacks?",
      a: "Store tokens in httpOnly cookies (which JavaScript cannot read) or in memory, rather than in browser localStorage where malicious scripts injected via XSS could steal them.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Security">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on production hardening, OWASP defenses, and rate-limiting."
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
