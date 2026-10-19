import { JAVASCRIPT_QUESTIONS } from "../lib/interview-questions/javascript-questions";

console.log(`Total questions: ${JAVASCRIPT_QUESTIONS.length}`);

JAVASCRIPT_QUESTIONS.forEach((q, idx) => {
  console.log(`\n========================================`);
  console.log(`[#${idx + 1}] ID: ${q.id} | Slug: ${q.relatedLessonSlug}`);
  console.log(`Question: ${q.question}`);
  
  // Extract simple answer
  const simpleMatch = q.answer.match(/### Simple answer:\s*\n([\s\S]*?)(?=\n###|\n```|$)/);
  if (simpleMatch) {
    console.log(`Simple: ${simpleMatch[1].trim()}`);
  } else {
    console.log(`Simple answer: [MISSING]`);
  }

  // Extract interview answer
  const interviewMatch = q.answer.match(/### Interview answer:\s*\n([\s\S]*?)(?=\n###|\n```|$)/);
  if (interviewMatch) {
    console.log(`Interview: ${interviewMatch[1].trim()}`);
  } else {
    console.log(`Interview answer: [MISSING]`);
  }
});
