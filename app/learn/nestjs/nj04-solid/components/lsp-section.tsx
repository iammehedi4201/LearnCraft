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
          description="If a class is a child of another class, we should be able to use the child wherever the parent is expected without breaking the program."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> In Simple Words
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            A child class should never surprise you. If a parent class promises that a method works, the child class should not break that promise or throw an error.
          </p>
        </WhyBox>

        <EasyRuleCard rule="A child class should behave correctly wherever its parent is expected." />
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
          description="The parent class Bird promises that all birds can fly. But Penguin cannot fly and throws an error, which crashes the program!"
          wrong={`class Bird {
  fly() {
    console.log("Flying in the sky!");
  }
}

class Eagle extends Bird {
  fly() {
    console.log("Eagle is flying!");
  }
}

class Penguin extends Bird {
  fly() {
    // ❌ Error! Breaks the promise that birds can fly!
    throw new Error("Penguins cannot fly");
  }
}`}
          right={`// 1. Base Bird class has common traits
class Bird {
  eat() { console.log("Eating food..."); }
}

// 2. Only flying birds have the fly() method
class FlyingBird extends Bird {
  fly() { console.log("Flying in the sky!"); }
}

// 3. Eagle is a FlyingBird
class Eagle extends FlyingBird {}

// 4. Penguin is a Bird, but NOT a FlyingBird
class Penguin extends Bird {
  swim() { console.log("Swimming in water!"); }
}`}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Safe Birds</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Bird {
  constructor(public name: string) {}
  eat() {
    console.log(this.name + " is eating seeds.");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log(this.name + " is flying high! 🦅");
  }
}

class Eagle extends FlyingBird {}

class Penguin extends Bird {
  swim() {
    console.log(this.name + " is swimming fast! 🐧");
  }
}

// This function only accepts birds that can really fly:
function makeFlyingBirdFly(bird: FlyingBird) {
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
            Now, any function that asks for a <code>FlyingBird</code> will never crash because only birds that can actually fly are allowed. No surprises, no sudden errors.
          </p>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3. NestJS Connection ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="NestJS Connection"
          description="How NestJS uses Liskov Substitution for clean class design."
          color="emerald"
        />

        <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
          In NestJS, custom error filters and guards extend parent classes:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-strong mb-6">
          <li>Custom exceptions extend <code>HttpException</code>.</li>
          <li>Custom filters extend <code>BaseExceptionFilter</code>.</li>
          <li>NestJS can handle any custom error because all of them behave properly like their parent class!</li>
        </ul>

        <QuickCheck
          question="What is the easy rule for the Liskov Substitution Principle (L)?"
          answer="A child class should behave correctly wherever its parent is expected."
        />
      </div>
    </SectionContainer>
  );
}
