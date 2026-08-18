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
          title="The Problem — Repetitive Boilerplate Code"
          description="In real-world applications, you often need to add logging, authentication, timing, or validation to dozens of methods. Without decorators, you end up copy-pasting the exact same code everywhere."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🤔</span> Why do we need Decorators?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed">
            Imagine having 30 controller methods. In every single method, you have to log who called it, check if the user is an admin, and measure how long the database query took. Copying those 5 lines of code into 30 methods is tedious, error-prone, and clutters your business logic. <strong>Decorators let you write that logic once and attach it with a single line: <code>@Log</code>, <code>@Authorize</code>.</strong>
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Feature", "Without Decorators (Manual)", "With Decorators (@)"]}
          rows={[
            ["Code Repetition", "Repeated in every single method body", "Written once in a decorator function"],
            ["Business Logic", "Buried under logging/auth boilerplate", "Clean, focused, and minimal"],
            ["Readability", "Hard to tell what the method actually does", "Declarative: @Log, @Get('/users')"],
            ["Maintainability", "Change code in 50 places", "Change logic once in the decorator"],
          ]}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Without vs With Decorators</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── ❌ WITHOUT DECORATORS (Boilerplate Hell) ───
class ManualUserService {
  createUser(name: string) {
    console.log("LOG: Calling createUser with name:", name); // repetitive
    const start = Date.now();                                // repetitive
    
    const user = { id: 1, name }; // Actual business logic
    
    console.log("LOG: createUser took " + (Date.now() - start) + "ms"); // repetitive
    return user;
  }
}

const service = new ManualUserService();
service.createUser("Mehedi");`}
            height="320px"
          />
        </div>

        <SummaryBox>
          Decorators solve the problem of <strong>cross-cutting concerns</strong> (logging, authentication, validation, caching) by letting you attach reusable behavior declaratively.
        </SummaryBox>
      </div>

      <Divider />

      {/* ── 1.2 What is a Decorator? ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="What is a Decorator?"
          description="A decorator is simply a JavaScript function that gets called automatically to inspect, modify, or enhance a class, method, property, or parameter."
          color="sky"
        />

        <AnalogyBox emoji="🏷️" title="The Shipping Sticker Analogy">
          <p>
            Imagine you are shipping a cardboard box. You slap stickers on it: <strong>&quot;FRAGILE&quot;</strong>, <strong>&quot;HANDLE WITH CARE&quot;</strong>, <strong>&quot;PRIORITY AIR&quot;</strong>.
          </p>
          <p className="mt-2">
            The stickers do not change the items inside the box. Instead, they tell the <em>shipping handler</em> (NestJS) how to process the package!
          </p>
          <p className="mt-2">
            When you write <code>@Controller(&apos;users&apos;)</code> or <code>@Get(&apos;:id&apos;)</code>, you are placing metadata stickers that tell NestJS how to route HTTP requests.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Your First Class Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Step 1: A decorator is just a function!
// For a class decorator, it receives the class constructor function:
function Sealed(constructor: Function) {
  console.log("🔒 Decorator executed! Freezing class:", constructor.name);
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

// Step 2: Apply it using the @ symbol above the class
@Sealed
class AppConfig {
  static apiUrl = "https://api.learncraft.dev";
}

console.log("Config API URL:", AppConfig.apiUrl);

// Trying to modify the frozen class will fail or be ignored:
try {
  (AppConfig as any).newSetting = "test";
  console.log("Modified:", (AppConfig as any).newSetting);
} catch (e: any) {
  console.log("Cannot modify sealed class:", e.message);
}`}
            height="380px"
          />
        </div>

        <InfoCallout emoji="⏰" title="Crucial Rule: When Do Decorators Run?">
          <p>
            Decorators run <strong>ONCE when the class is defined</strong> (when the JavaScript file is first loaded and evaluated by Node.js/V8 engine). They do <strong>NOT</strong> wait until you call <code>new MyClass()</code> or invoke a method!
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 1.3 The 4 Types of Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The 4 Types of Decorators"
          description="TypeScript supports 4 distinct types of decorators, depending on what target they are attached to."
          color="emerald"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-feature-lighter text-ds-feature-dark flex items-center justify-center font-bold text-xs">1</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Class Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Attached directly above a class declaration. Inspects or wraps the constructor.</p>
            <code className="text-xs font-mono bg-ds-bg-white text-ds-feature-dark p-2 rounded-lg border border-ds-stroke-soft block">
              @Controller(&apos;users&apos;)<br />
              class UsersController &#123;&#125;
            </code>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-info-lighter text-ds-info-dark flex items-center justify-center font-bold text-xs">2</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Method Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Attached above a method. Can intercept, modify, or replace method execution.</p>
            <code className="text-xs font-mono bg-ds-bg-white text-ds-info-dark p-2 rounded-lg border border-ds-stroke-soft block">
              @Get(&apos;/profile&apos;)<br />
              getProfile() &#123; return &#123;&#125;; &#125;
            </code>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-success-lighter text-ds-success-dark flex items-center justify-center font-bold text-xs">3</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Property Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Attached to a class property. Stores validation metadata or database column rules.</p>
            <code className="text-xs font-mono bg-ds-bg-white text-ds-success-dark p-2 rounded-lg border border-ds-stroke-soft block">
              @IsEmail()<br />
              email: string;
            </code>
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-7 w-7 rounded-lg bg-ds-warning-lighter text-ds-warning-dark flex items-center justify-center font-bold text-xs">4</span>
              <h5 className="font-bold text-sm text-ds-text-strong">Parameter Decorators</h5>
            </div>
            <p className="text-xs text-ds-text-sub mb-3">Attached to method parameters. Tells NestJS which request data to inject.</p>
            <code className="text-xs font-mono bg-ds-bg-white text-ds-warning-dark p-2 rounded-lg border border-ds-stroke-soft block">
              getUser(@Param(&apos;id&apos;) id: string) &#123;&#125;
            </code>
          </div>
        </div>

        <QuickCheck
          question="When does a decorator function execute — when the class is defined or when an instance method is called?"
          answer="A decorator executes ONCE at class definition time (when the file is loaded by the JavaScript engine). It does NOT wait for instantiation or method invocation. This is why NestJS can inspect all metadata and build route tables during server startup before any HTTP requests arrive."
        />
      </div>
    </SectionContainer>
  );
}
