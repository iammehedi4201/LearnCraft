"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER TRANSACTION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Transaction &amp; Serialization Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Transaction &amp; Security Pitfalls"
          description="Avoid these common mistakes when dealing with ACID transactions and response serialization."
          color="primary"
        />

        <MistakeBox
          title="Using this.prisma Inside $transaction Callback"
          description="Calling this.prisma inside $transaction runs the query outside the transaction session, breaking rollback guarantees."
          wrong={`// ❌ Wrong: Uses global prisma client instead of tx:
await this.prisma.$transaction(async (tx) => {
  await this.prisma.user.update(...); // Bypasses transaction!
});`}
          right={`// ✅ Correct: Uses isolated tx transactional client:
await this.prisma.$transaction(async (tx) => {
  await tx.user.update(...); // Atomically enclosed!
});`}
        />

        <MistakeBox
          title="Putting Third-Party HTTP Calls Inside DB Transactions"
          description="Awaiting Stripe or email APIs inside a transaction holds open PostgreSQL connection locks for seconds."
          wrong={`// ❌ Slow & Dangerous: Holds DB lock during external API call:
await this.prisma.$transaction(async (tx) => {
  await tx.order.create(...);
  await stripe.charges.create(...); // ⚠️ If Stripe takes 5s, DB lock is held!
});`}
          right={`// ✅ Correct: Execute external API first, then commit DB transaction:
const charge = await stripe.charges.create(...);
await this.prisma.$transaction(async (tx) => {
  await tx.order.create(...);
});`}
        />

        <MistakeBox
          title="Returning Plain Prisma Objects (Leaking Passwords)"
          description="ClassSerializerInterceptor only inspects class instances; plain objects bypass @Exclude() and leak passwordHash."
          wrong={`// ❌ Leaks passwordHash:
return await this.prisma.user.findUnique({ where: { id } });`}
          right={`// ✅ Filters passwordHash:
const user = await this.prisma.user.findUnique({ where: { id } });
return new UserEntity(user);`}
        />

        <QuickCheck
          question="Why should you never put slow external API calls (like SendGrid or Stripe) inside a database $transaction block?"
          answer="Because it holds open an exclusive PostgreSQL database connection socket and row locks for multiple seconds, starving the connection pool and crashing concurrent traffic."
        />
      </div>
    </SectionContainer>
  );
}
