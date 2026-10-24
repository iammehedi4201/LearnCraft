import { describe, it, expect } from "vitest";
import {
  NESTJS_STAGES,
  getAllNestjsLessons,
  getNestjsLessonBySlug,
  NESTJS_LEGACY_SLUG_MAP,
} from "../../app/learn/nestjs/data/nestjs-curriculum";
import {
  getNestjsLessonContent,
  NESTJS_LESSONS_CONTENT,
} from "../../app/learn/nestjs/data/nestjs-lesson-content";
import { NESTJS_MODULE_QUIZZES } from "../quiz/nestjs-quizzes";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("NestJS Curriculum Integrity & Health Suite", () => {
  it("contains exactly 5 stages and 19 authoritative lessons in curriculum", () => {
    expect(NESTJS_STAGES.length).toBe(5);
    const lessons = getAllNestjsLessons();
    expect(lessons.length).toBe(19);
  });

  it("ensures all 19 lessons have unique codes and slugs", () => {
    const lessons = getAllNestjsLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(19);
    expect(slugs.size).toBe(19);
  });

  it("verifies that getNestjsLessonBySlug resolves slugs, codes, legacy aliases, and prefixes correctly", () => {
    expect(Object.keys(NESTJS_LEGACY_SLUG_MAP).length).toBeGreaterThan(0);
    expect(NESTJS_LEGACY_SLUG_MAP["nj02-oop-foundations"]).toBe("nj03-project-structure-and-main");

    const bySlug = getNestjsLessonBySlug("nj01-what-is-nestjs");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("NJ-01");

    const byLegacy = getNestjsLessonBySlug("nj02-oop-foundations");
    expect(byLegacy).toBeDefined();
    expect(byLegacy?.code).toBe("NJ-03");

    const byCode = getNestjsLessonBySlug("nj-01");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("NJ-01");

    const byPrefix = getNestjsLessonBySlug("nj01");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("NJ-01");
  });

  it("verifies all 19 handcrafted lessons across all 5 Stages meet strict pedagogical structure", () => {
    const handcraftedSlugs = [
      "nj01-what-is-nestjs",
      "nj03-project-structure-and-main",
      "nj04-modules",
      "nj05-controllers",
      "nj06-routes-and-http-methods",
      "nj07-parameters-and-request-bodies",
      "nj08-providers-and-services",
      "nj09-dependency-injection",
      "nj10-decorators",
      "nj11-dtos-data-transfer-objects",
      "nj12-validation-and-pipes",
      "nj13-handling-errors",
      "nj14-middleware",
      "nj15-guards-and-route-protection",
      "nj16-interceptors",
      "nj17-the-request-lifecycle",
      "nj18-authentication-vs-authorization",
      "nj19-testing-a-nestjs-service",
      "nj20-organize-a-feature-and-debug",
    ];

    expect(handcraftedSlugs.length).toBe(19);

    for (const slug of handcraftedSlugs) {
      expect(NESTJS_LESSONS_CONTENT[slug], `Missing handcrafted registry entry for ${slug}`).toBeDefined();
      const content = getNestjsLessonContent(slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
      expect(content.sections.length).toBe(7);

      // Difficulty label
      expect(content.difficulty).toBeDefined();
      expect(["Easy", "Moderate", "Difficult"]).toContain(content.difficulty);

      // Part 1: Overview & Mental Model
      expect(content.part1).toBeDefined();
      expect(content.part1?.bigPicture?.length).toBeGreaterThan(20);
      expect(content.part1?.breakdownItems?.length).toBeGreaterThanOrEqual(3);

      // Part 2: Core Mechanics & Cards
      expect(content.part2).toBeDefined();
      expect(content.part2?.cards?.length).toBe(3);
      expect(content.part2?.rule?.content?.length).toBeGreaterThan(15);

      // Part 3: Mental Model Points + Scenario Question & Easy-Word Answer
      expect(content.part3).toBeDefined();
      expect(content.part3?.points?.length).toBeGreaterThanOrEqual(3);
      expect(content.scenario).toBeDefined();
      expect(content.scenario?.question.length).toBeGreaterThan(10);
      expect(content.scenario?.answer.length).toBeGreaterThan(10);

      // Selected Interview questions where included (Lessons 4, 9, 12, 15, 17, 18)
      if ([
        "nj04-modules",
        "nj09-dependency-injection",
        "nj12-validation-and-pipes",
        "nj15-guards-and-route-protection",
        "nj17-the-request-lifecycle",
        "nj18-authentication-vs-authorization",
      ].includes(slug)) {
        expect(content.interviewQuestion, `Missing interview question on ${slug}`).toBeDefined();
        expect(content.interviewQuestion?.question.length).toBeGreaterThan(10);
        expect(content.interviewQuestion?.answer.length).toBeGreaterThan(10);
      }

      // Part 4: Bad vs Clean Code Comparison
      expect(content.part4).toBeDefined();
      expect(content.part4?.bad?.code?.length).toBeGreaterThan(15);
      expect(content.part4?.good?.code?.length).toBeGreaterThan(15);

      // Part 5: Interactive Sandbox Starter Code
      expect(content.part5).toBeDefined();
      expect(content.part5?.starterCode?.length).toBeGreaterThan(20);

      // Part 6: In-Lesson Knowledge Check Quiz
      expect(content.part6).toBeDefined();
      expect(content.part6?.quiz?.question?.length).toBeGreaterThan(10);
      expect(content.part6?.quiz?.options?.length).toBe(4);
      expect(content.part6?.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(content.part6?.quiz?.correctIndex).toBeLessThan(4);
      expect(content.part6?.quiz?.explanation?.length).toBeGreaterThan(10);

      // Part 7: Takeaways & Next Lesson Preview
      expect(content.part7).toBeDefined();
      expect(content.part7?.takeaways?.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("verifies dedicated module quizzes for all 19 lessons across all 5 Stages are registered and resolvable", () => {
    expect(NESTJS_MODULE_QUIZZES.length).toBe(19);

    for (const quiz of NESTJS_MODULE_QUIZZES) {
      expect(quiz.trackKey).toBe("nestjs");
      expect(quiz.questions.length).toBeGreaterThanOrEqual(3);

      for (const q of quiz.questions) {
        expect(q.prompt.length).toBeGreaterThan(10);
        expect(q.options.length).toBe(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(10);
        expect(q.hint?.length).toBeGreaterThan(5);
      }

      // Verify quiz resolves through registry
      const resolved = getQuizBySlug("nestjs", quiz.lessonSlug);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(quiz.id);
      expect(resolved?.questions.length).toBe(quiz.questions.length);
    }

    // Verify legacy slug resolves to canonical quiz
    const legacyResolved = getQuizBySlug("nestjs", "nj02-oop-foundations");
    expect(legacyResolved).toBeDefined();
    expect(legacyResolved?.id).toBe("quiz-nestjs-nj03");
  });

  it("verifies all 19 lessons match the pedagogical difficulty ratings from LearnCraft specification", () => {
    const expectedDifficulties: Record<string, "Easy" | "Moderate" | "Difficult"> = {
      "nj01-what-is-nestjs": "Easy",
      "nj03-project-structure-and-main": "Moderate",
      "nj04-modules": "Moderate",
      "nj05-controllers": "Easy",
      "nj06-routes-and-http-methods": "Easy",
      "nj07-parameters-and-request-bodies": "Moderate",
      "nj08-providers-and-services": "Easy",
      "nj09-dependency-injection": "Difficult",
      "nj10-decorators": "Moderate",
      "nj11-dtos-data-transfer-objects": "Moderate",
      "nj12-validation-and-pipes": "Difficult",
      "nj13-handling-errors": "Moderate",
      "nj14-middleware": "Moderate",
      "nj15-guards-and-route-protection": "Difficult",
      "nj16-interceptors": "Moderate",
      "nj17-the-request-lifecycle": "Difficult",
      "nj18-authentication-vs-authorization": "Moderate",
      "nj19-testing-a-nestjs-service": "Moderate",
      "nj20-organize-a-feature-and-debug": "Moderate",
    };

    for (const [slug, expectedDiff] of Object.entries(expectedDifficulties)) {
      const content = getNestjsLessonContent(slug);
      expect(content.difficulty, `Difficulty mismatch for ${slug}`).toBe(expectedDiff);
    }
  });
});
