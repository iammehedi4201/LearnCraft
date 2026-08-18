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
          title="Parameter Decorator Signature"
          description="Parameter decorators are attached directly in front of a function parameter in a constructor or method."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 3 Parameters of a Parameter Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function ParameterDecorator(
  target: any,                      // 1. Prototype of class (or constructor for static/constructor params)
  propertyKey: string | undefined,  // 2. Name of the method (or undefined for constructor params)
  parameterIndex: number            // 3. 0-based index of the parameter in the argument list (0, 1, 2...)
) {
  // Returns void — parameter decorators cannot replace the parameter directly!
}`}
          </pre>
        </WhyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Inspecting Parameter Indices</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function LogParam(target: any, methodName: string | undefined, index: number) {
  console.log("📍 Param decorator on method: '" + methodName + "' at argument index: " + index);
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
console.log("Result:", controller.createOrder("user-1", "book-99", 3));`}
            height="340px"
          />
        </div>

        <InfoCallout emoji="🔍" title="Notice the Execution Order!">
          <p>
            When multiple parameter decorators exist on the same method, TypeScript evaluates them from <strong>right-to-left</strong> (index 2 → index 1 → index 0).
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 6.2 How NestJS Uses Parameter Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How NestJS Uses Parameter Decorators Under the Hood"
          description="A parameter decorator itself cannot modify function execution. Instead, it records a metadata record of parameter indices so the method decorator or framework router can inject request data!"
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Mini @Body & @Param Implementation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Storage for parameter metadata:
const paramMetadataMap = new Map<string, Array<{ index: number; type: string; key?: string }>>();

function Body(target: any, methodName: string, index: number) {
  const metaKey = target.constructor.name + "." + methodName;
  const list = paramMetadataMap.get(metaKey) || [];
  list.push({ index, type: "body" });
  paramMetadataMap.set(metaKey, list);
  console.log("Registered @Body on " + metaKey + " at index " + index);
}

function Param(paramName: string) {
  return function (target: any, methodName: string, index: number) {
    const metaKey = target.constructor.name + "." + methodName;
    const list = paramMetadataMap.get(metaKey) || [];
    list.push({ index, type: "param", key: paramName });
    paramMetadataMap.set(metaKey, list);
    console.log("Registered @Param('" + paramName + "') on " + metaKey + " at index " + index);
  };
}

class UsersApi {
  updateUser(@Param("id") id: string, @Body data: any) {
    return { id, data };
  }
}

console.log("Metadata Map:", Array.from(paramMetadataMap.entries()));`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="Can a parameter decorator directly intercept or replace the argument passed into a method?"
          answer="No. Parameter decorators cannot modify function execution directly. Their sole purpose is to record metadata about which parameter index needs special treatment (like @Body or @Param). The framework's route dispatcher then reads this metadata at runtime to extract and pass the right arguments."
        />
      </div>
    </SectionContainer>
  );
}
