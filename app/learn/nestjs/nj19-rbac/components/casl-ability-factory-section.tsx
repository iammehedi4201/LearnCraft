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
// MODULE 8 — CASL ABILITYFACTORY SERVICE
// ═══════════════════════════════════════════════════════════

export function CaslAbilityFactorySection() {
  return (
    <SectionContainer number={8} title="CASL AbilityFactory & Policy Handlers">
      {/* ── 8.1 AbilityFactory ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The CaslAbilityFactory Service"
          description="A dedicated NestJS service that constructs abilities based on user attributes."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏭</span> Implementing the Factory
          </h4>
          <EnhancedCodeBlock
            code={`// src/casl/casl-ability.factory.ts
import { AbilityBuilder, createMongoAbility, MongoAbility, InferSubjects } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Article } from './entities';

export type Subjects = InferSubjects<typeof Article | typeof User> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    if (user.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      can(Action.Read, Article);
      can(Action.Update, Article, { authorId: user.id });
    }

    return build();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is CaslAbilityFactory registered as an @Injectable() NestJS service?"
          answer="So it can be injected into Guards and other services throughout the application to create user-specific ability rules dynamically."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
