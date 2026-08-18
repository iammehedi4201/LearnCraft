"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  InfoCallout,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 7 — HOW NESTJS USES SOLID
// ═══════════════════════════════════════════════════════════

export function NestjsSolidSection() {
  return (
    <SectionContainer number={7} title="How NestJS Uses SOLID">
      {/* ── 7.1 Master Table ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The SOLID + NestJS Relationship"
          description="How each principle fits directly into the NestJS framework."
          color="primary"
        />

        <ComparisonTable
          headers={["SOLID Letter", "How NestJS Uses It"]}
          rows={[
            ["S", "Services, controllers, repositories have separate responsibilities."],
            ["O", "Providers and modules make it easier to add new behavior."],
            ["L", "Proper class inheritance and substitutable providers."],
            ["I", "TypeScript interfaces and focused contracts."],
            ["D", "NestJS Dependency Injection."],
          ]}
        />
      </div>

      <Divider />

      {/* ── 7.2 Important Reminder ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="An Important Reminder for Developers"
          description="NestJS encourages and supports SOLID, but you still need to write clean code."
          color="sky"
        />

        <InfoCallout emoji="⚠️" title="NestJS Does Not Guarantee Perfect Code Automatically">
          <p className="text-xs text-ds-text-strong leading-relaxed">
            NestJS <strong>encourages and supports</strong> SOLID through its architecture, but developers can still write bad code. If you put all your database queries directly inside your controllers, or write 2,000-line messy services, your app will still be hard to maintain. NestJS gives you great tools — you have to use them wisely!
          </p>
        </InfoCallout>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple NestJS-Style Flow</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// 1. [S] Database Helper
class BookDatabase {
  getBook(id: number) {
    return { id, title: "Clean Code", author: "Uncle Bob" };
  }
}

// 2. [D] Service receives database via constructor
class BooksService {
  constructor(private db: BookDatabase) {}

  findBook(id: number) {
    return this.db.getBook(id);
  }
}

// 3. [S] Controller handles requests
class BooksController {
  constructor(private booksService: BooksService) {}

  getBookRoute(id: number) {
    const book = this.booksService.findBook(id);
    return { status: 200, data: book };
  }
}

// NestJS connects everything together:
const db = new BookDatabase();
const service = new BooksService(db);
const controller = new BooksController(service);

console.log("Response:", controller.getBookRoute(1));`}
            height="440px"
          />
        </div>

        <QuickCheck
          question="Does using NestJS automatically make all your code 100% SOLID?"
          answer="No. NestJS supports and encourages SOLID through its structure, but developers must still design their classes carefully and avoid putting too many jobs into one file."
        />
      </div>
    </SectionContainer>
  );
}
