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
// MODULE 3 — INTERACTIVE TRANSACTIONS (CALLBACK API)
// ═══════════════════════════════════════════════════════════

export function TransactionsInteractiveSection() {
  return (
    <SectionContainer number={3} title="Interactive Transactions: $transaction(async (tx) => ...)">
      {/* ── 3.1 Interactive Transactions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic Logic with Intermediate Checks"
          description="When step 2 depends on reading the result of step 1 inside an isolated SQL transaction."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏦</span> The Bank Wire Transfer Pattern
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Use the callback transaction function. Always use <code>tx</code> (the transactional client) instead of <code>this.prisma</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BankService {
  constructor(private prisma: PrismaService) {}

  async transferFunds(fromId: number, toId: number, amount: number) {
    return await this.prisma.$transaction(
      async (tx) => {
        // 1. Fetch sender balance with tx client:
        const sender = await tx.account.findUnique({ where: { id: fromId } });
        if (!sender || sender.balance < amount) {
          // ⭐ Throwing an exception instantly aborts and rolls back the entire transaction!
          throw new BadRequestException('Insufficient funds for transfer');
        }

        // 2. Deduct from sender:
        const updatedSender = await tx.account.update({
          where: { id: fromId },
          data: { balance: { decrement: amount } },
        });

        // 3. Deposit to receiver:
        const updatedReceiver = await tx.account.update({
          where: { id: toId },
          data: { balance: { increment: amount } },
        });

        return { from: updatedSender, to: updatedReceiver, amount };
      },
      { maxWait: 5000, timeout: 10000 }, // Configurable timeout
    );
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Inside an interactive $transaction callback, why must you call queries on 'tx' rather than 'this.prisma'?"
          answer="Because 'tx' is bound to the isolated database transaction session; using 'this.prisma' executes outside the transaction block and bypasses atomicity."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
