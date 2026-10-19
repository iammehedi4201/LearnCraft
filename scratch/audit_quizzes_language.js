const fs = require('fs');

const content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

const targets = ['coercion', 'instantiation', 'polymorphism', 'encapsulation', 'lexical', 'synchronous', 'asynchronous'];

targets.forEach(t => {
  const count = (content.match(new RegExp(t, 'gi')) || []).length;
  console.log(`Quiz term "${t}": ${count} occurrences`);
});
