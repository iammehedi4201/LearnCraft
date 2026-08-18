"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 7 — DECORATOR FACTORIES
// ═══════════════════════════════════════════════════════════

export function DecoratorFactoriesSection() {
  return (
    <SectionContainer number={7} title="Decorator Factories">
      {/* ── 7.1 Plain Decorator vs Decorator Factory ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Plain Decorator vs Decorator Factory (@Dec vs @Dec())"
          description="A plain decorator takes no arguments. A decorator factory is a function that returns a decorator, allowing you to pass custom configuration values."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Plain Decorator (@Dec)", "Decorator Factory (@Dec())"]}
          rows={[
            ["Syntax", "@Sealed", "@Role('admin'), @Controller('/users')"],
            ["Parentheses ()", "No parentheses", "Has parentheses with arguments ()"],
            ["What it is", "The decorator function directly", "An outer function that returns the decorator function"],
            ["Arguments", "Fixed: only receives target/key/descriptor", "Custom: you can pass any arguments you want!"],
            ["Used in NestJS", "Rarely", "Almost everywhere: @Get(), @Injectable(), @UseGuards()"],
          ]}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Side-by-Side Comparison</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── 1. Plain Decorator (No Arguments) ───
function SimpleLog(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("Plain @SimpleLog attached to:", key);
}

// ─── 2. Decorator Factory (Accepts Custom Arguments) ───
function CustomPrefixLog(prefix: string) {
  // The outer function receives 'prefix'
  // and returns the actual decorator function:
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("[" + prefix + "] Decorator factory attached to:", key);
  };
}

class DemoController {
  @SimpleLog
  firstMethod() {}

  @CustomPrefixLog("AUTH_MODULE")
  secondMethod() {}
}`}
            height="360px"
          />
        </div>

        <MistakeBox
          title="Forgetting parentheses on a Decorator Factory"
          description="If a decorator is defined as a factory (returning an inner function), you MUST include parentheses @Dec() when using it. Otherwise TypeScript will treat the factory itself as the decorator."
          wrong={`// @Controller is a factory!\n@Controller\nclass UsersController {}`}
          right={`// Correct with parentheses:\n@Controller()\nclass UsersController {}`}
        />
      </div>

      <Divider />

      {/* ── 7.2 Building Real-World Factories ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Building Configurable Decorator Factories"
          description="Decorator factories leverage JavaScript closures to capture configuration options. Here is how to build an options object pattern."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Configurable Logging Factory</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface LogOptions {
  includeArgs?: boolean;
  includeResult?: boolean;
  prefix?: string;
}

function Log(options: LogOptions = {}) {
  const { includeArgs = true, includeResult = true, prefix = "APP" } = options;

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (includeArgs) {
        console.log("[" + prefix + "] 📞 " + propertyKey + " called with:", args);
      }
      
      const result = original.apply(this, args);
      
      if (includeResult) {
        console.log("[" + prefix + "] ✅ " + propertyKey + " returned:", result);
      }
      return result;
    };
  };
}

class UsersService {
  @Log({ prefix: "USER_SERVICE", includeArgs: true, includeResult: true })
  getUser(id: number) {
    return { id, name: "Mehedi" };
  }

  @Log({ prefix: "PASSWORD_SERVICE", includeArgs: false }) // Don't log sensitive password args!
  changePassword(newPass: string) {
    return { status: "success" };
  }
}

const service = new UsersService();
service.getUser(42);
service.changePassword("superSecretPass123");`}
            height="460px"
          />
        </div>

        <QuickCheck
          question="Why do all NestJS decorators (like @Controller(), @Injectable(), @Get()) use parentheses?"
          answer="Because in NestJS, all decorators are written as Decorator Factories! Even if you don't pass any arguments (like @Injectable() or @Get()), you still need the parentheses () so the factory function gets executed to return the actual decorator."
        />
      </div>
    </SectionContainer>
  );
}
