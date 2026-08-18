"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — POLICIESGUARD & @CHECKPOLICIES()
// ═══════════════════════════════════════════════════════════

export function PoliciesGuardSection() {
  return (
    <SectionContainer number={9} title="PoliciesGuard & @CheckPolicies() Decorator">
      {/* ── 9.1 PoliciesGuard ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Declarative Policy Enforcement"
          description="Protect routes with custom policy functions evaluated by PoliciesGuard."
          color="primary"
        />

        <EasyRuleCard rule="Use PoliciesGuard with @CheckPolicies() to execute complex multi-attribute security rules before the controller method runs." />

        <PredictOutputBox
          code={`// Ability Rule: can(Action.Delete, Article, { authorId: user.id })
// Target Article: { id: 50, title: "NestJS Guide", authorId: 10 }

// User A: { id: 10, role: 'user' } -> Attempts DELETE /articles/50
// User B: { id: 99, role: 'user' } -> Attempts DELETE /articles/50
// User C: { id: 99, role: 'admin', canManageAll: true } -> Attempts DELETE /articles/50`}
          answer={`Predicted Policy Evaluations:\n\n1. User A (authorId 10 === user.id 10):\n-> ALLOWED (HTTP 200) - User owns the article!\n\n2. User B (authorId 10 !== user.id 99):\n-> FORBIDDEN (HTTP 403) - User does not own the article!\n\n3. User C (Admin with 'manage all'):\n-> ALLOWED (HTTP 200) - Admin override matches!`}
        />

        <QuickCheck
          question="What happens if a user with role 'user' tries to delete an article authored by another user?"
          answer="CASL evaluates ability.can(Action.Delete, article) as false, and PoliciesGuard returns HTTP 403 Forbidden."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
