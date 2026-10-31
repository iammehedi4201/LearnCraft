import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import {
  pri01WhatIsPrismaContent,
  pri02PrismaProjectSetupAndMainFilesContent,
  pri03PrismaSchemaAndModelsContent,
  pri04FieldTypesAndSchemaAttributesContent,
} from "./stage-01-understand-prisma-orm";

import {
  pri05WhatIsPrismaClientContent,
  pri06CreateAndReadRecordsContent,
  pri07UpdateAndDeleteRecordsContent,
  pri08FilteringAndSortingDataContent,
  pri09SelectOnlyTheFieldsYouNeedContent,
} from "./stage-02-use-prisma-client";

import {
  pri10UnderstandRelationshipsBetweenModelsContent,
  pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent,
  pri12CreateRelatedRecordsWithNestedWritesContent,
} from "./stage-03-work-with-related-data";

import {
  pri13WhatArePrismaMigrationsContent,
  pri14PrismaStudioAndSeedDataContent,
  pri15HandlePrismaErrorsContent,
} from "./stage-04-keep-the-schema-and-data-safe";

import {
  pri16TransactionsContent,
  pri17PaginationContent,
  pri18IndexesAndQueryPerformanceContent,
  pri19ReusePrismaClientAndManageConnectionsContent,
  pri20UseRawSqlOnlyWhenNeededContent,
} from "./stage-05-reliability-and-performance";

export const ALL_PRISMA_LESSONS: StandardLessonContent[] = [
  // Stage 1: Understand Prisma ORM (Lessons 1 - 4)
  pri01WhatIsPrismaContent,
  pri02PrismaProjectSetupAndMainFilesContent,
  pri03PrismaSchemaAndModelsContent,
  pri04FieldTypesAndSchemaAttributesContent,

  // Stage 2: Use Prisma Client (Lessons 5 - 9)
  pri05WhatIsPrismaClientContent,
  pri06CreateAndReadRecordsContent,
  pri07UpdateAndDeleteRecordsContent,
  pri08FilteringAndSortingDataContent,
  pri09SelectOnlyTheFieldsYouNeedContent,

  // Stage 3: Work with Related Data (Lessons 10 - 12)
  pri10UnderstandRelationshipsBetweenModelsContent,
  pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent,
  pri12CreateRelatedRecordsWithNestedWritesContent,

  // Stage 4: Keep the Schema and Data Safe (Lessons 13 - 15)
  pri13WhatArePrismaMigrationsContent,
  pri14PrismaStudioAndSeedDataContent,
  pri15HandlePrismaErrorsContent,

  // Stage 5: Reliability and Performance (Lessons 16 - 20)
  pri16TransactionsContent,
  pri17PaginationContent,
  pri18IndexesAndQueryPerformanceContent,
  pri19ReusePrismaClientAndManageConnectionsContent,
  pri20UseRawSqlOnlyWhenNeededContent,
];

export const PRISMA_LESSONS_BY_SLUG: Record<string, StandardLessonContent> = {};
for (const lesson of ALL_PRISMA_LESSONS) {
  if (lesson.slug) {
    PRISMA_LESSONS_BY_SLUG[lesson.slug.toLowerCase()] = lesson;
  }
}

/**
 * Legacy slug alias mapping for seamless backward compatibility.
 * Redirects legacy 27-lesson URLs and progress IDs to the authoritative 20-lesson schema.
 */
