"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  SummaryBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE: WHAT IS A CONTROLLER?
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is a Controller?">
      {/* ── 1.1 What is a Controller? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Controller in NestJS?"
          description="A controller is the front door of your application. It receives incoming HTTP requests from users and returns responses."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🚪</span> What does a Controller do?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Whenever someone clicks a button on your website, submits a form, or calls your mobile app API, an HTTP request (like <code>GET /users</code> or <code>POST /orders</code>) is sent to your server.
          </p>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            The Controller&apos;s job is simple:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1 text-xs text-ds-text-sub">
            <li>Listen for the matching URL and HTTP method (GET, POST, PUT, DELETE).</li>
            <li>Extract data from the request (URL params, request body, query strings).</li>
            <li>Call a Service to do the actual business calculations or database queries.</li>
            <li>Send the final JSON answer back to the user.</li>
          </ol>
        </WhyBox>

        <AnalogyBox emoji="🛎️" title="Simple Real-Life Story: The Restaurant Waiter">
          <p>
            When you visit a restaurant, you do <strong>not</strong> walk into the kitchen and cook your own steak!
          </p>
          <p className="mt-2">
            Instead, you speak to the <strong>Waiter (Controller)</strong>. You tell the waiter what you want (Request). The waiter takes your order to the <strong>Chef (Service)</strong> in the kitchen. When the food is ready, the waiter brings the plate back to your table (Response).
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            Controllers are the friendly waiters of your NestJS backend.
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 First Controller Preview ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A First Look at a NestJS Controller"
          description="A controller is a TypeScript class decorated with @Controller()."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: A Live Controller Simulation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Preview of how a Controller handles HTTP requests:

class UsersController {
  // Handles: GET /users
  findAll() {
    return [
      { id: 1, name: "Alice", role: "Admin" },
      { id: 2, name: "Bob", role: "User" }
    ];
  }

  // Handles: GET /users/1
  findOne(id: number) {
    return { id, name: "Alice", email: "alice@learncraft.dev" };
  }
}

const controller = new UsersController();

console.log("GET /users ->", controller.findAll());
console.log("GET /users/1 ->", controller.findOne(1));`}
            height="380px"
          />
        </div>

        <SummaryBox>
          Controllers should stay lightweight. They handle HTTP traffic and delegate all heavy logic and database queries to Services.
        </SummaryBox>

        <QuickCheck
          question="What is the main responsibility of a Controller in NestJS?"
          answer="To receive incoming HTTP requests, extract parameters and data, delegate the work to a Service, and return the response to the client."
        />
      </div>
    </SectionContainer>
  );
}
