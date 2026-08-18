"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (PRISMA MIGRATIONS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain the difference between 'prisma migrate dev', 'prisma migrate deploy', and 'prisma db push'.",
      a: "• 'prisma migrate dev': Used in development. Diffs schema, generates new timestamped SQL files, applies them locally, and runs prisma generate.\n• 'prisma migrate deploy': Used in production CI/CD. Applies pending SQL files non-interactively without generating new migrations.\n• 'prisma db push': Direct schema synchronization without creating SQL migration files (ideal only for fast hackathons/prototypes).",
    },
    {
      q: "Q2: What is the purpose of the _prisma_migrations table in PostgreSQL?",
      a: "It acts as a persistent ledger storing the list of all applied migration directories along with their SHA-256 checksums and completion timestamps, ensuring migrations run exactly once in order.",
    },
    {
      q: "Q3: How do you achieve zero-downtime migrations when renaming a database column in production?",
      a: "Use the 'Expand and Contract' pattern:\n1. Add the new column alongside the old one.\n2. Deploy backend code that writes to both columns and reads from the new one.\n3. Backfill old rows into the new column.\n4. Deploy a final migration to drop the old column.",
    },
    {
      q: "Q4: How do you resolve a failed migration on production using the Prisma CLI?",
      a: "Use 'npx prisma migrate resolve'. If the migration was rolled back manually, run --rolled-back <name>. If the migration was fixed manually in the database, run --applied <name>.",
    },
    {
      q: "Q5: Why should database seed scripts always be idempotent?",
      a: "So that running the seed command multiple times (e.g. during CI/CD tests or container reboots) does not cause duplicate key violations or create thousands of duplicate rows.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Prisma Migrations">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on migration workflows, schema drift, and deployment safety."
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
