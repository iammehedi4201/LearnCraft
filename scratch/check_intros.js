const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Check intro/bigPicture of key lessons
const lessonsToCheck = [
  'js06-functions-and-arrow-syntax',
  'js07-scope-chains-and-hoisting',
  'js08-closures-and-lexical-scope',
  'js10-array-methods-transformations',
  'js13-prototypes-and-inheritance',
  'js14-this-keyword-and-binding',
  'js16-value-vs-reference-memory',
  'js19-error-handling-and-exceptions',
  'js20-synchronous-vs-asynchronous',
  'js23-the-event-loop',
  'js25-functional-programming-concepts',
  'js29-event-propagation-and-delegation'
];

lessonsToCheck.forEach(slug => {
  const match = content.match(new RegExp(`"${slug}":\\s*\\{[\\s\\S]*?"bigPicture":\\s*"([^"]+)"`));
  if (match) {
    console.log(`\n[${slug}]`);
    console.log(`bigPicture: ${match[1]}`);
  }
});
