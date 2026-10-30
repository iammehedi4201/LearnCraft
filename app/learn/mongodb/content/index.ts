import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1: Understand MongoDB
export * from "./stage-01-understand-mongodb";
import { STAGE_01_LESSONS } from "./stage-01-understand-mongodb";

// Stage 2: Create, Find, Change, and Delete Data
export * from "./stage-02-crud-operations";
import { STAGE_02_LESSONS } from "./stage-02-crud-operations";

// Stage 3: Organize Data the Right Way
export * from "./stage-03-organize-data";
import { STAGE_03_LESSONS } from "./stage-03-organize-data";

// Stage 4: Find and Work with Data Efficiently
export * from "./stage-04-find-and-work-efficiently";
import { STAGE_04_LESSONS } from "./stage-04-find-and-work-efficiently";

// Stage 5: Keep Data Correct and Safe
export * from "./stage-05-data-safety";
import { STAGE_05_LESSONS } from "./stage-05-data-safety";

/**
 * All 20 official MongoDB lessons derived from the authoritative curriculum specification.
 */
export const ALL_MONGODB_LESSONS: StandardLessonContent[] = [
  ...STAGE_01_LESSONS,
  ...STAGE_02_LESSONS,
  ...STAGE_03_LESSONS,
  ...STAGE_04_LESSONS,
  ...STAGE_05_LESSONS,
];

/**
 * Backward compatibility map from legacy lesson slugs and codes (MDB-01 through MDB-26, and MG-01 through MG-07)
 * to the authoritative 20-lesson schema.
 */
