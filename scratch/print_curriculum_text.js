const path = require('path');
const { JS_STAGES, JS_CAPSTONE } = require(path.resolve(__dirname, '../app/learn/javascript/data/javascript-curriculum.ts'));

JS_STAGES.forEach(s => {
  console.log(`\n=== STAGE ${s.stageNumber}: ${s.name} ===`);
  console.log(`Subtitle: ${s.subtitle}`);
  console.log(`Milestone: ${s.milestone}`);
  console.log(`Desc: ${s.description}`);
  s.lessons.forEach(l => {
    console.log(`  [${l.code}] ${l.name}`);
    console.log(`       Desc: ${l.desc}`);
  });
});

console.log(`\n=== CAPSTONE ===`);
console.log(`Title: ${JS_CAPSTONE.title}`);
console.log(`Subtitle: ${JS_CAPSTONE.subtitle}`);
console.log(`Desc: ${JS_CAPSTONE.desc}`);
console.log(`Skills:`, JS_CAPSTONE.skillsTaught);
