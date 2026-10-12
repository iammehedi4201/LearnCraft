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
// PART 8 — OBJECT MODIFIERS & EXACT SHAPES
// ═══════════════════════════════════════════════════════════

export function SectionObjectModifiers() {
  return (
    <SectionContainer number={8} title="Object Modifiers & Exact Shapes">
      {/* ── 8.1 Optional and Readonly Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Optional (?) & Readonly Modifiers"
          description="Fine-tune your object properties to indicate which fields are optional, and which fields can never be changed after initialization."
          color="primary"
        />

        <AnalogyBox emoji="🔒" title="Think about it like this">
          Think of a Government Passport:
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong className="text-ds-info-dark">readonly PassportNumber:</strong> Once issued, you can never rewrite or change it.</li>
            <li><strong className="text-ds-info-dark">FullName & BirthDate:</strong> Mandatory required fields.</li>
            <li><strong className="text-ds-info-dark">MiddleName?:</strong> An optional field that some people have, but others do not.</li>
          </ul>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Optional & Readonly Modifiers</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`interface UserAccount {
  readonly id: string;        // 🔒 Cannot be changed after creation
  readonly createdAt: Date;    // 🔒 Immutable timestamp
  username: string;           // ✏️ Can be updated
  bio?: string;               // ❓ Optional (string or undefined)
}

const user: UserAccount = {
  id: "usr_404",
  createdAt: new Date(),
  username: "mehedi_dev",
};

// Updating mutable field:
user.username = "mehedi_lead"; // ✅ Allowed!

// Optional field assignment:
user.bio = "Backend architect & NestJS enthusiast"; // ✅ Allowed!

// Try uncommenting to see readonly protection:
// user.id = "usr_999"; // ❌ Error! Cannot assign to 'id' because it is a read-only property.`}
            height="290px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 8.2 Index Signatures & Excess Property Checks ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Index Signatures & Excess Property Checks"
          description="Handle dynamic dictionary objects with unknown keys and understand how TypeScript catches accidental typo properties."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🗂️</span> Index Signatures (Dynamic Maps)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                When an object holds a flexible key-value dictionary (like HTTP headers or environment variables):
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={10}
                code={`interface HttpHeaders {
  authorization: string; // Required header
  [customHeader: string]: string; // Any other string headers
}

const reqHeaders: HttpHeaders = {
  authorization: "Bearer ey...",
  "x-client-version": "1.4.0",
  "x-request-id": "req_8812",
};`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🎯</span> Excess Property Checks
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                TypeScript stops typos when defining object literals directly by rejecting unrecognized keys.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={10}
                code={`interface CreateCategoryDto {
  name: string;
  description?: string;
}

// ❌ TypeScript Error: 'descripton' caught typo!
// const badCategory: CreateCategoryDto = {
//   name: "Electronics",
//   descripton: "All gadgets"
// };`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <MistakeBox
          title="Mutating nested arrays in readonly objects"
          description="'readonly' on an object property only freezes the property reference itself, not nested objects or array items unless you use 'readonly T[]' or 'as const'."
          wrong={`// ❌ Shallow readonly: the array reference can't change, but items CAN be pushed!
interface Config {
  readonly allowedOrigins: string[];
}
// config.allowedOrigins.push("malicious.com"); // TS doesn't catch this without readonly string[]!`}
          right={`// ✅ Deep protection: Mark array as readonly string[]
interface Config {
  readonly allowedOrigins: readonly string[];
}
// config.allowedOrigins.push(...); // ❌ TS catches this error!`}
        />

        <QuickCheck
          question="What is the result of adding `readonly` to a property in an interface?"
          answer="The property cannot be reassigned after the object is created. Any attempt to write `obj.prop = newValue` will trigger a compile-time error."
        />
      </div>
    </SectionContainer>
  );
}
