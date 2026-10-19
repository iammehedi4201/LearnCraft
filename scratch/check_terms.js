const fs = require('fs');
const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const difficultTerms = [
  'JIT', 'AST', 'Abstract Syntax Tree', 'lexical environment', 'coercion', 
  'mutability', 'immutable', 'instantiation', 'polymorphism', 'encapsulation', 
  'idempotent', 'ephemeral', 'heuristics', 'concurrency', 'paradigm', 'ASI',
  'hoisting', 'closure', 'synchronous', 'asynchronous', 'prototype'
];

for (const term of difficultTerms) {
  const regex = new RegExp(term, 'gi');
  const matches = (content.match(regex) || []).length;
  console.log(`${term}: ${matches}`);
}
