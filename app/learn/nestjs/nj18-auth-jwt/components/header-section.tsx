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
// MODULE 1 — THE BIG PICTURE (AUTHENTICATION WITH JWT)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Authentication (JWT & Passport)">
      {/* ── 1.1 Why JWT & Passport ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is JWT Authentication in NestJS?"
          description="A stateless authentication system where users exchange credentials for cryptographically signed tokens."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔐</span> Stateful Sessions vs Stateless JWTs
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In traditional web apps, the server saves user sessions in server memory. When you scale to 5 servers, users get logged out because server #2 doesn&apos;t know the session saved in server #1!
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            <strong>JSON Web Tokens (JWT)</strong> solve this cleanly:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Login once:</strong> The server verifies your email and password, then creates a digitally signed token.</li>
            <li><strong>Send with every request:</strong> The client stores the token and attaches it in the <code>Authorization: Bearer &lt;token&gt;</code> header.</li>
            <li><strong>Stateless verification:</strong> Any server can instantly verify the token using the secret signature key without looking up the database every single millisecond!</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The 5-Star Hotel Digital Keycard">
          <p className="mb-2">
            Think of JWT authentication like staying at a <strong>Modern Hotel</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>1. Check-in (Login):</strong> You show your passport and reservation at the front desk (Email &amp; Password).
            </li>
            <li>
              <strong>2. Keycard Issued (JWT Token):</strong> The front desk gives you an RFID keycard encoded with your room number and an expiration time (e.g. valid until 11:00 AM tomorrow).
            </li>
            <li>
              <strong>3. Room Access (Protected API Route):</strong> Every time you tap the elevator or unlock your room door, the digital lock verifies the card&apos;s cryptographic signature instantly. It doesn&apos;t call the front desk every time you open the door!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Authenticate with username & password once -> Receive signed JWT token -> Attach Bearer token on future requests." />

        <QuickCheck
          question="Why are JWT tokens called 'stateless'?"
          answer="Because the token payload itself contains the user identity and expiration date signed with a secret key, so servers can verify it without storing session data in server memory."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
