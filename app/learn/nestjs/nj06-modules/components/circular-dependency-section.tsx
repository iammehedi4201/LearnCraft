"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
  AnalogyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — CIRCULAR DEPENDENCIES & forwardRef()
// ═══════════════════════════════════════════════════════════

export function CircularDependencySection() {
  return (
    <SectionContainer number={8} title="Circular Dependencies & forwardRef()">
      {/* ── 8.1 The Circular Dependency Problem ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Chicken and Egg Problem"
          description="What happens when Module A imports Module B, but Module B also imports Module A?"
          color="primary"
        />

        <AnalogyBox emoji="🔄" title="Simple Real-Life Story: The Deadlock">
          <p>
            Imagine two people standing in front of a narrow door:
          </p>
          <p className="mt-2">
            Person A says: <em>&quot;I will only enter AFTER you enter!&quot;</em><br />
            Person B says: <em>&quot;I will only enter AFTER you enter!&quot;</em>
          </p>
          <p className="mt-2 font-bold text-ds-error-dark">
            Nobody moves! The program freezes in a deadlock loop.
          </p>
        </AnalogyBox>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚠️</span> The Module Loop in Code
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If <code>UsersModule</code> imports <code>OrdersModule</code>, and <code>OrdersModule</code> imports <code>UsersModule</code>, TypeScript cannot decide which file to create first. One of them ends up as <code>undefined</code>.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 8.2 The Solution: forwardRef() ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Solution: forwardRef()"
          description="NestJS provides the forwardRef() helper function to resolve circular references safely."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-feature-dark mb-2 text-sm">
              1. src/users/users.module.ts
            </h5>
            <EnhancedCodeBlock
              code={`import { Module, forwardRef } from '@nestjs/common';
import { OrdersModule } from '../orders/orders.module';

@Module({
  // ⭐ Wrap in forwardRef(() => OrdersModule):
  imports: [forwardRef(() => OrdersModule)],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}`}
              language="typescript"
            />
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-info-dark mb-2 text-sm">
              2. src/orders/orders.module.ts
            </h5>
            <EnhancedCodeBlock
              code={`import { Module, forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';

@Module({
  // ⭐ Wrap in forwardRef(() => UsersModule):
  imports: [forwardRef(() => UsersModule)],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}`}
              language="typescript"
            />
          </div>
        </div>

        <p className="text-xs text-ds-text-sub mb-6">
          <strong>How it works:</strong> <code>forwardRef(() =&gt; ...)</code> tells NestJS: <em>&quot;Don&apos;t look for this class right now. Wait until both files are loaded, then connect them together.&quot;</em>
        </p>

        <QuickCheck
          question="What function does NestJS provide to break a circular dependency between two modules?"
          answer="forwardRef(() => TargetModule)"
        />
      </div>
    </SectionContainer>
  );
}
