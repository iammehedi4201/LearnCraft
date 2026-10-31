import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg07NullAndMissingValuesContent: StandardLessonContent = {
  slug: "pg07-null-and-missing-values",
  code: "PG-07",
  title: "NULL and Missing Values",
  subtitle: "Understand three-valued logic in SQL and why you must always use IS NULL and IS NOT NULL instead of = NULL.",
  difficulty: "Moderate",
  scenario: {
    question: "Some customers have not added an email address. How can you find those customers?",
    answer: "Use WHERE email IS NULL. It finds rows where the email value is missing.",
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
    title: "NULL and Missing Values",
    bigPicture:
      "`NULL` means a value is missing or unknown. It is not the same as `0`, an empty string, or `FALSE`.\n\nDo not check for `NULL` with `= NULL`. Use `IS NULL` or `IS NOT NULL`.",
    codeSnippet: `SELECT name, email
FROM customers
WHERE email IS NULL;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Column evaluation",
        desc: "PostgreSQL evaluates each customer's `email` column value.",
      },
      {
        title: "2. IS NULL filter",
        desc: "Matches only rows where the value is missing or unassigned.",
      },
      {
        title: "3. IS NOT NULL alternative",
        desc: "Conversely selects only rows that contain an actual value.",
      },
      {
        title: "4. Three-valued logic",
        desc: "Because NULL represents an unknown, direct equality checks like `= NULL` or `!= NULL` evaluate to UNKNOWN, not TRUE or FALSE.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "NULL represents the absence of data. Treating it like an empty string or using equality operators causes silent query bugs where matching rows are unexpectedly omitted.",
    rule: {
      title: "Three-Valued Logic Rule",
      content:
        "Never use `= NULL` or `<> NULL`. In SQL, `NULL = NULL` is `UNKNOWN`, which evaluates to false in `WHERE` filters. Always use `IS NULL` and `IS NOT NULL`.",
    },
    cards: [
      {
        number: "01",
        tag: "LOGIC",
        title: "Unknown vs False",
        description:
          "In SQL, boolean expressions evaluate to TRUE, FALSE, or UNKNOWN. WHERE clauses only keep rows where the condition is strictly TRUE.",
        color: "amber",
      },
      {
        number: "02",
        tag: "FUNCTIONS",
        title: "COALESCE Fallbacks",
        description:
          "Use `COALESCE(email, 'No email provided')` to return a fallback value when a column contains NULL.",
        color: "purple",
      },
      {
        number: "03",
        tag: "ARITHMETIC",
        title: "NULL Propagation",
        description:
          "Any mathematical calculation involving NULL returns NULL (e.g. `price + NULL` evaluates to `NULL`).",
        color: "rose",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how customer contact information and optional profiles handle missing values.",
    points: [
      {
        title: "Finding Incomplete Profiles",
        content:
          "When onboarding new customers, finding users who haven't verified their phone number or entered a shipping address requires `WHERE shipping_address IS NULL`.",
      },
      {
        title: "Aggregating Columns with NULLs",
        content:
          "`COUNT(*)` counts all rows including NULLs, whereas `COUNT(email)` only counts rows where email `IS NOT NULL`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Writing WHERE email = NULL or WHERE email != NULL, resulting in zero rows returned.",
    badApproach: {
      title: "Broken Equality Check",
      code: `-- Flawed: returns 0 rows every time!
SELECT name, email
FROM customers
WHERE email = NULL;`,
      flaw: "In SQL, comparing anything to NULL with '=' produces UNKNOWN, which the WHERE clause filters out as not true.",
    },
    betterApproach: {
      title: "Proper IS NULL Syntax",
      code: `-- Production: correctly finds missing values
SELECT name, email
FROM customers
WHERE email IS NULL;`,
      benefit: "Correctly identifies rows where the email field is missing.",
    },
    whyItMatters:
      "Checking for NULL using '=' causes queries to silently return zero rows, creating subtle bugs in notification and reporting systems.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Insert customers with and without emails, and query using IS NULL:",
    starterCode: `CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT
);

INSERT INTO customers (name, email) VALUES
  ('Amina', 'amina@example.com'),
  ('Rahim', NULL),
  ('Farhan', NULL),
  ('Nadia', 'nadia@example.com');

SELECT name, email
FROM customers
WHERE email IS NULL;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "How should you check if a column called 'phone' has a missing value in SQL?",
      options: [
        "WHERE phone == NULL",
        "WHERE phone IS NULL",
        "WHERE phone = ''",
        "WHERE phone.isEmpty()",
      ],
      correctIndex: 1,
      explanation:
        "In SQL, NULL represents an unknown value. The only correct way to test for it is using the IS NULL or IS NOT NULL operators.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "NULL Means Unknown",
        desc: "`NULL` represents missing or unassigned information, not zero or an empty string.",
      },
      {
        title: "Never Use = NULL",
        desc: "Always check for missing values with `IS NULL` or `IS NOT NULL`.",
      },
      {
        title: "Use COALESCE for Defaults",
        desc: "`COALESCE(val, default_val)` lets you provide fallbacks when a value is NULL.",
      },
    ],
  },
};

