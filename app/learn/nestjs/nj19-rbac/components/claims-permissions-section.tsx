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
// MODULE 6 — CLAIMS & FINE-GRAINED PERMISSIONS
// ═══════════════════════════════════════════════════════════

export function ClaimsPermissionsSection() {
  return (
    <SectionContainer number={6} title="Claims & Fine-Grained Permissions">
      {/* ── 6.1 Permissions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Beyond Broad Roles: Permission Strings"
          description="Grant granular action-level permissions like 'articles:create' and 'billing:refund'."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎯</span> The Permission String Format
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In complex apps, roles become too rigid. Instead, attach an array of specific permissions to each user:
          </p>
          <EnhancedCodeBlock
            code={`// Define granular permissions:
export const RequirePermissions = Reflector.createDecorator<string[]>();

// Controller endpoint:
@Post('refund')
@RequirePermissions(['billing:refund', 'payments:write'])
processRefund() {}

// In PermissionsGuard:
canActivate(context: ExecutionContext): boolean {
  const required = this.reflector.get(RequirePermissions, context.getHandler());
  if (!required) return true;

  const { user } = context.switchToHttp().getRequest();
  // Check if user has ALL required permissions:
  return required.every((p) => user.permissions?.includes(p));
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why are permission strings (like 'users:delete') more flexible than broad roles (like 'ADMIN')?"
          answer="Because you can create customized roles or assign individual permissions to users without rewriting code every time a new company job title is created."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
