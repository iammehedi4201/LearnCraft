import { describe, it, expect } from "vitest";
import {
  NODEJS_STAGES,
  getAllLessons as getAllNodejsLessons,
  getLessonBySlug as getNodejsLessonBySlug,
  getLessonByCode as getNodejsLessonByCode,
  getStageByLessonSlug as getNodejsStageByLessonSlug,
  getNextLesson as getNextNodejsLesson,
  getPrevLesson as getPrevNodejsLesson,
  getNodejsCourse,
  NODEJS_LEGACY_SLUG_MAP,
} from "../../app/learn/nodejs/data/nodejs-curriculum";
import {
  getNodejsLessonContent,
  NODEJS_LESSONS_CONTENT,
} from "../../app/learn/nodejs/data/nodejs-lesson-content";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("Node.js Curriculum Integrity & Health Suite", () => {
  it("contains exactly 6 stages and 20 authoritative lessons in curriculum", () => {
    expect(NODEJS_STAGES.length).toBe(6);
    const lessons = getAllNodejsLessons();
    expect(lessons.length).toBe(20);
  });

  it("ensures all 20 lessons have unique codes and slugs", () => {
    const lessons = getAllNodejsLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(20);
    expect(slugs.size).toBe(20);
  });

  it("verifies that getNodejsLessonBySlug resolves slugs, codes, legacy aliases, and prefixes correctly", () => {
    expect(Object.keys(NODEJS_LEGACY_SLUG_MAP).length).toBeGreaterThan(0);
    expect(NODEJS_LEGACY_SLUG_MAP["node02-nodejs-vs-browser"]).toBe("node02-start-and-run-a-nodejs-project");
    expect(NODEJS_LEGACY_SLUG_MAP["node03-event-loop-and-async-io"]).toBe("node10-understand-the-event-loop");

    const bySlug = getNodejsLessonBySlug("node01-what-is-nodejs");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("NODE-01");

    const byLegacy = getNodejsLessonBySlug("node02-nodejs-vs-browser");
    expect(byLegacy).toBeDefined();
    expect(byLegacy?.code).toBe("NODE-02");

    const byCode = getNodejsLessonByCode("NODE-01");
    expect(byCode).toBeDefined();
    expect(byCode?.slug).toBe("node01-what-is-nodejs");

    const byPrefix = getNodejsLessonBySlug("node01");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("NODE-01");
  });

  it("verifies navigation helpers getNextLesson and getPrevLesson traverse all 20 lessons sequentially", () => {
    const lessons = getAllNodejsLessons();
    expect(getPrevNodejsLesson(lessons[0].slug)).toBeNull();
    expect(getNextNodejsLesson(lessons[19].slug)).toBeNull();

    for (let i = 0; i < lessons.length - 1; i++) {
      const next = getNextNodejsLesson(lessons[i].slug);
      expect(next?.slug).toBe(lessons[i + 1].slug);
      const prev = getPrevNodejsLesson(lessons[i + 1].slug);
      expect(prev?.slug).toBe(lessons[i].slug);
    }
  });

  it("verifies stage lookup by lesson slug correctly resolves parent stage", () => {
    const stage1 = getNodejsStageByLessonSlug("node01-what-is-nodejs");
    expect(stage1?.id).toBe("stage-1");

    const stage6 = getNodejsStageByLessonSlug("node20-keep-a-nodejs-application-responsive");
    expect(stage6?.id).toBe("stage-6");
  });

  it("verifies all 20 handcrafted lessons across all 6 Stages meet strict pedagogical structure", () => {
    const handcraftedSlugs = [
      "node01-what-is-nodejs",
      "node02-start-and-run-a-nodejs-project",
      "node03-what-are-npm-and-packages",
      "node04-import-and-export-code",
      "node05-read-environment-variables-safely",
      "node06-read-and-write-files",
      "node07-why-the-path-module-matters",
      "node08-synchronous-vs-asynchronous-work",
      "node09-use-async-and-await",
      "node10-understand-the-event-loop",
      "node11-handle-errors-with-try-catch",
      "node12-events-and-eventemitter",
      "node13-buffers-and-streams",
      "node14-understand-http-requests-and-responses",
      "node15-make-an-http-request-with-fetch",
      "node16-validate-input-and-avoid-trusting-users",
      "node17-use-process-and-exit-codes",
      "node18-debug-nodejs-code",
      "node19-write-basic-tests",
      "node20-keep-a-nodejs-application-responsive",
    ];

    expect(handcraftedSlugs.length).toBe(20);

    for (const slug of handcraftedSlugs) {
      expect(NODEJS_LESSONS_CONTENT[slug], `Missing handcrafted registry entry for ${slug}`).toBeDefined();
      const content = getNodejsLessonContent(slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
      expect(content.sections.length).toBe(7);

      // Difficulty label
      expect(content.difficulty).toBeDefined();
      expect(["Easy", "Moderate", "Difficult"]).toContain(content.difficulty);

      // Scenario question and simple answer on every lesson
      expect(content.scenario, `Missing scenario in ${slug}`).toBeDefined();
      expect(content.scenario?.question?.length).toBeGreaterThan(10);
      expect(content.scenario?.answer?.length).toBeGreaterThan(10);

      // Part 1: Core Concept & Syntax
      expect(content.part1).toBeDefined();
      expect(content.part1?.bigPicture?.length).toBeGreaterThan(20);
      expect(content.part1?.codeSnippet?.length).toBeGreaterThan(5);
      expect(content.part1?.breakdownItems?.length).toBeGreaterThanOrEqual(3);

      // Part 2: Why It Matters & Rules
      expect(content.part2).toBeDefined();
      expect(content.part2?.cards?.length).toBe(3);
      expect(content.part2?.rule).toBeDefined();

      // Part 3: Real-World Scenarios & Practice
      expect(content.part3).toBeDefined();
      expect(content.part3?.points?.length).toBeGreaterThanOrEqual(2);

      // Part 4: Common Pitfalls & Fixes
      expect(content.part4).toBeDefined();
      expect(content.part4?.bad?.code?.length).toBeGreaterThan(5);
      expect(content.part4?.good?.code?.length).toBeGreaterThan(5);

      // Part 5: Interactive Code Sandbox
      expect(content.part5).toBeDefined();
      expect(content.part5?.starterCode?.length).toBeGreaterThan(10);

      // Part 6: Knowledge Check Quiz
      expect(content.part6).toBeDefined();
      expect(content.part6?.quiz?.options?.length).toBe(4);
      expect(content.part6?.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(content.part6?.quiz?.correctIndex).toBeLessThan(4);

      // Part 7: Summary & Key Takeaways
      expect(content.part7).toBeDefined();
      expect(content.part7?.takeaways?.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifies lessons 4, 10, and 19 have dedicated interview questions matching source of truth", () => {
    const l4 = getNodejsLessonContent("node04-import-and-export-code");
    expect(l4.interviewQuestion).toBeDefined();
    expect(l4.interviewQuestion?.question).toContain("purpose of modules");

    const l10 = getNodejsLessonContent("node10-understand-the-event-loop");
    expect(l10.interviewQuestion).toBeDefined();
    expect(l10.interviewQuestion?.question).toContain("event loop");

    const l19 = getNodejsLessonContent("node19-write-basic-tests");
    expect(l19.interviewQuestion).toBeDefined();
    expect(l19.interviewQuestion?.question).toContain("tests useful");
  });

  it("verifies getNodejsCourse returns a valid Course object for progressive disclosure", () => {
    const course = getNodejsCourse();
    expect(course.id).toBe("nodejs");
    expect(course.title).toBe("Learn Node.js");
    expect(course.phases.length).toBe(6);
    expect(course.capstone).toBeDefined();

    const totalLessons = course.phases.reduce((acc, p) => acc + p.lessons.length, 0);
    expect(totalLessons).toBe(20);
  });

  it("verifies quiz registry resolves nodejs quizzes correctly", () => {
    const quiz1 = getQuizBySlug("nodejs", "node01-what-is-nodejs");
    expect(quiz1).toBeDefined();
    expect(quiz1?.trackKey).toBe("nodejs");
  });
});
