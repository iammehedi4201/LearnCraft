"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — THE @Injectable() DECORATOR
// ═══════════════════════════════════════════════════════════

export function InjectableDecoratorSection() {
  return (
    <SectionContainer number={2} title="The @Injectable() Decorator">
      {/* ── 2.1 What is @Injectable()? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Marking Classes with @Injectable()"
          description="@Injectable() tells NestJS: 'This class is a provider. You can create it and inject it into other classes!'"
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Injectable } from '@nestjs/common';

@Injectable() // ⭐ Tells NestJS to manage this class!
export class UsersService {
  private readonly users = ['Alice', 'Bob', 'Mehedi'];

  findAll(): string[] {
    return this.users;
  }
}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Why is it called a &quot;Provider&quot;?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
            In NestJS, almost everything can be a <strong>Provider</strong> — plain services, database repositories, factory functions, or helper utilities.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            The word &quot;Provider&quot; simply means: <em>&quot;This object can <strong>provide</strong> a dependency to other classes.&quot;</em>
          </p>
        </WhyBox>

        <EasyRuleCard rule="Every service you create in NestJS must have @Injectable() on top of the class." />
      </div>

      <Divider />

      {/* ── 2.2 Behind the Scenes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="What Happens Under the Hood?"
          description="How @Injectable() works with TypeScript metadata."
          color="sky"
        />

        <p className="text-xs text-ds-text-sub leading-relaxed mb-4">
          When TypeScript compiles a class with <code>@Injectable()</code>, it saves metadata about the constructor arguments. This allows NestJS&apos;s Dependency Injection container to look at:
        </p>

        <div className="p-3 bg-[#0B0E17] dark:bg-[#07090E] rounded-xl font-mono text-xs text-[#F1F5F9] border border-ds-stroke-soft mb-6">
          constructor(private readonly usersService: UsersService)
        </div>

        <p className="text-xs text-ds-text-sub leading-relaxed mb-6">
          NestJS reads the type <code>UsersService</code>, creates an instance of <code>UsersService</code> once, and passes it into the controller automatically!
        </p>

        <QuickCheck
          question="What decorator must you put above a service class so NestJS can manage and inject it?"
          answer="@Injectable() (imported from '@nestjs/common')"
        />
      </div>
    </SectionContainer>
  );
}
