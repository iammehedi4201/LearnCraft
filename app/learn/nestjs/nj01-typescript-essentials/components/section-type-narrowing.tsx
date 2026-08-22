"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 12 — TYPE NARROWING & GUARDS
// ═══════════════════════════════════════════════════════════

export function SectionTypeNarrowing() {
  return (
    <SectionContainer number={12} title="Type Narrowing & Guards">
      {/* ── 12.1 The 4 Built-In Guard Techniques ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Checking the ID Card: Proving Types at Runtime"
          description="When a variable is a union (e.g. string | number | Error), Type Narrowing lets you prove what it is inside an if-block so TypeScript unlocks type-specific methods."
          color="primary"
        />

        <AnalogyBox emoji="🛂" title="Think about it like this">
          Think of a security guard at an airport VIP gate. If a traveler claims they are a diplomat, the guard asks to see their diplomatic passport.
          <p className="mt-2">
            Once the guard verifies the passport with an <code className="text-ds-info-dark">if-statement</code>, the traveler is allowed through the diplomat lane and given diplomatic privileges (<code className="text-ds-info-dark">.toUpperCase()</code> or <code className="text-ds-info-dark">.getStatus()</code>).
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              1. typeof
            </span>
            <p className="text-xs text-ds-text-sub mb-2">
              For primitive values: <code className="text-ds-feature-base">string</code>, <code className="text-ds-feature-base">number</code>, <code className="text-ds-feature-base">boolean</code>, <code className="text-ds-feature-base">undefined</code>.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              if (typeof val === &quot;string&quot;)
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              2. instanceof
            </span>
            <p className="text-xs text-ds-text-sub mb-2">
              For class instances: <code className="text-ds-feature-base">Date</code>, <code className="text-ds-feature-base">Error</code>, <code className="text-ds-feature-base">HttpException</code>.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              if (err instanceof HttpException)
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-base block mb-1">
              3. in operator
            </span>
            <p className="text-xs text-ds-text-sub mb-2">
              For checking if an object property key exists.
            </p>
            <code className="text-[11px] font-mono text-ds-text-strong bg-ds-bg-white p-2 rounded-lg border border-ds-stroke-soft block">
              if (&quot;privileges&quot; in user)
            </code>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Type Guards in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. Narrowing primitives with typeof
function formatInput(val: string | number): string {
  if (typeof val === "string") {
    return \`Text: \${val.toUpperCase()}\`; // TS knows it's a string!
  }
  return \`Number: \${val.toFixed(2)}\`;     // TS knows it's a number!
}

// 2. Narrowing objects with 'in' operator
type AdminUser = { role: "ADMIN"; permissions: string[] };
type BasicUser = { role: "USER"; name: string };

function inspectAccount(account: AdminUser | BasicUser): void {
  if ("permissions" in account) {
    console.log(\`👑 Admin with \${account.permissions.length} permissions\`);
  } else {
    console.log(\`👤 Basic user: \${account.name}\`);
  }
}

console.log(formatInput("nestjs rocks"));
console.log(formatInput(49.9));
inspectAccount({ role: "ADMIN", permissions: ["READ", "WRITE", "DEPLOY"] });
inspectAccount({ role: "USER", name: "Alice" });`}
            height="320px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 12.2 Discriminated Unions & Custom Type Guards ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Discriminated Unions & Custom 'is' Guards"
          description="The gold standard for handling state machines, polymorphic API payloads, and webhook events safely in backend systems."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🏷️</span> Discriminated Unions (Tagged Unions)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Every object variant has a common literal tag property (e.g. <code className="text-ds-feature-base">kind</code> or <code className="text-ds-feature-base">type</code>):
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={15}
                code={`type PaymentEvent =
  | { type: "CARD"; cardNumber: string; cvv: string }
  | { type: "PAYPAL"; email: string }
  | { type: "CRYPTO"; walletAddress: string };

function processPayment(event: PaymentEvent) {
  switch (event.type) {
    case "CARD":
      return \`Card ending in \${event.cardNumber.slice(-4)}\`;
    case "PAYPAL":
      return \`PayPal email: \${event.email}\`;
    case "CRYPTO":
      return \`Wallet: \${event.walletAddress}\`;
  }
}`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🛡️</span> Custom Type Guards ('is' keyword)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Write custom verification functions that return a type predicate:
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={15}
                code={`interface ErrorPayload {
  errorCode: number;
  message: string;
}

// Type Predicate: 'val is ErrorPayload'
function isErrorPayload(val: unknown): val is ErrorPayload {
  return (
    typeof val === "object" &&
    val !== null &&
    "errorCode" in val &&
    "message" in val
  );
}`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Type Narrowing is Used in NestJS Exception Filters</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Type Narrowing with 'instanceof'
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      response.status(status).json({ success: false, error: res });
    } else {
      // Unhandled crash
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Internal Server Error',
      });
    }
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="Why is a Discriminated Union (with a shared literal property like `type`) better than checking arbitrary properties with `in`?"
          answer="Discriminated Unions provide 100% reliable, zero-guesswork switching. TypeScript uses the single shared tag (e.g. `type: 'CARD'`) to instantly narrow all other properties, and enables compile-time exhaustive switch checking with `never`."
        />
      </div>
    </SectionContainer>
  );
}
