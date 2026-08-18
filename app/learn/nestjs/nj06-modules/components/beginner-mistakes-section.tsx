"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER MISTAKES & GOTCHAS
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top Beginner Module Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Mistakes with NestJS Modules"
          description="Recognize and fix these frequent beginner errors."
          color="primary"
        />

        <MistakeBox
          title="Importing a Service Instead of a Module"
          description="In the 'imports: [...]' array of a module, you can ONLY put other Modules, never individual Services!"
          wrong={`@Module({
  // ❌ Wrong: UsersService is a provider, not a module!
  imports: [UsersService],
})
export class AuthModule {}`}
          right={`@Module({
  // ✅ Right: Import the parent UsersModule!
  imports: [UsersModule],
})
export class AuthModule {}`}
        />

        <MistakeBox
          title="Forgetting to Export the Service"
          description="AuthModule imports UsersModule, but UsersService was not added to the exports array in UsersModule."
          wrong={`// In UsersModule:
@Module({
  providers: [UsersService],
  // ❌ Forgot exports: [UsersService]!
  // AuthModule cannot see UsersService!
})`}
          right={`// In UsersModule:
@Module({
  providers: [UsersService],
  // ✅ Export it so other modules can use it:
  exports: [UsersService],
})`}
        />

        <MistakeBox
          title="Putting Controllers in the Providers Array"
          description="Controllers belong in controllers: [...], and Services belong in providers: [...]."
          wrong={`@Module({
  // ❌ Wrong: Controller inside providers!
  providers: [UsersController, UsersService],
})`}
          right={`@Module({
  // ✅ Right: Put controllers in their dedicated array:
  controllers: [UsersController],
  providers: [UsersService],
})`}
        />

        <QuickCheck
          question="Can you put a Service class directly inside the 'imports' array of a @Module()?"
          answer="No! The 'imports' array only accepts other Modules (e.g. imports: [UsersModule]). Services belong in the 'providers' array."
        />
      </div>
    </SectionContainer>
  );
}
