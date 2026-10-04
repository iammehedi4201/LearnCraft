"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — IDEMPOTENT SEEDING STRATEGIES IN NESTJS
// ═══════════════════════════════════════════════════════════

export function PrismaDbPushSection() {
  return (
    <SectionContainer number={5} title="Idempotent Seeding: Check-Then-Insert vs Upsert">
      {/* ── 5.1 Idempotency ── */}
      <div className="mb-16">
        <TopicHeader
          number={5}
          title="Guaranteeing Repeatable State Initialization"
          description="How to design seed routines that can run 100 times without duplicating records or crashing."
          color="rose"
        />

        <ComparisonTable
          headers={["Strategy", "How It Works", "Pros", "Cons"]}
          rows={[
            ["Check-Then-Insert", "Queries repo for existing identifier; skips creation if found", "Simple to understand, leaves existing custom data untouched", "Requires two repo calls (find + create)"],
            ["Upsert (Update or Insert)", "Inserts if not present, or updates existing record to match seed template", "Guarantees seed data is always updated to latest schema", "May overwrite user modifications in dev environments"],
            ["Wipe-Then-Seed", "Clears all repository maps and repopulates from scratch", "Guaranteed pristine state every run", "Destroys all testing state created during manual testing"],
          ]}
        />

        <PredictOutputBox
          code={`// Scenario: A developer runs the seed script twice in a row:
// npm run seed
// npm run seed
//
// What happens if the seeder lacks idempotency checks?`}
          answer={`Predicted Outcome without Idempotency:

The second run throws a DuplicateKeyException:
Error: Entity with email 'admin@learncraft.dev' already exists!

By implementing an idempotent check (e.g., 'if (await this.repo.findByEmail(email)) return;'), subsequent runs log 'Skipping existing records' and exit successfully with code 0!`}
        />

        <QuickCheck
          question="What does 'idempotent' mean in the context of NestJS state seeding?"
          answer="It means that running the seeding routine multiple times has the exact same side-effect and final state as running it once, without producing duplicates or throwing errors."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
