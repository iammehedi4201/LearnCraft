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
// MODULE 8 — END-TO-END LOGIN & REGISTER FLOWS
// ═══════════════════════════════════════════════════════════

export function LoginRegisterFlowSection() {
  return (
    <SectionContainer number={8} title="End-to-End Login & Register Controller">
      {/* ── 8.1 Controller Implementation ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Complete AuthController Blueprint"
          description="A production controller implementing register, login, refresh, and logout endpoints."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> Complete AuthController
          </h4>
          <EnhancedCodeBlock
            code={`// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. User Registration:
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  // 2. User Login (Protected by Passport LocalStrategy):
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // req.user is populated by LocalStrategy!
    return await this.authService.login(req.user);
  }

  // 3. Token Refresh:
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return await this.authService.refreshToken(dto.refreshToken);
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is @HttpCode(HttpStatus.OK) used on the login endpoint?"
          answer="By default, NestJS POST endpoints return HTTP 201 Created. Using @HttpCode(HttpStatus.OK) overrides it to return standard HTTP 200 OK for logins and token refreshes."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
