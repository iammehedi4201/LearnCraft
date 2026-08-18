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
// MODULE 6 — PAYLOAD SANITIZATION & XSS DEFENSE
// ═══════════════════════════════════════════════════════════

export function PayloadSanitizationSection() {
  return (
    <SectionContainer number={6} title="Payload Sanitization & XSS Prevention">
      {/* ── 6.1 XSS Defense ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Sanitizing HTML and Stripping Unknown Properties"
          description="Protect against Cross-Site Scripting (XSS) and Mass Assignment attacks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🧼</span> The 2-Tier Sanitization Strategy
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            <strong>1. Mass Assignment Prevention:</strong> Always configure <code>ValidationPipe</code> with <code>whitelist: true</code> to strip unexpected fields (like <code>isAdmin: true</code>):
          </p>
          <EnhancedCodeBlock
            code={`// src/main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,            // Strips properties not in the DTO
    forbidNonWhitelisted: true,  // Throws 400 if malicious extra fields are sent
    transform: true,            // Automatically transforms types
  }),
);`}
            language="typescript"
          />
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed my-3">
            <strong>2. HTML/Script Tag Sanitization:</strong> Escape or strip raw HTML tags in user-generated content (e.g. comments, bios):
          </p>
          <EnhancedCodeBlock
            code={`import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

export class CreateCommentDto {
  @IsString()
  @Transform(({ value }) => sanitizeHtml(value, { allowedTags: [] })) // ⭐ Strips all <script> and <iframe> tags!
  content: string;
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What security vulnerability occurs when an attacker passes { 'isAdmin': true } in a registration request and the server writes it directly to the database?"
          answer="Mass Assignment (Over-posting) vulnerability, prevented by ValidationPipe({ whitelist: true })."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
