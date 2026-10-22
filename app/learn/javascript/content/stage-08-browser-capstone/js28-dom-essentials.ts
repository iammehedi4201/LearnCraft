import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js28DomEssentialsContent: StandardLessonContent = {
  slug: "js28-dom-essentials",
  code: "JS-28",
  title: "Finding and Changing HTML Elements",
  subtitle: "Query HTML elements with querySelector, update text and attributes safely, and avoid dangerous innerHTML injection vulnerabilities.",
  sections: [
    {
      id: "part1",
      label: "The DOM Tree",
      icon: "🌳",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Querying & Modifying",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "classList & Attributes",
      icon: "🎨",
      tag: "STYLING"
    },
    {
      id: "part4",
      label: "innerHTML XSS Trap",
      icon: "⚠️",
      tag: "SECURITY"
    },
    {
      id: "part5",
      label: "DOM Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "The Document Object Model (DOM)",
    bigPicture: "The DOM is an object tree representation of the HTML document created by the browser. JavaScript uses the DOM API to query elements, modify text, and update styles dynamically.",
    analogy: "Like a building directory: the HTML is the physical building, and the DOM is the computerized map at the entrance that allows you to locate any room and change its signage.",
    diagram: "+-------------------------------------------+\n| document                                  |\n|   └── html                                |\n|        ├── head                           |\n|        └── body                           |\n|             ├── h1#title (\"LearnCraft\")   |\n|             └── button.btn (\"Submit\")     |\n+-------------------------------------------+",
    breakdownTitle: "DOM Essentials",
    breakdownItems: [
      {
        title: "querySelector & querySelectorAll",
        desc: "Find elements using standard CSS selectors (#id, .class, tag)."
      },
      {
        title: "textContent for Safe Text",
        desc: "Safely reads and writes plain text inside an element without interpreting HTML tags."
      },
      {
        title: "classList for Dynamic Styling",
        desc: "Add, remove, or toggle CSS classes cleanly without touching raw class strings."
      }
    ]
  },
  part2: {
    title: "Selecting and Updating Elements",
    intro: "Modern methods for finding elements and updating their content.",
    cards: [
      {
        number: "01",
        tag: "Select",
        title: "querySelector()",
        description: "Returns the first element matching any valid CSS selector.",
        codeSnippet: "// Select by ID, class, or tag:\nconst titleEl = document.querySelector(\"#main-title\");\nconst submitBtn = document.querySelector(\"button.primary\");",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Text",
        title: "textContent",
        description: "Updates the text inside an element safely without parsing HTML.",
        codeSnippet: "const heading = document.querySelector(\"h1\");\nheading.textContent = \"Welcome to LearnCraft!\";\n// Output: Sets plain text safely",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Classes",
        title: "classList API",
        description: "Manipulates CSS classes cleanly with add, remove, and toggle.",
        codeSnippet: "const card = document.querySelector(\".card\");\ncard.classList.add(\"active\");\ncard.classList.remove(\"hidden\");\ncard.classList.toggle(\"highlight\");",
        color: "purple"
      }
    ],
    rule: {
      title: "Security Rule",
      content: "Never insert untrusted user input using innerHTML. Always use textContent to prevent Cross-Site Scripting (XSS) attacks."
    }
  },
  part3: {
    title: "Attributes, Creation & Multiple Elements",
    intro: "Working with lists of elements and HTML attributes.",
    points: [
      {
        title: "1. querySelectorAll() and NodeLists",
        content: "querySelectorAll returns all matching elements as a NodeList that supports forEach.",
        codeSnippet: "const buttons = document.querySelectorAll(\".btn\");\nbuttons.forEach(btn => {\n  btn.classList.add(\"rounded\");\n});"
      },
      {
        title: "2. Setting Attributes Safely",
        content: "Use setAttribute() or direct property assignment to set href, disabled, or data attributes.",
        codeSnippet: "const link = document.querySelector(\"a\");\nlink.setAttribute(\"target\", \"_blank\");\nlink.href = \"https://learncraft.dev\";"
      },
      {
        title: "3. Creating Elements with document.createElement()",
        content: "Create new elements in memory and append them into the live document.",
        codeSnippet: "const newBadge = document.createElement(\"span\");\nnewBadge.textContent = \"NEW\";\nnewBadge.classList.add(\"badge\");\ndocument.body.appendChild(newBadge);"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: The innerHTML XSS Vulnerability",
    bad: {
      title: "❌ Using innerHTML with User Input (XSS Injection)",
      code: "const userBio = \"<img src=x onerror=alert('Hacked!')>\";\n// Bug: innerHTML parses and executes malicious script tags and event handlers!\nconst container = document.querySelector(\"#bio-container\");\ncontainer.innerHTML = userBio; // XSS Vulnerability!",
      explanation: "Using innerHTML with untrusted user input executes arbitrary JavaScript inside the victim's browser session."
    },
    good: {
      title: "✅ Use textContent to Neutralize HTML Tags",
      code: "const userBio = \"<img src=x onerror=alert('Hacked!')>\";\nconst container = document.querySelector(\"#bio-container\");\n// Safe: Treats all characters as plain text literal, neutralizing scripts\ncontainer.textContent = userBio;\n// Output displays literal '<img...>' without running code!",
      explanation: "textContent treats input strictly as raw text, automatically neutralizing malicious HTML and JavaScript injections."
    }
  },
  part5: {
    title: "DOM Essentials Simulator Sandbox",
    intro: "Simulate querying and mutating a DOM element's text and class list.",
    starterCode: "// Simulated DOM element node:\nconst mockElement = {\n  id: \"status-pill\",\n  textContent: \"Pending\",\n  classes: new Set([\"badge\"]),\n  classList: {\n    add(c) { mockElement.classes.add(c); },\n    remove(c) { mockElement.classes.delete(c); },\n    contains(c) { return mockElement.classes.has(c); }\n  }\n};\n\n// 1. Update text content safely:\nmockElement.textContent = \"Verified\";\n\n// 2. Update styles with classList:\nmockElement.classList.remove(\"badge-pending\");\nmockElement.classList.add(\"badge-success\");\n\nconsole.log(\"Updated text:\", mockElement.textContent);\nconsole.log(\"Updated classes:\", Array.from(mockElement.classes));\n"
  },
  part6: {
    title: "Key Takeaways: DOM Essentials",
    takeaways: [
      {
        title: "querySelector",
        desc: "Find any element using CSS selectors (#id, .class, element)."
      },
      {
        title: "textContent for Safety",
        desc: "Always prefer textContent over innerHTML to protect against XSS injections."
      },
      {
        title: "classList API",
        desc: "Use classList.add/remove/toggle for clean CSS state management."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is `element.textContent` preferred over `element.innerHTML` when inserting user input?",
      options: [
        "Because textContent executes faster on mobile devices",
        "Because textContent treats input strictly as plain text, preventing Cross-Site Scripting (XSS) attacks",
        "Because innerHTML is deprecated in modern browsers",
        "Because textContent automatically applies CSS styles"
      ],
      correctIndex: 1,
      explanation: "Using `textContent` ensures that any `<script>` tags or malicious HTML are rendered as plain text strings rather than executed as code, neutralizing XSS vulnerabilities."
    }
  }
};
