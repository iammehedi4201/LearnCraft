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
// MODULE 3 — CUSTOM DOMAIN EXCEPTIONS
// ═══════════════════════════════════════════════════════════

export function CustomExceptionsSection() {
  return (
    <SectionContainer number={3} title="Custom Domain Exceptions">
      {/* ── 3.1 Custom Domain Exceptions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Encapsulating Domain Error Logic"
          description="How to create clean, reusable custom exception classes that extend HttpException."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏛️</span> Domain-Driven Exception Hierarchy
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Instead of hardcoding error strings inside multiple services, encapsulate domain errors into dedicated exception classes:
          </p>
          <EnhancedCodeBlock
            code={`import { NotFoundException, BadRequestException } from '@nestjs/common';

// 1. Custom User Not Found Exception:
export class UserNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(\`User with ID \${userId} was not found in the system.\`);
  }
}

// 2. Custom Business Logic Rule Exception:
export class InsufficientFundsException extends BadRequestException {
  constructor(required: number, available: number) {
    super({
      error: 'INSUFFICIENT_FUNDS',
      message: \`Transaction requires \$\${required}, but available balance is only \$\${available}.\`,
      requiredAmount: required,
      availableBalance: available,
    });
  }
}

// Service Usage:
if (balance < amount) {
  throw new InsufficientFundsException(amount, balance);
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the benefit of extending NotFoundException or BadRequestException rather than the raw HttpException base class?"
          answer="Extending specific subclasses inherits their HTTP status codes automatically without needing to pass HttpStatus.NOT_FOUND or HttpStatus.BAD_REQUEST every time."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
