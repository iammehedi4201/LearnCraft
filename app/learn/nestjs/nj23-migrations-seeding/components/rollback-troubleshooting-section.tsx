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
// MODULE 7 — GRACEFUL SHUTDOWN & TEARDOWN HOOKS
// ═══════════════════════════════════════════════════════════

export function RollbackTroubleshootingSection() {
  return (
    <SectionContainer number={7} title="Graceful Shutdown & Teardown Lifecycle Hooks">
      {/* ── 7.1 Teardown Hooks ── */}
      <div className="mb-16">
        <TopicHeader
          number={7}
          title="Cleaning Up In-Memory State on Application Exit"
          description="How OnModuleDestroy and BeforeApplicationShutdown prevent memory leaks and zombie handles."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Enabling Shutdown Hooks in main.ts
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            By default, Node.js terminates processes abruptly on <code>SIGINT</code> or <code>SIGTERM</code>. You must explicitly instruct NestJS to listen for shutdown signals:
          </p>
          <EnhancedCodeBlock
            code={`// src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ CRITICAL: Enables listening for SIGINT and SIGTERM OS signals:
  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();

// In your Repository or Service:
@Injectable()
export class CacheService implements OnModuleDestroy, BeforeApplicationShutdown {
  private timer: NodeJS.Timeout;

  beforeApplicationShutdown(signal?: string): void {
    console.log(\`Received \${signal}. Draining queue before shutdown...\`);
  }

  onModuleDestroy(): void {
    console.log('Clearing periodic intervals and releasing state...');
    clearInterval(this.timer);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always call app.enableShutdownHooks() in main.ts. Without it, OnModuleDestroy and BeforeApplicationShutdown hooks will NOT fire when your app stops." />

        <QuickCheck
          question="What happens if a service starts a setInterval() timer but doesn't clear it in onModuleDestroy()?"
          answer="The active timer handle will keep the Node.js event loop alive, causing the process to hang and fail to shut down cleanly."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
