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
// MODULE 8 — STATE INTROSPECTION & DIAGNOSTICS ENDPOINTS
// ═══════════════════════════════════════════════════════════

export function PrismaStudioSection() {
  return (
    <SectionContainer number={8} title="Inspecting In-Memory Seed State & Diagnostics">
      {/* ── 8.1 State Diagnostics ── */}
      <div className="mb-16">
        <TopicHeader
          number={8}
          title="Verifying Initialized State via Admin Endpoints"
          description="How to expose development-only diagnostics to inspect repository state, counts, and cache health."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🖥️</span> Development State Introspection
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            When running in-memory or decoupled repository patterns, you can create a lightweight development controller to inspect seeded counts:
          </p>
          <EnhancedCodeBlock
            code={`@Controller('dev/state')
export class DevStateController {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  @Get('summary')
  async getSummary() {
    // Only permit access in non-production environments:
    if (this.configService.get('NODE_ENV') === 'production') {
      throw new ForbiddenException('State inspection disabled in production');
    }

    const allUsers = await this.usersRepo.findAll();
    return {
      status: 'HEALTHY',
      seededUsersCount: allUsers.length,
      sampleUsers: allUsers.slice(0, 3).map(u => ({ id: u.id, email: u.email })),
      timestamp: new Date().toISOString(),
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should dev diagnostics and state inspection endpoints be disabled in production?"
          answer="They can leak sensitive system metrics, memory statistics, and internal user details to unauthorized external callers."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
