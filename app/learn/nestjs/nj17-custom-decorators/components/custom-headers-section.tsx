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
// MODULE 7 — UTILITY PARAM DECORATORS (@IP, @USERAGENT)
// ═══════════════════════════════════════════════════════════

export function CustomHeadersSection() {
  return (
    <SectionContainer number={7} title="Utility Param Decorators (@IpAddress, @UserAgent)">
      {/* ── 7.1 Utility Decorators ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Useful Real-World Parameter Decorators"
          description="Build clean decorators for IP address, User-Agent, and Cookie extraction."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛠️</span> 3 High-Utility Decorator Examples
          </h4>
          <EnhancedCodeBlock
            code={`import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 1. IP Address Decorator (handles reverse proxy headers like Cloudflare):
export const IpAddress = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip;
});

// 2. User-Agent Browser String Decorator:
export const UserAgent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers['user-agent'] || 'Unknown';
});

// 3. Cookie Extractor Decorator:
export const Cookie = createParamDecorator((cookieName: string, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return cookieName ? req.cookies?.[cookieName] : req.cookies;
});

// Controller Usage:
@Post('audit')
logAudit(
  @IpAddress() ip: string,
  @UserAgent() browser: string,
  @Cookie('session_id') sessionId: string,
) {
  return { ip, browser, sessionId };
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="How do custom param decorators like @IpAddress() improve API security auditing?"
          answer="They centralize the logic for checking reverse-proxy headers (like x-forwarded-for), ensuring consistent IP address resolution across all routes."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
