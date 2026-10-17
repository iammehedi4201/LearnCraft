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

describe("JavaScript Curriculum Integrity & Health Suite", () => {
  it("contains exactly 8 stages and 30 authoritative lessons in curriculum", () => {
    expect(JS_STAGES.length).toBe(8);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(30);
  });

  it("ensures all 30 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(30);
    expect(slugs.size).toBe(30);
  });

  it("verifies that getLessonBySlug resolves slugs, codes, and prefixes correctly", () => {
    const bySlug = getLessonBySlug("js06-functions-and-arrow-syntax");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("JS-06");

    // Prefix/alias match
    const byPrefix = getLessonBySlug("js06-functions");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("JS-06");

    // Code match
    const byCode = getLessonBySlug("js06");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("JS-06");
  });

  it("verifies all 30 lessons have complete 7-part content in JS_LESSONS_CONTENT", () => {
    const lessons = getAllLessons();

    for (const lesson of lessons) {
      const content = getJSLessonContent(lesson.slug);
      expect(content, `Missing content for ${lesson.slug}`).toBeDefined();
      expect(content.code).toBe(lesson.code);
      expect(content.title.length).toBeGreaterThan(5);
      expect(content.subtitle.length).toBeGreaterThan(10);
      expect(content.sections.length).toBe(7);

      // Part 1: Overview
      expect(content.part1.bigPicture.length).toBeGreaterThan(20);
      expect(content.part1.breakdownItems.length).toBeGreaterThanOrEqual(3);

      // Part 2: Mechanics
      expect(content.part2.cards.length).toBe(3);
      expect(content.part2.rule.content.length).toBeGreaterThan(10);

      // Part 3: Mental Model
      expect(content.part3.points.length).toBe(3);

      // Part 4: Bad vs Clean Code
      expect(content.part4.bad.code.length).toBeGreaterThan(10);
      expect(content.part4.good.code.length).toBeGreaterThan(10);

      // Part 5: Interactive Sandbox
      expect(content.part5.starterCode.length).toBeGreaterThan(20);

      // Part 6: Summary & Key Takeaways
      expect(content.part6.takeaways?.length).toBeGreaterThanOrEqual(3);

      // Part 7: Knowledge Check Quiz
      expect(content.part7.quiz).toBeDefined();
      expect(content.part7.quiz?.question.length).toBeGreaterThan(10);
      expect(content.part7.quiz?.options.length).toBe(4);
      expect(content.part7.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(content.part7.quiz?.correctIndex).toBeLessThan(4);
      expect(content.part7.quiz?.explanation.length).toBeGreaterThan(10);
    }
  });

  it("verifies all 20 JavaScript interview questions link to valid curriculum lessons", () => {
    expect(JAVASCRIPT_QUESTIONS.length).toBe(20);

    for (const q of JAVASCRIPT_QUESTIONS) {
      expect(q.relatedLessonSlug).toBeDefined();
      expect(q.relatedLessonSlug).toMatch(/^\/learn\/javascript\/js\d\d-/);

      const slug = q.relatedLessonSlug?.replace("/learn/javascript/", "") || "";
      const lesson = getLessonBySlug(slug);
      expect(lesson, `Interview question ${q.id} references invalid lesson slug: ${q.relatedLessonSlug}`).toBeDefined();
      expect(q.relatedLessonName).toBeDefined();
    }
  });

  it("verifies curated JavaScript module quizzes have valid questions and non-ambiguous options", () => {
    expect(JAVASCRIPT_MODULE_QUIZZES.length).toBeGreaterThanOrEqual(10);

    for (const quiz of JAVASCRIPT_MODULE_QUIZZES) {
      expect(quiz.trackKey).toBe("javascript");
      expect(quiz.questions.length).toBeGreaterThanOrEqual(3);

      for (const q of quiz.questions) {
        expect(q.id).toBeDefined();
        expect(q.prompt.length).toBeGreaterThan(10);
        expect(q.options.length).toBe(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(10);
      }
    }
  });
});
