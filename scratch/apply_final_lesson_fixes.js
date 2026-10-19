const fs = require('fs');

let fileText = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const finalFixes = [
  {
    from: `// 1. Immutable reference (const)`,
    to: `// 1. Value that never changes (const)`
  },
  {
    from: `// 2. Mutable variable (let)`,
    to: `// 2. Variable you can change (let)`
  },
  {
    from: `"content": "Never mutate array items inside map or filter. Always return a new value. Chain methods cleanly: filter first to reduce work, then map."`,
    to: `"content": "Never change array items directly inside map or filter. Always return a new value. Chain methods cleanly: filter first to reduce work, then map."`
  },
  {
    from: `// Invoke object method:\nconsole.log(userProfile.addReputation(50));`,
    to: `// Call object method:\nconsole.log(userProfile.addReputation(50));`
  },
  {
    from: `"explanation": "Arrow functions do not possess their own 'this' binding. They lexically resolve 'this' from their enclosing lexical context at the time of definition."`,
    to: `"explanation": "Arrow functions do not have their own 'this'. They simply use the 'this' value from the surrounding code where they were created."`
  },
  {
    from: `"bigPicture": "JavaScript uses prototypal inheritance rather than traditional class blueprints. Think of this like borrowing from parents: if you need a specialized tool that isn't in your personal toolbox, you ask your parents, walking up the family tree.",`,
    to: `"bigPicture": "In JavaScript, objects can borrow features from other objects through a prototype. Think of this like borrowing a tool: if you do not have a tool in your own toolbox, you ask your neighbor or parent to borrow theirs.",`
  },
  {
    from: `// 1. Logs \\"1\\" and \\"2\\" synchronously on the Call Stack.`,
    to: `// 1. Logs \\"1\\" and \\"2\\" immediately on the Call Stack.`
  },
  {
    from: `// dumped into a single monolithic script with global variables:`,
    to: `// dumped into one giant file with confusing global variables:`
  }
];

let count = 0;
for (const fix of finalFixes) {
  if (fileText.includes(fix.from)) {
    fileText = fileText.replace(fix.from, fix.to);
    count++;
  } else {
    console.warn(`Could not match: ${fix.from.slice(0, 40)}`);
  }
}

fs.writeFileSync('app/learn/javascript/data/javascript-lesson-content.ts', fileText, 'utf8');
console.log(`Applied ${count} / ${finalFixes.length} remaining fixes.`);
