"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (TRANSACTIONS & SERIALIZATION)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how Prisma handles ACID database transactions in NestJS.",
      a: "Prisma provides two transaction APIs:\n1. Array-based: prisma.$transaction([op1, op2]) for batching independent queries in a single SQL transaction block.\n2. Interactive: prisma.$transaction(async (tx) => { ... }) for multi-step logic where step 2 depends on reading the result of step 1.\nIf an unhandled exception is thrown inside the callback, Prisma automatically rolls back all operations.",
    },
    {
      q: "Q2: How does NestJS prevent sensitive fields (like passwordHash) from leaking in API responses?",
      a: "By enabling ClassSerializerInterceptor globally (or on controllers) and defining entity classes with the @Exclude() decorator from class-transformer over private fields, returning new UserEntity(user) from controller endpoints.",
    },
    {
      q: "Q3: What is Optimistic Concurrency Control and how is it implemented with Prisma?",
      a: "It prevents concurrent update collisions without database-level row locking. A numeric 'version' column is added to the model. Updates include 'where: { id, version: currentVersion }' and increment the version. If another request updated the record first, the update affects 0 rows, throwing a 409 Conflict.",
    },
    {
      q: "Q4: How do you catch and translate Prisma-specific errors (such as P2002) in NestJS?",
      a: "By creating a custom ExceptionFilter catching Prisma.PrismaClientKnownRequestError and mapping codes (P2002 Unique Violation to 409 Conflict, P2025 Not Found to 404, P2003 Foreign Key to 400).",
    },
    {
      q: "Q5: What are the risks of long-running transactions in high-throughput applications?",
      a: "Long-running transactions hold open database connection sockets and lock table rows, leading to connection pool exhaustion (timeouts), high memory pressure, and potential deadlock conditions.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Transactions">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on ACID transactions, serialization security, and optimistic locking."
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
