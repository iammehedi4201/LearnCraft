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
// MODULE 8 — METADATA DECORATORS & REFLECTOR.CREATEDECORATOR
// ═══════════════════════════════════════════════════════════

export function MetadataDecoratorsSection() {
  return (
    <SectionContainer number={8} title="Metadata Decorators & Reflector.createDecorator">
      {/* ── 8.1 Modern createDecorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Type-Safe Metadata Decorators in NestJS v10"
          description="Learn the modern Reflector.createDecorator() API alongside traditional SetMetadata()."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏷️</span> Reflector.createDecorator (NestJS 10+)
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In NestJS v10, you can create fully type-safe metadata decorators without string keys:
          </p>
          <EnhancedCodeBlock
            code={`import { Reflector } from '@nestjs/core';

// 1. Define strongly typed decorator (no string keys required!):
export const Roles = Reflector.createDecorator<string[]>();

// 2. Attach to route handler:
@Roles(['admin', 'editor'])
@Post()
createPost() {}

// 3. Read inside Guard:
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // ⭐ Fully type-safe! requiredRoles is typed as string[] | undefined:
    const requiredRoles = this.reflector.get(Roles, context.getHandler());
    return true;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the advantage of Reflector.createDecorator<T>() over SetMetadata('key', value)?"
          answer="It eliminates magic string keys and provides full TypeScript type inference when setting and reading metadata."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
