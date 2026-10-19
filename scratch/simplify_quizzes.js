const fs = require('fs');

let content = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');

content = content.replace(
  'Evaluate your mental model of strict equality (===) vs loose equality (==), type coercion, and truthy/falsy evaluation.',
  'Test your understanding of strict equality (===), loose equality (==), automatic type conversion, and truthy/falsy values.'
);

content = content.replace(
  'Double equals performs hidden type coercion; triple equals does not.',
  'Double equals (==) tries to guess and convert types behind your back; triple equals (===) does not.'
);

content = content.replace(
  'Test your mental model of lexical scope, closures, private state encapsulation, and by-reference variable capture.',
  'Test your understanding of scope, closures, keeping private data safe inside functions, and remembering variables.'
);

fs.writeFileSync('lib/quiz/javascript-quizzes.ts', content, 'utf8');
console.log('Successfully simplified quiz descriptions and hints!');
