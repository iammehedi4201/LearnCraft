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
          description="SOLID is a list of 5 simple rules for writing clean code. Each letter in the word SOLID stands for one rule."
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
            SOLID helps you write code that is:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Easy to understand</strong> — Anyone can read your code and know what it does.</li>
            <li><strong>Easy to change</strong> — You can add new features without breaking old features.</li>
            <li><strong>Easy to test</strong> — You can test small parts one by one.</li>
            <li><strong>Easy to maintain</strong> — Finding and fixing bugs is simple and fast.</li>
            <li><strong>Easy to scale</strong> — Your project can grow big without turning into a mess.</li>
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
            In a good restaurant, everyone has one clear job: Chef cooks, Dishwasher washes dishes, Waiter serves food. SOLID does the exact same thing for your code.
          </p>
        </AnalogyBox>
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
            <p className="text-xs text-ds-text-sub leading-relaxed"><strong>Add new features</strong> without changing old working code.</p>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-8 w-8 rounded-xl bg-ds-success-base text-ds-static-white flex items-center justify-center font-black text-sm">L</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Liskov Substitution</h5>
            </div>
            <p className="text-xs text-ds-text-sub leading-relaxed">A child class must <strong>behave properly</strong> like its parent.</p>
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
            <p className="text-xs text-ds-text-sub leading-relaxed">Don&apos;t create tools inside your class. <strong>Receive tools from outside</strong> (Dependency Injection).</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple Example</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Look at how simple separated code is:

class WelcomeMessage {
  getMessage(name: string) {
    return "Hello, " + name + "! Welcome to SOLID principles. 🚀";
  }
}

class ScreenPrinter {
  show(text: string) {
    console.log(text);
  }
}

// Each class does one simple job:
const greeter = new WelcomeMessage();
const printer = new ScreenPrinter();

const message = greeter.getMessage("Learner");
printer.show(message);`}
            height="320px"
          />
        </div>

        <SummaryBox>
          SOLID is simply a way to keep your code neat, tidy, and easy to change in the future.
        </SummaryBox>

        <QuickCheck
          question="Why do we use SOLID principles?"
          answer="To keep our code clean, easy to read, easy to test, and easy to change without breaking existing features."
        />
      </div>
    </SectionContainer>
  );
}
