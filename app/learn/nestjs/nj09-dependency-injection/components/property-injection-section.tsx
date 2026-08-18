"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — PROPERTY-BASED INJECTION (@Inject)
// ═══════════════════════════════════════════════════════════

export function PropertyInjectionSection() {
  return (
    <SectionContainer number={4} title="Property-Based Injection with @Inject()">
      {/* ── 4.1 What is Property-Based Injection? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Injecting Directly into Class Properties"
          description="In some situations, you can inject dependencies directly into class fields without a constructor."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from './http.service';

@Injectable()
export class BaseReportingService {
  // ⭐ Property-based injection:
  @Inject(HttpService)
  protected readonly httpService: HttpService;

  sendReport(data: any) {
    return this.httpService.post('/reports', data);
  }
}`}
          language="typescript"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> When should you use Property Injection?
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-2">
            The main use case is <strong>Base Class Inheritance</strong>:
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed">
            If a parent class requires 4 different services, any child class extending it would have to call <code>super(s1, s2, s3, s4)</code> in its constructor. Property injection allows the parent class to receive its dependencies without polluting the child class constructor!
          </p>
        </WhyBox>

        <ComparisonTable
          headers={["Feature", "Constructor Injection", "Property Injection"]}
          rows={[
            ["Syntax", "constructor(private svc: Service)", "@Inject(Service) private svc: Service;"],
            ["Best For", "99% of classes (Standard pattern)", "Base classes with inheritance"],
            ["Requires super() in subclasses?", "Yes", "No"],
          ]}
        />

        <QuickCheck
          question="What is the primary advantage of property-based injection over constructor injection?"
          answer="It simplifies inheritance in base classes by avoiding the need to forward dependencies through 'super()' calls in every child class constructor."
        />
      </div>
    </SectionContainer>
  );
}
