"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — OWASP TOP 10 VS NESTJS DEFENSES MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="OWASP Top 10 vs NestJS Defenses Matrix">
      {/* ── 12.1 OWASP Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Mapping OWASP Top 10 to NestJS Tools"
          description="How NestJS architecture defends against standard web vulnerabilities."
          color="primary"
        />

        <ComparisonTable
          headers={["OWASP Vulnerability", "Attack Description", "NestJS Countermeasure"]}
          rows={[
            ["Broken Access Control", "Accessing other users' private data", "@Roles() + RolesGuard + CASL Ability checks"],
            ["Cryptographic Failures", "Leaking plain-text passwords / weak keys", "bcrypt (10 rounds) + JwtModule + HSTS"],
            ["Injection (SQL / NoSQL)", "Injecting raw database statements", "Prisma ORM parameterized queries + ValidationPipe"],
            ["Security Misconfiguration", "Exposing server banners and debug traces", "Helmet headers + AllExceptionsFilter sanitize"],
            ["Identification Failures", "Brute-force credential stuffing", "@nestjs/throttler (rate limiting /auth/login)"],
            ["Mass Assignment", "Over-posting admin fields in registration", "ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })"],
          ]}
        />

        <QuickCheck
          question="Which OWASP Top 10 threat is prevented by using Prisma ORM prepared statements?"
          answer="SQL Injection."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
