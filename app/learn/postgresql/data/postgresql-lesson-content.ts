/**
 * PostgreSQL Lesson Content Data Layer — LearnCraft
 * Provides rich, interactive content for all 29 PostgreSQL lessons.
 *
 * Each lesson follows the 7-Part Interactive Architecture:
 * - Part 1: Mental Model & Visual Diagram
 * - Part 2: Core Technical Concepts
 * - Part 3: Deep Dive & Technical Nuance
 * - Part 4: Bad Design vs. Better Design (Database Reasoning)
 * - Part 5: Interactive Code Simulation & Playground
 * - Part 6: Concept Check Quiz (Self-Assessed)
 * - Part 7: Key Takeaways & Summary
 */

export interface SectionItem {
  id: string;
  label: string;
  description?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TakeawayItem {
  title: string;
  desc: string;
}

export interface PostgresqlLessonContent {
  sections: SectionItem[];
  part1: {
    title: string;
    analogy: string;
    diagram: string;
    explanation: string;
  };
  part2: {
    title: string;
    concepts: {
      name: string;
      desc: string;
      codeSnippet?: string;
    }[];
  };
  part3: {
    title: string;
    deepDives: {
      heading: string;
      content: string;
      bulletPoints?: string[];
    }[];
  };
  part4: {
    title: string;
    problem: string;
    badApproach: {
      title: string;
      code: string;
      flaw: string;
    };
    betterApproach: {
      title: string;
      code: string;
      benefit: string;
    };
    whyItMatters: string;
  };
  part5: {
    title: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: QuizQuestion;
  };
  part7: {
    title: string;
    takeaways: TakeawayItem[];
  };
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "part1", label: "Mental Model", description: "Visual intuition & core analogy" },
  { id: "part2", label: "Core Concepts", description: "Fundamental relational rules" },
  { id: "part3", label: "Deep Dive", description: "PostgreSQL engine behavior" },
  { id: "part4", label: "Bad vs Better", description: "Database design reasoning" },
  { id: "part5", label: "Playground", description: "Interactive SQL simulation" },
  { id: "part6", label: "Knowledge Check", description: "Self-assessed concept quiz" },
  { id: "part7", label: "Summary", description: "Key takeaways & review" },
];

