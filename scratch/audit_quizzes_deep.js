const fs = require('fs');

const content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

const quizRegex = /lessonCode:\s*"([^"]+)",[\s\S]*?questions:\s*\[([\s\S]*?)\n\s{4}\]/g;
let match;
let count = 0;

console.log(`Auditing quizzes in lib/quiz/javascript-quizzes.ts...`);

const academicWords = [
  'lexical', 'invocation', 'coercion', 'coerce', 'concurrency', 'concurrent',
  'mutating', 'mutation', 'mutate', 'immutable', 'immutability', 'prototypal',
  'traversal', 'traverse', 'operand', 'arbitrary', 'recursively', 'syntactic sugar',
  'retains access', 'temporal dead zone', 'TDZ', 'ASI', 'AST', 'Abstract Syntax Tree',
  'JIT', 'synchronously', 'asynchronously', 'propagation'
];

while ((match = quizRegex.exec(content)) !== null) {
  count++;
  const code = match[1];
  const qBlock = match[2];

  const issues = [];
  for (const word of academicWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = qBlock.match(regex);
    if (matches) {
      issues.push(`${word} (${matches.length})`);
    }
  }

  if (issues.length > 0) {
    console.log(`[${code}]: ${issues.join(', ')}`);
  }
}
console.log(`Audited ${count} module quizzes.`);
