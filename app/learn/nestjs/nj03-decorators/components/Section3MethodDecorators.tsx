"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { InfoBox } from "./InfoBox";
import { SectionWrapper } from "./SectionWrapper";
import { QuickCheck } from "./QuickCheck";

export function Section3MethodDecorators() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Method Decorators</h2>
      <SectionWrapper>
        <InfoBox variant="info" title="What is a Method Decorator?">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A method decorator is applied to a <strong>single method</strong> inside a class. It can wrap the method with extra behavior (like logging), add metadata (like &quot;this is a GET endpoint&quot;), or even replace the method entirely. Think of it as wrapping a gift — the gift (method) is still inside, but the wrapper adds something extra.
          </p>
        </InfoBox>

        {/* 3 arguments explainer */}
        <InfoBox variant="warning" title="The 3 Arguments Every Method Decorator Receives" className="mt-6">
          <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal pl-5">
            <li><code className="text-amber-600 font-bold">target</code> — The class prototype (the object this method belongs to)</li>
            <li><code className="text-amber-600 font-bold">propertyKey</code> — The name of the method (as a string, like <code>&quot;add&quot;</code>)</li>
            <li><code className="text-amber-600 font-bold">descriptor</code> — An object that contains the actual function. <code>descriptor.value</code> is the method itself.</li>
          </ol>
        </InfoBox>

        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Build Your Own — @Log Decorator
            </h4>
            <p className="text-sm text-slate-500 mb-3">This decorator wraps a method to log its inputs and outputs:</p>
            <EnhancedCodeBlock
              code={`function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // Step 1: Save the original method
  const originalMethod = descriptor.value;

  // Step 2: Replace it with a new version that adds logging
  descriptor.value = function (...args: any[]) {
    console.log(\`📞 Calling \${propertyKey} with args:\`, args);
    const result = originalMethod.apply(this, args);  // Run the original
    console.log(\`✅ \${propertyKey} returned:\`, result);
    return result;
  };
}

class MathService {
  @Log   // ← Apply the decorator to this specific method
  add(a: number, b: number): number {
    return a + b;
  }
}

const math = new MathService();
math.add(2, 3);
// Output:
// 📞 Calling add with args: [2, 3]
// ✅ add returned: 5`}
              language="typescript"
            />
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How NestJS Uses Method Decorators
            </h4>
            <p className="text-sm text-slate-500 mb-3">NestJS method decorators don&apos;t wrap the method — they <strong>add metadata</strong> that NestJS reads at startup:</p>
            <EnhancedCodeBlock
              code={`// Simplified version of how @Get() works internally:
function Get(path: string = "") {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Attach metadata: "this method handles GET requests at this path"
    Reflect.defineMetadata("method", "GET", descriptor.value);
    Reflect.defineMetadata("path", path, descriptor.value);
  };
}

// When you write this in NestJS:
@Controller('users')
class UsersController {
  @Get()         // GET /users
  findAll() { return []; }

  @Get(':id')    // GET /users/123
  findOne() { return {}; }

  @Post()        // POST /users
  create() { return {}; }
}
// NestJS reads the metadata at startup and auto-registers all routes!`}
              language="typescript"
            />
          </div>

          {/* Key NestJS method decorators */}
          <InfoBox variant="info" title="Common NestJS Method Decorators">
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div><code className="text-blue-600 font-bold">@Get()</code> → handle GET requests</div>
              <div><code className="text-blue-600 font-bold">@Post()</code> → handle POST requests</div>
              <div><code className="text-blue-600 font-bold">@Put()</code> → handle PUT requests</div>
              <div><code className="text-blue-600 font-bold">@Delete()</code> → handle DELETE requests</div>
              <div><code className="text-blue-600 font-bold">@Patch()</code> → handle PATCH requests</div>
              <div><code className="text-blue-600 font-bold">@UseGuards()</code> → apply authentication</div>
            </div>
          </InfoBox>
        </div>

        <QuickCheck
          question={`In a method decorator, "descriptor.value" contains the original method. Why do we use "originalMethod.apply(this, args)" instead of just "originalMethod(args)"?`}
          answer={`.apply(this, args) preserves the "this" context. If you just call originalMethod(args), "this" inside the method would be undefined (or the wrong object). .apply() makes sure "this" still refers to the class instance, so this.someProperty works correctly inside the wrapped method.`}
        />
      </SectionWrapper>
    </section>
  );
}
