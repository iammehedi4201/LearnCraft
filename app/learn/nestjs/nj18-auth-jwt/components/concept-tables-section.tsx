"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & AUTHENTICATION MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Authentication Master Matrix">
      {/* ── 12.1 Auth Strategies ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Passport Strategies Side-by-Side"
          description="Comparison between Local and JWT authentication strategies."
          color="primary"
        />

        <ComparisonTable
          headers={["Feature", "Passport LocalStrategy", "Passport JwtStrategy"]}
          rows={[
            ["Trigger Point", "Initial login (POST /auth/login)", "Every protected endpoint (GET /users/me)"],
            ["Input Data", "Email & Password in request body", "Bearer token in Authorization header"],
            ["Database Access", "Fetches user & compares password hash with bcrypt", "Zero database query (verifies signature in-memory)"],
            ["Outcome", "Issues new JWT token on success", "Attaches validated payload to request.user"],
            ["Security Model", "Vulnerable to brute-force (needs rate-limiting)", "Cryptographically signed with HMAC / RSA"],
          ]}
        />

        <QuickCheck
          question="Why does JwtStrategy scale better than LocalStrategy on high-traffic APIs?"
          answer="Because JwtStrategy verifies signatures purely in CPU memory without making database lookups on every single incoming HTTP request."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
