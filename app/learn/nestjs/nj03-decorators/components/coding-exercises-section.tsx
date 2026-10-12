"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 19 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={15} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Now it&apos;s time to <strong>write and test your own decorators live</strong>! Each interactive exercise includes automated tests. Click <strong>Run</strong> to see your console output and <strong>Check</strong> to verify your solution.
        </p>
      </div>

      {/* ── 19.1 Beginner Exercises ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercises</SectionHeading>

        {/* Exercise 1: @Freeze */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dec-ex-01",
              title: "1. @Freeze Class Decorator",
              instructions: `Create a Class Decorator named 'Freeze' that calls Object.freeze() on both the constructor function and the constructor.prototype to prevent modifications.`,
              starterCode: `function Freeze(constructor: Function) {
  // Your code here: Freeze the constructor and its prototype
}

@Freeze
class SystemConfig {
  static version = "1.0.0";
}

console.log("Config version:", SystemConfig.version);`,
              solutionCode: `function Freeze(constructor: Function) {
  Object.freeze(constructor);
  Object.freeze(constructor.prototype);
}

@Freeze
class SystemConfig {
  static version = "1.0.0";
}

console.log("Config version:", SystemConfig.version);`,
              hints: [
                "Use Object.freeze(constructor) to freeze static members.",
                "Use Object.freeze(constructor.prototype) to freeze instance methods/properties.",
              ],
              tests: [
                {
                  name: "Freeze function exists",
                  code: `if (typeof Freeze !== 'function') throw new Error("Freeze decorator not found");`,
                },
                {
                  name: "Freezes class object",
                  code: `class Test {} Freeze(Test); if (!Object.isFrozen(Test)) throw new Error("Constructor was not frozen");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>

        {/* Exercise 2: @Deprecated */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dec-ex-02",
              title: "2. @Deprecated Method Decorator",
              instructions: `Create a Method Decorator named 'Deprecated' that logs a warning message '⚠️ Warning: [methodName] is deprecated!' before calling and returning the original method.`,
              starterCode: `function Deprecated(target: any, key: string, descriptor: PropertyDescriptor) {
  // Your code here:
}

class UserApi {
  @Deprecated
  getOldData() {
    return "legacy-data";
  }
}

const api = new UserApi();
console.log("Result:", api.getOldData());`,
              solutionCode: `function Deprecated(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("⚠️ Warning: " + key + " is deprecated!");
    return original.apply(this, args);
  };
}

class UserApi {
  @Deprecated
  getOldData() {
    return "legacy-data";
  }
}

const api = new UserApi();
console.log("Result:", api.getOldData());`,
              hints: [
                "Save original = descriptor.value first.",
                "Replace descriptor.value with a new function(...args) that logs the warning and returns original.apply(this, args).",
              ],
              tests: [
                {
                  name: "Deprecated decorator wraps method",
                  code: `let warned = false;
const origLog = console.log;
console.log = function(...args) { if (args.join(' ').includes('deprecated')) warned = true; origLog(...args); };
class Test { @Deprecated run() { return 42; } }
const t = new Test();
const res = t.run();
console.log = origLog;
if (res !== 42) throw new Error("Method did not return original value");
if (!warned) throw new Error("Warning was not logged");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 19.2 Intermediate Exercises ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercises</SectionHeading>

        {/* Exercise 3: @Throttle */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dec-ex-03",
              title: "3. @Throttle(ms) Decorator Factory",
              instructions: `Create a Method Decorator Factory 'Throttle(ms: number)' that ensures a method can only be executed once every 'ms' milliseconds. If called again within that window, it should return null and ignore the call.`,
              starterCode: `function Throttle(ms: number) {
  // Your code here: Return the decorator function
}

class ButtonClicker {
  @Throttle(1000)
  handleClick() {
    console.log("🔥 Button action executed!");
    return "clicked";
  }
}

const btn = new ButtonClicker();
btn.handleClick(); // Should execute
btn.handleClick(); // Should be throttled / return null`,
              solutionCode: `function Throttle(ms: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    let lastExecution = 0;

    descriptor.value = function (...args: any[]) {
      const now = Date.now();
      if (now - lastExecution < ms) {
        console.log("⏳ " + key + " is throttled. Please wait.");
        return null;
      }
      lastExecution = now;
      return original.apply(this, args);
    };
  };
}

class ButtonClicker {
  @Throttle(1000)
  handleClick() {
    console.log("🔥 Button action executed!");
    return "clicked";
  }
}

const btn = new ButtonClicker();
btn.handleClick();
btn.handleClick();`,
              hints: [
                "Create a variable 'let lastExecution = 0' inside the outer factory closure.",
                "Inside descriptor.value, check if (Date.now() - lastExecution < ms). If so, return null.",
              ],
              tests: [
                {
                  name: "Throttles rapid calls",
                  code: `let count = 0;
class Test {
  @Throttle(500)
  ping() { count++; return "ok"; }
}
const t = new Test();
const r1 = t.ping();
const r2 = t.ping();
if (r1 !== "ok") throw new Error("First call failed");
if (r2 !== null) throw new Error("Second call was not throttled to null");
if (count !== 1) throw new Error("Method executed twice during throttle window");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 19.3 Advanced Exercises ── */}
      <div className="mb-16">
        <SectionHeading>🟣 Advanced Exercises</SectionHeading>

        {/* Exercise 4: @Retry */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "dec-ex-04",
              title: "4. @Retry(maxAttempts) Async Decorator Factory",
              instructions: `Create an asynchronous Method Decorator Factory 'Retry(maxAttempts: number)' that automatically retries an async method if it throws an error, up to maxAttempts times before finally rethrowing.`,
              starterCode: `function Retry(maxAttempts: number) {
  // Your code here: Return an async decorator wrapper
}

class FlakyNetworkService {
  private attempts = 0;

  @Retry(3)
  async fetchData() {
    this.attempts++;
    console.log("Attempt #" + this.attempts);
    if (this.attempts < 3) {
      throw new Error("Network timeout!");
    }
    return { data: "success on attempt 3" };
  }
}

async function test() {
  const service = new FlakyNetworkService();
  const res = await service.fetchData();
  console.log("Final Result:", res);
}

test();`,
              solutionCode: `function Retry(maxAttempts: number) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      let lastError: any;
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          return await original.apply(this, args);
        } catch (err: any) {
          lastError = err;
          console.log("⚠️ Attempt " + attempt + "/" + maxAttempts + " failed: " + err.message);
          if (attempt === maxAttempts) throw lastError;
        }
      }
    };
  };
}

class FlakyNetworkService {
  private attempts = 0;

  @Retry(3)
  async fetchData() {
    this.attempts++;
    console.log("Attempt #" + this.attempts);
    if (this.attempts < 3) {
      throw new Error("Network timeout!");
    }
    return { data: "success on attempt 3" };
  }
}

async function test() {
  const service = new FlakyNetworkService();
  const res = await service.fetchData();
  console.log("Final Result:", res);
}

test();`,
              hints: [
                "The wrapper must be 'async function(...args: any[])'.",
                "Use a for-loop from 1 to maxAttempts with a try/catch block.",
                "If it succeeds, return the result immediately. If it reaches maxAttempts, throw the error.",
              ],
              tests: [
                {
                  name: "Retries until success",
                  code: `let calls = 0;
class Test {
  @Retry(3)
  async call() { calls++; if (calls < 2) throw new Error("fail"); return "done"; }
}
const t = new Test();
const p = t.call();
if (!p || typeof p.then !== 'function') throw new Error("Method must return a Promise");`,
                },
              ],
              difficulty: "advanced",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
