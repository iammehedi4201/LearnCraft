"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — INJECTING SERVICES INTO CONTROLLERS
// ═══════════════════════════════════════════════════════════

export function InjectingServicesSection() {
  return (
    <SectionContainer number={4} title="Injecting Services into Controllers">
      {/* ── 4.1 Constructor Injection ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Constructor Dependency Injection"
          description="How a controller asks for and receives its service helper."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // ⭐ NestJS automatically injects UsersService here!
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💡</span> TypeScript Shorthand Syntax Explained
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
            Writing <code>constructor(private readonly usersService: UsersService)</code> is TypeScript shorthand! It automatically:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-ds-text-strong">
            <li>Declares a private property named <code>this.usersService</code> on the class.</li>
            <li>Assigns the injected parameter directly to <code>this.usersService</code>.</li>
            <li>Makes it <code>readonly</code> so it cannot be accidentally overwritten.</li>
          </ol>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 4.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="See Controller + Service Injection Live"
          description="Test how the controller and service work together as a team."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Complete Controller-Service Team</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class OrdersService {
  private orders = [{ id: 101, total: 49.99, status: "pending" }];

  getAll() { return this.orders; }

  createOrder(total: number) {
    const newOrder = { id: this.orders.length + 101, total, status: "pending" };
    this.orders.push(newOrder);
    return newOrder;
  }
}

class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  getOrders() {
    return { count: this.ordersService.getAll().length, data: this.ordersService.getAll() };
  }

  placeOrder(total: number) {
    const order = this.ordersService.createOrder(total);
    return { status: 201, message: "Order placed!", order };
  }
}

// In NestJS, the IoC container wires this up:
const service = new OrdersService();
const controller = new OrdersController(service);

console.log(controller.placeOrder(120.00));
console.log(controller.getOrders());`}
            height="460px"
          />
        </div>

        <QuickCheck
          question="What is the advantage of using 'private readonly' in the constructor when injecting a service?"
          answer="It automatically creates the class property and assigns the injected service in one single line, while 'readonly' prevents the service reference from being accidentally modified."
        />
      </div>
    </SectionContainer>
  );
}
