"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER CONFIG MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Config &amp; Env Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Configuration &amp; Env Pitfalls"
          description="Avoid these common mistakes that leak secrets or break unit tests."
          color="primary"
        />

        <MistakeBox
          title="Directly Reading process.env in Services"
          description="Accessing process.env directly inside services tightly couples your code to Node.js global state and makes unit testing difficult."
          wrong={`// ❌ Hard to mock in tests, zero type safety:
@Injectable()
export class StripeService {
  private key = process.env.STRIPE_KEY;
}`}
          right={`// ✅ Clean dependency injection:
@Injectable()
export class StripeService {
  constructor(private config: ConfigService) {}
  private key = this.config.get<string>('STRIPE_KEY');
}`}
        />

        <MistakeBox
          title="Forgetting isGlobal: true on ConfigModule"
          description="Omitting isGlobal forces you to manually import ConfigModule into every single feature module."
          wrong={`// ❌ Required manual imports in every module:
ConfigModule.forRoot()`}
          right={`// ✅ Globally available across all services:
ConfigModule.forRoot({ isGlobal: true })`}
        />

        <MistakeBox
          title="Skipping Startup Schema Validation"
          description="Without validationSchema or class-validator, your app starts up even if critical secrets are missing, crashing unexpectedly at 3 AM."
          wrong={`// ❌ App boots with missing secrets:
ConfigModule.forRoot({ isGlobal: true })`}
          right={`// ✅ App fails fast at boot if secrets are missing:
ConfigModule.forRoot({ isGlobal: true, validationSchema: Joi.object({ ... }) })`}
        />

        <QuickCheck
          question="Why should you inject ConfigService into providers instead of writing 'process.env.MY_SECRET'?"
          answer="ConfigService provides type-safety, default fallbacks, and allows you to easily pass mock configuration objects during unit tests."
        />
      </div>
    </SectionContainer>
  );
}
