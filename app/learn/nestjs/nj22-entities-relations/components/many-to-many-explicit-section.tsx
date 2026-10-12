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
// MODULE 5 — ASSOCIATIVE DOMAIN ENTITIES (JOIN MODELS)
// ═══════════════════════════════════════════════════════════

export function ManyToManyExplicitSection() {
  return (
    <SectionContainer number={5} title="Associative Entities with Business Metadata">
      {/* ── 5.1 Associative Entity ── */}
      <div className="mb-16">
        <TopicHeader
          number={5}
          title="When Relationships Carry Business State"
          description="Modeling rich associations like enrollments, memberships, or team roles as distinct domain classes."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📊</span> The TeamMembershipEntity Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            When a relationship has attributes (such as <code>role</code>, <code>joinedAt</code>, or <code>isSuspended</code>), it is no longer just a pair of IDs. It becomes a first-class Associative Entity with its own business behaviors:
          </p>
          <EnhancedCodeBlock
            code={`export type TeamRole = "MEMBER" | "LEAD" | "ADMIN";

export class TeamMembershipEntity {
  private _isSuspended: boolean = false;

  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly teamId: string,
    public role: TeamRole = "MEMBER",
    public readonly joinedAt: Date = new Date(),
  ) {}

  get isSuspended(): boolean {
    return this._isSuspended;
  }

  promoteToLead(): void {
    if (this._isSuspended) {
      throw new Error("Cannot promote a suspended team member");
    }
    this.role = "LEAD";
  }

  suspend(reason: string): void {
    if (!reason || reason.trim().length === 0) {
      throw new Error("Suspension reason is required");
    }
    this._isSuspended = true;
  }

  restore(): void {
    this._isSuspended = false;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="When should you create a separate Associative Entity instead of just storing an array of IDs?"
          answer="Whenever the connection between two entities carries business attributes or lifecycle states (e.g., membership role, enrollment grade, joined date, suspension flag)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
