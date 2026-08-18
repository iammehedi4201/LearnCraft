"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — ROLE HIERARCHY & INHERITANCE
// ═══════════════════════════════════════════════════════════

export function RoleHierarchySection() {
  return (
    <SectionContainer number={5} title="Role Hierarchy & Inheritance">
      {/* ── 5.1 Hierarchical Roles ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="SuperAdmin > Admin > Moderator > User"
          description="Design a role hierarchy so higher-ranking roles automatically inherit permissions."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>👑</span> The Numeric Weight Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Instead of writing <code>@Roles([Role.USER, Role.MODERATOR, Role.ADMIN, Role.SUPER_ADMIN])</code> everywhere, assign numeric weights:
          </p>
          <EnhancedCodeBlock
            code={`// Role hierarchy weights:
export const RoleWeights: Record<Role, number> = {
  [Role.USER]: 1,
  [Role.MODERATOR]: 2,
  [Role.ADMIN]: 3,
  [Role.SUPER_ADMIN]: 4,
};

// In RolesGuard:
const minRequiredLevel = Math.min(...requiredRoles.map((r) => RoleWeights[r]));
const userLevel = RoleWeights[user.role] || 0;

// User qualifies if their rank is equal to or higher than required level:
return userLevel >= minRequiredLevel;`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="If a route requires Role.ADMIN (weight 3), will a user with Role.SUPER_ADMIN (weight 4) be granted access using hierarchical weights?"
          answer="Yes, because 4 >= 3, allowing SuperAdmins to access all Admin and User routes automatically."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
