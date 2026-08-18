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
// MODULE 1 — THE BIG PICTURE (NESTJS MIDDLEWARE)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: NestJS Middleware">
      {/* ── 1.1 Why Middleware Exists ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is Middleware in NestJS?"
          description="A function that is called before the route handler, with access to raw request and response objects."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚪</span> The Entry Point of the Request Pipeline
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            NestJS middleware is equivalent to Express middleware. It is the very first code that runs when an HTTP request reaches your server, before Guards, Pipes, or Interceptors even start!
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed mb-3">
            Middleware functions can:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub">
            <li>Execute arbitrary code (e.g. logging incoming IP address, start timestamps).</li>
            <li>Mutate the raw <code>req</code> and <code>res</code> objects (e.g. attaching correlation IDs, parsing cookies).</li>
            <li>End the request-response cycle prematurely (e.g. rate-limiting, IP blocking).</li>
            <li>Call <code>next()</code> to pass control to the next middleware in line.</li>
          </ul>
        </WhyBox>

        <AnalogyBox title="The Highway Toll Plaza &amp; License Plate Camera">
          <p className="mb-2">
            Think of Middleware like an <strong>Expressway Toll Booth &amp; Security Camera</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Before Entering the City:</strong> The camera scans the car&apos;s license plate, tags a toll ticket (attaches a correlation ID to <code>req</code>), and logs the entry time.
            </li>
            <li>
              <strong>Opening the Gate (next()):</strong> Once scanned, the barrier raises and the car drives forward toward the city gates (Guards and Controllers).
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Middleware is for low-level protocol tasks (CORS, cookies, request ID tagging, raw logging). It is unaware of which controller method will handle the request." />

        <QuickCheck
          question="What happens if a Middleware function does not call next() and does not send a response?"
          answer="The request hangs indefinitely and the client will eventually experience an HTTP gateway timeout."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
