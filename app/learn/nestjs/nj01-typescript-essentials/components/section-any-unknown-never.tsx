"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  MistakeBox,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 4 — ANY VS UNKNOWN VS NEVER
// ═══════════════════════════════════════════════════════════

export function SectionAnyUnknownNever() {
  return (
    <SectionContainer number={4} title="any vs unknown vs never">
      {/* ── 4.1 The Danger of 'any' ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Danger of 'any' (Turning off the Compiler)"
          description="The 'any' type disables all type checking. It turns TypeScript into un-checked JavaScript and creates hidden runtime bugs."
          color="rose"
        />

        <AnalogyBox emoji="🛑" title="Think about it like this">
          Using <code className="text-ds-error-dark font-bold">any</code> is like disabling the fire alarms and safety brakes in your car so the warning lights stop blinking.
          <p className="mt-2">
            The car might run for a few miles without complaints, but the moment you hit a real road obstacle (runtime edge case), the system crashes without warning.
          </p>
        </AnalogyBox>

        <MistakeBox
          title="Calling non-existent methods on 'any'"
          description="TypeScript assumes you know what you are doing with 'any', so it will not warn you when you call methods that do not exist on the underlying value."
          wrong={`// ❌ DANGEROUS: TypeScript becomes blind
let rawInput: any = "hello world";

// TypeScript does not warn you, but this CRASHES at runtime!
rawInput.toFixed(2); // 💥 TypeError: rawInput.toFixed is not a function`}
          right={`// ✅ SAFE: Use unknown + type check first
let rawInput: unknown = "hello world";

if (typeof rawInput === "number") {
  console.log(rawInput.toFixed(2)); // Safe! TS verified it's a number
}`}
        />
      </div>

      <Divider />

      {/* ── 4.2 The Safety of 'unknown' ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The Safety of 'unknown' (Check First, Use Later)"
          description="'unknown' means: 'This could be anything, but you MUST inspect and verify what it is before TypeScript allows you to touch it.'"
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Type-Safe Parsing with 'unknown'</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulating an incoming third-party webhook payload
function handleIncomingPayload(payload: unknown): string {
  // 1. Check if it's a valid string
  if (typeof payload === "string") {
    return \`Received text message: "\${payload.toUpperCase()}"\`;
  }

  // 2. Check if it's a numeric ID
  if (typeof payload === "number") {
    return \`Received numeric ID: #\${payload.toFixed(0)}\`;
  }

  // 3. Fallback for unhandled objects
  return "Received unknown structured data. Parsing safely...";
}

console.log(handleIncomingPayload("user_registered"));
console.log(handleIncomingPayload(42.89));
console.log(handleIncomingPayload({ event: "PAYMENT_COMPLETED" }));`}
            height="290px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 4.3 The 'never' Type & Exhaustive Checking ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The 'never' Type & Exhaustive Safety"
          description="'never' represents values that can NEVER happen. It is used for functions that never return (throw errors) and for compile-time exhaustive switch checks."
          color="purple"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>💥</span> 1. Functions that Never Return
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                A function that throws an exception or enters an infinite loop has a return type of <code className="text-ds-feature-base">never</code>.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={14}
                code={`function throwUnauthorizedError(message: string): never {
  throw new Error(\`[Auth Failure] \${message}\`);
  // This function never reaches the end line!
}`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🛡️</span> 2. Exhaustive Switch Checking
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Guarantees you never forget to handle a case when new options are added to a union type.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={14}
                code={`type NotificationType = "EMAIL" | "SMS" | "PUSH";

function sendAlert(type: NotificationType) {
  switch (type) {
    case "EMAIL": return "Sending Email...";
    case "SMS": return "Sending SMS...";
    case "PUSH": return "Sending Push Notification...";
    default: {
      // If a new type is added, TS flags an error right here!
      const _exhaustiveCheck: never = type;
      return _exhaustiveCheck;
    }
  }
}`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <ComparisonTable
          headers={["Type", "What it Means", "Can Assign Anything TO it?", "Can Perform Operations Directly?"]}
          rows={[
            ["any", "Turn off all type rules (Dangerous)", "✅ Yes", "✅ Yes (Bypasses compiler)"],
            ["unknown", "I don't know yet, must check first (Safe)", "✅ Yes", "❌ No (Requires type narrowing)"],
            ["never", "Impossible value, can never happen", "❌ No (Only never)", "❌ No (Unreachable code)"],
          ]}
        />

        <div className="mb-8">
          <SectionHeading>🦁 How 'unknown' is Used in NestJS Exception Filters</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class SafeGlobalExceptionFilter implements ExceptionFilter {
  // Catch handler receives 'exception: unknown' because any error could be thrown
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Safely narrow the type using 'instanceof'
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    } else {
      // Safe fallback for unexpected server crashes
      response.status(500).json({
        statusCode: 500,
        message: "Internal server error",
      });
    }
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="Why should you use 'unknown' instead of 'any' when receiving raw API payloads?"
          answer="'any' disables TypeScript compiler checks completely, allowing invalid method calls to crash at runtime. 'unknown' forces you to check the data type (using typeof or instanceof) before using it, preventing runtime crashes."
        />
      </div>
    </SectionContainer>
  );
}
