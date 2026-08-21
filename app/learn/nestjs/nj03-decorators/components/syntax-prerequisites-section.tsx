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
          title="The @ Syntax & tsconfig.json Setup"
          description="In TypeScript, decorators use the @ prefix. To allow TypeScript to understand decorators, you need to turn on two simple switches in your tsconfig.json file."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚙️</span> The 2 Required tsconfig.json Settings
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            NestJS uses the standard TypeScript decorator format. Open your <code>tsconfig.json</code> file and ensure these two lines are inside <code>compilerOptions</code>:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-4 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`{
  "compilerOptions": {
    "target": "ES2021",
    "experimentalDecorators": true,     // 1. Allows you to write @Decorator syntax
    "emitDecoratorMetadata": true       // 2. Lets NestJS read parameter types for Dependency Injection
  }
}`}
          </pre>
        </WhyBox>

        <StepList
          steps={[
            {
              label: "1. Write a normal JavaScript function",
              note: "Decorators are just ordinary functions that receive information about the target.",
              code: "function Logger(target: any) {\n  console.log('Decorating:', target.name);\n}",
            },
            {
              label: "2. Place @FunctionName right above your target",
              note: "Put @Logger directly on the line above your class or method.",
              code: "@Logger\nclass UsersService {}",
            },
            {
              label: "3. TypeScript transforms it into a function call",
              note: "Under the hood, TypeScript transforms '@Logger class UsersService' into 'Logger(UsersService)'.",
            },
          ]}
        />

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: How TypeScript Runs a Decorator Under the Hood</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            This live playground demonstrates that <code>@Tag</code> is literally just calling <code>Tag(target)</code>:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Define our decorator function
function SimpleBadge(target: Function) {
  console.log("🏷️ Stamped badge on class:", target.name);
}

// Step 2: Use the @ syntax
@SimpleBadge
class MemberAccount {
  constructor(public username: string) {}
}

// When TypeScript compiles this, it executes: SimpleBadge(MemberAccount)
const member = new MemberAccount("Alice");
console.log("Created member:", member.username);`}
            height="320px"
          />
        </div>

        <MistakeBox
          title="Accidentally putting a semicolon after @Decorator"
          description="Never put a semicolon ';' right after the @Decorator line. It must attach directly to the class or method beneath it."
          wrong={`@Controller() ;\nclass UsersController {}`}
          right={`@Controller()\nclass UsersController {}`}
        />
      </div>

      <Divider />

      {/* ── 2.2 Functions as First-Class Citizens & Wrappers ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Function Wrappers & Closures"
          description="In JavaScript, functions can take other functions as inputs and return brand new wrapped functions. This is the secret behind how decorators intercept method calls."
          color="sky"
        />

        <AnalogyBox emoji="🎁" title="Functions as Gift Wrappers">
          <p>
            Think of a <strong>Function Wrapper</strong> like wrapping a gift box. You take an ordinary item (the original function), wrap it with colorful paper and a bow (extra logging or timing code), and return the wrapped gift!
          </p>
          <p className="mt-2">
            When someone opens the gift (calls the function), the wrapper runs first, then the original item does its job.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Wrapping a Function Live</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            See how <code>withTiming</code> wraps an ordinary <code>sendEmail</code> function to automatically measure how long it takes:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. The original simple function:
function sendEmail(recipient: string, message: string) {
  console.log("📨 Sending email to " + recipient + ": " + message);
  return { success: true };
}

// 2. A wrapper function that adds a timer around ANY function:
function withTiming(originalFn: Function) {
  // Returns a new function that wraps the original one:
  return function (...args: any[]) {
    console.log("⏱️ Timer started...");
    const start = performance.now();
    
    // Call the original function with its arguments
    const result = originalFn(...args);
    
    const duration = (performance.now() - start).toFixed(2);
    console.log("✅ Finished in " + duration + "ms");
    return result;
  };
}

// 3. Create our timed version and test it:
const timedSendEmail = withTiming(sendEmail);
timedSendEmail("alice@test.com", "Welcome to LearnCraft!");`}
            height="380px"
          />
        </div>

        <InfoCallout emoji="💡" title="What is a 'Closure' in Plain English?">
          <p>
            A <strong>closure</strong> is just an inner function that remembers the variables from the outer function, even after the outer function has finished running. Decorators use closures so they can remember your settings (like <code>@Roles(&apos;admin&apos;)</code>) whenever someone calls the method later.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.3 Preserving 'this' with .apply() ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Preserving 'this' (The Object Context)"
          description="When a decorator wraps a class method, it must ensure the method can still access its own instance variables (like this.balance or this.name). We do this using .apply(this, args)."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Keeping the 'this' Context Intact</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            In this example, <code>this.balance</code> needs to belong to the specific bank account instance. Calling <code>original.apply(this, args)</code> guarantees <code>this</code> points to the right account:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  balance = 500;

  deposit(amount: number) {
    this.balance += amount;
    console.log("💰 Deposited $" + amount + ". New balance: $" + this.balance);
    return this.balance;
  }
}

// If we wrap the method, we MUST preserve 'this':
function wrapMethod(targetObj: any, methodName: string) {
  const original = targetObj[methodName];
  
  targetObj[methodName] = function (...args: any[]) {
    console.log("🔍 Intercepted " + methodName + " with args:", args);
    // 'this' inside this function is the BankAccount instance!
    return original.apply(this, args); // Correctly updates this.balance!
  };
}

const account = new BankAccount();
wrapMethod(account, "deposit");
account.deposit(250); // Balance becomes $750`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="Why do we use originalMethod.apply(this, args) instead of just originalMethod(...args)?"
          answer="Because class methods need to access instance data like this.balance or this.userService. If we call originalMethod() without .apply(this, args), JavaScript loses track of 'this', causing runtime errors when trying to read this.properties."
        />
      </div>
    </SectionContainer>
  );
}
