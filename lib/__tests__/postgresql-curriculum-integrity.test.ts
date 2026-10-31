import { describe, it, expect } from "vitest";
import {
  ALL_POSTGRESQL_LESSONS,
  getPostgresqlLessonBySlug,
} from "@/app/learn/postgresql/content";
import {
  POSTGRESQL_LESSONS,
  POSTGRESQL_PROGRESSION_PHASES,
  getPostgresqlCourse,
  getLessonBySlug,
} from "@/app/learn/postgresql/data/postgresql-curriculum";
import { getPostgresqlLessonContent } from "@/app/learn/postgresql/data/postgresql-lesson-content";

describe("PostgreSQL Authoritative Curriculum Integrity Test Suite", () => {
  it("should contain exactly 22 lessons", () => {
    expect(ALL_POSTGRESQL_LESSONS.length).toBe(22);
    expect(POSTGRESQL_LESSONS.length).toBe(22);
  });

  it("should have exactly 4 progression phases", () => {
    expect(POSTGRESQL_PROGRESSION_PHASES.length).toBe(4);
    const course = getPostgresqlCourse();
    expect(course.phases.length).toBe(4);

    const totalCourseLessons = course.phases.reduce(
      (sum, p) => sum + p.lessons.length,
      0
    );
    expect(totalCourseLessons).toBe(22);
  });

  it("should have unique, correctly ordered lesson codes PG-01 through PG-22", () => {
    const expectedCodes = Array.from({ length: 22 }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `PG-${num}`;
    });

    const contentCodes = ALL_POSTGRESQL_LESSONS.map((l) => l.code);
    expect(contentCodes).toEqual(expectedCodes);

    const metaCodes = POSTGRESQL_LESSONS.map((l) => l.code);
    expect(metaCodes).toEqual(expectedCodes);
  });

  it("should include scenarios with simple model answers for all 22 lessons", () => {
    for (const lesson of ALL_POSTGRESQL_LESSONS) {
      expect(lesson.scenario).toBeDefined();
      expect(lesson.scenario?.question.trim().length).toBeGreaterThan(10);
      expect(lesson.scenario?.answer.trim().length).toBeGreaterThan(10);
    }
  });

  it("should implement all 7 standard parts across all 22 lessons", () => {
    for (const lesson of ALL_POSTGRESQL_LESSONS) {
      // Part 1: Core Concept
      expect(lesson.part1?.title).toBeTruthy();
      expect(lesson.part1?.bigPicture).toBeTruthy();
      expect(lesson.part1?.breakdownItems?.length).toBeGreaterThan(0);

      // Part 2: Why It Matters & Rules
      expect(lesson.part2?.title).toBeTruthy();
      expect(lesson.part2?.cards?.length).toBeGreaterThan(0);
      for (const card of lesson.part2?.cards || []) {
        expect(card.description).toBeTruthy();
      }

      // Part 3: Real-World Scenarios
      expect(lesson.part3?.title).toBeTruthy();
      expect(lesson.part3?.points?.length).toBeGreaterThan(0);

      // Part 4: Bad vs Clean Code
      expect(lesson.part4?.title).toBeTruthy();
      expect(lesson.part4?.bad?.code || lesson.part4?.badApproach?.code).toBeTruthy();
      expect(lesson.part4?.good?.code || lesson.part4?.betterApproach?.code).toBeTruthy();

      // Part 5: Code Sandbox Playground
      expect(lesson.part5?.title).toBeTruthy();
      expect(lesson.part5?.starterCode).toBeTruthy();

      // Part 6: Concept Assessment Quiz
      expect(lesson.part6?.title).toBeTruthy();
      expect(lesson.part6?.quiz?.options.length).toBe(4);
      expect(lesson.part6?.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(lesson.part6?.quiz?.correctIndex).toBeLessThan(4);

      // Part 7: Key Takeaways
      expect(lesson.part7?.title).toBeTruthy();
      expect(lesson.part7?.takeaways?.length).toBeGreaterThan(0);
    }
  });

  it("should resolve legacy slugs and codes seamlessly via POSTGRESQL_LEGACY_SLUG_MAP", () => {
    // Direct legacy slugs from 29-lesson schema
    expect(getPostgresqlLessonBySlug("pg02-databases-schemas-tables")?.code).toBe("PG-02");
    expect(getPostgresqlLessonBySlug("pg03-core-data-types")?.code).toBe("PG-03");
    expect(getPostgresqlLessonBySlug("pg04-create-table-ddl")?.code).toBe("PG-04");
    expect(getPostgresqlLessonBySlug("pg05-insert-and-select")?.code).toBe("PG-05");
    expect(getPostgresqlLessonBySlug("pg06-update-and-delete")?.code).toBe("PG-05");
    expect(getPostgresqlLessonBySlug("pg07-returning-clause")?.code).toBe("PG-12");
    expect(getPostgresqlLessonBySlug("pg08-where-filtering-operators")?.code).toBe("PG-06");
    expect(getPostgresqlLessonBySlug("pg09-null-three-valued-logic")?.code).toBe("PG-07");
    expect(getPostgresqlLessonBySlug("pg10-ordering-and-pagination")?.code).toBe("PG-06");
    expect(getPostgresqlLessonBySlug("pg11-primary-foreign-keys")?.code).toBe("PG-08");
    expect(getPostgresqlLessonBySlug("pg12-inner-join-multi-table")?.code).toBe("PG-09");
    expect(getPostgresqlLessonBySlug("pg13-outer-joins-left-right")?.code).toBe("PG-09");
    expect(getPostgresqlLessonBySlug("pg14-modeling-cardinality")?.code).toBe("PG-08");
    expect(getPostgresqlLessonBySlug("pg15-aggregate-functions-group-by")?.code).toBe("PG-10");
    expect(getPostgresqlLessonBySlug("pg16-having-vs-where")?.code).toBe("PG-10");
    expect(getPostgresqlLessonBySlug("pg17-subqueries-and-ctes")?.code).toBe("PG-11");
    expect(getPostgresqlLessonBySlug("pg18-window-functions")?.code).toBe("PG-11");
    expect(getPostgresqlLessonBySlug("pg19-upserts-on-conflict")?.code).toBe("PG-05");
    expect(getPostgresqlLessonBySlug("pg20-normalization-1nf-2nf-3nf")?.code).toBe("PG-14");
    expect(getPostgresqlLessonBySlug("pg21-strategic-denormalization")?.code).toBe("PG-14");
    expect(getPostgresqlLessonBySlug("pg22-jsonb-semi-structured-data")?.code).toBe("PG-18");
    expect(getPostgresqlLessonBySlug("pg23-constraints-integrity")?.code).toBe("PG-04");
    expect(getPostgresqlLessonBySlug("pg24-foreign-key-referential-actions")?.code).toBe("PG-08");
    expect(getPostgresqlLessonBySlug("pg25-transactions-acid-foundations")?.code).toBe("PG-13");
    expect(getPostgresqlLessonBySlug("pg26-isolation-levels-concurrency")?.code).toBe("PG-13");
    expect(getPostgresqlLessonBySlug("pg27-indexes-btree-compound")?.code).toBe("PG-15");
    expect(getPostgresqlLessonBySlug("pg28-explain-analyze-query-plans")?.code).toBe("PG-16");
    expect(getPostgresqlLessonBySlug("pg29-debugging-production-best-practices")?.code).toBe("PG-20");

    // Code aliases
    expect(getPostgresqlLessonBySlug("pg-01")?.slug).toBe("pg01-what-is-postgresql");
    expect(getPostgresqlLessonBySlug("pg-06")?.code).toBe("PG-06");
    expect(getPostgresqlLessonBySlug("pg-22")?.code).toBe("PG-22");

    // Curriculum metadata helper lookup
    expect(getLessonBySlug("pg02-databases-schemas-tables")?.code).toBe("PG-02");
    expect(getLessonBySlug("pg27-indexes-btree-compound")?.code).toBe("PG-15");
    expect(getPostgresqlLessonContent("pg02-databases-schemas-tables").code).toBe("PG-02");
  });
});
