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
  InfoCallout,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 1 — UNDERSTANDING DECORATORS
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="Understanding Decorators">
      {/* ── 1.1 The Problem Decorators Solve ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Problem — Writing the Same Code Over and Over"
          description="In real apps, you often need extra tasks like logging, checking who is logged in, or measuring speed. Without decorators, you end up copy-pasting the same lines inside every single function."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🤔</span> Why do we need Decorators?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Imagine you run an online store with 20 actions (create user, buy item, cancel order, etc.). For every single action, you want to log what happened and measure how fast it finished. Copying those 4 extra lines into 20 methods creates a mess! <strong>Decorators let you write that extra logic once in a helper function, and then attach it with a simple tag like <code>@Log</code> above any method!</strong>
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Feature", "Without Decorators (Manual Copy-Paste)", "With Decorators (@Tag)"]}
          rows={[
            ["Repetitive Code", "Copied into every single function body", "Written once in a decorator function"],
            ["Main Code Cleanliness", "Cluttered with logging & timing code", "Clean and easy to read"],
            ["Readability", "Hard to see what the function actually does", "Instantly clear: @Log, @Get('/users')"],
            ["Making Changes", "Must update 50 different places", "Update once inside the decorator"],
          ]}
        />

        <div className="space-y-6 mb-8">
          <div>
            <SectionHeading>❌ Step 1: Look at the messy way (Without Decorators)</SectionHeading>
            <p className="text-xs text-ds-text-sub mb-3">
              Notice how <code>createUser</code> is bloated with timer and log code that has nothing to do with actually creating a user:
            </p>
            <Playground
              runtime="typescript"
              language="TypeScript"
              starterCode={`// ─── ❌ WITHOUT DECORATORS (Repetitive Extra Code) ───
class ManualUserService {
  createUser(name: string) {
    console.log("LOG: Started createUser for:", name); // repetitive extra work
    const start = Date.now();                         // repetitive extra work
    
    // The actual core task:
    const user = { id: 1, name };
    
    console.log("LOG: Finished in " + (Date.now() - start) + "ms"); // repetitive extra work
    return user;
  }
}

const service = new ManualUserService();
service.createUser("Mehedi");`}
              height="300px"
            />
          </div>

          <div>
            <SectionHeading>✨ Step 2: Look at the clean way (With a Decorator)</SectionHeading>
            <p className="text-xs text-ds-text-sub mb-3">
              With a decorator, the method only has its actual job. The <code>@Log</code> tag automatically handles the logging and timing around it:
            </p>
            <Playground
              runtime="typescript"
              language="TypeScript"
              starterCode={`// ─── ✨ WITH DECORATOR (Clean & Reusable) ───
// A decorator is just a function that wraps another function!
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value; // Save the original function

  // Replace it with our wrapped version:
  descriptor.value = function (...args: any[]) {
    console.log("LOG: Started " + methodName + " with:", ...args);
    const start = Date.now();

    // Run the real method
    const result = originalMethod.apply(this, args);

    console.log("LOG: Finished " + methodName + " in " + (Date.now() - start) + "ms");
    return result;
  };
}

class UserService {
  @Log
  createUser(name: string) {
    // Clean and simple business logic!
    return { id: 1, name };
  }
}

const cleanService = new UserService();
cleanService.createUser("Mehedi");`}
              height="380px"
            />
          </div>
        </div>

        <SummaryBox>
          Decorators are like <strong>reusable wrappers or sticky notes</strong>. Whenever you have tasks you repeat across multiple functions (like logging, timing, security checks, or input validation), you write a decorator once and reuse it everywhere with the <code>@</code> symbol.
        </SummaryBox>
      </div>

      <Divider />

      {/* ── 1.2 What is a Decorator? ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="What is a Decorator?"
          description="A decorator is simply a normal JavaScript/TypeScript function. You place it above a class, method, property, or parameter with an @ sign to add extra superpowers to it."
          color="sky"
        />

        <AnalogyBox emoji="🏷️" title="The Shipping Box Analogy">
          <p>
            Imagine you are shipping a cardboard box. Before sending it, you stick labels on it: <strong>&quot;FRAGILE&quot;</strong>, <strong>&quot;KEEP DRY&quot;</strong>, or <strong>&quot;EXPRESS DELIVERY&quot;</strong>.
          </p>
          <p className="mt-2">
            The stickers do not change the items inside the box. But they tell the delivery team how to handle the package!
          </p>
          <p className="mt-2">
            In TypeScript, when you write <code>@Controller(&apos;users&apos;)</code> or <code>@Get(&apos;:id&apos;)</code>, you are placing metadata stickers that tell NestJS how to handle your class and routes.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Your Very First Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Here is a simple decorator called <code>@Freeze</code>. It takes a class and locks it so nobody can accidentally change its settings:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: Write a normal function!
// For a class decorator, TypeScript gives us the class constructor:
function Freeze(constructor: Function) {
  console.log("🔒 Decorator executed! Freezing class:", constructor.name);
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

// Step 2: Use the @ symbol directly above the class
@Freeze
class AppConfig {
  static apiUrl = "https://api.learncraft.dev";
  static maxRetries = 3;
}

console.log("API URL:", AppConfig.apiUrl);

// Trying to change a frozen class will fail:
try {
  (AppConfig as any).apiUrl = "https://hacked.com";
  console.log("Changed:", AppConfig.apiUrl);
} catch (error: any) {
  console.log("Blocked! Cannot change a frozen class.");
}`}
            height="380px"
          />
        </div>

        <InfoCallout emoji="⏰" title="Super Important Rule: When Do Decorators Run?">
          <p>
            Decorators run <strong>ONCE when your code is first loaded</strong> (when Node.js reads the file). They do <strong>NOT</strong> wait for someone to call <code>new AppConfig()</code> or click a button.
          </p>
          <p className="mt-2">
            This is why NestJS can inspect all your route stickers (<code>@Get</code>, <code>@Post</code>) as soon as the server boots up, before any user visits your website!
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 1.3 The 4 Types of Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The 4 Types of Decorators"
          description="TypeScript lets you place decorators in 4 different spots inside your code. Each spot gives your decorator function different information."
          color="emerald"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center font-bold text-xs">1</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Class Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Placed above a <code>class</code>. Modifies or inspects the entire class blueprint.</p>
            <pre className="text-xs font-mono bg-ds-bg-white text-ds-feature-dark p-3 rounded-lg border border-ds-stroke-soft overflow-x-auto">
{`@Controller('users')
class UsersController {}`}
            </pre>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-info-lighter text-ds-info-dark flex items-center justify-center font-bold text-xs">2</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Method Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Placed above a <code>method()</code>. Can intercept, time, or log whenever that method runs.</p>
            <pre className="text-xs font-mono bg-ds-bg-white text-ds-info-dark p-3 rounded-lg border border-ds-stroke-soft overflow-x-auto">
{`@Get('/profile')
getProfile() {
  return { name: "Alice" };
}`}
            </pre>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-success-lighter text-ds-success-dark flex items-center justify-center font-bold text-xs">3</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Property Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Placed above a <code>property: string</code>. Used to set validation rules or database column types.</p>
            <pre className="text-xs font-mono bg-ds-bg-white text-ds-success-dark p-3 rounded-lg border border-ds-stroke-soft overflow-x-auto">
{`@IsEmail()
email: string;`}
            </pre>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-warning-lighter text-ds-warning-dark flex items-center justify-center font-bold text-xs">4</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Parameter Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Placed inside method arguments. Tells NestJS which piece of request data to give that argument.</p>
            <pre className="text-xs font-mono bg-ds-bg-white text-ds-warning-dark p-3 rounded-lg border border-ds-stroke-soft overflow-x-auto">
{`getUser(@Param('id') userId: string) {
  // userId receives request param 'id'
}`}
            </pre>
          </div>
        </div>

        <QuickCheck
          question="When does a decorator function execute — when the file loads or when a user calls a method?"
          answer="A decorator executes ONCE when the class is defined (when the JavaScript file is first loaded by Node.js). It does NOT wait for a user request or method call. This allows frameworks like NestJS to discover all routes and settings right when the server starts."
        />
      </div>
    </SectionContainer>
  );
}
