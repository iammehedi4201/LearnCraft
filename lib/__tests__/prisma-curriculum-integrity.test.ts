import { describe, it, expect } from "vitest";
import {
  ALL_PRISMA_LESSONS,
  getPrismaLessonBySlug,
} from "@/app/learn/prisma/content";
import {
  PRISMA_LESSONS,
  PRISMA_PROGRESSION_PHASES,
  getPrismaCourse,
  getLessonBySlug,
} from "@/app/learn/prisma/data/prisma-curriculum";
import { getPrismaLessonContent } from "@/app/learn/prisma/data/prisma-lesson-content";

describe("Prisma Authoritative Curriculum Integrity Test Suite", () => {
  it("should contain exactly 20 lessons", () => {
    expect(ALL_PRISMA_LESSONS.length).toBe(20);
    expect(PRISMA_LESSONS.length).toBe(20);
  });

  it("should have exactly 5 progression phases", () => {
    expect(PRISMA_PROGRESSION_PHASES.length).toBe(5);
    const course = getPrismaCourse();
    expect(course.phases.length).toBe(5);

    const totalCourseLessons = course.phases.reduce(
      (sum, p) => sum + p.lessons.length,
      0
    );
    expect(totalCourseLessons).toBe(20);
  });

  it("should have unique, correctly ordered lesson codes PRI-01 through PRI-20", () => {
    const expectedCodes = Array.from({ length: 20 }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `PRI-${num}`;
    });

    const contentCodes = ALL_PRISMA_LESSONS.map((l) => l.code);
    expect(contentCodes).toEqual(expectedCodes);

    const metaCodes = PRISMA_LESSONS.map((l) => l.code);
    expect(metaCodes).toEqual(expectedCodes);
  });

  it("should include scenarios with simple model answers for all 20 lessons", () => {
    for (const lesson of ALL_PRISMA_LESSONS) {
      expect(lesson.scenario).toBeDefined();
      expect(lesson.scenario?.question.trim().length).toBeGreaterThan(10);
      expect(lesson.scenario?.answer.trim().length).toBeGreaterThan(10);
    }
  });

  it("should include interview questions on Lessons 1, 5, 10, 13, and 16", () => {
    const interviewCodes = ["PRI-01", "PRI-05", "PRI-10", "PRI-13", "PRI-16"];

    for (const lesson of ALL_PRISMA_LESSONS) {
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
    for (const lesson of ALL_PRISMA_LESSONS) {
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

  it("should resolve legacy slugs and codes seamlessly via PRISMA_LEGACY_SLUG_MAP", () => {
    // Direct legacy slugs from 27-lesson schema
    expect(getPrismaLessonBySlug("pri02-prisma-architecture-workflow")?.code).toBe("PRI-02");
    expect(getPrismaLessonBySlug("pri03-project-setup-and-cli")?.code).toBe("PRI-02");
    expect(getPrismaLessonBySlug("pri04-models-fields-scalar-types")?.code).toBe("PRI-03");
    expect(getPrismaLessonBySlug("pri05-ids-defaults-and-attributes")?.code).toBe("PRI-04");
    expect(getPrismaLessonBySlug("pri06-enums-mapping-and-indexes")?.code).toBe("PRI-04");
    expect(getPrismaLessonBySlug("pri07-relations-mental-model")?.code).toBe("PRI-10");
    expect(getPrismaLessonBySlug("pri08-one-to-one-and-one-to-many")?.code).toBe("PRI-10");
    expect(getPrismaLessonBySlug("pri09-many-to-many-relations")?.code).toBe("PRI-10");
    expect(getPrismaLessonBySlug("pri10-prisma-client-setup-generation")?.code).toBe("PRI-05");
    expect(getPrismaLessonBySlug("pri11-findunique-findfirst-findmany")?.code).toBe("PRI-06");
    expect(getPrismaLessonBySlug("pri12-create-update-delete-mutations")?.code).toBe("PRI-07");
    expect(getPrismaLessonBySlug("pri13-include-vs-select-relation-loading")?.code).toBe("PRI-11");
    expect(getPrismaLessonBySlug("pri14-nested-writes-creates-updates")?.code).toBe("PRI-12");
    expect(getPrismaLessonBySlug("pri15-connect-disconnect-connect-or-create")?.code).toBe("PRI-12");
    expect(getPrismaLessonBySlug("pri16-filtering-comparison-logical")?.code).toBe("PRI-08");
    expect(getPrismaLessonBySlug("pri17-relation-filters-some-every-none")?.code).toBe("PRI-08");
    expect(getPrismaLessonBySlug("pri18-pagination-offset-cursor")?.code).toBe("PRI-17");
    expect(getPrismaLessonBySlug("pri19-migrations-mental-model-sql")?.code).toBe("PRI-13");
    expect(getPrismaLessonBySlug("pri20-prisma-migrate-dev-and-deploy")?.code).toBe("PRI-13");
    expect(getPrismaLessonBySlug("pri21-db-push-vs-migrate-prototyping")?.code).toBe("PRI-13");
    expect(getPrismaLessonBySlug("pri22-transactions-mental-model-acid")?.code).toBe("PRI-16");
    expect(getPrismaLessonBySlug("pri23-batch-transactions-transaction")?.code).toBe("PRI-16");
    expect(getPrismaLessonBySlug("pri24-interactive-transactions-callbacks")?.code).toBe("PRI-16");
    expect(getPrismaLessonBySlug("pri25-prisma-error-codes-p2002-p2025")?.code).toBe("PRI-15");
    expect(getPrismaLessonBySlug("pri26-debugging-logging-prisma-studio")?.code).toBe("PRI-14");
    expect(getPrismaLessonBySlug("pri27-production-singleton-connection-pooling")?.code).toBe("PRI-19");

    // Code aliases
    expect(getPrismaLessonBySlug("pri-01")?.slug).toBe("pri01-what-is-prisma");
    expect(getPrismaLessonBySlug("pri-05")?.code).toBe("PRI-05");
    expect(getPrismaLessonBySlug("pri-20")?.code).toBe("PRI-20");

    // Curriculum metadata helper lookup
    expect(getLessonBySlug("pri02-prisma-architecture-workflow")?.code).toBe("PRI-02");
    expect(getLessonBySlug("pri25-prisma-error-codes-p2002-p2025")?.code).toBe("PRI-15");
    expect(getPrismaLessonContent("pri02-prisma-architecture-workflow").code).toBe("PRI-02");
  });
});
