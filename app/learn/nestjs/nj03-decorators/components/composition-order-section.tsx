"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
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
          description="When you stack multiple decorators above a single method or class, they execute in two simple phases: Factories run Top → Bottom, and Decorator Wrappers apply Bottom → Top."
          color="primary"
        />

        <AnalogyBox emoji="🧥" title="The Winter Layers Analogy">
          <p>
            Think of stacking decorators like putting on warm layers for winter:
          </p>
          <p className="mt-2">
            The decorator <strong>closest to the method</strong> (at the bottom) is like your t-shirt — it wraps the method first. The decorator at the top is like your heavy jacket — it wraps around everything else!
          </p>
          <p className="mt-2">
            When someone calls the method from outside, the call hits the <strong>jacket first (top decorator)</strong>, then the inner layers, and finally the actual method body.
          </p>
        </AnalogyBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-6">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-xs uppercase tracking-wider text-ds-info-dark mb-2">Phase 1: Factory Evaluation (Top → Down)</h5>
            <p className="text-xs text-ds-text-sub mb-3">Outer factory functions execute down the page to prepare their settings.</p>
            <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3 rounded-lg text-xs font-mono">
{`@First()   // 1st factory evaluated
@Second()  // 2nd factory evaluated
@Third()   // 3rd factory evaluated
class Target {}`}
            </pre>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <h5 className="font-bold text-xs uppercase tracking-wider text-ds-success-dark mb-2">Phase 2: Decorator Application (Bottom → Up)</h5>
            <p className="text-xs text-ds-text-sub mb-3">The actual decorators wrap the target starting from the one closest to it!</p>
            <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3 rounded-lg text-xs font-mono">
{`@First()   // 3rd applied (outer jacket)
@Second()  // 2nd applied
@Third()   // 1st applied (inner shirt)
class Target {}`}
            </pre>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live Proof of Execution Order</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Watch the console logs below to see the exact order that TypeScript executes each factory and decorator:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function First() {
  console.log("1. First() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("6. First decorator applied (Bottom-up: Outer wrapper)");
  };
}

function Second() {
  console.log("2. Second() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("5. Second decorator applied (Bottom-up: Middle wrapper)");
  };
}

function Third() {
  console.log("3. Third() factory evaluated (Top-down)");
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("4. Third decorator applied (Bottom-up: Inner wrapper)");
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
          title="Overall Execution Order Across a Whole Class"
          description="When a class has decorators on properties, methods, parameters, and the class itself, TypeScript follows a strict, predictable order."
          color="sky"
        />

        <StepList
          steps={[
            { label: "1. Instance Members", note: "Parameters, Methods, and Properties for each instance member (evaluated in the order they are written)." },
            { label: "2. Static Members", note: "Static parameters, methods, and properties." },
            { label: "3. Constructor Parameters", note: "Parameter decorators on constructor arguments." },
            { label: "4. Class Decorator", note: "The class decorator ALWAYS runs last after all inner parts have been decorated!" },
          ]}
        />

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Multi-Target Order in Action</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            See how property, method, parameter, and class decorators fire in sequence:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function ClassDec(target: any) {
  console.log("4. 📦 Class decorator executed (Always LAST!)");
}

function PropDec(target: any, key: string) {
  console.log("1. 🏷️ Property decorator on:", key);
}

function MethodDec(target: any, key: string, desc: PropertyDescriptor) {
  console.log("3. 🔧 Method decorator on:", key);
}

function ParamDec(target: any, key: string | undefined, index: number) {
  console.log("2. 📥 Parameter decorator on index #" + index);
}

@ClassDec
class UserAccount {
  @PropDec
  email: string = "user@test.com";

  @MethodDec
  login(@ParamDec token: string) {
    return true;
  }
}

console.log("All decorators finished!");`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="If you write @Log above @Auth on a method, which one runs first when a user actually calls the method?"
          answer="@Auth is closest to the method, so it wraps the method first. Then @Log wraps around @Auth. When someone calls the method at runtime, execution flows from outside-in: @Log runs first -> @Auth runs second -> the real method runs last."
        />
      </div>
    </SectionContainer>
  );
}
