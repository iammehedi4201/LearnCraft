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
// MODULE 9 — GUARD CHAINING & SHORT-CIRCUITING
// ═══════════════════════════════════════════════════════════

export function GuardChainingSection() {
  return (
    <SectionContainer number={9} title="Guard Chaining & Short-Circuiting">
      {/* ── 9.1 Sequential Execution ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Multiple Guards on a Single Route"
          description="How multiple guards execute sequentially from left to right."
          color="primary"
        />

        <EasyRuleCard rule="Guards execute Left-to-Right. If Guard 1 returns false or throws, Guard 2 NEVER runs." />

        <PredictOutputBox
          code={`@Injectable()
export class GuardA implements CanActivate {
  canActivate() {
    console.log("1. Guard A checked");
    return false; // Blocks access!
  }
}

@Injectable()
export class GuardB implements CanActivate {
  canActivate() {
    console.log("2. Guard B checked");
    return true;
  }
}

@Controller('billing')
export class BillingController {
  @Get()
  @UseGuards(GuardA, GuardB)
  getInvoices() {
    console.log("3. Controller handler executed");
    return [];
  }
}`}
          answer={`Predicted Console Logs:\n"1. Guard A checked"\n\nExplanation:\nBecause GuardA returned false, NestJS immediately halted execution with HTTP 403 Forbidden. GuardB and the getInvoices() handler method were completely skipped!`}
        />

        <QuickCheck
          question="If @UseGuards(AuthGuard, RolesGuard) is used on a controller, will RolesGuard execute if AuthGuard throws an UnauthorizedException?"
          answer="No. Execution stops immediately when AuthGuard throws, preventing RolesGuard from running."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
