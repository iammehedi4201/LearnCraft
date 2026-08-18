"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  PredictOutputBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — LEARNING CHECKS & QUIZZES
// ═══════════════════════════════════════════════════════════

export function LearningChecksSection() {
  return (
    <SectionContainer number={12} title="Learning Checks & Quizzes">
      {/* ── Spot the Bug Puzzles ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Spot the Module Bug Puzzles"
          description="Read each module definition and spot what is wrong."
          color="primary"
        />

        <PredictOutputBox
          code={`@Module({
  imports: [UsersService], // ❌
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}`}
          answer={`Bug: 'imports: [UsersService]' is invalid!\n\nExplanation: The imports array only accepts other Modules, never individual services. It should be: 'imports: [UsersModule]'.`}
        />

        <PredictOutputBox
          code={`// In ProductsModule:
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

// In OrdersModule:
@Module({
  imports: [ProductsModule],
  providers: [OrdersService], // OrdersService injects ProductsService
})
export class OrdersModule {}`}
          answer={`Bug: ProductsService is NOT in the exports array of ProductsModule!\n\nExplanation: Even though OrdersModule imports ProductsModule, OrdersService cannot use ProductsService because ProductsModule forgot to include 'exports: [ProductsService]'.`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Module Architecture Scenarios"
          description="Test your ability to design modular architectures."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You have an EmailService that sends transactional emails. Both UsersModule (for welcome emails) and OrdersModule (for receipts) need it. How should you structure this?"
            answer="Create a dedicated EmailModule with 'providers: [EmailService]' and 'exports: [EmailService]'. Then import EmailModule into both UsersModule and OrdersModule."
          />

          <QuickCheck
            question="Scenario 2: When is it a good idea to decorate a module with @Global()?"
            answer="When the module provides core utility services (like Database connections, Config loading, or App logging) that are needed by almost every feature module across the entire application."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
