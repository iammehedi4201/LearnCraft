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
// MODULE 8 — RUNTIME SECRETS (AWS SECRETS MANAGER & VAULT)
// ═══════════════════════════════════════════════════════════

export function RuntimeConfigSecretsSection() {
  return (
    <SectionContainer number={8} title="Runtime Secrets (AWS Secrets Manager &amp; Vault)">
      {/* ── 8.1 Secrets Manager ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Dynamic Cloud Secret Resolution"
          description="Fetch production secrets securely from AWS Secrets Manager or HashiCorp Vault during bootstrap."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Async Custom Config Loaders
          </h4>
          <EnhancedCodeBlock
            code={`// src/config/aws-secrets.loader.ts
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

export async function loadAwsSecrets() {
  if (process.env.NODE_ENV !== 'production') {
    return {}; // Use local .env in development
  }

  const client = new SecretsManagerClient({ region: 'us-east-1' });
  const response = await client.send(
    new GetSecretValueCommand({ SecretId: 'production/api/secrets' }),
  );

  return JSON.parse(response.SecretString || '{}');
}

// In AppModule:
ConfigModule.forRoot({
  load: [loadAwsSecrets], // ⭐ Evaluated asynchronously at boot!
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is fetching production secrets from AWS Secrets Manager safer than storing them in .env files on the server?"
          answer="Because secrets are encrypted at rest, audited, automatically rotated, and never written as plaintext files on the disk."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
