import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const pg22BackupsAndRestoringDataContent: StandardLessonContent = {
  slug: "pg22-backups-and-restoring-data",
  code: "PG-22",
  title: "Backups and Restoring Data",
  subtitle: "Protect business data with logical backups using pg_dump, custom format archives, and regular restore drills.",
  difficulty: "Moderate",
  scenario: {
    question: "A team makes backups every day but has never tried restoring one. Is that enough?",
    answer: "No. The team should test restoring backups regularly. A backup that cannot be restored will not help during an emergency.",
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
    title: "Backups and Restoring Data",
    bigPicture:
      "A backup is a copy of database data that can be used to recover after data is lost or damaged. A backup is useful only if you can restore it successfully.\n\nA common PostgreSQL logical backup uses `pg_dump` and `pg_restore`.",
    codeSnippet: `# 1. Create a compressed custom archive backup of the 'shop' database:
pg_dump -Fc -d shop -f shop-backup.dump

# 2. Create a clean test database and restore the backup:
createdb shop_restore_test
pg_restore -d shop_restore_test shop-backup.dump`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. pg_dump command",
        desc: "Connects to the database and streams a consistent snapshot without locking reads.",
      },
      {
        title: "2. The -Fc flag",
        desc: "Instructs `pg_dump` to output in PostgreSQL's compressed custom archive format, which supports parallel restoring and table reordering.",
      },
      {
        title: "3. createdb target",
        desc: "Creates a dedicated isolated database to test and verify the restoration.",
      },
      {
        title: "4. pg_restore command",
        desc: "Reads the archive file and reconstructs tables, schema constraints, indexes, and row data.",
      },
      {
        title: "5. Data verification",
        desc: "Always query restored tables to confirm row counts and data integrity before considering a backup valid.",
      },
    ],
  },
  part2: {
    title: "Why It Matters & Rules",
    intro:
      "Hardware fails, ransomware attacks happen, and humans accidentally drop tables. An untested backup is not a backup—it is merely a wish.",
    rule: {
      title: "Restore Verification Rule",
      content:
        "An unverified backup cannot be relied upon in an outage. Regularly automate backup restoration drills into a test database to prove that recovery works.",
    },
    cards: [
      {
        number: "01",
        tag: "LOGICAL",
        title: "pg_dump Custom Format",
        description:
          "Prefer `pg_dump -Fc` over plain text SQL dumps. It is compressed, faster, and allows restoring specific tables selectively with `pg_restore`.",
        color: "purple",
      },
      {
        number: "02",
        tag: "NON-BLOCKING",
        title: "Zero-Downtime Dumps",
        description:
          "`pg_dump` relies on PostgreSQL's MVCC snapshots. It takes a consistent point-in-time backup without blocking concurrent reads or writes.",
        color: "emerald",
      },
      {
        number: "03",
        tag: "DRILLS",
        title: "Scheduled Recovery Testing",
        description:
          "Automate weekly or monthly automated restore scripts that spin up a test database, load the dump, and assert table counts.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro:
      "Review production disaster recovery practices for eCommerce stores.",
    points: [
      {
        title: "Disaster Recovery Testing",
        content:
          "Schedule a monthly cron job that takes last night's dump, restores it to a temporary staging database, and runs automated tests to verify schema and data health.",
      },
      {
        title: "Off-Site Storage",
        content:
          "Always encrypt and transfer backup archives to off-site, geographically separate object storage (e.g. S3 Glacier) with retention lifecycle policies.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Taking daily backups but never testing whether the dump files can actually be restored.",
    badApproach: {
      title: "Untested Backups",
      code: `# Team sets up daily dump cron job:
0 2 * * * pg_dump shop > /tmp/backup.sql
# But never tests restoring! During a server failure 6 months later,
# they discover disk filled up mid-dump and all backup files are corrupted!`,
      flaw: "Leaves the company with zero recoverable data during a production disaster.",
    },
    betterApproach: {
      title: "Automated Backup & Restore Drill",
      code: `#!/bin/bash
set -e
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
# 1. Take compressed custom backup
pg_dump -Fc -d shop -f "/backups/shop_\${TIMESTAMP}.dump"

# 2. Automated drill: test restore into temporary database
createdb "restore_test_\${TIMESTAMP}"
pg_restore -d "restore_test_\${TIMESTAMP}" "/backups/shop_\${TIMESTAMP}.dump"
psql -d "restore_test_\${TIMESTAMP}" -c "SELECT count(*) FROM orders;"
dropdb "restore_test_\${TIMESTAMP}"
echo "Backup and restore drill verified successfully!"`,
      benefit: "Guarantees that every backup file is verified as complete, uncorrupted, and 100% restorable.",
    },
    whyItMatters:
      "A tested backup strategy guarantees business continuity and eliminates catastrophic data loss.",
  },
  part5: {
    title: "Interactive SQL Sandbox",
    intro: "Check current database information and table statuses:",
    starterCode: `CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
  ('Mechanical Keyboard', 1200.00),
  ('Desk Mat', 250.00);

-- Query database metadata and table sizes:
SELECT
  current_database() AS db_name,
  count(*) AS total_products,
  pg_size_pretty(pg_total_relation_size('products')) AS table_size
FROM products;`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is taking database backups every day not enough on its own?",
      options: [
        "Because PostgreSQL requires hourly backups to function",
        "Because backups must be regularly restored and verified to ensure they are complete and undamaged",
        "Because pg_dump only works on weekends",
        "Because backups delete the original database",
      ],
      correctIndex: 1,
      explanation:
        "A backup is only valuable if it can be successfully restored. Regular restoration drills confirm that the dump file is intact and ready for emergency recovery.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Backup & Restore Pair",
        desc: "A backup is a recovery copy of database data; a backup is only useful if it can be successfully restored.",
      },
      {
        title: "pg_dump & pg_restore",
        desc: "Use `pg_dump -Fc` for compressed custom archives and `pg_restore` to rebuild databases.",
      },
      {
        title: "Test Regularly",
        desc: "Regular restore drills prove that your recovery plans and files actually work.",
      },
    ],
  },
};

