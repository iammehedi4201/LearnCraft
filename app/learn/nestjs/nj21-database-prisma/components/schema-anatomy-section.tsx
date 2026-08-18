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
// MODULE 4 — ANATOMY OF SCHEMA.PRISMA
// ═══════════════════════════════════════════════════════════

export function SchemaAnatomySection() {
  return (
    <SectionContainer number={4} title="Anatomy of the schema.prisma File">
      {/* ── 4.1 Schema Structure ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The 3 Essential Blocks of Prisma Schema"
          description="Understand the generator, datasource, and model declarations."
          color="primary"
        />

        <EnhancedCodeBlock
          code={`// prisma/schema.prisma

// 1. Generator Block: Controls what client library to build:
generator client {
  provider = "prisma-client-js"
}

// 2. Datasource Block: Connects to your PostgreSQL instance:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// 3. Data Models: Define database tables and columns:
model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  name         String?  // Optional nullable field
  passwordHash String
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("users") // Maps model to "users" SQL table name
}`}
          language="prisma"
        />

        <ComparisonTable
          headers={["Attribute", "Meaning", "Example"]}
          rows={[
            ["@id", "Primary Key of the table", "id Int @id @default(autoincrement())"],
            ["@unique", "Unique constraint index", "email String @unique"],
            ["@default(now())", "Sets default value on insert", "createdAt DateTime @default(now())"],
            ["@updatedAt", "Auto-updates timestamp on every edit", "updatedAt DateTime @updatedAt"],
            ["?", "Optional / nullable column", "bio String?"],
            ["@@map()", "Renames SQL database table", "@@map(\"user_accounts\")"],
          ]}
        />

        <QuickCheck
          question="What does the '?' modifier indicate after a type in Prisma (e.g. bio String?)?"
          answer="It marks the field as optional (nullable in the database), meaning it can store null."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
