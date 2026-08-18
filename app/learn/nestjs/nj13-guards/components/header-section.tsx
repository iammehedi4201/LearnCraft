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
// MODULE 1 — THE BIG PICTURE (GUARDS & AUTHORIZATION)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Guards">
      {/* ── 1.1 Why Guards Exist ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Guard in NestJS?"
          description="Guards are single-responsibility classes that determine whether a request should be handled by the route handler or blocked."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Authentication vs Authorization
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In Express.js, developers put authentication checks in middleware. But middleware has a major flaw: <strong>it has no idea which controller or method will execute</strong>!
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            NestJS <strong>Guards</strong> have access to the <code>ExecutionContext</code>. This means a Guard can inspect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><strong>Who is calling:</strong> The user from the decoded JWT token in the request header.</li>
            <li><strong>What is being called:</strong> The exact controller class and method being invoked.</li>
            <li><strong>What permissions are required:</strong> Custom metadata decorators like <code>@Roles(&apos;admin&apos;)</code>.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The VIP Club Security &amp; Wristband Checker">
          <p className="mb-2">
            Imagine your API is a <strong>High-Security VIP Lounge</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>1. The Front Door Guard (AuthGuard):</strong> Checks your ID / VIP invitation card (JWT Token). If invalid, you are rejected immediately with <code>401 Unauthorized</code>.
            </li>
            <li>
              <strong>2. The Private Room Bouncer (RolesGuard):</strong> You want to enter the Executive Penthouse (<code>/admin/financials</code>). The bouncer checks if your wristband says &quot;ADMIN&quot;. If it says &quot;USER&quot;, you are blocked with <code>403 Forbidden</code>.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Guards decide IF a request can proceed. If canActivate() returns true, access is granted. If false, access is blocked with 403 Forbidden." />

        <QuickCheck
          question="What interface must every NestJS Guard implement?"
          answer="CanActivate (from '@nestjs/common')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
