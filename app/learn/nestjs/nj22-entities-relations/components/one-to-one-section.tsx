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
// MODULE 2 — 1-TO-1 DOMAIN ENTITY ASSOCIATIONS
// ═══════════════════════════════════════════════════════════

export function OneToOneSection() {
  return (
    <SectionContainer number={2} title="1-to-1 Entity Associations (User & Profile)">
      {/* ── 2.1 One-to-One ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Modeling 1-to-1 Associations in TypeScript"
          description="How to associate two domain entities where each instance pairs with at most one other instance."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>👤</span> The UserEntity &amp; ProfileEntity Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In NestJS domain models, 1-to-1 associations are modeled via typed references. The parent entity encapsulates methods to safely attach or update the associated child:
          </p>
          <EnhancedCodeBlock
            code={`export class ProfileEntity {
  constructor(
    public readonly id: string,
    public bio: string,
    public avatarUrl: string | null = null,
  ) {}

  updateBio(newBio: string): void {
    if (newBio.length > 250) {
      throw new Error("Bio cannot exceed 250 characters");
    }
    this.bio = newBio;
  }
}

export class UserEntity {
  private _profile: ProfileEntity | null = null;

  constructor(
    public readonly id: string,
    public readonly email: string,
    public username: string,
  ) {}

  get profile(): ProfileEntity | null {
    return this._profile;
  }

  attachProfile(profile: ProfileEntity): void {
    this._profile = profile;
  }

  removeProfile(): void {
    this._profile = null;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why use a getter 'get profile()' instead of making '_profile' a public property?"
          answer="Private backing fields with getters prevent external code from mutating entity references without going through validation methods like 'attachProfile'."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
