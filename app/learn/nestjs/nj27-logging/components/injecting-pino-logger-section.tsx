"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — INJECTING PINOLOGGER IN SERVICES
// ═══════════════════════════════════════════════════════════

export function InjectingPinoLoggerSection() {
  return (
    <SectionContainer number={6} title="Injecting PinoLogger in NestJS Services">
      {/* ── 6.1 PinoLogger Injection ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Emitting Structured Event Objects"
          description="How to inject PinoLogger and pass key-value context objects for rich log indexing."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> Service Injection Pattern
          </h4>
          <EnhancedCodeBlock
            code={`// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Injectable()
export class OrdersService {
  constructor(
    @InjectPinoLogger(OrdersService.name)
    private readonly logger: PinoLogger,
  ) {}

  async processPayment(orderId: string, amount: number, userId: string) {
    // ⭐ Pass structured telemetry object as FIRST argument, message as SECOND argument:
    this.logger.info(
      { orderId, amount, userId, stage: 'PAYMENT_STARTED' },
      'Processing customer order payment',
    );

    try {
      // payment logic...
      this.logger.info({ orderId, status: 'SUCCESS' }, 'Payment succeeded');
    } catch (error: any) {
      this.logger.error(
        { orderId, error: error.message, stack: error.stack },
        'Payment failed',
      );
      throw error;
    }
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="In Pino, why is the structured object passed as the FIRST argument and the message as the SECOND argument (logger.info(obj, msg))?"
          answer="Because Pino's high-speed serializer optimizes JSON generation by merging the first argument's key-values directly into the root JSON log record."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
