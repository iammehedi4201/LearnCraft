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
// MODULE 3 — FUNCTIONAL MIDDLEWARE
// ═══════════════════════════════════════════════════════════

export function FunctionalMiddlewareSection() {
  return (
    <SectionContainer number={3} title="Lightweight Functional Middleware">
      {/* ── 3.1 Functional Middleware ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Simple Functions as Middleware"
          description="When you don't need Dependency Injection, functional middleware is lightweight and concise."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>⚡</span> Clean Functional Middleware
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If your middleware is stateless and doesn&apos;t inject dependencies, write it as a simple JavaScript function:
          </p>
          <EnhancedCodeBlock
            code={`import { Request, Response, NextFunction } from 'express';

// Simple functional middleware:
export function simpleLogger(req: Request, res: Response, next: NextFunction) {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next();
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="When should you choose functional middleware over class-based middleware?"
          answer="When your middleware does not require any dependencies injected into a constructor and has no complex state, making a pure function simpler and faster."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
