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
// MODULE 8 — ASYNCHRONOUS SERVICES & DATABASES
// ═══════════════════════════════════════════════════════════

export function AsyncServicesSection() {
  return (
    <SectionContainer number={8} title="Asynchronous Services & Databases">
      {/* ── 8.1 Async Services ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Handling Database Queries with Promises"
          description="In real applications, reading from MySQL, PostgreSQL, or MongoDB is asynchronous."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  // Simulating an async database query:
  async findById(id: number): Promise<{ id: number; name: string }> {
    // 1. Await database query (e.g. Prisma or TypeORM)
    const user = await this.queryDatabase(id);

    // 2. Validate result
    if (!user) {
      throw new NotFoundException("User #" + id + " not found!");
    }

    return user;
  }

  private async queryDatabase(id: number) {
    return { id, name: "Alice" };
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 8.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Live Async Service Simulation"
          description="Test how asynchronous services resolve and handle delays."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Async Data Pipeline</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated database latency:
class OrdersService {
  private fakeDb = [
    { id: 101, customer: "Alice", total: 199.99 },
    { id: 102, customer: "Bob", total: 45.00 }
  ];

  async getOrder(id: number): Promise<any> {
    console.log("⏳ Querying SQL Database for Order #" + id + "...");

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const order = this.fakeDb.find(o => o.id === id);
        if (order) resolve(order);
        else reject(new Error("Order not found in database"));
      }, 400);
    });
  }
}

async function runTest() {
  const service = new OrdersService();
  const order = await service.getOrder(101);
  console.log("✅ Order loaded from DB:", order);
}

runTest();`}
            height="400px"
          />
        </div>

        <QuickCheck
          question="What return type should you specify on a service method that queries an asynchronous database?"
          answer="Promise<T> (e.g. async findUser(id: number): Promise<User>)"
        />
      </div>
    </SectionContainer>
  );
}
