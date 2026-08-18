"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & AUTHORIZATION MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Authorization Models Matrix">
      {/* ── 12.1 Comparison Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="RBAC vs ABAC vs PBAC"
          description="A complete architectural comparison of authorization strategies."
          color="primary"
        />

        <ComparisonTable
          headers={["Authorization Model", "Core Question", "NestJS Implementation Tool", "Best Suited For"]}
          rows={[
            ["RBAC (Role-Based)", "What is the user's role?", "@Roles() + RolesGuard", "Simple applications with clear Admin/User roles"],
            ["Permissions-Based", "Does user have this specific permission tag?", "@Permissions() + PermissionsGuard", "SaaS platforms with custom tenant roles"],
            ["ABAC (Attribute-Based)", "Does user own this specific resource record?", "@casl/ability + PoliciesGuard", "Multi-author CMS, file managers, social media posts"],
          ]}
        />

        <QuickCheck
          question="Which authorization model is best when a customer support agent should only view accounts in their assigned region?"
          answer="ABAC (Attribute-Based Access Control) because access depends on an attribute (user.region === account.region)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
