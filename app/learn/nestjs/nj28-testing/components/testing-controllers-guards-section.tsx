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
// MODULE 5 — TESTING CONTROLLERS & GUARDS
// ═══════════════════════════════════════════════════════════

export function TestingControllersGuardsSection() {
  return (
    <SectionContainer number={5} title="Testing Controllers &amp; Authorization Guards">
      {/* ── 5.1 Guards & Controllers ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Testing HTTP Handlers &amp; CanActivate Logic"
          description="How to mock ExecutionContext and verify role-based security rules in isolation."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Unit Testing a RolesGuard
          </h4>
          <EnhancedCodeBlock
            code={`// src/auth/guards/roles.guard.spec.ts
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);
    const mockContext = {
      getHandler: () => ({}),
      getClass: () => ({}),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should block access if user lacks required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['ADMIN']);
    const mockContext = {
      getHandler: () => ({}),
      getClass: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: { role: 'USER' } }),
      }),
    } as unknown as ExecutionContext;

    expect(guard.canActivate(mockContext)).toBe(false);
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How do you mock ExecutionContext when unit testing custom Guards or Interceptors?"
          answer="By constructing a mock object that mimics the ExecutionContext interface (getHandler, getClass, switchToHttp) and returns a fake request object with test user credentials."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
