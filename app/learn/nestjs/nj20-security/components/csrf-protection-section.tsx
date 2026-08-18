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
// MODULE 7 — CSRF PROTECTION & SAMESITE COOKIES
// ═══════════════════════════════════════════════════════════

export function CsrfProtectionSection() {
  return (
    <SectionContainer number={7} title="CSRF Protection & SameSite Cookie Security">
      {/* ── 7.1 CSRF ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Defending Against Cross-Site Request Forgery"
          description="How SameSite cookies and CSRF tokens prevent unauthorized commands from third-party websites."
          color="amber"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🍪</span> Cookie Security Settings
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If you store authentication tokens in cookies rather than Authorization headers, configure secure cookie flags:
          </p>
          <EnhancedCodeBlock
            code={`// Setting an authenticated refresh cookie securely:
response.cookie('refreshToken', token, {
  httpOnly: true,                // ⭐ Cannot be accessed by JavaScript (XSS defense)
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  sameSite: 'strict',            // ⭐ Prevents CSRF from third-party sites
  path: '/auth/refresh',         // Sent only to refresh endpoint
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why does setting 'httpOnly: true' on an authentication cookie enhance security?"
          answer="Because it prevents client-side JavaScript (like malicious scripts injected via XSS) from reading the cookie value."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
