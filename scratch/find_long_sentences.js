const fs = require('fs');

// We want to load the JS_LESSONS_CONTENT object to inspect text fields
const fileContent = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

// Find all long sentences in strings
const stringRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
let match;
const longSentences = [];

while ((match = stringRegex.exec(fileContent)) !== null) {
  const str = match[1];
  if (str.length < 50 || str.includes('//') || str.includes('const ') || str.includes('function')) continue;
  
  // Split into sentences
  const sentences = str.split(/(?<=[.?!])\s+/);
  for (const s of sentences) {
    const words = s.trim().split(/\s+/);
    if (words.length > 25) {
      longSentences.push({ words: words.length, text: s.trim() });
    }
  }
}

console.log(`Found ${longSentences.length} sentences with more than 25 words:`);
longSentences.slice(0, 15).forEach(item => {
  console.log(`[${item.words} words] ${item.text}`);
});
