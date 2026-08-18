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
// MODULE 1 — THE BIG PICTURE: WHAT IS A DTO & VALIDATION?
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is a DTO & Validation?">
      {/* ── 1.1 What is a DTO? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Never Trust Data from the Outside World!"
          description="A DTO (Data Transfer Object) defines how data must look when entering your application over the network."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🛡️</span> The Rule of Web Security: Never Trust Client Input
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            Anyone in the world can send raw HTTP requests to your server with missing fields, negative numbers, strings where numbers are expected, or even malicious fields like <code>{`{ "isAdmin": true }`}</code>.
          </p>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            A DTO acts as a strict contract and security checkpoint that inspects every field before your business logic touches it.
          </p>
        </WhyBox>

        <AnalogyBox emoji="👮" title="Simple Real-Life Story: The Airport Security Checkpoint">
          <p>
            When passengers arrive at an airport, they cannot board the airplane with anything in their pockets unchecked.
          </p>
          <p className="mt-2">
            They must pass through <strong>Airport Security (ValidationPipe &amp; DTO)</strong>. Security checks their passport name (String), ticket validity (Email), and removes prohibited items (Whitelisting).
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            If a passenger fails the check, they are turned away at the gate (400 Bad Request) before ever reaching the plane (Service / Database)!
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 DTO Preview ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A First Look at a NestJS DTO"
          description="See how decorators validate incoming user data."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: DTO Validation Simulation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated DTO validator:
function validateCreateUser(payload: any) {
  const errors: string[] = [];

  if (typeof payload.name !== "string" || payload.name.trim() === "") {
    errors.push("name must be a non-empty string");
  }
  if (typeof payload.email !== "string" || !payload.email.includes("@")) {
    errors.push("email must be a valid email address");
  }
  if (typeof payload.age !== "number" || payload.age < 18) {
    errors.push("age must be a number greater than or equal to 18");
  }

  if (errors.length > 0) {
    return { status: 400, message: "Validation failed", errors };
  }
  return { status: 201, message: "Payload approved!", data: payload };
}

console.log("Valid user:  ", validateCreateUser({ name: "Alice", email: "alice@learncraft.dev", age: 24 }));
console.log("Invalid user:", validateCreateUser({ name: "", email: "not-an-email", age: 14 }));`}
            height="440px"
          />
        </div>

        <SummaryBox>
          NestJS automates this manual validation process completely using <code>class-validator</code> decorators and <code>ValidationPipe</code>!
        </SummaryBox>

        <QuickCheck
          question="What does DTO stand for, and what is its main purpose?"
          answer="DTO stands for Data Transfer Object. Its main purpose is to define the shape and validation rules for data sent over the network in HTTP requests."
        />
      </div>
    </SectionContainer>
  );
}
