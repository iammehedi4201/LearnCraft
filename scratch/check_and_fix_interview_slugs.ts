import { JAVASCRIPT_QUESTIONS } from "../lib/interview-questions/javascript-questions";
import { getAllLessons } from "../app/learn/javascript/data/javascript-curriculum";

const lessons = getAllLessons();
console.log(`Authoritative lessons: ${lessons.length}`);

JAVASCRIPT_QUESTIONS.forEach(q => {
  const currentSlug = q.relatedLessonSlug?.replace("/learn/javascript/", "") || "";
  const matched = lessons.find(l => l.slug === currentSlug || currentSlug.startsWith(l.code.toLowerCase().replace("-", "")));
  if (!matched) {
    console.warn(`[${q.id}] COULD NOT MATCH SLUG: ${q.relatedLessonSlug}`);
  } else {
    if (q.relatedLessonSlug !== matched.path) {
      console.log(`[${q.id}] Mismatch: ${q.relatedLessonSlug} -> should be ${matched.path} (${matched.name})`);
    }
  }
});
