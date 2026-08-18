"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (RBAC & CASL)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain how Role-Based Access Control (RBAC) is implemented in NestJS.",
      a: "1. Define a strongly typed Role enum.\n2. Create a custom @Roles() metadata decorator using Reflector.createDecorator<Role[]>().\n3. Create a RolesGuard implementing CanActivate that reads metadata with reflector.getAllAndOverride() and checks if req.user.role matches the required roles.\n4. Apply @UseGuards(JwtAuthGuard, RolesGuard) to secure endpoints.",
    },
    {
      q: "Q2: What is the fundamental difference between HTTP 401 and HTTP 403 status codes?",
      a: "401 Unauthorized indicates missing or invalid authentication (the server does not know who you are).\n\n403 Forbidden indicates that the user is authenticated, but their account lacks the required permissions or roles to access the resource.",
    },
    {
      q: "Q3: Why should you use reflector.getAllAndOverride() rather than reflector.get() in RolesGuard?",
      a: "getAllAndOverride() checks the route handler first, and if no metadata is found on the handler, it falls back to check the Controller class. This allows controller-wide role defaults while enabling method-specific overrides.",
    },
    {
      q: "Q4: When should you transition an architecture from RBAC to ABAC (using CASL)?",
      a: "When permissions depend on dynamic resource attributes rather than static job titles (e.g. 'Users can only edit documents where document.ownerId === user.id, but Managers can edit documents in their department').",
    },
    {
      q: "Q5: Why must RolesGuard be applied after JwtAuthGuard?",
      a: "Guards execute sequentially in the order listed inside @UseGuards(). JwtAuthGuard must run first to authenticate the JWT token and populate req.user, so that RolesGuard has access to req.user.role.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on RBAC & Authorization">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on RBAC architecture, CASL, and authorization guards."
          color="amber"
        />

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm transition-all"
            >
              <div
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
                  {item.q}
                </h4>
                <button className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
                  {openIdx === idx ? "Hide" : "Answer"}
                </button>
              </div>

              {openIdx === idx && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                  <strong className="text-ds-text-strong block mb-1">Interview-Winning Answer:</strong>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
