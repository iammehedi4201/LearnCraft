"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  ComparisonTable,
  MistakeBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 5 — I: INTERFACE SEGREGATION PRINCIPLE
// ═══════════════════════════════════════════════════════════

export function IspSection() {
  return (
    <SectionContainer number={5} title="I — Interface Segregation Principle">
      {/* ── 1. What does it mean? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Does It Mean?"
          description="Don't force a class to use methods it does not need."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Do not make one giant interface with 20 methods. Instead, make <strong>many small interfaces</strong>. A class should only have to implement the methods it actually cares about.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Give a class only the methods it actually needs." />
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example: The Worker"
          description="Let's see why big interfaces force developers to write useless code."
          color="sky"
        />

        <MistakeBox
          title="Forcing a Coder to Design and Manage"
          description="A Programmer who is hired to write code is forced by the Worker interface to write empty dummy methods for design() and manage()!"
          wrong={`interface Worker {
  code(): void;
  design(): void;
  manage(): void;
}

class Developer implements Worker {
  code() { console.log("Writing code"); }

  // ❌ Forced to write methods they don't need!
  design() { throw new Error("I cannot design!"); }
  manage() { throw new Error("I cannot manage!"); }
}`}
          right={`// 1. Split into small, focused interfaces:
interface Developer {
  code(): void;
}

interface Designer {
  design(): void;
}

interface Manager {
  manage(): void;
}

// 2. A developer only implements Developer:
class WebDeveloper implements Developer {
  code() { console.log("Writing code"); }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Small, Focused Interfaces</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Small, simple interfaces:
interface Coder {
  writeCode(): void;
}

interface Designer {
  drawDesign(): void;
}

// Programmer only writes code:
class BackendProgrammer implements Coder {
  writeCode() {
    console.log("💻 Writing clean NestJS API endpoints...");
  }
}

// Fullstack dev can implement both:
class FullstackProgrammer implements Coder, Designer {
  writeCode() { console.log("💻 Writing APIs..."); }
  drawDesign() { console.log("🎨 Designing website layout..."); }
}

const coder = new BackendProgrammer();
coder.writeCode();

const fullstack = new FullstackProgrammer();
fullstack.writeCode();
fullstack.drawDesign();`}
            height="420px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            Smaller interfaces are much easier to use. You never have to write empty &quot;throw error&quot; dummy methods just to make TypeScript happy.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="How NestJS uses small interfaces everywhere."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-4">
          NestJS gives you small, focused interfaces for every task:
        </p>

        <ComparisonTable
          headers={["NestJS Interface", "What It Asks For", "Purpose"]}
          rows={[
            ["OnModuleInit", "Only onModuleInit()", "Run setup when the module starts"],
            ["OnModuleDestroy", "Only onModuleDestroy()", "Clean up when the module stops"],
            ["CanActivate", "Only canActivate()", "Check if user is logged in"],
            ["NestMiddleware", "Only use()", "Handle incoming HTTP middleware"],
          ]}
        />

        <QuickCheck
          question="What is the easy rule for the Interface Segregation Principle (I)?"
          answer="Give a class only the methods it actually needs."
        />
      </div>
    </SectionContainer>
  );
}
