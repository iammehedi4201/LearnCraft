const fs = require('fs');
const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const slugs = [];
const re = /"(js\d+-[^"]+)":/g;
let m;
while ((m = re.exec(content)) !== null) {
  slugs.push(m[1]);
}

console.log('=== TITLES INVENTORY ===');
for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const start = content.indexOf('"' + slug + '":');
  const next = i < slugs.length - 1 ? content.indexOf('"' + slugs[i+1] + '":') : content.length;
  const chunk = content.slice(start, next);

  const code = chunk.match(/"code":\s*"([^"]+)"/)?.[1] || '';
  const p1 = chunk.match(/"part1":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p2 = chunk.match(/"part2":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p3 = chunk.match(/"part3":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p4 = chunk.match(/"part4":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p5 = chunk.match(/"part5":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p6 = chunk.match(/"part6":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';

  console.log(`[${code}] P1: "${p1}" | P2: "${p2}" | P3: "${p3}" | P4: "${p4}"`);
}
