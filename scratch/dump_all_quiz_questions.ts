import { JAVASCRIPT_MODULE_QUIZZES } from "../lib/quiz/javascript-quizzes";

const uniqueByCode = new Map<string, any>();
for (const q of JAVASCRIPT_MODULE_QUIZZES) {
  if (!uniqueByCode.has(q.lessonCode)) {
    uniqueByCode.set(q.lessonCode, q);
  }
}

for (let i = 1; i <= 30; i++) {
  const code = `JS-${i < 10 ? '0' + i : i}`;
  const quiz = uniqueByCode.get(code);
  console.log(`\n=============================`);
  console.log(`QUIZ: ${code} - ${quiz.lessonTitle}`);
  console.log(`Description: ${quiz.description}`);
  quiz.questions.forEach((q: any, idx: number) => {
    console.log(`  Q${idx + 1} [${q.title}]: ${q.prompt}`);
    console.log(`     Correct answer [${q.correctAnswer}]: ${q.options[q.correctAnswer]}`);
    console.log(`     Explanation: ${q.explanation}`);
    if (q.hint) console.log(`     Hint: ${q.hint}`);
  });
}
