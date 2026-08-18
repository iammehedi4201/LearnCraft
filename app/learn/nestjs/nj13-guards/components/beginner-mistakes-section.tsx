"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER GUARD MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Guard Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with NestJS Guards"
          description="Avoid these common authorization and dependency injection mistakes."
          color="primary"
        />

        <MistakeBox
          title="Manual Instantiation of Guards Requiring DI"
          description="Instantiating a guard with 'new RolesGuard()' breaks Dependency Injection because NestJS cannot inject Reflector."
          wrong={`// main.ts:
// ❌ Error: RolesGuard expects Reflector in constructor, but none is provided!
app.useGlobalGuards(new RolesGuard());`}
          right={`// app.module.ts:
// ✅ Proper DI registration using APP_GUARD token:
providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
]`}
        />

        <MistakeBox
          title="Running RolesGuard Before AuthGuard"
          description="RolesGuard needs 'request.user' to check roles. If AuthGuard hasn't run yet to decode the token, 'request.user' is undefined!"
          wrong={`// ❌ Wrong: RolesGuard runs first when request.user is undefined!
@UseGuards(RolesGuard, AuthGuard)`}
          right={`// ✅ Correct: AuthGuard runs first, attaching request.user:
@UseGuards(AuthGuard, RolesGuard)`}
        />

        <MistakeBox
          title="Putting Parameter Validation Inside Guards"
          description="Guards are for Authentication & Authorization only. Validating request body format belongs in Pipes."
          wrong={`// ❌ Wrong: Validating body fields in a Guard:
if (!request.body.email.includes('@')) {
  return false;
}`}
          right={`// ✅ Correct: Use a DTO and ValidationPipe:
export class CreateUserDto {
  @IsEmail()
  email: string;
}`}
        />

        <QuickCheck
          question="What is the single responsibility of a Guard versus a Pipe?"
          answer="Guards determine IF a request is allowed to access the route (Authorization). Pipes validate and transform the data inside the request (Payload validation)."
        />
      </div>
    </SectionContainer>
  );
}
