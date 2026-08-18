"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER SECURITY MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Security Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Critical Security Oversights"
          description="Avoid these common vulnerabilities before going live."
          color="primary"
        />

        <MistakeBox
          title="Omitting whitelist: true in ValidationPipe"
          description="Without whitelist: true, attackers can send fields like isAdmin: true, which get passed directly to database update queries."
          wrong={`// ❌ Vulnerable to Mass Assignment:
app.useGlobalPipes(new ValidationPipe());`}
          right={`// ✅ Secure: Automatically strips non-whitelisted fields:
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));`}
        />

        <MistakeBox
          title="Allowing Wildcard CORS in Production"
          description="Setting origin: '*' allows malicious third-party websites to make unauthorized requests on behalf of users."
          wrong={`// ❌ Insecure in production:
app.enableCors({ origin: '*' });`}
          right={`// ✅ Secure: Whitelist explicit frontend domains:
app.enableCors({ origin: ['https://learncraft.dev'], credentials: true });`}
        />

        <MistakeBox
          title="Not Rate-Limiting Authentication Endpoints"
          description="Without rate-limiting, bots can make millions of login requests per hour using dictionary lists."
          wrong={`// ❌ Vulnerable to brute-force attacks:
@Post('login')
login() {}`}
          right={`// ✅ Protected: Max 5 attempts per minute:
@Throttle({ default: { limit: 5, ttl: 60000 } })
@Post('login')
login() {}`}
        />

        <QuickCheck
          question="Why is allowing unrestricted login attempts (no rate-limiting) dangerous even with strong password hashing?"
          answer="Because automated botnets can continuously flood the endpoint, exhausting server CPU resources and cracking weak passwords through sheer volume."
        />
      </div>
    </SectionContainer>
  );
}
