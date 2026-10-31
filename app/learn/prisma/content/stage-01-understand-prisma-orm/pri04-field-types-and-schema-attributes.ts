import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri04FieldTypesAndSchemaAttributesContent: StandardLessonContent = {
  slug: "pri04-field-types-and-schema-attributes",
  code: "PRI-04",
  title: "Field Types and Schema Attributes",
  subtitle: "Use scalar types, optional fields, defaults, and attributes to model precise database columns.",
  difficulty: "Moderate",
  scenario: {
    question: "A product may not have details when it is first added. How can the Prisma schema allow a missing description without failing?",
    answer: "Make the field optional with `String?`. Then the value can be text or `null`.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Field Types and Schema Attributes",
    bigPicture: "Prisma supports common field types such as `String`, `Int`, `Boolean`, `DateTime`, and `Decimal`. You can make a field optional by adding `?` after its type.\n\nAttributes such as `@default()` provide initial values when a record is created. Optional fields allow `null` values for missing information.",
    codeSnippet: "model Product {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String?\n  price       Decimal\n  inStock     Boolean  @default(true)\n  createdAt   DateTime @default(now())\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. String vs String?",
                "desc": "String requires text; String? allows optional text or null."
          },
          {
                "title": "2. price Decimal",
                "desc": "Decimal is ideal for money because it avoids rounding issues common to floating-point numbers."
          },
          {
                "title": "3. inStock Boolean @default(true)",
                "desc": "Boolean stores true or false; @default(true) sets inStock to true if no value is provided."
          },
          {
                "title": "4. createdAt DateTime @default(now())",
                "desc": "DateTime stores timestamps; @default(now()) sets the creation time automatically."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Choosing the correct data type prevents bugs, data corruption, and precision losses.",
    rule: {
      title: "Exact Types & Optionality Rule",
      content: "Fields without '?' are NOT NULL in SQL and required in TypeScript. Fields with '?' are nullable in SQL and allow undefined or null in TypeScript.",
    },
    cards: [
          {
                "number": "01",
                "tag": "OPTIONAL FIELDS",
                "title": "Nullable with '?'",
                "description": "Adding '?' makes a field nullable in the database and optional in TypeScript input objects.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "EXACT DECIMALS",
                "title": "Decimal for Money",
                "description": "Float can suffer from IEEE-754 precision rounding errors. Always use Decimal for currency and prices.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "BOOLEAN DEFAULTS",
                "title": "Sensible Defaults",
                "description": "@default(true) or @default(false) ensures fields always have a valid state without requiring manual assignment.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Selecting scalar types for ecommerce products:",
    points: [
          {
                "title": "Why Decimal Beats Float for Currency",
                "content": "In JavaScript and SQL, Float (0.1 + 0.2 = 0.30000000000000004) can cause fractional cent discrepancies. Prisma Decimal maps to exact PostgreSQL NUMERIC.",
                "codeSnippet": "// Good: exact financial decimal\nprice Decimal @db.Decimal(10, 2)\n\n// In application code:\n// Uses Decimal.js under the hood for exact math"
          },
          {
                "title": "Timestamp Tracking with @updatedAt",
                "content": "Prisma provides @updatedAt, an attribute that automatically updates a DateTime field whenever a record is modified."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using Float instead of Decimal for financial amounts.",
    badApproach: {
      title: "Using Float for Prices",
      code: "// Flawed: Float values lead to rounding inaccuracies\nmodel Invoice {\n  id     Int   @id @default(autoincrement())\n  amount Float // Danger: floating-point rounding errors!\n}",
      flaw: "Summing Float amounts can result in values like 19.990000000000002, failing exact financial audits.",
    },
    betterApproach: {
      title: "Using Decimal for Money",
      code: "model Invoice {\n  id     Int     @id @default(autoincrement())\n  amount Decimal @db.Decimal(12, 2)\n}",
      benefit: "Guarantees exact two-decimal precision for accounting and payments.",
    },
    whyItMatters: "Financial applications require exact mathematical precision that Float cannot guarantee.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with Prisma scalar types:",
    starterCode: "// Example product model with varied scalar types\nmodel Product {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String?\n  price       Decimal\n  inStock     Boolean  @default(true)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How do you make a field optional in a Prisma schema so it accepts null?",
      options: [
              "Append a question mark '?' to the field type (e.g. String?)",
              "Add the @optional attribute after the field name",
              "Set @default(null) on the field definition",
              "Wrap the type in brackets like [String]"
      ],
      correctIndex: 0,
      explanation: "Adding a question mark '?' after the scalar type (like String? or Int?) makes the field optional and nullable in both TypeScript and the database.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Optional Fields Use '?'",
                "desc": "String? allows null values, while String requires a value."
          },
          {
                "title": "Decimal for Financial Data",
                "desc": "Use Decimal rather than Float to avoid rounding inaccuracies in pricing."
          },
          {
                "title": "Default Values",
                "desc": "Attributes like @default(true) and @default(now()) populate missing values automatically."
          }
    ],
  },
};
