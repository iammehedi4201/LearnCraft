"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — LOG REDACTION (PASSWORDS & TOKENS)
// ═══════════════════════════════════════════════════════════

export function RedactingSensitiveLogsSection() {
  return (
    <SectionContainer number={5} title="Log Redaction (GDPR, PCI-DSS &amp; HIPAA)">
      {/* ── 5.1 Redaction ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Automated Secret &amp; Credential Masking"
          description="Ensure passwords, Bearer tokens, and cookies never appear in plaintext log files."
          color="rose"
        />

        <EnhancedCodeBlock
          code={`LoggerModule.forRoot({
  pinoHttp: {
    // ⭐ Automatically mask sensitive keys before printing to stdout:
    redact: {
      paths: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.passwordConfirmation',
        'req.body.creditCard',
        'req.body.refreshToken',
      ],
      censor: '[REDACTED_SECRET]',
    },
  },
});`}
          language="typescript"
        />

        <PredictOutputBox
          code={`// Inbound POST /auth/login request:
// Headers: { authorization: 'Bearer eyJhbGci...' }
// Body: { email: 'user@test.com', password: 'SuperSecretPassword99!' }`}
          answer={`Predicted Pino Redacted Output:\n{\n  "level": 30,\n  "req": {\n    "headers": {\n      "authorization": "[REDACTED_SECRET]"\n    },\n    "body": {\n      "email": "user@test.com",\n      "password": "[REDACTED_SECRET]"\n    }\n  }\n}\n\nNotice that both the authorization header and raw password were automatically masked!`}
        />

        <QuickCheck
          question="Why is automated log redaction mandatory for production applications?"
          answer="To prevent leaking customer credentials, authorization tokens, or financial numbers into third-party log services, ensuring compliance with GDPR, HIPAA, and PCI-DSS security standards."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
