"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 16 — BEGINNER MISTAKES & GOTCHAS
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={16} title="Beginner Mistakes & Gotchas">
      {/* ── Mistakes List ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 5 Most Common Decorator Mistakes"
          description="Avoid these common pitfalls that cause unexpected errors, lost data, or broken code in TypeScript & NestJS."
          color="primary"
        />

        <MistakeBox
          title="1. Forgetting Parentheses on a Decorator Factory"
          description="In NestJS, almost all decorators are factories that return a decorator function. If you forget the (), TypeScript receives the factory itself instead of the inner decorator."
          wrong={`@Injectable // ❌ Missing parentheses!\nclass UsersService {}`}
          right={`@Injectable() // ✅ Correct with parentheses!\nclass UsersService {}`}
        />

        <MistakeBox
          title="2. Losing 'this' Context in Method Wrappers"
          description="When replacing descriptor.value with a wrapper function, calling originalMethod(args) without .apply(this, args) loses access to instance variables (like this.name or this.balance)."
          wrong={`descriptor.value = function(...args: any[]) {\n  return originalMethod(...args); // ❌ 'this' is lost!\n};`}
          right={`descriptor.value = function(...args: any[]) {\n  return originalMethod.apply(this, args); // ✅ 'this' preserved!\n};`}
        />

        <MistakeBox
          title="3. Using an Arrow Function for descriptor.value"
          description="Arrow functions do NOT have their own 'this'. They capture 'this' from the outer module where the decorator was written, breaking class instance properties."
          wrong={`descriptor.value = (...args: any[]) => {\n  return original.apply(this, args); // ❌ 'this' is wrong!\n};`}
          right={`descriptor.value = function(...args: any[]) {\n  return original.apply(this, args); // ✅ 'this' is the real instance!\n};`}
        />

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Arrow Function vs Regular Function with 'this'</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Click Run to see why regular <code>function(...args)</code> correctly preserves <code>this.name</code>, while an arrow function fails:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ✅ CORRECT: Uses regular function keyword
function GoodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("GoodDecorator calling method for:", (this as any).name);
    return original.apply(this, args);
  };
}

class UserProfile {
  name = "Mehedi Hasan";

  @GoodDecorator
  sayName() {
    return "Hello from " + this.name;
  }
}

const profile = new UserProfile();
console.log(profile.sayName());`}
            height="380px"
          />
        </div>

        <MistakeBox
          title="4. Assuming Decorators Run on Every Request"
          description="Decorators only execute ONCE when the file is first loaded by Node.js. Logic that needs to happen for every user request belongs inside the wrapper function, a Guard, or an Interceptor."
          wrong={`function Log() {\n  console.log("Request received!"); // ❌ Only logs ONCE at server startup!\n  return function(t: any, k: string, d: any) {};\n}`}
          right={`function Log() {\n  return function(t: any, k: string, d: any) {\n    d.value = function(...args: any[]) {\n      console.log("Request received!"); // ✅ Runs on every call!\n      return original.apply(this, args);\n    };\n  };\n}`}
        />

        <MistakeBox
          title="5. Missing tsconfig.json Compiler Options"
          description="If TypeScript gives error TS1219: 'Experimental support for decorators is a feature that is subject to change', check your tsconfig.json file."
          wrong={`// tsconfig.json\n{\n  "compilerOptions": {}\n}`}
          right={`// tsconfig.json\n{\n  "compilerOptions": {\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": true\n  }\n}`}
        />

        <QuickCheck
          question="Why will `descriptor.value = (...args) => { ... }` break a class method that uses `this.propertyName`?"
          answer="Arrow functions do NOT have their own 'this' binding. They capture 'this' from the outer file scope where the decorator was defined (which is undefined or global). Regular functions (function(...args) { ... }) dynamically receive the actual class instance as their 'this' context when called."
        />
      </div>
    </SectionContainer>
  );
}
