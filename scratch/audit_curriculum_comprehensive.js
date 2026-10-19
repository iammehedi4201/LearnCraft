const fs = require('fs');

const lessonContentRaw = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');
const quizzesRaw = fs.readFileSync('lib/quiz/javascript-quizzes.ts', 'utf8');
const interviewsRaw = fs.readFileSync('lib/interview-questions/javascript-questions.ts', 'utf8');

console.log('=== CURRICULUM AUDIT SCRIPT ===');

// Simple regex parser to inspect lessons
const lessonRegex = /"(js\d+-[^"]+)":\s*\{([\s\S]*?)(?=\n\s\s"(?:js\d+|exports)|\n\};)/g;
let match;
const lessons = [];

while ((match = lessonRegex.exec(lessonContentRaw)) !== null) {
  const slug = match[1];
  const block = match[2];

  // Title
  const titleM = block.match(/"title":\s*"([^"]+)"/);
  const codeM = block.match(/"code":\s*"([^"]+)"/);
  
  // Sections array
  const secM = block.match(/"sections":\s*\[([\s\S]*?)\]/);
  let sections = [];
  if (secM) {
    const idMatches = secM[1].match(/"id":\s*"([^"]+)"/g);
    if (idMatches) {
      sections = idMatches.map(s => s.replace(/"id":\s*"/, '').replace('"', ''));
    }
  }

  // Parts present in data
  const hasPart1 = block.includes('"part1":');
  const hasPart2 = block.includes('"part2":');
  const hasPart3 = block.includes('"part3":');
  const hasPart4 = block.includes('"part4":');
  const hasPart5 = block.includes('"part5":');
  const hasPart6 = block.includes('"part6":');
  const hasPart7 = block.includes('"part7":');

  // Part titles
  const p1Title = block.match(/"part1":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p2Title = block.match(/"part2":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p3Title = block.match(/"part3":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p4Title = block.match(/"part4":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p5Title = block.match(/"part5":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p6Title = block.match(/"part6":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';
  const p7Title = block.match(/"part7":\s*\{[\s\S]*?"title":\s*"([^"]+)"/)?.[1] || '';

  // Quiz question
  const quizQ = block.match(/"quiz":\s*\{[\s\S]*?"question":\s*"([^"]+)"/)?.[1] || '';

  lessons.push({
    slug,
    code: codeM ? codeM[1] : '',
    title: titleM ? titleM[1] : '',
    sections,
    partsPresent: { p1: hasPart1, p2: hasPart2, p3: hasPart3, p4: hasPart4, p5: hasPart5, p6: hasPart6, p7: hasPart7 },
    titles: { p1: p1Title, p2: p2Title, p3: p3Title, p4: p4Title, p5: p5Title, p6: p6Title, p7: p7Title },
    quizQ
  });
}

console.log(`Parsed ${lessons.length} lessons.`);

// Output summary table of sections and parts
console.log('\n--- SECTION INVENTORY & ANOMALIES ---');
for (const l of lessons) {
  const omitted = [];
  for (let i = 1; i <= 7; i++) {
    const pid = `part${i}`;
    if (l.partsPresent[`p${i}`] && !l.sections.includes(pid)) {
      omitted.push(pid);
    }
  }
  const extra = [];
  for (const s of l.sections) {
    const num = s.replace('part', '');
    if (!l.partsPresent[`p${num}`]) {
      extra.push(s);
    }
  }

  const flags = [];
  if (omitted.length > 0) flags.push(`DATA EXISTS BUT NOT IN SECTIONS: ${omitted.join(', ')}`);
  if (extra.length > 0) flags.push(`IN SECTIONS BUT NO DATA: ${extra.join(', ')}`);

  console.log(`[${l.code}] ${l.slug} (${l.sections.length} rendered sections) ${flags.length ? '⚠️ ' + flags.join(' | ') : '✅'}`);
}
