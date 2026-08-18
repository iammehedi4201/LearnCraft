"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  AnalogyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — PROVIDER SCOPES (SINGLETON VS REQUEST)
// ═══════════════════════════════════════════════════════════

export function ProviderScopesSection() {
  return (
    <SectionContainer number={6} title="Provider Scopes: Singleton vs Request">
      {/* ── 6.1 The 3 Scopes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How Long Does a Service Instance Live?"
          description="In NestJS, provider scopes control the lifecycle and instantiation of services."
          color="primary"
        />

        <ComparisonTable
          headers={["Scope Name", "How Many Instances?", "When Created?", "Best For"]}
          rows={[
            ["DEFAULT (Singleton)", "1 single instance shared by entire app", "When the server starts", "99% of services (Fastest performance!)"],
            ["REQUEST", "1 new instance per incoming HTTP request", "On every request, destroyed when response ends", "Per-request data (Multi-tenant DB, audit logs)"],
            ["TRANSIENT", "1 unique instance per consumer", "Whenever injected into a new controller or service", "Dedicated, non-shared state instances"],
          ]}
        />

        <AnalogyBox emoji="☕" title="Simple Real-Life Story: The Coffee Maker">
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-strong">
            <li><strong>Singleton (DEFAULT):</strong> The office coffee machine in the kitchen. Everyone shares the same machine. Extremely efficient!</li>
            <li><strong>Request Scope:</strong> Buying a new disposable coffee cup for every customer that enters the store. Good for isolated orders, but more work.</li>
            <li><strong>Transient Scope:</strong> Buying a personal mini-coffee maker for each employee at their desk.</li>
          </ul>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 6.2 Code Example ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How to Configure Provider Scope"
          description="Pass the scope option inside the @Injectable() decorator."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import { Injectable, Scope } from '@nestjs/common';

// Default (Singleton - Recommended for 99% of use cases):
@Injectable()
export class ProductsService {}

// Request Scoped (Created fresh on every HTTP request):
@Injectable({ scope: Scope.REQUEST })
export class MultiTenantService {}

// Transient Scoped (Unique to each consumer):
@Injectable({ scope: Scope.TRANSIENT })
export class UniqueLoggerService {}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Performance Tip: Stick with Default Singleton
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            In Node.js, creating hundreds of new objects on every incoming HTTP request causes garbage collection overhead. Always use the default <strong>Singleton scope</strong> unless you strictly need per-request state!
          </p>
        </WhyBox>

        <QuickCheck
          question="What is the default scope of a service in NestJS?"
          answer="Singleton (Scope.DEFAULT) — one single instance is created when the server boots and shared by all requests."
        />
      </div>
    </SectionContainer>
  );
}
