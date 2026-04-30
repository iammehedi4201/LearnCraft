"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Collapsible } from "./Collapsible";

export function MiniChallenge() {
  return (
    <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
      <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">🏋️ Mini Challenge</h3>
      <p className="text-amber-900 dark:text-amber-300 mb-4">Create your own decorators:</p>
      <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Deprecated</code> class decorator that logs a warning when the class is instantiated</li>
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@MeasureTime</code> method decorator that logs how long a method takes to execute</li>
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">@Validate</code> parameter decorator that checks if a parameter is not null/undefined</li>
      </ul>

      <Collapsible title="💡 Show Solution (try it yourself first!)">
        <EnhancedCodeBlock
          code={`// 1. @Deprecated — Class Decorator
function Deprecated(constructor: Function) {
  console.warn(\`⚠️ WARNING: \${constructor.name} is deprecated!\`);
}

@Deprecated
class OldUserService {
  // Console: "⚠️ WARNING: OldUserService is deprecated!"
}

// 2. @MeasureTime — Method Decorator
function MeasureTime(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    const end = performance.now();
    console.log(\`⏱️ \${key} took \${(end - start).toFixed(2)}ms\`);
    return result;
  };
}

class DataService {
  @MeasureTime
  processData() {
    // ... heavy computation
    return "done";
  }
}
// Output: "⏱️ processData took 12.34ms"

// 3. @Validate — Parameter Decorator
// Note: Parameter decorators can only ADD metadata.
// The actual validation logic runs in a separate interceptor.
function Validate(target: any, key: string, index: number) {
  const existingParams: number[] = 
    Reflect.getOwnMetadata("validate_params", target, key) || [];
  existingParams.push(index);
  Reflect.defineMetadata("validate_params", existingParams, target, key);
}

class OrderService {
  createOrder(@Validate orderId: string) {
    return \`Order \${orderId} created\`;
  }
}`}
          language="typescript"
        />
      </Collapsible>
    </section>
  );
}
