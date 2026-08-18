"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (APPLICATION SECURITY HARDENING)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Production Security Hardening">
      {/* ── 1.1 Why Security Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Defending Your API Against Real-World Attacks"
          description="A complete multi-layered defense strategy protecting against DDoS, XSS, clickjacking, and brute-force attacks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> Defense in Depth
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Authentication and authorization only verify identity; they don&apos;t stop attackers from:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>Hammering your <code>/auth/login</code> endpoint with 100,000 password guesses per second (Brute-Force).</li>
            <li>Injecting malicious JavaScript into inputs to steal other users&apos; cookies (Cross-Site Scripting / XSS).</li>
            <li>Embedding your website inside a hidden iframe to trick users into clicking buttons (Clickjacking).</li>
            <li>Flooding your server with millions of requests to crash the API (Denial of Service / DDoS).</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Medieval Fortress with Moats and Portcullis">
          <p className="mb-2">
            Securing a NestJS API is like protecting a <strong>Medieval Fortress</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>The Moat &amp; Drawbridge (Rate-Limiter / Throttler):</strong> Slows down invading armies so only 10 people can cross the bridge per minute, preventing a massive rush.
            </li>
            <li>
              <strong>Reinforced Outer Walls (Helmet Security Headers):</strong> Protects against arrows, catapult stones, and disguised spies (XSS and Clickjacking).
            </li>
            <li>
              <strong>The Guest Whitelist (CORS):</strong> Only allows friendly allied kingdoms (whitelisted frontend domains) to enter the gates.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Never rely on a single line of defense. Combine Helmet headers + CORS whitelist + Throttler rate limits + DTO validation." />

        <QuickCheck
          question="What library sets essential security HTTP headers like Content-Security-Policy and X-Frame-Options in Node.js/NestJS?"
          answer="Helmet (helmet package)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
