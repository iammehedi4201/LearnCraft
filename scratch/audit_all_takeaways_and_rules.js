const fs = require('fs');

const content = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const lessons = content.split(/^\s{2}"(js\d\d-[^"]+)":\s*\{/m);

for (let i = 1; i < lessons.length; i += 2) {
  const slug = lessons[i];
  const block = lessons[i + 1];

  // Check rule
  const ruleMatch = block.match(/"rule":\s*\{[\s\S]*?"content":\s*"([^"]+)"/);
  if (ruleMatch) {
    const text = ruleMatch[1];
    if (text.length > 120 || text.includes('lexical') || text.includes('traversal') || text.includes('encapsulat') || text.includes('imperative') || text.includes('declarative')) {
      console.log(`[${slug}] Rule: ${text}`);
    }
  }

  // Check points
  const pointsMatch = block.match(/"points":\s*\[([\s\S]*?)\]\s*\},/);
  if (pointsMatch) {
    const pointsStr = pointsMatch[1];
    const contents = [];
    const cMatch = pointsStr.matchAll(/"content":\s*"([^"]+)"/g);
    for (const c of cMatch) {
      if (c[1].includes('lexical') || c[1].includes('traversal') || c[1].includes('encapsulat') || c[1].includes('AST') || c[1].includes('JIT') || c[1].includes('ASI') || c[1].includes('prototype') || c[1].includes('coercion')) {
        console.log(`[${slug}] Point: ${c[1]}`);
      }
    }
  }
}
