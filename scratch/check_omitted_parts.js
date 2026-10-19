const fs = require('fs');
const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const lessonsWithMissingP4 = [
  'js04-conditional-logic',
  'js06-functions-and-arrow-syntax',
  'js09-callbacks-and-higher-order-functions',
  'js10-arrays-and-indexing',
  'js11-essential-array-methods',
  'js12-objects-and-methods',
  'js14-destructuring',
  'js15-spread-and-rest-operators',
  'js16-optional-chaining-and-nullish-coalescing',
  'js19-classes-extends-and-super',
  'js25-es-modules',
  'js26-working-with-json',
  'js27-the-fetch-api',
  'js29-events-and-delegation'
];

for (let i = 0; i < lessonsWithMissingP4.length; i++) {
  const slug = lessonsWithMissingP4[i];
  const nextSlug = i < lessonsWithMissingP4.length - 1 ? lessonsWithMissingP4[i+1] : 'js30-browser-storage-and-debugging';
  
  const startIdx = content.indexOf('"' + slug + '":');
  if (startIdx === -1) continue;
  
  // Find next lesson declaration or end of object
  const nextIdx = content.indexOf('  "js', startIdx + 10);
  const lessonChunk = content.slice(startIdx, nextIdx !== -1 ? nextIdx : undefined);

  if (slug === 'js04-conditional-logic') {
    const p3Match = lessonChunk.match(/"part3":\s*\{([\s\S]*?)\n\s\s"part4":/);
    console.log('js04-conditional-logic (part3):');
    if (p3Match) {
      console.log('   Title:', p3Match[1].match(/"title":\s*"([^"]+)"/)?.[1]);
    }
    continue;
  }

  const p4Match = lessonChunk.match(/"part4":\s*\{([\s\S]*?)\n\s\s"part5":/);
  if (p4Match) {
    const title = p4Match[1].match(/"title":\s*"([^"]+)"/)?.[1] || '';
    const badTitle = p4Match[1].match(/"bad":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
    const goodTitle = p4Match[1].match(/"good":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
    console.log(slug + ':');
    console.log('   P4 Title:', title);
    console.log('   Bad:', badTitle);
    console.log('   Good:', goodTitle);
  } else {
    console.log(slug + ': NO PART4 FOUND IN CHUNK (length ' + lessonChunk.length + ')');
  }
}