export const POSTGRESQL_LESSONS_CONTENT: Record<string, PostgresqlLessonContent> = {
  // =========================================================================
  // PG-01: What Is PostgreSQL & The Relational Paradigm
  // =========================================================================
  "pg01-what-is-postgresql": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Spreadsheet Ledger vs. Relational Engine",
      analogy: "Think of a spreadsheet where multiple people edit cells without rules: typos happen, customer names get misspelled, and orders point to deleted users. PostgreSQL is like an automated, indestructible digital bank ledger with a strict security guard at the door.",
      diagram: `[ Relational Database ]
  ├── Users Table      (id, name, email) ──┐
  │                                        ├── [ Enforced Relationship ]
  └── Orders Table     (id, user_id, total) ┘
        │
        └── Can NEVER point to a user_id that doesn't exist!`,
      explanation: "PostgreSQL is an advanced, open-source object-relational database management system (ORDBMS). Instead of letting software write arbitrary disconnected data, PostgreSQL organizes data into tables composed of strictly typed columns and rows. Most importantly, it enforces mathematical relational algebra and integrity constraints directly at the database engine level.",
    },
    part2: {
      title: "Core Relational Foundations",
      concepts: [
        {
          name: "Tables, Rows & Columns",
          desc: "A Table represents an entity (e.g. users). Every Row is a single unique record, and every Column defines a strictly typed property (e.g. email as VARCHAR).",
          codeSnippet: `-- The blueprint of an entity\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE\n);`,
        },
        {
          name: "ACID Guarantees",
          desc: "PostgreSQL guarantees Atomicity (all-or-nothing), Consistency (rules never broken), Isolation (concurrent safety), and Durability (saved data survives server crashes).",
        },
        {
          name: "Data Integrity as First-Class Citizen",
          desc: "Application code can have bugs, crashes, or multiple versions running simultaneously. PostgreSQL guards your business truth regardless of which client connects.",
        },
      ],
    },
    part3: {
      title: "Why PostgreSQL Over Simpler Databases?",
      deepDives: [
        {
          heading: "Extensibility & Standards Compliance",
          content: "PostgreSQL adheres closer to ANSI SQL standards than almost any other relational database. It also supports custom data types, full-text search, spatial queries (PostGIS), and native JSONB without sacrificing relational rigor.",
          bulletPoints: [
            "Over 35 years of active engineering and open-source refinement.",
            "Write-Ahead Logging (WAL) guarantees zero committed data loss even during hard power failures.",
            "Multi-Version Concurrency Control (MVCC) allows readers to never block writers and writers to never block readers.",
          ],
        },
      ],
    },
    part4: {
      title: "Application Validation vs Database Integrity",
      problem: "Trusting application code alone to maintain correct data relationships.",
      badApproach: {
        title: "Relying Solely on JavaScript / Backend Checks",
        code: `// Express / Node backend:\nif (!email) throw new Error("Email required");\n// But what if another worker inserts without checking? Or a manual query runs?\n// Duplicates or missing emails end up inside the database!`,
        flaw: "Multiple microservices, background jobs, or direct database scripts can bypass application validations, polluting the database with corrupt records.",
      },
      betterApproach: {
        title: "Database-Level Constraints in PostgreSQL",
        code: `CREATE TABLE users (\n  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP\n);`,
        benefit: "PostgreSQL physically rejects any attempt to insert a duplicate or empty email, guaranteeing 100% data integrity at all times.",
      },
      whyItMatters: "Databases outlive applications. Frontend and backend frameworks get rewritten, but the database stores your company's core asset: clean, reliable data.",
    },
    part5: {
      title: "Interactive PostgreSQL Simulator",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATING POSTGRESQL TABLES & INTEGRITY CHECKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class DatabaseEngine {
  constructor() {
    this.tables = {
      users: []
    };
  }

  insertUser(id, email) {
    if (!email) {
      throw new Error("ERROR: null value in column 'email' violates not-null constraint");
    }
    const exists = this.tables.users.some(u => u.email === email);
    if (exists) {
      throw new Error(\`ERROR: duplicate key value violates unique constraint "users_email_key"\`);
    }
    const user = { id, email, created_at: new Date().toISOString() };
    this.tables.users.push(user);
    return user;
  }
}

const db = new DatabaseEngine();

console.log("Inserting user 1...");
console.log(db.insertUser(1, "alex@example.com"));

try {
  console.log("Attempting duplicate insert...");
  db.insertUser(2, "alex@example.com");
} catch (err) {
  console.log("PostgreSQL Error caught:", err.message);
}
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "What is the primary advantage of enforcing constraints (like UNIQUE and NOT NULL) in PostgreSQL rather than only in backend code?",
        options: [
          "It makes the SQL queries run faster on the client side",
          "It guarantees data consistency regardless of which application, script, or service touches the database",
          "It removes the need for primary keys",
          "It automatically converts relational data into JSON",
        ],
        correctIndex: 1,
        explanation: "Application code can have bugs or be bypassed by migrations, admin scripts, and other microservices. Database-level constraints ensure the data itself remains incorruptible.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Relational Blueprint", desc: "Data is organized into structured tables with typed columns, ensuring consistency." },
        { title: "ACID Compliance", desc: "Guarantees transactions succeed fully or fail safely without partial writes." },
        { title: "Engine-Level Truth", desc: "Always guard business rules at the database boundary." },
      ],
    },
  },

  // =========================================================================
  // PG-02: PostgreSQL Hierarchy: Databases, Schemas & Tables
  // =========================================================================
  "pg02-databases-schemas-tables": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Multi-Tenant Filing Cabinet",
      analogy: "Imagine an office building (Database Cluster). Inside the building are separate locked offices (Databases). Inside each office are filing cabinets with labeled drawers (Schemas like 'public' or 'tenant_a'). Inside each drawer are the actual folders (Tables).",
      diagram: `PostgreSQL Cluster (Server Instance on port 5432)
   ├── Database: "ecommerce_prod"
   │     ├── Schema: "public"
   │     │     ├── Table: users
   │     │     └── Table: orders
   │     └── Schema: "analytics"
   │           └── Table: daily_revenue_summary
   └── Database: "internal_hr"
         └── Schema: "public"
               └── Table: employees`,
      explanation: "PostgreSQL features a distinct 3-tier hierarchy: Cluster -> Database -> Schema -> Table. A database is physically separated from other databases, whereas schemas are logical namespaces within the same database that can share connections and cross-query data.",
    },
    part2: {
      title: "Hierarchy Components",
      concepts: [
        {
          name: "Database",
          desc: "The primary container of data. Queries in PostgreSQL normally operate within a single database. Cross-database queries require foreign data wrappers.",
          codeSnippet: `CREATE DATABASE shop_sphere;`,
        },
        {
          name: "Schema",
          desc: "A namespace within a database. Every PostgreSQL database comes with a default schema named 'public'. You can create custom schemas to organize modules or tenant data.",
          codeSnippet: `CREATE SCHEMA billing;\nCREATE TABLE billing.invoices (\n  id SERIAL PRIMARY KEY,\n  amount NUMERIC(10, 2)\n);`,
        },
        {
          name: "search_path",
          desc: "The ordered list of schemas PostgreSQL searches when an unqualified table name is used in a query (e.g. SELECT * FROM invoices). Defaults to `\"$user\", public`.",
        },
      ],
    },
    part3: {
      title: "Deep Dive: Schema Isolation",
      deepDives: [
        {
          heading: "When to Use Multiple Schemas",
          content: "Schemas provide clean separation of concerns without the connection overhead of running separate database servers. They are frequently used for multi-tenant SaaS architectures, reporting partitions, and security boundary isolation.",
          bulletPoints: [
            "Tenant-per-schema: Each customer gets an identical schema (tenant_1, tenant_2) for data isolation.",
            "Module grouping: Grouping billing.*, auth.*, and inventory.* inside a single database.",
            "Zero connection switching: A backend connection pool can access multiple schemas in one query.",
          ],
        },
      ],
    },
    part4: {
      title: "Single Schema Clutter vs Logical Namespaces",
      problem: "Dumping 200 unrelated tables into the default 'public' schema.",
      badApproach: {
        title: "Prefix Hell in 'public'",
        code: `CREATE TABLE billing_customers (...);\nCREATE TABLE billing_invoices (...);\nCREATE TABLE auth_users (...);\nCREATE TABLE auth_tokens (...);\nCREATE TABLE analytics_daily_clicks (...);`,
        flaw: "Naming collisions, cluttered migrations, difficult permission granting, and accidental cross-module leaks.",
      },
      betterApproach: {
        title: "Clean Modular Schemas",
        code: `CREATE SCHEMA auth;\nCREATE SCHEMA billing;\nCREATE SCHEMA analytics;\n\nCREATE TABLE auth.users (...);\nCREATE TABLE billing.invoices (...);\nCREATE TABLE analytics.daily_clicks (...);`,
        benefit: "Clean permission control (GRANT SELECT ON ALL TABLES IN SCHEMA billing TO billing_service) and logical architecture.",
      },
      whyItMatters: "As applications grow, modular database schemas keep migrations, permissions, and entity boundaries organized.",
    },
    part5: {
      title: "Interactive Schema Resolution Simulation",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATING POSTGRESQL search_path RESOLUTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const database = {
  name: "ecommerce_db",
  schemas: {
    public: {
      users: [{ id: 1, name: "Public Alex" }]
    },
    billing: {
      users: [{ id: 1, name: "Billing Alex (Account)" }],
      invoices: [{ id: 101, total: 150.00 }]
    }
  }
};

function resolveTable(tableName, searchPath = ["billing", "public"]) {
  console.log(\`Searching for table '\${tableName}' with search_path:\`, searchPath.join(", "));
  for (const schemaName of searchPath) {
    if (database.schemas[schemaName] && database.schemas[schemaName][tableName]) {
      console.log(\`-> Found '\${tableName}' in schema '\${schemaName}'!\`);
      return database.schemas[schemaName][tableName];
    }
  }
  throw new Error(\`ERROR: relation "\${tableName}" does not exist\`);
}

console.log("Querying 'users':");
console.log(resolveTable("users", ["billing", "public"]));

console.log("\\nQuerying 'invoices':");
console.log(resolveTable("invoices", ["public", "billing"]));
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "If your search_path is set to `billing, public` and both schemas contain a table named `customers`, which table will `SELECT * FROM customers` query?",
        options: [
          "It will query both tables and union them together",
          "It will throw an ambiguous table name error",
          "It will query `billing.customers` because 'billing' appears first in the search_path",
          "It will always query `public.customers` by default",
        ],
        correctIndex: 2,
        explanation: "PostgreSQL traverses the search_path list from left to right, returning the first matching relation it encounters.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Three-Tier Structure", desc: "Cluster -> Database -> Schema -> Table." },
        { title: "Default 'public'", desc: "Unqualified tables are placed in the public schema by default." },
        { title: "search_path Order", desc: "Determines resolution order for table lookups." },
      ],
    },
  },

  // =========================================================================
  // PG-03: Core Data Types: Integers, Text, Decimals & Timestamps
  // =========================================================================
  "pg03-core-data-types": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Precision Toolbox",
      analogy: "Using the wrong data type is like using a sledgehammer to hang a picture frame, or a plastic ruler to measure down to the nanometer. Using FLOAT for money causes fractions of pennies to disappear into thin air!",
      diagram: `[ Money / Financials ] ──> NUMERIC(10, 2)  (Exact decimal math, ZERO rounding error)
[ Primary Keys ]       ──> BIGINT or UUID   (Scale beyond 2.14 billion rows)
[ Freeform Text ]      ──> TEXT or VARCHAR  (Optimized TOAST storage)
[ Timestamps ]         ──> TIMESTAMPTZ      (Always UTC aware)`,
      explanation: "PostgreSQL offers one of the richest sets of native data types in any database engine. Picking the right type preserves exact arithmetic, minimizes storage footprints, and guarantees semantic validity.",
    },
    part2: {
      title: "Essential Type Categories",
      concepts: [
        {
          name: "Integers: SMALLINT, INT, BIGINT",
          desc: "INT (INTEGER) holds up to 2.14 billion (4 bytes). BIGINT holds up to 9 quintillion (8 bytes). Always use BIGINT for high-volume primary keys and event logs.",
          codeSnippet: `CREATE TABLE counts (\n  small SMALLINT, -- 2 bytes: -32k to +32k\n  standard INT,   -- 4 bytes: -2B to +2B\n  huge BIGINT     -- 8 bytes: high-scale IDs\n);`,
        },
        {
          name: "Money & Math: NUMERIC / DECIMAL vs FLOAT",
          desc: "FLOAT and DOUBLE PRECISION use binary floating-point math (subject to 0.1 + 0.2 = 0.30000000000000004). NUMERIC(10, 2) guarantees exact base-10 decimal accuracy.",
          codeSnippet: `price NUMERIC(12, 2) NOT NULL -- Up to 999,999,999.99 exact`,
        },
        {
          name: "Text: VARCHAR(n) vs TEXT",
          desc: "In PostgreSQL, VARCHAR(n) and TEXT share the exact same underlying storage engine. Use VARCHAR(n) only when an explicit business limit is required; otherwise, TEXT is standard.",
        },
        {
          name: "Dates: TIMESTAMPTZ",
          desc: "TIMESTAMP WITH TIME ZONE (TIMESTAMPTZ) stores timestamps converted to UTC and converts to the client's timezone on retrieval. Never use bare TIMESTAMP for multi-region systems.",
        },
      ],
    },
    part3: {
      title: "Deep Dive: UUIDs and TOAST Storage",
      deepDives: [
        {
          heading: "UUIDs vs Sequential Integers",
          content: "PostgreSQL supports native 128-bit UUIDs via the `uuid` data type (and `gen_random_uuid()` since v13). Unlike sequential IDs, UUIDs cannot be guessed by malicious users crawling your URLs.",
          bulletPoints: [
            "id UUID PRIMARY KEY DEFAULT gen_random_uuid()",
            "Prevents enumeration attacks (e.g. /invoices/101 vs /invoices/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d).",
            "Can be generated client-side before sending to the database.",
          ],
        },
      ],
    },
    part4: {
      title: "The Floating Point Currency Disaster",
      problem: "Storing financial currency in FLOAT or REAL.",
      badApproach: {
        title: "Using FLOAT for Prices",
        code: `CREATE TABLE accounts (\n  id SERIAL PRIMARY KEY,\n  balance FLOAT NOT NULL\n);\n-- After 10,000 micro-transactions:\n-- balance becomes 99.99999999999812 instead of 100.00!`,
        flaw: "IEEE-754 floating-point representation causes roundoff inaccuracies that ruin account audits and balance checks.",
      },
      betterApproach: {
        title: "Exact Arithmetic with NUMERIC(10, 2)",
        code: `CREATE TABLE accounts (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  balance NUMERIC(12, 2) NOT NULL DEFAULT 0.00\n);`,
        benefit: "Exact base-10 mathematics. 100.00 minus 0.01 is always precisely 99.99.",
      },
      whyItMatters: "Financial systems, inventory counts, and legal invoices require bit-perfect decimal accuracy.",
    },
    part5: {
      title: "Interactive Type Accuracy Simulation",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMONSTRATING FLOAT ROUNDING BUG VS EXACT NUMERIC MATH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. IEEE 754 Floating Point (like PostgreSQL FLOAT / DOUBLE PRECISION)
let floatBalance = 0.0;
for (let i = 0; i < 10; i++) {
  floatBalance += 0.1;
}

console.log("Float Sum of 0.1 ten times:", floatBalance);
console.log("Is floatBalance strictly 1.0?", floatBalance === 1.0 ? "YES" : "NO (Rounding error!)");

// 2. Exact Integer/Decimal Scaling (like PostgreSQL NUMERIC)
class ExactDecimal {
  constructor(cents) {
    this.cents = BigInt(cents);
  }
  add(otherDecimal) {
    return new ExactDecimal(this.cents + otherDecimal.cents);
  }
  toString() {
    return (Number(this.cents) / 100).toFixed(2);
  }
}

let numericBalance = new ExactDecimal(0);
const tenCents = new ExactDecimal(10); // 0.10

for (let i = 0; i < 10; i++) {
  numericBalance = numericBalance.add(tenCents);
}

console.log("\\nNumeric Sum of 0.10 ten times:", numericBalance.toString());
console.log("Exact base-10 result guaranteed!");
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "Which data type should you choose in PostgreSQL for storing product prices and customer invoice balances?",
        options: [
          "FLOAT4 / REAL",
          "DOUBLE PRECISION",
          "NUMERIC (or DECIMAL)",
          "VARCHAR(10)",
        ],
        correctIndex: 2,
        explanation: "NUMERIC (or DECIMAL) stores exact base-10 fractional values without binary rounding errors, making it mandatory for monetary amounts.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Exact Numbers", desc: "Always use NUMERIC/DECIMAL for monetary transactions." },
        { title: "Scale Primary Keys", desc: "Use BIGINT or UUID to avoid running out of IDs at scale." },
        { title: "Timezone Awareness", desc: "Always choose TIMESTAMPTZ to store timestamps normalized in UTC." },
      ],
    },
  },

  // =========================================================================
  // PG-04: Defining Tables: CREATE TABLE & Safe Alterations
  // =========================================================================
  "pg04-create-table-ddl": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Structural Blueprint",
      analogy: "Creating a table is like laying the steel-reinforced concrete foundation of a skyscraper. If you design the columns correctly from day one, you can add 50 stories with confidence.",
      diagram: `CREATE TABLE products (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku         VARCHAR(64) NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  price       NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);`,
      explanation: "Data Definition Language (DDL) commands such as `CREATE TABLE` and `ALTER TABLE` declare the structure of your database. In PostgreSQL, modern identity columns (`GENERATED ALWAYS AS IDENTITY`) replace legacy SERIAL columns.",
    },
    part2: {
      title: "Core DDL Directives",
      concepts: [
        {
          name: "Modern Identity Columns vs SERIAL",
          desc: "Legacy PostgreSQL used `SERIAL` (a macro over a sequence). SQL standard `GENERATED ALWAYS AS IDENTITY` prevents accidental manual insertion of duplicate IDs.",
          codeSnippet: `id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY`,
        },
        {
          name: "Default Values",
          desc: "Columns can specify `DEFAULT <expression>` so inserts that omit the column automatically receive timestamps or boolean flags.",
          codeSnippet: `created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        },
        {
          name: "Safe Alterations",
          desc: "Modifying production tables must be non-blocking. Adding a nullable column or a column with a constant default in PostgreSQL 11+ is instantaneous (O(1) metadata update).",
          codeSnippet: `ALTER TABLE products ADD COLUMN description TEXT;`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: Table Alteration Safety",
      deepDives: [
        {
          heading: "DDL Inside Transactions",
          content: "One of PostgreSQL's most celebrated features is transactional DDL! Unlike MySQL, running `CREATE TABLE`, `ALTER TABLE`, or `DROP TABLE` inside a `BEGIN ... COMMIT` block can be safely rolled back if an error occurs.",
          bulletPoints: [
            "BEGIN; ALTER TABLE users ADD COLUMN age INT; ROLLBACK; -- Reversible!",
            "Prevent full table rewrites by adding columns with DEFAULT NULL or constant defaults.",
            "Use DROP TABLE IF EXISTS to avoid script crashes during idempotent setup.",
          ],
        },
      ],
    },
    part4: {
      title: "Legacy SERIAL vs Modern SQL Standard Identity",
      problem: "Using legacy SERIAL columns that allow callers to silently override auto-increment values.",
      badApproach: {
        title: "Legacy SERIAL",
        code: `CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  total NUMERIC(10, 2)\n);\n-- If an application accidentally inserts id = 100, the sequence stays at 1,\n-- causing a duplicate key crash on the 100th normal insert!`,
        flaw: "SERIAL creates a disconnected sequence that doesn't strictly prevent caller overwrites.",
      },
      betterApproach: {
        title: "Standard Identity Columns",
        code: `CREATE TABLE orders (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  total NUMERIC(10, 2) NOT NULL\n);`,
        benefit: "PostgreSQL rejects any manual insert into 'id' unless the caller explicitly overrides with OVERRIDING SYSTEM VALUE.",
      },
      whyItMatters: "Prevents sequence desynchronization bugs in production environments.",
    },
    part5: {
      title: "Interactive DDL Schema Generator",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATING TABLE DEFINITION & COLUMN CHECKS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class TableSchema {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
    this.autoIncrement = 1;
    this.rows = [];
  }

  insert(data) {
    const row = {};
    for (const [colName, spec] of Object.entries(this.columns)) {
      if (spec.isIdentity) {
        row[colName] = this.autoIncrement++;
      } else if (data[colName] !== undefined) {
        row[colName] = data[colName];
      } else if (spec.default !== undefined) {
        row[colName] = typeof spec.default === "function" ? spec.default() : spec.default;
      } else if (spec.notNull) {
        throw new Error(\`Column '\${colName}' cannot be null\`);
      } else {
        row[colName] = null;
      }
    }
    this.rows.push(row);
    return row;
  }
}

const products = new TableSchema("products", {
  id: { isIdentity: true },
  title: { notNull: true },
  price: { notNull: true },
  is_active: { default: true }
});

console.log("Insert 1 (all specified):", products.insert({ title: "Keyboard", price: 89.99 }));
console.log("Insert 2 (default used):", products.insert({ title: "Mousepad", price: 19.99 }));
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "Why is `BIGINT GENERATED ALWAYS AS IDENTITY` preferred over `SERIAL` in modern PostgreSQL?",
        options: [
          "It uses less RAM than SERIAL",
          "It adheres to ANSI SQL standards and protects against unintended manual ID insertions",
          "It automatically indexes every column in the table",
          "It allows strings to be stored as numbers",
        ],
        correctIndex: 1,
        explanation: "Identity columns are the ANSI SQL standard way to create auto-generating keys and prevent callers from silently desynchronizing sequences.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Standard Identity", desc: "Use GENERATED ALWAYS AS IDENTITY for primary keys." },
        { title: "Transactional DDL", desc: "PostgreSQL table migrations can run safely inside transactions." },
        { title: "Explicit Defaults", desc: "Provide defaults like CURRENT_TIMESTAMP to keep inserts clean." },
      ],
    },
  },

  // =========================================================================
  // PG-05: Inserting & Reading Rows (INSERT INTO & SELECT)
  // =========================================================================
  "pg05-insert-and-select": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "Writing and Reading the Ledger",
      analogy: "Inserting is writing a new numbered receipt into the ledger book. Reading with SELECT is opening the ledger. If you ask for 'everything in every drawer' (SELECT *), you flood your desk with unnecessary clutter and slow down the office.",
      diagram: `[ Client Query ] ──> SELECT id, name, price FROM products WHERE is_active = true;
         │
         ▼
[ PostgreSQL Buffer Cache ]
         │
         ├── Filter: Evaluates WHERE condition row by row (or via Index)
         └── Projection: Extracts ONLY the requested columns (id, name, price)`,
      explanation: "CRUD begins with INSERT and SELECT. SELECT queries should specify explicit column projections rather than wildcard SELECT * to save network bandwidth and avoid breaking when columns change.",
    },
    part2: {
      title: "Core Query Syntax",
      concepts: [
        {
          name: "Batch INSERT INTO",
          desc: "You can insert multiple rows in a single SQL statement by comma-separating values tuples. This minimizes network roundtrips.",
          codeSnippet: `INSERT INTO products (title, price)\nVALUES \n  ('Mechanical Keyboard', 129.99),\n  ('Ergonomic Mouse', 59.99),\n  ('Desk Mat', 24.50);`,
        },
        {
          name: "Column Projection",
          desc: "Explicitly declaring columns (`SELECT title, price`) ensures predictable response payloads and enables index-only scans.",
          codeSnippet: `SELECT title, price FROM products;`,
        },
        {
          name: "Column Aliases (AS)",
          desc: "Rename computed expressions or column headers in the result set using the `AS` keyword.",
          codeSnippet: `SELECT title AS product_name, price * 1.15 AS price_with_tax FROM products;`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: The Cost of SELECT *",
      deepDives: [
        {
          heading: "Why SELECT * is Dangerous in Production",
          content: "SELECT * returns all columns including large JSONB documents, encrypted blobs, and internal metadata. When new columns are added via migrations, SELECT * increases payload sizes without warning and prevents database engines from utilizing lightweight index-only scans.",
          bulletPoints: [
            "Transfers megabytes of unnecessary data across the network.",
            "Defeats cover indexes (which contain only the requested columns).",
            "Can break application deserialization contracts if columns are reordered.",
          ],
        },
      ],
    },
    part4: {
      title: "Wildcard Querying vs Targeted Projection",
      problem: "Using SELECT * everywhere in production backend code.",
      badApproach: {
        title: "SELECT * Everywhere",
        code: `SELECT * FROM users WHERE status = 'active';\n-- Returns: id, email, password_hash, full_bio_text, avatar_blob, settings_json...\n-- All when only email and id were needed!`,
        flaw: "Wastes CPU, memory, and network throughput, and risks leaking sensitive columns (like password hashes).",
      },
      betterApproach: {
        title: "Explicit Projection",
        code: `SELECT id, email, created_at FROM users WHERE status = 'active';`,
        benefit: "Minimal memory footprint, maximum speed, and zero danger of leaking newly added sensitive columns.",
      },
      whyItMatters: "Production performance depends heavily on keeping network payloads lean.",
    },
    part5: {
      title: "Interactive SQL INSERT & SELECT Simulation",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATING SQL PROJECTIONS & RECORD FILTERING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const productsTable = [
  { id: 1, title: "4K Monitor", price: 349.99, is_active: true, internal_notes: "Supplier A" },
  { id: 2, title: "USB-C Cable", price: 14.99, is_active: true, internal_notes: "Supplier B" },
  { id: 3, title: "Old Webcam", price: 39.99, is_active: false, internal_notes: "Discontinued" }
];

// Equivalent to:
// SELECT id, title, price AS unit_price FROM products WHERE is_active = true;
function queryProducts(table) {
  return table
    .filter(row => row.is_active === true) // WHERE is_active = true
    .map(row => ({                          // SELECT id, title, price AS unit_price
      id: row.id,
      title: row.title,
      unit_price: row.price
      // Notice: internal_notes is NOT projected!
    }));
}

const results = queryProducts(productsTable);
console.log("Filtered & Projected Rows:", results);
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "Why should you avoid `SELECT *` in production application code?",
        options: [
          "PostgreSQL does not allow SELECT * in transactions",
          "It forces PostgreSQL to fetch all columns including heavy blobs, wasting bandwidth and blocking index-only scans",
          "SELECT * only works on tables with fewer than 10 rows",
          "It forces the query to return rows in reverse alphabetical order",
        ],
        correctIndex: 1,
        explanation: "SELECT * fetches all data from disk/buffers across the network, wasting memory and preventing PostgreSQL from executing index-only scans.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Batch Inserts", desc: "Insert multiple tuples at once to minimize network roundtrips." },
        { title: "Explicit Projection", desc: "Always name the exact columns your application needs." },
        { title: "Aliases for Clarity", desc: "Use AS to rename calculated expressions." },
      ],
    },
  },

  // =========================================================================
  // PG-06: Modifying & Deleting Data (UPDATE, DELETE & Safety Guards)
  // =========================================================================
  "pg06-update-and-delete": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Danger of the Missing WHERE Clause",
      analogy: "Running `UPDATE users SET is_active = false` without a `WHERE` clause is like an airline announcement saying 'Cancel all flights!' when only Flight 102 was delayed. If you omit WHERE, PostgreSQL loyally updates EVERY single row in the table!",
      diagram: `[ Unsafe Query ]  ──> UPDATE users SET balance = 0;   (EVERY user balance is wiped!)
[ Safe Query ]    ──> UPDATE users SET balance = 0 WHERE id = 42; (Only user 42 affected)`,
      explanation: "UPDATE and DELETE modify existing state. PostgreSQL enforces strict type checking during mutations, but relational SQL allows updates to affect 0, 1, or millions of rows depending entirely on your WHERE clause.",
    },
    part2: {
      title: "Safe Mutation Patterns",
      concepts: [
        {
          name: "Targeted UPDATE",
          desc: "Update specific columns on matched rows. Always include a WHERE clause unless you explicitly intend to modify the entire dataset.",
          codeSnippet: `UPDATE products \nSET price = price * 1.10, updated_at = CURRENT_TIMESTAMP \nWHERE category_id = 5;`,
        },
        {
          name: "Atomic In-Place Math",
          desc: "Never read a value to client memory just to add 1 and save it back (race condition!). Instead, perform the arithmetic directly in SQL.",
          codeSnippet: `UPDATE accounts SET balance = balance + 50.00 WHERE id = 101;`,
        },
        {
          name: "Safe DELETE vs Soft Delete",
          desc: "DELETE physically removes rows. Soft delete patterns set `deleted_at = CURRENT_TIMESTAMP` so records can be audited or recovered.",
          codeSnippet: `UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = 42;`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: PostgreSQL Dead Tuples & VACUUM",
      deepDives: [
        {
          heading: "How UPDATE and DELETE Work Under MVCC",
          content: "In PostgreSQL, an UPDATE doesn't overwrite bits on disk in-place! Because of Multi-Version Concurrency Control (MVCC), PostgreSQL writes a brand new version of the row and marks the old version as dead. DELETE simply marks the row as dead.",
          bulletPoints: [
            "Transactions reading old snapshots continue to see the old version undisturbed.",
            "Dead tuples are cleaned up asynchronously by PostgreSQL's background autovacuum daemon.",
            "Frequent heavy updates without proper vacuuming can cause table bloat.",
          ],
        },
      ],
    },
    part4: {
      title: "Client-Side Read-Modify-Write vs In-Database Atomic Math",
      problem: "Reading a counter into JavaScript and writing it back.",
      badApproach: {
        title: "Client Race Condition",
        code: `// JS Backend:\nconst user = await db.query("SELECT points FROM users WHERE id = 1");\nconst newPoints = user.points + 10;\nawait db.query("UPDATE users SET points = $1 WHERE id = 1", [newPoints]);\n// If two requests execute concurrently, one addition is silently lost!`,
        flaw: "Classic read-modify-write lost update concurrency bug.",
      },
      betterApproach: {
        title: "Atomic SQL Math",
        code: `UPDATE users SET points = points + 10 WHERE id = 1;`,
        benefit: "Atomic execution directly inside the PostgreSQL engine with row locking. Zero lost updates.",
      },
      whyItMatters: "High-traffic systems must push arithmetic into the database to prevent race conditions.",
    },
    part5: {
      title: "Interactive Atomic Update Simulation",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMONSTRATING ATOMIC IN-DATABASE UPDATE VS LOST UPDATE BUG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let databaseRow = { id: 1, inventory_count: 100 };

// 1. Simulating concurrent client read-modify-write (BUGGY):
let clientA_read = databaseRow.inventory_count;
let clientB_read = databaseRow.inventory_count;

// Client A buys 2 items:
clientA_read -= 2;
databaseRow.inventory_count = clientA_read; // 98

// Client B buys 3 items (using its stale read of 100):
clientB_read -= 3;
databaseRow.inventory_count = clientB_read; // 97! Lost Client A's purchase!
console.log("Buggy Client Result (should be 95):", databaseRow.inventory_count);

// 2. Simulating Atomic SQL: UPDATE items SET count = count - 2 WHERE id = 1;
databaseRow.inventory_count = 100;
function atomicDeduct(amount) {
  databaseRow.inventory_count -= amount; // Single atomic operation
}

atomicDeduct(2);
atomicDeduct(3);
console.log("Atomic In-Database Result:", databaseRow.inventory_count); // 95!
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "Why should you increment a counter with `UPDATE stats SET views = views + 1` instead of reading the value first in your backend code?",
        options: [
          "Because PostgreSQL does not support numeric additions in client code",
          "Because reading and writing back in client code causes race conditions and lost updates under concurrency",
          "Because SELECT queries are not allowed before UPDATE queries",
          "Because views cannot be incremented by more than 1",
        ],
        correctIndex: 1,
        explanation: "Executing the update directly in SQL guarantees atomic row-level locking, preventing two concurrent requests from overwriting each other's changes.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "WHERE Discipline", desc: "Never run UPDATE or DELETE without double-checking the WHERE predicate." },
        { title: "Atomic In-Place Math", desc: "Update numeric balances directly in SQL to prevent race conditions." },
        { title: "MVCC Architecture", desc: "Updates write new row versions; autovacuum cleans up dead tuples." },
      ],
    },
  },

  // =========================================================================
  // PG-07: PostgreSQL Superpower: The RETURNING Clause
  // =========================================================================
  "pg07-returning-clause": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Instant Receipt",
      analogy: "In other databases, depositing cash means making the deposit, waiting, and then asking the teller in a separate conversation: 'Can you look up my balance now?' PostgreSQL's RETURNING is like the ATM handing you a printed receipt with your updated balance the exact millisecond the cash enters the slot.",
      diagram: `[ INSERT INTO users (name, email) VALUES (...) RETURNING id, created_at; ]
                               │
                               ▼
        ┌──────────────────────────────────────────────┐
        │ 1. Inserts the row into table buffer         │
        │ 2. Generates auto-identity ID (e.g. 1042)    │
        │ 3. Instantly returns { id: 1042, created_at }│
        └──────────────────────────────────────────────┘
              (Zero second query roundtrip needed!)`,
      explanation: "PostgreSQL provides the `RETURNING` clause on `INSERT`, `UPDATE`, and `DELETE`. It returns the modified or generated data back to the client immediately in the same network roundtrip.",
    },
    part2: {
      title: "RETURNING in Action",
      concepts: [
        {
          name: "INSERT ... RETURNING",
          desc: "Retrieve auto-generated identity primary keys or default timestamps without issuing a secondary `SELECT currval()` query.",
          codeSnippet: `INSERT INTO users (email, name)\nVALUES ('jane@example.com', 'Jane')\nRETURNING id, created_at;`,
        },
        {
          name: "UPDATE ... RETURNING",
          desc: "Obtain the new modified state immediately to send back in your API response.",
          codeSnippet: `UPDATE products \nSET price = 49.99 \nWHERE id = 12 \nRETURNING id, title, price, updated_at;`,
        },
        {
          name: "DELETE ... RETURNING",
          desc: "Capture a full snapshot of the deleted record for archiving, audit logging, or notifying connected clients.",
          codeSnippet: `DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP RETURNING token, user_id;`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: Network Latency & Atomicity Savings",
      deepDives: [
        {
          heading: "Eliminating Multi-Trip Network Roundtrips",
          content: "In cloud architectures where the application server and PostgreSQL database have 5-15ms of network latency between them, eliminating an extra SELECT roundtrip cuts endpoint response times in half.",
          bulletPoints: [
            "Normal DB: INSERT (15ms) + SELECT last_id (15ms) = 30ms latency.",
            "PostgreSQL: INSERT ... RETURNING id = 15ms total.",
            "Eliminates race conditions where another client might have inserted in between.",
          ],
        },
      ],
    },
    part4: {
      title: "Two-Roundtrip Insert vs Single Atomic RETURNING",
      problem: "Writing two separate database queries just to get the inserted row's auto-generated ID.",
      badApproach: {
        title: "Two-Step Query Flow",
        code: `// Query 1:\nawait db.query("INSERT INTO orders (user_id, total) VALUES ($1, $2)", [1, 99.00]);\n// Query 2:\nconst lastOrder = await db.query("SELECT id FROM orders WHERE user_id = $1 ORDER BY id DESC LIMIT 1", [1]);\n// Danger: What if the user placed two orders simultaneously? Wrong ID!`,
        flaw: "Wastes network latency and introduces severe concurrency race conditions.",
      },
      betterApproach: {
        title: "Single Atomic RETURNING",
        code: `const result = await db.query(\n  "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id, created_at",\n  [1, 99.00]\n);\nconst newId = result.rows[0].id;`,
        benefit: "Instantaneous, 100% thread-safe, and half the network latency.",
      },
      whyItMatters: "RETURNING is one of the most productive features in PostgreSQL for backend developers.",
    },
    part5: {
      title: "Interactive RETURNING Clause Simulation",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATING PostgreSQL RETURNING CLAUSE BEHAVIOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class PostgresMock {
  constructor() {
    this.sequence = 100;
    this.orders = [];
  }

  insertOrder(userId, total, returningFields = []) {
    const newId = ++this.sequence;
    const row = {
      id: newId,
      user_id: userId,
      total: Number(total).toFixed(2),
      status: "pending",
      created_at: new Date().toISOString()
    };
    this.orders.push(row);

    // Apply RETURNING projection
    if (returningFields.length > 0) {
      const result = {};
      for (const field of returningFields) {
        result[field] = row[field];
      }
      return result;
    }
    return { rowCount: 1 };
  }
}

const db = new PostgresMock();
console.log("Executing: INSERT INTO orders ... RETURNING id, total, created_at;");
const returnedReceipt = db.insertOrder(42, 199.95, ["id", "total", "created_at"]);
console.log("Returned Payload:", returnedReceipt);
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "What is the primary benefit of using `RETURNING id` on an `INSERT` statement in PostgreSQL?",
        options: [
          "It automatically encrypts the primary key before returning it",
          "It provides the newly generated ID immediately in the same network roundtrip without a second query",
          "It forces the primary key to be a UUID instead of an integer",
          "It creates an index on the returned column automatically",
        ],
        correctIndex: 1,
        explanation: "RETURNING gives the caller the generated or updated columns in the same atomic operation, saving network latency and eliminating race conditions.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "One Roundtrip", desc: "Fetch generated keys and timestamps directly from writes." },
        { title: "Universal Clause", desc: "Works across INSERT, UPDATE, and DELETE." },
        { title: "Race Condition Proof", desc: "Guarantees you receive the exact row modified by your transaction." },
      ],
    },
  },

  // =========================================================================
  // PG-08: Filtering Rows: WHERE, Comparison & Logical Operators
  // =========================================================================
  "pg08-where-filtering-operators": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Sieve of Precision",
      analogy: "Filtering with WHERE is like a series of specialized mesh sieves. First sieve catches products over $50, second sieve filters for 'electronics', and third sieve excludes discontinued items. Only the items that pass all tests make it into your bowl.",
      diagram: `All Rows in Table (1,000,000 products)
             │
             ▼
[ WHERE price >= 50.00 AND category = 'audio' AND is_active = true ]
             │
             ▼
Filtered Results (142 matching rows)`,
      explanation: "The `WHERE` clause filters rows before aggregation or projection. It supports rich comparison operators (`=, <>, <, <=, >, >=`), set checks (`IN`), range checks (`BETWEEN`), and case-insensitive string matching (`ILIKE`).",
    },
    part2: {
      title: "Comparison & Pattern Matching",
      concepts: [
        {
          name: "Equality and Inequalities",
          desc: "In SQL, equality is `=`, not `==`. Inequality is `<>` or `!=`. Combine with `AND`, `OR`, and `NOT`.",
          codeSnippet: `SELECT * FROM orders WHERE status = 'shipped' AND total > 100.00;`,
        },
        {
          name: "IN and BETWEEN",
          desc: "Test membership in a set or an inclusive range cleanly without writing chained OR statements.",
          codeSnippet: `SELECT * FROM products \nWHERE category_id IN (1, 3, 5) \n  AND price BETWEEN 20.00 AND 100.00;`,
        },
        {
          name: "LIKE vs ILIKE",
          desc: "`LIKE` is case-sensitive. PostgreSQL provides `ILIKE` for convenient case-insensitive matching (`%` matches any characters, `_` matches one).",
          codeSnippet: `SELECT * FROM users WHERE email ILIKE '%@gmail.com';`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: Short-Circuiting and Operator Precedence",
      deepDives: [
        {
          heading: "Operator Precedence: AND Binds Tighter Than OR",
          content: "In SQL, `AND` takes precedence over `OR`! Writing `WHERE a OR b AND c` means `WHERE a OR (b AND c)`. Forgetting parentheses when mixing AND and OR is one of the most common sources of data security leaks.",
          bulletPoints: [
            "Always wrap OR conditions in parentheses: WHERE (role = 'admin' OR is_owner = true) AND organization_id = 5;",
            "Without parentheses, any user with role = 'admin' sees data from ALL organizations!",
          ],
        },
      ],
    },
    part4: {
      title: "The Missing Parentheses Security Hole",
      problem: "Mixing AND and OR without grouping parentheses in multi-tenant queries.",
      badApproach: {
        title: "Unparenthesized OR",
        code: `SELECT * FROM documents \nWHERE status = 'public' OR is_published = true AND tenant_id = 9;\n-- Evaluates as: status = 'public' OR (is_published = true AND tenant_id = 9)\n-- Disastrous leak: ANY public document from ANY tenant is returned!`,
        flaw: "SQL evaluates the AND first, allowing 'status = public' rows from other companies to leak through.",
      },
      betterApproach: {
        title: "Explicit Logical Grouping",
        code: `SELECT * FROM documents \nWHERE (status = 'public' OR is_published = true) \n  AND tenant_id = 9;`,
        benefit: "The tenant boundary (tenant_id = 9) is strictly enforced on all returned records.",
      },
      whyItMatters: "A single missing pair of parentheses can breach multi-tenant data boundaries.",
    },
    part5: {
      title: "Interactive Predicate Evaluator",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMONSTRATING AND/OR PRECEDENCE IN SQL FILTERING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const documents = [
  { id: 1, title: "Company 9 Policy", is_public: true, tenant_id: 9 },
  { id: 2, title: "Competitor Secret", is_public: true, tenant_id: 42 }, // SENSITIVE!
  { id: 3, title: "Company 9 Draft", is_public: false, tenant_id: 9 }
];

console.log("=== BAD QUERY: is_public OR draft AND tenant_id === 9 ===");
const badResults = documents.filter(d => 
  d.is_public || (!d.is_public && d.tenant_id === 9) // Notice competitor leaked!
);
console.log("Leaked Competitor Secret included:", badResults.map(d => d.title));

console.log("\\n=== SECURE QUERY: (is_public OR draft) AND tenant_id === 9 ===");
const secureResults = documents.filter(d => 
  (d.is_public || !d.is_public) && d.tenant_id === 9
);
console.log("Secure Tenant 9 records only:", secureResults.map(d => d.title));
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "How does SQL evaluate the expression: `WHERE a = 1 OR b = 2 AND c = 3`?",
        options: [
          "From left to right: `((a = 1 OR b = 2) AND c = 3)`",
          "AND takes precedence: `(a = 1) OR (b = 2 AND c = 3)`",
          "It throws a syntax error requiring parentheses",
          "OR always takes precedence over AND",
        ],
        correctIndex: 1,
        explanation: "In SQL standard precedence, AND binds tighter than OR, evaluating as `a = 1 OR (b = 2 AND c = 3)`. Always use parentheses when mixing them.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "Parentheses Rule", desc: "Always explicitly group OR clauses when combined with AND." },
        { title: "ILIKE Feature", desc: "Use ILIKE in PostgreSQL for case-insensitive text matching." },
        { title: "Clean Ranges", desc: "Use BETWEEN and IN for readable, performant filter checks." },
      ],
    },
  },

  // =========================================================================
  // PG-09: The Three-Valued Logic of NULL in SQL
  // =========================================================================
  "pg09-null-three-valued-logic": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Mystery Box (UNKNOWN)",
      analogy: "Think of NULL as a sealed mystery box with unknown contents. If you have two sealed mystery boxes, are their contents equal? You cannot say 'Yes', and you cannot say 'No'! The only truthful answer is: 'I don't know' (UNKNOWN).",
      diagram: `In JavaScript / Python:
  null === null  ──> TRUE

In SQL:
  NULL = NULL    ──> UNKNOWN (neither TRUE nor FALSE!)
  NULL <> NULL   ──> UNKNOWN

To check:
  column IS NULL      ──> TRUE if empty
  column IS NOT NULL  ──> TRUE if contains a value`,
      explanation: "SQL operates on Three-Valued Logic (3VL): `TRUE`, `FALSE`, and `UNKNOWN`. Because `NULL` represents the absence of a value or an unknown value, comparisons using standard operators like `=` or `<>` yield `UNKNOWN`. A `WHERE` clause only keeps rows where the condition evaluates to `TRUE`.",
    },
    part2: {
      title: "Navigating NULL Correctly",
      concepts: [
        {
          name: "IS NULL and IS NOT NULL",
          desc: "Never write `WHERE phone = NULL`. Always use `WHERE phone IS NULL` or `WHERE phone IS NOT NULL`.",
          codeSnippet: `SELECT * FROM users WHERE phone_number IS NULL;`,
        },
        {
          name: "COALESCE Fallbacks",
          desc: "`COALESCE(val1, val2, ...)` returns the first non-null argument. Essential for providing default fallback values.",
          codeSnippet: `SELECT name, COALESCE(display_name, name, 'Anonymous') AS user_title FROM users;`,
        },
        {
          name: "NULL in Aggregate Functions",
          desc: "Most aggregate functions (like `AVG`, `SUM`, `COUNT(column)`) completely ignore NULL values. However, `COUNT(*)` counts all rows regardless of NULLs.",
        },
      ],
    },
    part3: {
      title: "Deep Dive: The NOT IN (NULL) Trap",
      deepDives: [
        {
          heading: "The Dangerous NOT IN (NULL) Gotcha",
          content: "If a subquery returns even a single row with NULL, `WHERE id NOT IN (SELECT ...)` will return ZERO ROWS! Because `id NOT IN (1, 2, NULL)` expands to `id <> 1 AND id <> 2 AND id <> NULL`. Since `id <> NULL` is UNKNOWN, the entire condition evaluates to UNKNOWN and drops all rows.",
          bulletPoints: [
            "Use NOT EXISTS instead of NOT IN when dealing with potentially nullable foreign keys.",
            "Or filter out NULLs explicitly: WHERE id NOT IN (SELECT id FROM ... WHERE id IS NOT NULL).",
          ],
        },
      ],
    },
    part4: {
      title: "The NOT IN with Nullable Subquery Disaster",
      problem: "Using NOT IN against a subquery that contains a null record.",
      badApproach: {
        title: "NOT IN (Nullable Column)",
        code: `SELECT * FROM customers \nWHERE id NOT IN (SELECT customer_id FROM orders);\n-- If a single order has customer_id = NULL, this query returns ZERO customers,\n-- even if you have 10,000 customers who never ordered!`,
        flaw: "Three-valued logic turns the entire expression into UNKNOWN.",
      },
      betterApproach: {
        title: "Safe NOT EXISTS",
        code: `SELECT c.* \nFROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);`,
        benefit: "NOT EXISTS evaluates boolean presence cleanly and is completely unaffected by NULL values in other rows.",
      },
      whyItMatters: "A single null value in a column can silently break your reporting logic.",
    },
    part5: {
      title: "Interactive Three-Valued Logic Simulator",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMONSTRATING SQL THREE-VALUED LOGIC (TRUE, FALSE, UNKNOWN)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SQL_NULL = Symbol("NULL");

function sqlEquals(a, b) {
  if (a === SQL_NULL || b === SQL_NULL) return "UNKNOWN";
  return a === b ? "TRUE" : "FALSE";
}

function sqlWhereFilter(conditionResult) {
  // WHERE only passes if strictly TRUE (UNKNOWN is treated as false)
  return conditionResult === "TRUE";
}

console.log("5 = 5 is:", sqlEquals(5, 5));
console.log("5 = 10 is:", sqlEquals(5, 10));
console.log("NULL = NULL is:", sqlEquals(SQL_NULL, SQL_NULL)); // UNKNOWN!
console.log("NULL <> NULL is:", sqlEquals(SQL_NULL, SQL_NULL)); // UNKNOWN!

console.log("\\nTesting in WHERE clause filter:");
console.log("Does 'NULL = NULL' pass WHERE?", sqlWhereFilter(sqlEquals(SQL_NULL, SQL_NULL)) ? "PASSED" : "DROPPED (Rejected!)");
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "What does the SQL expression `SELECT * FROM users WHERE middle_name = NULL;` return?",
        options: [
          "All users whose middle_name is not filled in",
          "An empty result set (zero rows) because `= NULL` evaluates to UNKNOWN",
          "A syntax error because NULL cannot be written without quotes",
          "All users in the table",
        ],
        correctIndex: 1,
        explanation: "Comparisons with `= NULL` evaluate to UNKNOWN, which the WHERE clause drops. To find rows with missing values, you must use `middle_name IS NULL`.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "IS NULL Always", desc: "Never compare NULL with = or <>; use IS NULL and IS NOT NULL." },
        { title: "COALESCE Defaults", desc: "Use COALESCE to safely substitute default values for nulls." },
        { title: "NOT EXISTS over NOT IN", desc: "Prefer NOT EXISTS to avoid subquery null bugs." },
      ],
    },
  },

  // =========================================================================
  // PG-10: Ordering & Pagination: ORDER BY, LIMIT, OFFSET & Keyset
  // =========================================================================
  "pg10-ordering-and-pagination": {
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Book Index vs. Turning 100,000 Pages",
      analogy: "Pagination with `OFFSET 100000` is like an assistant who, to read page 1,001, opens the book and manually flips through every single page from 1 to 1,000 before reading page 1,001. Keyset pagination is like saying: 'Open directly to page bookmark ID 100000'.",
      diagram: `Offset Pagination (OFFSET 100000 LIMIT 10):
  [ Scans & Discards 100,000 rows ] ──> Takes 1,500ms (Heavy Disk/CPU!)

Keyset / Cursor Pagination (WHERE id > 100000 LIMIT 10):
  [ B-Tree Index Jumps Directly to 100001 ] ──> Takes 0.2ms (Instantaneous!)`,
      explanation: "Relational tables are unordered mathematical sets; without `ORDER BY`, PostgreSQL does not guarantee any specific row order. For pagination, offset pagination (`LIMIT / OFFSET`) is easy but slow at scale, while keyset pagination (`WHERE id > :last_id`) remains ultra-fast.",
    },
    part2: {
      title: "Sorting and Limiting",
      concepts: [
        {
          name: "Deterministic ORDER BY",
          desc: "Always sort by a unique tiebreaker (like `id`) if sorting by non-unique fields (like `created_at DESC`), otherwise page boundaries can duplicate or skip records.",
          codeSnippet: `SELECT * FROM orders ORDER BY created_at DESC, id DESC LIMIT 20;`,
        },
        {
          name: "Offset Pagination (LIMIT & OFFSET)",
          desc: "Standard for small datasets or admin dashboards. Returns `LIMIT` rows after skipping `OFFSET` rows.",
          codeSnippet: `SELECT * FROM products ORDER BY id ASC LIMIT 10 OFFSET 20; -- Page 3`,
        },
        {
          name: "Keyset / Cursor Pagination",
          desc: "Uses the last seen value as a seek filter. Uses an index scan to jump straight to the next page.",
          codeSnippet: `SELECT * FROM products \nWHERE id > 450 \nORDER BY id ASC \nLIMIT 10;`,
        },
      ],
    },
    part3: {
      title: "Deep Dive: Why High OFFSET Degrades Performance",
      deepDives: [
        {
          heading: "The O(N) Nature of OFFSET",
          content: "When PostgreSQL processes `OFFSET 50000 LIMIT 10`, it must retrieve and sort all 50,010 rows from disk/index, count past the first 50,000, throw them away, and return only the last 10. As OFFSET increases, query duration grows linearly.",
          bulletPoints: [
            "OFFSET 10: 0.1ms.",
            "OFFSET 1,000,000: 800ms+ (reads gigabytes of memory just to discard it).",
            "Data drift issue: If a new row is inserted while the user views page 2, page 3 shows duplicate rows.",
          ],
        },
      ],
    },
    part4: {
      title: "High Offset Pagination vs Keyset Cursor",
      problem: "Using `OFFSET 500000` on an infinite scroll mobile feed.",
      badApproach: {
        title: "Large OFFSET",
        code: `SELECT id, text, created_at \nFROM tweets \nORDER BY created_at DESC \nLIMIT 20 OFFSET 200000;\n-- Scans 200,020 rows just to return 20! Database CPU spikes to 100%!`,
        flaw: "Linear scan overhead and shifting page bugs during active inserts.",
      },
      betterApproach: {
        title: "Keyset Pagination with Indexed Seek",
        code: `SELECT id, text, created_at \nFROM tweets \nWHERE (created_at, id) < ('2026-03-01 12:00:00Z', 1042) \nORDER BY created_at DESC, id DESC \nLIMIT 20;`,
        benefit: "Executes in sub-millisecond time via a composite B-Tree index scan, regardless of whether you are on item 10 or item 10,000,000.",
      },
      whyItMatters: "Infinite scroll and high-volume APIs require keyset pagination to maintain constant response times.",
    },
    part5: {
      title: "Interactive Keyset vs Offset Comparison",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEMONSTRATING OFFSET COST VS KEYSET SEEK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Simulate 100,000 rows
const datasetSize = 100000;
const databaseRows = Array.from({ length: datasetSize }, (_, i) => ({
  id: i + 1,
  title: \`Item #\${i + 1}\`
}));

// 1. OFFSET SIMULATION: Must iterate through all skipped rows
function simulateOffset(targetPage, pageSize) {
  const offset = (targetPage - 1) * pageSize;
  let iterations = 0;
  for (let i = 0; i < offset + pageSize; i++) {
    iterations++; // Database works through every skipped row
  }
  return { page: targetPage, rowsExamined: iterations };
}

// 2. KEYSET SIMULATION: Jumps directly using ID
function simulateKeyset(lastSeenId, pageSize) {
  // B-tree index lookup: O(log N) jump directly
  const rowsExamined = pageSize; // Only inspects the requested batch
  return { lastSeenId, rowsExamined };
}

console.log("Offset at Page 5,000 (size 10):", simulateOffset(5000, 10));
console.log("Keyset seeking after ID 49990:", simulateKeyset(49990, 10));
`,
    },
    part6: {
      title: "Check Your Understanding",
      quiz: {
        question: "Why does `OFFSET 1000000 LIMIT 10` run slowly in relational databases?",
        options: [
          "Because PostgreSQL refuses to run any queries with numbers over 100,000",
          "Because the database must fetch, order, and discard 1,000,000 rows before returning the 10 requested",
          "Because LIMIT only works when combined with GROUP BY",
          "Because OFFSET disables all table indexes",
        ],
        correctIndex: 1,
        explanation: "The engine must evaluate and count through all skipped rows before producing the final slice. Keyset pagination solves this by filtering with `WHERE id > last_seen_id`.",
      },
    },
    part7: {
      title: "Key Takeaways",
      takeaways: [
        { title: "No Default Order", desc: "SQL tables are unordered sets; always use explicit ORDER BY." },
        { title: "Tiebreakers", desc: "Always include a unique tiebreaker column in ORDER BY." },
        { title: "Keyset Scalability", desc: "Use keyset/cursor pagination for infinite scroll and high-volume data." },
      ],
    },
  },
};

// Generate content for remaining lessons PG-11 to PG-29
const REMAINING_LESSON_STUBS: Record<string, Partial<PostgresqlLessonContent>> = {
  "pg11-primary-foreign-keys": {
    part1: {
      title: "The Relational Anchor",
      analogy: "A primary key is like a passport number (globally unique identity for one person). A foreign key is like a flight ticket showing the passport number of who owns the seat.",
      diagram: `users (id PK) <─────── orders (user_id FK)
1 "Alice"               101 user_id: 1 ($150)
2 "Bob"                 102 user_id: 1 ($45)`,
      explanation: "Foreign keys guarantee referential integrity at the engine level, making it physically impossible to create orphaned rows pointing to non-existent parent records.",
    },
    part4: {
      title: "Unenforced Soft Keys vs Foreign Key Constraints",
      problem: "Storing foreign IDs as raw integers without FOREIGN KEY REFERENCES.",
      badApproach: {
        title: "Raw Integers",
        code: `CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  user_id INT -- No foreign key constraint!\n);`,
        flaw: "If a user is deleted, their orders become orphaned ghosts pointing to nowhere.",
      },
      betterApproach: {
        title: "Strict Referential Constraint",
        code: `CREATE TABLE orders (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT\n);`,
        benefit: "PostgreSQL rejects any invalid user_id and blocks accidental deletion of users who own orders.",
      },
      whyItMatters: "Referential integrity is the core guarantee that separates a relational database from a flat file.",
    },
  },
  "pg12-inner-join-multi-table": {
    part1: {
      title: "The Matching Handshake",
      analogy: "An INNER JOIN is like matching puzzle pieces: it combines rows from two tables only where the foreign key and primary key match exactly.",
      diagram: `[ users ]              [ orders ]
id: 1 "Alice" ───────> user_id: 1, order: #101
id: 2 "Bob"   ───────> user_id: 2, order: #102
id: 3 "Charlie" (no orders -> excluded!)`,
      explanation: "INNER JOIN combines rows from two or more tables based on a join condition, returning only the intersection where matching pairs exist.",
    },
    part4: {
      title: "Multiple Queries in Loop vs Single Multi-Table Join",
      problem: "Fetching users then running 100 queries in a loop to fetch orders (N+1 problem).",
      badApproach: {
        title: "N+1 Query Loop",
        code: `const users = await db.query("SELECT * FROM users");\nfor (const u of users) {\n  u.orders = await db.query("SELECT * FROM orders WHERE user_id = " + u.id);\n}`,
        flaw: "101 network roundtrips slowing down the application.",
      },
      betterApproach: {
        title: "Single SQL INNER JOIN",
        code: `SELECT u.id, u.name, o.id AS order_id, o.total\nFROM users u\nINNER JOIN orders o ON o.user_id = u.id;`,
        benefit: "1 network roundtrip, executed via PostgreSQL's high-speed hash or merge join algorithms.",
      },
      whyItMatters: "Joins eliminate the N+1 query problem, making data retrieval orders of magnitude faster.",
    },
  },
  "pg13-outer-joins-left-right": {
    part1: {
      title: "The Inclusive Roll Call",
      analogy: "A LEFT JOIN is like calling roll call for all students in a class. Every student is listed, and for those who turned in their homework, their grades are shown. For those who didn't, their homework column shows NULL.",
      diagram: `[ users (LEFT) ]          [ orders (RIGHT) ]
Alice ───────────────────> Order #101 ($50)
Bob   ───────────────────> Order #102 ($80)
Charlie (no orders) ─────> NULL`,
      explanation: "LEFT JOIN preserves all rows from the left table regardless of whether a matching record exists on the right. Crucial for reporting and identifying inactive records.",
    },
    part4: {
      title: "Filtering Missing Children with LEFT JOIN IS NULL",
      problem: "Finding customers who have never made a single purchase.",
      badApproach: {
        title: "Slow In-Memory Matching",
        code: `// Fetching 100,000 users and 500,000 orders into server RAM and looping to compare.`,
        flaw: "Crashes node server memory and wastes CPU.",
      },
      betterApproach: {
        title: "LEFT JOIN ... WHERE right.id IS NULL",
        code: `SELECT u.id, u.name, u.email\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nWHERE o.id IS NULL;`,
        benefit: "Instantly executed inside PostgreSQL using optimized anti-join plans.",
      },
      whyItMatters: "Anti-joins (LEFT JOIN ... IS NULL) are standard for marketing re-engagement and orphan detection.",
    },
  },
  "pg14-modeling-cardinality": {
    part1: {
      title: "Cardinals and Junction Bridges",
      analogy: "One student has one locker (1-to-1). One teacher has many students (1-to-Many). Many students take many courses (Many-to-Many). You cannot put multiple course IDs in one cell, so you build a bridge table (Junction Table).",
      diagram: `[ students ]               [ enrollments (Junction) ]          [ courses ]
id: 101 "Sara"  <───────  student_id: 101, course_id: 1 ──────> id: 1 "Math"
                          student_id: 101, course_id: 2 ──────> id: 2 "Physics"`,
      explanation: "Relational modeling handles cardinality cleanly: 1-to-1 uses unique foreign keys, 1-to-Many uses a child foreign key, and Many-to-Many uses a dedicated junction (bridge) table with composite primary keys.",
    },
    part4: {
      title: "Comma-Separated String vs Proper Junction Table",
      problem: "Storing foreign keys in a comma-separated string.",
      badApproach: {
        title: "CSV Text String",
        code: `CREATE TABLE students (\n  id SERIAL PRIMARY KEY,\n  course_ids TEXT -- "1, 4, 12, 88"\n);`,
        flaw: "Cannot join, cannot index, cannot enforce foreign keys, and querying requires messy string parsing.",
      },
      betterApproach: {
        title: "Normalized Junction Table",
        code: `CREATE TABLE enrollments (\n  student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,\n  course_id BIGINT REFERENCES courses(id) ON DELETE RESTRICT,\n  enrolled_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (student_id, course_id)\n);`,
        benefit: "Full referential integrity, fast indexed joins, and prevention of duplicate enrollments.",
      },
      whyItMatters: "Never compromise relational structure by storing CSV lists in database text columns.",
    },
  },
  "pg15-aggregate-functions-group-by": {
    part1: {
      title: "The Financial Accountant",
      analogy: "Instead of examining 50,000 grocery store receipts individually, GROUP BY categorizes receipts into 'Produce', 'Dairy', and 'Bakery', while aggregate functions (SUM, AVG, COUNT) calculate the totals for each department.",
      diagram: `Orders (10,000 rows)
       │
       ▼
[ GROUP BY category ]
       ├── Electronics ──> COUNT(*): 450, SUM(total): $45,000
       ├── Apparel     ──> COUNT(*): 820, SUM(total): $24,600
       └── Books       ──> COUNT(*): 120, SUM(total): $1,440`,
      explanation: "Aggregate functions compute single summary values over sets of rows. `GROUP BY` splits the dataset into distinct subsets and applies the aggregations across each group.",
    },
    part4: {
      title: "Client-Side Processing vs In-Database GROUP BY",
      problem: "Downloading 1,000,000 rows to the backend server to calculate total sales.",
      badApproach: {
        title: "Fetching All Rows",
        code: `const orders = await db.query("SELECT total, category FROM orders");\nconst summary = orders.reduce(...);\n// Transferred 50MB of network data!`,
        flaw: "Overwhelms memory and networks.",
      },
      betterApproach: {
        title: "PostgreSQL Native Aggregation",
        code: `SELECT category, COUNT(*) AS count, SUM(total) AS total_revenue\nFROM orders\nGROUP BY category;`,
        benefit: "Transfers only 3 small summary rows across the network in milliseconds.",
      },
      whyItMatters: "Databases are heavily optimized engines built specifically for high-speed aggregation.",
    },
  },
  "pg16-having-vs-where": {
    part1: {
      title: "The Two-Stage Filter",
      analogy: "WHERE is the filter before grouping: 'Only inspect orders from 2026'. HAVING is the filter after grouping: 'Only show customer categories whose total spent exceeds $10,000'.",
      diagram: `1. Raw Rows
      │
2. WHERE clause (Filters individual rows)
      │
3. GROUP BY (Collapses rows into category buckets)
      │
4. HAVING clause (Filters category buckets by aggregate metrics)`,
      explanation: "Understanding query execution order is vital: WHERE filters rows before aggregation happens; HAVING filters aggregated group metrics calculated by GROUP BY.",
    },
    part4: {
      title: "Misusing HAVING for Row Filters",
      problem: "Filtering individual row attributes inside HAVING instead of WHERE.",
      badApproach: {
        title: "Filtering in HAVING",
        code: `SELECT user_id, COUNT(*) \nFROM orders \nGROUP BY user_id, status \nHAVING status = 'completed';`,
        flaw: "Forces PostgreSQL to group every status before discarding them.",
      },
      betterApproach: {
        title: "Filter Early with WHERE",
        code: `SELECT user_id, COUNT(*) \nFROM orders \nWHERE status = 'completed'\nGROUP BY user_id\nHAVING COUNT(*) >= 5;`,
        benefit: "Filters early using indexes in WHERE, only evaluating HAVING on qualifying groups.",
      },
      whyItMatters: "Filtering early with WHERE dramatically reduces data processing overhead.",
    },
  },
  "pg17-subqueries-and-ctes": {
    part1: {
      title: "The Step-by-Step Recipe",
      analogy: "Deeply nested subqueries are like nested parentheses in math that hurt your eyes. Common Table Expressions (CTEs with WITH) are like naming your intermediate steps in clean cooking recipes.",
      diagram: `WITH active_customers AS (
  SELECT id, email FROM users WHERE is_active = true
),
high_value_orders AS (
  SELECT user_id, SUM(total) AS total_spent 
  FROM orders 
  GROUP BY user_id 
  HAVING SUM(total) > 500
)
SELECT c.email, o.total_spent
FROM active_customers c
JOIN high_value_orders o ON o.user_id = c.id;`,
      explanation: "CTEs define named temporary result sets using the `WITH` clause. They make complex analytical queries readable, modular, and maintainable.",
    },
    part4: {
      title: "Unreadable Nested Subqueries vs Clean CTEs",
      problem: "Writing 4 levels of nested subqueries inside FROM and WHERE clauses.",
      badApproach: {
        title: "Nested Incomprehensible SQL",
        code: `SELECT * FROM (SELECT a, b, (SELECT AVG(x) FROM c WHERE ...) FROM (SELECT ... FROM ...) ...) ...`,
        flaw: "Impossible to debug, modify, or peer-review.",
      },
      betterApproach: {
        title: "Linear Modular CTEs",
        code: `WITH monthly_sales AS (\n  SELECT date_trunc('month', created_at) AS month, SUM(total) AS revenue\n  FROM orders GROUP BY 1\n),\ntop_months AS (\n  SELECT month, revenue FROM monthly_sales WHERE revenue > 10000\n)\nSELECT * FROM top_months;`,
        benefit: "Clear sequential data pipeline that any developer can understand and test step-by-step.",
      },
      whyItMatters: "Code readability in SQL is just as critical as in TypeScript or Python.",
    },
  },
  "pg18-window-functions": {
    part1: {
      title: "Looking Through the Window",
      analogy: "GROUP BY collapses multiple rows into a single row. A Window Function looks out a 'window' at surrounding rows to calculate ranks, running totals, or averages WITHOUT losing the original individual row identity!",
      diagram: `Employee | Dept | Salary | Dept Rank (DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC))
Alice    | Sales| $9,000 | 1
Bob      | Sales| $7,500 | 2
Charlie  | Dev  | $9,500 | 1
Diana    | Dev  | $8,000 | 2
(All 4 individual rows preserved!)`,
      explanation: "Window functions perform calculations across a set of rows related to the current row using the `OVER (PARTITION BY ... ORDER BY ...)` clause.",
    },
    part4: {
      title: "Self-Joins for Running Totals vs Window Functions",
      problem: "Using quadratic self-joins to calculate running cumulative totals.",
      badApproach: {
        title: "Quadratic Self-Join",
        code: `SELECT o1.id, o1.total, SUM(o2.total) \nFROM orders o1 \nJOIN orders o2 ON o2.id <= o1.id \nGROUP BY o1.id, o1.total;`,
        flaw: "O(N^2) complexity that grinds to a halt on a few thousand rows.",
      },
      betterApproach: {
        title: "Window Function Running Total",
        code: `SELECT id, total, \n       SUM(total) OVER (ORDER BY created_at ASC) AS running_balance\nFROM orders;`,
        benefit: "Calculated in a single linear O(N) pass across the dataset.",
      },
      whyItMatters: "Window functions unlock high-performance reporting without complex join hacks.",
    },
  },
  "pg19-upserts-on-conflict": {
    part1: {
      title: "Insert or Update Idempotence",
      analogy: "Imagine an automated hotel check-in kiosk: if the guest doesn't exist, it creates a new room key. If the guest already checked in, it updates their phone number instead of throwing an alarm and stopping.",
      diagram: `INSERT INTO customer_profiles (email, phone, logins)
VALUES ('alex@example.com', '555-0199', 1)
ON CONFLICT (email) 
DO UPDATE SET 
  phone = EXCLUDED.phone,
  logins = customer_profiles.logins + 1;`,
      explanation: "PostgreSQL's `ON CONFLICT` clause implements atomic, race-condition-free upserts. You can choose `DO NOTHING` to ignore duplicate conflicts or `DO UPDATE` using the `EXCLUDED` pseudo-table.",
    },
    part4: {
      title: "Non-Atomic Check-Then-Insert vs ON CONFLICT",
      problem: "Querying SELECT before INSERT in application code to avoid duplicates.",
      badApproach: {
        title: "Check-Then-Insert Race",
        code: `const exists = await db.query("SELECT id FROM users WHERE email = $1", [email]);\nif (!exists.rows.length) {\n  await db.query("INSERT INTO users (email) VALUES ($1)", [email]);\n}\n// Race condition: concurrent workers both see non-existence and both insert!`,
        flaw: "Throws duplicate key constraint errors under concurrent traffic.",
      },
      betterApproach: {
        title: "Atomic ON CONFLICT DO NOTHING",
        code: `INSERT INTO users (email, name)\nVALUES ($1, $2)\nON CONFLICT (email) DO NOTHING\nRETURNING id;`,
        benefit: "Atomic execution in a single engine operation without race conditions.",
      },
      whyItMatters: "Critical for idempotent webhook processing, user registration, and cache updates.",
    },
  },
  "pg20-normalization-1nf-2nf-3nf": {
    part1: {
      title: "The Single Source of Truth",
      analogy: "If a company changes its headquarters address, and that address is stored across 50,000 customer invoice rows, you have to update 50,000 cells. Normalization means storing the address ONCE in a company table and linking to it.",
      diagram: `Unnormalized (Anomalies!):
  orders: id, customer_name, customer_city, product_name, product_price

3NF Normalized (Clean!):
  customers: id, name, city
  products:  id, name, price
  orders:    id, customer_id, created_at
  order_items: order_id, product_id, quantity, snapshot_price`,
      explanation: "Database normalization organizes tables to minimize data redundancy and eliminate insertion, update, and deletion anomalies through 1NF (atomic values), 2NF (full key dependency), and 3NF (transitive dependency removal).",
    },
    part4: {
      title: "Duplicated Customer Data vs 3NF Separation",
      problem: "Duplicating customer profile info inside every order record.",
      badApproach: {
        title: "Redundant Table",
        code: `CREATE TABLE orders (\n  id SERIAL PRIMARY KEY,\n  customer_name TEXT,\n  customer_address TEXT,\n  customer_phone TEXT,\n  product_title TEXT\n);`,
        flaw: "Update anomaly: customer changes phone, old orders show outdated info or require massive bulk updates.",
      },
      betterApproach: {
        title: "Normalized 3NF Model",
        code: `CREATE TABLE customers (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE NOT NULL,\n  address TEXT NOT NULL\n);\n\nCREATE TABLE orders (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  customer_id BIGINT NOT NULL REFERENCES customers(id)\n);`,
        benefit: "Single source of truth. Customer data updates in one place cleanly.",
      },
      whyItMatters: "Normalization guarantees consistency across enterprise datasets.",
    },
  },
  "pg21-strategic-denormalization": {
    part1: {
      title: "The Immutable Historical Snapshot",
      analogy: "When you buy an apple for $1.50 today, your receipt must forever say $1.50—even if the store raises apple prices to $3.00 next week. Storing the price at the time of purchase is strategic denormalization.",
      diagram: `products:
  id: 10, title: "Wireless Headphones", current_price: $89.99

order_items (Historical Snapshot!):
  order_id: 1, product_id: 10, quantity: 1, unit_price_at_purchase: $79.99
  (Even if product price changes later, the invoice stays accurate!)`,
      explanation: "Strategic denormalization intentionally duplicates specific attributes (such as cached counters or historical price snapshots) to eliminate expensive joins and preserve audit immutability.",
    },
    part4: {
      title: "Dynamic Foreign Lookups for Invoices vs Immutable Snapshots",
      problem: "Looking up current product prices when viewing historical orders.",
      badApproach: {
        title: "Dynamic Price Lookup",
        code: `SELECT o.id, p.price \nFROM orders o \nJOIN order_items oi ON oi.order_id = o.id \nJOIN products p ON p.id = oi.product_id;`,
        flaw: "When products change price next year, old invoices display the wrong historical totals!",
      },
      betterApproach: {
        title: "Snapshot at Time of Purchase",
        code: `CREATE TABLE order_items (\n  order_id BIGINT REFERENCES orders(id),\n  product_id BIGINT REFERENCES products(id),\n  unit_price NUMERIC(10, 2) NOT NULL, -- Stored snapshot!\n  quantity INT NOT NULL\n);`,
        benefit: "Historical financial records remain immutable and accurate forever.",
      },
      whyItMatters: "Financial and audit requirements often require intentional snapshot denormalization.",
    },
  },
  "pg22-jsonb-semi-structured-data": {
    part1: {
      title: "The Chameleon Column",
      analogy: "Imagine an e-commerce catalog with 10,000 product categories: shoes have sizes, laptops have RAM/CPU specs, and shirts have fabric types. Creating 500 nullable relational columns is messy; PostgreSQL's JSONB column stores dynamic attributes cleanly in binary JSON.",
      diagram: `products table:
  id: 1 (BIGINT)
  sku: "TECH-101" (TEXT)
  price: 999.00 (NUMERIC)
  specs: { "ram": "16GB", "storage": "512GB", "ports": ["USB-C", "HDMI"] } (JSONB)`,
      explanation: "PostgreSQL provides `JSONB` (decomposed binary JSON). It supports indexing via GIN indexes, fast key lookups (`->, ->>`), existence checks (`?`), and containment queries (`@>`), giving you NoSQL flexibility inside relational tables.",
    },
    part4: {
      title: "Unstructured Dumping vs Balanced Relational + JSONB",
      problem: "Dumping entire user entities into a single JSONB column.",
      badApproach: {
        title: "Everything in JSONB",
        code: `CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  data JSONB -- Stores email, password, balances, foreign keys all in one blob!\n);`,
        flaw: "Loses foreign key integrity, column constraints, and relational type guarantees.",
      },
      betterApproach: {
        title: "Balanced Architecture",
        code: `CREATE TABLE users (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  email VARCHAR(255) NOT NULL UNIQUE,\n  balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,\n  preferences JSONB NOT NULL DEFAULT '{}' -- Dynamic UI theme/notification flags!\n);`,
        benefit: "Core business rules are guarded relationally, while volatile user flags stay flexible.",
      },
      whyItMatters: "Use relational columns for core structured data and JSONB for polymorphic or dynamic attributes.",
    },
  },
  "pg23-constraints-integrity": {
    part1: {
      title: "The Bouncer at the Database Door",
      analogy: "A CHECK constraint is like a height measurement bar at a roller coaster: 'You must be at least this tall to ride'. If data fails the rule, PostgreSQL physically refuses to let it enter.",
      diagram: `ALTER TABLE products ADD CONSTRAINT check_positive_price CHECK (price > 0);
ALTER TABLE users ADD CONSTRAINT check_valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');`,
      explanation: "Constraints (`CHECK`, `UNIQUE`, `NOT NULL`, and `FOREIGN KEY`) define database-level invariants. They prevent corrupted data from ever entering your persistent storage.",
    },
    part4: {
      title: "Unconstrained Numeric Columns vs CHECK Invariants",
      problem: "Allowing negative prices or negative inventory counts.",
      badApproach: {
        title: "Unchecked Table",
        code: `CREATE TABLE inventory (\n  product_id INT PRIMARY KEY,\n  stock INT -- Can become -50 if an application bug oversells!\n);`,
        flaw: "Application bugs lead to corrupt negative inventory counts.",
      },
      betterApproach: {
        title: "CHECK Constraint Guard",
        code: `CREATE TABLE inventory (\n  product_id BIGINT PRIMARY KEY,\n  stock INT NOT NULL CHECK (stock >= 0)\n);`,
        benefit: "PostgreSQL immediately throws an error if an update attempts to reduce stock below zero.",
      },
      whyItMatters: "Database invariants protect business assets from buggy frontend or backend code.",
    },
  },
  "pg24-foreign-key-referential-actions": {
    part1: {
      title: "The Domino Effect vs The Safeguard",
      analogy: "If a user deletes their account, what happens to their orders? With ON DELETE CASCADE, all their orders are automatically incinerated. With ON DELETE RESTRICT, PostgreSQL says: 'Stop! You cannot delete this user because financial tax law requires keeping their orders.'",
      diagram: `ON DELETE CASCADE:   Delete Parent  ──> Automatically Deletes All Children
ON DELETE RESTRICT:  Delete Parent  ──> BLOCKS deletion if any children exist!
ON DELETE SET NULL:  Delete Parent  ──> Sets child foreign key to NULL`,
      explanation: "Referential actions determine how PostgreSQL responds when a referenced parent row is deleted or updated. Choosing between `RESTRICT` and `CASCADE` prevents accidental catastrophic data destruction.",
    },
    part4: {
      title: "Accidental CASCADE on Critical Financial Records",
      problem: "Putting ON DELETE CASCADE on invoices or orders.",
      badApproach: {
        title: "Unsafe Cascade",
        code: `CREATE TABLE orders (\n  id BIGINT PRIMARY KEY,\n  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE\n);\n-- An admin deletes a spam user, and unintentionally erases $500,000 of sales history!`,
        flaw: "Accidental deletion of parent wipes out historical audit records.",
      },
      betterApproach: {
        title: "Safe RESTRICT on Core Business Entities",
        code: `CREATE TABLE orders (\n  id BIGINT PRIMARY KEY,\n  user_id BIGINT REFERENCES users(id) ON DELETE RESTRICT\n);`,
        benefit: "Prevents account deletion if orders exist, forcing soft-delete account deactivation instead.",
      },
      whyItMatters: "Never use CASCADE on legally mandated or financially sensitive records.",
    },
  },
  "pg25-transactions-acid-foundations": {
    part1: {
      title: "The All-or-Nothing Guarantee",
      analogy: "Transferring $100 from Account A to Account B requires two operations: subtract $100 from A, and add $100 to B. If the server crashes after step 1, the $100 evaporates into thin air! A transaction guarantees both steps succeed together or neither does.",
      diagram: `BEGIN;
  UPDATE accounts SET balance = balance - 100 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 100 WHERE id = 'B';
COMMIT;

(If power fails or an error occurs anywhere: ROLLBACK cancels everything!)`,
      explanation: "Transactions bundle multiple SQL operations into a single atomic execution unit using `BEGIN`, `COMMIT`, and `ROLLBACK`.",
    },
    part4: {
      title: "Unprotected Multi-Step Mutations vs Atomic Transactions",
      problem: "Executing related mutations without a transaction block.",
      badApproach: {
        title: "Individual Unwrapped Queries",
        code: `await db.query("UPDATE inventory SET stock = stock - 1 WHERE id = 1");\n// Network drops! Application crashes here!\nawait db.query("INSERT INTO orders (...) VALUES (...)");\n// Stock was deducted, but the order was never created!`,
        flaw: "Leaves the database in an inconsistent corrupted state.",
      },
      betterApproach: {
        title: "Atomic Transaction Block",
        code: `BEGIN;\nUPDATE inventory SET stock = stock - 1 WHERE id = 1;\nINSERT INTO orders (user_id, total) VALUES (42, 99.00);\nCOMMIT;`,
        benefit: "Both operations commit together atomically. If either fails, all mutations are rolled back.",
      },
      whyItMatters: "Transactions are non-negotiable for checkout flows, banking, and inventory integrity.",
    },
  },
  "pg26-isolation-levels-concurrency": {
    part1: {
      title: "The Soundproof Voting Booths",
      analogy: "Transaction isolation levels control how visible concurrent changes are to other running transactions. Higher isolation is like soundproofing the voting booths so other voters' actions cannot influence your choices.",
      diagram: `Read Committed (Default):
  Sees only committed rows. Successive queries in same transaction can see new commits.

Repeatable Read:
  Sees a frozen snapshot from transaction start. No non-repeatable reads.

Serializable:
  Guarantees execution equivalent to running transactions one-by-one sequentially.`,
      explanation: "PostgreSQL provides four ANSI isolation levels (Read Committed, Repeatable Read, Serializable). Use `SELECT ... FOR UPDATE` for explicit row locking when managing inventory checkout concurrency.",
    },
    part4: {
      title: "Overselling Under Concurrent Checkouts vs Row Locking",
      problem: "Two concurrent users purchasing the final available ticket.",
      badApproach: {
        title: "Unprotected Read & Update",
        code: `BEGIN;\nSELECT stock FROM concert_tickets WHERE id = 1; -- Both see stock = 1!\nUPDATE concert_tickets SET stock = stock - 1 WHERE id = 1;\nCOMMIT;\n-- Both succeed, ticket is oversold to 2 people!`,
        flaw: "Race condition during concurrent read-modify-write.",
      },
      betterApproach: {
        title: "SELECT FOR UPDATE Row Lock",
        code: `BEGIN;\nSELECT stock FROM concert_tickets WHERE id = 1 FOR UPDATE;\n-- Transaction 2 is BLOCKED until Transaction 1 finishes!\nUPDATE concert_tickets SET stock = stock - 1 WHERE id = 1;\nCOMMIT;`,
        benefit: "Acquires an exclusive row lock, eliminating race conditions completely.",
      },
      whyItMatters: "Row-level locking guarantees zero overselling during high-demand traffic spikes.",
    },
  },
  "pg27-indexes-btree-compound": {
    part1: {
      title: "The Textbook Index",
      analogy: "Reading a 1,000-page book without an index means scanning page by page from start to finish (Sequential Scan). The alphabetical index at the back lets you look up 'PostgreSQL' in 2 seconds (Index Scan).",
      diagram: `[ Table (1,000,000 rows) ] ──> Sequential Scan (1,000ms, O(N))

[ B-Tree Index ]           ──> Binary Search Tree (0.1ms, O(log N))
      ├── Root Node
      ├── Branch Nodes
      └── Leaf Nodes pointing directly to physical table heap blocks`,
      explanation: "Indexes are auxiliary search data structures (predominantly B-Trees in PostgreSQL) that allow the engine to locate matching rows in logarithmic time `O(log N)` without scanning the entire table.",
    },
    part4: {
      title: "Indexing Every Column vs Focused Compound Indexes",
      problem: "Creating 20 single-column indexes on a single table.",
      badApproach: {
        title: "Index Everything",
        code: `CREATE INDEX idx_1 ON orders(status);\nCREATE INDEX idx_2 ON orders(created_at);\nCREATE INDEX idx_3 ON orders(total);\nCREATE INDEX idx_4 ON orders(user_id);\n-- Table size doubles! Write throughput slows by 400%!`,
        flaw: "Every INSERT, UPDATE, and DELETE must modify all 20 indexes, crushing write throughput.",
      },
      betterApproach: {
        title: "Targeted Compound Index",
        code: `CREATE INDEX idx_orders_user_status_date \nON orders (user_id, status, created_at DESC);`,
        benefit: "Supports queries filtering by user_id and status while sorting by created_at in one compact index.",
      },
      whyItMatters: "Indexes accelerate reads but penalize writes. Craft indexes around actual production query patterns.",
    },
  },
  "pg28-explain-analyze-query-plans": {
    part1: {
      title: "The Engine's GPS Navigation",
      analogy: "Before a driver embarks on a journey, GPS evaluates highway vs backroad routes. PostgreSQL's Cost-Based Optimizer (CBO) evaluates table scans, index scans, and join algorithms before running your query. EXPLAIN lets you see the GPS route!",
      diagram: `SQL Query ──> [ Query Parser & Rewriter ]
                     │
                     ▼
             [ Cost-Based Optimizer ]
                     ├── Option A: Seq Scan (Cost: 15,400)
                     └── Option B: Index Scan (Cost: 8.2) ──> WINNER!
                     │
                     ▼
             [ Query Execution ]`,
      explanation: "`EXPLAIN` displays the execution plan generated by the optimizer. `EXPLAIN ANALYZE` actually executes the query, reporting real millisecond timings, row counts, and buffer hits.",
    },
    part4: {
      title: "Guessing Why Queries Are Slow vs EXPLAIN ANALYZE",
      problem: "Rewriting SQL queries blindly without reading the execution plan.",
      badApproach: {
        title: "Trial and Error Rewrites",
        code: `-- Trying random joins and subqueries hoping performance improves without checking where the bottleneck is.`,
        flaw: "Wastes engineering time without identifying whether the issue is a sequential scan or slow join.",
      },
      betterApproach: {
        title: "EXPLAIN (ANALYZE, BUFFERS)",
        code: `EXPLAIN (ANALYZE, BUFFERS) \nSELECT * FROM orders WHERE user_id = 9999 ORDER BY created_at DESC LIMIT 10;\n-- Reveals: Seq Scan on orders (cost=0.00..18450.00 rows=10 width=84) (actual time=45.12..45.12 rows=2 loops=1)\n-- Actionable diagnosis: Missing index on user_id!`,
        benefit: "Clear diagnostic proof showing exactly where the query spends its time.",
      },
      whyItMatters: "EXPLAIN ANALYZE is the definitive diagnostic tool for database performance optimization.",
    },
  },
  "pg29-debugging-production-best-practices": {
    part1: {
      title: "The Production Cockpit",
      analogy: "Flying a plane requires monitoring instruments: fuel, altitude, and engine temperatures. Running PostgreSQL in production requires monitoring connection pool limits, index health, and autovacuum performance.",
      diagram: `[ Applications ] ──> [ Connection Pooler (PgBouncer) ] ──> [ PostgreSQL Server ]
       1000 clients           Max 50 active connections            No CPU overload!`,
      explanation: "Production mastery involves understanding connection pool limits, indexing foreign keys, monitoring slow query logs (`pg_stat_statements`), and executing safe zero-downtime migrations.",
    },
    part4: {
      title: "Unbounded Connections vs Connection Pooling",
      problem: "Letting 500 serverless functions connect directly to PostgreSQL.",
      badApproach: {
        title: "Direct Unbounded Connections",
        code: `// 500 lambda instances each opening 5 connections = 2,500 active database processes!\n// Server crashes with "FATAL: sorry, too many clients already".`,
        flaw: "PostgreSQL forks a dedicated OS process per connection, exhausting memory and crashing the server.",
      },
      betterApproach: {
        title: "Connection Pooling with Pool Sizing",
        code: `// Pool size = (CPU cores * 2) + disk speed\n// Clients queue cleanly through a connection pooler without overloading the database.`,
        benefit: "Optimal throughput, zero connection exhaustion crashes, and stable memory usage.",
      },
      whyItMatters: "Connection pooling is mandatory for reliable PostgreSQL production deployments.",
    },
  },
};

export function getPostgresqlLessonContent(slug: string): PostgresqlLessonContent {
  const normalized = slug.toLowerCase();
  if (POSTGRESQL_LESSONS_CONTENT[normalized]) {
    return POSTGRESQL_LESSONS_CONTENT[normalized];
  }

  // Check if we have a stub
  if (REMAINING_LESSON_STUBS[normalized]) {
    const stub = REMAINING_LESSON_STUBS[normalized];
    return {
      sections: DEFAULT_SECTIONS,
      part1: stub.part1 || {
        title: "Mental Model",
        analogy: "Understand the core concept using a real-world metaphor.",
        diagram: "[ Relational Engine ] --> [ Structured Data ]",
        explanation: "PostgreSQL enforces relational integrity and efficient data access.",
      },
      part2: {
        title: "Core Technical Concepts",
        concepts: [
          {
            name: "Relational Rules",
            desc: "Understand how PostgreSQL stores, organizes, and protects this data.",
            codeSnippet: `-- Core SQL syntax\nSELECT * FROM table_name;`,
          },
          {
            name: "Engine Execution",
            desc: "How the database engine optimizes and executes operations on disk and in memory buffers.",
          },
        ],
      },
      part3: {
        title: "Deep Dive & Engine Behavior",
        deepDives: [
          {
            heading: "Technical Nuance",
            content: "Explore the internal mechanics of PostgreSQL for this topic, including transaction semantics and query planning.",
            bulletPoints: [
              "Adheres strictly to ACID guarantees and ANSI SQL standards.",
              "Executes via the cost-based optimizer for maximum performance.",
            ],
          },
        ],
      },
      part4: stub.part4 || {
        title: "Bad Design vs Better Design",
        problem: "Common mistakes made when designing or querying relational databases.",
        badApproach: {
          title: "Suboptimal Approach",
          code: "-- Inefficient query or unconstrained schema",
          flaw: "Causes performance degradation or potential data corruption.",
        },
        betterApproach: {
          title: "Production-Grade Approach",
          code: "-- Optimized relational SQL query with proper constraints",
          benefit: "Guarantees data integrity and optimal execution speed.",
        },
        whyItMatters: "Database decisions impact system stability and scalability.",
      },
      part5: {
        title: "Interactive Code Simulation",
        starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POSTGRESQL INTERACTIVE SIMULATION: ${slug.toUpperCase()}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

console.log("Simulating PostgreSQL execution for ${slug}...");
console.log("Database connection: READY");
console.log("Query plan cost: OPTIMAL");
console.log("Integrity checks: PASSED (100% compliant)");
`,
      },
      part6: {
        title: "Check Your Understanding",
        quiz: {
          question: `What is the primary best practice emphasized in ${slug}?`,
          options: [
            "Rely on client-side code instead of database rules",
            "Enforce constraints and design queries around relational indexes and execution plans",
            "Store all data in a single unindexed table",
            "Disable transactions to increase speed",
          ],
          correctIndex: 1,
          explanation: "PostgreSQL excels when you leverage its native relational constraints, indexes, and optimizer.",
        },
      },
      part7: {
        title: "Key Takeaways",
        takeaways: [
          { title: "Relational Design", desc: "Always guard business invariants at the database engine boundary." },
          { title: "Query Performance", desc: "Use indexes, projections, and execution plans to keep queries fast." },
          { title: "Production Stability", desc: "Follow best practices to ensure scalable, zero-downtime operation." },
        ],
      },
    };
  }

  // Fallback default
  return POSTGRESQL_LESSONS_CONTENT["pg01-what-is-postgresql"];
}
