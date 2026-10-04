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
// MODULE 1 — THE BIG PICTURE (DOMAIN ENTITIES IN NESTJS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Domain Entities & Modeling in NestJS">
      {/* ── 1.1 Why Domain Entities Matter ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Rich Domain Entities vs Anemic Models"
          description="How NestJS services encapsulate business logic and invariants inside structured TypeScript domain classes."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏛️</span> Beyond Plain JSON DTOs
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In production NestJS applications, DTOs carry HTTP request data across the network boundary, but <strong>Entities</strong> model your actual domain and enforce business rules:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Business Invariants:</strong> An order cannot be shipped before it is paid; a user cannot publish a post if their account is banned.</li>
            <li><strong>Encapsulation:</strong> Private properties and controlled mutating methods ensure data cannot be put into an invalid state.</li>
            <li><strong>Decoupling:</strong> Domain entities remain clean TypeScript classes, independent of any specific storage engine.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Blueprint &amp; The Secure Vault">
          <p className="mb-2">
            Think of Domain Entities like a bank vault with certified tellers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Anemic Model (Unprotected):</strong> A pile of cash on a table. Anyone can change the balance directly without verification.
            </li>
            <li>
              <strong>Rich Entity (Encapsulated):</strong> A secured vault. You cannot directly modify <code>balance</code>; you must call <code>account.deposit(amount)</code> or <code>account.withdraw(amount)</code>, which verifies funds and raises domain events.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="DTOs define the network payload shape. Entities define the business state and invariants. Never expose entities directly to HTTP clients." />

        <QuickCheck
          question="What is the key difference between an Anemic model and a Rich Domain Entity in NestJS?"
          answer="An Anemic model is just a property bag with getters and setters without logic. A Rich Domain Entity contains methods that enforce business invariants and validate transitions."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
