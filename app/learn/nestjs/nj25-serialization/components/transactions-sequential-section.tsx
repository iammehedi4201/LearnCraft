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
// MODULE 2 — SEQUENTIAL ARRAY TRANSACTIONS
// ═══════════════════════════════════════════════════════════

export function TransactionsSequentialSection() {
  return (
    <SectionContainer number={2} title="Sequential Transactions: prisma.$transaction([])">
      {/* ── 2.1 Array Transactions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Array-Based Transaction API"
          description="Pass an array of Prisma promises to execute them in a single SQL transaction block."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Batch Atomic Execution
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Pass an array of Prisma operations without <code>await</code> inside the array:
          </p>
          <EnhancedCodeBlock
            code={`// Updating user status AND writing an audit log in one atomic transaction:
async function deactivateUser(userId: number, adminId: number) {
  const [updatedUser, logEntry] = await this.prisma.$transaction([
    // Step 1: Update user record
    this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    }),

    // Step 2: Record audit trail
    this.prisma.auditLog.create({
      data: {
        action: 'DEACTIVATE_USER',
        targetUserId: userId,
        performedBy: adminId,
      },
    }),
  ]);

  return updatedUser;
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Notice why there are NO 'await' keywords inside the $transaction array in the code above?"
          answer="Because Prisma needs the unresolved promises to construct the SQL transaction block; the single outer 'await this.prisma.$transaction([...])' executes them all atomically together."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
