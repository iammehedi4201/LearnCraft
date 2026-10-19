const fs = require('fs');
const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const keyRegex = /"(js\d+-[^"]+)":\s*\{/g;
let m;
const slugs = [];
while ((m = keyRegex.exec(content)) !== null) {
  slugs.push(m[1]);
}

const limit = process.argv[2] ? parseInt(process.argv[2], 10) : 16;
const start = process.argv[3] ? parseInt(process.argv[3], 10) : 0;

for (let i = start; i < Math.min(slugs.length, start + limit); i++) {
  const slug = slugs[i];
  const startIdx = content.indexOf('"' + slug + '":');
  const nextIdx = i < slugs.length - 1 ? content.indexOf('"' + slugs[i+1] + '":') : content.indexOf('export function getJSLessonContent');
  const chunk = content.slice(startIdx, nextIdx);

  const title = chunk.match(/"title":\s*"([^"]+)"/)?.[1] || '';
  const code = chunk.match(/"code":\s*"([^"]+)"/)?.[1] || '';
  const p1Title = chunk.match(/"part1":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p2Title = chunk.match(/"part2":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p3Match = chunk.match(/"part3":\s*\{([\s\S]*?)\n\s\s"(?:part4|part5)":/);
  const p3Title = p3Match ? p3Match[1].match(/"title":\s*"([^"]+)"/)?.[1] || '' : '';
  const p3Points = p3Match ? [...p3Match[1].matchAll(/"title":\s*"([^"]+)"/g)].map(x => x[1]) : [];
  const p4Match = chunk.match(/"part4":\s*\{([\s\S]*?)\n\s\s"part5":/);
  const p4Title = p4Match ? p4Match[1].match(/"title":\s*"([^"]+)"/)?.[1] || '' : '';
  const quizQ = chunk.match(/"quiz":\s*\{[\s\S]*?"question":\s*"([^"]+)"/)?.[1] || '';

  console.log(`[${code}] ${title} (${slug})`);
  console.log(`  P1: ${p1Title}`);
  console.log(`  P2: ${p2Title}`);
  console.log(`  P3: ${p3Title}`);
  console.log(`      Points: ${p3Points.join(' | ')}`);
  if (p4Title) console.log(`  P4: ${p4Title}`);
  console.log(`  Quiz: ${quizQ}`);
  console.log('');
}
