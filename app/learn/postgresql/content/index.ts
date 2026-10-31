import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import {
  pg01WhatIsPostgresqlContent,
  pg02DatabaseTableRowColumnContent,
  pg03CommonDataTypesContent,
  pg04CreateTablesAndConstraintsContent,
  pg05CrudOperationsContent,
} from "./stage-01-understand-postgresql-and-tables";

import {
  pg06FilterSortLimitContent,
  pg07NullAndMissingValuesContent,
  pg08RelationshipsAndForeignKeysContent,
  pg09JoinRelatedTablesContent,
  pg10AggregateFunctionsGroupByHavingContent,
  pg11SubqueriesAndCtesContent,
} from "./stage-02-find-and-combine-data";

import {
  pg12UpdateAndReturningContent,
  pg13TransactionsAndAcidContent,
  pg14DatabaseDesignAndNormalizationContent,
  pg15IndexesFindRowsFasterContent,
  pg16QueryPlanExplainContent,
  pg17ViewsContent,
  pg18JsonbStoreAndReadContent,
} from "./stage-03-keep-data-correct-and-safe";

import {
  pg19PaginationLimitOffsetKeysetContent,
  pg20SafeQueriesAndSqlInjectionContent,
  pg21DatabaseRolesAndPermissionsContent,
  pg22BackupsAndRestoringDataContent,
} from "./stage-04-work-with-data-efficiently-and-safely";

export const ALL_POSTGRESQL_LESSONS: StandardLessonContent[] = [
  // Stage 1: Understand PostgreSQL and Tables (Lessons 1 - 5)
  pg01WhatIsPostgresqlContent,
  pg02DatabaseTableRowColumnContent,
  pg03CommonDataTypesContent,
  pg04CreateTablesAndConstraintsContent,
  pg05CrudOperationsContent,

  // Stage 2: Find and Combine Data (Lessons 6 - 11)
  pg06FilterSortLimitContent,
  pg07NullAndMissingValuesContent,
  pg08RelationshipsAndForeignKeysContent,
  pg09JoinRelatedTablesContent,
  pg10AggregateFunctionsGroupByHavingContent,
  pg11SubqueriesAndCtesContent,

  // Stage 3: Keep Data Correct and Safe (Lessons 12 - 18)
  pg12UpdateAndReturningContent,
  pg13TransactionsAndAcidContent,
  pg14DatabaseDesignAndNormalizationContent,
  pg15IndexesFindRowsFasterContent,
  pg16QueryPlanExplainContent,
  pg17ViewsContent,
  pg18JsonbStoreAndReadContent,

  // Stage 4: Work with Data Efficiently and Safely (Lessons 19 - 22)
  pg19PaginationLimitOffsetKeysetContent,
  pg20SafeQueriesAndSqlInjectionContent,
  pg21DatabaseRolesAndPermissionsContent,
  pg22BackupsAndRestoringDataContent,
];

export const POSTGRESQL_LESSONS_BY_SLUG: Record<string, StandardLessonContent> = {};
for (const lesson of ALL_POSTGRESQL_LESSONS) {
  if (lesson.slug) {
    POSTGRESQL_LESSONS_BY_SLUG[lesson.slug.toLowerCase()] = lesson;
  }
}

/**
 * Legacy slug alias mapping for seamless backward compatibility.
 * Redirects legacy 29-lesson URLs and progress IDs to the authoritative 22-lesson schema.
 */
