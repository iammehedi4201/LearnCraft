import { describe, it, expect } from "vitest";
import {
  NEXTJS_STAGES,
  getAllNextjsLessons,
  getNextjsLessonBySlug,
} from "../../app/learn/nextjs/data/nextjs-curriculum";
import {
  getNextjsLessonContent,
  NEXTJS_LESSONS_CONTENT,
} from "../../app/learn/nextjs/data/nextjs-lesson-content";
import { NEXTJS_MODULE_QUIZZES } from "../quiz/nextjs-quizzes";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("Next.js Curriculum Integrity & Health Suite", () => {
  it("contains exactly 5 stages and 21 authoritative lessons in curriculum", () => {
    expect(NEXTJS_STAGES.length).toBe(5);
    const lessons = getAllNextjsLessons();
    expect(lessons.length).toBe(21);
  });

  it("ensures all 21 lessons have unique codes and slugs", () => {
    const lessons = getAllNextjsLessons();
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

  it("verifies that getNextjsLessonBySlug resolves slugs, codes, legacy aliases, and prefixes correctly", () => {
    const bySlug = getNextjsLessonBySlug("nx01-what-is-nextjs");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("NX-01");

    const byLegacy = getNextjsLessonBySlug("nx01-app-router");
    expect(byLegacy).toBeDefined();
    expect(byLegacy?.code).toBe("NX-01");

    const byCode = getNextjsLessonBySlug("nx-01");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("NX-01");

    const byPrefix = getNextjsLessonBySlug("nx02");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("NX-02");
  });

  it("verifies all 21 handcrafted lessons across all 5 Stages (NX-01 through NX-21) meet strict pedagogical structure", () => {
    const handcraftedSlugs = [
      "nx01-what-is-nextjs",
      "nx02-app-folder-and-routes",
      "nx03-pages-and-layouts",
      "nx04-moving-between-pages-with-link",
      "nx05-dynamic-routes",
      "nx06-server-and-client-components",
      "nx07-client-side-interaction",
      "nx08-fetching-data-server-component",
      "nx09-url-and-search-parameters",
      "nx10-loading-ui",
      "nx11-missing-pages-and-errors",
      "nx12-forms-and-server-actions",
      "nx13-route-handlers",
      "nx14-revalidating-data",
      "nx15-page-titles-and-metadata",
      "nx16-images-and-static-files",
      "nx17-environment-variables-and-secrets",
      "nx18-authentication-and-authorization",
      "nx19-validating-user-input",
      "nx20-debugging-nextjs-problems",
      "nx21-website-performance-optimization",
    ];

    expect(handcraftedSlugs.length).toBe(21);

    for (const slug of handcraftedSlugs) {
      expect(NEXTJS_LESSONS_CONTENT[slug], `Missing handcrafted registry entry for ${slug}`).toBeDefined();
      const content = getNextjsLessonContent(slug);
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

      // Interview questions where included (Lessons 6, 12, 13, 18, 21)
      if ([
        "nx06-server-and-client-components",
        "nx12-forms-and-server-actions",
        "nx13-route-handlers",
        "nx18-authentication-and-authorization",
        "nx21-website-performance-optimization",
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

  it("verifies dedicated module quizzes for all 21 lessons across all 5 Stages are registered and resolvable", () => {
    expect(NEXTJS_MODULE_QUIZZES.length).toBe(21);

    for (const quiz of NEXTJS_MODULE_QUIZZES) {
      expect(quiz.trackKey).toBe("nextjs");
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
      const resolved = getQuizBySlug("nextjs", quiz.lessonSlug);
      expect(resolved).toBeDefined();
      expect(resolved?.id).toBe(quiz.id);
      expect(resolved?.questions.length).toBe(quiz.questions.length);
    }

    // Verify legacy slug resolves to canonical quiz
    const legacyResolved = getQuizBySlug("nextjs", "nx01-app-router");
    expect(legacyResolved).toBeDefined();
    expect(legacyResolved?.id).toBe("quiz-nextjs-nx01");
  });

  it("verifies all 21 lessons match the pedagogical difficulty ratings from LearnCraft specification", () => {
    const expectedDifficulties: Record<string, "Easy" | "Moderate" | "Difficult"> = {
      "nx01-what-is-nextjs": "Moderate",
      "nx02-app-folder-and-routes": "Easy",
      "nx03-pages-and-layouts": "Moderate",
      "nx04-moving-between-pages-with-link": "Easy",
      "nx05-dynamic-routes": "Moderate",
      "nx06-server-and-client-components": "Difficult",
      "nx07-client-side-interaction": "Moderate",
      "nx08-fetching-data-server-component": "Moderate",
      "nx09-url-and-search-parameters": "Moderate",
      "nx10-loading-ui": "Moderate",
      "nx11-missing-pages-and-errors": "Moderate",
      "nx12-forms-and-server-actions": "Difficult",
      "nx13-route-handlers": "Moderate",
      "nx14-revalidating-data": "Difficult",
      "nx15-page-titles-and-metadata": "Easy",
      "nx16-images-and-static-files": "Easy",
      "nx17-environment-variables-and-secrets": "Moderate",
      "nx18-authentication-and-authorization": "Difficult",
      "nx19-validating-user-input": "Moderate",
      "nx20-debugging-nextjs-problems": "Moderate",
      "nx21-website-performance-optimization": "Difficult",
    };

    for (const [slug, expectedDiff] of Object.entries(expectedDifficulties)) {
      const content = getNextjsLessonContent(slug);
      expect(content.difficulty, `Difficulty mismatch for ${slug}`).toBe(expectedDiff);
    }
  });
});
