"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 4 — SHARING SERVICES BETWEEN MODULES
// ═══════════════════════════════════════════════════════════

export function SharingServicesSection() {
  return (
    <SectionContainer number={4} title="Sharing Services Between Modules">
      {/* ── 4.1 Step by Step Sharing ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="How to Share a Service (The 4 Steps)"
          description="When AuthModule needs to verify a user, it must borrow UsersService from UsersModule."
          color="primary"
        />

        <StepList
          steps={[
            {
              label: "UsersModule declares the service in providers",
              note: "Tells NestJS that UsersService is created here.",
              code: "providers: [UsersService]",
            },
            {
              label: "UsersModule adds the service to exports",
              note: "Opens the service so other modules are allowed to use it.",
              code: "exports: [UsersService]",
            },
            {
              label: "AuthModule adds UsersModule to imports",
              note: "Tells NestJS that AuthModule wants to borrow tools from UsersModule.",
              code: "imports: [UsersModule]",
            },
            {
              label: "AuthService injects UsersService in its constructor",
              note: "NestJS automatically injects the exported instance!",
              code: "constructor(private usersService: UsersService) {}",
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── 4.2 Complete Code Walkthrough ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Complete Code: UsersModule + AuthModule"
          description="Look at how clean and organized this cross-module communication is."
          color="sky"
        />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-feature-dark mb-2 text-sm">
              1. src/users/users.module.ts
            </h5>
            <EnhancedCodeBlock
              code={`@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // ⭐ EXPORT so other modules can use it:
  exports: [UsersService],
})
export class UsersModule {}`}
              language="typescript"
            />
          </div>

          <div className="p-5 bg-ds-bg-weak rounded-2xl border border-ds-stroke-soft">
            <h5 className="font-bold text-ds-info-dark mb-2 text-sm">
              2. src/auth/auth.module.ts
            </h5>
            <EnhancedCodeBlock
              code={`@Module({
  // ⭐ IMPORT UsersModule to get its exports:
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}`}
              language="typescript"
            />
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Cross-Module Dependency Injection</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── Module A: Users ───
class UsersService {
  private users = [
    { email: "user@learncraft.dev", passwordHash: "secret123" }
  ];

  findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}

// ─── Module B: Auth ───
class AuthService {
  // Receives exported UsersService:
  constructor(private usersService: UsersService) {}

  login(email: string, pass: string): string {
    const user = this.usersService.findByEmail(email);
    if (user && user.passwordHash === pass) {
      return "✅ Login successful! Token: jwt_abc_123";
    }
    return "❌ Invalid credentials!";
  }
}

// Simulated NestJS Dependency Injection:
const usersService = new UsersService();
const authService = new AuthService(usersService);

console.log(authService.login("user@learncraft.dev", "secret123"));
console.log(authService.login("user@learncraft.dev", "wrongpass"));`}
            height="460px"
          />
        </div>

        <QuickCheck
          question="What happens if AuthModule imports UsersModule, but UsersModule forgot to list UsersService in 'exports: []'?"
          answer="NestJS will throw an error: 'Nest can't resolve dependencies of the AuthService. Please make sure that the argument UsersService at index [0] is available in the AuthModule context (did you export it from UsersModule?)'."
        />
      </div>
    </SectionContainer>
  );
}
