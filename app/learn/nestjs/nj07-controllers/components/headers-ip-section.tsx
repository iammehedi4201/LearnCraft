"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  WhyBox,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 7 — HEADERS, IP & REQUEST OBJECTS
// ═══════════════════════════════════════════════════════════

export function HeadersIpSection() {
  return (
    <SectionContainer number={7} title="Request Headers, IP & Metadata">
      {/* ── 7.1 Reading Headers and IP ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Reading Headers & Client IP"
          description="Extract authorization tokens, custom headers, and the user's IP address easily."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Headers, Ip } from '@nestjs/common';

@Controller('auth-check')
export class AuthCheckController {

  @Get()
  checkAuth(
    @Headers('authorization') authHeader: string,
    @Headers('user-agent') browser: string,
    @Ip() clientIp: string
  ) {
    return {
      token: authHeader,
      browser,
      ip: clientIp
    };
  }
}`}
          language="typescript"
        />
      </div>

      <Divider />

      {/* ── 7.2 Accessing the Raw Request Object ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Accessing the Raw Express Request (@Req)"
          description="If you ever need the underlying Express request object, use @Req()."
          color="sky"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔌</span> The @Req() Decorator
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            NestJS provides dedicated decorators (<code>@Body()</code>, <code>@Query()</code>, <code>@Headers()</code>) for 99% of tasks. But if you need raw cookies, session data, or custom Express middleware objects, use <code>@Req()</code>:
          </p>
          <EnhancedCodeBlock
            code={`import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('session')
export class SessionController {
  @Get()
  getSession(@Req() request: Request) {
    // Access raw Express request properties:
    return { cookies: request.cookies, host: request.hostname };
  }
}`}
            language="typescript"
          />
        </WhyBox>

        <InfoCallout emoji="⚠️" title="Avoid Using @Res() Manually If Possible!">
          <p className="text-xs text-ds-text-strong leading-relaxed">
            By default, NestJS handles responses automatically (converting return objects to JSON). If you inject <code>@Res() res</code>, you disable NestJS&apos;s automatic response handling and must manually write <code>res.status(200).json(...)</code>. Use <code>@Res({`{ passthrough: true }`})</code> if you just need to set a cookie!
          </p>
        </InfoCallout>

        <QuickCheck
          question="What decorator extracts the client's IP address in a NestJS controller?"
          answer="@Ip() (e.g. check(@Ip() ip: string))"
        />
      </div>
    </SectionContainer>
  );
}
