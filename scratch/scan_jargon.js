const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Find all occurrences of jargon or complex phrasing in the whole content file
const targets = [
  'JIT', 'AST', 'ASI', 'Abstract Syntax Tree', 'coercion', 'encapsulation',
  'concurrency', 'polymorphism', 'prototypal', 'short-circuit', 'hoist',
  'temporal dead zone', 'mutation', 'synchronously'
];

targets.forEach(t => {
  const regex = new RegExp(`([^.?!\\n]*?\\b${t}\\b[^.?!\\n]*?[.?!])`, 'gi');
  let match;
  const snippets = [];
  while ((match = regex.exec(content)) !== null) {
    snippets.push(match[1].trim());
  }
  if (snippets.length > 0) {
    console.log(`\n--- Matches for "${t}" (${snippets.length}) ---`);
    snippets.slice(0, 3).forEach(s => console.log('• ' + s));
  }
});
