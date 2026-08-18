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
// MODULE 7 — DUAL TOKEN ARCHITECTURE (ACCESS + REFRESH)
// ═══════════════════════════════════════════════════════════

export function RefreshTokenSection() {
  return (
    <SectionContainer number={7} title="Dual Token Architecture (Access & Refresh Tokens)">
      {/* ── 7.1 Access vs Refresh Tokens ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Industry-Standard Dual Token Pattern"
          description="Short-lived Access Tokens (15 min) paired with secure Refresh Tokens (7 days)."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔄</span> Why Use Two Tokens?
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If an Access Token lived for 30 days and was stolen by an attacker, they could impersonate the user for a whole month with no way to revoke access.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            Dual Token Architecture solves this security dilemma:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Access Token (15 minutes):</strong> Used for normal API requests. If stolen, it expires almost immediately.</li>
            <li><strong>Refresh Token (7 days):</strong> Stored securely in a database and sent only to <code>/auth/refresh</code> to generate fresh access tokens.</li>
          </ul>
        </WhyBox>

        <EnhancedCodeBlock
          code={`// In AuthService:
async generateTokens(userId: number, email: string, role: string) {
  const [accessToken, refreshToken] = await Promise.all([
    // 1. Short-lived Access Token (15 mins):
    this.jwtService.signAsync(
      { sub: userId, email, role },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' },
    ),
    // 2. Long-lived Refresh Token (7 days):
    this.jwtService.signAsync(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    ),
  ]);

  // ⭐ Hash and save refresh token to database for revocation support:
  const refreshTokenHash = await PasswordHelper.hashPassword(refreshToken);
  await this.usersService.updateRefreshTokenHash(userId, refreshTokenHash);

  return { accessToken, refreshToken };
}`}
          language="typescript"
        />

        <EasyRuleCard rule="Access Tokens expire fast (15m) for security; Refresh Tokens (7d) let users stay logged in without typing passwords constantly." />

        <QuickCheck
          question="How can an administrator instantly revoke a compromised user's session when using Refresh Tokens?"
          answer="By deleting or nullifying the hashed refresh token stored in the database. When the user's 15-minute access token expires, their refresh attempt will fail, forcing a re-login."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
