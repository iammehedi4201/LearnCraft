const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Simple regex parser to extract lesson objects
const lessonBlocks = content.split(/^\s{2}"(js\d\d-[^"]+)":\s*\{/m);

console.log(`Found ${Math.floor(lessonBlocks.length / 2)} lessons.`);

for (let i = 1; i < lessonBlocks.length; i += 2) {
  const slug = lessonBlocks[i];
  const block = lessonBlocks[i + 1];
  
  // Extract bigPicture
  const bpMatch = block.match(/"bigPicture":\s*"([^"]+)"/);
  const bigPicture = bpMatch ? bpMatch[1] : '';
  
  // Count words in bigPicture
  const bpWords = bigPicture.split(/\s+/).length;
  
  // Check for any words > 12 characters
  const longWords = bigPicture.match(/\b[a-zA-Z]{13,}\b/g) || [];
  
  console.log(`\n=== ${slug} (bigPicture: ${bpWords} words) ===`);
  console.log(bigPicture);
  if (longWords.length > 0) {
    console.log(`Long words: ${longWords.join(', ')}`);
  }
}
