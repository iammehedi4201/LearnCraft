"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  MistakeBox,
  EasyRuleCard,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 4 — L: LISKOV SUBSTITUTION PRINCIPLE
// ═══════════════════════════════════════════════════════════

export function LspSection() {
  return (
    <SectionContainer number={4} title="L — Liskov Substitution Principle">
      {/* ── 1. What does it mean? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Does It Mean?"
          description="Code that accepts a type should continue to work when it receives any valid subtype or implementation of that contract."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            A subtype should keep the promises made by the type it replaces. It should accept the expected inputs, return the expected kind of result, and preserve important rules about the object.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Every implementation must keep the contract its callers rely on." />

        <InfoCallout emoji="🔷" title="A TypeScript Detail">
          <p>
            TypeScript checks whether an object has the required properties and method signatures. It cannot prove that a method behaves correctly. Two classes may both satisfy <code>fly(): void</code> at compile time even if one throws “not supported” every time at runtime.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2. Bad Example vs Better Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Bad Example vs Better Example: The Bird and Penguin"
          description="Let's look at a simple example with birds."
          color="sky"
        />

        <MistakeBox
          title="Penguin Breaks the Promise of Bird"
          description="The Bird type promises a usable fly() method. Penguin matches the method signature, but it cannot keep that behavioral promise."
          wrong={`class Bird {
  fly(): void {
    console.log("Flying in the sky!");
  }
}

class Eagle extends Bird {
  fly(): void {
    console.log("Eagle is flying!");
  }
}

class Penguin extends Bird {
  fly(): void {
    // ❌ Error! Breaks the promise that birds can fly!
    throw new Error("Penguins cannot fly");
  }
}`}
          right={`// 1. Base Bird class has common traits
class Bird {
  eat(): void { console.log("Eating food..."); }
}

// 2. Only flying birds have the fly() method
class FlyingBird extends Bird {
  fly(): void { console.log("Flying in the sky!"); }
}

// 3. Eagle is a FlyingBird
class Eagle extends FlyingBird {}

// 4. Penguin is a Bird, but NOT a FlyingBird
class Penguin extends Bird {
  swim(): void { console.log("Swimming in water!"); }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Safe Birds</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Bird {
  constructor(public name: string) {}
  eat(): void {
    console.log(this.name + " is eating seeds.");
  }
}

class FlyingBird extends Bird {
  fly(): void {
    console.log(this.name + " is flying high! 🦅");
  }
}

class Eagle extends FlyingBird {}

class Penguin extends Bird {
  swim(): void {
    console.log(this.name + " is swimming fast! 🐧");
  }
}

// This function only accepts birds that can really fly:
function makeFlyingBirdFly(bird: FlyingBird): void {
  bird.fly();
}

const eagle = new Eagle("Eagle");
const penguin = new Penguin("Penguin");

makeFlyingBirdFly(eagle); // Works perfectly!
penguin.swim();           // Works perfectly!`}
            height="440px"
          />
        </div>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>✨</span> Why Is This Better?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            A function that asks for <code>FlyingBird</code> no longer receives a penguin, so the specific “flight not supported” failure is removed. Other errors are still possible and should be handled normally.
          </p>
        </WhyBox>

        <InfoCallout emoji="⚖️" title="Throwing an Error Is Not Always an LSP Violation">
          <p>
            The problem is an <strong>unexpected</strong> error that breaks the contract. If every implementation documents that <code>findById()</code> may throw when a database is unavailable, throwing that error can still follow the contract.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="How interchangeable NestJS providers rely on consistent behavior."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
          A NestJS provider token can point to different implementations—for example, an in-memory repository in tests and a PostgreSQL repository in production. Substitution is safe only when both keep the same contract:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-strong mb-6">
          <li>Both accept the same valid IDs.</li>
          <li>Both return <code>User | undefined</code> when a lookup completes.</li>
          <li>Neither uses a surprise value such as <code>null</code> or an unrelated error for “not found.”</li>
        </ul>

        <QuickCheck
          question="What is the easy rule for the Liskov Substitution Principle (L)?"
          answer="Every subtype or implementation must keep the input, output, and behavior promises of the contract so callers can substitute it safely."
        />
      </div>
    </SectionContainer>
  );
}
