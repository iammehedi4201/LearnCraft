"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  Divider,
  InfoCallout,
  StepList,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 2 — SYNTAX & PREREQUISITES
// ═══════════════════════════════════════════════════════════

export function SyntaxPrerequisitesSection() {
  return (
    <SectionContainer number={2} title="Syntax & Prerequisites">
      {/* ── 2.1 The @ Symbol & tsconfig ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The @ Syntax & TypeScript Configuration"
          description="In TypeScript, decorators use the special @ prefix syntax. To use them in NestJS projects, you must enable specific compiler options in tsconfig.json."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> Required tsconfig.json Settings
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Because decorators in NestJS use the legacy experimental specification, TypeScript requires two flags in <code>tsconfig.json</code>:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-4 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`{
  "compilerOptions": {
    "target": "ES2021",
    "experimentalDecorators": true,     // Enables the @ decorator syntax
    "emitDecoratorMetadata": true       // Emits TypeScript type information for DI
  }
}`}
          </pre>
        </WhyBox>

        <StepList
          steps={[
            {
              label: "Write a normal JavaScript function",
              note: "Decorators are just functions with standard parameters.",
              code: "function Logger(target: any) { console.log('Decorating:', target.name); }",
            },
            {
              label: "Prefix with @ directly above target",
              note: "Place @Logger right above the class, method, or property.",
              code: "@Logger\nclass UsersService {}",
            },
            {
              label: "TypeScript transforms the syntax into a function call",
              note: "Under the hood, TypeScript compiles @Logger class UsersService to: Logger(UsersService).",
            },
          ]}
        />

        <MistakeBox
          title="Putting a semicolon after the decorator"
          description="Never put a semicolon after the @Decorator line. It must attach directly to the declaration beneath it."
          wrong={`@Controller() ;\nclass UsersController {}`}
          right={`@Controller()\nclass UsersController {}`}
        />
      </div>

      <Divider />

      {/* ── 2.2 Functions as First-Class Citizens & Higher-Order Functions ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Higher-Order Functions & Closures"
          description="In JavaScript, functions can be passed as arguments, stored in variables, and returned from other functions. This concept is essential for understanding decorator factories."
          color="sky"
        />

        <AnalogyBox emoji="🎁" title="Functions as Gift Wrappers">
          <p>
            Think of a <strong>Higher-Order Function</strong> as a gift wrapper. It takes a plain object (the original function), wraps it in fancy paper and ribbon (adds extra logging/security), and hands back the wrapped gift.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Wrapping a Function Live</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Original function
function sendEmail(recipient: string, message: string) {
  console.log("📨 Sending email to " + recipient + ": " + message);
  return { success: true };
}

// Step 2: Higher-Order Function that wraps sendEmail with timing
function withTiming(originalFn: Function) {
  return function (...args: any[]) {
    console.log("⏱️ Timer started...");
    const start = performance.now();
    
    // Call the original function
    const result = originalFn(...args);
    
    const duration = (performance.now() - start).toFixed(2);
    console.log("✅ Finished in " + duration + "ms");
    return result;
  };
}

// Step 3: Wrap it
const timedSendEmail = withTiming(sendEmail);
timedSendEmail("alice@test.com", "Welcome to LearnCraft!");`}
            height="360px"
          />
        </div>

        <InfoCallout emoji="💡" title="Why Closures Matter for Decorators">
          <p>
            A <strong>closure</strong> is created when an inner function remembers variables from its outer function even after the outer function has finished executing. Decorator factories (like <code>@Roles(&apos;admin&apos;)</code>) rely entirely on closures to remember your configuration options!
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.3 Preserving 'this' with .apply() ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Method Interception & Preserving 'this'"
          description="When decorators intercept and wrap class methods, they must use .apply(this, args) or .call(this, ...args) to avoid losing the object's instance context."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: The 'this' Context Problem</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  balance = 500;

  deposit(amount: number) {
    this.balance += amount;
    console.log("New balance: $" + this.balance);
    return this.balance;
  }
}

// If we wrap the method, we MUST preserve 'this':
function wrapMethod(targetObj: any, methodName: string) {
  const original = targetObj[methodName];
  
  targetObj[methodName] = function (...args: any[]) {
    console.log("Intercepted " + methodName + " with args:", args);
    // 'this' inside this function is the BankAccount instance!
    return original.apply(this, args); // Preserves this.balance!
  };
}

const account = new BankAccount();
wrapMethod(account, "deposit");
account.deposit(250); // Works correctly: balance = 750`}
            height="360px"
          />
        </div>

        <QuickCheck
          question="Why do we use originalMethod.apply(this, args) when replacing a method in a decorator?"
          answer="Because JavaScript methods rely on the 'this' keyword to access instance properties (like this.balance or this.usersService). If you called originalMethod(...args) without .apply(this, args), 'this' would be undefined or point to the global scope, causing runtime errors."
        />
      </div>
    </SectionContainer>
  );
}
