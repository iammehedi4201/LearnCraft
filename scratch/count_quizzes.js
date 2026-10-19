const fs = require('fs');
const content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');
const matches = [...content.matchAll(/["']?lessonCode["']?:\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total lessonCodes found:', matches.length);
console.log(matches);
