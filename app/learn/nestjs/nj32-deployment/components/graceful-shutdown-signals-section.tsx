"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — GRACEFUL SHUTDOWN & UNIX SIGNALS
// ═══════════════════════════════════════════════════════════

export function GracefulShutdownSignalsSection() {
  return (
    <SectionContainer number={5} title="Graceful Shutdown &amp; Unix Signals">
      {/* ── 5.1 Graceful Shutdown ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Zero Lost Requests During Rolling Deployments"
          description="Handle SIGTERM signals gracefully by draining active HTTP connections before closing database sockets."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛑</span> Enabling Shutdown Hooks in main.ts
          </h4>
          <EnhancedCodeBlock
            code={`// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ CRITICAL FOR KUBERNETES & DOCKER:
  // Listens for system signals (SIGTERM, SIGINT) and triggers OnModuleDestroy hooks:
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

// In PrismaService:
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    // ⭐ Safely finishes active queries and disconnects sockets on SIGTERM:
    await this.$disconnect();
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always call app.enableShutdownHooks() in main.ts. Without it, Docker will forcibly kill your containers with SIGKILL (137), aborting active customer transactions!" />

        <QuickCheck
          question="What happens when a container receives SIGTERM if 'app.enableShutdownHooks()' is enabled?"
          answer="NestJS stops accepting new traffic, finishes in-flight requests, calls onModuleDestroy() on all providers (closing database connections cleanly), and exits code 0."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
