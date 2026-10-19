const fs = require('fs');
const content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');
const regex = /lessonCode:\s*"([^"]+)",\s*lessonTitle:\s*"([^"]+)"/g;
let match;
const quizzes = [];
while ((match = regex.exec(content)) !== null) {
  quizzes.push({ code: match[1], title: match[2] });
}
console.log(`Current Quizzes in javascript-quizzes.ts (${quizzes.length}):`);
quizzes.forEach(q => console.log(`  - ${q.code}: ${q.title}`));
