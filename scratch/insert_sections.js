const fs = require('fs');

const filePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
let raw = fs.readFileSync(filePath, 'utf8');

// Configuration of the section to insert for each lesson
const insertions = {
  'js04-conditional-logic': {
    insertAfter: 'part2',
    section: {
      id: 'part3',
      label: 'Evaluation & Guard Clauses',
      icon: '🛡️',
      tag: 'FLOW'
    }
  },
  'js09-callbacks-and-higher-order-functions': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Reusable Callbacks',
      icon: '⚡',
      tag: 'CLEAN CODE'
    }
  },
  'js10-arrays-and-indexing': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Off-by-One Traps',
      icon: '⚠️',
      tag: 'PITFALL'
    }
  },
  'js11-essential-array-methods': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Chaining Pipelines',
      icon: '✨',
      tag: 'PATTERNS'
    }
  },
  'js12-objects-and-methods': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Dynamic Key Traps',
      icon: '🔑',
      tag: 'PITFALL'
    }
  },
  'js14-destructuring': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Clean Destructuring',
      icon: '📦',
      tag: 'CLEAN CODE'
    }
  },
  'js16-optional-chaining-and-nullish-coalescing': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Nullish ?? vs OR ||',
      icon: '🛡️',
      tag: 'PITFALL'
    }
  },
  'js19-classes-extends-and-super': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'The super() Rule',
      icon: '🏗️',
      tag: 'PITFALL'
    }
  },
  'js26-working-with-json': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Safe JSON Parsing',
      icon: '🛡️',
      tag: 'DEFENSIVE'
    }
  },
  'js27-the-fetch-api': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'The res.ok Guard',
      icon: '🌐',
      tag: 'FETCH GUARD'
    }
  },
  'js29-events-and-delegation': {
    insertAfter: 'part3',
    section: {
      id: 'part4',
      label: 'Event Delegation',
      icon: '⚡',
      tag: 'PERFORMANCE'
    }
  }
};

const isCRLF = raw.includes('\r\n');
let content = raw.replace(/\r\n/g, '\n');

for (const [slug, conf] of Object.entries(insertions)) {
  const slugIdx = content.indexOf('"' + slug + '":');
  if (slugIdx === -1) {
    console.log(`Could not find slug ${slug}`);
    continue;
  }

  // Find the sections array within this lesson
  const secStart = content.indexOf('"sections": [', slugIdx);
  const secEnd = content.indexOf(']', secStart);
  const secText = content.slice(secStart, secEnd + 1);

  if (secText.includes(`"id": "${conf.section.id}"`)) {
    console.log(`Section ${conf.section.id} already present in ${slug}`);
    continue;
  }

  // Find insertion point after conf.insertAfter
  const afterIdx = secText.indexOf(`"id": "${conf.insertAfter}"`);
  if (afterIdx === -1) {
    console.log(`Could not find anchor ${conf.insertAfter} in ${slug}`);
    continue;
  }

  // Find closing brace of that item
  const closingBrace = secText.indexOf('}', afterIdx);
  const commaIdx = secText.indexOf(',', closingBrace);
  const insertPos = commaIdx !== -1 ? commaIdx + 1 : closingBrace + 1;

  const newSectionJson = `\n        {\n            "id": "${conf.section.id}",\n            "label": "${conf.section.label}",\n            "icon": "${conf.section.icon}",\n            "tag": "${conf.section.tag}"\n        },`;

  const newSecText = secText.slice(0, insertPos) + newSectionJson + secText.slice(insertPos);
  content = content.slice(0, secStart) + newSecText + content.slice(secEnd + 1);
  console.log(`✓ Inserted ${conf.section.id} into ${slug}`);
}

if (isCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished updating sections arrays.');
