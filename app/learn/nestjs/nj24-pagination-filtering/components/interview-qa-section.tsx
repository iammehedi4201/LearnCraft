"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (PAGINATION & FILTERS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how to implement Offset-based pagination with Prisma in NestJS.",
      a: "1. Create a PaginationQueryDto with validated page and limit fields.\n2. In the service, compute skip = (page - 1) * limit and take = limit.\n3. Execute prisma.model.findMany({ skip, take }) and prisma.model.count() in parallel via Promise.all.\n4. Return the records wrapped in a standardized metadata envelope containing total, page, lastPage, and hasNextPage.",
    },
    {
      q: "Q2: When should you choose Cursor-based pagination over Offset-based pagination?",
      a: "Choose Cursor pagination for large, frequently updated datasets and infinite scrolling feeds (social feeds, chat history, live logs). It achieves constant O(1) B-tree lookup performance regardless of how deep users scroll, and avoids duplicate/missing items when new rows are inserted in real time.",
    },
    {
      q: "Q3: Why does Offset pagination degrade on large tables (e.g. 10 million rows)?",
      a: "Because PostgreSQL must sequentially read, process, and discard all preceding offset rows in memory before returning the requested slice, causing high I/O latency and CPU spikes.",
    },
    {
      q: "Q4: How do you protect dynamic sorting against malicious user inputs in NestJS?",
      a: "By strictly whitelisting allowed sort field names in the service or using a TypeScript union/enum in the DTO, falling back to a safe default column (e.g. 'createdAt') if an unrecognized column name is supplied.",
    },
    {
      q: "Q5: Why is @Type(() => Number) from class-transformer required on numeric query DTOs?",
      a: "Because HTTP query strings (e.g. '?page=3') are parsed by web frameworks as strings ('3'). Without explicit type transformation, class-validator's @IsInt() will fail validation or JavaScript math operations will produce string concatenation bugs.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Pagination">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on pagination algorithms, query performance, and DTO transformation."
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
