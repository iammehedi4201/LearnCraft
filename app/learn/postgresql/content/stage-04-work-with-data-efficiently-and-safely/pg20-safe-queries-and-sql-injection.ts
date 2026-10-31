import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg20SafeQueriesAndSqlInjectionContent: StandardLessonContent = {
  slug: "pg20-safe-queries-and-sql-injection",
  code: "PG-20",
  title: "Safe Queries and SQL Injection",
  subtitle: "Protect databases against SQL injection vulnerabilities by utilizing parameterized queries and prepared statements.",
  difficulty: "Difficult",
  scenario: {
    question: "A search box sends a user's search text to PostgreSQL. How should the developer pass that text to the query?",
    answer: "Use a parameterized query. Do not insert the user's text directly into the SQL string.",
  },
  interviewQuestion: {
    question: "What is SQL injection, and how can you prevent it?",
    answer: "SQL injection is an attack where input changes the meaning of a SQL command. Use parameterized queries so user input is treated as data, not SQL code.",
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
    title: "Safe Queries and SQL Injection",
    bigPicture:
      "SQL injection happens when untrusted user input is joined into SQL text in a way that changes the meaning of the query. Use parameterized queries so values are sent separately from the SQL command.",
    codeSnippet: `// Unsafe: user input is concatenated into the SQL text string
const unsafeSql = \`SELECT * FROM users WHERE email = '\${email}'\`;

// Safe: parameterized query (e.g. Node.js with the 'pg' driver)
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. Placeholder syntax ($1, $2)",
        desc: "The SQL statement defines positional placeholders (`$1`, `$2`) instead of string interpolations.",
      },
      {
        title: "2. Values parameter array",
        desc: "User inputs are transmitted separately in an array over the PostgreSQL wire protocol.",
      },
      {
        title: "3. Separation of code and data",
        desc: "The PostgreSQL query parser pre-compiles the SQL syntax before binding the parameter values.",
      },
      {
        title: "4. Complete injection immunity",
        desc: "Even if an input contains quotes like `' OR '1'='1`, the database treats it as a literal string value, completely preventing SQL injection.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "SQL injection has caused massive data breaches worldwide. Treating untrusted user inputs as data parameters rather than executable SQL is the golden rule of database security.",
    rule: {
      title: "Parameterized Query Rule",
      content:
        "Never concatenate, interpolate, or format untrusted user input directly into SQL query strings. Always use parameterized queries (`$1, $2, ...`) provided by your database driver.",
    },
    cards: [
      {
        number: "01",
        tag: "INJECTION",
        title: "How Attacks Happen",
        description:
          "An attacker inputs `admin' --`. In a concatenated query, `--` comments out the password check, granting unauthorized administrator access.",
        color: "rose",
      },
      {
        number: "02",
        tag: "PROTOCOL",
        title: "Separate Wire Transmission",
        description:
          "PostgreSQL protocol transmits the query plan and parameter values in separate protocol packets, guaranteeing the parser treats parameters strictly as data.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "PERFORMANCE",
        title: "Prepared Statement Caching",
        description:
          "Parameterized queries allow PostgreSQL to cache query execution plans across requests, providing a significant performance boost.",
        color: "purple",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Examine how login authentication, search inputs, and filter parameters must be guarded.",
    points: [
      {
        title: "Authentication Queries",
        content:
          "Login forms are the #1 target for injection attacks. Using `pool.query('SELECT * FROM users WHERE email = $1', [email])` ensures malicious payloads are treated as literal email strings.",
      },
      {
        title: "Search Inputs with Wildcards",
        content:
          "When searching with `ILIKE`, pass the wildcards in the parameter array: `pool.query('SELECT * FROM products WHERE name ILIKE $1', ['%' + term + '%'])`.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Using JavaScript template literals to construct raw SQL strings from request parameters.",
    badApproach: {
      title: "Vulnerable String Concatenation",
      code: `// DANGEROUS: High-severity SQL injection vulnerability
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  // If query is: "phone' UNION SELECT username, password_hash FROM users --"
  const sql = \`SELECT * FROM products WHERE name = '\${query}'\`;
  const result = await db.query(sql);
  res.json(result.rows);
});`,
      flaw: "An attacker can extract private user records, dump passwords, or drop entire database tables.",
    },
    betterApproach: {
      title: "Parameterized Safe Query",
      code: `app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  // SAFE: Parameters cannot alter query syntax
  const result = await db.query(
    'SELECT * FROM products WHERE name ILIKE $1',
    ['%' + query + '%']
  );
  res.json(result.rows);
});`,
      benefit: "Safely handles any input string, including quotes and control characters, without risk.",
    },
    whyItMatters:
      "Parameterized queries prevent SQL injection entirely, protecting user credentials, corporate data, and regulatory compliance.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Observe how parameterized values are treated as literal data:",
    starterCode: `CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO users (username, email) VALUES
  ('admin', 'admin@store.com'),
  ('amina', 'amina@store.com');

-- In node-postgres, this executes as:
-- pool.query('SELECT * FROM users WHERE email = $1', ['amina@store.com'])
SELECT *
FROM users
WHERE email = 'amina@store.com';`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the most effective way to prevent SQL injection in application development?",
      options: [
        "Replacing all single quotes with double quotes in JavaScript",
        "Using parameterized queries so user input is sent separately from SQL syntax",
        "Running the database on a private IP address",
        "Converting all table names to uppercase",
      ],
      correctIndex: 1,
      explanation:
        "Parameterized queries (prepared statements) ensure that input values are treated strictly as data literals and can never change the syntactic structure of the SQL query.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Separate Code from Data",
        desc: "Never concatenate untrusted user strings directly into SQL text.",
      },
      {
        title: "Use $1, $2 Placeholders",
        desc: "Pass inputs in the parameters array using `$1, $2` syntax in Node.js and PostgreSQL drivers.",
      },
      {
        title: "Zero-Trust Philosophy",
        desc: "Treat all input from users, webhooks, and third-party APIs as untrusted data.",
      },
    ],
  },
};

