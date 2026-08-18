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
// MODULE 4 — CUSTOM VALIDATION PIPES & EXCEPTIONS
// ═══════════════════════════════════════════════════════════

export function CustomValidationSection() {
  return (
    <SectionContainer number={4} title="Custom Validation Pipes & Exceptions">
      {/* ── 4.1 Custom Validation Pipe ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Writing Custom Validation Rules"
          description="How to throw BadRequestException inside a custom pipe."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Rejecting Invalid Inputs
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            When a value does not meet your business criteria, throwing a standard NestJS <code>BadRequestException</code> immediately stops the pipeline and returns a structured 400 JSON response.
          </p>
          <EnhancedCodeBlock
            code={`import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTaskStatusPipe implements PipeTransform {
  private readonly allowedStatuses = ['pending', 'in_progress', 'completed'];

  transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Status must be a non-empty string');
    }
    const status = value.toLowerCase().trim();
    if (!this.allowedStatuses.includes(status)) {
      throw new BadRequestException(
        \`"\${value}" is not a valid status. Allowed values: \${this.allowedStatuses.join(', ')}\`
      );
    }
    return status;
  }
}

// Controller Usage:
@Patch(':id/status')
updateStatus(
  @Param('id', ParseIntPipe) id: number,
  @Body('status', ParseTaskStatusPipe) status: string,
) {
  return this.tasksService.updateStatus(id, status);
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What exception should you throw from inside a Pipe when validation fails?"
          answer="BadRequestException (or any HttpException derived from '@nestjs/common')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
