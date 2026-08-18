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
          code={`class ReportGenerator {
  generatePDF(data: any) { /* formats PDF */ }
  sendEmailToManager(pdf: any) { /* connects to SMTP server */ }
  saveReportLogToDatabase(log: any) { /* runs SQL query */ }
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
  play() { console.log("Playing stream"); }
  pause() { console.log("Paused"); }
  burnToDvdDisc() { throw new Error("Mobile phones don't have DVD drives!"); }
}`}
          answer={`Violates: Interface Segregation Principle (I) & Liskov Substitution Principle (L)\n\nExplanation: MobileAppPlayer is forced by the fat VideoPlayer interface to implement 'burnToDvdDisc()', which throws a runtime exception and breaks callers expecting a safe VideoPlayer.`}
        />

        <PredictOutputBox
          code={`class DiscountCalculator {
  getDiscount(type: string, amount: number) {
    if (type === "WINTER_SALE") return amount * 0.20;
    if (type === "BLACK_FRIDAY") return amount * 0.50;
    if (type === "NEW_USER") return amount * 0.10;
  }
}`}
          answer={`Violates: Open/Closed Principle (O)\n\nExplanation: Every time marketing launches a new seasonal discount (e.g. 'SUMMER_SALE'), developers must modify the existing getDiscount function, risking regression bugs in black friday calculations.`}
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
            answer="Zero changes are needed in your controller! Your controller depends on an abstract interface (e.g. FileStorageService). You only need to create an S3StorageService provider that implements FileStorageService and update your NestJS Module provider registration."
          />

          <QuickCheck
            question="Scenario 2: Why does NestJS organize code into @Module(), @Controller(), and @Injectable() Service classes instead of writing raw routes like 'app.get('/users', (req, res) => ...)'?"
            answer="Because this modular structure enforces the Single Responsibility Principle (S) and Dependency Inversion (D). Controllers focus exclusively on handling HTTP endpoints, Services focus on business logic, and Modules group cohesive features together."
          />

          <QuickCheck
            question="Scenario 3: An online store has a base ShippingMethod class with calculateCost(). ExpressShipping returns $20, StandardShipping returns $5, and InStorePickup throws an Error: 'Cannot calculate shipping for pickup'. How should you refactor this to satisfy Liskov Substitution (L)?"
            answer="InStorePickup should return $0.00 (free shipping) rather than throwing an exception, or InStorePickup should be separated from delivery-based shipping methods so it doesn't break functions expecting a valid monetary cost."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