export const MONGODB_LEGACY_SLUG_MAP: Record<string, string> = {
  // Authoritative slugs (self-mapping)
  "mdb01-what-is-mongodb": "mdb01-what-is-mongodb",
  "mdb02-databases-collections-documents-and-bson": "mdb02-databases-collections-documents-and-bson",
  "mdb03-working-with-mongodb-using-mongosh": "mdb03-working-with-mongodb-using-mongosh",
  "mdb04-insert-documents": "mdb04-insert-documents",
  "mdb05-find-documents": "mdb05-find-documents",
  "mdb06-filter-documents-with-query-operators": "mdb06-filter-documents-with-query-operators",
  "mdb07-choose-fields-sort-results-and-limit-results": "mdb07-choose-fields-sort-results-and-limit-results",
  "mdb08-update-documents": "mdb08-update-documents",
  "mdb09-delete-documents-safely": "mdb09-delete-documents-safely",
  "mdb10-arrays-and-embedded-documents": "mdb10-arrays-and-embedded-documents",
  "mdb11-embedding-vs-referencing-related-data": "mdb11-embedding-vs-referencing-related-data",
  "mdb12-schema-validation": "mdb12-schema-validation",
  "mdb13-indexes": "mdb13-indexes",
  "mdb14-check-a-query-with-explain": "mdb14-check-a-query-with-explain",
  "mdb15-pagination": "mdb15-pagination",
  "mdb16-aggregation-pipeline": "mdb16-aggregation-pipeline",
  "mdb17-combine-data-with-lookup": "mdb17-combine-data-with-lookup",
  "mdb18-atomic-updates-and-transactions": "mdb18-atomic-updates-and-transactions",
  "mdb19-database-security-basics": "mdb19-database-security-basics",
  "mdb20-backups-replication-and-scaling": "mdb20-backups-replication-and-scaling",

  // Direct legacy slugs from 26-lesson format
  "mdb02-databases-collections-bson": "mdb02-databases-collections-documents-and-bson",
  "mdb03-mongosh-and-compass": "mdb03-working-with-mongodb-using-mongosh",
  "mdb04-create-insert": "mdb04-insert-documents",
  "mdb05-read-find-projections": "mdb05-find-documents",
  "mdb06-update-operators": "mdb08-update-documents",
  "mdb07-delete-documents": "mdb09-delete-documents-safely",
  "mdb08-comparison-logical-operators": "mdb06-filter-documents-with-query-operators",
  "mdb09-element-evaluation-operators": "mdb06-filter-documents-with-query-operators",
  "mdb10-sort-limit-pagination": "mdb07-choose-fields-sort-results-and-limit-results",
  "mdb11-querying-arrays-nested": "mdb10-arrays-and-embedded-documents",
  "mdb12-updating-arrays-operators": "mdb08-update-documents",
  "mdb13-embedding-vs-referencing": "mdb11-embedding-vs-referencing-related-data",
  "mdb14-modeling-relationships": "mdb11-embedding-vs-referencing-related-data",
  "mdb15-denormalization-unbounded-growth": "mdb11-embedding-vs-referencing-related-data",
  "mdb16-schema-validation-rules": "mdb12-schema-validation",
  "mdb17-enforcing-validation-actions": "mdb12-schema-validation",
  "mdb18-aggregation-pipeline-model": "mdb16-aggregation-pipeline",
  "mdb19-group-metrics-accumulation": "mdb16-aggregation-pipeline",
  "mdb20-unwind-array-processing": "mdb16-aggregation-pipeline",
  "mdb21-lookup-collection-joins": "mdb17-combine-data-with-lookup",
  "mdb22-indexes-fundamentals": "mdb13-indexes",
  "mdb23-explain-plan-esr-rule": "mdb14-check-a-query-with-explain",
  "mdb24-atomicity-multi-doc-transactions": "mdb18-atomic-updates-and-transactions",
  "mdb25-debugging-anti-patterns": "mdb19-database-security-basics",
  "mdb26-troubleshooting-slow-queries": "mdb14-check-a-query-with-explain",
  "mdb26-production-best-practices": "mdb20-backups-replication-and-scaling",

  // Legacy interview question slug aliases
  "mg01-what-is-mongodb": "mdb01-what-is-mongodb",
  "mg02-crud-and-query-operators": "mdb06-filter-documents-with-query-operators",
  "mg03-schema-design-patterns": "mdb11-embedding-vs-referencing-related-data",
  "mg04-indexing-strategies": "mdb13-indexes",
  "mg05-aggregation-pipeline": "mdb16-aggregation-pipeline",
  "mg06-replica-sets-and-failover": "mdb20-backups-replication-and-scaling",
  "mg07-sharding-and-scaling": "mdb20-backups-replication-and-scaling",

  // Legacy code aliases
  "mdb-01": "mdb01-what-is-mongodb",
  "mdb-02": "mdb02-databases-collections-documents-and-bson",
  "mdb-03": "mdb03-working-with-mongodb-using-mongosh",
  "mdb-04": "mdb04-insert-documents",
  "mdb-05": "mdb05-find-documents",
  "mdb-06": "mdb06-filter-documents-with-query-operators",
  "mdb-07": "mdb07-choose-fields-sort-results-and-limit-results",
  "mdb-08": "mdb08-update-documents",
  "mdb-09": "mdb09-delete-documents-safely",
  "mdb-10": "mdb10-arrays-and-embedded-documents",
  "mdb-11": "mdb11-embedding-vs-referencing-related-data",
  "mdb-12": "mdb12-schema-validation",
  "mdb-13": "mdb13-indexes",
  "mdb-14": "mdb14-check-a-query-with-explain",
  "mdb-15": "mdb15-pagination",
  "mdb-16": "mdb16-aggregation-pipeline",
  "mdb-17": "mdb17-combine-data-with-lookup",
  "mdb-18": "mdb18-atomic-updates-and-transactions",
  "mdb-19": "mdb19-database-security-basics",
  "mdb-20": "mdb20-backups-replication-and-scaling",
  "mdb-21": "mdb17-combine-data-with-lookup",
  "mdb-22": "mdb13-indexes",
  "mdb-23": "mdb14-check-a-query-with-explain",
  "mdb-24": "mdb18-atomic-updates-and-transactions",
  "mdb-25": "mdb19-database-security-basics",
  "mdb-26": "mdb20-backups-replication-and-scaling",
};

export const MONGODB_LESSONS_BY_SLUG: Record<string, StandardLessonContent> = {};
for (const lesson of ALL_MONGODB_LESSONS) {
  if (lesson.slug) {
    MONGODB_LESSONS_BY_SLUG[lesson.slug] = lesson;
  }
}

/**
 * Retrieves the StandardLessonContent for a MongoDB lesson by slug, code, or legacy alias.
 */
export function getMongodbLessonBySlug(slugOrCode: string): StandardLessonContent | undefined {
  if (!slugOrCode) return ALL_MONGODB_LESSONS[0];

  const normalized = slugOrCode.toLowerCase().trim();

  // 1. Direct match on slug
  if (MONGODB_LESSONS_BY_SLUG[normalized]) {
    return MONGODB_LESSONS_BY_SLUG[normalized];
  }

  // 2. Check legacy slug map
  const mappedSlug = MONGODB_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug && MONGODB_LESSONS_BY_SLUG[mappedSlug]) {
    return MONGODB_LESSONS_BY_SLUG[mappedSlug];
  }

  // 3. Match by code (e.g., MDB-01)
  const byCode = ALL_MONGODB_LESSONS.find(
    (l) => l.code?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  return undefined;
}

