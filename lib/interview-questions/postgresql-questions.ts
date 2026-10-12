import { InterviewQuestion } from "@/types/interview";

export const POSTGRESQL_QUESTIONS: InterviewQuestion[] = [
  {
    id: "pg-q01",
    trackKey: "postgresql",
    category: "Indexing & Query Performance",
    subtopic: "B-Tree Indexes",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "How do B-Tree indexes work in PostgreSQL? When does Postgres ignore an index and perform a Sequential Scan?",
    answer: `### Simple answer:
A B-Tree (Balanced Tree) index keeps database keys sorted in a tree structure, allowing PostgreSQL to locate rows quickly in $O(\\log N)$ time instead of scanning the entire table from top to bottom.

### When Postgres Ignores an Index:
1. **Low Cardinality / Small Table:** If a table has only a few hundred rows, reading the entire table sequentially in memory is faster than loading both the index pages and table heap pages.
2. **High Selectivity Threshold:** If a query returns >15-20% of the entire table rows, sequential disk reads are more efficient than random disk seeks jumping through the index.
3. **Wrapping Columns in Functions:**
   \`\`\`sql
   -- BAD: Index on created_at is ignored!
   SELECT * FROM users WHERE DATE(created_at) = '2026-01-01';

   -- GOOD: Range query uses index
   SELECT * FROM users WHERE created_at >= '2026-01-01' AND created_at < '2026-01-02';
   \`\`\`
4. **Leading Wildcard LIKE:** \`WHERE name LIKE '%smith'\` cannot traverse standard B-Tree index roots (requires a trigram GIN index).
5. **Stale Statistics:** If \`ANALYZE\` hasn't run recently, the query planner may misestimate row counts.

### Interview answer:
B-Tree indexes sort column keys in a balanced tree for logarithmic lookups. Postgres deliberately chooses a Sequential Scan over an index when tables are small, when queries return a large percentage of table rows, or when column names are wrapped inside functions in the WHERE clause.`,
    followUps: [
      "What is the difference between EXPLAIN and EXPLAIN ANALYZE?",
      "When should you use a GIN or GiST index over B-Tree?",
      "What is an Index-Only Scan in Postgres?"
    ],
    keyPoints: [
      "B-Tree provides O(log n) lookups for equality and ranges",
      "Planner prefers Seq Scan if result set exceeds ~15% of table or table is tiny",
      "Functions on indexed columns prevent B-Tree usage unless expression index is created",
      "Leading wildcard searches cannot utilize standard B-Tree root traversal"
    ],
    tags: ["postgresql", "indexing", "b-tree", "performance", "sql"],
    relatedLessonSlug: "/learn/postgresql/pg04-indexes-and-query-optimization",
    relatedLessonName: "PG-04: B-Tree Indexes & Query Planner Optimization"
  },
  {
    id: "pg-q02",
    trackKey: "postgresql",
    category: "Transactions & Concurrency",
    subtopic: "ACID & Isolation",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "Explain ACID properties and the 4 ANSI SQL Transaction Isolation Levels in PostgreSQL.",
    answer: `### Simple answer:
**ACID** guarantees that database transactions are executed reliably:
- **Atomicity:** All operations succeed, or the entire transaction rolls back ("all or nothing").
- **Consistency:** Transactions preserve schema rules, foreign keys, and unique constraints.
- **Isolation:** Concurrent transactions execute without seeing each other's uncommitted changes.
- **Durability:** Once committed, changes survive power outages or crashes (via Write-Ahead Logging / WAL).

### Isolation Levels (and Anomalies Prevented):
| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Serialization Anomaly |
|---|---|---|---|---|
| **Read Uncommitted** (Postgres treats as Read Committed) | ❌ Prevented in PG | Allowed | Allowed | Allowed |
| **Read Committed** (Postgres default) | ❌ Prevented | Allowed | Allowed | Allowed |
| **Repeatable Read** (Uses MVCC snapshot) | ❌ Prevented | ❌ Prevented | ❌ Prevented in PG | Allowed |
| **Serializable** (Strict serial execution guarantee) | ❌ Prevented | ❌ Prevented | ❌ Prevented | ❌ Prevented |

Postgres uses **MVCC (Multi-Version Concurrency Control)**: readers never block writers, and writers never block readers.

### Interview answer:
ACID guarantees transaction reliability: Atomicity (all or nothing), Consistency (valid schema state), Isolation (independent concurrent execution), and Durability (WAL persistence). PostgreSQL defaults to Read Committed isolation using MVCC, meaning queries see only committed data without locks blocking readers.`,
    followUps: [
      "How does MVCC handle UPDATE operations under the hood (xmin, xmax)?",
      "What is VACUUM in Postgres and why is auto-vacuum essential?",
      "What is the difference between optimistic concurrency control and pessimistic locking (SELECT FOR UPDATE)?"
    ],
    keyPoints: [
      "PostgreSQL default isolation level is Read Committed",
      "Postgres uses MVCC snapshots where readers do not lock writers",
      "Repeatable Read takes a snapshot at transaction start",
      "Serializable uses SSI (Serializable Snapshot Isolation) to detect dependency cycles"
    ],
    tags: ["postgresql", "acid", "transactions", "isolation-levels", "mvcc"],
    relatedLessonSlug: "/learn/postgresql/pg06-transactions-acid-isolation",
    relatedLessonName: "PG-06: ACID Transactions & MVCC Isolation Levels"
  },
  {
    id: "pg-q03",
    trackKey: "postgresql",
    category: "Fundamentals",
    subtopic: "PostgreSQL vs MySQL",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is PostgreSQL, and how does it compare to MySQL?",
    answer: `### Simple answer:
PostgreSQL is a powerful, open-source object-relational database management system (ORDBMS) known for strict SQL standards compliance, extensibility, and advanced data types.

### Key Differences:
- **Data Types & Features:** PostgreSQL natively supports rich data types like JSONB, Arrays, UUIDs, Ranges, and GIS coordinates (PostGIS). MySQL is historically simpler.
- **ACID & Concurrency:** PostgreSQL has advanced MVCC implementation and supports full transactional DDL (e.g. you can rollback a \`CREATE TABLE\` or \`ALTER TABLE\`!).
- **Extensibility:** PostgreSQL allows custom data types, functions in multiple languages (PL/pgSQL, Python), and community extensions.
- **Performance:** MySQL is traditionally popular for read-heavy web apps; PostgreSQL excels in complex queries, joins, and high-concurrency writes.

### Interview answer:
PostgreSQL is an advanced object-relational database known for strict standards compliance, robust ACID reliability with transactional DDL, native JSONB support, and powerful extensions like PostGIS. It is the preferred choice for applications with complex queries and demanding data modeling needs.`,
    followUps: [
      "What is Transactional DDL in PostgreSQL?",
      "What is the PostGIS extension?",
      "Why is PostgreSQL called an Object-Relational database?"
    ],
    keyPoints: [
      "Open-source object-relational database with strong SQL compliance",
      "Transactional DDL allows rolling back schema changes",
      "Rich native types: JSONB, Arrays, UUID, Range types",
      "Highly extensible architecture with community extensions"
    ],
    tags: ["postgresql", "rdbms", "database-comparison", "fundamentals"],
    relatedLessonSlug: "/learn/postgresql/pg01-what-is-postgresql",
    relatedLessonName: "PG-01: PostgreSQL Architecture & Relational Modeling"
  },
  {
    id: "pg-q04",
    trackKey: "postgresql",
    category: "Data Modeling",
    subtopic: "Keys and Constraints",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Primary Keys and Foreign Keys in PostgreSQL, and what do `CASCADE` delete actions do?",
    answer: `### Simple answer:
- **Primary Key (PK):** A column (or set of columns) that **uniquely identifies** each row in a table. It cannot be null and must be unique.
- **Foreign Key (FK):** A column that references a Primary Key in another table, enforcing **referential integrity** between related data.

### Referential Action: \`ON DELETE CASCADE\`
When a referenced row in the parent table is deleted:
- **\`ON DELETE CASCADE\`:** Automatically deletes all related child rows in this table.
- **\`ON DELETE RESTRICT\` / \`NO ACTION\` (Default):** Rejects the deletion if related child rows exist.
- **\`ON DELETE SET NULL\`:** Sets the foreign key column to \`NULL\` in child rows.

### Example:
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL
);
\`\`\`

### Interview answer:
A Primary Key uniquely identifies rows within a table and cannot be null. A Foreign Key references a primary key in another table to enforce referential integrity. Setting \`ON DELETE CASCADE\` automatically removes dependent child records whenever the parent record is deleted.`,
    followUps: [
      "What is a Composite Primary Key?",
      "Why should Foreign Key columns almost always have an index in PostgreSQL?",
      "What is the difference between UNIQUE constraint and PRIMARY KEY?"
    ],
    keyPoints: [
      "Primary Key enforces uniqueness and non-nullability",
      "Foreign Key establishes relational links between tables",
      "ON DELETE CASCADE deletes related records automatically",
      "Foreign keys do NOT automatically create indexes in Postgres; index them manually"
    ],
    tags: ["primary-key", "foreign-key", "constraints", "cascade", "sql"],
    relatedLessonSlug: "/learn/postgresql/pg02-tables-keys-and-constraints",
    relatedLessonName: "PG-02: Tables, Primary Keys & Foreign Key Constraints"
  },
  {
    id: "pg-q05",
    trackKey: "postgresql",
    category: "SQL Queries",
    subtopic: "Joins",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "Explain the differences between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with examples.",
    answer: `### Simple answer:
SQL Joins combine columns from two tables based on a related column between them:

- **\`INNER JOIN\`**: Returns only rows that have matching values in **both** tables.
- **\`LEFT JOIN\` (LEFT OUTER JOIN)**: Returns **all rows from the left table**, plus matched rows from the right table (unmatched columns are \`NULL\`).
- **\`RIGHT JOIN\`**: Returns **all rows from the right table**, plus matched rows from the left table.
- **\`FULL OUTER JOIN\`**: Returns **all rows when there is a match in either** left or right table.

### Example:
\`\`\`sql
-- INNER JOIN: Only users who have written at least one post
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;

-- LEFT JOIN: All users, including those with 0 posts (p.title will be NULL)
SELECT u.name, p.title
FROM users u
LEFT JOIN posts p ON u.id = p.user_id;
\`\`\`

### Interview answer:
\`INNER JOIN\` returns only rows with matches in both tables. \`LEFT JOIN\` returns all rows from the left table and matching rows from the right (filling non-matches with \`NULL\`). \`FULL OUTER JOIN\` returns all rows from both tables, filling missing matches with \`NULL\`.`,
    followUps: [
      "What is a CROSS JOIN (Cartesian product)?",
      "How does PostgreSQL optimize joins (Hash Join, Merge Join, Nested Loop)?",
      "What is a self-join?"
    ],
    keyPoints: [
      "INNER JOIN: intersection of matching rows",
      "LEFT JOIN: all left rows + matched right rows",
      "FULL JOIN: union of all rows from both tables",
      "Unmatched rows in outer joins populate with NULL"
    ],
    tags: ["joins", "sql", "inner-join", "left-join", "queries"],
    relatedLessonSlug: "/learn/postgresql/pg03-joins-and-aggregations",
    relatedLessonName: "PG-03: Relational Joins & Set Operations"
  },
  {
    id: "pg-q06",
    trackKey: "postgresql",
    category: "SQL Queries",
    subtopic: "Aggregation",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between the `WHERE` clause and the `HAVING` clause in SQL?",
    answer: `### Simple answer:
- **\`WHERE\`**: Filters individual rows **before** any aggregation happens.
- **\`HAVING\`**: Filters summary groups **after** \`GROUP BY\` aggregation calculations are made.

### Why \`WHERE\` cannot filter aggregated values:
Because the \`WHERE\` clause executes before rows are grouped, it cannot see aggregated functions like \`COUNT()\`, \`SUM()\`, or \`AVG()\`.

### Example:
\`\`\`sql
-- Find departments where the AVERAGE salary is greater than $80,000,
-- but only consider active employees:
SELECT department, AVG(salary) as avg_sal
FROM employees
WHERE status = 'active'         -- Filters individual rows BEFORE grouping
GROUP BY department
HAVING AVG(salary) > 80000;    -- Filters aggregated groups AFTER calculation
\`\`\`

### SQL Execution Order:
\`FROM\` -> \`WHERE\` -> \`GROUP BY\` -> \`HAVING\` -> \`SELECT\` -> \`ORDER BY\` -> \`LIMIT\`.

### Interview answer:
\`WHERE\` filters individual rows before grouping, and cannot use aggregate functions like \`COUNT\` or \`AVG\`. \`HAVING\` filters aggregated groups after the \`GROUP BY\` clause has calculated group summaries.`,
    followUps: [
      "What is the SQL query logical execution order?",
      "Can a query have both a WHERE and a HAVING clause?",
      "Can you filter by non-aggregate columns in HAVING?"
    ],
    keyPoints: [
      "WHERE filters individual records prior to aggregation",
      "HAVING filters calculated group records post-aggregation",
      "Aggregate functions (COUNT, SUM, AVG) cannot be used in WHERE",
      "Execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT"
    ],
    tags: ["where", "having", "group-by", "aggregations", "sql"],
    relatedLessonSlug: "/learn/postgresql/pg03-joins-and-aggregations",
    relatedLessonName: "PG-03: Relational Joins & Set Operations"
  },
  {
    id: "pg-q07",
    trackKey: "postgresql",
    category: "Database Design",
    subtopic: "Normalization",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "Explain Database Normalization (1NF, 2NF, 3NF). When would you deliberately denormalize data?",
    answer: `### Simple answer:
Normalization is the process of organizing relational database tables to reduce data redundancy and eliminate insert, update, and delete anomalies.

### Normal Forms:
1. **1NF (First Normal Form):** Every column contains atomic (indivisible) values, and each record is unique. No repeating groups or arrays stored as comma-separated strings.
2. **2NF (Second Normal Form):** Meets 1NF, and all non-key columns depend on the **entire** primary key (eliminates partial key dependencies on composite keys).
3. **3NF (Third Normal Form):** Meets 2NF, and no non-key column depends on another non-key column (eliminates **transitive dependencies**).

### When to Denormalize:
Normalization requires many table \`JOIN\` operations, which can become expensive at scale. You denormalize (duplicating certain data intentionally):
- In **Read-Heavy systems** (dashboards, e-commerce product listings) to avoid joining 6 tables on every page view.
- In **Data Warehouses / Analytics** (OLAP) using Star Schemas.
- For **immutable historical snapshots** (e.g. copying product price and shipping address directly into the \`orders\` table so future price changes don't corrupt past receipts).

### Interview answer:
Normalization (1NF: atomic values, 2NF: full key dependency, 3NF: no transitive dependencies) minimizes duplicate data and prevents anomalies. Developers intentionally denormalize in read-heavy applications and historical records to avoid expensive multi-table joins and improve read performance.`,
    followUps: [
      "What is Boyce-Codd Normal Form (BCNF)?",
      "What are Update Anomalies in unnormalized databases?",
      "How do PostgreSQL JSONB columns allow hybrid normalized/denormalized models?"
    ],
    keyPoints: [
      "1NF: Atomic values, no repeating groups",
      "2NF: No partial dependencies on composite keys",
      "3NF: No transitive dependencies between non-key columns",
      "Denormalize for read performance and immutable snapshot history"
    ],
    tags: ["normalization", "1nf", "2nf", "3nf", "database-design"],
    relatedLessonSlug: "/learn/postgresql/pg02-tables-keys-and-constraints",
    relatedLessonName: "PG-02: Tables, Primary Keys & Foreign Key Constraints"
  },
  {
    id: "pg-q08",
    trackKey: "postgresql",
    category: "Indexing & Query Performance",
    subtopic: "Query Planning",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE` in PostgreSQL? How do you read an execution plan?",
    answer: `### Simple answer:
- **\`EXPLAIN\`**: Shows the planner's estimated cost and execution plan **without running the query**.
- **\`EXPLAIN ANALYZE\`**: Actually **executes the query**, measuring the real execution time and exact number of rows returned.

### Warning:
Because \`EXPLAIN ANALYZE\` executes the query, running it on \`DELETE\` or \`UPDATE\` statements **will mutate database data**! Always run inside a transaction with \`ROLLBACK\` if testing mutations.

### Key Metrics in Execution Plans:
1. **Cost (\`cost=0.00..450.20\`):** The planner's estimated arbitrary units (disk page reads + CPU cycles) to start and finish the node.
2. **Scan Types:**
   - **Seq Scan (Sequential Scan):** Reads every row from disk (fine for small tables, slow for large tables).
   - **Index Scan:** Uses B-Tree to find rows, then reads heap pages for non-indexed columns.
   - **Index Only Scan:** The fastest! Reads all needed columns directly from the index without touching table heap pages.
   - **Bitmap Index Scan:** Combines multiple indexes using memory bitmasks before reading table pages.

### Example:
\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

### Interview answer:
\`EXPLAIN\` displays the query planner's estimated execution strategy without running the query, while \`EXPLAIN ANALYZE\` executes the query to return real execution timings and row counts. We use it to identify slow Sequential Scans and verify whether indexes are being utilized effectively.`,
    followUps: [
      "What is an Index-Only Scan and how does the Visibility Map enable it in Postgres?",
      "What does 'Buffers: shared hit=4 read=1' mean in EXPLAIN (ANALYZE, BUFFERS)?",
      "How does the ANALYZE command update statistics in pg_statistic?"
    ],
    keyPoints: [
      "EXPLAIN estimates plan without executing",
      "EXPLAIN ANALYZE runs the query and records actual timings",
      "Index Scan vs Index Only Scan vs Sequential Scan",
      "Never run EXPLAIN ANALYZE on UPDATE/DELETE without ROLLBACK"
    ],
    tags: ["explain", "explain-analyze", "query-planner", "performance", "sql"],
    relatedLessonSlug: "/learn/postgresql/pg04-indexes-and-query-optimization",
    relatedLessonName: "PG-04: B-Tree Indexes & Query Planner Optimization"
  },
  {
    id: "pg-q09",
    trackKey: "postgresql",
    category: "Architecture & Scaling",
    subtopic: "Connection Pooling",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What is Connection Pooling in PostgreSQL, and why is an external pooler like PgBouncer essential in serverless environments?",
    answer: `### Simple answer:
PostgreSQL uses a process-based connection model: each new client connection forks an entire OS process consuming roughly 5MB to 10MB of RAM. A Connection Pooler maintains a reusable pool of open connections so applications reuse them instead of constantly creating new connections.

### Why Serverless Crashes PostgreSQL:
In serverless environments (AWS Lambda, Vercel, Next.js Server Actions), hundreds of serverless functions spin up simultaneously during traffic spikes.
- If 500 Lambda functions each open a new database connection, PostgreSQL runs out of process memory and throws:
\`\`\`
FATAL: remaining connection slots are reserved for non-replication superuser connections
\`\`\`

### The Solution: PgBouncer
PgBouncer sits between serverless functions and PostgreSQL:
- Hundreds of client requests connect to PgBouncer.
- PgBouncer multiplexes them through a small, fixed pool (e.g. 20-50 real Postgres connections).
- **Transaction Pooling Mode:** Reassigns the database connection as soon as a single transaction finishes!

### Interview answer:
PostgreSQL allocates a dedicated OS process for every client connection, limiting maximum concurrent connections. In serverless environments with rapid scaling, external connection poolers like PgBouncer or Prisma Accelerate are essential to multiplex hundreds of transient connections through a small pool of persistent database connections.`,
    followUps: [
      "What are the three pooling modes in PgBouncer (Session, Transaction, Statement)?",
      "Why does Transaction pooling disable prepared statements unless configured with named queries?",
      "What is max_connections in postgresql.conf and why shouldn't it be set to 10,000?"
    ],
    keyPoints: [
      "Postgres uses process-per-connection architecture (~10MB RAM per connection)",
      "Serverless auto-scaling quickly exhausts Postgres connection limits",
      "PgBouncer multiplexes thousands of clients over small fixed pool",
      "Transaction pooling mode returns connection to pool immediately after COMMIT"
    ],
    tags: ["connection-pooling", "pgbouncer", "serverless", "scaling", "postgresql"],
    relatedLessonSlug: "/learn/postgresql/pg07-connection-pooling-and-scaling",
    relatedLessonName: "PG-07: Connection Pooling, PgBouncer & Serverless Scaling"
  },
  {
    id: "pg-q10",
    trackKey: "postgresql",
    category: "Advanced Features",
    subtopic: "JSONB",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between `JSON` and `JSONB` in PostgreSQL, and how do you index JSONB columns?",
    answer: `### Simple answer:
PostgreSQL supports two JSON types:
- **\`JSON\`**: Stores JSON as raw text. Preserves whitespace and key order, but must be re-parsed on every query (slow queries).
- **\`JSONB\` (Binary JSON)**: Decomposed into a binary format. Does not preserve whitespace or key order, but is much faster to query and supports **indexing**.

### Querying JSONB:
\`\`\`sql
-- -> returns JSON object; ->> returns text
SELECT metadata->>'role' FROM users WHERE metadata->>'department' = 'Engineering';

-- @> containment operator (checks if JSONB contains key-value pair):
SELECT * FROM users WHERE metadata @> '{"status": "active"}';
\`\`\`

### Indexing JSONB with GIN:
A B-Tree cannot index arbitrary JSON keys. You use a **GIN (Generalized Inverted Index)**:
\`\`\`sql
CREATE INDEX idx_users_metadata ON users USING GIN (metadata);
\`\`\`
Now containment queries (\`@>\`) run in milliseconds even on millions of rows!

### Interview answer:
\`JSON\` stores exact text, while \`JSONB\` stores decomposed binary data that is faster to query and supports GIN indexing. Use \`JSONB\` for semi-structured data and index it with a GIN index using the containment operator (\`@>\`) for high performance.`,
    followUps: [
      "What is the jsonb_path_ops operator class in GIN indexes?",
      "Can you create an index on a specific expression like (metadata->>'email') using B-Tree?",
      "When is a relational column still better than a JSONB field?"
    ],
    keyPoints: [
      "JSONB stores binary decomposed JSON for fast querying and indexing",
      "-> extracts JSON, ->> extracts string text",
      "GIN index enables fast containment queries (@>)",
      "B-Tree expression index can be used on specific extracted JSON fields"
    ],
    tags: ["jsonb", "gin-index", "nosql-in-sql", "indexing", "postgresql"],
    relatedLessonSlug: "/learn/postgresql/pg05-jsonb-and-full-text-search",
    relatedLessonName: "PG-05: JSONB Documents & GIN Indexing"
  },
  {
    id: "pg-q11",
    trackKey: "postgresql",
    category: "SQL Queries",
    subtopic: "Window Functions",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Window Functions in PostgreSQL, and how do they differ from `GROUP BY`?",
    answer: `### Simple answer:
A Window Function performs a calculation across a set of table rows related to the current row, but **without collapsing rows into a single summary row** like \`GROUP BY\` does.

### Difference from GROUP BY:
- \`GROUP BY\` collapses 10 rows into 1 summarized row.
- Window functions keep all 10 original rows and add the calculated value as an extra column.

### Common Window Functions:
- \`ROW_NUMBER()\`: Unique sequential row number within partition.
- \`RANK()\` / \`DENSE_RANK()\`: Rank with or without gaps for ties.
- \`LEAD()\` / \`LAG()\`: Access data from the next or previous row.

### Example: Find top 2 highest paid employees per department
\`\`\`sql
WITH RankedEmployees AS (
  SELECT
    name,
    department,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY department
      ORDER BY salary DESC
    ) as rank
  FROM employees
)
SELECT * FROM RankedEmployees WHERE rank <= 2;
\`\`\`

### Interview answer:
Window functions calculate values across a partition of rows using the \`OVER (PARTITION BY ... ORDER BY ...)\` clause without collapsing the result set. They are ideal for rankings, running totals, and moving averages while preserving all original rows.`,
    followUps: [
      "What is the difference between RANK() and DENSE_RANK()?",
      "How do LEAD() and LAG() help calculate month-over-month growth?",
      "Can window functions be used directly inside a WHERE clause?"
    ],
    keyPoints: [
      "OVER clause defines window partition and sorting",
      "Does not collapse rows unlike GROUP BY",
      "ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG",
      "Evaluated after WHERE and GROUP BY in query execution"
    ],
    tags: ["window-functions", "partition-by", "rank", "sql", "analytics"],
    relatedLessonSlug: "/learn/postgresql/pg03-joins-and-aggregations",
    relatedLessonName: "PG-03: Relational Joins & Set Operations"
  },
  {
    id: "pg-q12",
    trackKey: "postgresql",
    category: "Architecture & Scaling",
    subtopic: "Scaling Strategies",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "Compare Read Replicas, Table Partitioning, and Database Sharding for scaling PostgreSQL.",
    answer: `### Simple answer:
These are three progressive strategies to handle growing database size and traffic:

| Strategy | What it does | Best For | Complexity |
|---|---|---|---|
| **Read Replicas** | Copies primary database asynchronously to read-only replica servers | Read-heavy web traffic (e.g. 95% reads / 5% writes) | Low |
| **Table Partitioning** | Splits one giant table into smaller sub-tables by range or list (e.g. by month) | Tables with hundreds of millions of rows (logs, metrics) | Medium |
| **Database Sharding** | Splits data across completely separate database servers (e.g. by User ID) | Massive write volume and data exceeding single-server disk limits | High |

### Table Partitioning Example (Declarative):
\`\`\`sql
CREATE TABLE audit_logs (
  id BIGINT,
  created_at TIMESTAMPTZ NOT NULL,
  event TEXT
) PARTITION BY RANGE (created_at);

-- Partition for 2026 Q1:
CREATE TABLE logs_2026_q1 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-01-01') TO ('2026-04-01');
\`\`\`
**Partition Pruning:** When querying \`WHERE created_at = '2026-02-15'\`, Postgres scans only \`logs_2026_q1\`, ignoring all other partitions!

### Interview answer:
To scale PostgreSQL, start with Read Replicas for read-heavy workloads. Use Declarative Table Partitioning to break giant single tables (like time-series logs) into smaller sub-tables for partition pruning. Reserve horizontal Sharding as a last resort for massive write volumes due to cross-shard join and transaction complexities.`,
    followUps: [
      "What is replication lag with asynchronous streaming replication?",
      "How does PostgreSQL Citus extension provide distributed sharding?",
      "What is Partition Pruning in the query planner?"
    ],
    keyPoints: [
      "Read replicas scale read throughput using streaming replication",
      "Declarative partitioning splits huge tables by range or hash on single server",
      "Partition pruning skips scanning irrelevant partitions",
      "Sharding distributes data across independent servers but complicates joins"
    ],
    tags: ["scaling", "read-replicas", "partitioning", "sharding", "architecture"],
    relatedLessonSlug: "/learn/postgresql/pg07-connection-pooling-and-scaling",
    relatedLessonName: "PG-07: Connection Pooling, PgBouncer & Serverless Scaling"
  }
];
