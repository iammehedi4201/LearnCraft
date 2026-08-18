"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  WhyBox,
  InfoCallout,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — WHITELIST SECURITY & MASS ASSIGNMENT
// ═══════════════════════════════════════════════════════════

export function WhitelistSecuritySection() {
  return (
    <SectionContainer number={6} title="Stripping Malicious Fields (whitelist: true)">
      {/* ── 6.1 The Mass Assignment Vulnerability ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Mass Assignment Vulnerability"
          description="Protect your database from hackers injecting unauthorized fields."
          color="primary"
        />

        <InfoCallout emoji="🚨" title="How Hackers Exploit Unfiltered Payloads">
          <p className="text-xs text-ds-text-strong leading-relaxed mb-2">
            Suppose your signup form only asks for <code>name</code> and <code>email</code>. A malicious user sends this raw JSON:
          </p>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-ds-error-base p-3 rounded-xl font-mono text-xs border border-ds-stroke-soft">
{`{
  "name": "Hacker",
  "email": "hacker@darkweb.org",
  "isAdmin": true,       // ⚠️ MALICIOUS INJECTION!
  "accountBalance": 1000000
}`}
          </pre>
          <p className="text-xs text-ds-text-sub mt-2">
            If your backend saves this object directly, the hacker grants themselves full admin rights!
          </p>
        </InfoCallout>

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The Solution: whitelist: true
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            When <code>whitelist: true</code> is enabled, <code>ValidationPipe</code> automatically strips away any property that does not have a decorator on your DTO class!
          </p>
          <EnhancedCodeBlock
            code={`app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true, // ⭐ Automatically removes unknown fields!
    forbidNonWhitelisted: true, // ⭐ Optional: Rejects request with 400 if extra fields exist!
  }),
);`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always enable 'whitelist: true' on ValidationPipe to protect against mass assignment attacks." />
      </div>

      <Divider />

      {/* ── 6.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="See Whitelisting In Action Live"
          description="Test how unknown properties are automatically filtered out."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Sanitizing Payloads with Whitelisting</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Allowed fields defined on CreateUserDto:
const allowedDtoKeys = ["name", "email", "age"];

function applyWhitelist(payload: Record<string, any>) {
  const sanitized: Record<string, any> = {};

  for (const key of Object.keys(payload)) {
    if (allowedDtoKeys.includes(key)) {
      sanitized[key] = payload[key];
    } else {
      console.log("🛡️ [STRIPPED UNAUTHORIZED FIELD]:", key);
    }
  }

  return sanitized;
}

const hackerPayload = {
  name: "Alice",
  email: "alice@learncraft.dev",
  age: 28,
  isAdmin: true,
  credits: 999999
};

console.log("Raw Payload:      ", hackerPayload);
console.log("Sanitized Payload:", applyWhitelist(hackerPayload));`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="What ValidationPipe option removes any incoming property that does not have a validation decorator on the DTO?"
          answer="'whitelist: true'"
        />
      </div>
    </SectionContainer>
  );
}
