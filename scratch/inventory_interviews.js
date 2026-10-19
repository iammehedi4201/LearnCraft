const fs = require('fs');

const raw = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

const questions = [];
const qRegex = /"id":\s*"(js-q\d+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"subtopic":\s*"([^"]+)"[\s\S]*?"type":\s*"([^"]+)"[\s\S]*?"difficulty":\s*"([^"]+)"/g;
let m;
while ((m = qRegex.exec(raw)) !== null) {
  questions.push({ id: m[1], category: m[2], subtopic: m[3], type: m[4], difficulty: m[5] });
}

console.log('=== INTERVIEW QUESTIONS INVENTORY ===');
console.log(`Total questions found: ${questions.length}`);

// Group by category
const byCat = {};
for (const q of questions) {
  byCat[q.category] = (byCat[q.category] || 0) + 1;
}

for (const [cat, count] of Object.entries(byCat)) {
  console.log(`  Category "${cat}": ${count} questions`);
}

// Group by difficulty
const byDiff = {};
for (const q of questions) {
  byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1;
}
console.log('\nBy Difficulty:', byDiff);

// Group by type
const byType = {};
for (const q of questions) {
  byType[q.type] = (byType[q.type] || 0) + 1;
}
console.log('By Type:', byType);
