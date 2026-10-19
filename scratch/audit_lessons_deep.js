const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Match each lesson block
const lessonRegex = /"(js\d\d-[^"]+)":\s*\{([\s\S]*?)(?=\n\s\s"(?:js\d\d|exports)|\n\};)/g;
let match;
const lessons = [];

while ((match = lessonRegex.exec(content)) !== null) {
  lessons.push({ slug: match[1], text: match[2] });
}

console.log(`Auditing ${lessons.length} lessons in javascript-lesson-content.ts...`);

const academicWords = [
  'lexical', 'invocation', 'coercion', 'coerce', 'concurrency', 'concurrent',
  'mutating', 'mutation', 'mutate', 'immutable', 'immutability', 'prototypal',
  'traversal', 'traverse', 'operand', 'arbitrary', 'recursively', 'syntactic sugar',
  'retains access', 'temporal dead zone', 'TDZ', 'ASI', 'AST', 'Abstract Syntax Tree',
  'JIT', 'synchronously', 'asynchronously', 'monolithic', 'granular'
];

for (const l of lessons) {
  const issues = [];
  
  for (const word of academicWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = l.text.match(regex);
    if (matches) {
      issues.push(`${word} (${matches.length})`);
    }
  }

  // Check quiz explanation
  const quizExplMatch = l.text.match(/"explanation":\s*"([^"]+)"/);
  if (quizExplMatch) {
    const expl = quizExplMatch[1];
    if (expl.length > 180) {
      issues.push(`quiz explanation long (${expl.length} chars)`);
    }
  }

  if (issues.length > 0) {
    console.log(`[${l.slug}]: ${issues.join(', ')}`);
  }
}
