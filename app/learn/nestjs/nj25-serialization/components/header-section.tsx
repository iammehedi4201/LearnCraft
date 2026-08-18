"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (TRANSACTIONS & SERIALIZATION)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Transactions &amp; Serialization">
      {/* ── 1.1 Why Transactions & Serialization ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Data Integrity &amp; Safe API Responses"
          description="How to execute multi-step database mutations atomically (All-or-Nothing) and strip private columns like passwords before returning JSON."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💸</span> The 2 Critical Enterprise Requirements
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-ds-text-sub">
            <li>
              <strong>1. Database Transactions (All-or-Nothing):</strong> If you deduct $100 from Alice&apos;s account, but the database crashes before depositing $100 into Bob&apos;s account, money vanishes into thin air! A transaction guarantees that if ANY step fails, ALL steps are automatically rolled back.
            </li>
            <li>
              <strong>2. Response Serialization (No Password Leaks):</strong> Database user records contain <code>passwordHash</code>, <code>twoFactorSecret</code>, and <code>creditCardToken</code>. Response serialization automatically strips these private fields before JSON leaves your server!
            </li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Bank Vault &amp; The Airport Customs Scanner">
          <p className="mb-2">
            Think of these two mechanisms like security checkpoints:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Transactions (The Bank Vault):</strong> You put cash in a pneumatic tube. Both doors must seal, and money only moves if both sender and receiver vaults confirm receipt. If anything jams, the tube returns the cash to your hands!
            </li>
            <li>
              <strong>Serialization (Airport Baggage X-Ray):</strong> Before passengers exit the terminal into public arrival halls, customs filters out illegal contraband (stripping <code>passwordHash</code> so clients only receive safe public fields).
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Use prisma.$transaction() for financial/multi-table operations, and ClassSerializerInterceptor + @Exclude() on entity classes to prevent data leaks." />

        <QuickCheck
          question="What is the ACID guarantee of a database transaction?"
          answer="Atomicity: All operations in the transaction succeed together, or if any single step fails, the entire transaction is rolled back as if nothing happened."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
