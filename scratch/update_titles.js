const fs = require('fs');
const path = require('path');

const titles = {
  "JS-01": "How JavaScript Runs Code",
  "JS-02": "Declaring Variables",
  "JS-03": "Comparing Values with == and ===",
  "JS-04": "Making Decisions with if and else",
  "JS-05": "Repeating Code with Loops",
  "JS-06": "Writing and Calling Functions",
  "JS-07": "How Scope Works",
  "JS-08": "How Closures Work",
  "JS-09": "Using Callback Functions",
  "JS-10": "Working with Arrays",
  "JS-11": "Transforming Arrays with map and filter",
  "JS-12": "Working with Objects",
  "JS-13": "Object References and Copying",
  "JS-14": "Destructuring Objects and Arrays",
  "JS-15": "Using Spread and Rest",
  "JS-16": "Safe Property Access with ?. and ??",
  "JS-17": "How the this Keyword Works",
  "JS-18": "How Prototypes Work",
  "JS-19": "Working with Classes",
  "JS-20": "How Async Code Works",
  "JS-21": "Working with Promises",
  "JS-22": "Using async and await",
  "JS-23": "How the Event Loop Works",
  "JS-24": "Handling Errors with try and catch",
  "JS-25": "Using ES Modules",
  "JS-26": "Working with JSON",
  "JS-27": "Fetching Data with fetch",
  "JS-28": "Finding and Changing HTML Elements",
  "JS-29": "Handling User Events",
  "JS-30": "Saving Data in the Browser",
};

const contentDir = path.join(__dirname, '..', 'app', 'learn', 'javascript', 'content');

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.ts') && file.startsWith('js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Find code
      const codeMatch = content.match(/code:\s*"([^"]+)"/);
      if (codeMatch) {
        const code = codeMatch[1];
        if (titles[code]) {
          const newTitle = titles[code];
          // Replace title: "..."
          content = content.replace(/(code:\s*"[^"]+",\s*\n\s*title:\s*)"[^"]+"/, `$1"${newTitle}"`);
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Updated ${file} (${code}) -> ${newTitle}`);
        }
      }
    }
  }
}

walkDir(contentDir);
console.log('Finished updating titles.');
