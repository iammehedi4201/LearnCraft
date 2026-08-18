"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 8 — STATUS CODES & RESPONSE HEADERS
// ═══════════════════════════════════════════════════════════

export function StatusCodesSection() {
  return (
    <SectionContainer number={8} title="Status Codes & Response Headers">
      {/* ── 8.1 Customizing Status Codes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Customizing HTTP Status Codes with @HttpCode()"
          description="By default, POST returns 201 Created, and all other methods return 200 OK. You can change this using @HttpCode()."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Post, Delete, HttpCode, HttpStatus, Header } from '@nestjs/common';

@Controller('cart')
export class CartController {

  // Return 204 No Content for a successful deletion:
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Or @HttpCode(204)
  remove() {
    // Deleted from cart, no body returned
  }

  // Set custom response headers:
  @Post('checkout')
  @Header('Cache-Control', 'no-store')
  @HttpCode(200)
  checkout() {
    return { success: true };
  }
}`}
          language="typescript"
        />

        <div className="mt-8">
          <ComparisonTable
            headers={["Status Code", "HttpStatus Enum", "Meaning", "Typical Use Case"]}
            rows={[
              ["200 OK", "HttpStatus.OK", "Standard success", "GET requests, successful updates"],
              ["201 Created", "HttpStatus.CREATED", "New resource created", "POST requests creating items"],
              ["204 No Content", "HttpStatus.NO_CONTENT", "Success with empty body", "DELETE operations"],
              ["400 Bad Request", "HttpStatus.BAD_REQUEST", "Invalid input data", "Validation errors"],
              ["404 Not Found", "HttpStatus.NOT_FOUND", "Resource does not exist", "Lookup by missing ID"],
            ]}
          />
        </div>
      </div>

      <Divider />

      {/* ── 8.2 Interactive Playground ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Simulating Status Codes Live"
          description="Test how status codes communicate outcome to API callers."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: REST Status Code Simulator</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function mockResponse(method: string, action: string) {
  if (method === "POST") {
    return { statusCode: 201, status: "Created", payload: { id: 101, created: true } };
  }
  if (method === "DELETE") {
    return { statusCode: 204, status: "No Content", payload: null };
  }
  return { statusCode: 200, status: "OK", payload: { data: "Success" } };
}

console.log("POST /users   ->", mockResponse("POST", "create"));
console.log("GET /users    ->", mockResponse("GET", "list"));
console.log("DELETE /users ->", mockResponse("DELETE", "remove"));`}
            height="360px"
          />
        </div>

        <QuickCheck
          question="What decorator is used in NestJS to change the default HTTP status code of a controller method?"
          answer="@HttpCode(HttpStatus.NO_CONTENT) or @HttpCode(204)"
        />
      </div>
    </SectionContainer>
  );
}
