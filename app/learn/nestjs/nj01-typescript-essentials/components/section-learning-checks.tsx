"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  SectionHeading,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 16 — INTERACTIVE LEARNING CHECKS
// ═══════════════════════════════════════════════════════════

export function SectionLearningChecks() {
  return (
    <SectionContainer number={16} title="Interactive Learning Checks">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Test your mastery of TypeScript essentials! Try answering each question in your head <strong>before</strong> clicking to reveal the answer. Then solve the TypeScript Predict challenges.
        </p>
      </div>

      {/* ── 16.1 Quick Questions ── */}
      <div className="mb-16">
        <SectionHeading>❓ Quick Concept Questions</SectionHeading>

        <div className="space-y-4">
          <QuickCheck
            question="1. What is the fundamental difference between TypeScript and JavaScript?"
            answer="TypeScript is a statically typed superset of JavaScript. It performs compile-time type verification to catch errors during development, and compiles down to pure JavaScript for execution by Node.js or browsers."
          />

          <QuickCheck
            question="2. Does TypeScript add any runtime performance overhead to your production server?"
            answer="Zero. Types are purely compile-time constructs that are erased (Type Erasure) during compilation into JavaScript. Node.js executes clean, standard JS with zero performance penalty."
          />

          <QuickCheck
            question="3. What is the difference between Type Inference and Explicit Type Annotation?"
            answer="Type Inference is when TypeScript automatically figures out the variable type based on the initial assigned value. Explicit Annotation is when you manually write `: type` after the identifier."
          />

          <QuickCheck
            question="4. Why should you avoid using the uppercase types 'String', 'Number', and 'Boolean'?"
            answer="'String', 'Number', and 'Boolean' refer to JavaScript's boxed object wrapper types, not the raw primitive types. Always use the lowercase keywords: string, number, boolean."
          />

          <QuickCheck
            question="5. What is the key difference between an Array (`string[]`) and a Tuple (`[string, number]`)?"
            answer="An array holds any number of items of the same type. A tuple has a strict fixed length where every position has a distinct, enforced type."
          />

          <QuickCheck
            question="6. Why is 'unknown' safer than 'any'?"
            answer="'any' completely disables the TypeScript compiler, allowing invalid operations to crash at runtime. 'unknown' forces you to check and prove what the data is (via typeof, instanceof, or in) before allowing you to use it."
          />

          <QuickCheck
            question="7. What does the 'never' type represent?"
            answer="'never' represents values that can never occur. It is the return type of functions that always throw an exception, and is used for compile-time exhaustive switch checking."
          />

          <QuickCheck
            question="8. When should you use String Enums instead of Numeric Enums in NestJS?"
            answer="Always. String Enums store human-readable strings ('ADMIN', 'USER') in databases and JSON logs, preventing breaking changes if enum items are re-ordered."
          />

          <QuickCheck
            question="9. Can an interface define a union type (e.g. string | number)?"
            answer="No. Interfaces can only define object structures and classes. To define a union type, you must use a 'type' alias."
          />

          <QuickCheck
            question="10. What does the `Omit<T, Keys>` utility type do?"
            answer="It constructs a new type by taking an existing type `T` and excluding the specified property keys. In NestJS, it is used to create DTOs that omit database-generated IDs and createdAt timestamps."
          />

          <QuickCheck
            question="11. What does `Partial<T>` do, and where is it used in NestJS?"
            answer="`Partial<T>` copies an interface and makes every property optional. It is universally used for PATCH / Update DTOs where clients can update any subset of fields."
          />

          <QuickCheck
            question="12. What does `<T>` represent in a generic function or interface?"
            answer="`<T>` is a type parameter (a fill-in-the-blank placeholder). The caller supplies the actual type when invoking the function or implementing the interface."
          />

          <QuickCheck
            question="13. What does `<T extends HasId>` do in a generic constraint?"
            answer="It restricts the generic type `T` so that whatever type is passed in, it MUST contain at least the properties defined in `HasId` (e.g. an `id` field)."
          />

          <QuickCheck
            question="14. What is a Discriminated Union (Tagged Union)?"
            answer="A union of object types that share a single common literal property (like `type: 'CARD' | 'PAYPAL'`). TypeScript uses this tag to narrow the object shape inside switch/if blocks with 100% precision."
          />

          <QuickCheck
            question="15. Why does `payload instanceof MyInterface` throw a ReferenceError at runtime?"
            answer="Because Interfaces do not exist in JavaScript at runtime (they are stripped during compilation). To use `instanceof`, the target must be a real JavaScript Class."
          />
        </div>
      </div>

      <Divider />

      {/* ── 16.2 Predict the TypeScript Behavior ── */}
      <div className="mb-16">
        <SectionHeading>🔮 Predict the TypeScript Behavior</SectionHeading>
        <p className="text-sm text-ds-text-sub mb-6">
          Will the following snippets compile or trigger a TypeScript error? What will they output?
        </p>

        <PredictOutputBox
          code={`let score = 100;
// @ts-ignore check:
// score = "A+";
console.log(typeof score);`}
          answer='"number"'
          explanation="TypeScript uses Type Inference to permanently type 'score' as a number. In plain JS, typeof score would remain 'number'."
        />

        <PredictOutputBox
          code={`interface Product {
  id: number;
  name: string;
}

type CreateDto = Omit<Product, 'id'>;

const item: CreateDto = {
  name: "Gaming Mouse"
};

console.log(item.name);`}
          answer='"Gaming Mouse"'
          explanation="Omit<Product, 'id'> created a shape requiring only { name: string }. The object follows the contract perfectly."
        />

        <PredictOutputBox
          code={`function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("NestJS"));
console.log(getLength([10, 20, 30, 40]));`}
          answer={`6\n4`}
          explanation="Both strings and arrays have a '.length' property of type number, so both satisfy the constraint `<T extends { length: number }>`."
        />

        <PredictOutputBox
          code={`type Status = "ACTIVE" | "INACTIVE";

function getStatusBadge(status: Status): string {
  switch (status) {
    case "ACTIVE": return "🟢 Online";
    case "INACTIVE": return "🔴 Offline";
    default: {
      const _check: never = status;
      return _check;
    }
  }
}

console.log(getStatusBadge("ACTIVE"));`}
          answer='"🟢 Online"'
          explanation="The switch statement exhaustively handles all union variants of 'Status'. The 'never' branch is unreachable, which proves type safety."
        />
      </div>
    </SectionContainer>
  );
}
