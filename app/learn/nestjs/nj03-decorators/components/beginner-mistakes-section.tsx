"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
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
          title="Top 5 Most Common Decorator Mistakes"
          description="Avoid these common pitfalls that cause silent bugs, runtime crashes, or broken dependency injection in TypeScript & NestJS."
          color="primary"
        />

        <MistakeBox
          title="Forgetting Parentheses on a Decorator Factory"
          description="In NestJS, almost all decorators are factories that return a decorator function. If you omit the (), the factory function is passed to TypeScript instead of the returned decorator."
          wrong={`@Injectable // ❌ Error: Missing parentheses!\nclass UsersService {}`}
          right={`@Injectable() // ✅ Correct: Evaluates the factory!\nclass UsersService {}`}
        />

        <MistakeBox
          title="Losing 'this' Context in Method Wrappers"
          description="When replacing descriptor.value with a wrapper function, calling originalMethod(args) without .apply(this, args) loses the instance properties."
          wrong={`descriptor.value = function(...args: any[]) {\n  return originalMethod(...args); // ❌ 'this' is lost!\n};`}
          right={`descriptor.value = function(...args: any[]) {\n  return originalMethod.apply(this, args); // ✅ 'this' preserved!\n};`}
        />

        <MistakeBox
          title="Using an Arrow Function as descriptor.value"
          description="Arrow functions capture the lexical 'this' where the decorator is defined, NOT the instance calling the method at runtime."
          wrong={`descriptor.value = (...args: any[]) => {\n  return original.apply(this, args); // ❌ 'this' is NOT the class instance!\n};`}
          right={`descriptor.value = function(...args: any[]) {\n  return original.apply(this, args); // ✅ 'this' is dynamic instance!\n};`}
        />

        <MistakeBox
          title="Assuming Decorators Run on Every Request"
          description="Decorators only execute ONCE when the class definition is evaluated by Node.js. Logic that needs to run per-request belongs inside the wrapper function, a Guard, or an Interceptor."
          wrong={`function Log() {\n  console.log("Request received!"); // ❌ Only logs ONCE at startup!\n  return function(t: any, k: string, d: any) {};\n}`}
          right={`function Log() {\n  return function(t: any, k: string, d: any) {\n    d.value = function(...args: any[]) {\n      console.log("Request received!"); // ✅ Runs on every call!\n      return original.apply(this, args);\n    };\n  };\n}`}
        />

        <MistakeBox
          title="Missing tsconfig.json Compiler Options"
          description="If TypeScript gives error TS1219: 'Experimental support for decorators is a feature that is subject to change', check your tsconfig."
          wrong={`// tsconfig.json\n{\n  "compilerOptions": {}\n}`}
          right={`// tsconfig.json\n{\n  "compilerOptions": {\n    "experimentalDecorators": true,\n    "emitDecoratorMetadata": true\n  }\n}`}
        />

        <QuickCheck
          question="Why will `descriptor.value = (...args) => { ... }` break a class method that uses `this.propertyName`?"
          answer="Arrow functions do NOT have their own 'this' binding. They capture 'this' from the enclosing scope where the decorator was defined (which is undefined or the global module). Standard functions (function(...args) { ... }) receive the calling class instance as their 'this' context dynamically."
        />
      </div>
    </SectionContainer>
  );
}
