const fs = require('fs');

const content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

// Parse out quizzes
// Let's find all `{ id: "quiz-javascript-js...` blocks
const quizBlocks = content.split(/\{\s*id:\s*"quiz-javascript-js|\{\s*"id":\s*"quiz-javascript-js/);
console.log(`Found ${quizBlocks.length - 1} quiz blocks.`);

const quizzesByCode = new Map();

for (let i = 1; i < quizBlocks.length; i++) {
  const block = '{\n    id: "quiz-javascript-js' + quizBlocks[i];
  const codeMatch = block.match(/["']?lessonCode["']?:\s*"([^"]+)"/);
  if (codeMatch) {
    const code = codeMatch[1];
    if (!quizzesByCode.has(code)) {
      quizzesByCode.set(code, block);
    }
  }
}

console.log(`Unique quizzes by code: ${quizzesByCode.size}`);
for (let num = 1; num <= 30; num++) {
  const code = `JS-${num < 10 ? '0' + num : num}`;
  console.log(`  ${code}: ${quizzesByCode.has(code) ? 'YES' : 'MISSING'}`);
}
