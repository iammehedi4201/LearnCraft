"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 12 — CONCEPT TABLES & HTTP EXCEPTIONS MASTER REFERENCE
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={12} title="Concept Tables & Built-in Exceptions Reference">
      {/* ── 12.1 Built-in Exceptions ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="All Built-in HttpException Classes"
          description="Every standard exception exported from @nestjs/common."
          color="primary"
        />

        <ComparisonTable
          headers={["Status Code", "Exception Class", "HTTP Reason", "When to Use"]}
          rows={[
            ["400", "BadRequestException", "Bad Request", "Validation failure, bad syntax, missing body"],
            ["401", "UnauthorizedException", "Unauthorized", "Missing, expired, or invalid JWT authentication token"],
            ["403", "ForbiddenException", "Forbidden", "Authenticated user lacks permission / insufficient role"],
            ["404", "NotFoundException", "Not Found", "Resource / database record does not exist"],
            ["409", "ConflictException", "Conflict", "Duplicate unique key (e.g. email or username in use)"],
            ["422", "UnprocessableEntityException", "Unprocessable Entity", "Syntax valid but semantic domain rules failed"],
            ["500", "InternalServerErrorException", "Internal Server Error", "Unexpected crash, database failure, unhandled bug"],
            ["503", "ServiceUnavailableException", "Service Unavailable", "External dependency or payment provider down"],
          ]}
        />

        <QuickCheck
          question="What is the difference between a 401 UnauthorizedException and a 403 ForbiddenException?"
          answer="401 means unauthenticated (we don't know who you are; please provide a valid token). 403 means forbidden (we know who you are, but you do not have permission to access this resource)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
