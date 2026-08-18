"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER LOGGING MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Logging Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Observability &amp; Logging Pitfalls"
          description="Avoid these common mistakes that degrade performance or leak confidential customer data."
          color="primary"
        />

        <MistakeBox
          title="String Interpolation Instead of Structured Objects"
          description="Concatenating strings loses all JSON key indexing in cloud log viewers like Datadog and Elasticsearch."
          wrong={`// ❌ Unindexed plain text string:
this.logger.info(\`User \${userId} purchased item \${itemId} for $\${price}\`);`}
          right={`// ✅ Indexed JSON keys searchable by "userId = 42":
this.logger.info({ userId, itemId, price }, 'User completed purchase');`}
        />

        <MistakeBox
          title="Leaving console.log in Production Backend Code"
          description="console.log blocks the single-threaded Node.js event loop during high throughput and lacks correlation IDs."
          wrong={`// ❌ Synchronous blocking in production:
console.log('Error occurred:', err);`}
          right={`// ✅ Non-blocking, structured, correlation-tagged:
this.logger.error({ err: err.message, stack: err.stack }, 'Operation failed');`}
        />

        <MistakeBox
          title="Forgetting Log Redaction for Authentication"
          description="Logging raw request headers or bodies without redaction exposes customer passwords and API tokens."
          wrong={`// ❌ Leaks plaintext passwords to cloud log storage:
LoggerModule.forRoot({})`}
          right={`// ✅ Redacts authorization and password fields:
LoggerModule.forRoot({ pinoHttp: { redact: ['req.headers.authorization', 'req.body.password'] } })`}
        />

        <QuickCheck
          question="Why is structured object logging better than template string concatenation in Pino?"
          answer="Because log collectors can query exact numeric fields (e.g. '@userId:42') across millions of log entries instantly without slow regex text searches."
        />
      </div>
    </SectionContainer>
  );
}
