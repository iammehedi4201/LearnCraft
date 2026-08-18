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
// MODULE 4 — BUILDING AN AUTHGUARD (JWT / BEARER)
// ═══════════════════════════════════════════════════════════

export function AuthGuardSection() {
  return (
    <SectionContainer number={4} title="Building a Token-Based AuthGuard">
      {/* ── 4.1 Token Extraction ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Extracting and Verifying Bearer Tokens"
          description="How to validate JWT tokens and attach the authenticated user object to the request."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔑</span> Token Authentication Guard Blueprint
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            A production AuthGuard extracts the Bearer token, validates it, and attaches the payload directly onto <code>request.user</code> so downstream services and decorators can access it:
          </p>
          <EnhancedCodeBlock
            code={`import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Bearer token is missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      // In real apps, verify with jwtService.verify(token)
      const decodedUser = { id: 1, email: 'alice@learncraft.dev', role: 'admin' };
      
      // ⭐ Attach decoded user to the request object:
      request['user'] = decodedUser;
      return true;
    } catch {
      throw new UnauthorizedException('Token is invalid or expired');
    }
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why does an AuthGuard attach decoded token data to request['user']?"
          answer="So that downstream controller methods, services, and custom decorators (like @CurrentUser()) can immediately access the authenticated user profile without re-decoding the token."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
