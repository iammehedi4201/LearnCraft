const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Match all string literals
const stringRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
let match;
let count = 0;

while ((match = stringRegex.exec(content)) !== null) {
  const str = match[1].replace(/\\"/g, '"').replace(/\\n/g, ' ');
  // Split into sentences
  const sentences = str.split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const trimmed = s.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('import ') || trimmed.startsWith('const ') || trimmed.startsWith('function ')) continue;
    const words = trimmed.split(/\s+/).filter(Boolean);
    if (words.length > 25) {
      count++;
      console.log(`\n[Long Sentence ${count}] (${words.length} words):`);
      console.log(trimmed);
    }
  }
}

console.log(`\nTotal long sentences (>25 words): ${count}`);
