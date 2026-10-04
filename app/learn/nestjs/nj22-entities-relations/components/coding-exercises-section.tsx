"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (DOMAIN ENTITIES & INVARIANTS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Domain Entities & Invariants">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your domain modeling skills into practice! Implement rich business entities with invariants and test your code directly.
        </p>
      </div>

      {/* ── Exercise 1: Rich Entity Methods ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Encapsulated Account Entity</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "entities-ex-01",
              title: "1. Build an Account Entity with Invariants",
              instructions: `Implement 'AccountEntity':
1. Constructor accepts '(id: string, initialBalance: number)'. Throws error if initialBalance < 0.
2. Getter 'balance' returns current balance.
3. Method 'deposit(amount: number)': Throws error if amount <= 0, adds to balance.
4. Method 'withdraw(amount: number)': Throws error if amount <= 0 or amount > balance, subtracts from balance.`,
              starterCode: `class AccountEntity {
  // Your code here:
}

const acc = new AccountEntity("acc-1", 100);
acc.deposit(50);
acc.withdraw(30);
console.log("Final balance:", acc.balance); // Should be 120`,
              solutionCode: `class AccountEntity {
  private _balance: number;

  constructor(public readonly id: string, initialBalance: number) {
    if (initialBalance < 0) throw new Error("Initial balance cannot be negative");
    this._balance = initialBalance;
  }

  get balance(): number {
    return this._balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit amount must be positive");
    this._balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive");
    if (amount > this._balance) throw new Error("Insufficient funds");
    this._balance -= amount;
  }
}

const acc = new AccountEntity("acc-1", 100);
acc.deposit(50);
acc.withdraw(30);
console.log("Final balance:", acc.balance);`,
              hints: [
                "Store balance in a private field '_balance' and expose via 'get balance()'.",
                "Check for positive amounts before adding or subtracting.",
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Aggregate Root with Children ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Order Aggregate Root</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "entities-ex-02",
              title: "2. Build Order Aggregate with Item Collection",
              instructions: `Implement 'OrderAggregate':
1. Constructor accepts '(id: string, customerId: string)'.
2. Private array '_items' storing items of shape '{ productId: string, qty: number, price: number }'.
3. Method 'addItem(productId: string, qty: number, price: number)': Throws error if qty <= 0, otherwise pushes item.
4. Getter 'itemCount': Returns total quantity across all items.
5. Getter 'total': Returns sum of (qty * price) across all items.`,
              starterCode: `class OrderAggregate {
  // Your code here:
}

const order = new OrderAggregate("ord-1", "cust-99");
order.addItem("prod-a", 2, 50);
order.addItem("prod-b", 1, 100);
console.log("Count:", order.itemCount); // Should be 3
console.log("Total:", order.total);     // Should be 200`,
              solutionCode: `class OrderAggregate {
  private readonly _items: Array<{ productId: string; qty: number; price: number }> = [];

  constructor(
    public readonly id: string,
    public readonly customerId: string,
  ) {}

  addItem(productId: string, qty: number, price: number): void {
    if (qty <= 0) throw new Error("Quantity must be positive");
    this._items.push({ productId, qty, price });
  }

  get itemCount(): number {
    return this._items.reduce((sum, item) => sum + item.qty, 0);
  }

  get total(): number {
    return this._items.reduce((sum, item) => sum + item.qty * item.price, 0);
  }
}

const order = new OrderAggregate("ord-1", "cust-99");
order.addItem("prod-a", 2, 50);
order.addItem("prod-b", 1, 100);
console.log("Count:", order.itemCount);
console.log("Total:", order.total);`,
              hints: [
                "Use Array.reduce to compute total and itemCount over this._items.",
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
