const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const regex = /"(js\d\d-[^"]+)":\s*\{[\s\S]*?"part4":\s*\{[\s\S]*?"bad":\s*\{[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"explanation":\s*"([^"]+)"[\s\S]*?"good":\s*\{[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"explanation":\s*"([^"]+)"/g;

let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`\n[${match[1]}]`);
  console.log(`Bad title:  ${match[2]}`);
  console.log(`Bad expl:   ${match[3]}`);
  console.log(`Good title: ${match[4]}`);
  console.log(`Good expl:  ${match[5]}`);
}
