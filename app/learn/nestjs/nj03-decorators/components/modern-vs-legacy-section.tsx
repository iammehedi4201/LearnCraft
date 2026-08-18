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
          title="The Evolution: Stage 1 (Legacy) vs Stage 3 (Standard)"
          description="TypeScript historically implemented decorators based on an early 2015 TC39 proposal. In 2023, TypeScript 5.0 added support for the official ECMAScript TC39 Stage 3 standard."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Legacy (TypeScript Experimental)", "Modern (TC39 Stage 3 Standard)"]}
          rows={[
            ["tsconfig Flag", '"experimentalDecorators": true', "No flag required (TS 5.0+)"],
            ["Class Decorator", "(constructor: Function) => void", "(target: Function, context: ClassDecoratorContext) => void"],
            ["Method Decorator", "(target, key, descriptor) => void", "(value: Function, context: ClassMethodDecoratorContext) => Function"],
            ["Parameter Decorators", "Supported (@Body, @Param)", "Not supported in the standard"],
            ["reflect-metadata DI", "Full support (emitDecoratorMetadata)", "Not supported yet in standard"],
            ["Primary Ecosystem", "NestJS, Angular, TypeORM", "Vanilla TS, Web Components, modern libraries"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 14.2 The Modern Context Object ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Modern Decorator Context Object"
          description="Modern decorators pass a structured context object containing metadata about the member (kind, name, static, private, addInitializer)."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Modern Standard Method Decorator</SectionHeading>
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
  // Simulating modern decorator usage:
  generateInvoice(invoiceId: number) {
    return { id: invoiceId, status: "PAID" };
  }
}

// Manually applying the decorator to demonstrate the modern signature:
const descriptor = ModernLog(InvoiceService.prototype.generateInvoice, {
  kind: "method",
  name: "generateInvoice",
  static: false,
  private: false,
});

InvoiceService.prototype.generateInvoice = descriptor as any;

const service = new InvoiceService();
console.log("Result:", service.generateInvoice(501));`}
            height="420px"
          />
        </div>

        <InfoCallout emoji="⚠️" title="Why NestJS Sticks with Legacy Decorators">
          <p>
            NestJS architecture depends fundamentally on <strong>Parameter Decorators</strong> (<code>@Param()</code>, <code>@Body()</code>) and <strong>automatic constructor type emission</strong> (<code>emitDecoratorMetadata</code>). Because the TC39 Stage 3 standard intentionally omitted parameter decorators and type reflection, NestJS will continue using <code>experimentalDecorators: true</code> for the foreseeable future.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Which decorator system should you configure in tsconfig.json for NestJS projects?"
          answer="Always enable 'experimentalDecorators: true' and 'emitDecoratorMetadata: true'. NestJS relies on the experimental decorator specification for parameter decorators and dependency injection metadata."
        />
      </div>
    </SectionContainer>
  );
}
