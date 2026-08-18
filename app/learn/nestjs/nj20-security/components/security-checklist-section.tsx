"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  StepList,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — THE 10-STEP PRODUCTION SECURITY CHECKLIST
// ═══════════════════════════════════════════════════════════

export function SecurityChecklistSection() {
  return (
    <SectionContainer number={9} title="The 10-Step Production Security Checklist">
      {/* ── 9.1 Checklist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Pre-Deployment Security Audit"
          description="Verify these 10 critical security controls before deploying your NestJS app to production."
          color="primary"
        />

        <StepList
          steps={[
            { step: "01", title: "Enable Helmet Security Headers", desc: "app.use(helmet()) in main.ts to prevent clickjacking and XSS." },
            { step: "02", title: "Strict CORS Whitelisting", desc: "Replace origin: '*' with specific trusted frontend domains." },
            { step: "03", title: "Global ValidationPipe", desc: "Enable whitelist: true and forbidNonWhitelisted: true to stop Mass Assignment." },
            { step: "04", title: "Rate-Limiting (Throttler)", desc: "Bind ThrottlerGuard globally with strict limits on /auth endpoints." },
            { step: "05", title: "Bcrypt Password Hashing", desc: "Hash all passwords with 10 salt rounds before database persistence." },
            { step: "06", title: "Dual Token Architecture", desc: "Issue 15-minute Access Tokens and hashed, revokable 7-day Refresh Tokens." },
            { step: "07", title: "Sanitize Error Responses", desc: "Use a global Exception Filter that never leaks SQL errors or stack traces to clients." },
            { step: "08", title: "Validate Environment Variables", desc: "Use Joi / Zod validation in ConfigModule to ensure JWT_SECRET is strong." },
            { step: "09", title: "Encrypted Database Connections", desc: "Enforce sslmode=require in PostgreSQL connection strings." },
            { step: "10", title: "Audit NPM Dependencies", desc: "Run npm audit in CI/CD pipelines to catch known CVE vulnerabilities." },
          ]}
        />

        <QuickCheck
          question="Which setting on ValidationPipe automatically rejects requests containing unexpected parameters?"
          answer="forbidNonWhitelisted: true."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
