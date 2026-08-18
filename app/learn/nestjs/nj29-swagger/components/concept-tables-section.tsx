"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & SWAGGER DECORATORS MATRIX
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables &amp; Swagger Decorators Matrix">
      {/* ── 12.1 Decorators Matrix ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="NestJS Swagger Decorators Reference"
          description="A complete guide to OpenAPI decorators and where to apply them in your application."
          color="primary"
        />

        <ComparisonTable
          headers={["Decorator", "Applied To", "Purpose", "Example Usage"]}
          rows={[
            ["@ApiTags('Name')", "Controller Class", "Groups endpoints under a collapsible section", "@ApiTags('Payments')"],
            ["@ApiOperation({ summary })", "Controller Method", "Short headline and description for endpoint", "@ApiOperation({ summary: 'Create Invoice' })"],
            ["@ApiBearerAuth('name')", "Controller / Method", "Applies JWT lock icon requiring authorization", "@ApiBearerAuth('JWT-auth')"],
            ["@ApiProperty({ example })", "DTO Property", "Defines property type, description, and sample value", "@ApiProperty({ example: 'test@email.com' })"],
            ["@ApiParam({ name })", "Controller Method", "Documents route parameters (e.g. :id)", "@ApiParam({ name: 'id', type: Number })"],
            ["@ApiQuery({ name })", "Controller Method", "Documents URL query parameters (?page=1)", "@ApiQuery({ name: 'page', required: false })"],
            ["@ApiOkResponse({ type })", "Controller Method", "Documents 200 OK return payload type", "@ApiOkResponse({ type: UserDto })"],
          ]}
        />

        <QuickCheck
          question="Which decorator is used to document URL path parameters like '/users/:id' in Swagger?"
          answer="@ApiParam({ name: 'id', description: 'User numeric ID' })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
