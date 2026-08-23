"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  Divider,
  InfoCallout,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 10 — REAL-WORLD PATTERN: AUTHORIZATION & SECURITY
// ═══════════════════════════════════════════════════════════

export function AuthSecuritySection() {
  return (
    <SectionContainer number={12} title="Real-World Pattern: Authorization & Security">
      {/* ── 10.1 Role-Based Access Control Decorator ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Protecting Methods with Role Checks"
          description="In web backends, you often need to block regular users from calling dangerous actions (like deleting users or refunding payments). Decorators let you put a security check right above the method."
          color="primary"
        />

        <AnalogyBox emoji="🛡️" title="The VIP Club Bouncer Analogy">
          <p>
            Think of <code>@Authorize(&apos;admin&apos;)</code> like placing a security guard at a VIP lounge door.
          </p>
          <p className="mt-2">
            Before anyone is allowed through to the lounge (the method), the guard checks their badge. If they don&apos;t have the right role, the guard stops them immediately with <em>&quot;403 Forbidden&quot;</em>!
          </p>
        </AnalogyBox>

        <div className="mb-8 mt-6">
          <SectionHeading>🚀 Try It Yourself: Live Role Check Decorator</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Notice how regular users are blocked from <code>deleteUser</code>, but allowed once elevated to admin:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated logged-in user:
let currentSession = {
  user: "Alice",
  role: "user", // Change to "admin" to grant access!
};

function Authorize(...allowedRoles: string[]) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.log("🔒 [AUTH CHECK] Verifying role for " + propertyKey + "...");
      
      if (!currentSession || !currentSession.user) {
        throw new Error("401 Unauthorized: Please log in first.");
      }

      if (!allowedRoles.includes(currentSession.role)) {
        throw new Error(
          "403 Forbidden: User '" + currentSession.user +
          "' (role: " + currentSession.role +
          ") is NOT allowed to call " + propertyKey +
          ". Allowed roles: " + allowedRoles.join(", ")
        );
      }

      console.log("🔓 [AUTH GRANTED] Access approved for " + currentSession.user);
      return original.apply(this, args);
    };
  };
}

class AdminDashboard {
  @Authorize("admin")
  deleteUser(userId: number) {
    console.log("🗑️ Successfully deleted User #" + userId);
    return { deleted: true };
  }

  @Authorize("admin", "manager", "user")
  viewProfile() {
    return { name: currentSession.user, role: currentSession.role };
  }
}

const dashboard = new AdminDashboard();

// 1. Regular user viewing profile (Allowed):
console.log("Profile:", dashboard.viewProfile());

// 2. Regular user trying to delete (Blocked):
try {
  dashboard.deleteUser(99);
} catch (error: any) {
  console.log("Blocked by Guard:", error.message);
}

// 3. Promote to admin and retry:
console.log("\\n--- Promoting user to admin ---");
currentSession.role = "admin";
dashboard.deleteUser(99); // Now succeeds!`}
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
          description="In NestJS, decorators don't run the security check directly. Instead, the decorator only attaches a tag, and a Guard checks the live HTTP request."
          color="sky"
        />

        <ComparisonTable
          headers={["Component", "What it does", "Example"]}
          rows={[
            ["@Roles('admin')", "Declares required roles (Attaches metadata note)", "SetMetadata('roles', ['admin'])"],
            ["RolesGuard (CanActivate)", "Reads the metadata note and checks incoming HTTP request", "Reflector.get('roles', context.getHandler())"],
            ["@UseGuards(RolesGuard)", "Attaches the guard to the controller or route", "@UseGuards(AuthGuard, RolesGuard)"],
          ]}
        />

        <InfoCallout emoji="🏛️" title="Why Separate Metadata from Guards?">
          <p>
            Separating the metadata sticker (<code>@Roles</code>) from the actual security logic (<code>RolesGuard</code>) keeps your controller code clean, makes testing easy, and allows you to swap your auth system without editing 50 controllers!
          </p>
        </InfoCallout>

        <QuickCheck
          question="Why does NestJS prefer using Guards over putting auth logic directly inside a method decorator?"
          answer="Guards have full access to the NestJS ExecutionContext (the current HTTP request, headers, cookies, user sessions, and Dependency Injection services). Decorators run too early (when the file loads) to see live HTTP requests."
        />
      </div>
    </SectionContainer>
  );
}
