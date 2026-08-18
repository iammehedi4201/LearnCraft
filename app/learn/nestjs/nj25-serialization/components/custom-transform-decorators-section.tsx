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
// MODULE 8 — @TRANSFORM() CUSTOM VALUE FORMATTERS
// ═══════════════════════════════════════════════════════════

export function CustomTransformDecoratorsSection() {
  return (
    <SectionContainer number={8} title="Custom Formatters with @Transform()">
      {/* ── 8.1 @Transform ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Data Masking &amp; Custom Value Serialization"
          description="Format timestamps and mask credit card numbers dynamically."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎭</span> Dynamic Field Transformation
          </h4>
          <EnhancedCodeBlock
            code={`import { Transform } from 'class-transformer';

export class PaymentCardEntity {
  id: string;

  // ⭐ Obfuscates credit card number to show only last 4 digits:
  @Transform(({ value }) => \`****-****-****-\${value.slice(-4)}\`)
  cardNumber: string;

  // ⭐ Converts cents integer ($15.99 = 1599) to human formatted dollar string:
  @Transform(({ value }) => \`$\${(value / 100).toFixed(2)}\`)
  amountCents: number;

  constructor(partial: Partial<PaymentCardEntity>) {
    Object.assign(this, partial);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How does @Transform() help protect sensitive customer data like credit cards or SSNs?"
          answer="It intercepts the raw value and replaces it with a masked or formatted version (such as '****-****-****-1234') before sending the JSON response to the client."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
