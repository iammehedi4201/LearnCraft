"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER PIPE MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Pipe Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with NestJS Pipes"
          description="Avoid these common bugs when using built-in or custom pipes."
          color="primary"
        />

        <MistakeBox
          title="Reversing DefaultValuePipe and ParseIntPipe Order"
          description="If ParseIntPipe is placed before DefaultValuePipe, ParseIntPipe runs first on 'undefined' and throws 400 Bad Request!"
          wrong={`// ❌ Wrong Order: ParseIntPipe runs first and fails on undefined:
@Get()
findAll(
  @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
) {}`}
          right={`// ✅ Correct Order: DefaultValuePipe provides default before ParseIntPipe runs:
@Get()
findAll(
  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
) {}`}
        />

        <MistakeBox
          title="Forgetting to Return the Transformed Value"
          description="A custom pipe must explicitly return the transformed or validated value. Forgetting the return statement passes undefined to the controller."
          wrong={`@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: string) {
    value.trim(); // ❌ Forgot return! Controller receives undefined!
  }
}`}
          right={`@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: string) {
    return typeof value === 'string' ? value.trim() : value; // ✅ Returns value
  }
}`}
        />

        <MistakeBox
          title="Throwing Plain Error Instead of HttpException"
          description="Throwing generic JavaScript Error() causes NestJS to return 500 Internal Server Error instead of 400 Bad Request."
          wrong={`// ❌ Returns 500 Internal Server Error:
if (!isValid) {
  throw new Error('Invalid email address');
}`}
          right={`// ✅ Returns 400 Bad Request with clean message:
if (!isValid) {
  throw new BadRequestException('Invalid email address');
}`}
        />

        <QuickCheck
          question="What happens if a custom Pipe forgets to return a value from its transform() method?"
          answer="The controller method parameter will receive undefined."
        />
      </div>
    </SectionContainer>
  );
}
