"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  InfoCallout,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 14 — MODERN VS LEGACY DECORATORS
// ═══════════════════════════════════════════════════════════

export function ModernVsLegacySection() {
  return (
    <SectionContainer number={14} title="Modern vs Legacy Decorators">
      {/* ── 14.1 Two Decorator Standards ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Story: Experimental (Legacy) vs Standard (Modern)"
          description="TypeScript has two versions of decorators: the classic experimental version that NestJS uses, and the newer ECMAScript TC39 Stage 3 standard."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Classic / Experimental (NestJS uses this)", "Modern Standard (TS 5.0+)"]}
          rows={[
            ["tsconfig Flag", '"experimentalDecorators": true', "No compiler flag needed"],
            ["Class Decorator", "(constructor: Function) => void", "(target, context: ClassDecoratorContext) => void"],
            ["Method Decorator", "(target, key, descriptor) => void", "(value: Function, context: ClassMethodDecoratorContext) => Function"],
            ["Parameter Decorators", "Supported (@Body, @Param)", "Not supported in the new standard"],
            ["Type Reflection (DI)", "Full support (emitDecoratorMetadata)", "Not yet supported in the standard"],
            ["Primary Ecosystem", "NestJS, Angular, TypeORM", "Vanilla TypeScript 5, Web Components"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 14.2 The Modern Context Object ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How Modern Standard Decorators Look"
          description="In the new TC39 Stage 3 standard, decorators receive a structured context helper object (kind, name, static, private)."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Modern Standard Method Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Here is how a modern TC39 Stage 3 method decorator receives its function and context object:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Modern TC39 Stage 3 Method Decorator signature:
function ModernLog(originalMethod: Function, context: any) {
  const methodName = String(context.name);

  return function (this: any, ...args: any[]) {
    console.log("⚡ [TC39 STAGE 3] Running method: " + methodName + " (isStatic: " + !!context.static + ")");
    return originalMethod.apply(this, args);
  };
}

class InvoiceService {
  generateInvoice(invoiceId: number) {
    return { id: invoiceId, status: "PAID" };
  }
}

// Demonstrating how the modern decorator function receives (method, context):
const modernDescriptor = ModernLog(InvoiceService.prototype.generateInvoice, {
  kind: "method",
  name: "generateInvoice",
  static: false,
  private: false,
});

InvoiceService.prototype.generateInvoice = modernDescriptor as any;

const service = new InvoiceService();
console.log("Result:", service.generateInvoice(501));`}
            height="420px"
          />
        </div>

        <InfoCallout emoji="⚠️" title="Why NestJS Sticks with Classic Experimental Decorators">
          <p>
            NestJS architecture depends heavily on <strong>Parameter Decorators</strong> (<code>@Param()</code>, <code>@Body()</code>) and <strong>automatic constructor type inspection</strong> (<code>emitDecoratorMetadata</code>). Because the new TC39 standard intentionally omitted parameter decorators and type reflection, NestJS continues using <code>experimentalDecorators: true</code>.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Which decorator settings must you configure in tsconfig.json for NestJS projects?"
          answer="Always enable 'experimentalDecorators: true' and 'emitDecoratorMetadata: true' in your tsconfig.json. NestJS depends on these flags for parameter decorators and dependency injection."
        />
      </div>
    </SectionContainer>
  );
}
