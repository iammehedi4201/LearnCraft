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
  it("contains exactly 5 stages and 21 authoritative lessons in curriculum", () => {
    expect(TYPESCRIPT_STAGES.length).toBe(5);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(21);
  });

  it("ensures all 21 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(21);
    expect(slugs.size).toBe(21);
  });

  it("verifies that getLessonBySlug resolves slugs, codes, legacy aliases, and prefixes correctly", () => {
    const bySlug = getLessonBySlug("ts01-what-typescript-does");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("TS-01");

    const byLegacy = getLessonBySlug("ts01-mental-model");
    expect(byLegacy).toBeDefined();
    expect(byLegacy?.code).toBe("TS-01");

    const byCode = getLessonBySlug("ts-01");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("TS-01");

    const byPrefix = getLessonBySlug("ts02");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("TS-02");
  });

  it("verifies all 21 handcrafted lessons across all 5 Stages (TS-01 through TS-21) meet strict pedagogical structure", () => {
    const handcraftedSlugs = [
      "ts01-what-typescript-does",
      "ts02-type-annotations-inference",
      "ts03-basic-types-arrays",
      "ts04-function-parameters-return-types",
      "ts05-object-types",
      "ts06-type-and-interface",
      "ts07-union-and-literal-types",
      "ts08-optional-values-null-undefined",
      "ts09-type-narrowing",
      "ts10-any-vs-unknown",
      "ts11-type-assertions",
      "ts12-generics",
      "ts13-common-utility-types",
      "ts14-classes-and-objects",
      "ts15-access-modifiers-encapsulation",
      "ts16-inheritance-abstract-classes",
      "ts17-polymorphism-composition-di",
      "ts18-modules-and-type-imports",
      "ts19-promises-and-async-functions",
      "ts20-check-api-data",
      "ts21-find-and-fix-type-errors",
    ];

    expect(handcraftedSlugs.length).toBe(21);

    for (const slug of handcraftedSlugs) {
      expect(TYPESCRIPT_LESSONS_CONTENT[slug], `Missing handcrafted registry entry for ${slug}`).toBeDefined();
      const content = getTypeScriptLessonContent(slug);
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

      // Interview questions where included (Lessons 6, 9, 10, 12)
      if (["ts06-type-and-interface", "ts09-type-narrowing", "ts10-any-vs-unknown", "ts12-generics"].includes(slug)) {
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
      if (content.part7?.nextLessonPreview) {
        expect(content.part7.nextLessonPreview.title?.length).toBeGreaterThan(5);
      }
    }
  });

  it("verifies dedicated module quizzes for all 21 lessons across all 5 Stages are registered and resolvable", () => {
    expect(TYPESCRIPT_MODULE_QUIZZES.length).toBe(21);

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
