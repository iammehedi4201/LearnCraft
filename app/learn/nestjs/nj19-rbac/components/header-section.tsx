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
// MODULE 1 — THE BIG PICTURE (ROLE-BASED ACCESS CONTROL)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: RBAC Authorization in NestJS">
      {/* ── 1.1 Authentication vs Authorization ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Authentication vs Authorization: What's the Difference?"
          description="Authentication proves WHO you are. Authorization determines WHAT you are allowed to do."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The 2 Steps of Security
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-ds-text-sub">
            <li>
              <strong>1. Authentication (401 Unauthorized):</strong> Checking user identity (&quot;I am John Doe with a valid JWT token&quot;).
            </li>
            <li>
              <strong>2. Authorization (403 Forbidden):</strong> Checking user permissions (&quot;John Doe is a regular customer; can he delete another user&apos;s account? No, 403 Forbidden!&quot;).
            </li>
          </ul>
        </WhyBox>

        <AnalogyBox title="Airport Security vs First-Class VIP Lounge">
          <p className="mb-2">
            Think of the distinction like an <strong>International Airport</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Passport Control (Authentication):</strong> The border guard inspects your passport to confirm your identity. Everyone needs to pass passport control.
            </li>
            <li>
              <strong>First-Class Lounge Door (Authorization):</strong> Even though your passport is 100% valid, the VIP lounge bouncer checks your ticket class (Role = &apos;FIRST_CLASS&apos;). If you hold an Economy ticket, you are turned away (403 Forbidden)!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="401 Unauthorized = We don't know who you are. 403 Forbidden = We know who you are, but you don't have permission." />

        <QuickCheck
          question="Which HTTP status code is returned when an authenticated user attempts to access an endpoint reserved for Administrators?"
          answer="HTTP 403 Forbidden."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
