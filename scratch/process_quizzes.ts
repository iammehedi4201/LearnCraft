import { JAVASCRIPT_MODULE_QUIZZES } from "../lib/quiz/javascript-quizzes";

console.log(`Loaded ${JAVASCRIPT_MODULE_QUIZZES.length} raw quizzes.`);

const uniqueByCode = new Map<string, any>();
for (const q of JAVASCRIPT_MODULE_QUIZZES) {
  if (!uniqueByCode.has(q.lessonCode)) {
    uniqueByCode.set(q.lessonCode, q);
  }
}

console.log(`Unique quizzes: ${uniqueByCode.size}`);
for (let i = 1; i <= 30; i++) {
  const code = `JS-${i < 10 ? '0' + i : i}`;
  const quiz = uniqueByCode.get(code);
  console.log(`${code}: ${quiz ? quiz.questions.length + ' questions - ' + quiz.lessonTitle : 'MISSING'}`);
}