export const PRISMA_LEGACY_SLUG_MAP: Record<string, string> = {
  // Code aliases (PRI-01 through PRI-20)
  "pri-01": "pri01-what-is-prisma",
  "pri-02": "pri02-prisma-project-setup-and-main-files",
  "pri-03": "pri03-prisma-schema-and-models",
  "pri-04": "pri04-field-types-and-schema-attributes",
  "pri-05": "pri05-what-is-prisma-client",
  "pri-06": "pri06-create-and-read-records",
  "pri-07": "pri07-update-and-delete-records",
  "pri-08": "pri08-filtering-and-sorting-data",
  "pri-09": "pri09-select-only-the-fields-you-need",
  "pri-10": "pri10-understand-relationships-between-models",
  "pri-11": "pri11-read-related-records-with-include-and-nested-select",
  "pri-12": "pri12-create-related-records-with-nested-writes",
  "pri-13": "pri13-what-are-prisma-migrations",
  "pri-14": "pri14-prisma-studio-and-seed-data",
  "pri-15": "pri15-handle-prisma-errors",
  "pri-16": "pri16-transactions",
  "pri-17": "pri17-pagination",
  "pri-18": "pri18-indexes-and-query-performance",
  "pri-19": "pri19-reuse-prisma-client-and-manage-connections",
  "pri-20": "pri20-use-raw-sql-only-when-needed",

  // Canonical slugs
  "pri01-what-is-prisma": "pri01-what-is-prisma",
  "pri02-prisma-project-setup-and-main-files": "pri02-prisma-project-setup-and-main-files",
  "pri03-prisma-schema-and-models": "pri03-prisma-schema-and-models",
  "pri04-field-types-and-schema-attributes": "pri04-field-types-and-schema-attributes",
  "pri05-what-is-prisma-client": "pri05-what-is-prisma-client",
  "pri06-create-and-read-records": "pri06-create-and-read-records",
  "pri07-update-and-delete-records": "pri07-update-and-delete-records",
  "pri08-filtering-and-sorting-data": "pri08-filtering-and-sorting-data",
  "pri09-select-only-the-fields-you-need": "pri09-select-only-the-fields-you-need",
  "pri10-understand-relationships-between-models": "pri10-understand-relationships-between-models",
  "pri11-read-related-records-with-include-and-nested-select": "pri11-read-related-records-with-include-and-nested-select",
  "pri12-create-related-records-with-nested-writes": "pri12-create-related-records-with-nested-writes",
  "pri13-what-are-prisma-migrations": "pri13-what-are-prisma-migrations",
  "pri14-prisma-studio-and-seed-data": "pri14-prisma-studio-and-seed-data",
  "pri15-handle-prisma-errors": "pri15-handle-prisma-errors",
  "pri16-transactions": "pri16-transactions",
  "pri17-pagination": "pri17-pagination",
  "pri18-indexes-and-query-performance": "pri18-indexes-and-query-performance",
  "pri19-reuse-prisma-client-and-manage-connections": "pri19-reuse-prisma-client-and-manage-connections",
  "pri20-use-raw-sql-only-when-needed": "pri20-use-raw-sql-only-when-needed",

  // Legacy 27-lesson schema slugs
  "pri02-prisma-architecture-workflow": "pri02-prisma-project-setup-and-main-files",
  "pri03-project-setup-and-cli": "pri02-prisma-project-setup-and-main-files",
  "pri04-models-fields-scalar-types": "pri03-prisma-schema-and-models",
  "pri05-ids-defaults-and-attributes": "pri04-field-types-and-schema-attributes",
  "pri06-enums-mapping-and-indexes": "pri04-field-types-and-schema-attributes",
  "pri07-relations-mental-model": "pri10-understand-relationships-between-models",
  "pri08-one-to-one-and-one-to-many": "pri10-understand-relationships-between-models",
  "pri09-many-to-many-relations": "pri10-understand-relationships-between-models",
  "pri10-prisma-client-setup-generation": "pri05-what-is-prisma-client",
  "pri11-findunique-findfirst-findmany": "pri06-create-and-read-records",
  "pri12-create-update-delete-mutations": "pri07-update-and-delete-records",
  "pri13-include-vs-select-relation-loading": "pri11-read-related-records-with-include-and-nested-select",
  "pri14-nested-writes-creates-updates": "pri12-create-related-records-with-nested-writes",
  "pri15-connect-disconnect-connect-or-create": "pri12-create-related-records-with-nested-writes",
  "pri16-filtering-comparison-logical": "pri08-filtering-and-sorting-data",
  "pri17-relation-filters-some-every-none": "pri08-filtering-and-sorting-data",
  "pri18-pagination-offset-cursor": "pri17-pagination",
  "pri19-migrations-mental-model-sql": "pri13-what-are-prisma-migrations",
  "pri20-prisma-migrate-dev-and-deploy": "pri13-what-are-prisma-migrations",
  "pri21-db-push-vs-migrate-prototyping": "pri13-what-are-prisma-migrations",
  "pri22-transactions-mental-model-acid": "pri16-transactions",
  "pri23-batch-transactions-transaction": "pri16-transactions",
  "pri24-interactive-transactions-callbacks": "pri16-transactions",
  "pri25-prisma-error-codes-p2002-p2025": "pri15-handle-prisma-errors",
  "pri26-debugging-logging-prisma-studio": "pri14-prisma-studio-and-seed-data",
  "pri27-production-singleton-connection-pooling": "pri19-reuse-prisma-client-and-manage-connections",

  // Legacy code aliases: pri-21 through pri-27
  "pri-21": "pri13-what-are-prisma-migrations",
  "pri-22": "pri16-transactions",
  "pri-23": "pri16-transactions",
  "pri-24": "pri16-transactions",
  "pri-25": "pri15-handle-prisma-errors",
  "pri-26": "pri14-prisma-studio-and-seed-data",
  "pri-27": "pri19-reuse-prisma-client-and-manage-connections",
};

export function getPrismaLessonBySlug(slug: string): StandardLessonContent | undefined {
  const normalized = slug?.toLowerCase();
  if (PRISMA_LESSONS_BY_SLUG[normalized]) {
    return PRISMA_LESSONS_BY_SLUG[normalized];
  }
  const mapped = PRISMA_LEGACY_SLUG_MAP[normalized];
  if (mapped && PRISMA_LESSONS_BY_SLUG[mapped]) {
    return PRISMA_LESSONS_BY_SLUG[mapped];
  }
  return undefined;
}

