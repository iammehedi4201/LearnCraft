"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  ComparisonTable,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — CONNECTION POOLING & PRODUCTION DB URLS
// ═══════════════════════════════════════════════════════════

export function ConnectionPoolingSection() {
  return (
    <SectionContainer number={9} title="Connection Pooling & Production DB URLs">
      {/* ── 9.1 Connection Pools ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Optimizing Database Connections"
          description="How to configure connection pool limits and PgBouncer URLs for PostgreSQL."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`# .env (Standard connection string with pool tuning):
DATABASE_URL="postgresql://postgres:secret@localhost:5432/learncraft?schema=public&connection_limit=20&pool_timeout=10"

# .env (PgBouncer pooler connection string for high concurrency):
DATABASE_URL="postgresql://postgres:secret@db-pooler.railway.app:6543/learncraft?pgbouncer=true&connection_limit=10"`}
          language="bash"
        />

        <ComparisonTable
          headers={["URL Parameter", "Default", "Purpose"]}
          rows={[
            ["connection_limit", "num_cpus * 2 + 1", "Maximum concurrent socket connections opened to PostgreSQL"],
            ["pool_timeout", "10 seconds", "Maximum wait time to acquire an open connection before throwing a timeout error"],
            ["pgbouncer=true", "false", "Disables prepared statements when connecting through PgBouncer in transaction mode"],
          ]}
        />

        <QuickCheck
          question="Why is setting 'connection_limit' in DATABASE_URL important in multi-instance production deployments?"
          answer="To prevent multiple backend instances (e.g. 5 Docker containers) from exhausting PostgreSQL's maximum allowed connection pool limit (max_connections)."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
