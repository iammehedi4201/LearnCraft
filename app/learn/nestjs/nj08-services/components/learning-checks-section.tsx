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
          title="Spot the Service Bug Puzzles"
          description="Read each code snippet and identify what is missing or wrong."
          color="primary"
        />

        <PredictOutputBox
          code={`export class CartService {
  private items = [];
  addItem(item: any) { this.items.push(item); }
}

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
}`}
          answer={`Bug: CartService is missing the '@Injectable()' decorator!\n\nExplanation: Without @Injectable(), NestJS cannot manage CartService or emit the required TypeScript metadata for constructor injection.`}
        />

        <PredictOutputBox
          code={`@Controller('billing')
export class BillingController {
  @Post('charge')
  charge() {
    const service = new BillingService(); // ❌
    return service.processPayment();
  }
}`}
          answer={`Bug: Manual instantiation with 'new BillingService()' inside the controller method!\n\nExplanation: Instead of calling 'new', BillingService should be injected via the constructor: 'constructor(private readonly billingService: BillingService) {}'.`}
        />
      </div>

      <Divider />

      {/* ── Scenario-Based Quizzes ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Service Design Scenarios"
          description="Test your understanding of services and providers."
          color="sky"
        />

        <div className="space-y-4">
          <QuickCheck
            question="Scenario 1: You have a DiscountsService that calculates black friday coupon codes. Can both ProductsController (showing discounted price on catalog) and OrdersController (applying discount at checkout) share the same DiscountsService?"
            answer="Yes! Because services are singletons by default, both ProductsController and OrdersController will share the same singleton instance of DiscountsService effortlessly."
          />

          <QuickCheck
            question="Scenario 2: When should you use a custom provider with 'useValue' instead of a standard @Injectable() class?"
            answer="When you want to inject a static configuration object (e.g. database credentials, third-party API keys) or inject a mock object during automated unit tests."
          />
        </div>
      </div>
    </SectionContainer>
  );
}
