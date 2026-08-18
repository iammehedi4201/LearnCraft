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
// MODULE 5 — PASSPORT JWTSTRATEGY (TOKEN VERIFICATION)
// ═══════════════════════════════════════════════════════════

export function JwtStrategySection() {
  return (
    <SectionContainer number={5} title="Passport JwtStrategy (Bearer Token Verification)">
      {/* ── 5.1 JwtStrategy ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Verifying Bearer Tokens on Protected Routes"
          description="How Passport extracts the Bearer token, verifies the cryptographic signature, and injects payload into req.user."
          color="emerald"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The JwtStrategy Implementation
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install dependencies: <code>npm i passport-jwt @types/passport-jwt</code>.
            The strategy handles token extraction, secret signature verification, and expiration checks automatically:
          </p>
          <EnhancedCodeBlock
            code={`// src/auth/strategies/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number; // User ID (standard JWT 'sub' claim)
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // 1. Extract Bearer token from 'Authorization: Bearer <token>' header:
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Reject expired tokens automatically (HTTP 401):
      ignoreExpiration: false,
      // 3. Verify signature with secret key:
      secretOrKey: process.env.JWT_SECRET || 'super-secret-key-123',
    });
  }

  // ⭐ Passport calls validate() ONLY after the token signature is verified:
  async validate(payload: JwtPayload) {
    if (!payload || !payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    // Returned object is attached to request.user:
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Does the validate() method inside JwtStrategy execute if the client sends an expired token or invalid signature?"
          answer="No. Passport verifies the signature and expiration FIRST. If the token is expired or altered, Passport rejects the request immediately with 401 Unauthorized before validate() is ever called."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
