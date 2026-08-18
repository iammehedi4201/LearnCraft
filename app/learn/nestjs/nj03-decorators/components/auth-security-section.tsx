"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  InfoCallout,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 10 — REAL-WORLD PATTERN: AUTHORIZATION & SECURITY
// ═══════════════════════════════════════════════════════════

export function AuthSecuritySection() {
  return (
    <SectionContainer number={10} title="Real-World Pattern: Authorization & Security">
      {/* ── 10.1 Role-Based Access Control Decorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Method-Level Authorization Decorators"
          description="Protecting sensitive API endpoints by checking roles before the method executes is a core pattern in web frameworks."
          color="primary"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Live Role Check Decorator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated logged-in user context
let currentSession = {
  user: "Alice",
  role: "user", // Change to "admin" to grant access!
};

function Authorize(...allowedRoles: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log("🔒 [AUTH CHECK] Checking permissions for " + propertyKey + "...");
      
      if (!currentSession || !currentSession.user) {
        throw new Error("401 Unauthorized: Please log in.");
      }

      if (!allowedRoles.includes(currentSession.role)) {
        throw new Error(
          "403 Forbidden: User '" + currentSession.user +
          "' with role '" + currentSession.role +
          "' does not have permission. Required: " + allowedRoles.join(" or ")
        );
      }

      console.log("🔓 [AUTH GRANTED] User is authorized!");
      return original.apply(this, args);
    };
  };
}

class AdminPanel {
  @Authorize("admin")
  deleteUser(userId: number) {
    console.log("🗑️ User #" + userId + " successfully deleted!");
    return { deleted: true };
  }

  @Authorize("admin", "manager", "user")
  viewProfile() {
    return { name: currentSession.user, role: currentSession.role };
  }
}

const panel = new AdminPanel();

// 1. Regular user viewing profile (allowed):
console.log("Profile:", panel.viewProfile());

// 2. Regular user trying to delete (blocked):
try {
  panel.deleteUser(99);
} catch (e: any) {
  console.log("Blocked:", e.message);
}

// 3. Promote user to admin and retry:
console.log("\\n--- Elevating session to 'admin' ---");
currentSession.role = "admin";
panel.deleteUser(99); // Now succeeds!`}
            height="500px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 10.2 How NestJS Separates Metadata from Guards ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The NestJS Architecture: Metadata vs Guards"
          description="In NestJS, decorators don't execute the auth logic directly. Instead, the decorator only attaches metadata, and a Guard checks it at runtime."
          color="sky"
        />

        <ComparisonTable
          headers={["Component", "Role", "Example"]}
          rows={[
            ["@Roles('admin')", "Declares what roles are required (Stores metadata)", "SetMetadata('roles', ['admin'])"],
            ["RolesGuard (CanActivate)", "Reads metadata and checks incoming request user", "Reflector.get('roles', context.getHandler())"],
            ["@UseGuards(RolesGuard)", "Attaches the guard to the controller or method", "@UseGuards(AuthGuard, RolesGuard)"],
          ]}
        />

        <InfoCallout emoji="🏛️" title="Why Separate Metadata from Guards?">
          <p>
            Separating the metadata declaration (<code>@Roles</code>) from the execution logic (<code>RolesGuard</code>) makes both components completely reusable, testable in isolation, and allows guards to be replaced without touching controller code.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Why does NestJS prefer using Guards over putting auth logic directly inside a method decorator?"
          answer="Guards have full access to the NestJS ExecutionContext (the current HTTP request, response, WebSocket client, RPC message, DI container). Decorators run too early (at compile/definition time) to access individual HTTP request instances."
        />
      </div>
    </SectionContainer>
  );
}
