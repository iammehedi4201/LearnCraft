"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (PRISMA SETUP)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how Prisma is cleanly integrated with NestJS architecture.",
      a: "1. Define schema in prisma/schema.prisma.\n2. Create a PrismaService extending PrismaClient and implementing OnModuleInit (with this.$connect()) and OnModuleDestroy (with this.$disconnect()).\n3. Wrap PrismaService in a @Global() PrismaModule.\n4. Inject PrismaService into any feature service via constructor Dependency Injection.",
    },
    {
      q: "Q2: What is the difference between 'npx prisma generate' and 'npx prisma migrate dev'?",
      a: "'prisma generate' reads schema.prisma and generates TypeScript client types in node_modules without touching the database.\n\n'prisma migrate dev' generates an SQL migration file AND applies it directly to the database, then automatically calls prisma generate.",
    },
    {
      q: "Q3: Why is Prisma considered more type-safe than TypeORM?",
      a: "In TypeORM, TypeScript types and database entity schemas are maintained manually with decorators, which can fall out of sync. In Prisma, TypeScript types are auto-generated directly from the single schema.prisma file, guaranteeing 100% compile-time type safety.",
    },
    {
      q: "Q4: How does PrismaService prevent database connection leaks on application restart?",
      a: "By implementing OnModuleDestroy and calling this.$disconnect(), NestJS ensures database connection sockets are gracefully closed whenever the server restarts or receives a shutdown signal (SIGTERM).",
    },
    {
      q: "Q5: How can you tune Prisma's connection pool size for high-traffic environments?",
      a: "By appending &connection_limit=N and &pool_timeout=S query parameters to the DATABASE_URL connection string in .env.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Prisma Setup">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on Prisma integration and client architecture."
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
