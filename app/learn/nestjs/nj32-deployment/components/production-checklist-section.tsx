"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — THE 20-POINT PRODUCTION READINESS CHECKLIST
// ═══════════════════════════════════════════════════════════

export function ProductionChecklistSection() {
  const checklist = [
    { cat: "🔒 Security & Auth", items: [
      "ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }) enabled globally.",
      "helmet() middleware enabled for security HTTP response headers.",
      "Strict CORS whitelist (no wildcard '*' in production with credentials).",
      "Passwords hashed using Argon2 or bcrypt with minimum 12 salt rounds.",
      "JWT access tokens expire within 15 minutes; refresh tokens stored securely in HTTP-only cookies.",
    ]},
    { cat: "🗄️ Database & Prisma", items: [
      "Database migrations deployed via 'npx prisma migrate deploy' (never 'migrate dev' in CI).",
      "Composite and foreign key indexes created on all frequently queried columns.",
      "PostgreSQL connection pooling configured with PgBouncer or connection_limit.",
      "Transactions used with optimistic locking version counters for concurrent balance mutations.",
      "ClassSerializerInterceptor active with @Exclude() on passwordHash fields.",
    ]},
    { cat: "📊 Observability & Logs", items: [
      "nestjs-pino structured JSON logging active with pino-pretty disabled in production.",
      "Correlation IDs (X-Request-Id) bound to all incoming requests and outgoing headers.",
      "Sensitive fields (authorization, password, cardNumber) configured for automatic redaction.",
      "Terminus /health/live and /health/ready endpoints connected to Kubernetes / AWS probes.",
      "All unexpected exceptions captured via custom GlobalExceptionFilter.",
    ]},
    { cat: "🐳 Docker & DevOps", items: [
      "Multi-stage Dockerfile using node:20-alpine with non-root 'USER node'.",
      "app.enableShutdownHooks() enabled in main.ts for zero-downtime rolling deployments.",
      "dumb-init used as container PID 1 wrapper for proper Unix signal forwarding.",
      "Automated CI/CD pipeline enforcing tsc --noEmit, eslint, and test suites.",
      "Centralized Redis cluster configured for shared caching, rate limiting, and distributed locks.",
    ]},
  ];

  return (
    <SectionContainer number={9} title="The 20-Point Production Readiness Checklist">
      {/* ── 9.1 Checklist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Master Pre-Launch Flight Check"
          description="Verify these 20 battle-tested engineering standards before pointing production domain traffic to your NestJS backend."
          color="primary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {checklist.map((group, i) => (
            <div key={i} className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
              <h4 className="font-bold text-xs uppercase tracking-wider text-ds-feature-dark mb-3">
                {group.cat}
              </h4>
              <ul className="space-y-2 text-xs text-ds-text-sub">
                {group.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-ds-success-base font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <QuickCheck
          question="Why should 'prisma migrate deploy' be used instead of 'prisma migrate dev' in production deployments?"
          answer="'prisma migrate deploy' is deterministic, non-interactive, applies pending migrations without generating new ones, and exits code 1 immediately if schema drift is detected."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
