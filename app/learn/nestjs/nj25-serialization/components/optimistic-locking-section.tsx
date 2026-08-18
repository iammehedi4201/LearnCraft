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
// MODULE 4 — OPTIMISTIC CONCURRENCY CONTROL (VERSION COUNTERS)
// ═══════════════════════════════════════════════════════════

export function OptimisticLockingSection() {
  return (
    <SectionContainer number={4} title="Optimistic Locking & Concurrency Protection">
      {/* ── 4.1 Optimistic Locking ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Preventing Race Conditions & Double-Booking"
          description="How to prevent two concurrent requests from overwriting each other's data using version counters."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎟️</span> The Concert Ticket Overbooking Dilemma
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Add a <code>version Int @default(0)</code> field to your Prisma schema:
          </p>
          <EnhancedCodeBlock
            code={`// prisma/schema.prisma
model ConcertTicket {
  id        Int     @id @default(autoincrement())
  seat      String
  isBooked  Boolean @default(false)
  version   Int     @default(0) // ⭐ Version counter for optimistic locking
}

// In NestJS BookingService:
async function bookSeat(ticketId: number, currentVersion: number, buyerId: number) {
  // ⭐ Only updates if version has NOT changed since the user loaded the seat:
  const result = await this.prisma.concertTicket.updateMany({
    where: {
      id: ticketId,
      version: currentVersion, // Ensure no one else touched it
      isBooked: false,
    },
    data: {
      isBooked: true,
      version: { increment: 1 }, // Bump version
    },
  });

  if (result.count === 0) {
    throw new ConflictException('Seat was just purchased by another user. Please choose another seat.');
  }

  return { success: true };
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How does optimistic locking prevent double-booking without locking database rows with heavy SELECT FOR UPDATE queries?"
          answer="By including 'version: currentVersion' in the WHERE condition and incrementing the version on update; if another request touched the row first, count will be 0 and the collision is caught."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
