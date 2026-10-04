"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — DOMAIN LIFECYCLE & CASCADING INVARIANTS
// ═══════════════════════════════════════════════════════════

export function ReferentialActionsSection() {
  return (
    <SectionContainer number={6} title="Domain Invariants & Cascading Lifecycle Rules">
      {/* ── 6.1 Domain Lifecycle Actions ── */}
      <div className="mb-16">
        <TopicHeader
          number={6}
          title="Protecting Business Rules on Parent Entity Removal"
          description="How NestJS domain services enforce business restrictions before allowing entity deletion."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly ordersRepo: OrdersRepository,
    private readonly auditRepo: AuditRepository,
  ) {}

  async deleteUser(userId: string): Promise<void> {
    const user = await this.usersRepo.findById(userId);
    if (!user) {
      throw new NotFoundException(\`User \${userId} not found\`);
    }

    // ⭐ 1. Restrict deletion if active business operations exist:
    const activeOrders = await this.ordersRepo.findActiveByUserId(userId);
    if (activeOrders.length > 0) {
      throw new BadRequestException("Cannot delete user with active in-flight orders");
    }

    // ⭐ 2. Cascade soft-deletion or cleanup on child entities:
    await this.ordersRepo.archiveHistoricalOrders(userId);

    // ⭐ 3. Remove user & record audit trail
    await this.usersRepo.delete(userId);
    await this.auditRepo.record("USER_DELETED", { userId });
  }
}`}
          language="typescript"
        />

        <ComparisonTable
          headers={["Lifecycle Strategy", "Domain Behavior", "Ideal Use Case"]}
          rows={[
            ["Cascading Delete", "Child entities are pruned along with the parent aggregate", "User temporary session tokens, draft notes"],
            ["Restrict Deletion", "Rejects deletion if any active dependent entities exist", "Accounts with positive balances, products in cart"],
            ["Soft Deletion", "Sets 'isArchived: true' or 'deletedAt: Date' without dropping data", "Customer accounts, invoices, compliance records"],
            ["Orphan Reassignment", "Transfers child entities to a system default administrator", "Department tickets when a manager leaves"],
          ]}
        />

        <EasyRuleCard rule="In clean architecture, business constraints (like preventing deletion when active orders exist) belong in NestJS domain services, not just as raw database triggers." />

        <QuickCheck
          question="Why should critical deletion checks be performed in NestJS domain services rather than relying solely on database foreign keys?"
          answer="Domain services can return clear HTTP exception messages (e.g. 400 Bad Request with a clear reason), invoke audit loggers, and verify higher-level business rules before touching storage."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
