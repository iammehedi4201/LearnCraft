"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — OPTIONAL DEPENDENCIES (@Optional)
// ═══════════════════════════════════════════════════════════

export function OptionalDependenciesSection() {
  return (
    <SectionContainer number={9} title="Optional Dependencies with @Optional()">
      {/* ── 9.1 What is @Optional()? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Graceful Fallbacks with @Optional()"
          description="Tell NestJS: 'If this service isn't registered, pass undefined instead of crashing!'"
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Injectable, Optional, Inject } from '@nestjs/common';
import { CacheService } from './cache.service';

@Injectable()
export class ProductsService {
  constructor(
    // ⭐ If CacheService is not provided, 'cache' will be undefined instead of crashing:
    @Optional() private readonly cache?: CacheService,
  ) {}

  getProduct(id: string) {
    if (this.cache) {
      console.log("⚡ Checking cache first...");
    }
    return { id, name: "Phone" };
  }
}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> When is @Optional() useful?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed">
            It is extremely useful when building <strong>reusable libraries, plugins, or optional cache/metrics integrations</strong> where consumers may or may not provide the optional service.
          </p>
        </WhyBox>

        <EasyRuleCard rule="Use @Optional() when a dependency is nice-to-have, but the class can still function without it." />

        <QuickCheck
          question="What happens if a constructor parameter has @Optional() and NestJS cannot find a matching provider?"
          answer="NestJS injects 'undefined' into that parameter without throwing an error, allowing the class to fall back to a default behavior."
        />
      </div>
    </SectionContainer>
  );
}
