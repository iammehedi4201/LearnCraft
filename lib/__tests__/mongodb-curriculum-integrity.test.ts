import { describe, it, expect } from "vitest";
import {
  ALL_MONGODB_LESSONS,
  getMongodbLessonBySlug,
} from "@/app/learn/mongodb/content";
import {
  MONGODB_LESSONS,
  MONGODB_PROGRESSION_PHASES,
  getMongoDBCourse,
  getLessonBySlug,
} from "@/app/learn/mongodb/data/mongodb-curriculum";
import { getMongodbLessonContent } from "@/app/learn/mongodb/data/mongodb-lesson-content";

describe("MongoDB Authoritative Curriculum Integrity Test Suite", () => {
  it("should contain exactly 20 lessons", () => {
    expect(ALL_MONGODB_LESSONS.length).toBe(20);
    expect(MONGODB_LESSONS.length).toBe(20);
  });

  it("should have exactly 5 progression phases", () => {
    expect(MONGODB_PROGRESSION_PHASES.length).toBe(5);
    const course = getMongoDBCourse();
    expect(course.phases.length).toBe(5);

    const totalCourseLessons = course.phases.reduce(
      (sum, p) => sum + p.lessons.length,
      0
    );
    expect(totalCourseLessons).toBe(20);
  });

  it("should have unique, correctly ordered lesson codes MDB-01 through MDB-20", () => {
    const expectedCodes = Array.from({ length: 20 }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `MDB-${num}`;
    });

    const contentCodes = ALL_MONGODB_LESSONS.map((l) => l.code);
    expect(contentCodes).toEqual(expectedCodes);

    const metaCodes = MONGODB_LESSONS.map((l) => l.code);
    expect(metaCodes).toEqual(expectedCodes);
  });

  it("should include scenarios with simple model answers for all 20 lessons", () => {
    for (const lesson of ALL_MONGODB_LESSONS) {
      expect(lesson.scenario).toBeDefined();
      expect(lesson.scenario?.question.trim().length).toBeGreaterThan(10);
      expect(lesson.scenario?.answer.trim().length).toBeGreaterThan(10);
    }
  });

  it("should include interview questions on Lessons 2, 8, 11, 13, 16, and 18", () => {
    const interviewCodes = ["MDB-02", "MDB-08", "MDB-11", "MDB-13", "MDB-16", "MDB-18"];

    for (const lesson of ALL_MONGODB_LESSONS) {
      if (lesson.code && interviewCodes.includes(lesson.code)) {
        expect(lesson.interviewQuestion).toBeDefined();
        expect(lesson.interviewQuestion?.question.trim().length).toBeGreaterThan(10);
        expect(lesson.interviewQuestion?.answer.trim().length).toBeGreaterThan(10);
      } else {
        expect(lesson.interviewQuestion).toBeUndefined();
      }
    }
  });

  it("should implement all 7 standard parts across all 20 lessons", () => {
    for (const lesson of ALL_MONGODB_LESSONS) {
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
      expect(lesson.part4?.bad?.code).toBeTruthy();
      expect(lesson.part4?.good?.code).toBeTruthy();

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

  it("should resolve legacy slugs and codes seamlessly via MONGODB_LEGACY_SLUG_MAP", () => {
    // Direct legacy slugs from 26-lesson schema
    expect(getMongodbLessonBySlug("mdb02-databases-collections-bson")?.code).toBe("MDB-02");
    expect(getMongodbLessonBySlug("mdb03-mongosh-and-compass")?.code).toBe("MDB-03");
    expect(getMongodbLessonBySlug("mdb04-create-insert")?.code).toBe("MDB-04");
    expect(getMongodbLessonBySlug("mdb05-read-find-projections")?.code).toBe("MDB-05");
    expect(getMongodbLessonBySlug("mdb06-update-operators")?.code).toBe("MDB-08");
    expect(getMongodbLessonBySlug("mdb07-delete-documents")?.code).toBe("MDB-09");
    expect(getMongodbLessonBySlug("mdb08-comparison-logical-operators")?.code).toBe("MDB-06");
    expect(getMongodbLessonBySlug("mdb10-sort-limit-pagination")?.code).toBe("MDB-07");
    expect(getMongodbLessonBySlug("mdb11-querying-arrays-nested")?.code).toBe("MDB-10");
    expect(getMongodbLessonBySlug("mdb13-embedding-vs-referencing")?.code).toBe("MDB-11");
    expect(getMongodbLessonBySlug("mdb16-schema-validation-rules")?.code).toBe("MDB-12");
    expect(getMongodbLessonBySlug("mdb22-indexes-fundamentals")?.code).toBe("MDB-13");
    expect(getMongodbLessonBySlug("mdb23-explain-plan-esr-rule")?.code).toBe("MDB-14");
    expect(getMongodbLessonBySlug("mdb24-atomicity-multi-doc-transactions")?.code).toBe("MDB-18");
    expect(getMongodbLessonBySlug("mdb26-production-best-practices")?.code).toBe("MDB-20");

    // Legacy interview question slugs
    expect(getMongodbLessonBySlug("mg01-what-is-mongodb")?.code).toBe("MDB-01");
    expect(getMongodbLessonBySlug("mg03-schema-design-patterns")?.code).toBe("MDB-11");
    expect(getMongodbLessonBySlug("mg04-indexing-strategies")?.code).toBe("MDB-13");
    expect(getMongodbLessonBySlug("mg05-aggregation-pipeline")?.code).toBe("MDB-16");
    expect(getMongodbLessonBySlug("mg06-replica-sets-and-failover")?.code).toBe("MDB-20");

    // Code aliases
    expect(getMongodbLessonBySlug("mdb-01")?.slug).toBe("mdb01-what-is-mongodb");
    expect(getMongodbLessonBySlug("mdb-06")?.code).toBe("MDB-06");
    expect(getMongodbLessonBySlug("mdb-20")?.code).toBe("MDB-20");

    // Curriculum metadata helper lookup
    expect(getLessonBySlug("mdb04-create-insert")?.code).toBe("MDB-04");
    expect(getLessonBySlug("mg03-schema-design-patterns")?.code).toBe("MDB-11");
    expect(getMongodbLessonContent("mdb04-create-insert").code).toBe("MDB-04");
  });
});

