const fs = require('fs');

// We can load the 30 unique quizzes from javascript-quizzes.ts
let raw = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

// Find all matches for each quiz block
// We know each quiz has `lessonCode: "JS-XX"`
const codes = [];
for (let i = 1; i <= 30; i++) {
  codes.push(`JS-${i < 10 ? '0' + i : i}`);
}

console.log(`Checking extraction for ${codes.length} quizzes...`);

// Let's parse each quiz object
// Since each quiz is an object in JAVASCRIPT_MODULE_QUIZZES array
// We can use a node evaluation in a sandbox to get the array!
