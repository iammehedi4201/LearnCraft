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
// MODULE 7 — CASL & ATTRIBUTE-BASED ACCESS CONTROL (ABAC)
// ═══════════════════════════════════════════════════════════

export function CaslOverviewSection() {
  return (
    <SectionContainer number={7} title="CASL & Attribute-Based Access Control (ABAC)">
      {/* ── 7.1 ABAC with CASL ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic Resource Ownership Permissions"
          description="Enforce rules like: 'A user can only edit an article if article.authorId === user.id'."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Introducing CASL (@casl/ability)
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install CASL: <code>npm i @casl/ability</code>.
            CASL is an isomorphic authorization library that lets you define declarative rules:
          </p>
          <EnhancedCodeBlock
            code={`import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export enum Action {
  Manage = 'manage', // Wildcard for all actions
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export function defineAbilityFor(user: UserEntity) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (user.role === Role.ADMIN) {
    can(Action.Manage, 'all'); // Admin can do anything
  } else {
    can(Action.Read, 'all');
    // ⭐ Regular users can only update articles they own:
    can(Action.Update, Article, { authorId: user.id });
    cannot(Action.Delete, Article);
  }

  return build();
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the difference between RBAC (Role-Based) and ABAC (Attribute-Based) access control?"
          answer="RBAC only checks the user's role (e.g. is user an ADMIN?). ABAC checks attributes of the resource being modified (e.g. is user.id equal to article.authorId?)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
