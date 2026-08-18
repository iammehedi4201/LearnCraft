"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — CUSTOMIZING SWAGGER UI STYLING
// ═══════════════════════════════════════════════════════════

export function CustomizingSwaggerUiSection() {
  return (
    <SectionContainer number={9} title="Customizing Swagger UI Themes &amp; Branding">
      {/* ── 9.1 Swagger UI Custom Options ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="White-Label Branding &amp; Dark Theme Customization"
          description="Inject custom CSS, browser tab titles, and company logos into Swagger UI."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🎨</span> SwaggerCustomOptions Object
          </h4>
          <EnhancedCodeBlock
            code={`// In src/main.ts
SwaggerModule.setup('api/docs', app, document, {
  customSiteTitle: 'LearnCraft Developer Hub',
  customfavIcon: 'https://learncraft.dev/favicon.ico',
  customCss: \`
    .swagger-ui .topbar { background-color: #0f172a; }
    .swagger-ui .topbar img { content: url('https://learncraft.dev/logo.svg'); width: 140px; }
    .swagger-ui .info { margin: 20px 0; }
  \`,
  swaggerOptions: {
    persistAuthorization: true, // ⭐ Keeps JWT token saved across browser page refreshes!
    filter: true,               // Adds search filter bar to quickly locate endpoints
  },
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What does 'persistAuthorization: true' do in Swagger UI options?"
          answer="It saves your entered Bearer token in the browser's localStorage, so you don't have to re-enter your JWT token every time you refresh the Swagger UI tab."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
