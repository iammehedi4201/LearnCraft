"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  PredictOutputBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — EXCEPTION FILTER HIERARCHY
// ═══════════════════════════════════════════════════════════

export function FilterExecutionOrderSection() {
  return (
    <SectionContainer number={9} title="Exception Filter Execution Hierarchy">
      {/* ── 9.1 Hierarchy ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Most Specific Filter Catches First"
          description="How NestJS resolves which filter handles a thrown exception."
          color="primary"
        />

        <EasyRuleCard rule="Filters execute Inside-Out: Method Filter → Controller Filter → Global Filter (The most specific filter catches the error first)." />

        <PredictOutputBox
          code={`// 1. Global Filter (Catches all HttpExceptions)
// 2. Controller Filter (Catches UserNotFoundException)

@Controller('users')
@UseFilters(UserNotFoundFilter)
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new UserNotFoundException(id); // Which filter catches this?
  }

  @Post()
  create() {
    throw new BadRequestException('Validation failed'); // Which filter catches this?
  }
}`}
          answer={`Predicted Filter Resolution:\n\n1. GET /users/123 (throws UserNotFoundException):\n-> Caught by UserNotFoundFilter (Controller-level) because it specifically matches this exception!\n\n2. POST /users (throws BadRequestException):\n-> UserNotFoundFilter ignores it, so NestJS falls back to Global AllExceptionsFilter!`}
        />

        <QuickCheck
          question="If a method-level filter handles an exception, does the global exception filter also execute?"
          answer="No. The most specific filter consumes the exception and sends the response. Global filters only execute if more specific filters did not catch the error."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
