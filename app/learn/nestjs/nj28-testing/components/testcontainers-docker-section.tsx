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
// MODULE 8 — TESTING PIPES, GUARDS & INTERCEPTORS
// ═══════════════════════════════════════════════════════════

export function TestcontainersDockerSection() {
  return (
    <SectionContainer number={8} title="Testing Request Pipeline: Pipes, Guards &amp; Interceptors">
      {/* ── 8.1 Pipeline Testing ── */}
      <div className="mb-16">
        <TopicHeader
          number={8}
          title="Unit Testing Guards &amp; Pipes with Mock ExecutionContext"
          description="How to test authorization guards, input transformation pipes, and interceptors in total isolation."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Mocking ExecutionContext for AuthGuard
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Guards rely on NestJS's <code>ExecutionContext</code> to inspect incoming requests. Create a mock execution context to test guard decisions in unit tests:
          </p>
          <EnhancedCodeBlock
            code={`import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard Unit Tests', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  function createMockContext(user: any, requiredRoles: string[]): ExecutionContext {
    jest.spyOn(reflector, 'get').mockReturnValue(requiredRoles);

    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;
  }

  it('allows access when user possesses required role', () => {
    const context = createMockContext({ roles: ['ADMIN'] }, ['ADMIN']);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies access when user lacks required role', () => {
    const context = createMockContext({ roles: ['USER'] }, ['ADMIN']);
    expect(guard.canActivate(context)).toBe(false);
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is testing guards with a mock ExecutionContext faster than testing via Supertest HTTP requests?"
          answer="Unit testing the guard directly executes purely in Node.js memory in < 1 millisecond, without spinning up an HTTP server or parsing network headers."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
