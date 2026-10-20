const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let content = fs.readFileSync(lessonFilePath, 'utf8');

const marker = '"explanation": "localStorage stores all keys and values strictly as strings. Storing objects requires serializing them with JSON.stringify(), and loading them requires parsing with JSON.parse()."';
const markerIdx = content.indexOf(marker);

if (markerIdx === -1) {
  throw new Error("Could not find marker");
}

const funcMarker = 'export function getJSLessonContent(';
const funcIdx = content.indexOf(funcMarker);

if (funcIdx === -1) {
  throw new Error("Could not find funcMarker");
}

// Find the closing brace of part7 after marker:
//     }\n  }\n}\n};
const sliceBefore = content.substring(0, markerIdx + marker.length);
const sliceAfter = content.substring(funcIdx);

const cleanClosing = '\n    }\n  }\n}\n};\n\n/**\n * Authoritative accessor that normalizes slugs, codes, and prefixes.\n */\n';

const fixedContent = sliceBefore + cleanClosing + sliceAfter;
fs.writeFileSync(lessonFilePath, fixedContent, 'utf8');
console.log("Successfully fixed end of javascript-lesson-content.ts!");
