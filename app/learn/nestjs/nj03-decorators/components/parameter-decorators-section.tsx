"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 6 — PARAMETER DECORATORS
// ═══════════════════════════════════════════════════════════

export function ParameterDecoratorsSection() {
  return (
    <SectionContainer number={6} title="Parameter Decorators">
      {/* ── 6.1 Signature & 3 Parameters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Parameter Decorators & The 3 Arguments"
          description="Parameter decorators are placed directly in front of an argument inside a method or constructor. They tell you which position in the argument list was tagged."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 3 Parameters of a Parameter Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function MyParamDecorator(
  target: any,                      // 1. Class prototype (or constructor)
  propertyKey: string | undefined,  // 2. Method name (undefined if in constructor)
  parameterIndex: number            // 3. 0-based position in arguments (0, 1, 2...)
) {
  // Always returns void — parameter decorators cannot replace arguments directly!
}`}
          </pre>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Inspecting Parameter Positions</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Notice how TypeScript reports index 0 for the first argument, 1 for the second, and 2 for the third:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function LogParam(target: any, methodName: string | undefined, index: number) {
  console.log("📍 Tagged parameter in '" + methodName + "' at argument position #" + index);
}

class OrdersController {
  createOrder(
    @LogParam buyerId: string,   // index: 0
    @LogParam itemId: string,    // index: 1
    @LogParam quantity: number   // index: 2
  ) {
    return { buyerId, itemId, quantity };
  }
}

const controller = new OrdersController();
console.log("Output:", controller.createOrder("user_101", "keyboard", 2));`}
            height="360px"
          />
        </div>

        <InfoCallout emoji="🔍" title="Did You Notice the Execution Order?">
          <p>
            Look closely at the console output above! When multiple parameters have decorators, TypeScript evaluates them from <strong>right to left</strong> (argument #2 → argument #1 → argument #0).
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 6.2 How NestJS Uses Parameter Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How NestJS Uses Parameter Decorators Under the Hood"
          description="A parameter decorator itself cannot modify a function's arguments. Instead, it acts like a sticky note, recording which argument needs the request body, URL id, or query string!"
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Building a Mini @Body and @Param</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            See how custom parameter decorators register metadata so a router can pass the right inputs:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// A metadata table to remember which argument needs which data
const routeParams = new Map<string, Array<{ index: number; type: string; key?: string }>>();

function Body(target: any, methodName: string, index: number) {
  const mapKey = target.constructor.name + "." + methodName;
  const list = routeParams.get(mapKey) || [];
  list.push({ index, type: "body" });
  routeParams.set(mapKey, list);
  console.log("Registered @Body on argument #" + index);
}

function Param(paramName: string) {
  return function (target: any, methodName: string, index: number) {
    const mapKey = target.constructor.name + "." + methodName;
    const list = routeParams.get(mapKey) || [];
    list.push({ index, type: "param", key: paramName });
    routeParams.set(mapKey, list);
    console.log("Registered @Param('" + paramName + "') on argument #" + index);
  };
}

class UsersController {
  updateUser(@Param("id") id: string, @Body payload: any) {
    return { id, payload };
  }
}

console.log("Final Parameter Metadata Table:", Array.from(routeParams.entries()));`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="Can a parameter decorator directly change or replace the argument value passed into a method?"
          answer="No. Parameter decorators cannot change function execution directly. Their only job is to record metadata notes about which argument position needs special handling (like @Body or @Param). The framework router reads these notes when an HTTP request arrives to inject the right data."
        />
      </div>
    </SectionContainer>
  );
}
