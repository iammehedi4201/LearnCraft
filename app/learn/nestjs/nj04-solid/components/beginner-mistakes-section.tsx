"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 10 — BEGINNER MISTAKES & GOTCHAS
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Beginner Mistakes & Gotchas in SOLID">
      {/* ── Top 5 SOLID Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common SOLID Mistakes"
          description="Recognize these TypeScript design problems—and avoid adding abstractions when they do not help."
          color="primary"
        />

        <MistakeBox
          title="Breaking S: The 'God Class' Anti-Pattern"
          description="Putting order orchestration, database access, email delivery, PDF generation, and payment logic into one large service class."
          wrong={`class OrderService {
  processOrder() {}
  saveToPostgres() {}
  sendCustomerEmail() {}
  generatePDFReceipt() {}
  chargeCreditCard() {}
}`}
          right={`type Order = { id: number; total: number };

class OrderRepository {
  save(order: Order): void { console.log("Saved", order.id); }
}

class OrderEmailNotifier {
  send(order: Order, receipt: string): void {
    console.log("Emailed", order.id, receipt);
  }
}

class ReceiptGenerator {
  create(order: Order): string { return "Receipt #" + order.id; }
}

class PaymentGateway {
  charge(order: Order): void { console.log("Charged", order.total); }
}

// Coordinates one use case; details stay in focused collaborators.
class OrderService {
  constructor(
    private readonly orders: OrderRepository,
    private readonly notifier: OrderEmailNotifier,
    private readonly receipts: ReceiptGenerator,
    private readonly payments: PaymentGateway
  ) {}

  process(order: Order): void {
    this.payments.charge(order);
    this.orders.save(order);
    const receipt = this.receipts.create(order);
    this.notifier.send(order, receipt);
  }
}`}
        />

        <MistakeBox
          title="Breaking O: Giant Switch/If-Else Statements"
          description="Using a switch statement on a 'type' string instead of defining a polymorphic interface."
          wrong={`type CustomerType = "regular" | "vip" | "student";

function calculateDiscount(userType: CustomerType, price: number): number {
  if (userType === "regular") return price * 0.95;
  if (userType === "vip") return price * 0.80;
  return price * 0.85;
  // ⚠️ Adding "senior" requires editing this function!
}`}
          right={`interface DiscountStrategy {
  calculate(price: number): number;
}

class RegularDiscount implements DiscountStrategy {
  calculate(price: number): number { return price * 0.95; }
}

class VipDiscount implements DiscountStrategy {
  calculate(price: number): number { return price * 0.80; }
}

class StudentDiscount implements DiscountStrategy {
  calculate(price: number): number { return price * 0.85; }
}`}
        />

        <MistakeBox
          title="Breaking L: Throwing 'Not Supported' in Child Classes"
          description="Subclassing a parent class and throwing runtime errors when inherited methods are called."
          wrong={`class FileStorage {
  readFile(path: string): string { return "data from " + path; }
  deleteFile(path: string): void { console.log("Deleted", path); }
}

class ReadOnlyArchiveStorage extends FileStorage {
  deleteFile(_path: string): void {
    // ❌ Breaks LSP! Surprises any caller expecting FileStorage!
    throw new Error("Deletion not supported on archive storage!");
  }
}`}
          right={`interface ReadableStorage {
  readFile(path: string): string;
}

interface DeletableStorage {
  deleteFile(path: string): void;
}

class ArchiveStorage implements ReadableStorage {
  readFile(path: string): string { return "archive data from " + path; }
}

class LiveStorage implements ReadableStorage, DeletableStorage {
  readFile(path: string): string { return "live data from " + path; }
  deleteFile(path: string): void { console.log("Deleted", path); }
}`}
        />

        <MistakeBox
          title="Breaking I: Giant Fat Interfaces"
          description="Creating an interface with 15 optional or unused methods that classes are forced to implement."
          wrong={`type QueryResult = ReadonlyArray<Record<string, unknown>>;

interface DatabaseDriver {
  connect(): void;
  query(sql: string): QueryResult;
  enableGeoReplication(): void;
  flushRedisCache(): void;
}`}
          right={`type QueryResult = ReadonlyArray<Record<string, unknown>>;

interface Connection { connect(): void; }
interface QueryRunner { query(sql: string): QueryResult; }
interface GeoReplicable { enableGeoReplication(): void; }`}
        />

        <MistakeBox
          title="Breaking D: Hard-Coding an Infrastructure Dependency"
          description="The high-level NotificationService creates and depends on a concrete vendor client. Constructor DI alone is not enough; the service should depend on a contract."
          wrong={`import { Injectable } from "@nestjs/common";

class TwilioSmsClient {
  sendSms(message: string): void { console.log("Twilio:", message); }
}

@Injectable()
class NotificationService {
  private readonly client = new TwilioSmsClient();

  send(message: string): void {
    this.client.sendSms(message);
  }
}`}
          right={`import { Inject, Injectable, Module } from "@nestjs/common";

interface SmsSender {
  send(message: string): void;
}

const SMS_SENDER = Symbol("SMS_SENDER");

@Injectable()
class TwilioSmsSender implements SmsSender {
  send(message: string): void { console.log("Twilio:", message); }
}

@Injectable()
class NotificationService {
  constructor(
    @Inject(SMS_SENDER) private readonly sender: SmsSender
  ) {}

  send(message: string): void {
    this.sender.send(message);
  }
}

@Module({
  providers: [
    NotificationService,
    { provide: SMS_SENDER, useClass: TwilioSmsSender }
  ]
})
class NotificationsModule {}`}
        />

        <MistakeBox
          title="Over-Applying SOLID to Simple Code"
          description="Extra interfaces, factories, and classes have a cost. Add an abstraction when it isolates a real variation or dependency—not only because an abstraction is possible."
          wrong={`interface GreetingBuilder {
  build(name: string): string;
}

class DefaultGreetingBuilder implements GreetingBuilder {
  build(name: string): string { return "Hello, " + name; }
}

class GreetingBuilderFactory {
  create(): GreetingBuilder { return new DefaultGreetingBuilder(); }
}`}
          right={`function buildGreeting(name: string): string {
  return "Hello, " + name;
}`}
        />

        <InfoCallout emoji="🧭" title="Where new Belongs">
          <p>
            It is fine for a composition root or NestJS container to create objects. It is also fine to create simple values directly. The concern is high-level business code choosing a replaceable database, message vendor, or other low-level detail for itself.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Why is creating a concrete DatabaseConnection inside a controller a Dependency Inversion warning sign?"
          answer="The high-level controller becomes tied to one low-level database detail. Prefer a focused abstraction and a runtime provider token, then let the NestJS module choose and inject the concrete implementation. The 'new' keyword itself is not forbidden; it belongs at a composition boundary."
        />
      </div>
    </SectionContainer>
  );
}
