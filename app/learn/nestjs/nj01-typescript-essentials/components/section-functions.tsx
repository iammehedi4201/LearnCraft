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
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 6 — FUNCTIONS & SIGNATURES
// ═══════════════════════════════════════════════════════════

export function SectionFunctions() {
  return (
    <SectionContainer number={6} title="Functions & Signatures">
      {/* ── 6.1 Function Types & Return Signatures ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Typed Parameters & Return Values"
          description="In TypeScript, every function defines a contract: what data it accepts, and what data it promises to return."
          color="primary"
        />

        <AnalogyBox emoji="📠" title="Think about it like this">
          Think of a vending machine. The coin slot only accepts valid dollar bills (<code className="text-ds-info-dark">parameters</code>), and the tray guarantees that an ice-cold beverage (<code className="text-ds-info-dark">return type</code>) drops out.
          <p className="mt-2">
            If you try to insert a wooden token, it rejects it instantly. If the machine runs out of drinks, it signals an error before taking your money.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Writing Bulletproof Typed Functions</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Explicit parameter types and explicit return type (: number)
function calculateTotal(price: number, taxRate: number, discount: number = 0): number {
  const subtotal = price - discount;
  return subtotal + (subtotal * taxRate);
}

// Function with optional parameter (?) and void return type
function logAuditRecord(action: string, performedBy: string, details?: string): void {
  const note = details ? \`(\${details})\` : "";
  console.log(\`📋 [AUDIT] \${action} by \${performedBy} \${note}\`);
}

const invoiceAmount = calculateTotal(100, 0.08, 10);
console.log(\`Final Invoice: $\${invoiceAmount.toFixed(2)}\`);

logAuditRecord("USER_LOGIN", "mehedi@nest.com", "IP: 192.168.1.1");`}
            height="290px"
          />
        </div>

        <MistakeBox
          title="Placing optional parameters before required ones"
          description="In TypeScript, optional parameters (marked with '?') must always appear AFTER all required parameters in the parameter list."
          wrong={`// ❌ WRONG: Required parameter 'name' follows optional 'title'
function createProfile(title?: string, name: string) {
  return \`\${title} \${name}\`;
}`}
          right={`// ✅ RIGHT: Optional parameter placed last (or given a default value)
function createProfile(name: string, title?: string) {
  return title ? \`\${title} \${name}\` : name;
}`}
        />
      </div>

      <Divider />

      {/* ── 6.2 Function Type Aliases & Arrow Signatures ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Function Type Aliases & Callbacks"
          description="You can define the type shape of a function just like an object, allowing you to pass typed callbacks and middleware seamlessly."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                Function Type Alias
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Defines the signature: <code className="text-ds-feature-base">(params) =&gt; ReturnType</code>.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={8}
                code={`// Define reusable function signature
type StringFormatter = (input: string) => string;

const toSlug: StringFormatter = (text) => {
  return text.toLowerCase().replace(/\\s+/g, "-");
};

console.log(toSlug("NestJS Deep Dive")); // "nestjs-deep-dive"`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                Rest Parameters (...args)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Collect multiple arguments into a strictly typed array.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={8}
                code={`function sumScores(...scores: number[]): number {
  return scores.reduce((total, score) => total + score, 0);
}

const total = sumScores(88, 92, 95, 100);
console.log(total); // 375`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Typed Functions are Used in NestJS Services</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Injectable, NotFoundException } from '@nestjs/common';

interface User {
  id: number;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [{ id: 1, email: 'admin@nest.com' }];

  // Strictly typed async method returning a Promise<User>
  async findById(id: number): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(\`User with ID \${id} not found\`);
    }
    return user; // Return matches Promise<User>
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="What is the difference between returning `void` and returning `never` from a function?"
          answer="A function returning `void` completes normally but does not return any meaningful value (it returns undefined). A function returning `never` never reaches the end of its execution block (because it throws an exception or runs in an endless loop)."
        />
      </div>
    </SectionContainer>
  );
}
