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
            ["D", "Provider tokens let high-level code depend on contracts while modules choose concrete implementations."],
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
            starterCode={`type Book = {
  id: number;
  title: string;
  author: string;
};

// 1. [D] Stable contract owned by the use case
interface BookReader {
  findById(id: number): Book | undefined;
}

// 2. [S] One concrete persistence implementation
class InMemoryBookRepository implements BookReader {
  private readonly books: Book[] = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin" }
  ];

  findById(id: number): Book | undefined {
    return this.books.find((book) => book.id === id);
  }
}

// 3. [D] Business logic knows BookReader, not the concrete class
class BooksService {
  constructor(private readonly books: BookReader) {}

  findBook(id: number): Book | undefined {
    return this.books.findById(id);
  }
}

// 4. [S] Controller translates the request into a use-case call
class BooksController {
  constructor(private readonly booksService: BooksService) {}

  getBookRoute(id: number): { status: number; data?: Book } {
    const book = this.booksService.findBook(id);
    if (!book) return { status: 404 };
    return { status: 200, data: book };
  }
}

// Plain TypeScript composition root.
// A NestJS module performs the equivalent provider wiring.
const repository: BookReader = new InMemoryBookRepository();
const service = new BooksService(repository);
const controller = new BooksController(service);

console.log("Response:", controller.getBookRoute(1));`}
            height="440px"
          />
        </div>

        <InfoCallout emoji="🔌" title="Manual Wiring vs NestJS Wiring">
          <p className="text-xs text-ds-text-strong leading-relaxed">
            Calling <code>new</code> in this small composition root is valid TypeScript. In a NestJS app, a module and provider token usually perform that wiring. The SOLID benefit comes from <code>BooksService</code> depending on <code>BookReader</code>, not from avoiding the <code>new</code> keyword everywhere.
          </p>
        </InfoCallout>

        <QuickCheck
          question="Does using NestJS automatically make all your code 100% SOLID?"
          answer="No. NestJS supports and encourages SOLID through its structure, but developers must still design their classes carefully and avoid putting too many jobs into one file."
        />
      </div>
    </SectionContainer>
  );
}
