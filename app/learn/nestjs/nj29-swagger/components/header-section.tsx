"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (SWAGGER & OPENAPI)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Swagger &amp; OpenAPI Documentation">
      {/* ── 1.1 Why Swagger ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Living, Interactive API Contracts"
          description="How auto-generated OpenAPI schemas bridge backend engineers, frontend developers, and QA teams."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📖</span> The Dead Documentation Problem
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Manually writing API docs in Notion or Markdown always gets out of sync with code within two weeks: an engineer adds a field to a DTO, forgets to update the wiki, and frontend builds break.
          </p>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            With <strong>@nestjs/swagger</strong>, your TypeScript DTOs and decorators <em>are</em> the documentation. NestJS auto-generates a standardized OpenAPI JSON schema and hosts an interactive Swagger UI website (e.g. <code>http://localhost:3000/api/docs</code>) where anyone can test endpoints live with one click!
          </p>
        </WhyBox>

        <AnalogyBox title="The Interactive Digital Restaurant Menu">
          <p className="mb-2">
            Think of OpenAPI and Swagger like an <strong>Interactive Tablet Menu at a Modern Restaurant</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>OpenAPI Specification:</strong> The kitchen inventory sheet listing exact ingredients, allergies, and prices.
            </li>
            <li>
              <strong>Swagger UI:</strong> The glossy tablet at your table. Customers can tap any dish, customize toppings (request body), enter their table number (Bearer token), and hit &quot;Order Now&quot; (Try it out) to receive real food from the kitchen!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Decorate your DTOs with @ApiProperty() and let @nestjs/swagger automatically generate interactive API docs with zero documentation maintenance lag." />

        <QuickCheck
          question="What is the difference between OpenAPI and Swagger?"
          answer="OpenAPI is the standardized JSON/YAML specification format for REST APIs; Swagger is the suite of open-source tools (like Swagger UI) that renders OpenAPI into interactive web documentation."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
