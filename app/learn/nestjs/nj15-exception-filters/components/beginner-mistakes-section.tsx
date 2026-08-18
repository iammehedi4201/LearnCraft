"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER EXCEPTION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Exception Handling Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with Error Handling"
          description="Avoid these common security, architecture, and syntax mistakes."
          color="primary"
        />

        <MistakeBox
          title="Returning 200 OK with Error Payloads (Anti-Pattern)"
          description="Returning HTTP 200 with { success: false, error: '...' } breaks REST conventions, HTTP caching, and frontend error interceptors."
          wrong={`// ❌ Anti-pattern: Returning 200 with an error object
if (!user) {
  return { status: 200, success: false, error: 'User not found' };
}`}
          right={`// ✅ Proper REST: Throw standard HTTP exception
if (!user) {
  throw new NotFoundException('User not found');
}`}
        />

        <MistakeBox
          title="Leaking Raw Database Stack Traces to Clients"
          description="Sending internal SQL queries or database error stacks to clients in production exposes security vulnerabilities."
          wrong={`// ❌ Dangerous in production:
response.status(500).json({ error: exception.stack });`}
          right={`// ✅ Secure: Log internally, send clean message to client:
logger.error('DB Error', exception.stack);
response.status(500).json({ message: 'Internal server error' });`}
        />

        <MistakeBox
          title="Throwing Plain String Literals"
          description="Throwing strings like throw 'Not found' prevents NestJS from formatting structured error objects."
          wrong={`// ❌ Wrong:
throw 'User does not exist';`}
          right={`// ✅ Correct:
throw new NotFoundException('User does not exist');`}
        />

        <QuickCheck
          question="Why is throwing a typed HttpException (like NotFoundException) better than returning { error: 'Not found' } with status 200?"
          answer="It adheres to standard HTTP status code semantics, enables automated frontend error handling, and integrates cleanly with NestJS Exception Filters."
        />
      </div>
    </SectionContainer>
  );
}
