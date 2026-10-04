"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER DOMAIN MODELING MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Domain Modeling Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={10}
          title="Common Domain & Entity Pitfalls in NestJS"
          description="Avoid these architectural mistakes when modeling entities and relationships."
          color="primary"
        />

        <MistakeBox
          title="Anemic Domain Models (Public Fields with No Invariants)"
          description="Treating entities as passive data structures leads to duplicated, scattered business logic in controllers."
          wrong={`// ❌ Wrong: Public mutable fields with zero validation:
export class AccountEntity {
  public id: string;
  public balance: number;
}
// Logic scattered in controllers:
if (account.balance >= 100) account.balance -= 100;`}
          right={`// ✅ Correct: Rich entity encapsulating business rules:
export class AccountEntity {
  constructor(public readonly id: string, private _balance: number) {}
  get balance(): number { return this._balance; }
  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (this._balance < amount) throw new Error("Insufficient funds");
    this._balance -= amount;
  }
}`}
        />

        <MistakeBox
          title="Leaking Raw Entities Directly to HTTP Clients"
          description="Returning internal domain entities can leak sensitive data (hashes, salt) or cause circular reference crashes."
          wrong={`// ❌ Returning domain entity with sensitive fields directly:
@Get(':id')
getUser(@Param('id') id: string) {
  return this.usersService.findById(id); // Exposes passwordHash!
}`}
          right={`// ✅ Map to a response DTO or use ClassSerializerInterceptor:
@Get(':id')
@UseInterceptors(ClassSerializerInterceptor)
getUser(@Param('id') id: string): Promise<UserEntity> {
  return this.usersService.findById(id); // @Exclude() strips passwordHash
}`}
        />

        <MistakeBox
          title="Circular References in Bidirectional Entity Relations"
          description="Nesting full parent and child objects inside each other causes JSON.stringify stack overflows."
          wrong={`// ❌ Infinite circular loop:
user.posts[0].author.posts[0].author... // JSON.stringify throws TypeError`}
          right={`// ✅ Reference by ID or use unidirectional associations:
export class PostEntity {
  constructor(public readonly authorId: string) {} // Reference by ID!
}`}
        />

        <QuickCheck
          question="What is the difference between DTO validation and Domain Entity validation?"
          answer="DTO validation (class-validator) verifies network syntax (e.g. isEmail, isNotEmpty), whereas Domain validation verifies business rules (e.g. account has sufficient funds, user is not banned)."
        />
      </div>
    </SectionContainer>
  );
}
