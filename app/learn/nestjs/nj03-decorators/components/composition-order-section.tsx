"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 12 — DECORATOR COMPOSITION & EXECUTION ORDER
// ═══════════════════════════════════════════════════════════

export function CompositionOrderSection() {
  return (
    <SectionContainer number={12} title="Decorator Composition & Order">
      {/* ── 12.1 Evaluation vs Application Order ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Two Phases: Evaluation vs Application"
          description="When multiple decorators are stacked on the same declaration, they execute in two distinct phases: factories are evaluated Top → Bottom, and decorators are applied Bottom → Top."
          color="primary"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-xs uppercase tracking-wider text-ds-info-dark mb-2">Phase 1: Factory Evaluation (Top → Bottom)</h5>
            <p className="text-xs text-ds-text-sub mb-3">The outer factory functions execute in the order they are written down the page.</p>
            <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3 rounded-lg text-xs font-mono">
{`@First()   // 1st evaluated
@Second()  // 2nd evaluated
@Third()   // 3rd evaluated
class Target {}`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-xs uppercase tracking-wider text-ds-success-dark mb-2">Phase 2: Decorator Application (Bottom → Top)</h5>
            <p className="text-xs text-ds-text-sub mb-3">The actual decorator functions execute in reverse, starting from the one closest to the target!</p>
            <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3 rounded-lg text-xs font-mono">
{`@First()   // 3rd applied (outer wrapper)
@Second()  // 2nd applied
@Third()   // 1st applied (inner wrapper)
class Target {}`}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live Proof of Execution Order</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function First() {
  console.log("1. First() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("6. First decorator applied (Bottom-up)");
  };
}

function Second() {
  console.log("2. Second() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("5. Second decorator applied (Bottom-up)");
  };
}

function Third() {
  console.log("3. Third() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("4. Third decorator applied (Bottom-up)");
  };
}

class Example {
  @First()
  @Second()
  @Third()
  myMethod() {
    console.log("Method called!");
  }
}

console.log("Class definition complete.");`}
            height="460px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 12.2 Full Execution Order across Target Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Full Execution Order across Different Decorator Targets"
          description="When a class contains decorators on properties, methods, parameters, and the class itself, TypeScript evaluates them in a strictly defined order."
          color="sky"
        />

        <StepList
          steps={[
            { label: "1. Instance Members", note: "Property & Method & Parameter decorators for each instance member." },
            { label: "2. Static Members", note: "Property & Method & Parameter decorators for each static member." },
            { label: "3. Constructor Parameters", note: "Parameter decorators placed on constructor arguments." },
            { label: "4. Class Decorator", note: "The class decorator ALWAYS runs last after all members have been decorated." },
          ]}
        />

        <QuickCheck
          question="If you stack @Log and @Auth on a method in that order (@Log above @Auth), which decorator function wraps the method first, and which wrapper runs first on invocation?"
          answer="@Auth is closest to the method, so it wraps the original method FIRST. Then @Log wraps the result. When the method is invoked, execution goes from outside in: @Log wrapper runs -> @Auth wrapper runs -> actual method runs."
        />
      </div>
    </SectionContainer>
  );
}
