"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — JWT BEARER AUTH IN SWAGGER
// ═══════════════════════════════════════════════════════════

export function JwtBearerAuthSwaggerSection() {
  return (
    <SectionContainer number={5} title="JWT Bearer Authentication in Swagger">
      {/* ── 5.1 Bearer Auth ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Testing Protected Routes with the 'Authorize' Lock"
          description="Authenticate once in Swagger UI and automatically attach Bearer tokens to every test request."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Controller &amp; Route Protection Pattern
          </h4>
          <EnhancedCodeBlock
            code={`import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Profile')
@ApiBearerAuth('JWT-auth') // ⭐ Renders the padlock icon in Swagger UI!
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  @Get('me')
  @ApiOkResponse({ description: 'Returns authenticated user profile' })
  @ApiUnauthorizedResponse({ description: 'Missing or expired Bearer token' })
  getProfile(@CurrentUser() user: any) {
    return user;
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Click the green 'Authorize 🔓' button at the top of Swagger UI, paste your JWT token, and Swagger automatically injects 'Authorization: Bearer <token>' on every request." />

        <QuickCheck
          question="Why does @ApiBearerAuth('JWT-auth') need a string parameter?"
          answer="The string must match the security scheme name passed to 'addBearerAuth({}, 'JWT-auth')' in DocumentBuilder inside main.ts."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
