import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri20UseRawSqlOnlyWhenNeededContent: StandardLessonContent = {
  slug: "pri20-use-raw-sql-only-when-needed",
  code: "PRI-20",
  title: "Use Raw SQL Only When Needed",
  subtitle: "Execute safe parameterized raw SQL queries using $queryRaw and $executeRaw without SQL injection risks.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer builds a SQL string by adding a search value typed by a user. Why is this dangerous?",
    answer: "Untrusted input could change what the SQL command does. Use Prisma's parameterized `$queryRaw` to keep parameters separate from the query structure.",
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
    title: "Use Raw SQL Only When Needed",
    bigPicture: "Prisma Client handles most application database needs through type-safe methods. Occasionally, however, you may need database-specific features, advanced window functions, recursive CTEs, or custom aggregations not yet exposed in Prisma Client.\n\nFor these situations, Prisma provides `$queryRaw` (to read data) and `$executeRaw` (to run DDL or update counts).\n\nWhen using `$queryRaw`, Prisma uses tagged template literals to automatically parameterize inputs, keeping queries safe from SQL injection attacks.",
    codeSnippet: "const searchEmail = \"student@example.com\";\n\n// Safe: Tagged template literal parameterizes searchEmail automatically\nconst users = await prisma.$queryRaw`\n  SELECT id, email, name\n  FROM \"User\"\n  WHERE email = ${searchEmail}\n`;\n\nconsole.log(users);",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. prisma.$queryRaw`...`",
                "desc": "A tagged template literal that turns embedded variables into safe SQL parameters ($1, $2)."
          },
          {
                "title": "2. ${searchEmail}",
                "desc": "The variable is passed as a parameterized value, not concatenated into the raw SQL string."
          },
          {
                "title": "3. Untrusted input protection",
                "desc": "Even if searchEmail contains quotes or SQL keywords, the database treats it strictly as literal text data."
          },
          {
                "title": "4. Return shape",
                "desc": "Returns raw rows as JavaScript objects matching the selected SQL column names."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Raw queries grant access to advanced SQL capabilities while preserving security against injection attacks.",
    rule: {
      title: "Tagged Template Parameterization Rule",
      content: "Always use tagged template literals (prisma.$queryRaw`...`) rather than prisma.$queryRawUnsafe(). Parameterized inputs prevent SQL injection attacks by design.",
    },
    cards: [
          {
                "number": "01",
                "tag": "SQL INJECTION",
                "title": "Automatic Escaping",
                "description": "Prisma's tagged template literal sends variables out-of-band to the database as parameterized values.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "MUTATIONS",
                "title": "$executeRaw",
                "description": "Used for raw updates, deletes, and DDL statements. Returns the count of affected database rows.",
                "color": "emerald"
          },
          {
                "number": "03",
                "tag": "ESCAPE HATCH",
                "title": "Specialized Queries",
                "description": "Provides an escape hatch for complex SQL features like window functions, CTEs, and full-text search.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Typing raw query outputs with TypeScript generics:",
    points: [
          {
                "title": "Typed $queryRaw with Generics",
                "content": "You can pass an interface to $queryRaw to type the returned rows in TypeScript.",
                "codeSnippet": "interface UserStats {\n  id: number;\n  email: string;\n  postCount: number;\n}\n\nconst stats = await prisma.$queryRaw<UserStats[]>`\n  SELECT u.id, u.email, COUNT(p.id)::int as \"postCount\"\n  FROM \"User\" u\n  LEFT JOIN \"Post\" p ON p.\"authorId\" = u.id\n  GROUP BY u.id, u.email\n`;"
          },
          {
                "title": "When to Avoid Raw SQL",
                "content": "Prefer Prisma Client methods (findMany, create) for standard CRUD. Reserve raw SQL for complex reports, database-specific triggers, or legacy query migrations."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using string concatenation or `$queryRawUnsafe` with unsanitized user input.",
    badApproach: {
      title: "String Concatenation with $queryRawUnsafe",
      code: "// Flawed: SQL Injection vulnerability!\nconst input = \"admin@example.com' OR '1'='1\";\nconst users = await prisma.$queryRawUnsafe(\n  \"SELECT * FROM \"User\" WHERE email = '\" + input + \"'\"\n);",
      flaw: "An attacker can input malicious SQL syntax that bypasses authentication and exposes every record in the table.",
    },
    betterApproach: {
      title: "Using Tagged Template Literal $queryRaw",
      code: "// Clean: Tagged template automatically parameterizes input\nconst users = await prisma.$queryRaw`\n  SELECT * FROM \"User\" WHERE email = ${input}\n`;",
      benefit: "The database treats input strictly as a parameter value, making SQL injection impossible.",
    },
    whyItMatters: "SQL injection remains one of the most critical security vulnerabilities in web applications.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with safe raw SQL execution:",
    starterCode: "// Example safe raw query\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  const email = \"student@example.com\";\n\n  // Safe parameterized template literal\n  const result = await prisma.$queryRaw`\n    SELECT id, email, name\n    FROM \"User\"\n    WHERE email = ${email}\n  `;\n\n  console.log(\"Raw query result:\", result);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does prisma.$queryRaw`SELECT * FROM \"User\" WHERE email = ${email}` protect against SQL injection?",
      options: [
              "Because it strips all vowels from user input",
              "Because the tagged template literal passes ${email} as a parameterized value rather than concatenating raw text into the SQL command",
              "Because raw queries are only executed on test databases",
              "Because it encrypts the entire query string with AES-256"
      ],
      correctIndex: 1,
      explanation: "Prisma's tagged template literal breaks down the query into a parameterized SQL statement with separate values ($1, $2), ensuring user input cannot alter SQL syntax.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "Escape Hatch for Advanced SQL",
                "desc": "Use $queryRaw when Prisma Client does not yet support a specialized SQL feature."
          },
          {
                "title": "Tagged Templates are Safe",
                "desc": "Always use $queryRaw`...` which automatically parameterizes variables against SQL injection."
          },
          {
                "title": "Prefer Standard Methods",
                "desc": "Use standard Prisma Client methods (findMany, create) for normal application queries."
          }
    ],
  },
};
