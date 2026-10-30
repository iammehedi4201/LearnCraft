import { describe, it, expect } from "vitest";
import {
  ALL_EXPRESS_LESSONS,
  getExpressLessonBySlug,
} from "@/app/learn/express/content";
import {
  EXPRESS_LESSONS,
  EXPRESS_PROGRESSION_PHASES,
  getExpressCourse,
  getLessonBySlug,
} from "@/app/learn/express/data/express-curriculum";
import { getExpressLessonContent } from "@/app/learn/express/data/express-lesson-content";

describe("Express.js Authoritative Curriculum Integrity Test Suite", () => {
  it("should contain exactly 22 lessons", () => {
    expect(ALL_EXPRESS_LESSONS.length).toBe(22);
    expect(EXPRESS_LESSONS.length).toBe(22);
  });

  it("should have exactly 5 progression phases", () => {
    expect(EXPRESS_PROGRESSION_PHASES.length).toBe(5);
    const course = getExpressCourse();
    expect(course.phases.length).toBe(5);

    const totalCourseLessons = course.phases.reduce(
      (sum, p) => sum + p.lessons.length,
      0
    );
    expect(totalCourseLessons).toBe(22);
  });

  it("should have unique, correctly ordered lesson codes EXP-01 through EXP-22", () => {
    const expectedCodes = Array.from({ length: 22 }, (_, i) => {
      const num = String(i + 1).padStart(2, "0");
      return `EXP-${num}`;
    });

    const contentCodes = ALL_EXPRESS_LESSONS.map((l) => l.code);
    expect(contentCodes).toEqual(expectedCodes);

    const metaCodes = EXPRESS_LESSONS.map((l) => l.code);
    expect(metaCodes).toEqual(expectedCodes);
  });

  it("should include scenarios with simple model answers for all 22 lessons", () => {
    for (const lesson of ALL_EXPRESS_LESSONS) {
      expect(lesson.scenario).toBeDefined();
      expect(lesson.scenario?.question.trim().length).toBeGreaterThan(10);
      expect(lesson.scenario?.answer.trim().length).toBeGreaterThan(10);
    }
  });

  it("should include interview questions ONLY on Lessons 4, 8, 11, and 13", () => {
    const interviewCodes = ["EXP-04", "EXP-08", "EXP-11", "EXP-13"];

    for (const lesson of ALL_EXPRESS_LESSONS) {
      if (lesson.code && interviewCodes.includes(lesson.code)) {
        expect(lesson.interviewQuestion).toBeDefined();
        expect(lesson.interviewQuestion?.question.trim().length).toBeGreaterThan(10);
        expect(lesson.interviewQuestion?.answer.trim().length).toBeGreaterThan(10);
      } else {
        expect(lesson.interviewQuestion).toBeUndefined();
      }
    }
  });

  it("should implement all 7 standard parts across all 22 lessons", () => {
    for (const lesson of ALL_EXPRESS_LESSONS) {
      expect(lesson.part1?.title).toBeTruthy();
      expect(lesson.part1?.bigPicture).toBeTruthy();
      expect(lesson.part1?.breakdownItems?.length).toBeGreaterThan(0);

      expect(lesson.part2?.title).toBeTruthy();
      expect(lesson.part2?.cards?.length).toBeGreaterThan(0);
      for (const card of lesson.part2?.cards || []) {
        expect(card.description).toBeTruthy();
      }

      expect(lesson.part3?.title).toBeTruthy();
      expect(lesson.part3?.points?.length).toBeGreaterThan(0);

      expect(lesson.part4?.title).toBeTruthy();
      expect(lesson.part4?.bad?.code).toBeTruthy();
      expect(lesson.part4?.good?.code).toBeTruthy();

      expect(lesson.part5?.title).toBeTruthy();
      expect(lesson.part5?.starterCode).toBeTruthy();

      expect(lesson.part6?.title).toBeTruthy();
      expect(lesson.part6?.quiz?.options.length).toBe(4);
      expect(lesson.part6?.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(lesson.part6?.quiz?.correctIndex).toBeLessThan(4);

      expect(lesson.part7?.title).toBeTruthy();
      expect(lesson.part7?.takeaways?.length).toBeGreaterThan(0);
    }
  });

  it("should resolve legacy slugs and codes seamlessly via EXPRESS_LEGACY_SLUG_MAP", () => {
    // Test key legacy slugs
    expect(getExpressLessonBySlug("exp02-app-object")?.slug).toBe(
      "exp02-starting-an-express-project"
    );
    expect(getExpressLessonBySlug("exp08-body-parsing")?.slug).toBe(
      "exp07-reading-a-request-body"
    );
    expect(getExpressLessonBySlug("exp10-middleware-mental-model")?.slug).toBe(
      "exp08-middleware"
    );
    expect(getExpressLessonBySlug("exp13-rest-crud-endpoints")?.slug).toBe(
      "exp11-build-rest-style-routes"
    );
    expect(getExpressLessonBySlug("exp28-production-best-practices")?.slug).toBe(
      "exp18-basic-express-security"
    );

    // Test getLessonBySlug helper in curriculum
    expect(getLessonBySlug("exp02-app-object")?.code).toBe("EXP-02");
    expect(getLessonBySlug("exp28-production-best-practices")?.code).toBe("EXP-18");

    // Test getExpressLessonContent fallback and resolution
    expect(getExpressLessonContent("exp02-app-object").code).toBe("EXP-02");
    expect(getExpressLessonContent("exp19-error-handling-middleware").code).toBe("EXP-13");
  });
});
