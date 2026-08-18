"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — PROTECTING ROUTES WITH JWT AUTHGUARD
// ═══════════════════════════════════════════════════════════

export function ProtectingRoutesSection() {
  return (
    <SectionContainer number={9} title="Protecting Endpoints with JwtAuthGuard">
      {/* ── 9.1 Protecting Routes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Locking Routes with JWT Guards"
          description="How AuthGuard('jwt') intercepts and verifies tokens automatically."
          color="primary"
        />

        <EasyRuleCard rule="Apply @UseGuards(JwtAuthGuard) to protect any controller or method. Unauthenticated requests are rejected with 401 Unauthorized." />

        <PredictOutputBox
          code={`// Sample controller endpoint:
@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  @Get('balance')
  getBalance(@CurrentUser() user: UserPayload) {
    return { balance: 500, owner: user.email };
  }
}

// Request A: GET /wallet/balance (No Authorization header)
// Request B: GET /wallet/balance (Header: 'Authorization: Bearer valid.token.here')
// Request C: GET /wallet/balance (Header: 'Authorization: Bearer expired.token')`}
          answer={`Predicted Responses:\n\nRequest A (No Header):\n-> HTTP 401 Unauthorized: { "message": "Unauthorized" }\n\nRequest B (Valid Token):\n-> HTTP 200 OK: { "balance": 500, "owner": "alice@learncraft.dev" }\n\nRequest C (Expired Token):\n-> HTTP 401 Unauthorized: { "message": "Unauthorized" }`}
        />

        <QuickCheck
          question="What HTTP status code does JwtAuthGuard return when an invalid or expired token is sent?"
          answer="401 Unauthorized."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
