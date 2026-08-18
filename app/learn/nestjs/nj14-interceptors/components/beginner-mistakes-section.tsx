"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER INTERCEPTOR MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Interceptor Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with NestJS Interceptors"
          description="Avoid these common bugs when working with RxJS streams and CallHandler."
          color="primary"
        />

        <MistakeBox
          title="Forgetting next.handle() Inside intercept()"
          description="If you forget to invoke or return next.handle(), the controller method is never called and the request hangs forever!"
          wrong={`// ❌ Wrong: Forgot to return next.handle():
intercept(context: ExecutionContext, next: CallHandler) {
  console.log('Logging request...');
  // Request hangs forever!
}`}
          right={`// ✅ Correct: Must return the observable stream from next.handle():
intercept(context: ExecutionContext, next: CallHandler) {
  console.log('Logging request...');
  return next.handle();
}`}
        />

        <MistakeBox
          title="Directly Calling res.json() Instead of Returning Data"
          description="Bypassing the RxJS stream by calling res.json() directly from Express breaks downstream interceptors and filters."
          wrong={`// ❌ Wrong: Calling res.json() breaks NestJS lifecycle:
const res = context.switchToHttp().getResponse();
res.json({ myData: 123 });`}
          right={`// ✅ Correct: Return data through the RxJS stream with map():
return next.handle().pipe(
  map(data => ({ success: true, data }))
);`}
        />

        <MistakeBox
          title="Using Interceptors for Input Validation"
          description="Checking if email contains '@' or password length belongs in Pipes and DTOs, not Interceptors."
          wrong={`// ❌ Wrong: Validating input fields in an Interceptor
const body = context.switchToHttp().getRequest().body;
if (!body.email) throw new BadRequestException();`}
          right={`// ✅ Correct: Use DTO with class-validator:
export class CreateUserDto {
  @IsEmail()
  email: string;
}`}
        />

        <QuickCheck
          question="Why shouldn't you manually call res.json() inside a NestJS Interceptor?"
          answer="Manually calling res.json() bypasses NestJS's reactive stream architecture, breaking subsequent interceptors, exception filters, and serialization hooks."
        />
      </div>
    </SectionContainer>
  );
}
