const fs = require('fs');

const content = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

const targetWords = [
  'lexical', 'lexically', 'invocation', 'invoke', 'invoked',
  'coercion', 'coerce', 'coerced', 'concurrency', 'concurrent', 'concurrently',
  'mutating', 'mutation', 'mutate', 'immutable', 'immutability', 'prototypal',
  'traversal', 'traverse', 'operand', 'recursively', 'syntactic sugar',
  'retains access', 'temporal dead zone', 'TDZ', 'ASI', 'AST', 'Abstract Syntax Tree',
  'JIT', 'synchronously', 'asynchronously', 'propagation', 'monolithic'
];

const lines = content.split('\n');
const matches = [];

lines.forEach((line, idx) => {
  for (const word of targetWords) {
    const reg = new RegExp(`\\b${word}\\b`, 'i');
    if (reg.test(line)) {
      matches.push({ lineNum: idx + 1, word, text: line.trim() });
      break;
    }
  }
});

console.log(`Found ${matches.length} lines with target words in javascript-questions.ts:`);
matches.forEach(m => {
  console.log(`L${m.lineNum} [${m.word}]: ${m.text.slice(0, 120)}`);
});

// Also check question IDs
const idMatches = [...content.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`Total question IDs found: ${idMatches.length}`);
console.log(idMatches);
