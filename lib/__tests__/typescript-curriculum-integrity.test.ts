import { describe, it, expect } from "vitest";
import {
  TYPESCRIPT_STAGES,
  getAllLessons,
  getLessonBySlug,
} from "../../app/learn/typescript/data/typescript-curriculum";
import {
  getTypeScriptLessonContent,
  TYPESCRIPT_LESSONS_CONTENT,
} from "../../app/learn/typescript/data/typescript-lesson-content";
import { TYPESCRIPT_MODULE_QUIZZES } from "../quiz/typescript-quizzes";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("TypeScript Curriculum Integrity & Health Suite", () => {
  it("contains exactly 9 stages and 32 authoritative lessons in curriculum", () => {
    expect(TYPESCRIPT_STAGES.length).toBe(9);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(32);
  });

  it("ensures all 32 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(32);
    expect(slugs.size).toBe(32);
  });

  it("verifies that getLessonBySlug resolves slugs, codes, and prefixes correctly", () => {
    const bySlug = getLessonBySlug("ts01-mental-model");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("TS-01");

    const byCode = getLessonBySlug("ts-01");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("TS-01");

    const byPrefix = getLessonBySlug("ts02");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("TS-02");
  });

  it("verifies all handcrafted lessons in Stage 1 (TS-01 through TS-05) meet strict pedagogical structure", () => {
    const stage1Slugs = [
      "ts01-mental-model",
      "ts02-primitives-inference",
      "ts03-arrays-tuples",
      "ts04-object-types",
      "ts05-special-types",
    ];

    for (const slug of stage1Slugs) {
      expect(TYPESCRIPT_LESSONS_CONTENT[slug], `Missing handcrafted registry entry for ${slug}`).toBeDefined();
      const content = getTypeScriptLessonContent(slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
      expect(content.sections.length).toBe(7);

      // Part 1: Overview & Mental Model
      expect(content.part1).toBeDefined();
      expect(content.part1?.bigPicture?.length).toBeGreaterThan(30);
      expect(content.part1?.breakdownItems?.length).toBeGreaterThanOrEqual(3);

      // Part 2: Core Mechanics & Cards
      expect(content.part2).toBeDefined();
      expect(content.part2?.cards?.length).toBe(3);
      expect(content.part2?.rule?.content?.length).toBeGreaterThan(15);

      // Part 3: Mental Model Points
      expect(content.part3).toBeDefined();
      expect(content.part3?.points?.length).toBeGreaterThanOrEqual(3);

      // Part 4: Bad vs Clean Code Comparison
      expect(content.part4).toBeDefined();
      expect(content.part4?.bad?.code?.length).toBeGreaterThan(15);
      expect(content.part4?.good?.code?.length).toBeGreaterThan(15);

      // Part 5: Interactive Sandbox Starter Code
      expect(content.part5).toBeDefined();
      expect(content.part5?.starterCode?.length).toBeGreaterThan(25);

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
      expect(content.part7?.nextLessonPreview?.title?.length).toBeGreaterThan(5);
    }
  });

  it("verifies dedicated module quizzes for Stage 1 are registered and resolvable", () => {
    expect(TYPESCRIPT_MODULE_QUIZZES.length).toBeGreaterThanOrEqual(5);

    for (const quiz of TYPESCRIPT_MODULE_QUIZZES) {
      expect(quiz.trackKey).toBe("typescript");
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
      const resolved = getQuizBySlug("typescript", quiz.lessonSlug);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(quiz.id);
      expect(resolved?.questions.length).toBe(quiz.questions.length);
    }
  });
});
