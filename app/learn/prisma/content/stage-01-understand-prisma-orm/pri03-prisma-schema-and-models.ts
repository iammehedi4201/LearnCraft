import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri03PrismaSchemaAndModelsContent: StandardLessonContent = {
  slug: "pri03-prisma-schema-and-models",
  code: "PRI-03",
  title: "Prisma Schema and Models",
  subtitle: "Define application entities, tables, and fields using declarative Prisma models.",
  difficulty: "Easy",
  scenario: {
    question: "You are building a course app. You need to store each course's title and description in the database. Where should you describe this in Prisma?",
    answer: "In a `Course` model in the Prisma schema. The model describes which fields each course has.",
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
    title: "Prisma Schema and Models",
    bigPicture: "A model represents an entity in your application, such as a user, a course, or a blog post. In a relational database, a model usually maps to a table.\n\nInside a model, you describe the fields that every record of that kind will have.\n\nEach field has a name and a type. Attributes such as `@id` and `@unique` give extra meaning to a field.",
    codeSnippet: "model User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  createdAt DateTime @default(now())\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. model User",
                "desc": "Defines a User model, which maps to a table in the database."
          },
          {
                "title": "2. id Int @id",
                "desc": "id is the primary key and autoincrement() generates the next number automatically."
          },
          {
                "title": "3. email String @unique",
                "desc": "email is text, and @unique makes sure no two users have the same email."
          },
          {
                "title": "4. name String",
                "desc": "name is a required text field."
          },
          {
                "title": "5. createdAt DateTime @default(now())",
                "desc": "createdAt saves the date and time when the record is created."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Defining clear models gives your entire team and TypeScript application a shared understanding of data shapes.",
    rule: {
      title: "Model-to-Table Mapping Rule",
      content: "Every model in schema.prisma maps to a physical database table, and every field maps to a column with a matching SQL type and constraint.",
    },
    cards: [
          {
                "number": "01",
                "tag": "PRIMARY KEY",
                "title": "@id Attribute",
                "description": "Every model must have a primary key field identified by @id so individual records can be uniquely located.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "DEFAULTS",
                "title": "@default Function",
                "description": "Generates automatic initial values like autoincrement() for IDs or now() for timestamps.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "UNIQUENESS",
                "title": "@unique Constraint",
                "description": "Prevents duplicate values across records, creating a unique database index.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Designing an entity for an online learning platform:",
    points: [
          {
                "title": "Designing a Course Model",
                "content": "A Course entity needs an identifier, a title, a slug for SEO-friendly URLs, and publishing status.",
                "codeSnippet": "model Course {\n  id          Int      @id @default(autoincrement())\n  slug        String   @unique\n  title       String\n  description String?\n  isPublished Boolean  @default(false)\n  createdAt   DateTime @default(now())\n}"
          },
          {
                "title": "Naming Conventions",
                "content": "Prisma convention uses PascalCase for model names (User, Course, Post) and camelCase for field names (createdAt, authorId)."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Omitting a primary key `@id` from a model definition.",
    badApproach: {
      title: "Model Without a Primary Key",
      code: "// Flawed: Prisma requires every model to have an @id or @@id\nmodel Article {\n  title   String\n  content String\n}",
      flaw: "Prisma will fail to validate the schema with an error stating that the model must define a primary key.",
    },
    betterApproach: {
      title: "Defining an Explicit Primary Key",
      code: "model Article {\n  id        Int      @id @default(autoincrement())\n  title     String\n  content   String\n  createdAt DateTime @default(now())\n}",
      benefit: "Provides a unique identifier for finding, updating, and deleting individual articles.",
    },
    whyItMatters: "Relational databases require a primary key to uniquely distinguish and index rows.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect and test model declarations:",
    starterCode: "// Example Prisma models\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  name  String\n}\n\nmodel Course {\n  id          Int     @id @default(autoincrement())\n  title       String\n  description String?\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does the @default(autoincrement()) attribute do on an integer ID field?",
      options: [
              "It randomizes the ID using cryptographic hashing",
              "It automatically generates the next sequential number for each new record",
              "It restricts the table to only have 100 total rows",
              "It encrypts the ID column in database backups"
      ],
      correctIndex: 1,
      explanation: "@default(autoincrement()) tells the database to automatically generate sequential integer numbers (1, 2, 3...) when new records are inserted.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Models Represent Tables",
                "desc": "Each model represents an entity table with named, typed fields."
          },
          {
                "title": "Every Model Needs @id",
                "desc": "An @id primary key attribute is required to identify records."
          },
          {
                "title": "Attributes Add Constraints",
                "desc": "Attributes like @unique and @default add business rules directly to the database."
          }
    ],
  },
};
