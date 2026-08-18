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
// MODULE 6 — TOKEN GENERATION WITH JWTSERVICE
// ═══════════════════════════════════════════════════════════

export function TokenGenerationSection() {
  return (
    <SectionContainer number={6} title="Token Generation with JwtService">
      {/* ── 6.1 JwtService.sign() ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Signing Access Tokens"
          description="How AuthService uses JwtService to generate digitally signed JSON Web Tokens."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔏</span> Signing the Token in AuthService
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Inject <code>JwtService</code> from <code>@nestjs/jwt</code> and sign a payload containing the user ID and role:
          </p>
          <EnhancedCodeBlock
            code={`// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PasswordHelper } from './password-helper';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await PasswordHelper.comparePasswords(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      sub: user.id,     // Standard JWT subject claim
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn: '15m',
    };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why should sensitive information (like password hashes or credit cards) NEVER be put in a JWT payload?"
          answer="Because JWT payloads are only base64-encoded, not encrypted! Anyone who intercepts the token can decode and read the payload data in plain text."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
