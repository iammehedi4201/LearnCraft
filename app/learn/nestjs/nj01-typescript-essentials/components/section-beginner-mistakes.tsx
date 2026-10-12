"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 14 — BEGINNER MISTAKES & TRAPS
// ═══════════════════════════════════════════════════════════

export function SectionBeginnerMistakes() {
  return (
    <SectionContainer number={14} title="Beginner Mistakes & Traps">
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls & Anti-Patterns"
          description="Avoid the most common traps that catch beginners when transitioning from JavaScript to TypeScript and NestJS."
          color="rose"
        />

        {/* ── Trap 1: Interfaces Don't Exist at Runtime ── */}
        <MistakeBox
          title="1. Using 'instanceof' with an Interface"
          description="Interfaces are completely erased during compilation. They do not exist at runtime, so using 'instanceof MyInterface' will crash with a ReferenceError."
          wrong={`// ❌ CRASHES AT RUNTIME: Interface does not exist in JS!
interface UserDto { name: string; }

if (payload instanceof UserDto) { // 💥 ReferenceError: UserDto is not defined
  console.log("Valid user");
}`}
          right={`// ✅ RIGHT: Use a Class (exists at runtime) or custom type guard
class UserDto { name: string = ""; }

if (payload instanceof UserDto) { // ✅ Works! Class exists in runtime JS
  console.log("Valid user");
}`}
        />

        {/* ── Trap 2: Overusing the Non-Null Assertion Operator (!) ── */}
        <MistakeBox
          title="2. Silencing TS with the '!' non-null assertion"
          description="Adding '!' tells TypeScript: 'Trust me, this is never null.' If the value IS null in production, your server crashes with a NullPointerException."
          wrong={`// ❌ DANGEROUS: Silencing the compiler without checking
const user = findUserById(id);
console.log(user!.email.toLowerCase()); // 💥 Crashes if user not found!`}
          right={`// ✅ SAFE: Use optional chaining (?.) or an explicit if-guard
const user = findUserById(id);
if (user) {
  console.log(user.email.toLowerCase()); // ✅ Guaranteed safe!
}`}
        />

        {/* ── Trap 3: Turning Off Strict Mode in tsconfig.json ── */}
        <MistakeBox
          title="3. Not enabling 'strict: true' in tsconfig.json"
          description="Without strict mode, TypeScript allows null and undefined to be assigned to string and number variables, letting null-pointer bugs slip right through."
          wrong={`// ❌ tsconfig.json without strict mode
{
  "compilerOptions": {
    "strict": false // ⚠️ Allows hidden null crashes
  }
}`}
          right={`// ✅ tsconfig.json with strict mode (Standard for NestJS)
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true
  }
}`}
        />

        {/* ── Trap 4: Duplicating DTOs Manually ── */}
        <MistakeBox
          title="4. Copy-pasting DTOs instead of Utility Types"
          description="Manually creating separate CreateUserDto, UpdateUserDto, and UserEntity leads to out-of-sync schemas when fields are renamed or added."
          wrong={`// ❌ FRAGILE: 3 manual copies of the same fields
interface UserEntity { id: number; name: string; email: string; }
interface CreateUserDto { name: string; email: string; }
interface UpdateUserDto { name?: string; email?: string; }`}
          right={`// ✅ ROBUST: Single source of truth with Utility Types
interface UserEntity { id: number; name: string; email: string; }
type CreateUserDto = Omit<UserEntity, 'id'>;
type UpdateUserDto = Partial<CreateUserDto>;`}
        />

        <QuickCheck
          question="Why can you use `instanceof` with a TypeScript Class, but NOT with an Interface?"
          answer="Classes compile into real JavaScript constructor functions/prototypes that exist at runtime in Node.js. Interfaces are purely compile-time constructs that are erased (stripped out) during compilation and do not exist at runtime."
        />
      </div>
    </SectionContainer>
  );
}
