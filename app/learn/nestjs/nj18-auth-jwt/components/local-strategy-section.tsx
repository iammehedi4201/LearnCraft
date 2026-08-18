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
// MODULE 4 — PASSPORT LOCALSTRATEGY (LOGIN VALIDATION)
// ═══════════════════════════════════════════════════════════

export function LocalStrategySection() {
  return (
    <SectionContainer number={4} title="Passport LocalStrategy (Email & Password Login)">
      {/* ── 4.1 LocalStrategy ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Verifying User Credentials at Login"
          description="How Passport LocalStrategy extracts email & password and validates credentials."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛂</span> The LocalStrategy Class
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install dependencies: <code>npm i @nestjs/passport passport passport-local @types/passport-local</code>.
            The strategy intercepts login requests and passes credentials to <code>validate()</code>:
          </p>
          <EnhancedCodeBlock
            code={`// src/auth/strategies/local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // Configure Passport to use 'email' instead of default 'username':
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    // ⭐ Returned user is automatically attached to req.user by Passport:
    return user;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why do we specify super({ usernameField: 'email' }) in the LocalStrategy constructor?"
          answer="By default, Passport expects a field named 'username'. Passing { usernameField: 'email' } tells Passport to read 'email' from the request body instead."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
