"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (NESTJS GUARDS)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What is the main architectural difference between Middleware and Guards in NestJS?",
      a: "Middleware is dumb regarding routing context — it does not know which controller or handler method will execute.\n\nGuards have full access to ExecutionContext and can read metadata decorators attached to the controller class or handler method using Reflector.",
    },
    {
      q: "Q2: How do you implement Role-Based Access Control (RBAC) in NestJS?",
      a: "1. Create a custom decorator (e.g. @Roles('admin')) using SetMetadata.\n2. In RolesGuard, inject Reflector and call reflector.getAllAndOverride to retrieve the required roles for the current handler.\n3. Compare the required roles against the authenticated user's role on request.user.\n4. Return true if allowed, or false (throws 403 Forbidden).",
    },
    {
      q: "Q3: How do you implement a 'Secure by Default' strategy using Global Guards?",
      a: "Bind your JwtAuthGuard globally in AppModule using { provide: APP_GUARD, useClass: JwtAuthGuard }.\n\nThen create a custom @Public() decorator. In JwtAuthGuard, check if the route is marked @Public(). If true, bypass token authentication; otherwise, enforce it.",
    },
    {
      q: "Q4: Why does returning false from canActivate() trigger a 403 Forbidden instead of a 401 Unauthorized?",
      a: "NestJS treats returning false as a ForbiddenException (HTTP 403) by default. If you want to indicate that the user is unauthenticated (missing/invalid token), you should explicitly throw new UnauthorizedException() (HTTP 401) inside the guard.",
    },
    {
      q: "Q5: How can a Guard execute asynchronously (e.g. validating permissions against a database)?",
      a: "canActivate() can return a Promise<boolean> or Observable<boolean>. NestJS will automatically await the promise or subscribe to the observable before proceeding to the controller.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on NestJS Guards">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Prepare for senior NestJS technical interviews with these frequently asked authorization questions."
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
