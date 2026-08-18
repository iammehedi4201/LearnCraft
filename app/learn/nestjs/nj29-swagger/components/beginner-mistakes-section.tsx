"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER SWAGGER MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Swagger Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common OpenAPI Documentation Pitfalls"
          description="Avoid these common mistakes that lead to empty Swagger schemas or exposed endpoints."
          color="primary"
        />

        <MistakeBox
          title="Security Scheme Name Mismatch"
          description="If the name passed to @ApiBearerAuth() does not match the name in addBearerAuth(), Swagger will not send the Authorization header."
          wrong={`// ❌ Mismatched names ('bearer' vs 'JWT-auth'):
builder.addBearerAuth({}, 'JWT-auth');
@ApiBearerAuth('bearer')`}
          right={`// ✅ Exactly matching security scheme name:
builder.addBearerAuth({}, 'JWT-auth');
@ApiBearerAuth('JWT-auth')`}
        />

        <MistakeBox
          title="Empty DTO Schemas from Missing Decorators"
          description="Without @ApiProperty() or the CLI plugin enabled, DTO classes render as empty {} objects in Swagger UI."
          wrong={`// ❌ Swagger cannot inspect raw TypeScript properties without metadata:
export class CreateUserDto {
  email: string;
}`}
          right={`// ✅ Explicit @ApiProperty or CLI compiler plugin enabled:
export class CreateUserDto {
  @ApiProperty({ example: 'user@test.com' })
  email: string;
}`}
        />

        <MistakeBox
          title="Leaving Public Swagger UI in Production"
          description="Exposing internal administrative Swagger docs publicly without basic auth or IP restrictions allows attackers to inspect all private endpoints."
          wrong={`// ❌ Exposed unconditionally in production:
SwaggerModule.setup('api/docs', app, document);`}
          right={`// ✅ Only enable in non-production, or protect behind basic auth:
if (process.env.NODE_ENV !== 'production') {
  SwaggerModule.setup('api/docs', app, document);
}`}
        />

        <QuickCheck
          question="Why do DTO classes sometimes appear as empty '{}' objects in Swagger UI?"
          answer="Because TypeScript interfaces and unannotated classes lose type metadata at runtime during JavaScript transpilation unless @ApiProperty() or the Swagger CLI compiler plugin is used."
        />
      </div>
    </SectionContainer>
  );
}
