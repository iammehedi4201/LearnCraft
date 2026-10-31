import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg21DatabaseRolesAndPermissionsContent: StandardLessonContent = {
  slug: "pg21-database-roles-and-permissions",
  code: "PG-21",
  title: "Database Roles and Permissions",
  subtitle: "Apply the principle of least privilege using PostgreSQL roles, schemas, and granular GRANT privileges.",
  difficulty: "Moderate",
  scenario: {
    question: "A reporting service only needs to read data. Should it use a database superuser account?",
    answer: "No. Give it a role with only the permissions it needs, such as permission to connect and read the required tables.",
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
    title: "Database Roles and Permissions",
    bigPicture:
      "A database role represents a user or a group of permissions. Give each application or person only the access it needs.",
    codeSnippet: `CREATE ROLE app_reader LOGIN PASSWORD 'use-a-secret-from-a-safe-place';

GRANT CONNECT ON DATABASE shop TO app_reader;
GRANT USAGE ON SCHEMA public TO app_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_reader;`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. CREATE ROLE ... LOGIN",
        desc: "Creates a new database identity with authentication credentials able to establish client connections.",
      },
      {
        title: "2. GRANT CONNECT",
        desc: "Authorizes the role to connect to the specific `shop` database.",
      },
      {
        title: "3. GRANT USAGE ON SCHEMA",
        desc: "Allows the role to look up and reference objects within the `public` schema.",
      },
      {
        title: "4. GRANT SELECT",
        desc: "Grants read-only permission across tables without granting mutation privileges like INSERT, UPDATE, or DROP.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Granting application servers full superuser permissions means that any software vulnerability or misconfiguration can drop tables, alter schemas, or read private keys.",
    rule: {
      title: "Principle of Least Privilege Rule",
      content:
        "Never connect production applications using the `postgres` superuser account. Create dedicated roles for each service and grant only the minimal privileges required (`SELECT`, `INSERT`, `UPDATE`).",
    },
    cards: [
      {
        number: "01",
        tag: "LEAST PRIVILEGE",
        title: "Granular Permissions",
        description:
          "Grant specific actions (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) only on the specific tables the application service actually uses.",
        color: "purple",
      },
      {
        number: "02",
        tag: "READ-ONLY",
        title: "Reporting Roles",
        description:
          "Analytics workers and replica connections should connect using a read-only role (`GRANT SELECT`) to eliminate the risk of accidental writes.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "DDL PROTECTION",
        title: "Restricting DDL",
        description:
          "Application runtime users should never have permission to execute DDL (`DROP TABLE`, `ALTER TABLE`). Reserve DDL for automated migration pipelines.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Examine role segregation across production web services, background workers, and business intelligence dashboards.",
    points: [
      {
        title: "Read-Only Analytics Dashboards",
        content:
          "Connecting tools like Metabase or Tableau with `app_reader` guarantees that an analyst's custom SQL query can never accidentally truncate or update a production table.",
      },
      {
        title: "Default Privileges for Future Tables",
        content:
          "`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO app_reader;` ensures newly created tables automatically inherit read permissions.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Connecting web applications and analytics tools using the 'postgres' superuser account.",
    badApproach: {
      title: "Using Superuser Everywhere",
      code: `-- Flawed connection string:
DATABASE_URL="postgresql://postgres:rootpassword@db.production:5432/shop"

-- If a reporting query or SQL injection occurs:
DROP TABLE orders; -- Succeeds without restriction!`,
      flaw: "Superusers bypass all permissions and row security checks, leaving the entire database vulnerable to catastrophic failure.",
    },
    betterApproach: {
      title: "Dedicated Restricted Application Roles",
      code: `CREATE ROLE store_app_user LOGIN PASSWORD 'secure-secret';

GRANT CONNECT ON DATABASE shop TO store_app_user;
GRANT USAGE ON SCHEMA public TO store_app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO store_app_user;
-- Cannot DROP tables, cannot ALTER schemas, cannot read other databases!`,
      benefit: "Safely restricts the application to its designated table operational boundary.",
    },
    whyItMatters:
      "Role-based access control minimizes damage from compromised credentials, zero-day vulnerabilities, and human error.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Explore role creation and privilege grants:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

-- Inspect current user and session details:
SELECT current_user, session_user, current_database();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which PostgreSQL command gives a role permission to read data from a table?",
      options: [
        "PERMIT READ",
        "GRANT SELECT",
        "ALLOW ACCESS",
        "ENABLE QUERY",
      ],
      correctIndex: 1,
      explanation:
        "The GRANT SELECT statement authorizes a role to execute SELECT queries on the specified table or schema.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Least Privilege",
        desc: "Give every application role only the minimal permissions it needs to perform its job.",
      },
      {
        title: "Never Use Superuser in Apps",
        desc: "Do not connect production applications or analytics tools using the superuser account.",
      },
      {
        title: "Roles and Grants",
        desc: "Use `CREATE ROLE` to define identities and `GRANT` to allocate specific table privileges.",
      },
    ],
  },
};

