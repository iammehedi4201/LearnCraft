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
// PART 3 — ARRAYS, TUPLES & READONLY
// ═══════════════════════════════════════════════════════════

export function SectionArraysTuples() {
  return (
    <SectionContainer number={3} title="Arrays, Tuples & Readonly">
      {/* ── 3.1 Typed Arrays ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Typed Arrays (Lists of Uniform Items)"
          description="In JavaScript, an array can mix numbers, strings, and random objects without warning. In TypeScript, an array is strictly typed so every element conforms to the same shape."
          color="primary"
        />

        <AnalogyBox emoji="🛒" title="Think about it like this">
          Think of a coin sorter. A tray designed for dollar coins will only accept dollar coins. If you try to slip a button or a pebble into the tray, it simply will not fit.
          <p className="mt-2">
            A <code className="text-ds-info-dark font-bold">number[]</code> array guarantees that every item inside is guaranteed to be a number, so math methods like <code className="text-ds-info-dark">.reduce()</code> or <code className="text-ds-info-dark">.toFixed()</code> will never crash.
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                Array Syntax 1: Square Bracket Syntax (Standard)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                The standard, concise TypeScript syntax for uniform lists.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                code={`// Array of strings
const tags: string[] = ["nest", "typescript", "backend"];

// Array of numbers
const prices: number[] = [19.99, 29.99, 49.99];

// ❌ TypeScript error: boolean not assignable to string
// tags.push(true);`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2">
                Array Syntax 2: Generic Array Syntax
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Generic wrapper syntax, equivalent in runtime behavior.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                code={`// Exactly identical in behavior to string[]
const permissions: Array<string> = ["READ", "WRITE", "DELETE"];

// Array of union types
const mixedScores: Array<number | string> = [100, "A+", 95, "A"];

// ❌ TypeScript error: boolean not assignable
// permissions.push(true);`}
                language="typescript"
              />
            </div>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 3.2 Tuples (Fixed-Length, Ordered Lists) ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Tuples: Strict Ordered Structures"
          description="A Tuple is an array with a fixed number of elements where every position has a specific, distinct type."
          color="sky"
        />

        <AnalogyBox emoji="📍" title="Think about it like this">
          Think of a GPS coordinate pair: <code className="text-ds-info-dark font-bold">[Latitude, Longitude]</code> or an HTTP response header pair: <code className="text-ds-info-dark font-bold">[HeaderName, HeaderValue]</code>.
          <p className="mt-2">
            Order matters! Position 1 is always Latitude (number), and Position 2 is always Longitude (number). A tuple ensures the exact length and exact types at each index.
          </p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Working with Tuples</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. Define a strict tuple: [UserID, Username, IsAdmin]
type UserSession = [number, string, boolean];

const activeSession: UserSession = [101, "Mehedi", true];

// 2. Named Tuples provide clear documentation in editor hints
type GeoLocation = [latitude: number, longitude: number];

const officeLocation: GeoLocation = [23.8103, 90.4125];

console.log(\`User \${activeSession[1]} is at Lat: \${officeLocation[0]}, Lng: \${officeLocation[1]}\`);

// Try swapping the elements:
// const badSession: UserSession = ["Mehedi", 101, true]; // ❌ Error! Pos 0 must be number.`}
            height="270px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 3.3 Readonly Arrays & as const ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Readonly Arrays & as const Immutability"
          description="Protect configuration data and master reference lists from accidental mutation (.push, .pop, or index reassignment)."
          color="emerald"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>🔒</span> readonly T[] Modifier
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Prevents any mutating methods like <code className="text-ds-feature-base">.push()</code>, <code className="text-ds-feature-base">.splice()</code>, or <code className="text-ds-feature-base">arr[0] = x</code>.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={7}
                code={`const defaultRoles: readonly string[] = ["ADMIN", "MEMBER", "GUEST"];

// ❌ Error: Property 'push' does not exist on type 'readonly string[]'
// defaultRoles.push("SUPERADMIN");

// ❌ Error: Cannot assign to index
// defaultRoles[0] = "MODERATOR";`}
                language="typescript"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft flex flex-col justify-between h-full">
            <div>
              <h5 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
                <span>💎</span> as const (Const Assertions)
              </h5>
              <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
                Freezes entire literal values and deeply locks arrays into readonly tuples of exact literal types.
              </p>
            </div>
            <div className="mt-auto">
              <EnhancedCodeBlock
                minLines={7}
                code={`// Infers type: readonly ["development", "staging", "production"]
const ENVIRONMENTS = ["development", "staging", "production"] as const;

// Create a type directly from the values!
type Environment = typeof ENVIRONMENTS[number];
// Equivalent to: "development" | "staging" | "production"`}
                language="typescript"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🦁 How Arrays & Tuples are Used in NestJS</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('users')
export class UsersBatchController {

  // Accepting an array of IDs for batch deletion
  @Post('batch-delete')
  deleteMultiple(@Body('ids') userIds: number[]): { deletedCount: number } {
    return { deletedCount: userIds.length };
  }

  // Returning a tuple of [items, totalCount] for paginated queries
  @Get('paginated')
  findWithCount(): [string[], number] {
    const users = ["Alice", "Bob", "Charlie"];
    const total = 100;
    return [users, total]; // Strict tuple return
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="What is the key difference between `string[]` and `[string, number]`?"
          answer="`string[]` is a regular array of arbitrary length containing only strings. `[string, number]` is a strict Tuple that MUST contain exactly 2 elements, where the first element is a string and the second element is a number."
        />
      </div>
    </SectionContainer>
  );
}
