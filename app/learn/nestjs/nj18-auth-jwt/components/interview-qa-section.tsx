"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (JWT & PASSPORT)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: Explain the complete Passport JWT authentication lifecycle in NestJS.",
      a: "1. Client logs in with email/password via LocalStrategy.\n2. Server verifies password with bcrypt and signs a JWT containing { sub: user.id, email, role }.\n3. Client includes token in Authorization: Bearer <token> header for future requests.\n4. JwtAuthGuard intercepts the request and invokes JwtStrategy.\n5. Passport verifies token signature and expiration. If valid, validate(payload) is called.\n6. The returned user is attached to request.user.",
    },
    {
      q: "Q2: What is the primary difference between LocalStrategy and JwtStrategy?",
      a: "LocalStrategy handles the initial login by verifying raw credentials (email and password).\n\nJwtStrategy handles subsequent protected requests by verifying the cryptographic signature of the Bearer token without touching the database.",
    },
    {
      q: "Q3: Why is a Dual Token Architecture (Access + Refresh) preferred in production?",
      a: "It minimizes the security blast radius if an access token is leaked (since it expires in 15 minutes), while allowing users to maintain a persistent session for 7+ days via refresh tokens that can be invalidated in the database if revoked.",
    },
    {
      q: "Q4: Does the validate() method inside a JwtStrategy run if the token's signature is forged or expired?",
      a: "No. Passport verifies the cryptographic signature and expiration timestamp before calling validate(). If either check fails, Passport immediately rejects the request with HTTP 401 Unauthorized.",
    },
    {
      q: "Q5: How should passwords be stored in the database in a NestJS application?",
      a: "Passwords must be hashed using bcrypt (or argon2) with at least 10 salt rounds before persisting to the database. Plain text passwords should never be logged or stored.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on JWT & Passport">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Senior-Level Interview Questions"
          description="Master these frequently asked questions on Passport strategies and JWT authentication."
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
