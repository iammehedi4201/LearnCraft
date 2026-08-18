"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON GUARDS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Custom Guards">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your authorization and guard knowledge into practice! Write your code in the interactive playgrounds below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: RBAC Evaluator ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: RBAC Evaluator Guard</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "guards-ex-01",
              title: "1. Build RBAC Evaluator Guard",
              instructions: `Implement 'canActivateRole(requiredRoles: string[], user?: { role: string })':
1. If requiredRoles is empty or contains "public", return { allowed: true }.
2. If user is missing or user.role is not included in requiredRoles, return { allowed: false, status: 403, message: "Forbidden resource" }.
3. If user.role matches any role in requiredRoles, return { allowed: true }.`,
              starterCode: `function canActivateRole(requiredRoles: string[], user?: { role: string }) {
  // Your code here:
}

console.log("Admin on admin route:", canActivateRole(["admin"], { role: "admin" }));
console.log("User on admin route: ", canActivateRole(["admin"], { role: "user" }));
console.log("Public route (no user):", canActivateRole(["public"]));`,
              solutionCode: `function canActivateRole(requiredRoles: string[], user?: { role: string }) {
  if (!requiredRoles || requiredRoles.length === 0 || requiredRoles.includes("public")) {
    return { allowed: true };
  }
  if (!user || !requiredRoles.includes(user.role)) {
    return { allowed: false, status: 403, message: "Forbidden resource" };
  }
  return { allowed: true };
}

console.log("Admin on admin route:", canActivateRole(["admin"], { role: "admin" }));
console.log("User on admin route: ", canActivateRole(["admin"], { role: "user" }));
console.log("Public route (no user):", canActivateRole(["public"]));`,
              hints: [
                "Check requiredRoles.length === 0 || requiredRoles.includes('public') first.",
                "Check !user || !requiredRoles.includes(user.role) for unauthorized users.",
              ],
              tests: [
                {
                  name: "Allows matching role",
                  code: `const r = canActivateRole(["admin", "manager"], { role: "admin" }); if (!r || !r.allowed) throw new Error("Admin should be allowed");`,
                },
                {
                  name: "Blocks non-matching role",
                  code: `const r = canActivateRole(["admin"], { role: "user" }); if (!r || r.allowed || r.status !== 403) throw new Error("User should be blocked with 403");`,
                },
                {
                  name: "Allows public access without user",
                  code: `const r = canActivateRole(["public"]); if (!r || !r.allowed) throw new Error("Public route should allow access");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Bearer Token Validator ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Bearer Token Auth Guard</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "guards-ex-02",
              title: "2. Build Bearer Auth Guard",
              instructions: `Implement 'verifyBearerHeader(authHeader?: string)':
1. If authHeader is missing or does not start with 'Bearer ', return { valid: false, status: 401, error: "Missing Bearer token" }.
2. Extract the token substring. If token length < 10, return { valid: false, status: 401, error: "Invalid token length" }.
3. Otherwise, return { valid: true, token: token }.`,
              starterCode: `function verifyBearerHeader(authHeader?: string) {
  // Your code here:
}

console.log("Valid token:  ", verifyBearerHeader("Bearer eyJhbGciOiJIUzI1NiJ9"));
console.log("Missing token:", verifyBearerHeader());
console.log("Short token:  ", verifyBearerHeader("Bearer 123"));`,
              solutionCode: `function verifyBearerHeader(authHeader?: string) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { valid: false, status: 401, error: "Missing Bearer token" };
  }
  const token = authHeader.split(" ")[1];
  if (!token || token.length < 10) {
    return { valid: false, status: 401, error: "Invalid token length" };
  }
  return { valid: true, token };
}

console.log("Valid token:  ", verifyBearerHeader("Bearer eyJhbGciOiJIUzI1NiJ9"));
console.log("Missing token:", verifyBearerHeader());
console.log("Short token:  ", verifyBearerHeader("Bearer 123"));`,
              hints: [
                "Check authHeader.startsWith('Bearer ')",
                "Split by space: authHeader.split(' ')[1]",
              ],
              tests: [
                {
                  name: "Extracts valid token",
                  code: `const r = verifyBearerHeader("Bearer 1234567890abc"); if (!r || !r.valid || r.token !== "1234567890abc") throw new Error("Should extract token successfully");`,
                },
                {
                  name: "Rejects invalid header",
                  code: `const r = verifyBearerHeader("Basic abc"); if (!r || r.valid || r.status !== 401) throw new Error("Should reject non-Bearer auth");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