export const POSTGRESQL_LEGACY_SLUG_MAP: Record<string, string> = {
  // Code aliases
  "pg-01": "pg01-what-is-postgresql",
  "pg-02": "pg02-database-table-row-column",
  "pg-03": "pg03-common-data-types",
  "pg-04": "pg04-create-tables-and-constraints",
  "pg-05": "pg05-crud-operations",
  "pg-06": "pg06-filter-sort-limit",
  "pg-07": "pg07-null-and-missing-values",
  "pg-08": "pg08-relationships-and-foreign-keys",
  "pg-09": "pg09-join-related-tables",
  "pg-10": "pg10-aggregate-functions-group-by-having",
  "pg-11": "pg11-subqueries-and-ctes",
  "pg-12": "pg12-update-and-returning",
  "pg-13": "pg13-transactions-and-acid",
  "pg-14": "pg14-database-design-and-normalization",
  "pg-15": "pg15-indexes-find-rows-faster",
  "pg-16": "pg16-query-plan-explain",
  "pg-17": "pg17-views",
  "pg-18": "pg18-jsonb-store-and-read",
  "pg-19": "pg19-pagination-limit-offset-keyset",
  "pg-20": "pg20-safe-queries-and-sql-injection",
  "pg-21": "pg21-database-roles-and-permissions",
  "pg-22": "pg22-backups-and-restoring-data",

  // Lesson 1
  "pg01-what-is-postgresql": "pg01-what-is-postgresql",

  // Lesson 2
  "pg02-databases-schemas-tables": "pg02-database-table-row-column",
  "pg02-database-table-row-column": "pg02-database-table-row-column",

  // Lesson 3
  "pg03-core-data-types": "pg03-common-data-types",
  "pg03-common-data-types": "pg03-common-data-types",

  // Lesson 4
  "pg04-create-table-ddl": "pg04-create-tables-and-constraints",
  "pg04-create-tables-and-constraints": "pg04-create-tables-and-constraints",
  "pg23-check-constraints": "pg04-create-tables-and-constraints",
  "pg23-constraints-integrity": "pg04-create-tables-and-constraints",
  "pg24-unique-and-not-null": "pg04-create-tables-and-constraints",

  // Lesson 5
  "pg05-insert-and-select": "pg05-crud-operations",
  "pg06-update-and-delete": "pg05-crud-operations",
  "pg05-crud-operations": "pg05-crud-operations",
  "pg19-on-conflict-upsert": "pg05-crud-operations",
  "pg19-upserts-on-conflict": "pg05-crud-operations",

  // Lesson 6
  "pg06-filter-sort-limit": "pg06-filter-sort-limit",
  "pg08-where-and-filtering": "pg06-filter-sort-limit",
  "pg08-where-filtering-operators": "pg06-filter-sort-limit",
  "pg10-sorting-and-pagination": "pg06-filter-sort-limit",
  "pg10-ordering-and-pagination": "pg06-filter-sort-limit",

  // Lesson 7
  "pg07-null-and-missing-values": "pg07-null-and-missing-values",
  "pg09-null-handling": "pg07-null-and-missing-values",
  "pg09-null-three-valued-logic": "pg07-null-and-missing-values",

  // Lesson 8
  "pg08-relationships-and-foreign-keys": "pg08-relationships-and-foreign-keys",
  "pg11-foreign-keys-and-referential-integrity": "pg08-relationships-and-foreign-keys",
  "pg11-primary-foreign-keys": "pg08-relationships-and-foreign-keys",
  "pg14-junction-tables-and-m2m": "pg08-relationships-and-foreign-keys",
  "pg14-modeling-cardinality": "pg08-relationships-and-foreign-keys",
  "pg24-foreign-key-referential-actions": "pg08-relationships-and-foreign-keys",

  // Lesson 9
  "pg09-join-related-tables": "pg09-join-related-tables",
  "pg12-inner-joins": "pg09-join-related-tables",
  "pg12-inner-join-multi-table": "pg09-join-related-tables",
  "pg13-left-right-joins": "pg09-join-related-tables",
  "pg13-outer-joins-left-right": "pg09-join-related-tables",

  // Lesson 10
  "pg10-aggregate-functions-group-by-having": "pg10-aggregate-functions-group-by-having",
  "pg15-aggregate-functions": "pg10-aggregate-functions-group-by-having",
  "pg15-aggregate-functions-group-by": "pg10-aggregate-functions-group-by-having",
  "pg16-group-by-and-having": "pg10-aggregate-functions-group-by-having",
  "pg16-having-vs-where": "pg10-aggregate-functions-group-by-having",

  // Lesson 11
  "pg11-subqueries-and-ctes": "pg11-subqueries-and-ctes",
  "pg17-subqueries-and-ctes": "pg11-subqueries-and-ctes",
  "pg18-window-functions": "pg11-subqueries-and-ctes",

  // Lesson 12
  "pg12-update-and-returning": "pg12-update-and-returning",
  "pg07-returning-clause": "pg12-update-and-returning",

  // Lesson 13
  "pg13-transactions-and-acid": "pg13-transactions-and-acid",
  "pg25-transactions-acid": "pg13-transactions-and-acid",
  "pg25-transactions-acid-foundations": "pg13-transactions-and-acid",
  "pg26-isolation-levels": "pg13-transactions-and-acid",
  "pg26-isolation-levels-concurrency": "pg13-transactions-and-acid",

  // Lesson 14
  "pg14-database-design-and-normalization": "pg14-database-design-and-normalization",
  "pg20-normalization-1nf-2nf-3nf": "pg14-database-design-and-normalization",
  "pg21-denormalization-strategies": "pg14-database-design-and-normalization",
  "pg21-strategic-denormalization": "pg14-database-design-and-normalization",

  // Lesson 15
  "pg15-indexes-find-rows-faster": "pg15-indexes-find-rows-faster",
  "pg27-btree-indexes": "pg15-indexes-find-rows-faster",
  "pg27-indexes-btree-compound": "pg15-indexes-find-rows-faster",

  // Lesson 16
  "pg16-query-plan-explain": "pg16-query-plan-explain",
  "pg28-explain-analyze": "pg16-query-plan-explain",
  "pg28-explain-analyze-query-plans": "pg16-query-plan-explain",

  // Lesson 17
  "pg17-views": "pg17-views",

  // Lesson 18
  "pg18-jsonb-store-and-read": "pg18-jsonb-store-and-read",
  "pg22-jsonb-operations": "pg18-jsonb-store-and-read",
  "pg22-jsonb-semi-structured-data": "pg18-jsonb-store-and-read",

  // Lesson 19
  "pg19-pagination-limit-offset-keyset": "pg19-pagination-limit-offset-keyset",

  // Lesson 20
  "pg20-safe-queries-and-sql-injection": "pg20-safe-queries-and-sql-injection",
  "pg29-query-debugging-and-antipatterns": "pg20-safe-queries-and-sql-injection",
  "pg29-debugging-production-best-practices": "pg20-safe-queries-and-sql-injection",

  // Lesson 21
  "pg21-database-roles-and-permissions": "pg21-database-roles-and-permissions",

  // Lesson 22
  "pg22-backups-and-restoring-data": "pg22-backups-and-restoring-data",
};

export function getPostgresqlLessonBySlug(slug: string): StandardLessonContent | undefined {
  const normalized = slug?.toLowerCase();
  if (POSTGRESQL_LESSONS_BY_SLUG[normalized]) {
    return POSTGRESQL_LESSONS_BY_SLUG[normalized];
  }
  const mapped = POSTGRESQL_LEGACY_SLUG_MAP[normalized];
  if (mapped && POSTGRESQL_LESSONS_BY_SLUG[mapped]) {
    return POSTGRESQL_LESSONS_BY_SLUG[mapped];
  }
  return undefined;
}
