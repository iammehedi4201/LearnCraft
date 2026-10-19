const fs = require('fs');

let fileText = fs.readFileSync('app/learn/javascript/data/javascript-lesson-content.ts', 'utf8');

const furtherReplacements = [
  {
    from: `"A function should do one thing well (Single Responsibility Principle). Always return a value explicitly if callers need output."`,
    to: `"Keep each function small and focused on one specific job. If you need the result later, always use the return keyword."`
  },
  {
    from: `"Use closures to protect private state. When returning methods that share variables, do not expose the raw state directly."`,
    to: `"Use closures to keep secret data safe inside a function, giving outside code only the specific helper methods it needs."`
  },
  {
    from: `"A closure remembers its lexical birthplace regardless of how or where it is invoked later."`,
    to: `"A closure remembers the variables from the exact place it was created, no matter where or when you run it later."`
  },
  {
    from: `"Be careful with methods that mutate arrays in place (splice, sort) vs methods that return a new copy (slice, concat). Prefer non-mutating methods."`,
    to: `"Remember that some methods (like splice and sort) change the original list, while others (like slice and concat) give you a safe new copy. Prefer methods that leave the original list untouched."`
  },
  {
    from: `"Never directly mutate function arguments or shared objects. Use spread {...obj} for flat objects or structuredClone for nested structures."`,
    to: `"Avoid changing objects that other parts of your app are using. Make a safe copy with {...obj} before editing properties."`
  },
  {
    from: `"Destructure function parameter objects directly in the signature: function renderUser({ name, role = 'User' }) for clean API boundaries."`,
    to: `"Unpack function inputs right inside the parentheses: function renderUser({ name, role = 'User' }) to write cleaner, self-explanatory code."`
  },
  {
    from: `"Do not modify built-in prototypes (like Array.prototype or Object.prototype). Prototype pollution causes catastrophic security bugs."`,
    to: `"Never add custom methods directly to JavaScript's built-in prototypes like Array.prototype. It can break third-party libraries and cause dangerous security bugs."`
  },
  {
    from: `"Favor object composition over deep class inheritance hierarchies. Keep inheritance shallow (1-2 levels max) to avoid rigid architectures."`,
    to: `"Keep class relationships simple. Avoid stacking classes 4 or 5 levels deep because it makes code rigid and difficult to change later."`
  },
  {
    from: `"Avoid the 'waterfall trap': if two async operations don't depend on each other, await Promise.all([a(), b()]) concurrently instead of awaiting them in sequence."`,
    to: `"Don't wait for independent tasks one by one! If task A and task B don't depend on each other, run them together with Promise.all([a(), b()]) to save time."`
  },
  {
    from: `"Always throw Error instances (throw new Error('...')) rather than raw strings or numbers. Error instances include stack traces for debugging."`,
    to: `"Always write throw new Error('message') instead of just throw 'message'. Real Error objects remember the exact file and line number where the problem happened."`
  },
  {
    from: `"Never insert untrusted user input using innerHTML. Always use textContent to prevent Cross-Site Scripting (XSS) vulnerabilities."`,
    to: `"Never put text from users directly into innerHTML. Always use textContent so malicious HTML and scripts cannot run on your website."`
  },
  {
    from: `"Never store sensitive data (passwords, JWT auth tokens with high privileges) in localStorage because it is vulnerable to XSS theft."`,
    to: `"Never save sensitive information like passwords or private login tokens in localStorage, because any script running on the page could read it."`
  },
  {
    from: `"Prefer named exports over default exports for utility libraries. Named exports prevent naming confusion and make auto-imports instant."`,
    to: `"Prefer named exports (export const add = ...) because they make it easy to import only what you need and prevent naming confusion."`
  },
  {
    from: `"Always wrap JSON.parse in a try/catch block. Malformed JSON from an external server or corrupted storage crashes your entire application."`,
    to: `"Always wrap JSON.parse in a try/catch block. If an external server sends corrupted text, JSON.parse will crash your app unless caught."`
  },
  {
    from: `"Never assume fetch() catches 404 or 500 errors. Always check: if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);."`,
    to: `"Never assume fetch() stops on 404 or 500 errors. Always check if (!res.ok) so you know whether the server actually succeeded."`
  },
  {
    from: `"Always use Event Delegation for dynamic lists. Attach one listener to the parent <ul> rather than adding listeners to each <li>."`,
    to: `"Use Event Delegation for lists: attach a single click listener to the parent <ul> container instead of adding hundreds of listeners to every <li> item."`
  }
];

let count = 0;
for (const r of furtherReplacements) {
  if (fileText.includes(r.from)) {
    fileText = fileText.replace(r.from, r.to);
    count++;
  } else {
    console.warn(`Could not match:\n${r.from.slice(0, 50)}...`);
  }
}

fs.writeFileSync('app/learn/javascript/data/javascript-lesson-content.ts', fileText, 'utf8');
console.log(`Successfully updated ${count} / ${furtherReplacements.length} rules!`);
