const fs = require('fs');
const content = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');
const regex = /id:\s*"([^"]+)",\s*trackKey:\s*"javascript",\s*category:\s*"([^"]+)"/g;
let match;
const questions = [];
while ((match = regex.exec(content)) !== null) {
  questions.push({ id: match[1], category: match[2] });
}
console.log(`Current Questions in javascript-questions.ts (${questions.length}):`);
const catCounts = {};
questions.forEach(q => {
  catCounts[q.category] = (catCounts[q.category] || 0) + 1;
});
console.log(catCounts);
