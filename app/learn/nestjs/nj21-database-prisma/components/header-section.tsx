"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (PRISMA ORM & NESTJS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Prisma ORM in NestJS">
      {/* ── 1.1 What is Prisma ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is an ORM and Why Prisma?"
          description="A next-generation Object-Relational Mapper that gives you 100% type-safe database queries without writing raw SQL strings."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🗄️</span> The Database Connection Dilemma
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In Node.js backends, talking to PostgreSQL without an ORM means writing raw SQL strings:
          </p>
          <div className="p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft font-mono text-xs text-ds-error-dark mb-3">
            const result = await db.query(&quot;SELECT * FROM users WHERE emial = $1&quot;, [email]);
          </div>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Notice the typo <code>emial</code>? Raw SQL queries won&apos;t warn you. Your app will crash in production when a customer clicks login!
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            <strong>Prisma ORM</strong> gives you auto-generated TypeScript types, auto-complete for every column name, and zero SQL injection risk:
          </p>
          <div className="p-3 rounded-xl bg-ds-bg-white border border-ds-stroke-soft font-mono text-xs text-ds-success-dark">
            const user = await this.prisma.user.findUnique(&#123; where: &#123; email &#125; &#125;);
          </div>
        </WhyBox>

        <AnalogyBox title="The Universal Language Interpreter">
          <p className="mb-2">
            Think of Prisma like a <strong>World-Class Diplomatic Interpreter</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Your Code Speaks TypeScript:</strong> You think in terms of JavaScript objects (e.g. <code>user.email</code>, <code>post.title</code>).
            </li>
            <li>
              <strong>The Database Speaks SQL Dialects:</strong> PostgreSQL, MySQL, and SQLite each speak different database dialects.
            </li>
            <li>
              <strong>Prisma Translates Seamlessly:</strong> Prisma sits in between, instantly translating your clean TypeScript function calls into optimized, parameterized SQL queries with zero syntax errors.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Define your models once in schema.prisma -> Run prisma generate -> Get 100% type-safe database queries across your NestJS services." />

        <QuickCheck
          question="What command generates the TypeScript client types based on your schema.prisma file?"
          answer="npx prisma generate."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
