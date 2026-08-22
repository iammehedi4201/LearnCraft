"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 12 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={12} title="Learning Checks & Quizzes">
      {/* ── Spot the Principle ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Spot the Broken Principle Puzzles"
          description="Read each code snippet and identify which SOLID principle is being broken."
          color="primary"
        />

        <PredictOutputBox
          code={`type ReportData = Record<string, string | number>;
type PdfDocument = { fileName: string };

class ReportGenerator {
  generatePDF(_data: ReportData): PdfDocument {
    return { fileName: "report.pdf" };
  }

  sendEmailToManager(pdf: PdfDocument): void {
    console.log("Emailing", pdf.fileName);
  }

  saveReportLogToDatabase(message: string): void {
    console.log("Saving log:", message);
  }
}`}
          answer={`Violates: Single Responsibility Principle (S)\n\nExplanation: ReportGenerator has 3 distinct responsibilities: PDF layout formatting, email transmission, and database logging. Changes to any of those 3 external systems force edits to this single file.`}
        />

        <PredictOutputBox
          code={`interface VideoPlayer {
  play(): void;
  pause(): void;
  burnToDvdDisc(): void;
}

class MobileAppPlayer implements VideoPlayer {
  play(): void { console.log("Playing stream"); }
  pause(): void { console.log("Paused"); }
  burnToDvdDisc(): void { throw new Error("Mobile phones don't have DVD drives!"); }
}`}
          answer={`Violates: Interface Segregation Principle (I) & Liskov Substitution Principle (L)\n\nExplanation: MobileAppPlayer is forced by the fat VideoPlayer interface to implement 'burnToDvdDisc()', which throws a runtime exception and breaks callers expecting a safe VideoPlayer.`}
        />

        <PredictOutputBox
          code={`type DiscountType = "WINTER_SALE" | "BLACK_FRIDAY" | "NEW_USER";

class DiscountCalculator {
  getDiscount(type: DiscountType, amount: number): number {
    if (type === "WINTER_SALE") return amount * 0.20;
    if (type === "BLACK_FRIDAY") return amount * 0.50;
    return amount * 0.10;
  }
}`}
          answer={`Violates: Open/Closed Principle (O)\n\nExplanation: Every time marketing launches a new seasonal discount (e.g. 'SUMMER_SALE'), developers must modify the existing getDiscount function, risking regression bugs in black friday calculations.`}
        />

        <PredictOutputBox
          code={`class EmailNotifier {
  send(message: string): void { console.log("Email:", message); }
}

class AccountService {
  // The object is injected, but the policy still names one concrete tool.
  constructor(private readonly notifier: EmailNotifier) {}

  notify(message: string): void {
    this.notifier.send(message);
  }
}`}
          answer={`Warning sign: Dependency Inversion Principle (D)\n\nExplanation: This is constructor dependency injection, but AccountService still depends on the concrete EmailNotifier type. Introduce a small notifier contract and choose the implementation at the composition boundary. DI is the delivery technique; depending on the abstraction is the DIP design choice.`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Scenario-Based Conceptual Checks"
          description="Test your ability to solve real-world architectural design challenges."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You are building a NestJS application. You need to switch your file storage provider from Local Disk Storage to Amazon AWS S3. If your application follows Dependency Inversion (D), what changes are needed in your controller?"
            answer="The controller should need no change if it depends on a stable FileStorage contract. Because a TypeScript interface disappears at runtime, keep a FILE_STORAGE token and change the module binding to something like '{ provide: FILE_STORAGE, useClass: S3Storage }'. Wiring changes, while the controller's policy stays stable."
          />

          <QuickCheck
            question="Scenario 2: Why does NestJS organize code into @Module(), @Controller(), and @Injectable() Service classes instead of writing raw routes like 'app.get('/users', (req, res) => ...)'?"
            answer="This structure encourages clear responsibilities and constructor injection. Controllers can focus on HTTP translation, services can own use cases, and modules can group and wire providers. NestJS provides the building blocks, but developers can still mix responsibilities or depend on concrete details."
          />

          <QuickCheck
            question="Scenario 3: An online store has a base ShippingMethod class with calculateCost(). ExpressShipping returns $20, StandardShipping returns $5, and InStorePickup throws an Error: 'Cannot calculate shipping for pickup'. How should you refactor this to satisfy Liskov Substitution (L)?"
            answer="Prefer separating pickup from delivery-based shipping if calculateCost() promises a delivery cost. Returning $0 is valid only if the contract explicitly defines pickup as a shipping method with zero cost. The key is that every subtype must keep the same documented meaning and behavior."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
