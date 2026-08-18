"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON RBAC)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: RBAC Authorization">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your RBAC authorization knowledge into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Role Matcher ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Role Matcher Logic</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "rbac-ex-01",
              title: "1. Build Role Evaluator",
              instructions: `Implement 'isAuthorized(userRole: string | undefined, requiredRoles: string[])':
1. If requiredRoles is empty or undefined, return true (public).
2. If userRole is missing, return false.
3. Return true if requiredRoles contains userRole, false otherwise.`,
              starterCode: `function isAuthorized(userRole: string | undefined, requiredRoles: string[]): boolean {
  // Your code here:
}

console.log("Admin allowed:   ", isAuthorized("admin", ["admin", "super_admin"]));
console.log("User rejected:   ", isAuthorized("user", ["admin"]));
console.log("Public endpoint: ", isAuthorized(undefined, []));`,
              solutionCode: `function isAuthorized(userRole: string | undefined, requiredRoles: string[]): boolean {
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }
  if (!userRole) {
    return false;
  }
  return requiredRoles.includes(userRole);
}

console.log("Admin allowed:   ", isAuthorized("admin", ["admin", "super_admin"]));
console.log("User rejected:   ", isAuthorized("user", ["admin"]));
console.log("Public endpoint: ", isAuthorized(undefined, []));`,
              hints: [
                "Check !requiredRoles || requiredRoles.length === 0 for public endpoints.",
                "Use requiredRoles.includes(userRole).",
              ],
              tests: [
                {
                  name: "Grants access when role matches",
                  code: `if (!isAuthorized("admin", ["admin", "manager"])) throw new Error("Admin should be authorized");`,
                },
                {
                  name: "Denies access when role does not match",
                  code: `if (isAuthorized("user", ["admin"])) throw new Error("User should be rejected");`,
                },
                {
                  name: "Allows public route with empty required roles",
                  code: `if (!isAuthorized(undefined, [])) throw new Error("Public routes should be allowed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Permission Subset Evaluator ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Granular Permissions Evaluator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "rbac-ex-02",
              title: "2. Build Permission Evaluator",
              instructions: `Implement 'hasAllPermissions(userPerms: string[], requiredPerms: string[])':
1. If requiredPerms is empty, return true.
2. Return true ONLY if userPerms contains EVERY permission in requiredPerms.
3. If userPerms contains wildcard "*", return true immediately.`,
              starterCode: `function hasAllPermissions(userPerms: string[], requiredPerms: string[]): boolean {
  // Your code here:
}

console.log("Has all:  ", hasAllPermissions(["users:read", "users:write"], ["users:read"]));
console.log("Missing:  ", hasAllPermissions(["users:read"], ["users:read", "users:delete"]));
console.log("Wildcard: ", hasAllPermissions(["*"], ["billing:charge", "users:delete"]));`,
              solutionCode: `function hasAllPermissions(userPerms: string[], requiredPerms: string[]): boolean {
  if (!requiredPerms || requiredPerms.length === 0) {
    return true;
  }
  if (userPerms.includes("*")) {
    return true;
  }
  return requiredPerms.every((p) => userPerms.includes(p));
}

console.log("Has all:  ", hasAllPermissions(["users:read", "users:write"], ["users:read"]));
console.log("Missing:  ", hasAllPermissions(["users:read"], ["users:read", "users:delete"]));
console.log("Wildcard: ", hasAllPermissions(["*"], ["billing:charge", "users:delete"]));`,
              hints: [
                "Check userPerms.includes('*') for wildcard superusers.",
                "Use requiredPerms.every((p) => userPerms.includes(p)).",
              ],
              tests: [
                {
                  name: "Evaluates exact permission subset",
                  code: `if (!hasAllPermissions(["a", "b", "c"], ["a", "b"])) throw new Error("Subset should pass");`,
                },
                {
                  name: "Fails when any required permission is missing",
                  code: `if (hasAllPermissions(["a"], ["a", "b"])) throw new Error("Missing perm should fail");`,
                },
                {
                  name: "Allows wildcard permission",
                  code: `if (!hasAllPermissions(["*"], ["billing:refund"])) throw new Error("Wildcard should allow all");`,
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
