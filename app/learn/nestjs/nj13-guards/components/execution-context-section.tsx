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
// MODULE 3 — DEEP DIVE INTO EXECUTIONCONTEXT
// ═══════════════════════════════════════════════════════════

export function ExecutionContextSection() {
  return (
    <SectionContainer number={3} title="Deep Dive: ExecutionContext & Reflection">
      {/* ── 3.1 ExecutionContext Methods ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Power of ExecutionContext"
          description="Access the HTTP request, target controller class, and handler method."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔍</span> What ExecutionContext Gives You
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            <code>ExecutionContext</code> extends <code>ArgumentsHost</code>, providing runtime reflection capabilities across HTTP, WebSockets, and Microservices:
          </p>
          <EnhancedCodeBlock
            code={`import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class InspectionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // 1. Get the current protocol type ('http', 'ws', or 'rpc')
    const type = context.getType(); 

    // 2. Extract standard Express Request & Response objects:
    const http = context.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();

    // 3. Inspect target Controller Class and Route Handler Function:
    const targetClass = context.getClass();     // e.g. UsersController
    const targetMethod = context.getHandler();  // e.g. deleteUser()

    console.log(\`Invoking \${targetClass.name}.\${targetMethod.name}()\`);
    return true;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What method on ExecutionContext returns the JavaScript function reference of the route handler being called?"
          answer="context.getHandler()."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
