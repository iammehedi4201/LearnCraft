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
          description="A function wrapper takes a function, adds something extra, and returns a new function. This is the trick decorators use to intercept method calls."
          color="sky"
        />

        <AnalogyBox emoji="📱" title="Think of it Like a Phone Case">
          <p>
            Your phone (the original function) works perfectly fine on its own. A phone case (the wrapper) goes around it and adds protection — but the phone still does the exact same thing inside.
          </p>
          <p className="mt-2">
            A <strong>function wrapper</strong> does the same thing: it wraps extra behavior around a function without changing what the function actually does.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Wrapping a Function</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            <code>addKnock</code> takes any function, wraps it so it prints a message first, then runs the original function:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// The original function — just says hello
function sayHello(name: string) {
  console.log("Hello, " + name + "!");
}

// A wrapper: takes ANY function, adds a "knock" before it
function addKnock(fn: Function) {
  return function (...args: any[]) {
    console.log("🚪 Knock knock!");  // extra behavior
    fn(...args);                      // run the original
  };
}

// Without wrapper:
sayHello("Mehedi");

// With wrapper:
const politeHello = addKnock(sayHello);
politeHello("Mehedi");`}
            height="340px"
          />
        </div>

        <InfoCallout emoji="💡" title="What is a 'Closure'?">
          <p>
            A <strong>closure</strong> = an inner function that <strong>remembers</strong> variables from the outer function, even after the outer function is done.
          </p>
          <p className="mt-2">
            In the example above, <code>addKnock</code> returns a new function. That new function still remembers <code>fn</code> (the original function) — that&apos;s a closure! Decorators use closures to remember your settings (like <code>@Roles(&apos;admin&apos;)</code>) whenever the method is called later.
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 2.3 Preserving 'this' with .apply() ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Keeping 'this' Working"
          description="When a wrapper replaces a class method, it must still tell the original method which object it belongs to. That is what .apply(this, args) does."
          color="emerald"
        />

        <AnalogyBox emoji="🏷️" title="What does 'this' mean?">
          <p>
            Inside a class method, <strong>this</strong> means &ldquo;the object that called this method.&rdquo; For example, in <code>counter.add(2)</code>, <code>this</code> is the <code>counter</code> object.
          </p>
          <p className="mt-2">
            <strong>The problem:</strong> when you wrap a method with a new function, <code>this</code> can get lost. The fix is simple: <code>originalMethod.apply(this, args)</code> means &ldquo;run the original method, but keep <code>this</code> pointing to the same object.&rdquo;
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Keep the Counter Working</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            The wrapper logs a message, then calls the original <code>add</code> method. The counter still updates because <code>.apply(this, args)</code> keeps <code>this</code> connected to the counter object:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Counter {
  count = 0;

  add(number: number) {
    this.count += number;
    console.log("Count is now " + this.count);
  }
}

// Put a wrapper in front of a method:
function wrapMethod(targetObj: any, methodName: string) {
  const originalMethod = targetObj[methodName];
  
  targetObj[methodName] = function (...args: any[]) {
    console.log("Wrapper ran first!");
    // .apply(this, args) = "run original, keep same object"
    return originalMethod.apply(this, args);
  };
}

const counter = new Counter();
wrapMethod(counter, "add");
counter.add(5); // Wrapper runs, then count becomes 5`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="What does originalMethod.apply(this, args) tell JavaScript?"
          answer="It tells JavaScript to run the original method with the same object and the same arguments. This lets the method keep using its own data, such as this.count."
        />
      </div>
    </SectionContainer>
  );
}
