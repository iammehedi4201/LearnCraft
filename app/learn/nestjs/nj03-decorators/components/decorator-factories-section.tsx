"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
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
          description="A plain decorator takes no extra options. A decorator factory is a function that returns a decorator, allowing you to pass custom settings like paths, roles, or options."
          color="primary"
        />

        <AnalogyBox emoji="🏭" title="The Custom Stamp Maker Analogy">
          <p>
            Think of a <strong>Plain Decorator</strong> as a fixed rubber stamp that only prints <em>&quot;APPROVED&quot;</em>. You can&apos;t change the text.
          </p>
          <p className="mt-2">
            A <strong>Decorator Factory</strong> is like an adjustable stamp machine! You first configure the custom text you want: <code>@Roles(&apos;admin&apos;)</code> or <code>@Get(&apos;/users&apos;)</code>. The machine then produces a custom stamp (the decorator function) configured exactly with your settings!
          </p>
        </AnalogyBox>

        <ComparisonTable
          headers={["Feature", "Plain Decorator (@Dec)", "Decorator Factory (@Dec())"]}
          rows={[
            ["Syntax", "@Freeze", "@Roles('admin'), @Controller('/users')"],
            ["Parentheses ()", "No parentheses", "Has parentheses () with your custom arguments"],
            ["What it is", "The decorator function directly", "An outer function that returns the decorator function"],
            ["Custom Options", "Cannot pass custom options", "Can pass any arguments, strings, or options objects"],
            ["Used in NestJS", "Rarely", "Almost everywhere: @Get(), @Injectable(), @UseGuards()"],
          ]}
        />

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Side-by-Side Comparison</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            See how the outer factory function captures your custom <code>prefix</code> string:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── 1. Plain Decorator (No custom arguments) ───
function SimpleLog(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("Plain @SimpleLog attached to method:", key);
}

// ─── 2. Decorator Factory (Accepts custom options) ───
function CustomPrefixLog(prefix: string) {
  // The outer function receives 'prefix'
  // and returns the actual decorator function:
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    console.log("[" + prefix + "] Custom factory attached to method:", key);
  };
}

class DemoController {
  @SimpleLog
  firstMethod() {}

  @CustomPrefixLog("AUTH_SERVICE")
  secondMethod() {}
}

const demo = new DemoController();`}
            height="380px"
          />
        </div>

        <MistakeBox
          title="Forgetting parentheses on a Decorator Factory"
          description="If a decorator is created as a factory (it returns an inner function), you MUST include parentheses () when using it. Otherwise TypeScript mistakenly passes your class into the factory itself!"
          wrong={`// @Controller is a factory!\n@Controller\nclass UsersController {}`}
          right={`// Correct with parentheses:\n@Controller()\nclass UsersController {}`}
        />
      </div>

      <Divider />

      {/* ── 7.2 Building Real-World Factories ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Building Configurable Options"
          description="You can pass entire configuration objects into a factory to customize how a decorator behaves."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Configurable Logging Options</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Notice how we can configure whether to log inputs or hide sensitive passwords:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface LogOptions {
  includeArgs?: boolean;
  includeResult?: boolean;
  prefix?: string;
}

function Log(options: LogOptions = {}) {
  // Default values for options:
  const { includeArgs = true, includeResult = true, prefix = "APP" } = options;

  // Return the decorator:
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
  @Log({ prefix: "USER_MODULE", includeArgs: true, includeResult: true })
  getUser(id: number) {
    return { id, name: "Mehedi" };
  }

  @Log({ prefix: "AUTH_MODULE", includeArgs: false }) // Hide sensitive password input!
  changePassword(newPass: string) {
    return { status: "success" };
  }
}

const service = new UsersService();
service.getUser(42);
service.changePassword("superSecret123");`}
            height="460px"
          />
        </div>

        <QuickCheck
          question="Why do all NestJS decorators (like @Controller(), @Injectable(), @Get()) use parentheses?"
          answer="Because in NestJS, decorators are created as Decorator Factories. Even when you don't pass arguments (like @Injectable() or @Get()), you still need the parentheses () so the factory runs and returns the actual decorator function to TypeScript."
        />
      </div>
    </SectionContainer>
  );
}
