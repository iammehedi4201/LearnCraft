import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pri06CreateAndReadRecordsContent: StandardLessonContent = {
  slug: "pri06-create-and-read-records",
  code: "PRI-06",
  title: "Create and Read Records",
  subtitle: "Insert new records with create() and retrieve records with findMany(), findUnique(), and findFirst().",
  difficulty: "Moderate",
  scenario: {
    question: "A user opens a profile page using their email address. Which method is suitable to find that user?",
    answer: "Use `findUnique()` with the email field, because the email identifies at most one user.",
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
    title: "Create and Read Records",
    bigPicture: "Prisma Client has dedicated methods for adding records and reading records.\n\n- `create()` inserts a new record with provided data.\n- `findMany()` fetches multiple records matching optional criteria.\n- `findUnique()` finds exactly one record by a unique field or primary key.\n- `findFirst()` finds the first record that matches a general condition.",
    codeSnippet: "// 1. Create a user\nconst user = await prisma.user.create({\n  data: {\n    email: \"student@example.com\",\n    name: \"Amina\",\n  },\n});\n\n// 2. Find all users\nconst users = await prisma.user.findMany();\n\n// 3. Find one user by a unique field\nconst oneUser = await prisma.user.findUnique({\n  where: { email: \"student@example.com\" },\n});",
    breakdownTitle: "Step by step",
    breakdownItems: [
          {
                "title": "1. create({ data })",
                "desc": "Takes a data object containing required fields and inserts a new row in the database."
          },
          {
                "title": "2. findMany()",
                "desc": "Fetches a list of records. Without arguments, it returns all records in the table."
          },
          {
                "title": "3. findUnique({ where })",
                "desc": "where must specify a field marked with @id or @unique in the schema, guaranteeing at most one row is returned."
          },
          {
                "title": "4. Null return on missing",
                "desc": "If no matching record exists, findUnique returns null rather than throwing an exception."
          }
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro: "Creating and reading records form the foundation of any web or mobile application.",
    rule: {
      title: "Unique Lookup Rule",
      content: "findUnique() can only query fields marked with @id, @unique, or composite unique constraints (@@unique). For arbitrary non-unique fields, use findFirst() or findMany().",
    },
    cards: [
          {
                "number": "01",
                "tag": "CREATION",
                "title": "create()",
                "description": "Inserts a single row and returns the freshly created object including generated IDs and timestamps.",
                "color": "emerald"
          },
          {
                "number": "02",
                "tag": "COLLECTION",
                "title": "findMany()",
                "description": "Returns an array of records. Accepts filtering, sorting, pagination, and relation includes.",
                "color": "purple"
          },
          {
                "number": "03",
                "tag": "POINT LOOKUP",
                "title": "findUnique()",
                "description": "Optimized single-row query by primary key or unique index. Returns the record or null if not found.",
                "color": "cyan"
          }
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Common CRUD query patterns in a web service:",
    points: [
          {
                "title": "findUnique vs findFirst",
                "content": "Use findUnique when searching by ID, UUID, or unique email. Use findFirst when filtering by non-unique fields like role or status.",
                "codeSnippet": "// Fast index lookup by unique field\nconst user = await prisma.user.findUnique({\n  where: { id: 42 },\n});\n\n// First match by non-unique criteria\nconst moderator = await prisma.user.findFirst({\n  where: { role: \"MODERATOR\", active: true },\n});"
          },
          {
                "title": "createMany for Bulk Inserts",
                "content": "To insert many records in a single database roundtrip, Prisma provides createMany({ data: [...] }), significantly faster than looping create()."
          }
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem: "Using `findUnique()` with a non-unique field.",
    badApproach: {
      title: "findUnique with Non-Unique Field",
      code: "// Flawed: 'name' is not marked @unique in schema.prisma\nconst user = await prisma.user.findUnique({\n  where: { name: \"Amina\" }, // TypeScript error!\n});",
      flaw: "TypeScript will reject this query because findUnique only accepts fields with unique database indexes.",
    },
    betterApproach: {
      title: "Using findFirst or findMany",
      code: "// Clean: findFirst works on any queryable criteria\nconst user = await prisma.user.findFirst({\n  where: { name: \"Amina\" },\n});",
      benefit: "TypeScript compiles cleanly and the query fetches the first matching record.",
    },
    whyItMatters: "Enforcing unique constraints at the type level prevents bugs caused by expecting one result when multiple exist.",
  },
  part5: {
    title: "Interactive Prisma Sandbox",
    intro: "Experiment with create and read operations:",
    starterCode: "// Example Prisma queries\nimport { PrismaClient } from \"@prisma/client\";\n\nconst prisma = new PrismaClient();\n\nasync function run() {\n  // Create user\n  const newUser = await prisma.user.create({\n    data: { email: \"amina@example.com\", name: \"Amina\" }\n  });\n\n  // Find user by unique email\n  const found = await prisma.user.findUnique({\n    where: { email: \"amina@example.com\" }\n  });\n\n  console.log(\"Found:\", found);\n}\n\nrun();",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which field can be used inside the 'where' argument of a findUnique() query?",
      options: [
              "Any string or integer field in the table",
              "Only fields marked with @id, @unique, or composite unique constraints",
              "Only fields containing numerical values",
              "Only DateTime fields created with @default(now())"
      ],
      correctIndex: 1,
      explanation: "findUnique() requires fields that guarantee uniqueness in the database, such as the primary key (@id) or fields marked with @unique.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
          {
                "title": "create() Inserts Rows",
                "desc": "Pass a data object with required fields to insert a record."
          },
          {
                "title": "findUnique() for Primary Keys",
                "desc": "Use findUnique with unique fields to fetch a single record or null."
          },
          {
                "title": "findMany() for Collections",
                "desc": "Fetches an array of records matching your criteria."
          }
    ],
  },
};
