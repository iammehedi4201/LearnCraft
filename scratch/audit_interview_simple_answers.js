const fs = require('fs');

const content = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

const regex = /id:\s*"([^"]+)"[\s\S]*?question:\s*"([^"]+)"[\s\S]*?answer:\s*`([^`]+)`/g;

let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  const id = match[1];
  const q = match[2];
  const ans = match[3];
  
  // Extract Simple answer section
  const simpleMatch = ans.match(/### Simple answer:\s*\n([^\n]+)/);
  console.log(`\n[${id}] ${q}`);
  if (simpleMatch) {
    console.log(`Simple: ${simpleMatch[1]}`);
  }
}
console.log(`\nTotal questions parsed: ${count}`);
