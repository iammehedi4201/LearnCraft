const fs = require('fs');

const raw = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

// Find all quiz IDs
const quizzes = [];
const quizSplit = raw.split('{\n    "id": "quiz-javascript-js');

console.log('=== QUIZ INVENTORY ===');
let totalQ = 0;
for (let i = 1; i < quizSplit.length; i++) {
  const chunk = quizSplit[i];
  const id = 'quiz-javascript-js' + chunk.slice(0, 2);
  const codeM = chunk.match(/"lessonCode":\s*"([^"]+)"/);
  const slugM = chunk.match(/"lessonSlug":\s*"([^"]+)"/);
  const qMatches = chunk.match(/"id":\s*"(js\d+-q\d+)"/g) || [];
  totalQ += qMatches.length;
  console.log(`[${codeM ? codeM[1] : ''}] ${id} (${slugM ? slugM[1] : ''}): ${qMatches.length} questions`);
}
console.log(`Total quiz questions: ${totalQ}`);
