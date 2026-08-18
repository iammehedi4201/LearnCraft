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
// MODULE 3 — CONSTRUCTOR INJECTION
// ═══════════════════════════════════════════════════════════

export function ConstructorInjectionSection() {
  return (
    <SectionContainer number={3} title="Constructor Injection (Standard Pattern)">
      {/* ── 3.1 Constructor Injection ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Standard Way to Inject Dependencies"
          description="Constructor injection is the primary and recommended injection method in NestJS."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { EmailService } from './email.service';

@Controller('users')
export class UsersController {
  // ⭐ Inject multiple dependencies easily:
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  findAll() {
    this.emailService.sendAdminAlert("Users listed!");
    return this.usersService.findAll();
  }
}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⭐</span> Why Constructor Injection is the Gold Standard
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Explicit:</strong> All dependencies are visible at a glance at the top of the file.</li>
            <li><strong>Immutable:</strong> Marking properties with <code>readonly</code> prevents accidental reassignment.</li>
            <li><strong>Test-Friendly:</strong> In unit tests, you can easily pass mock objects directly into <code>new UsersController(mockUserSvc, mockEmailSvc)</code>!</li>
          </ul>
        </WhyBox>
      </div>

      <Divider />

      {/* ── 3.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Live Multi-Service Constructor Injection"
          description="See how multiple services work seamlessly together."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Multi-Service Constructor Injection</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class AuditService {
  log(action: string) { console.log("📝 [AUDIT]: " + action); }
}

class PaymentService {
  charge(amount: number) { console.log("💳 [CHARGED]: $" + amount); }
}

class StoreController {
  constructor(
    private readonly audit: AuditService,
    private readonly payment: PaymentService
  ) {}

  buy(item: string, price: number) {
    this.payment.charge(price);
    this.audit.log("Bought " + item + " for $" + price);
    return { success: true, item };
  }
}

const audit = new AuditService();
const payment = new PaymentService();
const store = new StoreController(audit, payment);

store.buy("Laptop", 1200);`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="Why is constructor injection the most recommended pattern in NestJS?"
          answer="It makes dependencies explicit, allows making references 'readonly', and makes unit testing effortless by allowing mock services to be passed into the constructor."
        />
      </div>
    </SectionContainer>
  );
}
