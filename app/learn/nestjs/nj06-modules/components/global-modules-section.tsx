"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — GLOBAL MODULES WITH @Global()
// ═══════════════════════════════════════════════════════════

export function GlobalModulesSection() {
  return (
    <SectionContainer number={5} title="Global Modules with @Global()">
      {/* ── 5.1 What is a Global Module? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Global Module?"
          description="A Global Module makes its services available everywhere in your application without needing to import it in every single feature module."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌐</span> The Problem Global Modules Solve
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            If you have a <code>DatabaseService</code> or <code>ConfigService</code> that 25 different modules need, having to write <code>imports: [DatabaseModule]</code> in all 25 modules gets repetitive.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            By adding <code>@Global()</code> to <code>DatabaseModule</code> and importing it <strong>once</strong> in <code>AppModule</code>, every controller and service in your entire project can inject <code>DatabaseService</code> immediately!
          </p>
        </WhyBox>

        <EnhancedCodeBlock
          code={`import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Global() // ⭐ Makes this module globally available!
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService], // ⭐ Still must export what you want to share!
})
export class DatabaseModule {}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 5.2 Best Practices ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="When Should You Use @Global()?"
          description="Use Global Modules sparingly. Making everything global defeats the purpose of modules!"
          color="sky"
        />

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-ds-success-lighter border border-ds-success-base">
            <h5 className="font-bold text-xs text-ds-success-dark mb-1">✅ Good Use Cases for @Global()</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-strong">
              <li><code>DatabaseModule</code> (DB Connection pool)</li>
              <li><code>ConfigModule</code> (Environment variables)</li>
              <li><code>LoggerModule</code> (App-wide logging)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-ds-error-lighter border border-ds-error-base">
            <h5 className="font-bold text-xs text-ds-error-dark mb-1">❌ Bad Use Cases for @Global()</h5>
            <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-strong">
              <li><code>UsersModule</code> (Domain feature)</li>
              <li><code>OrdersModule</code> (Domain feature)</li>
              <li><code>ProductsModule</code> (Domain feature)</li>
            </ul>
          </div>
        </div>

        <QuickCheck
          question="Where must a @Global() module be imported so that it becomes available across the entire application?"
          answer="In the root AppModule (import it once in AppModule's 'imports: [...]' array, and all other modules can use its exported services without importing it)."
        />
      </div>
    </SectionContainer>
  );
}
