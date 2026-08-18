"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — PREVENTING SQL & NOSQL INJECTION
// ═══════════════════════════════════════════════════════════

export function SqlNosqlInjectionSection() {
  return (
    <SectionContainer number={8} title="Preventing SQL & NoSQL Injection with Prisma">
      {/* ── 8.1 SQL Injection ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Parameterized Queries vs Raw Concatenation"
          description="How Prisma ORM automatically protects against SQL injection attacks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Parameterized Query Safety
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Standard Prisma queries (like <code>prisma.user.findUnique()</code>) use prepared statements that separate SQL commands from user data:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-error-dark bg-ds-error-lighter px-2.5 py-1 rounded-md border border-ds-error-light mb-2 w-fit">
                ❌ Dangerous Raw Concatenation
              </span>
              <EnhancedCodeBlock
                code={`// VULNERABLE to SQL injection:
await prisma.$queryRawUnsafe(
  \`SELECT * FROM "User" WHERE email = '\${userInput}'\`
);`}
                language="typescript"
              />
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-wider text-ds-success-dark bg-ds-success-lighter px-2.5 py-1 rounded-md border border-ds-success-light mb-2 w-fit">
                ✅ Parameterized Prisma Safety
              </span>
              <EnhancedCodeBlock
                code={`// SECURE: Prisma parameterizes automatically:
await prisma.user.findUnique({
  where: { email: userInput },
});`}
                language="typescript"
              />
            </div>
          </div>
        </WhyBox>

        <EasyRuleCard rule="Always use standard Prisma methods (findUnique, findMany) or tagged $queryRaw`...` to guarantee query parameterization." />

        <QuickCheck
          question="Why are standard Prisma queries immune to SQL injection attacks?"
          answer="Because Prisma sends user inputs as separate query parameters to the database engine rather than concatenating them into the raw SQL string."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
