const fs = require('fs');

const files = {
  lessons: 'app/learn/javascript/data/javascript-lesson-content.ts',
  quizzes: 'lib/quiz/javascript-quizzes.ts',
  interviews: 'lib/interview-questions/javascript-questions.ts',
  curriculum: 'app/learn/javascript/data/javascript-curriculum.ts'
};

const complexWords = [
  'lexical', 'lexically',
  'invocation', 'invoked', 'invoke',
  'deterministic',
  'polymorphism', 'polymorphic',
  'encapsulation', 'encapsulate',
  'instantiation', 'instantiate', 'instantiated',
  'concurrency', 'concurrent', 'concurrently',
  'synchronously', 'asynchronously',
  'coercion', 'coerce', 'coerced',
  'mutation', 'mutated', 'mutate', 'mutating',
  'immutable', 'immutability',
  'prototypal', 'prototype chain',
  'traversal', 'traverse',
  'delegation',
  'evaluation',
  'operand', 'operands',
  'concatenation', 'concatenated', 'concatenate',
  'arbitrary',
  'paradigm',
  'idempotent',
  'boilerplate',
  'prerequisite', 'prerequisites',
  'recursively', 'recursive',
  'closure allows', 'retains access',
  'AST', 'Abstract Syntax Tree',
  'JIT',
  'hoisting', 'hoisted', 'hoist',
  'temporal dead zone', 'TDZ',
  'monolithic', 'granular', 'subtle bugs',
  'propagate', 'propagation',
  'syntactic sugar',
  'callback hell',
  'non-blocking',
  'asynchronous'
];

for (const [key, path] of Object.entries(files)) {
  const content = fs.readFileSync(path, 'utf8');
  console.log(`\n==================================================`);
  console.log(`FILE: ${key} (${path})`);
  console.log(`==================================================`);

  let fileMatches = 0;
  for (const word of complexWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      fileMatches += matches.length;
      console.log(`  "${word}": ${matches.length} occurrences`);
    }
  }
  console.log(`Total target words in ${key}: ${fileMatches}`);
}
