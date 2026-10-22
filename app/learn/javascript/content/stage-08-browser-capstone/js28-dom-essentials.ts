import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js28DomEssentialsContent: StandardLessonContent = {
  "slug": "js28-dom-essentials",
  "code": "JS-28",
  "title": "DOM Essentials: Selecting & Modifying Elements",
  "subtitle": "Interact with webpage HTML elements using querySelector, textContent, and classList.",
  "sections": [
    {
      "id": "part1",
      "label": "The DOM Tree",
      "icon": "🌳",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Selecting & Updating",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "XSS Prevention & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "innerHTML XSS Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "DOM Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "The Bridge to the Webpage",
    "bigPicture": "The DOM (Document Object Model) is a tree representation of your HTML webpage in browser memory. JavaScript uses the DOM to read, create, update, and delete elements dynamically in real time.",
    "analogy": "Think of HTML like a printed blueprint of a building. The DOM is the actual live building constructed in memory. JavaScript is the renovation crew that repaints walls and adds rooms dynamically.",
    "diagram": "document\n   |\n   +---> document.querySelector(\"#header\")\n           |\n           +---> .textContent = \"Updated Title\"\n           +---> .classList.add(\"highlight\")",
    "breakdownTitle": "DOM Core APIs",
    "breakdownItems": [
      {
        "title": "querySelector()",
        "desc": "Selects the first matching element using standard CSS selectors (`#id`, `.class`)."
      },
      {
        "title": "textContent",
        "desc": "Safely reads or writes text inside an element without security risks."
      },
      {
        "title": "classList",
        "desc": "Adds, removes, or toggles CSS styling classes on elements."
      }
    ]
  },
  "part2": {
    "title": "DOM Methods in Action",
    "intro": "Select elements and modify text and styling classes safely.",
    "cards": [
      {
        "number": "01",
        "tag": "Selection",
        "title": "querySelector()",
        "description": "Finds the first matching element in the DOM tree.",
        "codeSnippet": "// const btn = document.querySelector(\"#submit-btn\");\n// const item = document.querySelector(\".active-item\");\nconsole.log(\"Element selected using standard CSS selector\");",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Text",
        "title": "textContent Property",
        "description": "Safely updates plain text without interpreting HTML tags.",
        "codeSnippet": "const heading = { textContent: \"\" };\nheading.textContent = \"Welcome to LearnCraft!\";\nconsole.log(heading.textContent); // Output: Welcome to LearnCraft!",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Styles",
        "title": "classList.toggle()",
        "description": "Adds a class if missing, removes it if present.",
        "codeSnippet": "const classes = new Set([\"card\"]);\nclasses.add(\"expanded\");\nconsole.log(\"Class list:\", [...classes].join(\" \")); // Output: Class list: card expanded",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Never Use innerHTML for User Input",
      "content": "Always use `textContent` to display user input. Using `innerHTML` opens your app to dangerous Cross-Site Scripting (XSS) attacks."
    }
  },
  "part3": {
    "title": "Safe DOM Manipulation & Reading AI Code",
    "intro": "Avoid security bugs and null pointer crashes when interacting with the DOM.",
    "points": [
      {
        "title": "1. Preventing XSS Attacks with textContent",
        "content": "`textContent` escapes special characters, preventing hackers from injecting malicious `<script>` tags into your pages.",
        "codeSnippet": "const untrustedInput = \"<img src='x' onerror='alert(1)'>\";\n\nconst safeElement = { textContent: \"\" };\nsafeElement.textContent = untrustedInput; // Treated as harmless literal text\nconsole.log(\"Escaped safe text:\", safeElement.textContent);"
      },
      {
        "title": "2. Verifying Element Existence",
        "content": "If `querySelector` fails to find an element, it returns `null`. Check that the element exists before modifying it.",
        "codeSnippet": "const badge = null; // Simulating element not found in DOM\n\nif (badge) {\n  badge.textContent = \"Active\";\n} else {\n  console.log(\"Element was null, avoided TypeError crash!\");\n}"
      },
      {
        "title": "3. Creating New Elements with createElement",
        "content": "Build new elements with `document.createElement()`, configure them safely, and append them to the DOM.",
        "codeSnippet": "function createListItem(text) {\n  const item = { tagName: \"LI\", textContent: text };\n  return item;\n}\n\nconst newItem = createListItem(\"Master JavaScript DOM\");\nconsole.log(\"Created element:\", newItem.tagName, newItem.textContent);\n// Output: Created element: LI Master JavaScript DOM"
      }
    ]
  },
  "part4": {
    "title": "innerHTML Cross-Site Scripting (XSS)",
    "bad": {
      "title": "❌ Using innerHTML with Untrusted User Input",
      "code": "const userComment = \"<script>stealCookies()</script>\";\n// Danger: innerHTML interprets user text as executable code!\ndocument.querySelector(\"#comments\").innerHTML = userComment;",
      "explanation": "`innerHTML` executes HTML and scripts provided by users, exposing your site to session hijacking and account theft."
    },
    "good": {
      "title": "✅ Safe textContent Escapes Input",
      "code": "const userComment = \"<script>stealCookies()</script>\";\n// Safe: textContent renders literal characters without executing\nconst commentEl = { textContent: \"\" };\ncommentEl.textContent = userComment;\nconsole.log(\"Rendered safely as raw text:\", commentEl.textContent);",
      "explanation": "`textContent` safely treats all incoming data as plain text, neutralising any potential script injection."
    }
  },
  "part5": {
    "title": "Interactive DOM Sandbox",
    "intro": "Simulate DOM element manipulation and classList management in the editor.",
    "starterCode": "// Simulating DOM node manipulation:\nconst cardElement = {\n  id: \"product-101\",\n  textContent: \"Old Price: $100\",\n  classes: new Set([\"card\", \"theme-light\"]),\n  \n  updatePrice(newPrice) {\n    this.textContent = \"Special Price: $\" + newPrice;\n    this.classes.add(\"discounted\");\n  },\n};\n\nconsole.log(\"Initial text:\", cardElement.textContent);\ncardElement.updatePrice(79);\nconsole.log(\"Updated text:\", cardElement.textContent);\nconsole.log(\"Updated classes:\", [...cardElement.classes].join(\" \"));\n"
  },
  "part6": {
    "title": "Key Takeaways: DOM Essentials",
    "takeaways": [
      {
        "title": "Live Document Tree",
        "desc": "The DOM represents live HTML in browser memory for JavaScript to update."
      },
      {
        "title": "Use textContent",
        "desc": "Always prefer textContent over innerHTML to prevent XSS security vulnerabilities."
      },
      {
        "title": "Manage Classes",
        "desc": "Use classList.add, remove, and toggle for styling instead of raw className strings."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why is `element.textContent = userText;` preferred over `element.innerHTML = userText;`?",
      "options": [
        "textContent is 50x faster in all browsers",
        "textContent prevents XSS vulnerabilities by treating input as raw text rather than executable HTML",
        "innerHTML is deprecated in modern JavaScript",
        "textContent automatically formats text with CSS"
      ],
      "correctIndex": 1,
      "explanation": "`textContent` escapes input, ensuring that characters like `<` and `>` are displayed as plain characters rather than executed as HTML or scripts."
    }
  }
};
