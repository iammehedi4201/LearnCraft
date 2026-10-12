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
// MODULE 1 — THE BIG PICTURE (STATE SEEDING & LIFECYCLE HOOKS)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: State Initialization & Lifecycle Hooks">
      {/* ── 1.1 Why Lifecycle Initialization Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Controlling Application Bootstrap in NestJS"
          description="How NestJS lifecycle hooks allow providers to initialize default state, seed mock data, and safely warm caches before handling requests."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌱</span> Why Bootstrap Initialization Matters
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            A backend server is rarely ready to accept client traffic immediately upon instantiation. Before answering HTTP requests, your application frequently needs to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li><strong>Seed Seed/Default Data:</strong> Create default roles (ADMIN, USER), system settings, or initial catalog records if the state is empty.</li>
            <li><strong>Warm In-Memory State:</strong> Pre-load configuration maps, load static catalogs, or initialize cache indices.</li>
            <li><strong>Validate Runtime Prerequisites:</strong> Ensure necessary environment variables or third-party API credentials are verified.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Restaurant Opening Routine">
          <p className="mb-2">
            Think of NestJS Lifecycle Hooks like opening a gourmet restaurant:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Constructor (Instantiation):</strong> The chefs, waitstaff, and manager arrive in the building.
            </li>
            <li>
              <strong>OnModuleInit (Prep &amp; Seeding):</strong> The chefs prep ingredients, light the stoves, and bake fresh bread. No customers are allowed in yet!
            </li>
            <li>
              <strong>OnApplicationBootstrap (Doors Open):</strong> The front doors unlock and the restaurant begins taking customer reservations and orders.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Never perform heavy asynchronous network calls or database seeding in TypeScript constructors. Always use NestJS lifecycle hooks like OnModuleInit." />

        <QuickCheck
          question="Why should asynchronous data seeding NEVER be called inside a service constructor?"
          answer="Constructors in TypeScript/JavaScript cannot be asynchronous (they cannot return Promises). If an async operation fails in a constructor, it causes unhandled rejections and race conditions during DI resolution."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
