"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
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
          title="Top 5 Most Common SOLID Violations"
          description="Recognize and avoid these common anti-patterns in TypeScript and NestJS applications."
          color="primary"
        />

        <MistakeBox
          title="Breaking S: The 'God Class' Anti-Pattern"
          description="Putting authentication, database queries, email sending, and PDF generation into a single 1,500-line service class."
          wrong={`class OrderService {
  processOrder() {}
  saveToPostgres() {}
  sendCustomerEmail() {}
  generatePDFReceipt() {}
  chargeCreditCard() {}
}`}
          right={`// Separate into focused, single-purpose classes:
class OrderService { ... }
class OrderRepository { ... }
class OrderEmailNotifier { ... }
class ReceiptPdfGenerator { ... }
class PaymentGateway { ... }`}
        />

        <MistakeBox
          title="Breaking O: Giant Switch/If-Else Statements"
          description="Using a switch statement on a 'type' string instead of defining a polymorphic interface."
          wrong={`function calculateDiscount(userType: string, price: number) {
  if (userType === "regular") return price * 0.95;
  if (userType === "vip") return price * 0.80;
  if (userType === "student") return price * 0.85;
  // ⚠️ Adding "senior" requires editing this function!
}`}
          right={`interface DiscountStrategy {
  calculate(price: number): number;
}
class RegularDiscount implements DiscountStrategy { ... }
class VipDiscount implements DiscountStrategy { ... }
class StudentDiscount implements DiscountStrategy { ... }`}
        />

        <MistakeBox
          title="Breaking L: Throwing 'Not Supported' in Child Classes"
          description="Subclassing a parent class and throwing runtime errors when inherited methods are called."
          wrong={`class FileStorage {
  uploadFile() {}
  deleteFile() {}
}

class ReadOnlyArchiveStorage extends FileStorage {
  deleteFile() {
    // ❌ Breaks LSP! Surprises any caller expecting FileStorage!
    throw new Error("Deletion not supported on archive storage!");
  }
}`}
          right={`interface ReadableStorage {
  readFile(): any;
}
interface DeletableStorage {
  deleteFile(): void;
}
class ArchiveStorage implements ReadableStorage { ... }
class LiveStorage implements ReadableStorage, DeletableStorage { ... }`}
        />

        <MistakeBox
          title="Breaking I: Giant Fat Interfaces"
          description="Creating an interface with 15 optional or unused methods that classes are forced to implement."
          wrong={`interface DatabaseDriver {
  connect(): void;
  query(sql: string): any;
  enableGeoReplication(): void;
  flushRedisCache(): void;
}`}
          right={`interface Connection { connect(): void; }
interface QueryRunner { query(sql: string): any; }
interface GeoReplicable { enableGeoReplication(): void; }`}
        />

        <MistakeBox
          title="Breaking D: Calling 'new' Inside Methods"
          description="Hardcoding dependencies with 'new' inside your services or controllers instead of using constructor Dependency Injection."
          wrong={`@Injectable()
class NotificationService {
  send(msg: string) {
    // ❌ Hardcoded tight coupling! Cannot mock in tests!
    const client = new TwilioSmsClient();
    client.sendSms(msg);
  }
}`}
          right={`@Injectable()
class NotificationService {
  // ✅ Loose coupling: Received via Dependency Injection!
  constructor(private readonly smsClient: TwilioSmsClient) {}

  send(msg: string) {
    this.smsClient.sendSms(msg);
  }
}`}
        />

        <QuickCheck
          question="Which SOLID principle is violated if you write 'new DatabaseConnection()' inside your NestJS controller constructor?"
          answer="The Dependency Inversion Principle (D). Controllers should not construct their own dependencies. Instead, declare 'constructor(private readonly db: DatabaseConnection) {}' and let NestJS's DI container inject the instance automatically."
        />
      </div>
    </SectionContainer>
  );
}
