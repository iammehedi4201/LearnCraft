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
  InfoCallout,
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
          description="Clients should depend only on the small part of a contract they actually use."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Avoid one large interface that mixes unrelated capabilities. Prefer focused interfaces shaped around what a caller needs, so implementations are not forced to provide meaningless methods.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Prefer small, client-focused contracts over one oversized interface." />

        <InfoCallout emoji="🔷" title="TypeScript Uses Structural Typing">
          <p>
            A class does not always need the <code>implements</code> keyword. If an object has the required shape, TypeScript can use it as that interface. Writing <code>implements</code> is still useful because it checks your intention close to the class.
          </p>
        </InfoCallout>
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
          description="A programmer who is hired to write code is forced by the WorkCapabilities interface to write empty dummy methods for design() and manage()!"
          wrong={`interface WorkCapabilities {
  code(): void;
  design(): void;
  manage(): void;
}

class Developer implements WorkCapabilities {
  code(): void { console.log("Writing code"); }

  // ❌ Forced to write methods they don't need!
  design(): void { throw new Error("I cannot design!"); }
  manage(): void { throw new Error("I cannot manage!"); }
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
  code(): void { console.log("Writing code"); }
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
  writeCode(): void {
    console.log("💻 Writing clean NestJS API endpoints...");
  }
}

// Fullstack dev can implement both:
class FullstackProgrammer implements Coder, Designer {
  writeCode(): void { console.log("💻 Writing APIs..."); }
  drawDesign(): void { console.log("🎨 Designing website layout..."); }
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
            Each caller can request only the capability it uses, and each class can honestly implement the contracts it supports. That removes empty stubs and surprise “not supported” errors.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="Examples of focused interfaces NestJS provides."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-4">
          NestJS provides several small, focused interfaces:
        </p>

        <ComparisonTable
          headers={["NestJS Interface", "What It Asks For", "Purpose"]}
          rows={[
            ["OnModuleInit", "Only onModuleInit()", "Run setup when the module starts"],
            ["OnModuleDestroy", "Only onModuleDestroy()", "Clean up when the module stops"],
            ["CanActivate", "Only canActivate()", "Decide whether a request may continue"],
            ["NestMiddleware", "Only use()", "Handle incoming HTTP middleware"],
          ]}
        />

        <InfoCallout emoji="🧠" title="Compile-Time Contracts">
          <p>
            These NestJS interfaces help TypeScript check method shapes while you develop. Like other TypeScript interfaces, they do not exist at runtime and do not register the class with NestJS.
          </p>
        </InfoCallout>

        <QuickCheck
          question="What is the easy rule for the Interface Segregation Principle (I)?"
          answer="Keep contracts small and focused on the needs of their clients, so implementations do not depend on or fake unrelated capabilities."
        />
      </div>
    </SectionContainer>
  );
}
