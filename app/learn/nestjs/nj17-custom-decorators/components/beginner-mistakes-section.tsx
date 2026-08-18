"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER CUSTOM DECORATOR MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Custom Decorator Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with Custom Decorators"
          description="Avoid these common errors when defining parameter and composite decorators."
          color="primary"
        />

        <MistakeBox
          title="Performing Async Database Queries in createParamDecorator"
          description="createParamDecorator is designed for synchronous property extraction. Asynchronous lookups belong in Guards, Interceptors, or Services."
          wrong={`// ❌ Anti-pattern: Async DB lookup inside decorator:
export const UserFromDb = createParamDecorator(async (data, ctx) => {
  const id = ctx.switchToHttp().getRequest().user.id;
  return await db.users.findUnique({ where: { id } });
});`}
          right={`// ✅ Correct: Extract user attached by AuthGuard synchronously:
export const CurrentUser = createParamDecorator((data, ctx) => {
  return ctx.switchToHttp().getRequest().user;
});`}
        />

        <MistakeBox
          title="Calling @CurrentUser() on Unprotected Routes"
          description="If a route does not have an AuthGuard, request.user will be undefined."
          wrong={`// ❌ Wrong: No AuthGuard, so user is undefined!
@Get('profile')
getProfile(@CurrentUser() user: UserPayload) {
  return user.email; // Crashes: Cannot read property 'email' of undefined
}`}
          right={`// ✅ Correct: Always protect route with AuthGuard or @Auth():
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: UserPayload) {
  return user.email;
}`}
        />

        <MistakeBox
          title="Forgetting Return Statement in createParamDecorator"
          description="If you forget to return the extracted value, the controller parameter receives undefined."
          wrong={`export const UserAgent = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  req.headers['user-agent']; // ❌ Forgot return!
});`}
          right={`export const UserAgent = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.headers['user-agent'] || 'Unknown'; // ✅ Returns value
});`}
        />

        <QuickCheck
          question="Why should you avoid performing database queries inside a createParamDecorator callback?"
          answer="Because parameter decorators are intended purely for synchronous request data extraction. Database operations belong in Guards, Interceptors, or Services where lifecycle errors can be caught properly."
        />
      </div>
    </SectionContainer>
  );
}
