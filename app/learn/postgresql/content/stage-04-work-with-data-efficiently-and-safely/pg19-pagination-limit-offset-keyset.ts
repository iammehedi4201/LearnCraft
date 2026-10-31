import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg19PaginationLimitOffsetKeysetContent: StandardLessonContent = {
  slug: "pg19-pagination-limit-offset-keyset",
  code: "PG-19",
  title: "Pagination — Return Data in Small Pages",
  subtitle: "Implement performant data pagination using standard LIMIT/OFFSET and scalable Keyset cursor pagination.",
  difficulty: "Moderate",
  scenario: {
    question: "A product table has 500,000 rows. Should the API return all rows for one page?",
    answer: "No. It should return a small page of rows. This reduces the amount of data sent and processed at one time.",
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
    title: "Pagination — Return Data in Small Pages",
    bigPicture:
      "Pagination splits a large result into smaller pages. It avoids sending every row to the application at once.",
    codeSnippet: `-- Simple LIMIT / OFFSET pagination (page 3, 10 items per page)
SELECT id, name
FROM products
ORDER BY id
LIMIT 10 OFFSET 20;

-- Keyset pagination (more efficient and stable for large datasets)
SELECT id, name
FROM products
WHERE id > 20
ORDER BY id
LIMIT 10;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. ORDER BY id",
        desc: "Establishes a stable, deterministic sort order essential for reliable page boundaries.",
      },
      {
        title: "2. OFFSET 20",
        desc: "Instructs PostgreSQL to discard the first 20 rows of the ordered result set.",
      },
      {
        title: "3. LIMIT 10",
        desc: "Returns the next 10 rows (representing Page 3 of 10 items per page).",
      },
      {
        title: "4. Keyset cursor approach",
        desc: "Instead of scanning and discarding skipped rows, keyset pagination uses `WHERE id > last_seen_id LIMIT 10` to jump straight to the next page using an index.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Querying a table with 500,000 rows without pagination exhausts client memory, slows down network transfers, and overwhelms database buffers.",
    rule: {
      title: "Deterministic Pagination Rule",
      content:
        "Always paginate high-cardinality tables. For small tables or jump-to-page UIs, `LIMIT/OFFSET` is acceptable. For large tables or infinite feeds, use keyset cursor pagination (`WHERE id > :cursor`). Always enforce a deterministic `ORDER BY`.",
    },
    cards: [
      {
        number: "01",
        tag: "OFFSET",
        title: "Offset Degradation",
        description:
          "`OFFSET 100000` forces the engine to read and discard 100,000 rows before returning row 100,001, causing latency spikes on deep pages.",
        color: "amber",
      },
      {
        number: "02",
        tag: "KEYSET",
        title: "Keyset Cursor Efficiency",
        description:
          "Keyset pagination relies on B-Tree index navigation (`WHERE id > 20`), ensuring Page 10,000 runs as fast as Page 1.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "DRIFT",
        title: "Preventing Missing/Duplicate Items",
        description:
          "If new rows are inserted while a user browses, OFFSET causes rows to shift and duplicate. Keyset cursors remain rock-solid.",
        color: "purple",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Explore how product catalog browsing and infinite scroll feeds handle page navigation.",
    points: [
      {
        title: "E-Commerce Category Listings",
        content:
          "Showing 24 products per page with pagination links (1, 2, 3...) typically uses `LIMIT 24 OFFSET (page - 1) * 24`.",
      },
      {
        title: "Mobile App Infinite Scrolling",
        content:
          "Infinite feeds request `GET /api/feed?after_id=1054` which maps directly to a high-speed keyset query `WHERE id < 1054 ORDER BY id DESC LIMIT 20`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Paginating without an ORDER BY clause, causing rows to jump around between pages.",
    badApproach: {
      title: "Unordered Pagination",
      code: `-- Flawed: No ORDER BY!
SELECT id, name FROM products LIMIT 10 OFFSET 20;`,
      flaw: "Because table order is non-deterministic, Page 2 may repeat rows from Page 1 or miss records entirely.",
    },
    betterApproach: {
      title: "Stable Deterministic Pagination",
      code: `-- Production: Deterministic sorting by unique key
SELECT id, name
FROM products
ORDER BY id ASC
LIMIT 10 OFFSET 20;`,
      benefit: "Guarantees that every page contains a distinct, consistent partition of records.",
    },
    whyItMatters:
      "Stable pagination prevents duplicate or missing items on product catalogues, search results, and admin tables.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Test LIMIT/OFFSET and keyset pagination:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL
);

INSERT INTO products (name) VALUES
  ('Item 1'), ('Item 2'), ('Item 3'), ('Item 4'),
  ('Item 5'), ('Item 6'), ('Item 7'), ('Item 8');

-- Page 2 (2 items per page):
SELECT id, name
FROM products
ORDER BY id
LIMIT 2 OFFSET 2;

-- Keyset: fetch 2 items after ID 2:
SELECT id, name
FROM products
WHERE id > 2
ORDER BY id
LIMIT 2;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why can large OFFSET values (e.g. OFFSET 100000) become slow in PostgreSQL?",
      options: [
        "PostgreSQL crashes when offset exceeds 1,000",
        "The database must still read and discard the first 100,000 rows before returning the page",
        "Offsets can only be used with text columns",
        "The OFFSET clause requires superuser database permissions",
      ],
      correctIndex: 1,
      explanation:
        "With OFFSET, the database still has to scan through and discard all prior rows, which increases I/O and processing time on deep pages.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Return Small Pages",
        desc: "Always paginate large tables to conserve bandwidth, memory, and database resources.",
      },
      {
        title: "Always Use ORDER BY",
        desc: "Deterministic ordering by unique keys prevents missing or duplicated rows across pages.",
      },
      {
        title: "Keyset for Scale",
        desc: "Use keyset cursor pagination (`WHERE id > last_seen`) for deep lists and high performance.",
      },
    ],
  },
};

