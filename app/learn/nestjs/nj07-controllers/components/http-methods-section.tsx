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
// MODULE 3 — HTTP METHOD DECORATORS
// ═══════════════════════════════════════════════════════════

export function HttpMethodsSection() {
  return (
    <SectionContainer number={3} title="HTTP Method Decorators">
      {/* ── 3.1 The Standard REST Methods ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 5 Core HTTP Method Decorators"
          description="NestJS provides method decorators for every standard HTTP action."
          color="primary"
        />

        <ComparisonTable
          headers={["Decorator", "HTTP Method", "REST Purpose", "Default Status Code"]}
          rows={[
            ["@Get()", "GET", "Fetch / Read data", "200 OK"],
            ["@Post()", "POST", "Create a new resource", "201 Created"],
            ["@Put()", "PUT", "Replace an entire resource", "200 OK"],
            ["@Patch()", "PATCH", "Partially update a resource (e.g. 1 field)", "200 OK"],
            ["@Delete()", "DELETE", "Remove / Delete a resource", "200 OK"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 3.2 A Full RESTful CRUD Controller ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A Complete RESTful CRUD Controller"
          description="Look at how clean and organized a standard CRUD controller looks in NestJS."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {

  @Get() // GET /articles
  findAll() {
    return "Returns all articles";
  }

  @Post() // POST /articles
  create() {
    return "Creates a new article";
  }

  @Put() // PUT /articles
  updateFull() {
    return "Replaces the entire article";
  }

  @Patch() // PATCH /articles
  updatePartial() {
    return "Updates only changed fields";
  }

  @Delete() // DELETE /articles
  remove() {
    return "Deletes the article";
  }
}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: REST Endpoint Dispatcher</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Simulated REST Controller Dispatcher:
class ProductsController {
  findAll() { return { action: "GET", items: ["Keyboard", "Monitor"] }; }
  create(data: any) { return { action: "POST", created: data }; }
  remove(id: number) { return { action: "DELETE", deletedId: id }; }
}

const controller = new ProductsController();

console.log("Fetch all: ", controller.findAll());
console.log("Create new:", controller.create({ name: "Mouse", price: 29.99 }));
console.log("Delete:    ", controller.remove(42));`}
            height="380px"
          />
        </div>

        <QuickCheck
          question="What is the difference between @Put() and @Patch()?"
          answer="@Put() replaces the entire record with a fresh object, while @Patch() updates only specific fields (like changing just the user's bio or password)."
        />
      </div>
    </SectionContainer>
  );
}
