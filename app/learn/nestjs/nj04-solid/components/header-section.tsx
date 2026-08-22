"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  SummaryBox,
  InfoCallout,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 1 — THE BIG PICTURE (WHAT IS SOLID?)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is SOLID?">
      {/* ── 1.1 What is SOLID? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is SOLID?"
          description="SOLID is a group of five design guidelines. Each letter describes a different way to keep changing TypeScript code easier to understand, test, and extend."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🤔</span> Why do we need SOLID?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            When you write code, it is easy to put everything in one big file. At first, it works. But soon, the code becomes a huge mess. When you try to fix one thing, you accidentally break something else!
          </p>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            SOLID can help you write code that is:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Easier to understand</strong> — Responsibilities and relationships are clearer.</li>
            <li><strong>Safer to change</strong> — New features are less likely to affect unrelated code.</li>
            <li><strong>Easy to test</strong> — You can test small parts one by one.</li>
            <li><strong>Easier to maintain</strong> — Bugs and changes have more obvious places to go.</li>
            <li><strong>Easier to grow</strong> — The design can gain new behavior without one class owning everything.</li>
          </ul>
        </WhyBox>

        <AnalogyBox emoji="🍳" title="Simple Real-Life Story: The Kitchen">
          <p>
            Imagine a restaurant kitchen with only <strong>one person</strong>. This one person takes the order, chops the onions, cooks the food, washes the dirty dishes, and serves the table.
          </p>
          <p className="mt-2">
            If that one person gets sick, or if the food recipe changes, the <strong>whole restaurant stops working</strong>!
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            In a good restaurant, related work has a clear owner: the chef cooks, the dishwasher cleans, and the waiter serves. SOLID helps us make similarly clear boundaries in code.
          </p>
        </AnalogyBox>

        <InfoCallout emoji="🧭" title="Guidelines, Not Automatic Rules">
          <p>
            SOLID does <strong>not</strong> mean “make a class for every line of code.” Start with the simplest design that is clear. Split or abstract code when it has different reasons to change, is hard to test, or needs interchangeable behavior.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 1.2 The 5 Letters ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The 5 Principles of SOLID"
          description="Here is what each letter means in very simple words:"
          color="sky"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-feature-base text-ds-static-white flex items-center justify-center font-black text-sm">S</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Single Responsibility</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">A class should have <strong>only one main job</strong>.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-info-base text-ds-static-white flex items-center justify-center font-black text-sm">O</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Open / Closed</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed"><strong>Extend behavior</strong> without repeatedly editing stable code.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-success-base text-ds-static-white flex items-center justify-center font-black text-sm">L</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Liskov Substitution</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">A subtype must keep the <strong>behavioral promises</strong> of its type.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-warning-base text-ds-static-white flex items-center justify-center font-black text-sm">I</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Interface Segregation</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Don&apos;t force a class to use <strong>methods it does not need</strong>.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-error-base text-ds-static-white flex items-center justify-center font-black text-sm">D</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Dependency Inversion</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">Business logic should depend on <strong>contracts</strong>, not one hard-coded tool.</p>
          </div>
        </div>

        <InfoCallout emoji="🔷" title="Our TypeScript Path">
          <p>
            We will begin with plain classes and interfaces, then combine the principles in larger examples, and finally connect them to NestJS. TypeScript interfaces help describe contracts, but they disappear when the code runs; that detail becomes important when we reach NestJS injection tokens.
          </p>
        </InfoCallout>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple Example</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// A small first example with explicit TypeScript types:
type Learner = {
  name: string;
};

class WelcomeMessage {
  createFor(learner: Learner): string {
    return "Hello, " + learner.name + "! Welcome to SOLID. 🚀";
  }
}

class ScreenPrinter {
  show(text: string): void {
    console.log(text);
  }
}

// For this lesson, each class has one clear responsibility.
const greeter = new WelcomeMessage();
const printer = new ScreenPrinter();

const learner: Learner = { name: "Learner" };
const message = greeter.createFor(learner);
printer.show(message);`}
            height="320px"
          />
        </div>

        <SummaryBox>
          SOLID gives you five questions to ask about a design. Use the principles to reduce unnecessary coupling and make likely changes easier—not to add abstractions everywhere.
        </SummaryBox>

        <QuickCheck
          question="Why do we use SOLID principles?"
          answer="To make responsibilities and dependencies clearer so code is easier to understand, test, and change with less risk. SOLID guides design; it does not guarantee bug-free code."
        />
      </div>
    </SectionContainer>
  );
}
