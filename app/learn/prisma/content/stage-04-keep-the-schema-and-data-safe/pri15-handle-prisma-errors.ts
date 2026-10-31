import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri15HandlePrismaErrorsContent: StandardLessonContent = {
  slug: "pri15-handle-prisma-errors",
  code: "PRI-15",
  title: "Handle Prisma Errors",
  subtitle: "Identify and handle PrismaClientKnownRequestError codes (P2002, P2025, P2003) gracefully.",
  difficulty: "Moderate",
  scenario: {
    question: "A user tries to register with an email that another account already uses. What should the server do?",
    answer: "Catch the unique-constraint error and show a message that the email is already in use. Do not crash the server.",
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
    title: "Handle Prisma Errors",
    bigPicture: "When a database operation fails—such as violating a unique constraint or trying to update a record that does not exist—Prisma throws a typed error.\n\nMost common database errors are instances of `Prisma.PrismaClientKnownRequestError`. These errors have a `.code` property with a standard code (such as `P2002` for unique constraint violations or `P2025` for missing records).\n\nCatching these errors allows your application to return helpful user feedback (like \"Email is already taken\") instead of crashing with a 500 server error.",
    codeSnippet: "import { Prisma } from \"@prisma/client\";\n\ntry {\n  await prisma.user.create({\n    data: {\n      email: \"existing@example.com\",\n      name: \"Same Email\",\n    },\n  });\n} catch (error) {\n  if (\n    error instanceof Prisma.PrismaClientKnownRequestError &&\n    error.code === \"P2002\"\n  ) {\n    console.log(\"That email is already registered.\");\n  } else {\n    throw error;\n  }\n}",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. PrismaClientKnownRequestError",
                "desc": "Thrown when a database query fails due to a known constraint violation or query error."
          },
          {
                "title": "2. error.code === 'P2002'",
                "desc": "P2002 indicates a unique constraint violation (e.g. duplicate email)."
          },
          {
                "title": "3. User friendly message",
                "desc": "Return a 409 Conflict or 400 Bad Request to the client instead of an unhandled 500 error."
          },
          {
                "title": "4. Re-throwing unknown errors",
                "desc": "Always re-throw unexpected errors so they are logged by error monitoring systems."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Proper error handling prevents server crashes and transforms cryptic database codes into clear user feedback.",
    rule: {
      title: "Known Request Error Rule",
      content: "Always check 'error instanceof Prisma.PrismaClientKnownRequestError' before inspecting error.code. This prevents runtime type errors when handling non-Prisma exceptions.",
    },
    cards: [
          {
                "number": "01",
                "tag": "P2002",
                "title": "Unique Constraint Violation",
                "description": "Triggered when inserting or updating a duplicate value on a column marked with @unique or primary key.",
                "color": "purple"
          },
          {
                "number": "02",
                "tag": "P2025",
                "title": "Record Not Found",
                "description": "Triggered when update(), delete(), or findUniqueOrThrow() cannot locate the requested target ID.",
                "color": "rose"
          },
          {
                "number": "03",
                "tag": "P2003",
                "title": "Foreign Key Constraint Failure",
                "description": "Triggered when trying to link a relation to a parent ID that does not exist in the database.",
                "color": "amber"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Mapping Prisma error codes to HTTP status responses:",
    points: [
          {
                "title": "HTTP Status Code Mapping",
                "content": "In an Express or Next.js route handler, map P2002 to 409 Conflict, P2025 to 404 Not Found, and P2003 to 400 Bad Request.",
                "codeSnippet": "// Express / Next.js error helper:\nfunction handlePrismaError(error: unknown) {\n  if (error instanceof Prisma.PrismaClientKnownRequestError) {\n    if (error.code === \"P2002\") {\n      return { status: 409, message: \"Duplicate value violates unique constraint\" };\n    }\n    if (error.code === \"P2025\") {\n      return { status: 404, message: \"Requested record not found\" };\n    }\n  }\n  return { status: 500, message: \"Internal server error\" };\n}"
          },
          {
                "title": "Target Field Metadata",
                "content": "In P2002 errors, error.meta?.target specifies which exact column or constraint caused the violation (e.g. ['email'])."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Letting raw Prisma errors escape to client browsers, revealing internal table structures and connection strings.",
    badApproach: {
      title: "Exposing Raw Database Errors to Users",
      code: "// Flawed: Leaks database details to public web clients\napp.post(\"/register\", async (req, res) => {\n  try {\n    await prisma.user.create({ data: req.body });\n  } catch (err: any) {\n    res.status(500).json({ error: err.message }); // Leaks schema details!\n  }\n});",
      flaw: "Exposes internal table names, SQL errors, and sensitive system details to malicious attackers.",
    },
    betterApproach: {
      title: "Sanitizing Errors with Clean Messages",
      code: "// Clean: Catch specific codes and return safe messages\nif (err instanceof Prisma.PrismaClientKnownRequestError && err.code === \"P2002\") {\n  return res.status(409).json({ error: \"Email address is already in use.\" });\n}\nres.status(500).json({ error: \"An unexpected error occurred.\" });",
      benefit: "Provides clean user feedback while keeping internal database architecture private.",
    },
    whyItMatters: "Sanitizing database errors protects application security while improving user experience.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with catching Prisma error codes:",
    starterCode: "// Example error handling pattern\nimport { PrismaClient, Prisma } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function createUser(email: string) {\n  try {\n    return await prisma.user.create({ data: { email, name: \"Test\" } });\n  } catch (error) {\n    if (error instanceof Prisma.PrismaClientKnownRequestError) {\n      if (error.code === \"P2002\") {\n        console.error(\"Conflict: Email already exists!\");\n        return null;\n      }\n    }\n    throw error;\n  }\n}\n\ncreateUser(\"existing@example.com\");",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which Prisma error code indicates a unique constraint violation (such as inserting a duplicate email)?",
      options: [
              "P2002",
              "P2025",
              "P1001",
              "P3000"
      ],
      correctIndex: 0,
      explanation: "P2002 is Prisma's error code for a Unique constraint violation, thrown when a unique field or primary key condition is breached.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "KnownRequestError",
                "desc": "Database violations throw PrismaClientKnownRequestError with standardized codes."
          },
          {
                "title": "P2002 is Unique Violation",
                "desc": "Triggered on duplicate emails, usernames, or unique constraint fields."
          },
          {
                "title": "Sanitize Error Messages",
                "desc": "Return helpful user feedback (like 409 Conflict) instead of raw database stack traces."
          }
    ],
  },
};
