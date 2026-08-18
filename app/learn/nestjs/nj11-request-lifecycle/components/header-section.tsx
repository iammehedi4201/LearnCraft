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
// MODULE 1 — THE BIG PICTURE & AIRPORT ANALOGY
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: The NestJS Request Lifecycle">
      {/* ── 1.1 Why Lifecycle Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What Happens When a Request Reaches NestJS?"
          description="Every incoming HTTP request goes through a strict, predictable assembly line before reaching your controller."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚀</span> Why Understanding the Request Lifecycle Is Crucial
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            In standard Express.js, almost everything is just a generic middleware: <code>app.use((req, res, next) =&gt; ...)</code>.
            Because Express does not distinguish between authentication, validation, error handling, or response transformation, code becomes messy and hard to debug.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            NestJS solves this with a **dedicated 7-step pipeline**. Each tool has one specific job:
            <strong> Middleware</strong>, <strong>Guards</strong>, <strong>Interceptors</strong>, <strong>Pipes</strong>, and <strong>Exception Filters</strong>.
          </p>
        </WhyBox>

        <AnalogyBox title="The International Airport Terminal">
          <p className="mb-2">
            Imagine an incoming HTTP request is a <strong>passenger boarding an international flight</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>1. Airport Entrance &amp; Baggage Drop (Middleware):</strong> Checks basic travel documents, logs arrival, attaches bag tags.
            </li>
            <li>
              <strong>2. Passport Control &amp; Visa Check (Guards):</strong> Decides if the passenger is allowed to enter (Authentication &amp; Authorization). If denied, access stops immediately!
            </li>
            <li>
              <strong>3. Boarding Gate Clock-In (Interceptors - Pre):</strong> Records the exact departure time to measure flight performance.
            </li>
            <li>
              <strong>4. Luggage Scanner &amp; Weight Scale (Pipes):</strong> Validates luggage size and transforms currency or numbers into the correct format.
            </li>
            <li>
              <strong>5. Flight Destination (Controller &amp; Service):</strong> The actual business logic happens here.
            </li>
            <li>
              <strong>6. Baggage Claim &amp; Duty-Free Packaging (Interceptors - Post):</strong> Transforms the return data before sending it to the client.
            </li>
            <li>
              <strong>7. Emergency Medical Services (Exception Filters):</strong> If anything crashes anywhere along the journey, they catch it and return a polite, structured message.
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Rule of Thumb: Middleware runs first, Guards check permissions, Interceptors wrap the handler, Pipes validate params, and Filters catch errors." />

        <QuickCheck
          question="Which component executes FIRST when an HTTP request hits a NestJS application?"
          answer="Middleware executes first (Global middleware, then Module middleware)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
