import { describe, it, expect } from "vitest";
import {
  OOP_STAGES,
  getAllLessons,
  getLessonBySlug,
} from "../../app/learn/oop/data/oop-curriculum";
import {
  getOOPLessonContent,
  OOP_LESSONS_CONTENT,
} from "../../app/learn/oop/data/oop-lesson-content";
import { OOP_MODULE_QUIZZES } from "../quiz/oop-quizzes";
import { getQuizBySlug } from "../quiz/quiz-registry";

describe("OOP Curriculum Integrity & Pedagogical Health Suite", () => {
  it("contains exactly 4 stages and 16 authoritative lessons in curriculum", () => {
    expect(OOP_STAGES.length).toBe(4);
    const lessons = getAllLessons();
    expect(lessons.length).toBe(16);
  });

  it("ensures all 16 lessons have unique codes and slugs", () => {
    const lessons = getAllLessons();
    const codes = new Set<string>();
    const slugs = new Set<string>();

    for (const lesson of lessons) {
      expect(codes.has(lesson.code), `Duplicate lesson code: ${lesson.code}`).toBe(false);
      expect(slugs.has(lesson.slug), `Duplicate lesson slug: ${lesson.slug}`).toBe(false);
      codes.add(lesson.code);
      slugs.add(lesson.slug);
    }

    expect(codes.size).toBe(16);
    expect(slugs.size).toBe(16);
  });

  it("verifies that getLessonBySlug resolves slugs, codes, and prefixes correctly", () => {
    const bySlug = getLessonBySlug("oop01-why-oop");
    expect(bySlug).toBeDefined();
    expect(bySlug?.code).toBe("OOP-01");

    const byCode = getLessonBySlug("oop-01");
    expect(byCode).toBeDefined();
    expect(byCode?.code).toBe("OOP-01");

    const byPrefix = getLessonBySlug("oop02");
    expect(byPrefix).toBeDefined();
    expect(byPrefix?.code).toBe("OOP-02");

    const byPrefix3 = getLessonBySlug("oop03");
    expect(byPrefix3).toBeDefined();
    expect(byPrefix3?.code).toBe("OOP-03");
  });

  it("verifies all 16 restructured lessons (OOP-01 to OOP-16) meet strict beginner pedagogical standards", () => {
    const restructuredSlugs = [
      "oop01-why-oop",
      "oop02-encapsulation",
      "oop03-abstraction",
      "oop04-inheritance",
      "oop05-polymorphism",
      "oop06-object-relationships",
      "oop07-composition-over-inheritance",
      "oop08-coupling-and-cohesion",
      "oop09-single-responsibility",
      "oop10-open-closed",
      "oop11-liskov-substitution",
      "oop12-interface-segregation",
      "oop13-dependency-inversion",
      "oop14-design-smells",
      "oop15-pragmatic-patterns",
      "oop16-architectural-reasoning-capstone",
    ];

    for (const slug of restructuredSlugs) {
      expect(OOP_LESSONS_CONTENT[slug], `Missing registry entry for ${slug}`).toBeDefined();
      const content = getOOPLessonContent(slug);
      expect(content, `Missing content for ${slug}`).toBeDefined();
      expect(content.sections.length).toBe(7);

      // Part 1: Overview & Real-World Analogy
      expect(content.part1).toBeDefined();
      expect((content.part1.bigPicture || content.part1.explanation || "").length).toBeGreaterThan(50);
      expect(content.part1.analogy, `Missing analogy for ${slug}`).toBeDefined();
      expect(content.part1.breakdownItems?.length).toBeGreaterThanOrEqual(3);

      // Part 2: Core Mechanics & Cards
      expect(content.part2).toBeDefined();
      expect(content.part2.cards?.length).toBeGreaterThanOrEqual(3);
      expect(content.part2.rule?.content?.length).toBeGreaterThan(20);

      // Part 3: Mental Model & Points
      expect(content.part3).toBeDefined();
      expect(content.part3.points?.length).toBeGreaterThanOrEqual(3);

      // Part 4: Bad vs Clean Code
      expect(content.part4).toBeDefined();
      expect(content.part4.bad?.code.length).toBeGreaterThan(20);
      expect(content.part4.good?.code.length).toBeGreaterThan(20);
      expect(content.part4.bad?.explanation.length).toBeGreaterThan(20);
      expect(content.part4.good?.explanation.length).toBeGreaterThan(20);

      // Part 5: Interactive Sandbox Starter Code
      expect(content.part5).toBeDefined();
      expect(content.part5.starterCode.length).toBeGreaterThan(50);
      expect(content.part5.starterCode).toContain("class ");

      // Part 6: Summary & Takeaways
      expect(content.part6).toBeDefined();
      expect(content.part6.takeaways?.length).toBeGreaterThanOrEqual(4);

      // Part 7: In-Lesson Knowledge Check Quiz
      expect(content.part7).toBeDefined();
      expect(content.part7.quiz).toBeDefined();
      expect(content.part7.quiz?.options.length).toBeGreaterThanOrEqual(4);
      expect(content.part7.quiz?.correctIndex).toBeGreaterThanOrEqual(0);
      expect(content.part7.quiz?.correctIndex).toBeLessThan(content.part7.quiz?.options.length || 0);
      expect(content.part7.quiz?.explanation.length).toBeGreaterThan(20);
      expect(content.part7.nextLessonPreview?.title.length).toBeGreaterThan(5);
    }
  });

  it("ensures registered OOP module quizzes in quiz-registry resolve properly and have valid structure", () => {
    expect(OOP_MODULE_QUIZZES.length).toBe(16);

    const auditedSlugs = [
      "oop01-why-oop",
      "oop02-encapsulation",
      "oop03-abstraction",
      "oop04-inheritance",
      "oop05-polymorphism",
      "oop06-object-relationships",
      "oop07-composition-over-inheritance",
      "oop08-coupling-and-cohesion",
      "oop09-single-responsibility",
      "oop10-open-closed",
      "oop11-liskov-substitution",
      "oop12-interface-segregation",
      "oop13-dependency-inversion",
      "oop14-design-smells",
      "oop15-pragmatic-patterns",
      "oop16-architectural-reasoning-capstone",
    ];

    for (const slug of auditedSlugs) {
      const quiz = getQuizBySlug("oop", slug);
      expect(quiz, `Quiz for ${slug} must be found in registry`).toBeDefined();
      if (!quiz) continue;

      expect(quiz.trackKey).toBe("oop");
      expect(quiz.questions.length).toBe(3);

      for (const q of quiz.questions) {
        expect(q.id).toBeDefined();
        expect(q.prompt.length).toBeGreaterThan(15);
        expect(q.options.length).toBe(4);
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThan(4);
        expect(q.explanation.length).toBeGreaterThan(20);
        expect(q.hint?.length).toBeGreaterThan(10);

        if (q.type === "code_output") {
          expect(q.codeSnippet).toBeDefined();
          expect(q.codeSnippet?.length).toBeGreaterThan(20);
        }
      }
    }
  });
});
