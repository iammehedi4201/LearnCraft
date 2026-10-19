const fs = require('fs');
const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const slugs = [];
const re = /"(js\d+-[^"]+)":/g;
let m;
while ((m = re.exec(content)) !== null) {
  slugs.push(m[1]);
}

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const start = content.indexOf('"' + slug + '":');
  const next = i < slugs.length - 1 ? content.indexOf('"' + slugs[i+1] + '":') : content.length;
  const chunk = content.slice(start, next);

  const p3Title = chunk.match(/"part3":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p4Title = chunk.match(/"part4":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';

  if (p3Title.toLowerCase().includes('mental model') || p4Title.toLowerCase().includes('bad code vs clean code')) {
    console.log(`${slug}:`);
    if (p3Title.toLowerCase().includes('mental model')) console.log(`   P3 Generic: "${p3Title}"`);
    if (p4Title.toLowerCase().includes('bad code vs clean code')) console.log(`   P4 Generic: "${p4Title}"`);
  }
}
