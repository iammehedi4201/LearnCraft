"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (PRISMA RELATIONS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how 1-to-Many relationships are defined and queried in Prisma.",
      a: "On the parent model (User), define an array field (posts Post[]). On the child model (Post), define the foreign key column (authorId Int) and the relation attribute (author User @relation(fields: [authorId], references: [id])).\n\nTo query related records, use include: { posts: true } in findUnique/findMany.",
    },
    {
      q: "Q2: When should you use an Implicit vs Explicit Many-to-Many relationship in Prisma?",
      a: "Use Implicit (Post[] and Tag[]) when you only need to link two models together without storing extra fields.\n\nUse Explicit (UsersOnTeams join model) when the relationship itself requires custom metadata columns (such as assignedAt, role, or orderIndex).",
    },
    {
      q: "Q3: What are Prisma Nested Writes and why are they advantageous?",
      a: "Nested writes (create, connect, connectOrCreate, disconnect) allow you to mutate multiple related tables in a single atomic database query, ensuring full transactional consistency without manual transaction boilerplate.",
    },
    {
      q: "Q4: How does onDelete: Cascade work and when should it be avoided?",
      a: "onDelete: Cascade instructs the database to automatically delete all child records when a parent record is deleted (e.g. deleting a user deletes their profile). It should be avoided on critical financial records, invoices, or audit logs where data retention is legally required.",
    },
    {
      q: "Q5: How does Prisma handle N+1 query problems when fetching relational data?",
      a: "When you use include: { relation: true }, Prisma's query engine batches the requests into an optimized SQL query (or IN (...) query) instead of executing separate round-trips for each row.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Prisma Relations">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on relational modeling, foreign keys, and nested writes."
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
