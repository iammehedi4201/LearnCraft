import { describe, it, expect } from "vitest";
import {
  JS_STAGES,
  getAllLessons,
  getLessonBySlug,
} from "../../app/learn/javascript/data/javascript-curriculum";
import {
  getJSLessonContent,
} from "../../app/learn/javascript/data/javascript-lesson-content";
import { JAVASCRIPT_QUESTIONS } from "../interview-questions/javascript-questions";
import { JAVASCRIPT_MODULE_QUIZZES } from "../quiz/javascript-quizzes";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("JavaScript Curriculum Integrity & Health Suite", () => {
  it("contains exactly 4 stages and 22 authoritative lessons in curriculum", () => {
    expect(JS_STAGES.length).toBe(4);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(22);
  });

  it("ensures all 22 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(22);
    expect(slugs.size).toBe(22);
  });

  it("verifies that getLessonBySlug resolves slugs, codes, legacy aliases, and prefixes correctly", () => {
    // 1. Authoritative slug match
    const bySlug = getLessonBySlug("js01-what-javascript-does");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("JS-01");

    // 2. Legacy slug alias match
    const byLegacy = getLessonBySlug("js01-how-javascript-runs");
    expect(byLegacy).toBeDefined();
    expect(byLegacy?.code).toBe("JS-01");

    // 3. Prefix/code match
    const byCode = getLessonBySlug("js06");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("JS-06");

    const byDashCode = getLessonBySlug("JS-15");
    expect(byDashCode).toBeDefined();
    expect(byDashCode?.code).toBe("JS-15");
  });

  it("verifies all 22 lessons have complete, tailored section content adhering to authoritative requirements", () => {
    const lessons = getAllLessons();
    const interviewLessons = [
      "js04-comparisons-and-strict-equality",
      "js07-functions-and-return-values",
      "js08-scope-and-block-scope",
      "js09-arrays-and-common-methods",
      "js11-primitive-values-vs-object-references",
      "js15-closures",
      "js16-the-this-keyword",
      "js18-promises-and-async-await",
      "js19-the-event-loop-a-basic-view",
      "js21-json-fetch-and-api-responses",
    ];

    for (const lesson of lessons) {
      const content = getJSLessonContent(lesson.slug);
      expect(content, `Missing content for ${lesson.slug}`).toBeDefined();
      expect(content.code).toBe(lesson.code);
      expect(content.title?.length).toBeGreaterThanOrEqual(5);
      expect(content.subtitle?.length).toBeGreaterThan(10);
      expect(content.sections.length).toBe(7);

      // Difficulty label
      expect(content.difficulty).toBeDefined();
      expect(["Easy", "Moderate", "Difficult"]).toContain(content.difficulty);
      expect(content.difficulty).toBe(lesson.difficulty);

      // Part 1: Overview
      expect(content.part1?.bigPicture?.length).toBeGreaterThan(20);
      expect(content.part1?.breakdownItems?.length).toBeGreaterThanOrEqual(3);

      // Part 2: Mechanics
      expect(content.part2?.cards?.length).toBe(3);
      expect(content.part2?.rule?.content?.length).toBeGreaterThan(10);

      // Part 3: Mental Model Points + Scenario Question & Easy-Word Answer
      expect(content.part3?.points?.length).toBeGreaterThanOrEqual(3);
      expect(content.scenario, `Missing scenario on ${lesson.slug}`).toBeDefined();
      expect(content.scenario?.question.length).toBeGreaterThan(10);
      expect(content.scenario?.answer.length).toBeGreaterThan(10);

      // Interview questions ONLY where present in the authoritative source
      if (interviewLessons.includes(lesson.slug)) {
        expect(content.interviewQuestion, `Expected interview question on ${lesson.slug}`).toBeDefined();
        expect(content.interviewQuestion?.question.length).toBeGreaterThan(10);
        expect(content.interviewQuestion?.answer.length).toBeGreaterThan(10);
      } else {
        expect(content.interviewQuestion, `Unexpected interview question on ${lesson.slug}`).toBeUndefined();
      }

      // Part 4: Bad vs Clean Code
      expect(content.part4?.bad?.code?.length).toBeGreaterThan(10);
      expect(content.part4?.good?.code?.length).toBeGreaterThan(10);

      // Part 5: Interactive Sandbox
      expect(content.part5?.starterCode?.length).toBeGreaterThan(20);

      // Part 6: In-Lesson Knowledge Check Quiz
      expect(content.part6?.quiz).toBeDefined();
      expect(content.part6?.quiz?.question?.length).toBeGreaterThan(10);
      expect(content.part6?.quiz?.options?.length).toBe(4);
      expect(content.part6?.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(content.part6?.quiz?.correctIndex).toBeLessThan(4);
      expect(content.part6?.quiz?.explanation?.length).toBeGreaterThan(10);

      // Part 7: Summary & Key Takeaways
      expect(content.part7?.takeaways?.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifies all 30 JavaScript interview questions link to valid curriculum lessons", () => {
    expect(JAVASCRIPT_QUESTIONS.length).toBe(30);

    for (const q of JAVASCRIPT_QUESTIONS) {
      expect(q.relatedLessonSlug).toBeDefined();
      expect(q.relatedLessonSlug).toMatch(/^\/learn\/javascript\/js\d\d-/);

      const slug = q.relatedLessonSlug?.replace("/learn/javascript/", "") || "";
      const lesson = getLessonBySlug(slug);
      expect(lesson, `Interview question ${q.id} references invalid lesson slug: ${q.relatedLessonSlug}`).toBeDefined();
      expect(q.relatedLessonName).toBeDefined();
    }
  });

  it("verifies all 22 curriculum lessons have dedicated module quizzes with valid questions", () => {
    expect(JAVASCRIPT_MODULE_QUIZZES.length).toBe(22);

    const lessons = getAllLessons();
    const quizMap = new Map(JAVASCRIPT_MODULE_QUIZZES.map((q) => [q.lessonSlug, q]));

    for (const lesson of lessons) {
      const quiz = quizMap.get(lesson.slug);
      expect(quiz, `Missing module quiz for lesson ${lesson.slug}`).toBeDefined();
      expect(quiz?.lessonCode).toBe(lesson.code);
      expect(quiz?.questions.length).toBeGreaterThanOrEqual(3);

      for (const q of quiz?.questions || []) {
        expect(q.id).toBeDefined();
        expect(q.prompt.length).toBeGreaterThan(10);
        expect(q.options.length).toBe(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(10);
      }

      // Verify resolution through getQuizBySlug
      const resolved = getQuizBySlug("javascript", lesson.slug);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(quiz?.id);
    }
  });

  it("verifies legacy quiz slugs resolve seamlessly to authoritative module quizzes", () => {
    const legacyQuiz = getQuizBySlug("javascript", "js01-how-javascript-runs");
    expect(legacyQuiz).toBeDefined();
    expect(legacyQuiz?.lessonSlug).toBe("js01-what-javascript-does");
  });

  it("verifies every section listed in content.sections maps to defined content", () => {
    const lessons = getAllLessons();

    for (const lesson of lessons) {
      const content = getJSLessonContent(lesson.slug);
      for (const sec of content.sections) {
        expect(["part1", "part2", "part3", "part4", "part5", "part6", "part7"]).toContain(sec.id);
        expect((content as any)[sec.id], `Section ${sec.id} in ${lesson.slug} does not have content`).toBeDefined();
      }
    }
  });
});
