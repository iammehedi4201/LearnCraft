const fs = require('fs');

const lessonFile = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFile = 'lib/quiz/javascript-quizzes.ts';

const lessonContent = fs.readFileSync(lessonFile, 'utf8');
const quizContent = fs.readFileSync(quizFile, 'utf8');

const slugs = [
  'js20-synchronous-vs-asynchronous',
  'js21-promises-and-chaining',
  'js22-async-await',
  'js23-the-event-loop'
];

console.log('=== LESSON CONTENT INSPECTION ===');
slugs.forEach(slug => {
  const marker = `"${slug}": {`;
  const idx = lessonContent.indexOf(marker);
  if (idx !== -1) {
    const lineNum = lessonContent.substring(0, idx).split('\n').length;
    console.log(`Found ${slug} at line ${lineNum}`);
  } else {
    console.log(`NOT found: ${slug}`);
  }
});

console.log('\n=== QUIZ INSPECTION ===');
slugs.forEach(slug => {
  const marker = `"lessonSlug": "${slug}"`;
  const idx = quizContent.indexOf(marker);
  if (idx !== -1) {
    const lineNum = quizContent.substring(0, idx).split('\n').length;
    console.log(`Found quiz for ${slug} at line ${lineNum}`);
  } else {
    console.log(`Quiz NOT found: ${slug}`);
  }
});
