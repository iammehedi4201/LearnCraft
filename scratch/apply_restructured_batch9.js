const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 9 (STAGE 8): JS-28, JS-29, JS-30
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch9Lessons = {
  "js28-dom-essentials": {
    slug: "js28-dom-essentials",
    code: "JS-28",
    title: "Browser DOM Essentials: Selecting & Modifying Elements",
    subtitle: "Bridge JavaScript with the browser: select elements with querySelector, update text safely, and toggle CSS classes.",
    sections: [
      { id: "part1", label: "The HTML Tree", icon: "🌳", tag: "DOM TREE" },
      { id: "part2", label: "Selecting & Modifying", icon: "🎯", tag: "CORE SYNTAX" },
      { id: "part3", label: "The Living Node Model", icon: "🧠", tag: "MENTAL MODEL" },
      { id: "part4", label: "XSS Security Traps", icon: "🛡️", tag: "SECURITY" },
      { id: "part5", label: "DOM Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Living Family Tree: How JavaScript Talks to HTML",
      bigPicture: "When a web browser loads an HTML file, it does not treat it as plain text. Instead, it parses every tag into a living tree of JavaScript objects called the Document Object Model (DOM). JavaScript cannot directly edit the HTML files saved on your hard drive, but it can freely read, add, remove, and restyle any node on this living in-memory tree in real time. The moment JavaScript changes a DOM node, the browser immediately repaints the screen.",
      breakdownTitle: "Four Pillars of DOM Manipulation:",
      breakdownItems: [
        {
          title: "The document Object",
          desc: "The entry point to the webpage; provides query methods like querySelector and querySelectorAll to find elements."
        },
        {
          title: "Safe Text Updates with textContent",
          desc: "Updates element text safely without parsing HTML, preventing dangerous Cross-Site Scripting (XSS) attacks."
        },
        {
          title: "Dynamic Styling via classList",
          desc: "Add, remove, or toggle CSS class names dynamically instead of hardcoding fragile inline CSS styles."
        },
        {
          title: "Creating Nodes with createElement",
          desc: "Instantiate brand-new HTML elements in memory and append them into the live page tree with appendChild or append."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: Selecting, Modifying & Creating Elements",
      intro: "Master the essential methods for interacting with page elements:",
      cards: [
        {
          number: "01",
          tag: "Selection",
          title: "querySelector(cssSelector)",
          description: "Finds the first matching element using CSS selector syntax (e.g., '#id', '.class', 'button[type=submit]'). Returns null if not found.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Classes",
          title: "element.classList",
          description: "Manipulate CSS classes with .add('active'), .remove('hidden'), and .toggle('dark-mode') instead of touching element.style directly.",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Creation",
          title: "createElement & append",
          description: "Build new elements with document.createElement('div'), configure their text and classes, and insert them with parent.append(child).",
          color: "purple"
        }
      ],
      rule: {
        title: "💡 Golden Rule of DOM Security: Use textContent Over innerHTML",
        content: "Never insert untrusted user input using innerHTML! An attacker can pass malicious HTML containing script tags or image error payloads (<img src=x onerror=...>) that steal session cookies. Always use element.textContent for user data."
      }
    },
    part3: {
      title: "The Living Node Mental Model: JavaScript Objects in Memory",
      intro: "How the browser bridges HTML tags with JavaScript objects:",
      points: [
        {
          title: "1. Tags Become Objects",
          content: "Every <button class='btn'>Click</button> tag becomes an HTMLButtonElement object in memory with properties like .textContent, .id, .className, and .style."
        },
        {
          title: "2. The Parent-Child Tree",
          content: "Elements nest like branches on a tree. <body> contains <main>, <main> contains <article>, <article> contains <p>. You can traverse parentNode, children, and closest() seamlessly."
        },
        {
          title: "3. Live Rendering Synchronization",
          content: "When you run card.classList.add('highlight'), you aren't editing a file—you are modifying a live property on a memory node. The browser's rendering engine notices the update and repaints pixels immediately."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Dangerous innerHTML vs Safe textContent",
      bad: {
        title: "❌ Bad: Using innerHTML with raw user input (Severe XSS Vulnerability)",
        code: `function renderUserComment(commentText) {
  const container = document.querySelector("#comments");
  // Catastrophic security flaw:
  // If commentText is: "<img src=x onerror='stealCredentials()'>"
  // the browser executes the attacker's JavaScript code immediately!
  container.innerHTML += \`<div class="comment">\${commentText}</div>\`;
}`,
        explanation: "Using innerHTML with untrusted user input allows attackers to inject malicious JavaScript into other users' browsers (Cross-Site Scripting)."
      },
      good: {
        title: "✅ Clean: Safe node creation using textContent and append",
        code: `function renderUserComment(commentText) {
  const container = document.querySelector("#comments");
  
  // Safe: Creates node in memory
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");
  
  // Safe: textContent treats all inputs strictly as plain text, escaping any HTML!
  commentDiv.textContent = commentText;
  
  container.append(commentDiv);
}`,
        explanation: "textContent safely escapes all HTML characters, treating attack scripts as inert plain text and completely neutralizing XSS exploits."
      }
    },
    part5: {
      title: "DOM Manipulation Simulation Playground",
      intro: "Simulate creating, styling, and appending interactive task items safely in JavaScript:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-28: DOM ESSENTIALS PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Simulated DOM environment
class MockDOMElement {
  constructor(tagName) {
    this.tagName = tagName.toUpperCase();
    this.textContent = "";
    this.classList = new Set();
    this.children = [];
  }

  append(child) {
    this.children.push(child);
  }

  get className() {
    return Array.from(this.classList).join(" ");
  }
}

// 2. Helper to simulate document.createElement
function createElement(tag) {
  return new MockDOMElement(tag);
}

// 3. Build a task card element safely:
function createTaskCard(title, isCompleted) {
  const card = createElement("article");
  card.classList.add("task-card");
  
  if (isCompleted) {
    card.classList.add("completed");
  }

  // Safe text insertion:
  const heading = createElement("h3");
  heading.textContent = title;
  card.append(heading);

  const statusBadge = createElement("span");
  statusBadge.classList.add("badge");
  statusBadge.textContent = isCompleted ? "Done" : "In Progress";
  card.append(statusBadge);

  return card;
}

// 4. Test card generation:
const card1 = createTaskCard("Master JavaScript DOM", true);
const card2 = createTaskCard("Build Capstone App", false);

console.log("Card 1 Tag:", card1.tagName);
console.log("Card 1 Classes:", card1.className);
console.log("Card 1 Title:", card1.children[0].textContent);
console.log("Card 2 Status:", card2.children[1].textContent);
`
    },
    part6: {
      title: "Key Takeaways: Browser DOM Essentials",
      takeaways: [
        {
          title: "1. The DOM is an Object Tree",
          desc: "The browser parses HTML tags into a live tree of JavaScript objects rooted at the global document object."
        },
        {
          title: "2. querySelector vs querySelectorAll",
          desc: "querySelector returns the first matching element node; querySelectorAll returns a list of all matching nodes."
        },
        {
          title: "3. Never Trust innerHTML",
          desc: "Always use textContent for inserting user text to protect your application and users from XSS injection attacks."
        },
        {
          title: "4. Use classList for Styling",
          desc: "Toggle and manage CSS classes with element.classList.toggle() instead of hardcoding brittle inline style properties."
        }
      ],
      nextLessonPreview: {
        title: "JS-29: Events, Event Listeners & Event Delegation",
        desc: "Listen for user clicks, keyboard presses, and form submits using addEventListener, and master high-performance Event Delegation."
      }
    },
    part7: {
      title: "Knowledge Check: Browser DOM Essentials",
      quiz: {
        question: "Why should you use 'element.textContent' instead of 'element.innerHTML' when displaying user-submitted comments?",
        options: [
          "textContent renders faster because it disables font styling",
          "textContent treats input strictly as plain text, escaping HTML tags to prevent Cross-Site Scripting (XSS)",
          "innerHTML is deprecated in modern JavaScript standards",
          "textContent automatically capitalizes the first letter of each sentence"
        ],
        correctIndex: 1,
        explanation: "element.textContent treats all assigned values strictly as literal plain text. Any malicious HTML or script tags are safely escaped, preventing XSS vulnerabilities."
      }
    }
  },

  "js29-events-and-delegation": {
    slug: "js29-events-and-delegation",
    code: "JS-29",
    title: "Events, Event Listeners & Event Delegation",
    subtitle: "Respond to user clicks, keyboard presses, and form submissions using addEventListener and high-performance Event Delegation.",
    sections: [
      { id: "part1", label: "The Doorbell Analogy", icon: "🔔", tag: "FOUNDATION" },
      { id: "part2", label: "Listeners & Bubbling", icon: "🫧", tag: "SYNTAX" },
      { id: "part3", label: "Event Delegation", icon: "⚡", tag: "PERFORMANCE" },
      { id: "part4", label: "500 Listeners Trap", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Events Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Doorbell & The Lobby: How Web Pages React to Users",
      bigPicture: "A webpage without events is a static poster. Events make the web interactive: clicking buttons, typing in search bars, submitting forms, and scrolling feeds all emit event signals. In JavaScript, an event listener is like wiring a doorbell: you register a callback function that sits dormant until the user presses the button, at which point the browser fires your handler with an Event object detailing exactly what happened.",
      breakdownTitle: "Four Pillars of Event Handling:",
      breakdownItems: [
        {
          title: "addEventListener('event', handler)",
          desc: "Attaches a listener function to any DOM element without overwriting existing handlers or polluting HTML."
        },
        {
          title: "The Event Object (e.target vs e.currentTarget)",
          desc: "e.target is the exact element that was clicked; e.currentTarget is the element running the event handler."
        },
        {
          title: "Event Bubbling",
          desc: "Events bubble upward from the child element through each parent container like air bubbles rising in water."
        },
        {
          title: "Event Delegation",
          desc: "Attach ONE listener to a parent container to manage actions for hundreds of dynamic child items efficiently."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: addEventListener, preventDefault & Bubbling",
      intro: "Master the tools for capturing user actions and controlling event flow:",
      cards: [
        {
          number: "01",
          tag: "Listeners",
          title: "element.addEventListener()",
          description: "Registers an event type ('click', 'input', 'submit') and a callback function. Cleanly separates JavaScript logic from HTML markup.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Forms",
          title: "event.preventDefault()",
          description: "Cancels default browser actions like page reloads on form submit (<form>) or page jumping on link clicks (<a>).",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Bubbling",
          title: "The Upward Bubble",
          description: "When a nested <span> inside a <button> is clicked, the event bubbles: span -> button -> div -> body -> document.",
          color: "purple"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Dynamic Lists: Use Event Delegation",
        content: "Never attach individual addEventListener callbacks to items in a dynamic loop. Attach ONE single listener to the static parent container (<ul> or <main>) and inspect 'event.target.closest(...)' to handle actions. It saves memory and works automatically for future items."
      }
    },
    part3: {
      title: "The Event Delegation Mental Model: The Lobby Concierge",
      intro: "Why one parent listener beats 500 individual child listeners:",
      points: [
        {
          title: "1. The 500 Security Guards Analogy",
          content: "Imagine an apartment building with 500 rooms. Hiring 500 security guards to stand outside each room door wastes massive resources. That is what attaching 500 event listeners in a forEach loop does to browser memory."
        },
        {
          title: "2. The Front Desk Concierge (Delegation)",
          content: "Instead, hire ONE guard at the front entrance lobby (the parent <ul>). Because all visitors must pass through the lobby (event bubbling), that single guard handles all incoming traffic using event.target."
        },
        {
          title: "3. Future-Proofing Dynamic Content",
          content: "When a new resident moves into room 501 (an item added via fetch or user input), they don't need a new guard hired. The lobby concierge already handles them automatically!"
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Attaching 500 Listeners in a Loop",
      bad: {
        title: "❌ Bad: Attaching listeners to every list item in a loop",
        code: `// Wasteful & fragile:
const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    deleteItem(e.target.dataset.id);
  });
});

// Huge bug: When a user adds a new task dynamically,
// the new delete button has NO listener attached and clicking it does nothing!`,
        explanation: "Loops attach hundreds of separate functions in memory, and dynamically inserted items won't have listeners attached."
      },
      good: {
        title: "✅ Clean: Event Delegation with a single parent listener and closest()",
        code: `const taskList = document.querySelector("#task-list");

// Single listener on parent handles ALL current and future delete buttons:
taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".delete-btn");
  if (!deleteBtn) return; // Click was not on or inside a delete button

  const taskId = deleteBtn.dataset.id;
  deleteItem(taskId);
});`,
        explanation: "One listener on the parent container handles clicks for all existing and newly added items with minimal memory usage."
      }
    },
    part5: {
      title: "Event Delegation Simulation Playground",
      intro: "Observe event bubbling and delegation handling clicks on dynamic task items:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-29: EVENT DELEGATION PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Simulated parent container and data state:
const state = {
  tasks: [
    { id: 1, title: "Learn DOM Selection" },
    { id: 2, title: "Master Event Delegation" }
  ]
};

// 2. Simulated Event Dispatcher representing a user click:
function simulateUserClick(targetSelector, targetId) {
  const event = {
    target: {
      matches: (selector) => selector === targetSelector,
      dataset: { id: targetId }
    }
  };
  
  // Single delegated listener on parent:
  handleParentListClick(event);
}

// 3. The Delegated Handler (The Front Desk Concierge):
function handleParentListClick(event) {
  if (event.target.matches(".btn-delete")) {
    const id = Number(event.target.dataset.id);
    state.tasks = state.tasks.filter(t => t.id !== id);
    console.log(\`🗑️ Delegated Handler: Deleted task #\${id}!\`);
  } else {
    console.log("ℹ️ Click ignored: Not on a delete button.");
  }
}

// 4. Test 1: Click delete on existing task #1
simulateUserClick(".btn-delete", 1);
console.log("Remaining tasks:", state.tasks.map(t => t.title));

// 5. Test 2: Add dynamic task #3 (No new listener needed!)
state.tasks.push({ id: 3, title: "Build Capstone Project" });
console.log("\\nAdded new task dynamically. Testing delegation on new task:");

// Test 3: Click delete on newly added task #3
simulateUserClick(".btn-delete", 3);
console.log("Remaining tasks:", state.tasks.map(t => t.title));
`
    },
    part6: {
      title: "Key Takeaways: Events & Delegation",
      takeaways: [
        {
          title: "1. Clean Event Listeners",
          desc: "Use addEventListener to attach callbacks; avoid deprecated inline HTML onclick attributes."
        },
        {
          title: "2. The Event Object",
          desc: "e.target tells you what was clicked; e.preventDefault() prevents unwanted browser page reloads."
        },
        {
          title: "3. Natural Event Bubbling",
          desc: "Events propagate upward through parent elements in the DOM tree, enabling centralized event handling."
        },
        {
          title: "4. Master Event Delegation",
          desc: "Attach one listener to a static parent container to handle actions on dynamic children with minimal memory."
        }
      ],
      nextLessonPreview: {
        title: "JS-30: Browser Storage (localStorage) & DevTools Debugging",
        desc: "Persist user settings and application state across browser refreshes with localStorage, and master DevTools debugging."
      }
    },
    part7: {
      title: "Knowledge Check: Events & Delegation",
      quiz: {
        question: "In an event listener attached to a parent container, what does 'event.target' represent?",
        options: [
          "The element where the event listener is attached",
          "The exact deepest element that the user clicked on",
          "The parent of the document body",
          "The global window object"
        ],
        correctIndex: 1,
        explanation: "event.target represents the exact element that originally triggered the event (the clicked element), whereas event.currentTarget represents the element holding the active event listener."
      }
    }
  },

  "js30-browser-storage-and-debugging": {
    slug: "js30-browser-storage-and-debugging",
    code: "JS-30",
    title: "Browser Storage (localStorage) & DevTools Debugging",
    subtitle: "Persist user preferences across browser refreshes with localStorage and troubleshoot code like a pro using DevTools.",
    sections: [
      { id: "part1", label: "Persistent State", icon: "💾", tag: "STORAGE" },
      { id: "part2", label: "localStorage API", icon: "⏱️", tag: "SYNTAX" },
      { id: "part3", label: "DevTools Debugging", icon: "🐞", tag: "DEBUGGING" },
      { id: "part4", label: "[object Object] Trap", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Storage Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Knowledge Check", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Sticky Note & The Slow-Mo Replay: Persistence & Debugging",
      bigPicture: "Every time a user refreshes their browser tab, JavaScript's in-memory variables are wiped clean! To remember dark mode preferences, shopping cart items, or auth tokens, web applications use localStorage—a permanent key-value store built right into the browser. And when things don't work as expected, professional developers don't just guess with console.log: they use browser DevTools and the debugger statement to pause execution and inspect variables in slow motion.",
      breakdownTitle: "Four Pillars of Storage & Debugging:",
      breakdownItems: [
        {
          title: "localStorage Persistence",
          desc: "Stores text data that survives browser refreshes and computer restarts until explicitly cleared."
        },
        {
          title: "The JSON Serialization Rule",
          desc: "localStorage only stores strings! Objects and arrays MUST be serialized with JSON.stringify before saving."
        },
        {
          title: "localStorage vs sessionStorage",
          desc: "localStorage lasts indefinitely; sessionStorage is automatically cleared when the user closes the tab."
        },
        {
          title: "DevTools & debugger Statement",
          desc: "The debugger keyword acts as a programmatic breakpoint, pausing script execution to inspect scopes and call stacks."
        }
      ]
    },
    part2: {
      title: "Core Mechanics: localStorage API & DevTools Breakpoints",
      intro: "Master the fundamental storage methods and debugging techniques:",
      cards: [
        {
          number: "01",
          tag: "Storage",
          title: "setItem & getItem",
          description: "Save data with localStorage.setItem('theme', 'dark') and retrieve with localStorage.getItem('theme'). Returns null if missing.",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Objects",
          title: "JSON Storage Pattern",
          description: "Save objects: localStorage.setItem('user', JSON.stringify(user)). Retrieve: JSON.parse(localStorage.getItem('user') || '{}').",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Debugging",
          title: "The debugger Statement",
          description: "Insert 'debugger;' in your code. If DevTools is open, execution pauses instantly, letting you step line-by-line.",
          color: "purple"
        }
      ],
      rule: {
        title: "💡 Golden Rule of LocalStorage: Never Store Naked Objects",
        content: "If you pass an object directly to localStorage (localStorage.setItem('cart', cartObject)), JavaScript implicitly calls .toString(), saving the useless string '[object Object]'! Always serialize with JSON.stringify() and deserialize with JSON.parse()."
      }
    },
    part3: {
      title: "The Debugging Mental Model: The Slow-Motion Replay",
      intro: "How browser DevTools lets you freeze and inspect JavaScript execution:",
      points: [
        {
          title: "1. The Live Freeze Frame",
          content: "When execution hits a breakpoint or 'debugger;' statement with DevTools open, the entire JavaScript engine pauses. The screen freezes, and no further lines execute until you press Step."
        },
        {
          title: "2. The Scope Inspector",
          content: "Look at the Scope panel in DevTools: you can inspect every local, closure, and global variable at that exact millisecond without adding a single console.log statement."
        },
        {
          title: "3. Step Over vs Step Into",
          content: "'Step Over' (F10) moves to the next line in the current function. 'Step Into' (F11) steps inside the function being called, letting you follow data into helper utilities."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: The '[object Object]' Storage Disaster",
      bad: {
        title: "❌ Bad: Storing naked objects and unsafely parsing null on first visit",
        code: `// Bug 1: Saves the useless string "[object Object]"!
const user = { name: "Sam", theme: "dark" };
localStorage.setItem("user_profile", user);

// Bug 2: Naked JSON.parse on first load (when getItem returns null):
const saved = JSON.parse(localStorage.getItem("user_profile"));
// If nothing was saved yet, saved is null.
console.log(saved.theme); // TypeError: Cannot read properties of null!`,
        explanation: "Naked objects are ruined into '[object Object]', and failing to handle null on first load causes fatal TypeErrors."
      },
      good: {
        title: "✅ Clean: Stringifying data and safely providing fallback defaults",
        code: `const user = { name: "Sam", theme: "dark" };

// 1. Serialize objects to JSON text before saving:
localStorage.setItem("user_profile", JSON.stringify(user));

// 2. Safe retrieval with fallback default:
function loadProfile() {
  const raw = localStorage.getItem("user_profile");
  if (!raw) return { name: "Guest", theme: "system" };
  
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Storage corrupted; using fallback default:", err.message);
    return { name: "Guest", theme: "system" };
  }
}`,
        explanation: "Using JSON.stringify preserves data integrity, and defensive parsing guarantees safe fallbacks even on first load."
      }
    },
    part5: {
      title: "Browser Storage & Persistence Playground",
      intro: "Simulate persistent user settings with JSON serialization and defensive loading:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-30: LOCALSTORAGE & PERSISTENCE PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. In-memory simulation of localStorage:
const mockStorage = {
  store: {},
  setItem(key, value) { this.store[key] = String(value); },
  getItem(key) { return this.store[key] !== undefined ? this.store[key] : null; },
  removeItem(key) { delete this.store[key]; }
};

// 2. Persistent Settings Manager:
const SettingsManager = {
  storageKey: "learncraft_user_prefs",
  
  // Save settings with JSON serialization
  save(prefs) {
    const serialized = JSON.stringify(prefs);
    mockStorage.setItem(this.storageKey, serialized);
    console.log("💾 Saved preferences to storage:", serialized);
  },

  // Load settings with defensive fallback
  load() {
    const raw = mockStorage.getItem(this.storageKey);
    if (!raw) {
      console.log("ℹ️ No saved preferences found; using defaults.");
      return { theme: "system", fontSize: 16, autoSave: true };
    }

    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("⚠️ Corrupted storage, returning default:", e.message);
      return { theme: "system", fontSize: 16, autoSave: true };
    }
  }
};

// Test 1: Load on first visit (defaults applied)
const initial = SettingsManager.load();
console.log("First visit theme:", initial.theme);

// Test 2: User updates theme to "cyberpunk"
SettingsManager.save({ theme: "cyberpunk", fontSize: 18, autoSave: true });

// Test 3: Reload on subsequent visit
const refreshed = SettingsManager.load();
console.log("Loaded persistent theme:", refreshed.theme);
console.log("Loaded font size:", refreshed.fontSize);
`
    },
    part6: {
      title: "Key Takeaways: Browser Storage & Capstone Readiness",
      takeaways: [
        {
          title: "1. localStorage Persists Across Refreshes",
          desc: "Data in localStorage lasts indefinitely until cleared, making it ideal for client-side persistence."
        },
        {
          title: "2. Always Stringify Objects",
          desc: "Never store naked objects; always use JSON.stringify() to save and defensive JSON.parse() to load."
        },
        {
          title: "3. Master DevTools Debugging",
          desc: "Use the debugger; statement and DevTools breakpoints to inspect variable values in slow motion."
        },
        {
          title: "4. You are Capstone Ready!",
          desc: "You have completed all 30 foundational JavaScript lessons. You now possess every core skill required to build the Interactive Task Manager Capstone Project!"
        }
      ],
      nextLessonPreview: {
        title: "JS-CAPSTONE: Interactive Task & Workflow Manager",
        desc: "Build a complete, modular vanilla JavaScript application demonstrating ES modules, array manipulation, event delegation, async fetch, and localStorage."
      }
    },
    part7: {
      title: "Knowledge Check: Browser Storage",
      quiz: {
        question: "What format does the browser's 'localStorage' engine store all keys and values in?",
        options: [
          "Binary byte buffers",
          "Plain text strings only (objects must be serialized with JSON.stringify)",
          "JavaScript Map objects",
          "Direct database records"
        ],
        correctIndex: 1,
        explanation: "localStorage stores all keys and values strictly as strings. Storing objects requires serializing them with JSON.stringify(), and loading them requires parsing with JSON.parse()."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 9 MODULE QUIZZES: JS-28, JS-29, JS-30
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch9Quizzes = [
  {
    id: "quiz-javascript-js28",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js28-dom-essentials",
    lessonCode: "JS-28",
    lessonTitle: "Browser DOM Essentials: Selecting & Modifying Elements",
    description: "Assess your ability to safely select and manipulate DOM elements, prevent XSS attacks, and manage dynamic CSS classes.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js28-q1",
        type: "multiple_choice",
        title: "Preventing Cross-Site Scripting (XSS)",
        prompt: "Why is element.textContent preferred over element.innerHTML when inserting user-generated text into the DOM?",
        options: [
          "textContent renders text faster because it disables all CSS styling",
          "textContent treats input strictly as plain text, escaping HTML tags and preventing malicious script execution (XSS)",
          "innerHTML only works in older versions of Internet Explorer",
          "textContent automatically converts text to uppercase"
        ],
        correctAnswer: 1,
        explanation: "element.textContent treats all inserted content strictly as literal text. Any <script> or HTML tags provided by users are safely escaped as plain text, eliminating XSS vulnerabilities.",
        hint: "Think about how script tags behave when parsed as HTML versus plain text.",
        hintCostXP: 5
      },
      {
        id: "js28-q2",
        type: "code_output",
        title: "Managing CSS Classes with classList",
        prompt: "What will button.className be after running the following classList methods?",
        codeSnippet: `const btn = document.createElement("button");
btn.classList.add("btn", "primary");
btn.classList.toggle("active");
btn.classList.remove("primary");
console.log(btn.className);`,
        language: "javascript",
        options: [
          "'btn active'",
          "'btn primary active'",
          "'btn'",
          "'primary active'"
        ],
        correctAnswer: 0,
        explanation: "The classes 'btn' and 'primary' are added. 'active' is toggled on. Then 'primary' is removed, leaving 'btn active'.",
        hint: "Follow each add, toggle, and remove operation in sequence.",
        hintCostXP: 5
      },
      {
        id: "js28-q3",
        type: "multiple_choice",
        title: "querySelector vs querySelectorAll",
        prompt: "What does document.querySelector('.card') return if there are five elements with the class 'card' on the page?",
        options: [
          "An Array containing all five card elements",
          "A NodeList containing all five card elements",
          "Only the first matching card element in the document",
          "It throws a DOMException because multiple matches exist"
        ],
        correctAnswer: 2,
        explanation: "document.querySelector() returns only the first matching element found in tree order (or null if none exist). To retrieve all matches, use document.querySelectorAll().",
        hint: "querySelector returns one element; querySelectorAll returns a list.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js29",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js29-events-and-delegation",
    lessonCode: "JS-29",
    lessonTitle: "Events, Event Listeners & Event Delegation",
    description: "Evaluate your skills in handling browser events, stopping form reloads with preventDefault, and implementing event delegation.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js29-q1",
        type: "multiple_choice",
        title: "The Memory Advantage of Event Delegation",
        prompt: "Why is Event Delegation preferred over attaching individual event listeners to 500 list items in a loop?",
        options: [
          "Browsers limit web pages to a maximum of 5 event listeners",
          "Attaching one listener to a parent element saves significant memory and automatically handles dynamically added child items",
          "Event delegation causes click events to run synchronously in background threads",
          "Individual event listeners cannot read event.target"
        ],
        correctAnswer: 1,
        explanation: "Event delegation leverages event bubbling by attaching one listener to the parent container. This drastically reduces memory overhead and automatically works for newly added children.",
        hint: "Think about memory consumption and dynamic elements.",
        hintCostXP: 5
      },
      {
        id: "js29-q2",
        type: "multiple_choice",
        title: "event.target vs event.currentTarget",
        prompt: "If a user clicks a <button> located inside a <div id='container'>, and a click listener is attached to the <div>, what are event.target and event.currentTarget?",
        options: [
          "event.target is the <button>; event.currentTarget is the <div>",
          "event.target is the <div>; event.currentTarget is the <button>",
          "Both are always identical and reference the <div>",
          "Both are always identical and reference the <button>"
        ],
        correctAnswer: 0,
        explanation: "event.target is the deepest element that was actually clicked (the button). event.currentTarget is the element to which the event handler is attached (the div).",
        hint: "Target is who was clicked; currentTarget is who holds the listener.",
        hintCostXP: 5
      },
      {
        id: "js29-q3",
        type: "multiple_choice",
        title: "Stopping Default Browser Behavior",
        prompt: "What does calling event.preventDefault() inside a form submit event handler do?",
        options: [
          "It clears all input fields in the form",
          "It prevents the browser from reloading the entire webpage so JavaScript can handle submission asynchronously",
          "It stops event bubbling to parent elements",
          "It closes the browser window"
        ],
        correctAnswer: 1,
        explanation: "By default, submitting an HTML form reloads the page or navigates to a new URL. Calling event.preventDefault() stops this default action, allowing JavaScript to process the form.",
        hint: "What does a form submission normally do to a web page?",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js30",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js30-browser-storage-and-debugging",
    lessonCode: "JS-30",
    lessonTitle: "Browser Storage (localStorage) & DevTools Debugging",
    description: "Test your understanding of persistent storage with localStorage, JSON serialization rules, and DevTools debugging.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js30-q1",
        type: "code_output",
        title: "The [object Object] localStorage Trap",
        prompt: "What is stored in localStorage if you execute localStorage.setItem('user', { name: 'Alex' }); without stringifying?",
        codeSnippet: `const user = { name: "Alex" };
localStorage.setItem("user", user);
console.log(localStorage.getItem("user"));`,
        language: "javascript",
        options: [
          "'{\"name\":\"Alex\"}'",
          "'[object Object]'",
          "SyntaxError",
          "null"
        ],
        correctAnswer: 1,
        explanation: "localStorage only stores strings. If you pass an object directly, JavaScript converts it using toString(), storing the useless string '[object Object]'. Always use JSON.stringify!",
        hint: "Objects default to '[object Object]' when converted to strings.",
        hintCostXP: 5
      },
      {
        id: "js30-q2",
        type: "multiple_choice",
        title: "localStorage vs sessionStorage",
        prompt: "What is the key difference between localStorage and sessionStorage in the browser?",
        options: [
          "localStorage data persists indefinitely even after closing the browser; sessionStorage data is cleared when the tab closes",
          "localStorage can store binary files while sessionStorage only stores strings",
          "sessionStorage is shared between all domains and tabs simultaneously",
          "localStorage is only available on desktop computers"
        ],
        correctAnswer: 0,
        explanation: "localStorage persists across browser sessions and computer reboots until explicitly cleared, whereas sessionStorage is scoped to the current browser tab and is deleted when the tab closes.",
        hint: "Think about lifespan: persistent forever vs lifespan of the current tab.",
        hintCostXP: 5
      },
      {
        id: "js30-q3",
        type: "multiple_choice",
        title: "The debugger Statement",
        prompt: "What does placing the 'debugger;' keyword inside your JavaScript code do when DevTools is open?",
        options: [
          "It deletes all variables currently in memory",
          "It pauses script execution like a breakpoint so you can step through lines and inspect variables",
          "It prints the entire program to the printer",
          "It automatically fixes any syntax errors"
        ],
        correctAnswer: 1,
        explanation: "The debugger; statement acts as a code-defined breakpoint. If browser DevTools is open, execution pauses at that line, allowing you to inspect the call stack, scope, and variable values.",
        hint: "It pauses execution like a breakpoint.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

const slugs = Object.keys(batch9Lessons);

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const lessonObj = batch9Lessons[slug];
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);

  if (startIdx === -1) {
    throw new Error(`Could not find start index for ${slug} in ${lessonFilePath}`);
  }

  let endIdx = -1;
  if (i < slugs.length - 1) {
    // Next lesson in this batch
    const nextSlug = slugs[i + 1];
    const nextMarker = `"${nextSlug}": {`;
    const found = lessonContent.indexOf(nextMarker, startIdx);
    endIdx = lessonContent.lastIndexOf('\n', found) + 1;
  } else {
    // Last lesson in JS_LESSONS_CONTENT! Find '};' after startIdx
    const closeBraceIdx = lessonContent.indexOf('};', startIdx);
    endIdx = closeBraceIdx;
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end index for ${slug}`);
  }

  const isLast = (i === slugs.length - 1);
  const replacement = `  "${slug}": ` + JSON.stringify(lessonObj, null, 2) + (isLast ? '\n' : ',\n\n');
  lessonContent = lessonContent.substring(0, startIdx) + replacement + lessonContent.substring(endIdx);
}

fs.writeFileSync(lessonFilePath, lessonContent, 'utf8');
console.log('Successfully updated javascript-lesson-content.ts for JS-28, JS-29, and JS-30!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (let i = 0; i < batch9Quizzes.length; i++) {
  const quizObj = batch9Quizzes[i];
  const marker = `"lessonSlug": "${quizObj.lessonSlug}"`;
  const markerIdx = quizContent.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error(`Could not find quiz for ${quizObj.lessonSlug} in ${quizFilePath}`);
  }

  // Find opening brace: last "  {" before markerIdx
  const startIdx = quizContent.lastIndexOf('  {', markerIdx);
  if (startIdx === -1) {
    throw new Error(`Could not find start of quiz object for ${quizObj.lessonSlug}`);
  }

  let endIdx = -1;
  let hasTrailingComma = true;

  if (i < batch9Quizzes.length - 1) {
    const nextQuizSlug = batch9Quizzes[i + 1].lessonSlug;
    const nextQuizMarker = `"lessonSlug": "${nextQuizSlug}"`;
    const nextQuizIdx = quizContent.indexOf(nextQuizMarker, markerIdx);
    if (nextQuizIdx === -1) {
      throw new Error(`Could not find next quiz marker for ${nextQuizSlug}`);
    }
    const nextStartIdx = quizContent.lastIndexOf('  {', nextQuizIdx);
    endIdx = nextStartIdx;
    hasTrailingComma = true;
  } else {
    // Last quiz in the array! Find the closing '];' after startIdx
    const arrayEndMarker = '];';
    const closeBracketIdx = quizContent.indexOf(arrayEndMarker, startIdx);
    endIdx = quizContent.lastIndexOf('\n', closeBracketIdx);
    hasTrailingComma = false;
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end of quiz object for ${quizObj.lessonSlug}`);
  }

  const formattedQuiz = '  ' + JSON.stringify(quizObj, null, 2).replace(/\n/g, '\n  ') + (hasTrailingComma ? ',\n' : '\n');
  quizContent = quizContent.substring(0, startIdx) + formattedQuiz + quizContent.substring(endIdx);
}

fs.writeFileSync(quizFilePath, quizContent, 'utf8');
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-28, JS-29, and JS-30!');
