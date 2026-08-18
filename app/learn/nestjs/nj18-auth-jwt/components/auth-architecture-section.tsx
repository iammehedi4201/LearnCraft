"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 2 — THE 3 AUTHENTICATION ARCHITECTURE PILLARS
// ═══════════════════════════════════════════════════════════

export function AuthArchitectureSection() {
  return (
    <SectionContainer number={2} title="The 3 Authentication Architecture Pillars">
      {/* ── 2.1 The 3 Modules ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How NestJS Structures Authentication"
          description="A clean division of responsibilities across UsersModule, AuthModule, and JwtModule."
          color="sky"
        />

        <ComparisonTable
          headers={["Module Pillar", "Primary Mission", "Exports / Provides"]}
          rows={[
            ["UsersModule", "Database user CRUD operations", "UsersService (findByEmail, create)"],
            ["AuthModule", "Credential validation, login coordination, Passport strategies", "AuthService, LocalStrategy, JwtStrategy"],
            ["JwtModule (@nestjs/jwt)", "Cryptographic token signing and payload decoding", "JwtService (sign, verify)"],
          ]}
        />

        <EnhancedCodeBlock
          code={`// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, // 1. Access user database service
    PassportModule, // 2. Passport authentication framework
    JwtModule.register({ // 3. Configure JWT token signing
      secret: process.env.JWT_SECRET || 'super-secret-key-123',
      signOptions: { expiresIn: '15m' }, // 15-minute access token lifespan
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}`}
          language="typescript"
        />

        <QuickCheck
          question="Why is UsersModule kept separate from AuthModule in a production NestJS application?"
          answer="To follow the Single Responsibility Principle: UsersModule manages user database storage, while AuthModule handles authentication credentials, token generation, and Passport strategies."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
