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
// MODULE 3 — CUSTOM TRANSFORMATION PIPES
// ═══════════════════════════════════════════════════════════

export function CustomTransformationSection() {
  return (
    <SectionContainer number={3} title="Custom Transformation Pipes & ArgumentMetadata">
      {/* ── 3.1 PipeTransform Interface ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Building a Custom Transformation Pipe"
          description="How to implement PipeTransform to alter input values before controller execution."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The PipeTransform Interface &amp; ArgumentMetadata
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Every pipe implements <code>transform(value: any, metadata: ArgumentMetadata)</code>.
            The <code>metadata</code> object tells you where the argument came from:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li><code>metadata.type</code>: <code>&apos;body&apos; | &apos;query&apos; | &apos;param&apos; | &apos;custom&apos;</code></li>
            <li><code>metadata.metatype</code>: The TypeScript type or class (e.g. <code>CreateUserDto</code>)</li>
            <li><code>metadata.data</code>: The parameter name (e.g. <code>&apos;id&apos;</code>)</li>
          </ul>
          <EnhancedCodeBlock
            code={`import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimStringsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.trim();
    }
    if (typeof value === 'object' && value !== null) {
      // Trim all string properties on incoming objects:
      for (const key of Object.keys(value)) {
        if (typeof value[key] === 'string') {
          value[key] = value[key].trim();
        }
      }
    }
    return value;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What property on ArgumentMetadata tells you if the parameter was extracted from @Body(), @Query(), or @Param()?"
          answer="metadata.type ('body' | 'query' | 'param' | 'custom')."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
