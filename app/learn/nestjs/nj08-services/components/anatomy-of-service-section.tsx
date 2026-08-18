"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — ANATOMY OF A SERVICE
// ═══════════════════════════════════════════════════════════

export function AnatomyOfServiceSection() {
  return (
    <SectionContainer number={3} title="Anatomy of a Service">
      {/* ── 3.1 Full CRUD Service Code ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Writing a Complete CRUD Service"
          description="Let's look at how a service manages in-memory data, error checks, and CRUD operations."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@learncraft.dev' },
    { id: 2, name: 'Bob', email: 'bob@learncraft.dev' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      // ⭐ Throwing NestJS HTTP exceptions directly from a service:
      throw new NotFoundException("User with ID #" + id + " not found!");
    }
    return user;
  }

  create(name: string, email: string): User {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  remove(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException("User not found!");
    }
    this.users.splice(index, 1);
    return true;
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 3.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Run the Service Methods Live"
          description="Test adding, searching, and removing records."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live In-Memory CRUD</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class ProductsService {
  private products = [
    { id: 1, name: "Mechanical Keyboard", price: 89.99 },
    { id: 2, name: "Wireless Mouse", price: 49.99 }
  ];

  findAll() {
    return this.products;
  }

  create(name: string, price: number) {
    const item = { id: this.products.length + 1, name, price };
    this.products.push(item);
    return item;
  }

  findByMaxPrice(max: number) {
    return this.products.filter(p => p.price <= max);
  }
}

const service = new ProductsService();

console.log("Initial Products:", service.findAll());
service.create("Gaming Monitor", 299.99);
console.log("After Create:", service.findAll());
console.log("Budget Items (< $100):", service.findByMaxPrice(100));`}
            height="460px"
          />
        </div>

        <QuickCheck
          question="Can a Service throw standard NestJS HTTP exceptions like 'new NotFoundException()'?"
          answer="Yes! When a service throws a NotFoundException, NestJS's built-in global exception filter catches it and automatically returns a 404 status code and formatted JSON error to the client."
        />
      </div>
    </SectionContainer>
  );
}
