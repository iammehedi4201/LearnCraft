import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri10UnderstandRelationshipsBetweenModelsContent: StandardLessonContent = {
  slug: "pri10-understand-relationships-between-models",
  code: "PRI-10",
  title: "Understand Relationships Between Models",
  subtitle: "Master connections between models: relation fields, foreign keys, 1-to-1, 1-to-N, and M-to-N.",
  difficulty: "Difficult",
  scenario: {
    question: "A user can write many blog posts, but each post belongs to one author. Which relationship is this, and where is the foreign key stored?",
    answer: "It is a one-to-many relationship from User to Post. One user can have many posts, and each post stores the `authorId` foreign key referencing the user.",
  },
  interviewQuestion: {
    question: "What is the difference between a relation field and a relation scalar field?",
    answer: "A relation field lets Prisma work with the related model, such as `author`. A relation scalar field is the actual database column holding the key, such as `authorId`.",
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
    title: "Understand Relationships Between Models",
    bigPicture: "Real applications connect models together. For example, a user writes posts, an order contains items, or a student enrolls in courses.\n\nPrisma uses two parts to create a relationship:\n\n- A relation scalar field (`authorId Int`) that stores the foreign key column in the database table.\n- A relation field (`author User @relation(...)`) that Prisma uses in TypeScript to represent the connected model.\n\nThe relation field does not exist as a physical column in the SQL database; Prisma uses it to generate queries and typed joins.",
    codeSnippet: "model User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  posts Post[]\n}\n\nmodel Post {\n  id       Int    @id @default(autoincrement())\n  title    String\n  authorId Int\n  author   User   @relation(fields: [authorId], references: [id])\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. posts Post[]",
                "desc": "A virtual relation field on User indicating one user can have multiple related Post records."
          },
          {
                "title": "2. authorId Int",
                "desc": "The relation scalar field that physically stores the foreign key in the database table."
          },
          {
                "title": "3. @relation(fields, references)",
                "desc": "Tells Prisma that authorId in Post links to id in User."
          },
          {
                "title": "4. Database integrity",
                "desc": "Prisma creates a foreign key constraint in the database, preventing orphaned posts with invalid authorIds."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Relational data modeling allows entities to reference each other while avoiding duplicate storage and maintaining integrity.",
    rule: {
      title: "Virtual Field vs Physical Foreign Key Rule",
      content: "Foreign key scalar fields (like authorId) physically exist in the database table. Relation fields (like author or posts) are virtual helpers Prisma uses to navigate relations in application code.",
    },
    cards: [
          {
                "number": "01",
                "tag": "FOREIGN KEY",
                "title": "Relation Scalar Field",
                "description": "The concrete database column (e.g. authorId) storing the reference ID. It exists as a real SQL column.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "VIRTUAL FIELD",
                "title": "Relation Field",
                "description": "A typed field (e.g. author User or posts Post[]) used by Prisma Client to load and traverse relations.",
                "color": "cyan"
          },
          {
                "number": "03",
                "tag": "INTEGRITY",
                "title": "Referential Integrity",
                "description": "Database foreign keys ensure related parent records exist and enforce deletion rules like CASCADE or RESTRICT.",
                "color": "emerald"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Modeling common cardinality patterns in Prisma:",
    points: [
          {
                "title": "One-to-One (1:1) and Many-to-Many (M:N)",
                "content": "In a 1:1 relation (User to Profile), the foreign key column is marked @unique. In Many-to-Many (Post to Tag), Prisma supports implicit relations with an automatic join table.",
                "codeSnippet": "// 1:1 relation with @unique foreign key\nmodel User {\n  id      Int      @id @default(autoincrement())\n  profile Profile?\n}\n\nmodel Profile {\n  id     Int    @id @default(autoincrement())\n  bio    String\n  userId Int    @unique // Enforces exactly one profile per user\n  user   User   @relation(fields: [userId], references: [id])\n}"
          },
          {
                "title": "Referential Actions on Delete",
                "content": "You can specify onDelete: Cascade on the relation attribute to automatically delete child posts when a parent user is deleted."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Declaring a relation field without providing the corresponding foreign key scalar field in `@relation`.",
    badApproach: {
      title: "Missing Foreign Key Scalar Field",
      code: "// Flawed: Declares relation but no authorId field\nmodel Post {\n  id     Int    @id @default(autoincrement())\n  title  String\n  author User   @relation(fields: [authorId], references: [id])\n  // Error: Field 'authorId' not found in model 'Post'!\n}",
      flaw: "Prisma schema validation fails because fields in @relation must name an actual scalar field in the model.",
    },
    betterApproach: {
      title: "Declaring Both Scalar and Relation Fields",
      code: "model Post {\n  id       Int    @id @default(autoincrement())\n  title    String\n  authorId Int    // The actual physical foreign key column\n  author   User   @relation(fields: [authorId], references: [id])\n}",
      benefit: "Prisma validates cleanly, creates the foreign key constraint, and provides typed relations.",
    },
    whyItMatters: "Relational integrity requires a physical column to store the reference ID.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Inspect relational model definitions:",
    starterCode: "// Example 1:N relationship\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  posts Post[]\n}\n\nmodel Post {\n  id       Int    @id @default(autoincrement())\n  title    String\n  authorId Int\n  author   User   @relation(fields: [authorId], references: [id])\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In Prisma schema, what is the difference between authorId and author on a Post model?",
      options: [
              "They are identical synonyms that can be used interchangeably in SQL",
              "authorId is the physical database foreign key column, while author is a virtual Prisma relation field",
              "author is a database column and authorId is only a TypeScript type",
              "authorId holds passwords while author holds usernames"
      ],
      correctIndex: 1,
      explanation: "authorId is the relation scalar field that physically exists as a column in the database table, whereas author is a virtual relation field Prisma uses in TypeScript queries.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Relation Scalar vs Relation Field",
                "desc": "authorId stores the foreign key column; author is the virtual navigation field."
          },
          {
                "title": "@relation Connects Models",
                "desc": "The @relation attribute maps foreign key fields to primary keys."
          },
          {
                "title": "Automatic Foreign Key Constraints",
                "desc": "Prisma creates database constraints to ensure related parent records exist."
          }
    ],
  },
};
